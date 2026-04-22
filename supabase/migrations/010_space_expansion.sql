-- GEOPOLITICA AVANZATA - Space Expansion System
-- Version: 1.0.0
-- Adds: space_quests, space_branches, orbital_resources tables

-- =====================================================
-- TABELLA: space_quests
-- Missioni spaziali intermediate (per nazione)
-- =====================================================
CREATE TABLE space_quests (
    id TEXT NOT NULL,
    nation_id TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('asteroid_mining', 'lunar_base', 'crew_flight', 'mars_colony', 'orbital_station', 'space_defense', 'tourism', 'research', 'satellite_constellation')),
    description TEXT,
    status TEXT DEFAULT 'locked' CHECK (status IN ('locked', 'available', 'in_progress', 'completed', 'failed')),
    progress INT DEFAULT 0,
    requirements JSONB DEFAULT '{}',
    rewards JSONB DEFAULT '[]',
    unlocks JSONB DEFAULT '[]',
    started_at INT,
    completed_at INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (id, nation_id)
);

CREATE INDEX idx_space_quests_nation ON space_quests(nation_id, status);
CREATE INDEX idx_space_quests_type ON space_quests(type);

-- =====================================================
-- TABELLA: space_branches_progress
-- Progresso dei rami del tech tree spaziale
-- =====================================================
CREATE TABLE space_branches_progress (
    nation_id TEXT PRIMARY KEY REFERENCES nations(id) ON DELETE CASCADE,
    heavy_level INT DEFAULT 0,
    heavy_progress INT DEFAULT 0,
    light_level INT DEFAULT 0,
    light_progress INT DEFAULT 0,
    fast_level INT DEFAULT 0,
    fast_progress INT DEFAULT 0,
    economy_level INT DEFAULT 0,
    economy_progress INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABELLA: orbital_resources
-- Risorse estratte dallo spazio
-- =====================================================
CREATE TABLE orbital_resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nation_id TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    resource_type TEXT NOT NULL CHECK (resource_type IN ('rare_earth', 'water_ice', 'helium3', 'isotopes')),
    quantity INT DEFAULT 0,
    extracted_at INT DEFAULT 0,
    value_per_unit INT DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (nation_id, resource_type)
);

CREATE INDEX idx_orbital_resources_nation ON orbital_resources(nation_id, resource_type);

-- =====================================================
-- TABELLA: space_events
-- Eventi spaziali storici
-- =====================================================
CREATE TABLE space_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nation_id TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL CHECK (event_type IN ('launch', 'deployment', 'discovery', 'accident', 'milestone')),
    title TEXT NOT NULL,
    description TEXT,
    target TEXT,
    success BOOLEAN DEFAULT TRUE,
    turn_created INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_space_events_nation ON space_events(nation_id, turn_created DESC);

-- =====================================================
-- RLS
-- =====================================================
ALTER TABLE space_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE space_branches_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE orbital_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE space_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "space_quests_public" ON space_quests FOR SELECT USING (true);
CREATE POLICY "space_branches_public" ON space_branches_progress FOR SELECT USING (true);
CREATE POLICY "orbital_resources_public" ON orbital_resources FOR SELECT USING (true);
CREATE POLICY "space_events_public" ON space_events FOR SELECT USING (true);

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Sblocca quest se requisiti soddisfatti
CREATE OR REPLACE FUNCTION check_space_quest_unlock(
    p_nation_id TEXT,
    p_quest_id TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
    v_quest space_quests%ROWTYPE;
    v_turn game_turns%ROWTYPE;
    v_tech JSONB;
    v_unlock BOOLEAN := TRUE;
BEGIN
    SELECT * INTO v_quest FROM space_quests WHERE id = p_quest_id AND nation_id = p_nation_id;
    IF NOT FOUND OR v_quest.status != 'locked' THEN
        RETURN FALSE;
    END IF;

    SELECT * INTO v_turn FROM get_latest_turn(p_nation_id);
    IF v_turn.tech IS NULL THEN
        RETURN FALSE;
    END IF;

    v_tech := v_turn.tech;

    IF v_quest.requirements ? 'technology' THEN
        IF (v_tech->>'technology')::INT < (v_quest.requirements->>'technology')::INT THEN
            v_unlock := FALSE;
        END IF;
    END IF;

    IF v_unlock AND v_quest.status = 'locked' THEN
        UPDATE space_quests SET status = 'available' WHERE id = p_quest_id AND nation_id = p_nation_id;
    END IF;

    RETURN v_unlock;
END;
$$ LANGUAGE plpgsql STABLE;

-- Aggiorna progressione ramo
CREATE OR REPLACE FUNCTION update_space_branch(
    p_nation_id TEXT,
    p_branch TEXT,
    p_progress INT,
    p_level_increase BOOLEAN DEFAULT FALSE
)
RETURNS VOID AS $$
BEGIN
    UPDATE space_branches_progress
    SET 
        heavy_progress = CASE WHEN p_branch = 'heavy' THEN heavy_progress + p_progress ELSE heavy_progress END,
        heavy_level = CASE WHEN p_branch = 'heavy' AND p_level_increase THEN heavy_level + 1 ELSE heavy_level END,
        light_progress = CASE WHEN p_branch = 'light' THEN light_progress + p_progress ELSE light_progress END,
        light_level = CASE WHEN p_branch = 'light' AND p_level_increase THEN light_level + 1 ELSE light_level END,
        fast_progress = CASE WHEN p_branch = 'fast' THEN fast_progress + p_progress ELSE fast_progress END,
        fast_level = CASE WHEN p_branch = 'fast' AND p_level_increase THEN fast_level + 1 ELSE fast_level END,
        economy_progress = CASE WHEN p_branch = 'economy' THEN economy_progress + p_progress ELSE economy_progress END,
        economy_level = CASE WHEN p_branch = 'economy' AND p_level_increase THEN economy_level + 1 ELSE economy_level END,
        updated_at = NOW()
    WHERE nation_id = p_nation_id;

    IF NOT FOUND THEN
        INSERT INTO space_branches_progress (nation_id, heavy_progress, light_progress, fast_progress, economy_progress)
        VALUES (
            p_nation_id,
            CASE WHEN p_branch = 'heavy' THEN p_progress ELSE 0 END,
            CASE WHEN p_branch = 'light' THEN p_progress ELSE 0 END,
            CASE WHEN p_branch = 'fast' THEN p_progress ELSE 0 END,
            CASE WHEN p_branch = 'economy' THEN p_progress ELSE 0 END
        );
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Estrai risorse orbitali
CREATE OR REPLACE FUNCTION extract_orbital_resources(
    p_nation_id TEXT,
    p_resource_type TEXT,
    p_quantity INT
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO orbital_resources (nation_id, resource_type, quantity, extracted_at)
    VALUES (p_nation_id, p_resource_type, p_quantity, EXTRACT(EPOCH FROM NOW())::INT)
    ON CONFLICT (nation_id, resource_type) 
    DO UPDATE SET quantity = orbital_resources.quantity + p_quantity;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- INSERT SEED SPACE QUESTS
-- =====================================================
-- Le quest sono per nazione, verranno create dinamicamente
-- Rimosso seed data qui, sarà gestito dall'applicazione

-- =====================================================
-- SEED SPACE BRANCHES PROGRESS
-- =====================================================
INSERT INTO space_branches_progress (nation_id, heavy_level, light_level, fast_level, economy_level) VALUES
    ('usa', 1, 1, 0, 0),
    ('cina', 0, 1, 0, 1),
    ('russia', 1, 0, 1, 0),
    ('francia', 0, 1, 0, 0),
    ('giappone', 0, 0, 0, 1)
ON CONFLICT (nation_id) DO NOTHING;

-- =====================================================
-- SEED ORBITAL RESOURCES
-- =====================================================
INSERT INTO orbital_resources (nation_id, resource_type, quantity, value_per_unit) VALUES
    ('usa', 'rare_earth', 100, 15),
    ('cina', 'rare_earth', 200, 12),
    ('russia', 'helium3', 50, 20),
    ('usa', 'water_ice', 80, 8)
ON CONFLICT (nation_id, resource_type) DO NOTHING;
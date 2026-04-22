-- GEOPOLITICA AVANZATA - Cold War System
-- Version: 1.0.0
-- Adds: cold_war_states, provocations, proxy_wars tables

-- =====================================================
-- TABELLA: cold_war_states
-- Stato della guerra fredda tra due nazioni
-- =====================================================
CREATE TABLE cold_war_states (
    nation_a TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    nation_b TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    phase TEXT DEFAULT 'neutral' CHECK (phase IN ('neutral', 'tension', 'cold_war', 'crisis', 'hot_war')),
    tension_level INT DEFAULT 0 CHECK (tension_level BETWEEN 0 AND 100),
    provocations_count INT DEFAULT 0,
    proxy_wars_won INT DEFAULT 0,
    proxy_wars_lost INT DEFAULT 0,
    last_interaction_turn INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    PRIMARY KEY (nation_a, nation_b)
);

CREATE INDEX idx_cold_war_nation_a ON cold_war_states(nation_a, phase);
CREATE INDEX idx_cold_war_phase ON cold_war_states(phase);

-- =====================================================
-- TABELLA: cold_war_provocations
-- Storico delle provocazioni
-- =====================================================
CREATE TABLE cold_war_provocations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    source_nation TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    target_nation TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('military_exercise', 'proxy_support', 'propaganda', 'arms_race', 'embargo', 'mediaction')),
    description TEXT,
    tension_impact INT NOT NULL,
    responded BOOLEAN DEFAULT FALSE,
    turn_created INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_provocations_pair ON cold_war_provocations(source_nation, target_nation, turn_created);
CREATE INDEX idx_provocations_type ON cold_war_provocations(type);

-- =====================================================
-- TABELLA: proxy_wars
-- Guerre per procura nelle guerre fredde
-- =====================================================
CREATE TABLE proxy_wars (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sponsor_a TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    sponsor_b TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    target_nation TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    sponsor_a_support INT DEFAULT 0,
    sponsor_b_support INT DEFAULT 0,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'frozen', 'ended')),
    winner TEXT,
    turns_duration INT DEFAULT 0,
    created_at INT NOT NULL,
    ended_at INT
);

CREATE INDEX idx_proxy_wars_sponsors ON proxy_wars(sponsor_a, sponsor_b, status);
CREATE INDEX idx_proxy_wars_target ON proxy_wars(target_nation, status);

-- =====================================================
-- RLS
-- =====================================================
ALTER TABLE cold_war_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE cold_war_provocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE proxy_wars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cold_war_states_public" ON cold_war_states FOR SELECT USING (true);
CREATE POLICY "provocations_public" ON cold_war_provocations FOR SELECT USING (true);
CREATE POLICY "proxy_wars_public" ON proxy_wars FOR SELECT USING (true);

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Aggiorna tensione con una provocazione
CREATE OR REPLACE FUNCTION add_provocation(
    p_source TEXT,
    p_target TEXT,
    p_type TEXT,
    p_description TEXT,
    p_tension_impact INT,
    p_turn INT
)
RETURNS VOID AS $$
DECLARE
    v_state cold_war_states%ROWTYPE;
    v_exists BOOLEAN := FALSE;
BEGIN
    -- Check if state exists
    SELECT * INTO v_state 
    FROM cold_war_states 
    WHERE (nation_a = p_source AND nation_b = p_target)
       OR (nation_a = p_target AND nation_b = p_source);
    
    IF NOT FOUND THEN
        INSERT INTO cold_war_states (nation_a, nation_b, tension_level, last_interaction_turn)
        VALUES (p_source, p_target, p_tension_impact, p_turn);
    ELSE
        UPDATE cold_war_states 
        SET tension_level = LEAST(100, tension_level + p_tension_impact),
            provocations_count = provocations_count + 1,
            phase = CASE 
                WHEN tension_level >= 80 THEN 'cold_war'
                WHEN tension_level >= 50 THEN 'tension'
                ELSE phase
            END,
            last_interaction_turn = p_turn,
            updated_at = NOW()
        WHERE (nation_a = p_source AND nation_b = p_target)
           OR (nation_a = p_target AND nation_b = p_source);
    END IF;

    INSERT INTO cold_war_provocations 
        (source_nation, target_nation, type, description, tension_impact, turn_created)
    VALUES (p_source, p_target, p_type, p_description, p_tension_impact, p_turn);
END;
$$ LANGUAGE plpgsql;

-- Calcola escalation automatica
CREATE OR REPLACE FUNCTION check_cold_war_escalation(
    p_nation_a TEXT,
    p_nation_b TEXT,
    p_current_turn INT
)
RETURNS TEXT AS $$
DECLARE
    v_state cold_war_states%ROWTYPE;
    v_result TEXT := 'neutral';
BEGIN
    SELECT * INTO v_state
    FROM cold_war_states
    WHERE (nation_a = p_nation_a AND nation_b = p_nation_b)
       OR (nation_a = p_nation_b AND nation_b = p_nation_a);

    IF NOT FOUND OR v_state.phase = 'neutral' THEN
        RETURN 'neutral';
    END IF;

    -- Check turns since last interaction
    IF p_current_turn - v_state.last_interaction_turn >= 3 THEN
        IF v_state.tension_level >= 80 THEN
            v_result := 'crisis';
        ELSIF v_state.tension_level >= 50 THEN
            v_result := 'cold_war';
        ELSE
            v_result := 'tension';
        END IF;
    ELSE
        -- Auto escalation per provocazioni non risposte
        IF v_state.phase = 'tension' AND v_state.tension_level >= 60 THEN
            v_result := 'cold_war';
        ELSIF v_state.phase = 'cold_war' AND v_state.tension_level >= 90 THEN
            v_result := 'crisis';
        END IF;
    END IF;

    RETURN v_result;
END;
$$ LANGUAGE plpgsql STABLE;

-- De-escalation: riduci tensione
CREATE OR REPLACE FUNCTION deescalate_cold_war(
    p_nation_a TEXT,
    p_nation_b TEXT,
    p_reduction INT
)
RETURNS VOID AS $$
BEGIN
    UPDATE cold_war_states
    SET tension_level = GREATEST(0, tension_level - p_reduction),
        phase = CASE 
            WHEN tension_level - p_reduction <= 0 THEN 'neutral'
            WHEN tension_level - p_reduction < 30 THEN 'neutral'
            WHEN tension_level - p_reduction < 50 THEN 'tension'
            ELSE phase
        END,
        updated_at = NOW()
    WHERE (nation_a = p_nation_a AND nation_b = p_nation_b)
       OR (nation_a = p_nation_b AND nation_b = p_nation_a);
END;
$$ LANGUAGE plpgsql;

-- Inizia una proxy war
CREATE OR REPLACE FUNCTION start_proxy_war(
    p_sponsor_a TEXT,
    p_sponsor_b TEXT,
    p_target TEXT,
    p_turn INT
)
RETURNS UUID AS $$
DECLARE
    v_war_id UUID;
BEGIN
    INSERT INTO proxy_wars (sponsor_a, sponsor_b, target_nation, created_at)
    VALUES (p_sponsor_a, p_sponsor_b, p_target, p_turn)
    RETURNING id INTO v_war_id;
    RETURN v_war_id;
END;
$$ LANGUAGE plpgsql;

-- Aggiorna supporto a proxy war
CREATE OR REPLACE FUNCTION support_proxy_war(
    p_war_id UUID,
    p_sponsor TEXT,
    p_support_amount INT
)
RETURNS VOID AS $$
BEGIN
    UPDATE proxy_wars SET
        sponsor_a_support = CASE WHEN sponsor_a = p_sponsor THEN sponsor_a_support + p_support_amount ELSE sponsor_a_support END,
        sponsor_b_support = CASE WHEN sponsor_b = p_sponsor THEN sponsor_b_support + p_support_amount ELSE sponsor_b_support END
    WHERE id = p_war_id AND status = 'active';
END;
$$ LANGUAGE plpgsql;
-- GEOPOLITICA AVANZATA - Schema Database Completo
-- Version: 1.0.0
-- Stack: Supabase Postgres + RLS + JSONB

-- Abilita estensione pgcrypto per generazione UUID
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =====================================================
-- TABELLA: nations
-- Rappresenta le nazioni/giocatori nel gioco
-- =====================================================
CREATE TABLE nations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT '#3B82F6',
    flag_emoji TEXT,
    resources JSONB DEFAULT '{}',
    leader JSONB DEFAULT '{"name": "Leader", "personality": "Diplomatic", "ideology": "Pragmatic"}',
    start_relations JSONB DEFAULT '{}',
    tech_tree JSONB DEFAULT '{"level": "launchers", "progress": 0}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indice per ricerche rapide su nazioni
CREATE INDEX idx_nations_id ON nations(id);

-- =====================================================
-- TABELLA: game_turns
-- Snapshot dello stato di ogni nazione per ogni turno
-- =====================================================
CREATE TABLE game_turns (
    turn_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nation_id TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    turn_number INT NOT NULL,
    pa_remaining INT DEFAULT 3,
    config_version TEXT DEFAULT 'v1',

    -- Stato economico
    economy JSONB DEFAULT '{"gdp": 1000, "growth": 2.5, "inflation": 2.0, "debt": 0, "debt_gdp": 0, "unemployment": 5.0, "budget_balance": 0, "reserves": 100, "sectors": {"agriculture": {"level": 3, "efficiency": 0.7, "maintenance_cost": 5}, "industry": {"level": 3, "efficiency": 0.6, "maintenance_cost": 10}, "services": {"level": 4, "efficiency": 0.8, "maintenance_cost": 15}}}',

    -- consenso e stabilità interna
    consensus JSONB DEFAULT '{"general": 50, "economic": 50, "security": 50, "freedom": 50}',

    -- fazioni politiche
    factions JSONB DEFAULT '[{"id": "progressives", "name": "Progressisti", "type": "Progressive", "base_approval": 35, "weight": 0.3, "demands": {"environment": 1, "social": 1}, "mobilization": 30}, {"id": "conservatives", "name": "Conservatori", "type": "Conservative", "base_approval": 30, "weight": 0.25, "demands": {"tradition": 1, "economy": 1}, "mobilization": 25}, {"id": "nationalists", "name": "Nazionalisti", "type": "Nationalist", "base_approval": 20, "weight": 0.2, "demands": {"military": 1, "sovereignty": 1}, "mobilization": 20}, {"id": "globalists", "name": "Globalisti", "type": "Globalist", "base_approval": 15, "weight": 0.15, "demands": {"trade": 1, "cooperation": 1}, "mobilization": 15}, {"id": "technocrats", "name": "Tecnocrati", "type": "Technocratic", "base_approval": 25, "weight": 0.2, "demands": {"tech": 1, "efficiency": 1}, "mobilization": 25}]',

    -- tecnologia
    tech JSONB DEFAULT '{"launchers": {"level": 1, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}',

    -- RNG seed deterministico
    rng_seed TEXT NOT NULL,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(nation_id, turn_number)
);

-- Indici per performance
CREATE INDEX idx_turns_nation ON game_turns(nation_id, turn_number DESC);

-- View per ottenere l'ultimo turno di ogni nazione
CREATE VIEW latest_turns AS
SELECT nation_id, MAX(turn_number) as latest_turn_number
FROM game_turns
GROUP BY nation_id;

-- =====================================================
-- TABELLA: relations
-- Relazioni bilaterali tra nazioni
-- =====================================================
CREATE TABLE relations (
    nation_a TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    nation_b TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    value INT CHECK (value BETWEEN -100 AND 100) DEFAULT 0,
    agreements JSONB DEFAULT '{"trade_pact": false, "non_aggression": false, "defensive": false, "economic": false, "tech": false}',
    last_interaction_turn INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    PRIMARY KEY (nation_a, nation_b)
);

-- Indice per ricerche relazioni
CREATE INDEX idx_relations_pair ON relations(nation_a, nation_b);

-- =====================================================
-- TABELLA: game_events
-- Log eventi di gioco (Event Sourcing)
-- =====================================================
CREATE TABLE game_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    turn_id BIGINT NOT NULL REFERENCES game_turns(turn_id) ON DELETE CASCADE,
    nation_id TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('diplomacy', 'economy', 'crisis', 'election', 'space', 'military', 'media', 'system')),
    title TEXT NOT NULL,
    description TEXT,
    payload JSONB DEFAULT '{}',
    severity TEXT DEFAULT 'normal' CHECK (severity IN ('positive', 'neutral', 'negative', 'critical')),
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indice per eventi
CREATE INDEX idx_events_turn ON game_events(turn_id, nation_id);
CREATE INDEX idx_events_type ON game_events(type, created_at);

-- =====================================================
-- TABELLA: action_queue
-- Queue azioni pendenti del client
-- =====================================================
CREATE TABLE action_queue (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    turn_id BIGINT NOT NULL REFERENCES game_turns(turn_id) ON DELETE CASCADE,
    nation_id TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL,
    target TEXT,
    params JSONB DEFAULT '{}',
    priority INT DEFAULT 0,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'applied', 'failed', 'cancelled')),
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    applied_at TIMESTAMPTZ
);

-- Indice per action queue
CREATE INDEX idx_action_queue_status ON action_queue(status, nation_id, turn_id);
CREATE INDEX idx_action_queue_pending ON action_queue(turn_id, nation_id) WHERE status = 'pending';

-- =====================================================
-- TABELLA: config
-- Configurazione globale del gioco
-- =====================================================
CREATE TABLE config (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert configurazione iniziale
INSERT INTO config (key, value, description) VALUES
    ('version', '"v1"', 'Versione configurazione'),
    ('game_rules', '{"pa_limit": 3, "turn_duration_hours": 24, "election_cycle": 12, "win_conditions": {"consensus": 80, "space": "colonization", "diplomatic": 90}, "lose_conditions": {"debt_gdp": 200, "consensus": 20, "isolation": 85}}', 'Regole del gioco'),
    ('ai_matrix', '{"ideology_weights": {"Progressive": 0.4, "Conservative": 0.4, "Nationalist": 0.3, "Globalist": 0.5, "Pragmatic": 0.6}, "personality_weights": {"Aggressive": -0.2, "Diplomatic": 0.1, "Populist": 0.05, "Technocratic": 0.1}}', 'Matrici risposta AI');

-- =====================================================
-- TABELLA: game_sessions
-- Sessioni di gioco attive
-- =====================================================
CREATE TABLE game_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL DEFAULT 'Nuova Partita',
    status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'active', 'paused', 'finished')),
    current_turn INT DEFAULT 0,
    active_nations JSONB DEFAULT '[]',
    created_by TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- Politiche di sicurezza per accesso dati
-- =====================================================
ALTER TABLE nations ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_turns ENABLE ROW LEVEL SECURITY;
ALTER TABLE relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE config ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;

-- Politiche di lettura pubbliche
CREATE POLICY "public_read_nations" ON nations FOR SELECT USING (true);
CREATE POLICY "public_read_turns" ON game_turns FOR SELECT USING (true);
CREATE POLICY "public_read_relations" ON relations FOR SELECT USING (true);
CREATE POLICY "public_read_events" ON game_events FOR SELECT USING (true);
CREATE POLICY "public_read_config" ON config FOR SELECT USING (true);
CREATE POLICY "public_read_sessions" ON game_sessions FOR SELECT USING (true);

-- Politiche di scrittura (solo service role)
-- Nota: Queste verranno gestite a livello Edge Function tramite service_role_key
-- Le politiche RLS qui bloccano scritture dirette da anon

-- =====================================================
-- FUNZIONI DI SUPPORTO
-- =====================================================

-- Funzione per ottenere l'ultimo turno di una nazione
CREATE OR REPLACE FUNCTION get_latest_turn(p_nation_id TEXT)
RETURNS SETOF game_turns AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM game_turns
    WHERE nation_id = p_nation_id
    ORDER BY turn_number DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql STABLE;

-- Funzione per calcolare seed deterministico
CREATE OR REPLACE FUNCTION calculate_seed(p_nation_id TEXT, p_turn_number INT, p_config_version TEXT DEFAULT 'v1')
RETURNS TEXT AS $$
BEGIN
    RETURN encode(
        digest(p_nation_id || '-' || p_turn_number || '-' || p_config_version, 'sha256'),
        'hex'
    )::text;
END;
$$ LANGUAGE plpgsql STABLE;

-- Funzione per contare PA rimanenti
CREATE OR REPLACE FUNCTION get_pa_remaining(p_nation_id TEXT)
RETURNS INT AS $$
DECLARE
    v_latest_turn game_turns%ROWTYPE;
    v_pending_count INT;
BEGIN
    SELECT * INTO v_latest_turn
    FROM get_latest_turn(p_nation_id)
    LIMIT 1;

    IF NOT FOUND OR v_latest_turn.turn_id IS NULL THEN
        RETURN 3;
    END IF;

    SELECT COUNT(*) INTO v_pending_count
    FROM action_queue
    WHERE nation_id = p_nation_id
      AND turn_id = v_latest_turn.turn_id
      AND status = 'pending';

    RETURN GREATEST(0, v_latest_turn.pa_remaining - v_pending_count);
END;
$$ LANGUAGE plpgsql STABLE;

-- Funzione helper per generazione eventi
CREATE OR REPLACE FUNCTION create_game_event(
    p_turn_id BIGINT,
    p_nation_id TEXT,
    p_type TEXT,
    p_title TEXT,
    p_description TEXT,
    p_payload JSONB DEFAULT '{}',
    p_severity TEXT DEFAULT 'neutral'
)
RETURNS UUID AS $$
DECLARE
    v_event_id UUID;
BEGIN
    INSERT INTO game_events (turn_id, nation_id, type, title, description, payload, severity)
    VALUES (p_turn_id, p_nation_id, p_type, p_title, p_description, p_payload, p_severity)
    RETURNING id INTO v_event_id;

    RETURN v_event_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- SEED DATA - Nazioni iniziali
-- =====================================================
INSERT INTO nations (id, name, color, flag_emoji, resources, leader, start_relations) VALUES
    ('italia', 'Repubblica Italiana', '#008C45', '🇮🇹',
     '{"money": 1000, "oil": 50, "steel": 30, "food": 80}',
     '{"name": "Marco Rossi", "personality": "Diplomatic", "ideology": "Pragmatic"}',
     '{"francia": 10, "germania": 15, "usa": 5, "cina": -5, "russia": -10}'),

    ('francia', 'Repubblica Francese', '#0055A4', '🇫🇷',
     '{"money": 1100, "oil": 20, "steel": 40, "food": 60}',
     '{"name": "Jean-Pierre Dubois", "personality": "Diplomatic", "ideology": "Progressive"}',
     '{"italia": 10, "germania": 20, "usa": 15, "cina": 0, "russia": -5}'),

    ('germania', 'Repubblica Tedesca', '#000000', '🇩🇪',
     '{"money": 1500, "oil": 10, "steel": 60, "food": 40}',
     '{"name": "Hans Mueller", "personality": "Technocratic", "ideology": "Conservative"}',
     '{"italia": 15, "francia": 20, "usa": 10, "cina": 5, "russia": 0}'),

    ('usa', 'Stati Uniti d''America', '#BF0A30', '🇺🇸',
     '{"money": 2000, "oil": 100, "steel": 80, "food": 100}',
     '{"name": "John Smith", "personality": "Aggressive", "ideology": "Nationalist"}',
     '{"italia": 5, "francia": 15, "germania": 10, "cina": -20, "russia": -30}'),

    ('cina', 'Repubblica Popolare Cinese', '#DE2910', '🇨🇳',
     '{"money": 1800, "oil": 80, "steel": 100, "food": 90}',
     '{"name": "Li Wei", "personality": "Pragmatic", "ideology": "Nationalist"}',
     '{"italia": -5, "francia": 0, "germania": 5, "usa": -20, "russia": 20}'),

    ('russia', 'Federazione Russa', '#DA291C', '🇷🇺',
     '{"money": 800, "oil": 150, "steel": 70, "food": 30}',
     '{"name": "Ivan Petrov", "personality": "Aggressive", "ideology": "Nationalist"}',
     '{"italia": -10, "francia": -5, "germania": 0, "usa": -30, "cina": 20}'),

    ('regno_unito', 'Regno Unito', '#00247D', '🇬🇧',
     '{"money": 1200, "oil": 30, "steel": 40, "food": 50}',
     '{"name": "James Wilson", "personality": "Diplomatic", "ideology": "Conservative"}',
     '{"italia": 5, "francia": 15, "germania": 10, "usa": 20, "cina": -10, "russia": -15}'),

    ('giappone', 'Giappone', '#FFFFFF', '🇯🇵',
     '{"money": 1400, "oil": 40, "steel": 90, "food": 30}',
     '{"name": "Takeshi Yamamoto", "personality": "Technocratic", "ideology": "Pragmatic"}',
     '{"italia": 5, "francia": 5, "germania": 10, "usa": 15, "cina": 0, "russia": -5}')
ON CONFLICT (id) DO NOTHING;

-- Turni iniziali per ogni nazione (turno 0)
INSERT INTO game_turns (nation_id, turn_number, pa_remaining, economy, consensus, factions, tech, rng_seed)
SELECT
    n.id,
    0,
    3,
    '{"gdp": 1000, "growth": 2.5, "inflation": 2.0, "debt": 0, "debt_gdp": 0, "unemployment": 5.0, "budget_balance": 0, "reserves": 100, "sectors": {"agriculture": {"level": 3, "efficiency": 0.7, "maintenance_cost": 5}, "industry": {"level": 3, "efficiency": 0.6, "maintenance_cost": 10}, "services": {"level": 4, "efficiency": 0.8, "maintenance_cost": 15}}}',
    '{"general": 50, "economic": 50, "security": 50, "freedom": 50}',
    '[{"id": "progressives", "name": "Progressisti", "type": "Progressive", "base_approval": 35, "weight": 0.3, "demands": {"environment": 1, "social": 1}, "mobilization": 30}, {"id": "conservatives", "name": "Conservatori", "type": "Conservative", "base_approval": 30, "weight": 0.25, "demands": {"tradition": 1, "economy": 1}, "mobilization": 25}, {"id": "nationalists", "name": "Nazionalisti", "type": "Nationalist", "base_approval": 20, "weight": 0.2, "demands": {"military": 1, "sovereignty": 1}, "mobilization": 20}, {"id": "globalists", "name": "Globalisti", "type": "Globalist", "base_approval": 15, "weight": 0.15, "demands": {"trade": 1, "cooperation": 1}, "mobilization": 15}, {"id": "technocrats", "name": "Tecnocrati", "type": "Technocratic", "base_approval": 25, "weight": 0.2, "demands": {"tech": 1, "efficiency": 1}, "mobilization": 25}]',
    '{"launchers": {"level": 1, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}',
    calculate_seed(n.id, 0, 'v1')
FROM nations n
ON CONFLICT (nation_id, turn_number) DO NOTHING;

-- Relazioni iniziali
INSERT INTO relations (nation_a, nation_b, value)
SELECT n1.id, n2.id,
    COALESCE(
        (n1.start_relations->>n2.id)::INT,
        (n2.start_relations->>n1.id)::INT,
        0
    )
FROM nations n1
CROSS JOIN nations n2
WHERE n1.id < n2.id
ON CONFLICT (nation_a, nation_b) DO NOTHING;

-- Evento di sistema iniziale
INSERT INTO game_events (turn_id, nation_id, type, title, description, severity)
SELECT t.turn_id, t.nation_id, 'system', 'Partita Iniziata', 'La simulazione geopolitica è iniziata. Buona fortuna!', 'positive'
FROM game_turns t
WHERE t.turn_number = 0
ON CONFLICT DO NOTHING;
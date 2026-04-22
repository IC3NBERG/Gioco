-- GEOPOLITICA AVANZATA - Security System
-- Version: 1.0.0
-- Adds: national_security, security_threats tables

-- =====================================================
-- TABELLA: national_security
-- Livelli di sicurezza per nazione
-- =====================================================
CREATE TABLE national_security (
    nation_id TEXT PRIMARY KEY REFERENCES nations(id) ON DELETE CASCADE,
    level INT DEFAULT 30 CHECK (level BETWEEN 0 AND 100),
    intelligence_capability INT DEFAULT 30,
    counter_intelligence INT DEFAULT 20,
    surveillance INT DEFAULT 30,
    encryption INT DEFAULT 25,
    internal_threats INT DEFAULT 0,
    external_threats INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABELLA: security_threats
-- Minacce attive alla sicurezza
-- =====================================================
CREATE TABLE security_threats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nation_id TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    threat_type TEXT NOT NULL CHECK (threat_type IN ('terrorist', 'insurgent', 'organized_crime', 'spy', 'saboteur', 'cyber')),
    severity TEXT DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    source_nation TEXT,
    description TEXT,
    detected_at INT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'monitored', 'neutralized', 'eliminated')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_security_threats_nation ON security_threats(nation_id, status);
CREATE INDEX idx_security_threats_type ON security_threats(threat_type);

-- =====================================================
-- TABELLA: security_events
-- Storico eventi di sicurezza
-- =====================================================
CREATE TABLE security_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nation_id TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL CHECK (event_type IN ('detection', 'breach', 'countermeasure', 'incident')),
    threat_type TEXT,
    description TEXT,
    severity TEXT DEFAULT 'neutral',
    resolved BOOLEAN DEFAULT FALSE,
    turn_created INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_security_events_nation ON security_events(nation_id, turn_created DESC);

-- =====================================================
-- RLS
-- =====================================================
ALTER TABLE national_security ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_threats ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "national_security_public" ON national_security FOR SELECT USING (true);
CREATE POLICY "security_threats_public" ON security_threats FOR SELECT USING (true);
CREATE POLICY "security_events_public" ON security_events FOR SELECT USING (true);

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Calcola rischio spionaggio basato su sicurezza
CREATE OR REPLACE FUNCTION calculate_spy_risk(
    p_target_nation_id TEXT,
    p_operation_type TEXT
)
RETURNS FLOAT AS $$
DECLARE
    v_security national_security%ROWTYPE;
    v_base_risk FLOAT := 0.5;
    v_counter_intel_bonus FLOAT;
BEGIN
    SELECT * INTO v_security FROM national_security WHERE nation_id = p_target_nation_id;
    IF NOT FOUND THEN
        RETURN v_base_risk;
    END IF;

    -- Counter-intelligence riduce il rischio di successo per operazioni nemiche
    v_counter_intel_bonus := v_security.counter_intelligence / 100.0;

    -- Livello sicurezza generale
    v_base_risk := v_base_risk - (v_security.level / 200.0);
    v_base_risk := v_base_risk - v_counter_intel_bonus;

    -- Tipo operazione
    CASE p_operation_type
        WHEN 'assassination' THEN v_base_risk := v_base_risk + 0.2;
        WHEN 'sabotage' THEN v_base_risk := v_base_risk + 0.1;
        WHEN 'kidnapping' THEN v_base_risk := v_base_risk + 0.15;
        ELSE v_base_risk := v_base_risk;
    END CASE;

    RETURN GREATEST(0.1, LEAST(0.9, v_base_risk));
END;
$$ LANGUAGE plpgsql STABLE;

-- Aggiorna livello sicurezza
CREATE OR REPLACE FUNCTION update_security_level(
    p_nation_id TEXT,
    p_change INT
)
RETURNS VOID AS $$
BEGIN
    UPDATE national_security
    SET level = GREATEST(0, LEAST(100, level + p_change)),
        updated_at = NOW()
    WHERE nation_id = p_nation_id;

    IF NOT FOUND THEN
        INSERT INTO national_security (nation_id, level)
        VALUES (p_nation_id, p_change);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Rileva minaccia
CREATE OR REPLACE FUNCTION detect_security_threat(
    p_nation_id TEXT,
    p_threat_type TEXT,
    p_severity TEXT,
    p_source_nation TEXT,
    p_description TEXT,
    p_turn INT
)
RETURNS UUID AS $$
DECLARE
    v_threat_id UUID;
    v_random FLOAT;
BEGIN
    v_random := random();

    -- Probability di detection basata su surveillance
    INSERT INTO security_threats (
        nation_id, threat_type, severity, source_nation, description, detected_at
    )
    VALUES (p_nation_id, p_threat_type, p_severity, p_source_nation, p_description, p_turn)
    RETURNING id INTO v_threat_id;

    RETURN v_threat_id;
END;
$$ LANGUAGE plpgsql;

-- Neutralizza minaccia
CREATE OR REPLACE FUNCTION neutralize_threat(p_threat_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE security_threats
    SET status = 'neutralized',
        updated_at = NOW()
    WHERE id = p_threat_id;
END;
$$ LANGUAGE plpgsql;

-- Registra evento sicurezza
CREATE OR REPLACE FUNCTION log_security_event(
    p_nation_id TEXT,
    p_event_type TEXT,
    p_threat_type TEXT,
    p_description TEXT,
    p_severity TEXT,
    p_turn INT
)
RETURNS UUID AS $$
DECLARE
    v_event_id UUID;
BEGIN
    INSERT INTO security_events (nation_id, event_type, threat_type, description, severity, turn_created)
    VALUES (p_nation_id, p_event_type, p_threat_type, p_description, p_severity, p_turn)
    RETURNING id INTO v_event_id;
    RETURN v_event_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- INSERT SEED SECURITY DATA
-- =====================================================
INSERT INTO national_security (nation_id, level, intelligence_capability, counter_intelligence, surveillance, encryption) VALUES
    ('usa', 70, 60, 50, 65, 60),
    ('cina', 55, 50, 45, 50, 45),
    ('russia', 60, 55, 40, 55, 50),
    ('regno_unito', 65, 55, 50, 60, 55),
    ('francia', 55, 45, 40, 50, 50),
    ('germania', 50, 40, 35, 45, 55),
    ('giappone', 45, 40, 35, 40, 45),
    ('italia', 40, 35, 30, 40, 40)
ON CONFLICT (nation_id) DO NOTHING;
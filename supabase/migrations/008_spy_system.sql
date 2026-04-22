-- GEOPOLITICA AVANZATA - Spionaggio System
-- Version: 1.0.0
-- Adds: spy_agents, spy_operations tables

-- =====================================================
-- TABELLA: spy_agents
-- Agenti di spionaggio attivi per nazione
-- =====================================================
CREATE TABLE spy_agents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nation_id TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    specialization TEXT NOT NULL CHECK (specialization IN ('hack', 'assassin', 'sabotage', 'diplomat', 'double_agent', 'infiltrator')),
    level INT DEFAULT 1 CHECK (level BETWEEN 1 AND 5),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'captured', 'killed', 'missing')),
    location TEXT DEFAULT 'home',
    experience INT DEFAULT 0,
    missions_completed INT DEFAULT 0,
    cover_blow FLOAT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_spy_agents_nation ON spy_agents(nation_id, status);
CREATE INDEX idx_spy_agents_specialization ON spy_agents(specialization);

-- =====================================================
-- TABELLA: spy_operations
-- Operazioni di spionaggio attive
-- =====================================================
CREATE TABLE spy_operations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    source_nation TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    target_nation TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('reconnaissance', 'assassination', 'sabotage', 'theft', 'kidnapping', 'coup', 'disinformation', 'propaganda', 'bribery', 'double_agent')),
    status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed', 'failed', 'discovered')),
    progress INT DEFAULT 0,
    risk FLOAT DEFAULT 0.5,
    target_info JSONB DEFAULT '{}',
    created_at INT NOT NULL,
    completed_at INT,
    effects JSONB DEFAULT '[]'
);

CREATE INDEX idx_spy_ops_source ON spy_operations(source_nation, status);
CREATE INDEX idx_spy_ops_target ON spy_operations(target_nation, status);
CREATE INDEX idx_spy_ops_created ON spy_operations(created_at);

-- =====================================================
-- TABELLA: intelligence_reports
-- Report raccolti dalle operazioni
-- =====================================================
CREATE TABLE intelligence_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nation_id TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    target_nation TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    report_type TEXT NOT NULL,
    content JSONB DEFAULT '{}',
    reliability FLOAT DEFAULT 0.5,
    collected_at INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_intel_reports_nation ON intelligence_reports(nation_id, collected_at DESC);

-- =====================================================
-- RLS
-- =====================================================
ALTER TABLE spy_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE spy_operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE intelligence_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "spy_agents_own_nation" ON spy_agents FOR ALL USING (true);
CREATE POLICY "spy_operations_own_nation" ON spy_operations FOR ALL USING (true);
CREATE POLICY "intelligence_reports_own_nation" ON intelligence_reports FOR ALL USING (true);

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Crea un nuovo agente
CREATE OR REPLACE FUNCTION create_spy_agent(
    p_nation_id TEXT,
    p_name TEXT,
    p_specialization TEXT,
    p_level INT DEFAULT 1
)
RETURNS UUID AS $$
DECLARE
    v_agent_id UUID;
BEGIN
    INSERT INTO spy_agents (nation_id, name, specialization, level)
    VALUES (p_nation_id, p_name, p_specialization, p_level)
    RETURNING id INTO v_agent_id;
    RETURN v_agent_id;
END;
$$ LANGUAGE plpgsql;

-- Conta agenti attivi per nazione
CREATE OR REPLACE FUNCTION get_active_agents_count(p_nation_id TEXT)
RETURNS INT AS $$
DECLARE
    v_count INT;
BEGIN
    SELECT COUNT(*) INTO v_count
    FROM spy_agents
    WHERE nation_id = p_nation_id AND status = 'active';
    RETURN v_count;
END;
$$ LANGUAGE plpgsql STABLE;

-- Operazione completata con successo
CREATE OR REPLACE FUNCTION complete_spy_operation(p_operation_id UUID, p_success BOOLEAN DEFAULT true)
RETURNS VOID AS $$
DECLARE
    v_op spy_operations%ROWTYPE;
    v_specialization TEXT;
    v_agent_id UUID;
BEGIN
    SELECT * INTO v_op FROM spy_operations WHERE id = p_operation_id;
    
    UPDATE spy_operations 
    SET status = CASE WHEN p_success THEN 'completed' ELSE 'failed' END,
        completed_at = EXTRACT(EPOCH FROM NOW())::INT
    WHERE id = p_operation_id;

    IF p_success THEN
        v_specialization := CASE v_op.type
            WHEN 'assassination' THEN 'assassin'
            WHEN 'theft' THEN 'hack'
            WHEN 'sabotage' THEN 'sabotage'
            WHEN 'double_agent' THEN 'double_agent'
            ELSE 'infiltrator'
        END;

        -- Trova agente con più esperienza
        SELECT id INTO v_agent_id
        FROM spy_agents
        WHERE nation_id = v_op.source_nation 
        AND status = 'active'
        AND specialization = v_specialization
        ORDER BY experience DESC
        LIMIT 1;

        IF v_agent_id IS NOT NULL THEN
            UPDATE spy_agents 
            SET experience = experience + 15,
                missions_completed = missions_completed + 1
            WHERE id = v_agent_id;
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Insert seed data: starter agents per alcune nazioni
INSERT INTO spy_agents (nation_id, name, specialization, level, status) VALUES
    ('usa', 'Agent Alpha', 'infiltrator', 2, 'active'),
    ('usa', 'Agent Bravo', 'hack', 2, 'active'),
    ('usa', 'Agent Charlie', 'diplomat', 1, 'active'),
    ('cina', '深海', 'infiltrator', 2, 'active'),
    ('cina', '蓝天', 'hack', 1, 'active'),
    ('russia', 'Кузнец', 'assassin', 2, 'active'),
    ('russia', 'Ветер', 'sabotage', 1, 'active'),
    ('regno_unito', 'Operative Fox', 'double_agent', 2, 'active'),
    ('francia', 'Agent Lys', 'diplomat', 1, 'active'),
    ('germania', 'Agent Adler', 'hack', 2, 'active')
ON CONFLICT DO NOTHING;
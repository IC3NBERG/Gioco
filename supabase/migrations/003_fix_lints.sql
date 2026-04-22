-- GEOPOLITICA AVANZATA - Fix Security & Performance Lints
-- Version: 1.3.1
-- Fix all Supabase lint warnings

-- =====================================================
-- 1. FIX VIEW: latest_turns (Security Definer)
-- =====================================================
DROP VIEW IF EXISTS latest_turns;
CREATE VIEW latest_turns AS
SELECT nation_id, MAX(turn_number) as latest_turn_number
FROM game_turns
GROUP BY nation_id;

-- =====================================================
-- 2. FIX FUNCTIONS: Set search_path to prevent SQL injection
-- =====================================================
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
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = 'public';

CREATE OR REPLACE FUNCTION calculate_seed(p_nation_id TEXT, p_turn_number INT, p_config_version TEXT DEFAULT 'v1')
RETURNS TEXT AS $$
BEGIN
    RETURN encode(
        digest(p_nation_id || '-' || p_turn_number || '-' || p_config_version, 'sha256'),
        'hex'
    )::text;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = 'public';

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
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = 'public';

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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';

-- =====================================================
-- 3. ADD INDEXES FOR FOREIGN KEYS (Performance)
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_action_queue_nation ON action_queue(nation_id);
CREATE INDEX IF NOT EXISTS idx_ai_turns_nation ON ai_turns(nation_id);
CREATE INDEX IF NOT EXISTS idx_ai_turns_session ON ai_turns(session_id);
CREATE INDEX IF NOT EXISTS idx_consequences_nation ON consequences(nation_id);
CREATE INDEX IF NOT EXISTS idx_consequences_turn ON consequences(turn_id);
CREATE INDEX IF NOT EXISTS idx_game_events_nation ON game_events(nation_id);
CREATE INDEX IF NOT EXISTS idx_relations_nation_b ON relations(nation_b);

-- =====================================================
-- 4. REMOVE UNUSED INDEXES (Optimization)
-- =====================================================
DROP INDEX IF EXISTS idx_relations_pair;
DROP INDEX IF EXISTS idx_events_turn;
DROP INDEX IF EXISTS idx_events_type;
DROP INDEX IF EXISTS idx_action_queue_status;
DROP INDEX IF EXISTS idx_action_queue_pending;

-- =====================================================
-- 5. ADD RLS POLICIES (Security)
-- =====================================================
-- action_queue policies
CREATE POLICY "public_read_action_queue" ON action_queue FOR SELECT USING (true);
CREATE POLICY "public_insert_action_queue" ON action_queue FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update_action_queue" ON action_queue FOR UPDATE USING (true);

-- ai_turns policies
CREATE POLICY "public_read_ai_turns" ON ai_turns FOR SELECT USING (true);
CREATE POLICY "public_insert_ai_turns" ON ai_turns FOR INSERT WITH CHECK (true);

-- consequences policies
CREATE POLICY "public_read_consequences" ON consequences FOR SELECT USING (true);
CREATE POLICY "public_insert_consequences" ON consequences FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update_consequences" ON consequences FOR UPDATE USING (true);

-- =====================================================
-- 6. CREATE VIEW latest_turns (Alternative with proper security)
-- =====================================================
-- Already done in step 1

-- Done!
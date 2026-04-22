-- GEOPOLITICA AVANZATA - Definitive Fix: Force SECURITY INVOKER
-- Version: 1.3.5 - DEFINITIVE

-- =====================================================
-- 1. COMPLETELY DROP VIEW (including any hidden DEFINER)
-- =====================================================
DROP VIEW IF EXISTS latest_turns CASCADE;

-- =====================================================
-- 2. RECREATE WITH EXPLICIT SECURITY INVOKER
-- Note: Must use a function to set security_barrier in Postgres
-- =====================================================
CREATE OR REPLACE FUNCTION get_latest_turns_view()
RETURNS TABLE(nation_id TEXT, latest_turn_number BIGINT)
STABLE
SECURITY INVOKER
SET search_path = 'public'
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.nation_id, 
        MAX(t.turn_number)::BIGINT as latest_turn_number
    FROM game_turns t
    GROUP BY t.nation_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 3. CREATE VIEW THAT USES THE FUNCTION (no SECURITY DEFINER)
-- =====================================================
DROP VIEW IF EXISTS latest_turns;
CREATE VIEW latest_turns AS
SELECT * FROM get_latest_turns_view();

-- Done!
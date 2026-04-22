-- GEOPOLITICA AVANZATA - Force Fix View
-- Version: 1.3.3 - FORCE FIX

-- =====================================================
-- COMPLETELY DROP AND RECREATE VIEW
-- =====================================================
DROP VIEW IF EXISTS latest_turns;

CREATE VIEW latest_turns AS
SELECT 
    nation_id, 
    MAX(turn_number) as latest_turn_number
FROM game_turns
GROUP BY nation_id;

-- Verify it's not security definer
ALTER VIEW latest_turns OWNER TO postgres;

-- Done!
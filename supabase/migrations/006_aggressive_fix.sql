-- GEOPOLITICA AVANZATA - Aggressive Fix View
-- Version: 1.3.4 - CASCADE DROP

-- =====================================================
-- DROP VIEW WITH CASCADE TO FORCE REMOVE
-- =====================================================
DROP VIEW IF EXISTS latest_turns CASCADE;

CREATE VIEW latest_turns AS
SELECT 
    nation_id, 
    MAX(turn_number) as latest_turn_number
FROM game_turns
GROUP BY nation_id;

-- Done!
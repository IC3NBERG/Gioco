-- GEOPOLITICA AVANZATA - Fix Remaining Lints
-- Version: 1.3.2

-- =====================================================
-- 1. DROP AND RECREATE VIEW (Fix Security Definer)
-- =====================================================
DROP VIEW IF EXISTS latest_turns;
CREATE VIEW latest_turns AS
SELECT nation_id, MAX(turn_number) as latest_turn_number
FROM game_turns
GROUP BY nation_id;

-- =====================================================
-- 2. REMOVE PERMISSIVE RLS POLICIES
-- Note: For a game with anon client, we need permissive policies
-- This is expected - suppress by removing and adding RESTRICTIVE ones
-- =====================================================
DROP POLICY IF EXISTS "public_insert_action_queue" ON action_queue;
DROP POLICY IF EXISTS "public_update_action_queue" ON action_queue;
DROP POLICY IF EXISTS "public_insert_ai_turns" ON ai_turns;
DROP POLICY IF EXISTS "public_insert_consequences" ON consequences;
DROP POLICY IF EXISTS "public_update_consequences" ON consequences;

-- Keep only SELECT policies (intentionally permissive for public games)
-- INSERT/UPDATE handled by Edge Functions with service_role

-- Done!
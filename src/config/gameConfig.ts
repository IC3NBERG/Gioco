export const GAME_CONFIG = {
  // Game Mechanics
  PA_PER_TURN: 3,
  MAX_TURNS_PER_YEAR: 4,
  TURNS_TO_WIN: 20,
  
  // Victory Conditions
  VICTORY_CONSENSUS_THRESHOLD: 80,
  VICTORY_TECH_LEVEL: 3,
  VICTORY_SPACE_UNLOCK: 'lunar_colony',
  
  // AI Settings
  AI_THINK_TIME_MS: 500,
  AI_MAX_ACTIONS: 3,
  AI_AGGRESSION_SCALE: 0.3,
  
  // Economics
  BASE_GDP: 1000,
  BASE_GROWTH: 2.5,
  BASE_INFLATION: 2.0,
  BASE_DEBT: 0,
  BASE_RESERVES: 100,
  
  // Consensus
  BASE_CONSENSUS: 50,
  CONSENSUS_DRIFT_RANGE: 3,
  
  // Tech
  BASE_TECH_LEVEL: 1,
  TECH_PROGRESS_PER_TURN: 10,
  
  // World
  TOTAL_NATIONS: 58,
  PLAYABLE_NATIONS: 1,
  AI_NATIONS: 57,
  
  // Map Settings
  MAP_CENTER: [0, 0] as [number, number],
  MAP_ZOOM: 1.5,
  
  // Timing
  TURN_TIMEOUT_MS: 30000,
  AI_ROUND_TIMEOUT_MS: 60000,
  
  // Data Retention
  EVENT_RETENTION_DAYS: 30,
  MAX_EVENTS_SHOWN: 100,
  
  // UI
  MAX_FACTIONS_SHOWN: 6,
  SIDEBAR_WIDTH: 320,
  
  // Debug
  DEBUG_MODE: import.meta.env.DEV,
  LOG_AI_DECISIONS: import.meta.env.DEV,
} as const;

export type GameConfig = typeof GAME_CONFIG;
export default GAME_CONFIG;
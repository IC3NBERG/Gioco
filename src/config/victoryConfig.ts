export const VICTORY_CONFIG = {
  TURNS_TO_WIN: 20,
  MAX_TURNS_PER_YEAR: 4,
  
  CONSENSUS_THRESHOLD: 80,
  TECH_LEVEL_REQUIRED: 'lunar_colony',
  
  WORLD_CONTROL: {
    EASY: 30,
    MEDIUM: 50,
    HARD: 70,
    IMPOSSIBLE: 90,
  },
  
  GDP_RANK: {
    EASY: 10,
    MEDIUM: 5,
    HARD: 3,
  },
  
  ALLIES_REQUIRED: {
    EASY: 3,
    MEDIUM: 5,
    HARD: 8,
  },
  
  SPACE_LEVELS: {
    MOON: 'lunar_colony',
    MARS: 'mars_colony',
    STATIONS: 'stations',
  },
  
  SURVIVAL_TURNS: {
    EASY: 15,
    MEDIUM: 20,
    HARD: 25,
  },
  
  DIFFICULTY_MODIFIERS: {
    EASY: {
      consensusThreshold: 0.8,
      gdpMultiplier: 1.2,
      eventProbability: 0.7,
    },
    MEDIUM: {
      consensusThreshold: 1.0,
      gdpMultiplier: 1.0,
      eventProbability: 1.0,
    },
    HARD: {
      consensusThreshold: 1.2,
      gdpMultiplier: 0.8,
      eventProbability: 1.3,
    },
    IMPOSSIBLE: {
      consensusThreshold: 1.5,
      gdpMultiplier: 0.6,
      eventProbability: 1.5,
    },
  },
  
  LOSE_CONDITIONS: {
    CONSENSUS_MIN: 10,
    GDP_MIN: 100,
    STABILITY_MIN: 5,
  },
} as const;

export type VictoryConfig = typeof VICTORY_CONFIG;
export default VICTORY_CONFIG;
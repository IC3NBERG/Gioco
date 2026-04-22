export const AI_CONFIG = {
  THINK_TIME_MS: 500,
  MAX_ACTIONS: 3,
  AGGRESSION_SCALE: 0.3,
  
  PERSONALITY_TYPES: {
    AGGRESSIVE: {
      warBias: 0.6,
      diplomacyBias: 0.2,
      economyBias: 0.2,
    },
    DIPLOMATIC: {
      warBias: 0.1,
      diplomacyBias: 0.6,
      economyBias: 0.3,
    },
    ECONOMIC: {
      warBias: 0.2,
      diplomacyBias: 0.3,
      economyBias: 0.5,
    },
    NEUTRAL: {
      warBias: 0.33,
      diplomacyBias: 0.33,
      economyBias: 0.34,
    },
  },
  
  DECISION_WEIGHTS: {
    CONSENSUS_CRITICAL: 0.8,
    GDP_CRITICAL: 0.7,
    STABILITY_LOW: 0.6,
    DEFAULT: 0.4,
  },
  
  RELATION_THRESHOLDS: {
    ALLY: 50,
    NEUTRAL: 0,
    ENEMY: -30,
    WAR: -50,
  },
  
  RISK_TOLERANCE: {
    LOW: 0.2,
    MEDIUM: 0.4,
    HIGH: 0.6,
  },
} as const;

export type AIConfig = typeof AI_CONFIG;
export default AI_CONFIG;
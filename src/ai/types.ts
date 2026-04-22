import type { Choice, ChoiceCategory, ChoiceSubcategory } from '../types';

export type AIPersonality = 
  | 'aggressive'    
  | 'diplomatic'     
  | 'pragmatic'      
  | 'nationalist'    
  | 'isolationist'    
  | 'technocratic'    
  | 'populist'       
  | 'militarist'      
  | 'pacifist'       
  | 'opportunist';

export type AIState = 
  | 'idle'           
  | 'analyzing'      
  | 'planning'       
  | 'attacking'      
  | 'negotiating'    
  | 'defending'      
  | 'expanding'      
  | 'collapsing';

export type GoalType = 
  | 'conquest'        
  | 'alliance'       
  | 'economy'         
  | 'technology'      
  | 'survival'        
  | 'prestige'        
  | 'ideology';

export type ThreatLevel = 'none' | 'low' | 'medium' | 'high' | 'critical';

export type RelationTrend = 'improving' | 'stable' | 'declining' | 'hostile';

export interface AIGoal {
  id: string;
  type: GoalType;
  priority: number;
  target?: string;
  deadline?: number;
  progress: number;
  strategies: string[];
  status: 'active' | 'paused' | 'completed' | 'failed';
}

export interface ThreatAssessment {
  source: string;
  level: ThreatLevel;
  type: 'military' | 'economic' | 'diplomatic' | 'ideological';
  probability: number;
  timeframe: number;
  severity: number;
  responseOptions: string[];
}

export interface AllianceProposal {
  targetNation: string;
  type: 'defensive' | 'economic' | 'technology' | 'military' | 'cultural';
  terms: {
    mutualDefense: boolean;
    tradeBenefits: number;
    techSharing: boolean;
    militaryAid: boolean;
  };
  acceptanceProbability: number;
  expiresTurn: number;
}

export interface AttackPlan {
  targetNation: string;
  objective: 'conquest' | 'plunder' | 'destabilize' | 'annex' | 'puppet';
  forceCommitted: number;
  expectedLosses: number;
  successProbability: number;
  internationalReaction: { nation: string; reaction: string }[];
  timeline: number;
  risks: { type: string; probability: number }[];
  alternatives: string[];
}

export interface MemoryEntry {
  turn: number;
  action: string;
  result: 'success' | 'failure' | 'mixed';
  consequence: string;
  lesson?: string;
}

export interface AIMemory {
  nationId: string;
  pastActions: MemoryEntry[];
  successfulStrategies: string[];
  failedStrategies: string[];
  playerInteractions: { turn: number; action: string; reaction: string }[];
  worldEventsWitnessed: string[];
  adaptationScores: Record<string, number>;
  betrayalRecord: Record<string, number>;
  allianceDurations: Record<string, number>;
}

export interface AIPreferenceWeights {
  category: Record<ChoiceCategory, number>;
  subcategory: Record<ChoiceSubcategory, number>;
  riskTolerance: number;
  longTermVsShortTerm: number;
  individualVsCollective: number;
}

export interface NationRelations {
  nationId: string;
  value: number;
  trend: RelationTrend;
  trust: number;
  lastInteraction: number;
  agreements: string[];
  grievances: string[];
}

export interface AIEvaluation {
  actionId: string;
  score: number;
  reasoning: string;
  expectedOutcome: string;
  risks: { risk: string; probability: number; impact: number }[];
  alternatives: { actionId: string; score: number }[];
}

export interface NATION_BEHAVIORS {
  [personality: string]: {
    name: string;
    description: string;
    
    weights: AIPreferenceWeights;
    
    thresholds: {
      attack: number;
      ally: number;
      defend: number;
      negotiate: number;
      sanction: number;
    };
    
    triggers: {
      attackWhen: string;
      allyWhen: string;
      defendWhen: string;
      negotiateWhen: string;
    };
    
    responses: {
      threatened: string;
      attacked: string;
      allied: string;
      sanctioned: string;
      ignored: string;
    };
    
    personalityTraits: {
      patience: number;
      honor: number;
      greed: number;
      ambition: number;
      caution: number;
      pride: number;
    };
  };
}

export interface AIControllerConfig {
  nationId: string;
  personality: AIPersonality;
  ideology: string;
  focus: string;
  memoryEnabled: boolean;
  learningEnabled: boolean;
  aggressiveLearning: boolean;
}

export interface TurnDecision {
  turnNumber: number;
  nationId: string;
  chosenActions: Choice[];
  reasoning: string;
  confidence: number;
  unexpectedConsequences: string[];
}

export interface ReputationRecord {
  nationId: string;
  trustScore: number;
  fulfillments: number;
  betrayals: number;
  neutralActions: number;
}
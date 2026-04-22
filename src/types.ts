export type ChoiceCategory = 'economia' | 'militare' | 'politica' | 'diplomazia' | 'tecnologia' | 'cultura';
export type ChoiceSubcategory = 
  | 'agricoltura' | 'industria' | 'commercio' | 'finanza' | 'risorse' | 'lavoro'
  | 'forze_armate' | 'difesa' | 'attacco' | 'spionaggio' | 'logistica' | 'diplomazia_bellica'
  | 'leggi' | 'riforme' | 'propaganda' | 'corruzione' | 'risorse_umane' | 'burocrazia'
  | 'trattati' | 'relazioni' | 'organizzazioni' | 'sanzioni' | 'mediazione'
  | 'ricerca' | 'innovazione' | 'industrializzazione' | 'spazio' | 'energia'
  | 'istruzione' | 'religione' | 'media' | 'tradizione' | 'soft_power' | 'identita';

export type ChoiceType = 'immediate' | 'delayed' | 'branching' | 'chain' | 'cumulative';

export interface ChoiceEffect {
  type: ChoiceType;
  target: string;
  value: number;
  duration: number;
}

export interface ChoiceConsequence {
  trigger: 'if' | 'unless';
  condition: string;
  value: number;
  target: string;
}

export interface ChoiceRisk {
  type: string;
  probability: number;
}

export interface ChoiceRequirement {
  stability?: number;
  gdp?: number;
  technology?: number;
  diplomacy?: number;
  coastline?: boolean;
  desert?: boolean;
  territory?: number;
  food?: number;
  oil?: number;
  allies?: number;
  production?: number;
  tourism?: number;
  [key: string]: any;
}

export interface Choice {
  id: string;
  name: string;
  category: ChoiceCategory;
  subcategory: ChoiceSubcategory;
  description: string;
  cost: {
    pa: number;
    resources: {
      money?: number;
      food?: number;
      oil?: number;
      steel?: number;
      population?: number;
    };
  };
  effects: ChoiceEffect[];
  consequences?: ChoiceConsequence[];
  requirements?: ChoiceRequirement;
  unlocks?: string[];
  risk?: ChoiceRisk;
}

export interface RegionType {
  id: string;
  name: string;
  description: string;
  startingResources: {
    money: number;
    food: number;
    oil: number;
    steel: number;
    population: number;
  };
  bonus: {
    economy?: number;
    military?: number;
    technology?: number;
    food?: number;
    population?: number;
    diplomacy?: number;
    navy?: number;
    commerce?: number;
    culture?: number;
    prestige?: number;
    administration?: number;
    defense?: number;
    exploration?: number;
    isolation?: number;
    softPower?: number;
    energy?: number;
    production?: number;
    innovation?: number;
    territory?: number;
    stability?: number;
    movement?: number;
  };
  weakness: {
    economy?: number;
    military?: number;
    technology?: number;
    food?: number;
    diplomacy?: number;
    territory?: number;
    population?: number;
    defense?: number;
    stability?: number;
    administration?: number;
    movement?: number;
    environment?: number;
    health?: number;
    land?: number;
  };
  expansionPotential: string;
  difficulty: 'facile' | 'media' | 'difficile';
}

export interface IdeologyType {
  id: string;
  name: string;
  description: string;
  effects: {
    consensus?: number;
    stability?: number;
    military?: number;
    economy?: number;
    diplomacy?: number;
    nationalism?: number;
    tradition?: number;
    flexibility?: number;
    technology?: number;
    culture?: number;
    softPower?: number;
    unity?: number;
    aggression?: number;
    equality?: number;
    production?: number;
    incentive?: number;
    freedom?: number;
    innovation?: number;
    chaos?: number;
    adaptability?: number;
    corruption?: number;
    independence?: number;
    selfReliance?: number;
    reputation?: number;
  };
  compatibleFactions: string[];
  color: string;
}

export interface FocusType {
  id: string;
  name: string;
  description: string;
  bonus: {
    conquest?: number;
    territory?: number;
    defense?: number;
    stability?: number;
    economy?: number;
    trade?: number;
    technology?: number;
    innovation?: number;
    alliance?: number;
    reputation?: number;
    independence?: number;
    selfReliance?: number;
    culture?: number;
    softPower?: number;
    space?: number;
    prestige?: number;
    expansion?: number;
    aggression?: number;
  };
  weakness: {
    stability?: number;
    diplomacy?: number;
    military?: number;
    territory?: number;
    sovereignty?: number;
    tradition?: number;
    resources?: number;
    alliance?: number;
    expansion?: number;
    economy?: number;
    earth?: number;
  };
  unlockedChoices: string[];
}

export interface VictoryCondition {
  id: string;
  name: string;
  description: string;
  type: 'conquista' | 'economica' | 'diplomatica' | 'spaziale' | 'sopravvivenza' | 'mista' | 'infinita';
  target: {
    worldControl?: number;
    gdpRank?: number;
    alliesRequired?: number;
    spaceLevel?: string;
    survivalTurns?: number;
  };
  difficulty: 'facile' | 'media' | 'difficile' | 'impossibile' | 'nessuna';
  turnsRequired: number;
}

export interface Leader {
  name: string;
  ideology: string;
  personality: string;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface Nation {
  id: string;
  name: string;
  color: string;
  flag_emoji?: string;
  resources?: {
    money: number;
    food?: number;
    oil?: number;
    steel?: number;
    population?: number;
  };
  leader: Leader;
  start_relations?: Record<string, number>;
  tech_tree?: Record<string, TechProgress>;
  position?: Position;
}

export type Resources = Nation['resources'];

export interface GameNation extends Nation {
  isPlayer?: boolean;
  aiPersonality?: string;
  ideology?: string;
  economy?: Partial<Economy>;
  consensus?: Partial<Consensus>;
  tech?: Record<string, TechProgress>;
  relations?: Array<{ nationId: string; value: number }>;
}

export const countryColors: Record<string, string> = {};

export interface Economy {
  gdp: number;
  growth: number;
  inflation: number;
  debt: number;
  debt_gdp: number;
  unemployment: number;
  budget_balance: number;
  reserves: number;
  sectors?: {
    agriculture: { level: number; efficiency: number; maintenance_cost: number };
    industry: { level: number; efficiency: number; maintenance_cost: number };
    services: { level: number; efficiency: number; maintenance_cost: number };
  };
}

export interface Consensus {
  general: number;
  economic: number;
  security: number;
  freedom: number;
}

export interface Faction {
  id: string;
  name: string;
  type: string;
  baseApproval?: number;
  base_approval?: number;
  influence?: number;
  weight: number;
  demands?: Record<string, number>;
  demandsList?: string[];
  mobilization?: number;
  status?: 'loyal' | 'neutral' | 'opposition' | 'hostile';
}

export interface TechProgress {
  level: number;
  progress: number;
}

export interface TechTree {
  launchers: TechProgress;
  satellites: TechProgress;
  stations: TechProgress;
  lunar: TechProgress;
  mars: TechProgress;
}

export interface GameTurn {
  turn_id: number;
  nation_id: string;
  turn_number: number;
  pa_remaining: number;
  config_version?: string;
  economy: Economy;
  consensus: Consensus;
  factions: Faction[];
  tech: TechTree;
  rng_seed: string;
  created_at?: string;
}

export interface Relation {
  nation_a: string;
  nation_b: string;
  value: number;
  agreements?: Record<string, boolean>;
  last_interaction_turn?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ActionQueueItem {
  id: number;
  turn_id: number;
  nation_id: string;
  action_type: string;
  target?: string;
  params?: Record<string, unknown>;
  priority?: number;
  status: 'pending' | 'applied' | 'failed' | 'cancelled';
  error_message?: string;
  created_at?: string;
  applied_at?: string;
}

export interface DashboardStats {
  turnNumber: number;
  paRemaining: number;
  gdp: number;
  gdpGrowth: number;
  inflation: number;
  debt: number;
  debtGdp: number;
  consensus: number;
  unemployment: number;
  reserves: number;
  debtVariant?: 'danger' | 'warning' | 'normal';
}

export interface TurnResult {
  success: boolean;
  newTurn?: {
    turn_id: number;
    nation_id: string;
    turn_number: number;
    pa_remaining: number;
    economy: Record<string, number>;
    consensus: Record<string, number>;
    rng_seed: string;
  };
  events: Array<{
    type: string;
    title: string;
    description: string;
    severity: string;
  }>;
  warnings: string[];
  winLose?: 'win' | 'lose';
  error?: string;
}

export interface GameEventDB {
  id: string;
  turn_id: number;
  nation_id: string;
  type: 'diplomacy' | 'economy' | 'crisis' | 'election' | 'space' | 'military' | 'media' | 'system';
  title: string;
  description?: string;
  payload?: Record<string, unknown>;
  severity: 'positive' | 'neutral' | 'negative' | 'critical';
  resolved?: boolean;
  created_at: string;
}

export interface GameEvent {
  id: string;
  name: string;
  description: string;
  category: 'disastro' | 'crisi' | 'scoperta' | 'rivelazione' | 'movimento' | 'unico';
  probability: number;
  effects: ChoiceEffect[];
  requirements?: ChoiceRequirement;
}

export interface NationData {
  id: string;
  name: string;
  color: string;
  position: { lat: number; lng: number };
  ideology: string;
  focus: string;
  stats: {
    gdp: number;
    population: number;
    military: number;
    technology: number;
    stability: number;
    consensus: number;
  };
}

export interface GameState {
  turn: number;
  nation: string;
  resources: {
    money: number;
    food: number;
    oil: number;
    steel: number;
    population: number;
  };
  stats: {
    gdp: number;
    growth: number;
    inflation: number;
    unemployment: number;
    debt: number;
    stability: number;
    consensus: number;
    technology: number;
    military: number;
    prestige: number;
    culture: number;
  };
  choices: Choice[];
  unlockedChoices: string[];
  events: GameEvent[];
  nationRelations: Record<string, number>;
  victoryCondition: VictoryCondition;
}

export type SpySpecialization = 'hack' | 'assassin' | 'sabotage' | 'diplomat' | 'double_agent' | 'infiltrator';
export type SpyStatus = 'active' | 'inactive' | 'captured' | 'killed' | 'missing';

export interface SpyAgent {
  id: string;
  name: string;
  specialization: SpySpecialization;
  level: number;
  status: SpyStatus;
  location: string;
  experience: number;
  missions_completed: number;
  cover_blow: number;
}

export type SpyOperationType = 
  | 'reconnaissance' 
  | 'assassination' 
  | 'sabotage' 
  | 'theft' 
  | 'kidnapping' 
  | 'coup' 
  | 'disinformation'
  | 'propaganda'
  | 'bribery'
  | 'double_agent';

export type SpyOperationStatus = 'planning' | 'active' | 'completed' | 'failed' | 'discovered';

export interface SpyOperation {
  id: string;
  type: SpyOperationType;
  source_nation: string;
  target_nation: string;
  status: SpyOperationStatus;
  progress: number;
  risk: number;
  created_at: number;
  completed_at?: number;
  effects: ChoiceEffect[];
}

export type ColdWarPhase = 'neutral' | 'tension' | 'cold_war' | 'crisis' | 'hot_war';

export interface ColdWarState {
  nation_a: string;
  nation_b: string;
  phase: ColdWarPhase;
  tension_level: number;
  provocations: number;
  proxy_wars_won: number;
  lastinteraction: number;
}

export type SpaceQuestType = 
  | 'asteroid_mining'
  | 'lunar_base'
  | 'crew_flight'
  | 'mars_colony'
  | 'orbital_station'
  | 'space_defense'
  | 'tourism'
  | 'research'
  | 'satellite_constellation';

export type SpaceQuestStatus = 'locked' | 'available' | 'in_progress' | 'completed' | 'failed';

export interface SpaceQuest {
  id: string;
  name: string;
  type: SpaceQuestType;
  description: string;
  status: SpaceQuestStatus;
  progress: number;
  requirements: ChoiceRequirement;
  rewards: ChoiceEffect[];
  unlocks: string[];
}

export type SpaceBranch = 'heavy' | 'light' | 'fast' | 'economy';

export interface SpaceTechTree {
  launchers: TechProgress;
  satellites: TechProgress;
  stations: TechProgress;
  lunar: TechProgress;
  mars: TechProgress;
  heavy_launchers?: TechProgress;
  light_launchers?: TechProgress;
  fast_launchers?: TechProgress;
  economy_launchers?: TechProgress;
  orbital_mining?: TechProgress;
  space_defense?: TechProgress;
  tourism?: TechProgress;
}

export type SecurityThreat = 'terrorist' | 'insurgent' | 'organized_crime' | 'spy' | 'saboteur';
export type SecurityLevel = 'low' | 'medium' | 'high' | 'maximum';

export interface NationalSecurity {
  level: number;
  intelligence_capability: number;
  counter_intelligence: number;
  surveillance: number;
  encryption: number;
  active_threats: Record<SecurityThreat, number>;
}
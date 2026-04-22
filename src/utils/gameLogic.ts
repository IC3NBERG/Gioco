import type { Economy, Consensus, Relation } from '../types';

const CONFIG_VERSION = 'v1';

export function calculateSeed(nationId: string, turnNumber: number, configVersion: string = CONFIG_VERSION): string {
  const input = `${nationId}-${turnNumber}-${configVersion}`;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function mulberry32(seed: number) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export function seededRandom(seed: string, min: number, max: number): number {
  const seedNum = hashString(seed);
  const rng = mulberry32(seedNum);
  return min + rng() * (max - min);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export interface ActionEffect {
  relationDelta?: number;
  consensusDelta?: number;
  cost?: number;
  risk?: number;
  cooldown?: number;
}

export const ACTION_EFFECTS: Record<string, ActionEffect> = {
  trade_pact: { relationDelta: 5, cost: 0 },
  non_aggression: { relationDelta: 8, cost: 0 },
  economic_aid: { relationDelta: 10, consensusDelta: 2, cost: 50 },
  sanctions: { relationDelta: -15, consensusDelta: -2 },
  threat: { relationDelta: -10 },
  state_visit: { relationDelta: 3 },
  military_exercise: { relationDelta: -5, consensusDelta: 2 },
  diplomatic_warning: { relationDelta: -5 },
  media_campaign: { consensusDelta: 5 },
  policy_reform: { consensusDelta: 3 },
  budget_increase: { consensusDelta: 2, cost: 30 },
  budget_cut: { consensusDelta: -3, cost: -20 },
  technology_investment: { consensusDelta: 1 },
  space_program: { consensusDelta: 3, cost: 100 },
  military_buildup: { consensusDelta: 2, cost: 80 },
  treaty_join: { relationDelta: 10 },
  treaty_leave: { relationDelta: -20 },
  declare_war: { relationDelta: -50, consensusDelta: 5 },
  accept_peace: { relationDelta: 5 },
  propose_alliance: { relationDelta: 10 },
  breach_alliance: { relationDelta: -25 },
};

export interface GameAction {
  action_type: string;
  target?: string;
  params?: Record<string, unknown>;
}

export function calcMacro(
  prevEconomy: Economy,
  actions: GameAction[],
  seed: string
): Economy {
  const gdp = prevEconomy.gdp || 1000;
  const growth = prevEconomy.growth || 2.5;
  const inflation = prevEconomy.inflation || 2.0;
  const debt = prevEconomy.debt || 0;
  const reserves = prevEconomy.reserves || 100;

  let totalSpending = 0;
  let inflationPressure = 0;
  let sectorInvest = 0;
  let budgetMismatch = 0;

  for (const action of actions) {
    const effect = ACTION_EFFECTS[action.action_type];
    if (effect?.cost) {
      totalSpending += effect.cost;
      if (action.action_type === 'budget_increase') {
        budgetMismatch += effect.cost;
      }
      if (action.action_type === 'budget_cut') {
        budgetMismatch -= Math.abs(effect.cost);
      }
    }
    if (action.action_type.includes('budget') || action.action_type.includes('spending')) {
      inflationPressure += seededRandom(`${seed}-${action.action_type}`, 0.1, 0.5);
    }
    if (action.action_type.includes('investment') || action.action_type.includes('program')) {
      sectorInvest += seededRandom(`${seed}-${action.action_type}`, 0.5, 2.0);
    }
  }

  const taxRate = 0.4;
  const taxRev = gdp * taxRate * (1 - inflation / 100);
  const interest = debt * 0.03;
  const newDebt = Math.max(0, debt + (totalSpending - taxRev - interest));
  const debtGDP = newDebt / gdp;
  
  let newGrowth = growth + sectorInvest * 0.1;
  if (debtGDP > 1.5) newGrowth -= 0.8;
  if (debtGDP > 1.8) newGrowth -= 0.5;

  if (Math.abs(budgetMismatch) > 15) {
    inflationPressure += 0.5;
    newGrowth -= 0.1;
  }

  const newInflation = clamp(inflation + inflationPressure - (sectorInvest * 0.1), 0.5, 12);
  const newReserves = Math.max(0, reserves + taxRev - totalSpending - interest);

  const unemploymentChange = newGrowth < 0 ? 0.5 : (newGrowth > 5 ? -0.5 : 0);

  return {
    gdp: Math.round(gdp * (1 + newGrowth / 100)),
    growth: clamp(newGrowth, -5, 15),
    inflation: Math.round(newInflation * 100) / 100,
    debt: Math.round(newDebt),
    debt_gdp: Math.round(debtGDP * 100) / 100,
    unemployment: clamp(prevEconomy.unemployment + unemploymentChange, 2, 25),
    budget_balance: Math.round((taxRev - totalSpending - interest) / gdp * 10000) / 100,
    reserves: Math.round(newReserves),
    sectors: prevEconomy.sectors || {
      agriculture: { level: 3, efficiency: 0.7, maintenance_cost: 5 },
      industry: { level: 3, efficiency: 0.6, maintenance_cost: 10 },
      services: { level: 4, efficiency: 0.8, maintenance_cost: 15 },
    },
  };
}

export function updateRelation(
  currentRelation: number,
  actionType: string,
  targetPersonality: string,
  seed: string
): number {
  const effect = ACTION_EFFECTS[actionType] || {};
  let delta = effect.relationDelta || 0;
  
  if (targetPersonality === 'Aggressive') delta -= 2;
  else if (targetPersonality === 'Diplomatic') delta += 2;

  if (actionType === 'none') {
    delta = seededRandom(seed, -2, 0);
  }

  return clamp(currentRelation + delta, -100, 100);
}

export function updateConsensus(
  prevConsensus: Consensus,
  actions: GameAction[],
  seed: string
): Consensus {
  const general = prevConsensus.general || 50;
  const economic = prevConsensus.economic || 50;
  const security = prevConsensus.security || 50;
  const freedom = prevConsensus.freedom || 50;

  let generalDelta = 0;
  let economicDelta = 0;
  let securityDelta = 0;
  let freedomDelta = 0;

  for (const action of actions) {
    const effect = ACTION_EFFECTS[action.action_type];
    if (effect?.consensusDelta) {
      generalDelta += effect.consensusDelta;
      
      if (action.action_type.includes('budget') || action.action_type.includes('economy')) {
        economicDelta += effect.consensusDelta;
      } else if (action.action_type.includes('military') || action.action_type.includes('security')) {
        securityDelta += effect.consensusDelta;
      } else if (action.action_type.includes('reform') || action.action_type.includes('freedom')) {
        freedomDelta += effect.consensusDelta;
      }
    }
  }

  generalDelta += seededRandom(`${seed}-drift`, -1, 1);

  return {
    general: clamp(general + generalDelta, 0, 100),
    economic: clamp(economic + economicDelta, 0, 100),
    security: clamp(security + securityDelta, 0, 100),
    freedom: clamp(freedom + freedomDelta, 0, 100),
  };
}

export function updateTech(
  prevTech: Record<string, { level: number; progress: number }>,
  actions: GameAction[],
  seed: string
): Record<string, { level: number; progress: number }> {
  const techTree = { ...prevTech };

  for (const action of actions) {
    if (action.action_type === 'space_program') {
      const launchers = techTree.launchers || { level: 1, progress: 0 };
      launchers.progress += seededRandom(`${seed}-space`, 5, 15);
      
      if (launchers.progress >= 100) {
        launchers.level += 1;
        launchers.progress = 0;
      }
      
      techTree.launchers = launchers;
    }
    
    if (action.action_type === 'technology_investment') {
      for (const key of Object.keys(techTree)) {
        const tech = techTree[key] || { level: 0, progress: 0 };
        tech.progress += seededRandom(`${seed}-${key}`, 2, 8);
        
        if (tech.progress >= 100) {
          tech.level += 1;
          tech.progress = 0;
        }
        
        techTree[key] = tech;
      }
    }
  }

  return techTree;
}

export function checkWinCondition(turnNumber: number, consensus: Consensus): 'win' | null {
  if (consensus.general >= 80 && turnNumber >= 5) {
    return 'win';
  }
  return null;
}

export function checkLoseCondition(consensus: Consensus, economy: Economy): 'lose' | null {
  if (economy.debt_gdp > 200 || consensus.general < 20) {
    return 'lose';
  }
  return null;
}

export function calculateElectionResult(
  factions: Array<{ base_approval: number; weight: number; mobilization: number }>,
  budgetAllocation: number,
  mediaSentiment: number,
  ecoPerformance: number,
  seed: string
): number {
  let voteSum = 0;
  let weightSum = 0;

  for (const faction of factions) {
    const approval = faction.base_approval + (faction.mobilization * 0.1);
    voteSum += approval * faction.weight;
    weightSum += faction.weight;
  }

  const approvalMod = Math.floor(budgetAllocation / 10) * 2;
  const mediaMod = mediaSentiment * 0.2;
  const ecoMod = ecoPerformance * 0.4;
  const rngMod = seededRandom(seed, -5, 5);

  const normalizedVote = weightSum > 0 ? voteSum / weightSum : 50;
  
  return clamp(
    normalizedVote + 
    approvalMod * 0.3 + 
    mediaMod + 
    ecoMod + 
    rngMod,
    0,
    100
  );
}

export function calculateAIResponse(
  senderIdeology: string,
  senderPersonality: string,
  receiverIdeology: string,
  receiverPersonality: string,
  currentRelation: number,
  actionType: string
): 'accept' | 'reject' | 'counter' {
  const ideologyMatch = senderIdeology === receiverIdeology ? 0.4 : 
    (senderIdeology === 'Pragmatic' || receiverIdeology === 'Pragmatic') ? 0.3 : 0.1;
  
  const personalityMatch = senderPersonality === receiverPersonality ? 0.3 : 
    (senderPersonality === 'Diplomatic' && receiverPersonality === 'Diplomatic') ? 0.2 : 0;

  const interestScore = 0.2;
  const relationScore = (currentRelation + 100) / 200 * 0.1;

  const totalScore = ideologyMatch + personalityMatch + interestScore + relationScore;

  if (actionType === 'economic_aid' || actionType === 'trade_pact') {
    if (totalScore > 0.5) return 'accept';
    if (totalScore < 0.3) return 'reject';
    return 'counter';
  }

  if (actionType === 'sanctions' || actionType === 'threat') {
    if (totalScore > 0.6) return 'accept';
    if (totalScore < 0.2) return 'reject';
    return 'counter';
  }

  if (totalScore > 0.5) return 'accept';
  if (totalScore < 0.3) return 'reject';
  return 'counter';
}

export function resolveConflict(
  attackerLogistics: number,
  attackerMorale: number,
  defenderLogistics: number,
  defenderMorale: number,
  intlSupport: number,
  terrain: number,
  seed: string
): { winner: 'attacker' | 'defender' | 'stalemate'; attackerLoss: number; defenderLoss: number } {
  const pAttack = (
    attackerLogistics * 0.3 +
    attackerMorale * 0.25 +
    intlSupport * 0.2 +
    terrain * 0.15 +
    seededRandom(seed, 0.05, 0.15)
  );

  const pDefend = (
    defenderLogistics * 0.3 +
    defenderMorale * 0.25 +
    (1 - intlSupport) * 0.2 +
    (1 - terrain) * 0.15 +
    seededRandom(`${seed}-def`, 0.05, 0.15)
  );

  let winner: 'attacker' | 'defender' | 'stalemate';
  let attackerLoss = 0;
  let defenderLoss = 0;

  if (pAttack > pDefend + 0.15) {
    winner = 'attacker';
    attackerLoss = seededRandom(`${seed}-aloss`, 10, 25);
    defenderLoss = seededRandom(`${seed}-dloss`, 25, 40);
  } else if (pDefend > pAttack + 0.15) {
    winner = 'defender';
    attackerLoss = seededRandom(`${seed}-aloss`, 25, 40);
    defenderLoss = seededRandom(`${seed}-dloss`, 10, 25);
  } else {
    winner = 'stalemate';
    attackerLoss = seededRandom(`${seed}-aloss`, 15, 30);
    defenderLoss = seededRandom(`${seed}-dloss`, 15, 30);
  }

  return { winner, attackerLoss: Math.round(attackerLoss), defenderLoss: Math.round(defenderLoss) };
}

export function generateNarrativeWave(
  topic: string,
  intensity: number,
  seed: string
): { title: string; description: string; duration: number; decayRate: number } {
  const titles: Record<string, string[]> = {
    economy: ['Boom Economico', 'Crescita Record', 'Crisi Finanziaria', 'Riforme Efficaci'],
    diplomacy: ['Diplomazia di Successo', 'Trattative Bloccate', 'Nuova Alleanza', 'Tensioni Internazionali'],
    military: ['Eserciti in Posizione', 'Conflitto Imminente', 'Pace Raggiunta', 'Escalation Militare'],
    internal: ['Riforme Popolari', 'Proteste di Piazza', 'Stabilità Garantita', 'Instabilità Politica'],
  };

  const topicKey = Object.keys(titles).find(k => topic.includes(k)) || 'internal';
  const titlePool = titles[topicKey];
  const titleIndex = Math.floor(seededRandom(`${seed}-${topic}`, 0, titlePool.length));
  
  return {
    title: titlePool[titleIndex],
    description: `Onda mediatica su ${topic}`,
    duration: Math.floor(seededRandom(`${seed}-dur`, 1, 4)),
    decayRate: clamp(intensity * 0.2, 0.2, 0.5),
  };
}
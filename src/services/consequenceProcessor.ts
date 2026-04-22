import type { GameNation, GameTurn } from '../types';

export interface Consequence {
  type: 'relation' | 'consensus' | 'gdp' | 'growth' | 'inflation' | 'stability' | 'tech' | 'military';
  targetNationId?: string;
  value: number;
  turnsRemaining: number;
  triggerTurn: number;
}

export interface ConsequenceProcessorState {
  pendingConsequences: Consequence[];
  activeEffects: Consequence[];
}

export class ConsequenceProcessor {
  private consequences: Map<string, Consequence[]> = new Map();

  addConsequence(
    nationId: string,
    type: Consequence['type'],
    value: number,
    turnsDuration: number,
    currentTurn: number,
    targetNationId?: string
  ): void {
    const nationConsequences = this.consequences.get(nationId) || [];
    
    nationConsequences.push({
      type,
      value,
      turnsRemaining: turnsDuration,
      triggerTurn: currentTurn + turnsDuration,
      targetNationId,
    });
    
    this.consequences.set(nationId, nationConsequences);
  }

  processTurn(nationId: string, currentTurn: number): Consequence[] {
    const nationConsequences = this.consequences.get(nationId) || [];
    const triggered: Consequence[] = [];
    const remaining: Consequence[] = [];

    for (const consequence of nationConsequences) {
      if (consequence.triggerTurn === currentTurn) {
        triggered.push(consequence);
      } else if (consequence.turnsRemaining > 0) {
        remaining.push({
          ...consequence,
          turnsRemaining: consequence.turnsRemaining - 1,
        });
      }
    }

    this.consequences.set(nationId, remaining);
    return triggered;
  }

  applyConsequences(
    nation: GameNation,
    triggered: Consequence[]
  ): Partial<GameNation> {
    let relationDelta = 0;
    let consensusDelta = 0;
    let gdpDelta = 0;
    let growthDelta = 0;
    let inflationDelta = 0;
    let stabilityDelta = 0;
    let techDelta = 0;
    let militaryDelta = 0;

    for (const consequence of triggered) {
      switch (consequence.type) {
        case 'relation':
          relationDelta += consequence.value;
          break;
        case 'consensus':
          consensusDelta += consequence.value;
          break;
        case 'gdp':
          gdpDelta += consequence.value;
          break;
        case 'growth':
          growthDelta += consequence.value;
          break;
        case 'inflation':
          inflationDelta += consequence.value;
          break;
        case 'stability':
          stabilityDelta += consequence.value;
          break;
        case 'tech':
          techDelta += consequence.value;
          break;
        case 'military':
          militaryDelta += consequence.value;
          break;
      }
    }

    const updatedEconomy = {
      ...nation.economy,
      gdp: (nation.economy.gdp || 1000) + gdpDelta,
      growth: (nation.economy.growth || 2.5) + growthDelta,
      inflation: (nation.economy.inflation || 2) + inflationDelta,
    };

    const updatedConsensus = {
      general: Math.max(0, Math.min(100, (nation.consensus?.general || 50) + consensusDelta)),
      economic: Math.max(0, Math.min(100, (nation.consensus?.economic || 50) + consensusDelta / 2)),
      security: Math.max(0, Math.min(100, (nation.consensus?.security || 50) + consensusDelta / 2)),
      freedom: Math.max(0, Math.min(100, (nation.consensus?.freedom || 50) + consensusDelta / 2)),
    };

    return {
      economy: updatedEconomy,
      consensus: updatedConsensus,
      relations: nation.relations?.map(r => {
        if (triggered.some(t => t.type === 'relation' && t.targetNationId === r.nationId)) {
          return {
            ...r,
            value: Math.max(-100, Math.min(100, r.value + relationDelta)),
          };
        }
        return r;
      }) || [],
    };
  }

  getPendingConsequences(nationId: string): Consequence[] {
    return this.consequences.get(nationId) || [];
  }

  clearConsequences(nationId: string): void {
    this.consequences.delete(nationId);
  }

  serialize(): Record<string, Consequence[]> {
    const data: Record<string, Consequence[]> = {};
    for (const [nationId, consequences] of this.consequences) {
      data[nationId] = consequences;
    }
    return data;
  }

  load(data: Record<string, Consequence[]>): void {
    this.consequences = new Map(Object.entries(data));
  }
}

export const consequenceProcessor = new ConsequenceProcessor();

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function createDelayedConsequences(
  choiceId: string,
  nationId: string,
  currentTurn: number
): Consequence[] {
  const delayedEffects: Consequence[] = [];

  const delayedMap: Record<string, { type: Consequence['type']; value: number; delay: number }> = {
    trattato_termina: { type: 'relation', value: -25, delay: 10 },
    relazione_protesta: { type: 'relation', value: -20, delay: 10 },
    relazione_minaccia: { type: 'relation', value: -30, delay: 10 },
    sanctions_economiche: { type: 'gdp', value: -3, delay: 15 },
    agri_reforma: { type: 'stability', value: -5, delay: 5 },
    fertilizzanti: { type: 'consensus', value: -10, delay: 10 },
    allevamento: { type: 'stability', value: -20, delay: 8 },
    industria_pesante: { type: 'stability', value: -20, delay: 8 },
    austerity: { type: 'consensus', value: -15, delay: 8 },
    stimolo: { type: 'consensus', value: -20, delay: 5 },
    riforma_agraria: { type: 'stability', value: -30, delay: 15 },
    corruzione: { type: 'consensus', value: -15, delay: 8 },
    propaganda_1: { type: 'consensus', value: 10, delay: 10 },
    propaganda_2: { type: 'consensus', value: 15, delay: 10 },
    propaganda_6: { type: 'consensus', value: 15, delay: 15 },
    propaganda_7: { type: 'consensus', value: 20, delay: 10 },
    propaganda_8: { type: 'consensus', value: 15, delay: 10 },
    propaganda_10: { type: 'consensus', value: 20, delay: 15 },
  };

  const effect = delayedMap[choiceId];
  if (effect) {
    delayedEffects.push({
      type: effect.type,
      value: effect.value,
      turnsRemaining: effect.delay,
      triggerTurn: currentTurn + effect.delay,
    });
  }

  return delayedEffects;
}

export function processAllConsequences(
  nations: GameNation[],
  currentTurn: number
): Map<string, Partial<GameNation>> {
  const results = new Map<string, Partial<GameNation>>();

  for (const nation of nations) {
    const triggered = consequenceProcessor.processTurn(nation.id, currentTurn);
    if (triggered.length > 0) {
      const updated = consequenceProcessor.applyConsequences(nation, triggered);
      results.set(nation.id, updated);
    }
  }

  return results;
}
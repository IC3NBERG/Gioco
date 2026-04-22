import { useGameStore } from '../store/gameStore';
import type { Choice } from '../types';
import GAME_CONFIG from '../config/gameConfig';

export interface TurnAction {
  action_type: string;
  target?: string;
  params?: Record<string, unknown>;
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

export async function executeTurn(
  nationId: string,
  actions: TurnAction[]
): Promise<TurnResult> {
  const supabase = useGameStore.getState().supabase;
  if (!supabase) {
    return { success: false, error: 'Supabase non configurato' };
  }

  if (error) {
    console.error('Turn execution error:', error);
    return { success: false, error: error.message };
  }

  return data as TurnResult;
}

export async function executeChoice(
  nationId: string,
  choice: Choice,
  target?: string
): Promise<TurnResult> {
  const action: TurnAction = {
    action_type: choice.id,
    target,
    params: {
      cost: choice.cost,
      category: choice.category,
      subcategory: choice.subcategory,
    },
  };

  return executeTurn(nationId, [action]);
}

export async function executeActions(
  nationId: string,
  choices: Choice[],
  targets?: Record<string, string>
): Promise<TurnResult> {
  const actions: TurnAction[] = choices.map((choice, index) => ({
    action_type: choice.id,
    target: targets?.[choice.id],
    params: {
      cost: choice.cost,
      category: choice.category,
    },
  }));

  return executeTurn(nationId, actions);
}

export async function skipTurn(nationId: string): Promise<TurnResult> {
  return executeTurn(nationId, [{ action_type: 'none' }]);
}

export async function checkVictory(nationId: string, currentTurn: number): Promise<{
  hasWon: boolean;
  hasLost: boolean;
  reason?: string;
}> {
  const { data: turns, error } = await supabase
    .from('game_turns')
    .select('*')
    .eq('nation_id', nationId)
    .order('turn_number', { ascending: false })
    .limit(1)
    .single();

  if (error || !turns) {
    return { hasWon: false, hasLost: false };
  }

  const consensus = turns.consensus as Record<string, number>;
  const tech = turns.tech as Record<string, { level: number }>;
  
  const consensusLevel = consensus?.general || 0;
  const spaceLevel = tech?.space?.level || 0;
  const debtGDP = (turns.economy as Record<string, number>)?.debt_gdp || 0;

  if (consensusLevel >= GAME_CONFIG.VICTORY_CONSENSUS_THRESHOLD && currentTurn >= 5) {
    return { hasWon: true, hasLost: false, reason: 'Consenso >= 80%' };
  }

  if (spaceLevel >= GAME_CONFIG.VICTORY_TECH_LEVEL) {
    return { hasWon: true, hasLost: false, reason: 'Livello spazio >= 3' };
  }

  if (consensusLevel < 20 || debtGDP > 200) {
    return { hasLost: true, hasWon: false, reason: 'Consenso < 20% o Debito > 200%' };
  }

  return { hasWon: false, hasLost: false };
}
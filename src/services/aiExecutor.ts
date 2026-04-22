import { useGameStore } from '../store/gameStore';
import { calculateAISelection, type AIContext } from '../ai/turnSimulator';
import type { GameNation } from '../types';

export interface AIRoundResult {
  processed: string[];
  errors: string[];
  events: number;
}

export async function executeAIRound(
  nations: GameNation[],
  currentTurn: number
): Promise<AIRoundResult> {
  const supabase = useGameStore.getState().supabase;
  if (!supabase) {
    return { processed: [], errors: ['Supabase non configurato'], eventsCreated: 0 };
  }
  
  const processed: string[] = [];
  const errors: string[] = [];
  let eventsCreated = 0;

  const aiNations = nations.filter(n => !n.isPlayer);

  for (const nation of aiNations) {
    try {
      const aiContext: AIContext = {
        nationId: nation.id,
        personality: nation.aiPersonality || 'balanced',
        ideology: nation.ideology || 'neutral',
        economy: {
          gdp: nation.economy?.gdp || 1000,
          growth: nation.economy?.growth || 2.5,
          debt_gdp: nation.economy?.debt_gdp || 0,
        },
        consensus: {
          general: nation.consensus?.general || 50,
        },
        tech: nation.tech || {},
        relations: {},
      };

      for (const rel of nation.relations || []) {
        aiContext.relations[rel.nationId] = rel.value;
      }

      const aiResult = calculateAISelection(aiContext);

      if (aiResult.actions.length > 0) {
        const { data, error } = await supabase.functions.invoke('resolve-turn', {
          body: {
            nation_id: nation.id,
            actions: aiResult.actions,
          },
        });

        if (error) throw error;
        if (data?.success) {
          processed.push(nation.id);
          eventsCreated += data.events?.length || 0;
        }
      }

      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`AI error for ${nation.id}:`, error);
      errors.push(`${nation.id}: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }

  return { processed, errors, eventsCreated };
}

export async function runFullTurn(
  playerNationId: string,
  nations: GameNation[],
  playerActions: Array<{ action_type: string; target?: string }>,
  currentTurn: number
): Promise<{
  playerSuccess: boolean;
  playerResult?: any;
  aiResult: AIRoundResult;
  newTurn: number;
}> {
  let playerSuccess = false;
  let playerResult;

  if (playerActions.length > 0) {
    const { data, error } = await supabase.functions.invoke('resolve-turn', {
      body: {
        nation_id: playerNationId,
        actions: playerActions,
      },
    });

    if (!error && data?.success) {
      playerSuccess = true;
      playerResult = data;
    }
  }

  const aiResult = await executeAIRound(nations, currentTurn);

  return {
    playerSuccess,
    playerResult,
    aiResult,
    newTurn: currentTurn + 1,
  };
}
import { calculateAISelection, type AITurnResult, type AIContext } from './turnSimulator';
import { supabase } from '../lib/supabase';
import type { GameNation } from '../types';

export interface AIRoundResult {
  results: Array<{
    nationId: string;
    actions: Array<{ action_type: string; target?: string; params?: Record<string, unknown> }>;
    skipped: boolean;
  }>;
  turnNumber: number;
}

export async function runAIRound(currentTurn: number, nations: GameNation[]): Promise<AIRoundResult> {
  const results: AIRoundResult['results'] = [];
  
  for (const nation of nations) {
    if (nation.isPlayer) continue;
    
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
    
    try {
      const aiResult = calculateAISelection(aiContext);
      results.push({
        nationId: nation.id,
        actions: aiResult.actions,
        skipped: aiResult.actions.length === 0,
      });
    } catch (error) {
      console.error(`AI error for ${nation.id}:`, error);
      results.push({
        nationId: nation.id,
        actions: [],
        skipped: true,
      });
    }
  }
  
  return {
    results,
    turnNumber: currentTurn,
  };
}

export async function processAITurns(
  nationIds: string[],
  turnNumber: number
): Promise<{ success: boolean; processed: string[]; errors: string[] }> {
  const processed: string[] = [];
  const errors: string[] = [];
  
  for (const nationId of nationIds) {
    try {
      const { error } = await supabase
        .from('ai_turns')
        .insert({
          nation_id: nationId,
          turn_number: turnNumber,
          status: 'pending',
        });
      
      if (error) throw error;
      processed.push(nationId);
    } catch (error) {
      errors.push(`${nationId}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  return { success: errors.length === 0, processed, errors };
}

export function getAIRoundDuration(nationCount: number): number {
  return Math.ceil(nationCount * 500);
}
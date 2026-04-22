import type { Choice, ChoiceCategory, ChoiceEffect } from '../types';
import { getChoiceById, ALL_CHOICES, CHOICES_BY_CATEGORY } from '../choices';
import { getBehavior, getAllPersonalities, NATION_BEHAVIORS_DATA } from './behaviors';
import type { AIPersonality } from './types';

export interface AIContext {
  nationId: string;
  personality: AIPersonality;
  ideology: string;
  economy: { gdp: number; growth: number; debt_gdp: number };
  consensus: { general: number };
  tech: Record<string, { level: number; progress: number }>;
  relations: Record<string, number>;
}

export interface AITurnResult {
  nationId: string;
  actions: Array<{ action_type: string; target?: string; params?: Record<string, unknown> }>;
}

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function calculateAISelection(
  context: AIContext,
  availableChoices: Choice[],
  numActions: number = 3
): Choice[] {
  const behavior = getBehavior(context.personality);
  if (!behavior || availableChoices.length === 0) return [];

  const weights = behavior.weights?.category || {};
  const riskTolerance = behavior.weights?.riskTolerance || 0.5;
  const scored: Array<{ choice: Choice; score: number }> = [];

  for (const choice of availableChoices) {
    const categoryWeight = weights[choice.category as ChoiceCategory] || 10;
    let score = categoryWeight * (Math.random() * 0.4 + 0.6);

    if (choice.risk) {
      score -= choice.risk.probability * (1 - riskTolerance) * 20;
    }

    if (choice.requirements) {
      if (context.economy.gdp < (choice.requirements.gdp || 0)) score -= 30;
      if (context.consensus.general < (choice.requirements.stability || 0)) score -= 25;
      if (context.economy.debt_gdp > 100 && choice.cost.resources?.money) {
        score -= 15;
      }
    }

    if (choice.category === 'economia' && context.economy.debt_gdp > 150) {
      score -= 20;
    }
    if (choice.category === 'diplomazia' && context.consensus.general < 30) {
      score -= 15;
    }

    scored.push({ choice, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, numActions).map(s => s.choice);
}

export function generateAITurn(
  context: AIContext,
  otherNationIds: string[]
): AITurnResult {
  const behavior = getBehavior(context.personality);
  if (!behavior) {
    return { nationId: context.nationId, actions: [{ action_type: 'none' }] };
  }

  const maxPA = 3;
  const actions: Array<{ action_type: string; target?: string }> = [];
  let paRemaining = maxPA;

  const categoryPool: ChoiceCategory[] = ['diplomazia', 'economia', 'militare', 'politica'];
  const priorities = categoryPool.sort((a, b) => {
    const wa = behavior.weights?.category[a as ChoiceCategory] || 10;
    const wb = behavior.weights?.category[b as ChoiceCategory] || 10;
    return wb - wa;
  });

  const usedChoices = new Set<string>();

  while (paRemaining > 0 && priorities.length > 0) {
    const category = priorities.shift()!;
    const choices = (CHOICES_BY_CATEGORY[category] || []).filter(c => 
      c.cost.pa <= paRemaining && !usedChoices.has(c.id)
    );

    if (choices.length === 0) continue;

    const selected = calculateAISelection(context, choices, 1)[0];
    if (!selected) continue;

    actions.push({
      action_type: selected.id,
      target: category === 'diplomazia' && otherNationIds.length > 0
        ? otherNationIds[Math.floor(Math.random() * otherNationIds.length)]
        : undefined,
    });

    paRemaining -= selected.cost.pa;
    usedChoices.add(selected.id);
  }

  if (actions.length === 0) {
    actions.push({ action_type: 'none' });
  }

  return { nationId: context.nationId, actions };
}

export function simulatePlayerResponse(
  senderContext: AIContext,
  targetId: string,
  targetRelations: Record<string, number>,
  action: { action_type: string; category?: ChoiceCategory }
): 'accept' | 'reject' | 'counter' {
  const relation = targetRelations[targetId] || 0;
  const senderBehavior = getBehavior(senderContext.personality);
  
  if (!senderBehavior) {
    return Math.random() > 0.5 ? 'accept' : 'reject';
  }

  let acceptScore = 0.3;

  if (relation >= 50) acceptScore += 0.4;
  else if (relation >= 20) acceptScore += 0.2;
  else if (relation >= -20) acceptScore += 0;
  else if (relation >= -50) acceptScore -= 0.3;
  else acceptScore -= 0.5;

  const personalityMatch = senderBehavior.personalityTraits || {};
  acceptScore += (personalityMatch.patience || 50) / 200;

  if (action.category === 'diplomazia' && relation < 0) {
    acceptScore -= 0.3;
  }
  if (action.category === 'militare') {
    acceptScore -= 0.2;
  }

  acceptScore += (Math.random() - 0.5) * 0.3;

  if (acceptScore > 0.55) return 'accept';
  if (acceptScore < 0.25) return 'reject';
  return 'counter';
}

export function generateBatchAITurns(
  aiContexts: AIContext[],
  allNationIds: string[]
): AITurnResult[] {
  return aiContexts.map(ctx => {
    const otherNations = allNationIds.filter(n => n !== ctx.nationId);
    return generateAITurn(ctx, otherNations);
  });
}

export function getAIRecommendations(
  context: AIContext,
  maxRecommendations: number = 5
): Choice[] {
  const behavior = getBehavior(context.personality);
  if (!behavior) return ALL_CHOICES.slice(0, maxRecommendations);

  const weights = behavior.weights?.category || {};
  const scored: Array<{ choice: Choice; score: number }> = [];

  for (const choice of ALL_CHOICES) {
    const weight = weights[choice.category as ChoiceCategory] || 10;
    let score = weight * (Math.random() * 0.5 + 0.5);

    if (choice.requirements) {
      if (context.economy.gdp < (choice.requirements.gdp || 0)) score -= 25;
      if (context.consensus.general < (choice.requirements.stability || 0)) score -= 20;
    }

    scored.push({ choice, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, maxRecommendations).map(s => s.choice);
}

export const DEFAULT_AI_PERSONALITIES: AIPersonality[] = [
  'aggressive',
  'diplomatic',
  'pragmatic',
  'nationalist',
  'technocratic',
];

export function getRandomPersonality(): AIPersonality {
  const personalities = getAllPersonalities();
  return personalities[Math.floor(Math.random() * personalities.length)];
}
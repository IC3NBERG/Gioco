import type { GameTurn, VictoryCondition, TechTree } from '../types';
import { VICTORY_CONFIG } from '../config/victoryConfig';

export type WinLoseResult = 'win' | 'lose' | null;

export interface VictoryCheck {
  result: WinLoseResult;
  reason?: string;
  progress?: number;
}

export function checkVictory(
  turn: GameTurn,
  victory: VictoryCondition
): VictoryCheck {
  switch (victory.type) {
    case 'conquista':
      return checkConquestVictory(turn, victory);
    case 'economica':
      return checkEconomicVictory(turn, victory);
    case 'diplomatica':
      return checkDiplomaticVictory(turn, victory);
    case 'spaziale':
      return checkSpaceVictory(turn, victory);
    case 'sopravvivenza':
      return checkSurvivalVictory(turn, victory);
    case 'mista':
      return checkMixedVictory(turn, victory);
    default:
      return { result: null };
  }
}

function checkConquestVictory(turn: GameTurn, victory: VictoryCondition): VictoryCheck {
  const target = victory.target?.worldControl || 50;
  const currentWorldControl = turn.tech?.launchers?.level || 0;
  const progress = (currentWorldControl / target) * 100;

  if (progress >= 100) {
    return { result: 'win', reason: 'Hai conquistato il mondo!', progress };
  }

  return { result: null, progress };
}

function checkEconomicVictory(turn: GameTurn, victory: VictoryCondition): VictoryCheck {
  const targetRank = victory.target?.gdpRank || 3;
  const currentGdp = turn.economy?.gdp || 0;
  const progress = Math.min((currentGdp / (1000 * targetRank)) * 100, 100);

  if (currentGdp >= 1000 * targetRank) {
    return { result: 'win', reason: 'Economia dominante!', progress };
  }

  return { result: null, progress };
}

function checkDiplomaticVictory(turn: GameTurn, victory: VictoryCondition): VictoryCheck {
  const targetAllies = victory.target?.alliesRequired || 5;
  const currentAllies = Math.max(0, (turn.consensus?.general || 0) / 20);
  const progress = Math.min((currentAllies / targetAllies) * 100, 100);

  if (currentAllies >= targetAllies) {
    return { result: 'win', reason: 'Alleati sufficienti!', progress };
  }

  return { result: null, progress };
}

function checkSpaceVictory(turn: GameTurn, victory: VictoryCondition): VictoryCheck {
  const targetLevel = victory.target?.spaceLevel || 'lunar_colony';
  
  let currentLevel = 0;
  if (turn.tech?.mars?.level && turn.tech.mars.level > 0) currentLevel = 5;
  else if (turn.tech?.lunar?.level && turn.tech.lunar.level > 0) currentLevel = 4;
  else if (turn.tech?.stations?.level && turn.tech.stations.level > 0) currentLevel = 3;
  else if (turn.tech?.satellites?.level && turn.tech.satellites.level > 0) currentLevel = 2;
  else if (turn.tech?.launchers?.level && turn.tech.launchers.level > 0) currentLevel = 1;

  const targetLevelNum = targetLevel === 'mars_colony' ? 5 : 
                     targetLevel === 'lunar_colony' ? 4 :
                     targetLevel === 'stations' ? 3 : 1;

  const progress = Math.min((currentLevel / targetLevelNum) * 100, 100);

  if (currentLevel >= targetLevelNum) {
    return { result: 'win', reason: 'Dominio spaziale!', progress };
  }

  return { result: null, progress };
}

function checkSurvivalVictory(turn: GameTurn, victory: VictoryCondition): VictoryCheck {
  const targetTurns = victory.target?.survivalTurns || VICTORY_CONFIG.SURVIVAL_TURNS.MEDIUM;
  const progress = (turn.turn_number / targetTurns) * 100;

  if (turn.turn_number >= targetTurns) {
    return { result: 'win', reason: 'Sei sopravvissuto!', progress };
  }

  return { result: null, progress };
}

function checkMixedVictory(turn: GameTurn, victory: VictoryCondition): VictoryCheck {
  const gdpCheck = checkEconomicVictory(turn, victory);
  const spaceCheck = checkSpaceVictory(turn, victory);
  
  const progress = ((gdpCheck.progress || 0) + (spaceCheck.progress || 0)) / 2;

  if (gdpCheck.result === 'win' && spaceCheck.result === 'win') {
    return { result: 'win', reason: 'Vittoria completa!', progress };
  }

  return { result: null, progress };
}

export function checkLose(turn: GameTurn): VictoryCheck {
  const { LOSE_CONDITIONS } = VICTORY_CONFIG;

  if (turn.consensus?.general !== undefined && turn.consensus.general < LOSE_CONDITIONS.CONSENSUS_MIN) {
    return { 
      result: 'lose', 
      reason: 'Consenso troppo basso' 
    };
  }

  if (turn.economy?.gdp !== undefined && turn.economy.gdp < LOSE_CONDITIONS.GDP_MIN) {
    return { 
      result: 'lose', 
      reason: 'GDP troppo basso' 
    };
  }

  return { result: null };
}

export function getVictoryProgress(
  turn: GameTurn,
  victory: VictoryCondition
): number {
  const check = checkVictory(turn, victory);
  return check.progress || 0;
}
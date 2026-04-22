import type { TechTree, TechProgress } from '../types';
import { GAME_CONFIG } from '../config/gameConfig';

export const TECH_COSTS: Record<keyof TechTree, number> = {
  launchers: 100,
  satellites: 150,
  stations: 300,
  lunar: 500,
  mars: 800,
};

export const TECH_NAMES: Record<keyof TechTree, string> = {
  launchers: 'Lanciatori',
  satellites: 'Satelliti',
  stations: 'Stazioni Spaziali',
  lunar: 'Base Lunare',
  mars: 'Missione Marziana',
};

export const TECH_DESCRIPTIONS: Record<keyof TechTree, string> = {
  launchers: 'Capacità di lanciare oggetti nello spazio',
  satellites: 'Satelliti artificiali',
  stations: 'Stazione spaziale orbitale',
  lunar: 'Colonia sulla Luna',
  mars: 'Missione umana su Marte',
};

export type TechKey = keyof TechTree;

export function getTechProgress(
  tech: TechTree,
  key: keyof TechTree
): TechProgress {
  return tech[key] || { level: 0, progress: 0 };
}

export function getTechLevel(tech: TechTree, key: keyof TechTree): number {
  return tech[key]?.level || 0;
}

export function canLevelUp(tech: TechTree, key: keyof TechTree): boolean {
  const currentLevel = getTechLevel(tech, key);
  const cost = TECH_COSTS[key] * (currentLevel + 1);
  return (tech[key]?.progress || 0) >= cost;
}

export function levelUpTech(tech: TechTree, key: keyof TechTree): TechTree {
  if (!canLevelUp(tech, key)) {
    return tech;
  }

  const cost = TECH_COSTS[key] * (getTechLevel(tech, key) + 1);
  const newProgress = (tech[key]?.progress || 0) - cost;

  return {
    ...tech,
    [key]: {
      level: (tech[key]?.level || 0) + 1,
      progress: newProgress,
    },
  };
}

export function addProgress(
  tech: TechTree,
  key: keyof TechTree,
  amount: number
): TechTree {
  return {
    ...tech,
    [key]: {
      level: tech[key]?.level || 0,
      progress: (tech[key]?.progress || 0) + amount,
    },
  };
}

export function getNextTechUnlock(tech: TechTree): keyof TechTree | null {
  if (getTechLevel(tech, 'launchers') >= 1 && tech.launchers?.level === 0) return 'launchers';
  if (getTechLevel(tech, 'launchers') >= 2 && tech.satellites?.level === 0) return 'satellites';
  if (getTechLevel(tech, 'satellites') >= 1 && tech.stations?.level === 0) return 'stations';
  if (getTechLevel(tech, 'stations') >= 1 && tech.lunar?.level === 0) return 'lunar';
  if (getTechLevel(tech, 'lunar') >= 1 && tech.mars?.level === 0) return 'mars';
  return null;
}

export function getCurrentTechTier(tech: TechTree): number {
  if (tech.mars?.level && tech.mars.level > 0) return 5;
  if (tech.lunar?.level && tech.lunar.level > 0) return 4;
  if (tech.stations?.level && tech.stations.level > 0) return 3;
  if (tech.satellites?.level && tech.satellites.level > 0) return 2;
  if (tech.launchers?.level && tech.launchers.level > 0) return 1;
  return 0;
}

export function getTotalTechPoints(tech: TechTree): number {
  return Object.keys(tech).reduce((total, key) => {
    const k = key as keyof TechTree;
    return total + (tech[k]?.level || 0) * TECH_COSTS[k] + (tech[k]?.progress || 0);
  }, 0);
}
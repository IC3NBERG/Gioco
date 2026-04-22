import type { Choice, ChoiceCategory } from '../types';

export { DIPLOMACY_CHOICES } from './diplomazia/choices';
export { ECONOMY_CHOICES } from './economia/choices';
export { MILITARY_CHOICES } from './militare/choices';
export { POLITICS_CHOICES } from './politica/choices';
export { TECHNOLOGY_CHOICES } from './tecnologia/choices';
export { CULTURE_CHOICES } from './cultura/choices';
export { SPACE_CHOICES, SPACE_QUESTS, BRANCH_INFO } from './space/choices';

import { DIPLOMACY_CHOICES } from './diplomazia/choices';
import { ECONOMY_CHOICES } from './economia/choices';
import { MILITARY_CHOICES } from './militare/choices';
import { POLITICS_CHOICES } from './politica/choices';
import { TECHNOLOGY_CHOICES } from './tecnologia/choices';
import { CULTURE_CHOICES } from './cultura/choices';
import { SPACE_CHOICES, SPACE_QUESTS } from './space/choices';

export const ALL_CHOICES: Choice[] = [
  ...DIPLOMACY_CHOICES,
  ...ECONOMY_CHOICES,
  ...MILITARY_CHOICES,
  ...POLITICS_CHOICES,
  ...TECHNOLOGY_CHOICES,
  ...CULTURE_CHOICES,
  ...SPACE_CHOICES,
];

export const CHOICES_BY_CATEGORY: Record<ChoiceCategory, Choice[]> = {
  diplomazia: DIPLOMACY_CHOICES,
  economia: ECONOMY_CHOICES,
  militare: MILITARY_CHOICES,
  politica: POLITICS_CHOICES,
  tecnologia: TECHNOLOGY_CHOICES,
  cultura: CULTURE_CHOICES,
};

export const getChoicesByCategory = (category: ChoiceCategory): Choice[] => {
  if (category === 'tecnologia') {
    return [...CHOICES_BY_CATEGORY[category], ...SPACE_CHOICES];
  }
  return CHOICES_BY_CATEGORY[category] || [];
};

export const getAllChoices = (): Choice[] => {
  return ALL_CHOICES;
};

export const getChoiceById = (id: string): Choice | undefined => {
  return ALL_CHOICES.find(c => c.id === id);
};

export const getCategoryChoicesCount = (): Record<ChoiceCategory, number> => {
  return {
    diplomazia: DIPLOMACY_CHOICES.length,
    economia: ECONOMY_CHOICES.length,
    militare: MILITARY_CHOICES.length,
    politica: POLITICS_CHOICES.length,
    tecnologia: TECHNOLOGY_CHOICES.length,
    cultura: CULTURE_CHOICES.length,
  };
};
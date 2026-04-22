import type { 
  NATION_BEHAVIORS, 
  AIPreferenceWeights, 
  AIPersonality 
} from './types';
import type { ChoiceCategory, ChoiceSubcategory } from '../types';

const BASE_WEIGHTS: AIPreferenceWeights = {
  category: {
    economia: 16.67,
    militare: 16.67,
    politica: 16.67,
    diplomazia: 16.67,
    tecnologia: 16.67,
    cultura: 16.67,
  },
  subcategory: {
    agricoltura: 2.78,
    industria: 2.78,
    commercio: 2.78,
    finanza: 2.78,
    risorse: 2.78,
    lavoro: 2.78,
    forze_armate: 2.78,
    difesa: 2.78,
    attacco: 2.78,
    spionaggio: 2.78,
    logistica: 2.78,
    diplomazia_bellica: 2.78,
    leggi: 2.78,
    riforme: 2.78,
    propaganda: 2.78,
    corruzione: 2.78,
    risorse_umane: 2.78,
    burocrazia: 2.78,
    trattati: 2.78,
    relazioni: 2.78,
    organizzazioni: 2.78,
    sanzioni: 2.78,
    mediazione: 2.78,
    ricerca: 2.78,
    innovazione: 2.78,
    industrializzazione: 2.78,
    spazio: 2.78,
    energia: 2.78,
    istruzione: 2.78,
    religione: 2.78,
    media: 2.78,
    tradizione: 2.78,
    soft_power: 2.78,
    identita: 2.78,
  },
  riskTolerance: 0.5,
  longTermVsShortTerm: 0.5,
  individualVsCollective: 0.5,
};

export const NATION_BEHAVIORS_DATA: NATION_BEHAVIORS = {
  aggressive: {
    name: 'Aggressivo',
    description: 'Preferisce la forza alla diplomazia. Attacca al minimo segnale di debolezza e non esita a usare il militare per raggiungere i propri obiettivi.',
    
    weights: {
      ...BASE_WEIGHTS,
      category: {
        ...BASE_WEIGHTS.category,
        militare: 45,
        economia: 20,
        politica: 15,
        diplomazia: 5,
        tecnologia: 10,
        cultura: 5,
      },
      riskTolerance: 0.75,
      longTermVsShortTerm: 0.3,
      individualVsCollective: 0.4,
    },
    
    thresholds: {
      attack: 50,
      ally: 70,
      defend: 30,
      negotiate: 60,
      sanction: 40,
    },
    
    triggers: {
      attackWhen: 'enemy.military < self.military * 0.7 && self.military > 40',
      allyWhen: 'strategic_position && potential_gain > 30',
      defendWhen: 'self.military < 30 || stability < 40',
      negotiateWhen: 'not_directly_threatened && ally_present',
    },
    
    responses: {
      threatened: 'immediate_confrontation',
      attacked: 'overwhelming_counterattack',
      allied: 'conditional_acceptance',
      sanctioned: 'retaliate_with_sanctions',
      ignored: 'escalate_pressure',
    },
    
    personalityTraits: {
      patience: 20,
      honor: 30,
      greed: 70,
      ambition: 90,
      caution: 15,
      pride: 80,
    },
  },

  diplomatic: {
    name: 'Diplomatico',
    description: 'Risolve i conflitti attraverso il dialogo e la negoziazione. Preferisce alleanze e trattati alla forza bruta.',
    
    weights: {
      ...BASE_WEIGHTS,
      category: {
        ...BASE_WEIGHTS.category,
        diplomazia: 40,
        economia: 20,
        cultura: 20,
        politica: 10,
        militare: 5,
        tecnologia: 5,
      },
      riskTolerance: 0.3,
      longTermVsShortTerm: 0.7,
      individualVsCollective: 0.6,
    },
    
    thresholds: {
      attack: 80,
      ally: 20,
      defend: 20,
      negotiate: 10,
      sanction: 50,
    },
    
    triggers: {
      attackWhen: 'self_defense_required && all_diplomacy_failed',
      allyWhen: 'any_nation_shows_good_faith',
      defendWhen: 'direct_military_threat',
      negotiateWhen: 'any_conflict_is_solvable',
    },
    
    responses: {
      threatened: 'request_mediation',
      attacked: 'defensive_only_until_exhausted',
      allied: 'enthusiastic_acceptance',
      sanctioned: 'appeal_to_international_community',
      ignored: 'patient_reengagement',
    },
    
    personalityTraits: {
      patience: 90,
      honor: 85,
      greed: 30,
      ambition: 40,
      caution: 60,
      pride: 40,
    },
  },

  pragmatic: {
    name: 'Pragmatico',
    description: 'Calcola sempre costi e benefici. Agisce solo quando il guadagno supera il rischio. Ecco il perfetto giocatore di scacchi geopolitico.',
    
    weights: {
      ...BASE_WEIGHTS,
      category: {
        ...BASE_WEIGHTS.category,
        economia: 35,
        tecnologia: 25,
        diplomazia: 20,
        politica: 10,
        militare: 5,
        cultura: 5,
      },
      riskTolerance: 0.5,
      longTermVsShortTerm: 0.6,
      individualVsCollective: 0.5,
    },
    
    thresholds: {
      attack: 65,
      ally: 40,
      defend: 25,
      negotiate: 30,
      sanction: 45,
    },
    
    triggers: {
      attackWhen: 'expected_gain > expected_cost * 1.5 && success_prob > 0.6',
      allyWhen: 'economic_benefit > 20 && no_major_cost',
      defendWhen: 'cost_of_defense < cost_of_loss',
      negotiateWhen: 'time_to_negotiate_saves_resources',
    },
    
    responses: {
      threatened: 'cost_benefit_analysis_then_act',
      attacked: 'proportional_response',
      allied: 'evaluate_terms_carefully',
      sanctioned: 'find_alternatives_or_counter',
      ignored: 'assess_impact_decide_later',
    },
    
    personalityTraits: {
      patience: 70,
      honor: 50,
      greed: 60,
      ambition: 65,
      caution: 80,
      pride: 45,
    },
  },

  nationalist: {
    name: 'Nazionalista',
    description: 'Il prestigio della nazione viene prima di tutto. Cerca gloria e riconoscimento, anche a costo di sacrifici economici.',
    
    weights: {
      ...BASE_WEIGHTS,
      category: {
        ...BASE_WEIGHTS.category,
        cultura: 35,
        politica: 25,
        militare: 20,
        economia: 10,
        diplomazia: 5,
        tecnologia: 5,
      },
      riskTolerance: 0.6,
      longTermVsShortTerm: 0.8,
      individualVsCollective: 0.3,
    },
    
    thresholds: {
      attack: 55,
      ally: 60,
      defend: 15,
      negotiate: 50,
      sanction: 35,
    },
    
    triggers: {
      attackWhen: 'national_honor_is_questioned',
      allyWhen: 'cultural_affinity && respect_offered',
      defendWhen: 'national_symbols_threatened',
      negotiateWhen: 'terms_are_honorable',
    },
    
    responses: {
      threatened: 'prestige_protection_first',
      attacked: 'defend_to_the_last',
      allied: 'only_with_respect',
      sanctioned: 'national_unity_response',
      ignored: 'cultural_demonstration',
    },
    
    personalityTraits: {
      patience: 40,
      honor: 95,
      greed: 20,
      ambition: 75,
      caution: 30,
      pride: 100,
    },
  },

  isolationist: {
    name: 'Isolazionista',
    description: 'Evita contatti con lestere. Privilegia autosufficienza e autarchia. Reagisce male a qualsiasi intrusione esterna.',
    
    weights: {
      ...BASE_WEIGHTS,
      category: {
        ...BASE_WEIGHTS.category,
        economia: 40,
        cultura: 25,
        politica: 20,
        tecnologia: 10,
        militare: 3,
        diplomazia: 2,
      },
      riskTolerance: 0.4,
      longTermVsShortTerm: 0.9,
      individualVsCollective: 0.8,
    },
    
    thresholds: {
      attack: 90,
      ally: 85,
      defend: 10,
      negotiate: 80,
      sanction: 70,
    },
    
    triggers: {
      attackWhen: 'defensive_only && border_violated',
      allyWhen: 'never_voluntarily',
      defendWhen: 'existential_threat',
      negotiateWhen: 'forced_by_economic_need',
    },
    
    responses: {
      threatened: 'complete_withdrawal',
      attacked: 'defensive_against_border_only',
      allied: 'refuse_all_requests',
      sanctioned: 'find_alternatives_not_comply',
      ignored: 'continue_isolation',
    },
    
    personalityTraits: {
      patience: 100,
      honor: 60,
      greed: 40,
      ambition: 20,
      caution: 90,
      pride: 50,
    },
  },

  technocratic: {
    name: 'Tecnocratico',
    description: 'Vede la tecnologia come strumento principale di potere. Corre per essere primo nella ricerca e nellinnovazione.',
    
    weights: {
      ...BASE_WEIGHTS,
      category: {
        ...BASE_WEIGHTS.category,
        tecnologia: 45,
        economia: 25,
        diplomazia: 15,
        politica: 10,
        militare: 3,
        cultura: 2,
      },
      riskTolerance: 0.5,
      longTermVsShortTerm: 0.85,
      individualVsCollective: 0.7,
    },
    
    thresholds: {
      attack: 75,
      ally: 30,
      defend: 25,
      negotiate: 35,
      sanction: 55,
    },
    
    triggers: {
      attackWhen: 'defensive_tech_advantage_needed',
      allyWhen: 'tech_transfer_possible && no_security_risk',
      defendWhen: 'research_facilities_targeted',
      negotiateWhen: 'tech_sharing_terms_favorable',
    },
    
    responses: {
      threatened: 'accelerate_research',
      attacked: 'tech_defense_priority',
      allied: 'tech_cooperation_condition',
      sanctioned: 'indigenous_development',
      ignored: 'continue_research_focus',
    },
    
    personalityTraits: {
      patience: 80,
      honor: 70,
      greed: 50,
      ambition: 85,
      caution: 50,
      pride: 65,
    },
  },

  populist: {
    name: 'Populista',
    description: ' cerca il consenso popolare sopra tutto. Prende le decisioni in base a cosa pensa il popolo, spesso a scapito di strategie lungimiranti.',
    
    weights: {
      ...BASE_WEIGHTS,
      category: {
        ...BASE_WEIGHTS.category,
        politica: 40,
        economia: 25,
        cultura: 20,
        diplomazia: 10,
        militare: 3,
        tecnologia: 2,
      },
      riskTolerance: 0.55,
      longTermVsShortTerm: 0.2,
      individualVsCollective: 0.1,
    },
    
    thresholds: {
      attack: 60,
      ally: 35,
      defend: 20,
      negotiate: 40,
      sanction: 30,
    },
    
    triggers: {
      attackWhen: 'public_opinion_demands_it',
      allyWhen: 'public_supports_it',
      defendWhen: 'public_feels_threatened',
      negotiateWhen: 'public_approval_expected',
    },
    
    responses: {
      threatened: 'public_address_then_counter',
      attacked: 'rally_public_support_first',
      allied: 'if_public_supportive',
      sanctioned: 'nationalist_campaign',
      ignored: 'claim_victory_anyway',
    },
    
    personalityTraits: {
      patience: 30,
      honor: 40,
      greed: 55,
      ambition: 70,
      caution: 25,
      pride: 60,
    },
  },

  militarist: {
    name: 'Militarista',
    description: 'Crede nella superiorità delle forze armate. Ogni problema può essere risolto con sufficienti risorse militari.',
    
    weights: {
      ...BASE_WEIGHTS,
      category: {
        ...BASE_WEIGHTS.category,
        militare: 50,
        economia: 20,
        politica: 15,
        diplomazia: 5,
        tecnologia: 5,
        cultura: 5,
      },
      riskTolerance: 0.7,
      longTermVsShortTerm: 0.4,
      individualVsCollective: 0.5,
    },
    
    thresholds: {
      attack: 40,
      ally: 55,
      defend: 20,
      negotiate: 55,
      sanction: 45,
    },
    
    triggers: {
      attackWhen: 'military_superiority_established',
      allyWhen: 'military_cooperation_benefits',
      defendWhen: 'forces_are_ready',
      negotiateWhen: 'military_solution_exhausted',
    },
    
    responses: {
      threatened: 'military_posturing',
      attacked: 'full_military_response',
      allied: 'military_coalition_preferred',
      sanctioned: 'military_strength_display',
      ignored: 'ignore_weaklings',
    },
    
    personalityTraits: {
      patience: 35,
      honor: 65,
      greed: 45,
      ambition: 80,
      caution: 20,
      pride: 85,
    },
  },

  pacifist: {
    name: 'Pacifista',
    description: 'Rifiuta la violenza come mezzo. Cerca soluzioni pacifiche a tutti i costi, anche quando sarebbe più efficace un intervento forte.',
    
    weights: {
      ...BASE_WEIGHTS,
      category: {
        ...BASE_WEIGHTS.category,
        diplomazia: 45,
        cultura: 30,
        economia: 15,
        politica: 5,
        tecnologia: 3,
        militare: 2,
      },
      riskTolerance: 0.2,
      longTermVsShortTerm: 0.9,
      individualVsCollective: 0.9,
    },
    
    thresholds: {
      attack: 100,
      ally: 10,
      defend: 30,
      negotiate: 5,
      sanction: 80,
    },
    
    triggers: {
      attackWhen: 'never',
      allyWhen: 'peace_values_shared',
      defendWhen: 'existential_threat',
      negotiateWhen: 'always_possible',
    },
    
    responses: {
      threatened: 'peaceful_protest',
      attacked: 'nonviolent_resistance',
      allied: 'peace_movement_welcome',
      sanctioned: 'moral_suasion',
      ignored: 'silence_and_continue',
    },
    
    personalityTraits: {
      patience: 100,
      honor: 95,
      greed: 10,
      ambition: 10,
      caution: 70,
      pride: 30,
    },
  },

  opportunist: {
    name: 'Opportunista',
    description: 'Especiale nel cogliere opportunità. Cambia alleati e posizioni a seconda del vento. Maiale che approfitta di tutto.',
    
    weights: {
      ...BASE_WEIGHTS,
      category: {
        ...BASE_WEIGHTS.category,
        economia: 30,
        diplomazia: 25,
        militare: 20,
        politica: 15,
        tecnologia: 5,
        cultura: 5,
      },
      riskTolerance: 0.65,
      longTermVsShortTerm: 0.15,
      individualVsCollective: 0.45,
    },
    
    thresholds: {
      attack: 55,
      ally: 45,
      defend: 35,
      negotiate: 40,
      sanction: 50,
    },
    
    triggers: {
      attackWhen: 'weakness_perceived && gain_assured',
      allyWhen: 'benefits_immediate',
      defendWhen: 'already_engaged',
      negotiateWhen: 'no_better_option',
    },
    
    responses: {
      threatened: 'opportunity_assessment',
      attacked: 'tactical_withdrawal',
      allied: 'if_profitable',
      sanctioned: 'find_backdoor',
      ignored: 'opportunity_cost_analysis',
    },
    
    personalityTraits: {
      patience: 45,
      honor: 25,
      greed: 90,
      ambition: 85,
      caution: 40,
      pride: 35,
    },
  },
};

export function getBehavior(personality: AIPersonality) {
  return NATION_BEHAVIORS_DATA[personality];
}

export function getAllPersonalities(): AIPersonality[] {
  return Object.keys(NATION_BEHAVIORS_DATA) as AIPersonality[];
}

export function adjustWeightsByIdeology(
  weights: AIPreferenceWeights, 
  ideology: string
): AIPreferenceWeights {
  const adjusted = { ...weights, category: { ...weights.category } };
  
  switch (ideology) {
    case 'democrazia':
      adjusted.category.diplomazia = (adjusted.category.diplomazia || 0) + 10;
      adjusted.category.militare = Math.max(0, (adjusted.category.militare || 0) - 5);
      adjusted.riskTolerance = Math.min(1, adjusted.riskTolerance + 0.1);
      break;
    case 'dittatura':
      adjusted.category.militare = (adjusted.category.militare || 0) + 10;
      adjusted.category.cultura = (adjusted.category.cultura || 0) + 5;
      adjusted.individualVsCollective = Math.min(1, adjusted.individualVsCollective - 0.2);
      break;
    case 'monarchia':
      adjusted.category.cultura = (adjusted.category.cultura || 0) + 10;
      adjusted.longTermVsShortTerm = Math.min(1, adjusted.longTermVsShortTerm + 0.1);
      adjusted.honor = (adjusted.honor || 0.5) + 0.15;
      break;
    case 'teocrazia':
      adjusted.category.cultura = (adjusted.category.cultura || 0) + 15;
      adjusted.category.politica = (adjusted.category.politica || 0) + 5;
      adjusted.riskTolerance = Math.max(0, adjusted.riskTolerance - 0.1);
      break;
    case 'comunismo':
      adjusted.category.politica = (adjusted.category.politica || 0) + 10;
      adjusted.category.economia = (adjusted.category.economia || 0) + 5;
      adjusted.individualVsCollective = Math.min(1, adjusted.individualVsCollective + 0.3);
      break;
    case 'fascismo':
      adjusted.category.militare = (adjusted.category.militare || 0) + 15;
      adjusted.category.cultura = (adjusted.category.cultura || 0) + 5;
      adjusted.riskTolerance = Math.min(1, adjusted.riskTolerance + 0.15);
      break;
    case 'anarchia':
      adjusted.riskTolerance = Math.max(0, adjusted.riskTolerance - 0.2);
      adjusted.category.economia = (adjusted.category.economia || 0) + 10;
      break;
  }
  
  return adjusted;
}

export function getCompatiblePersonalities(ideology: string): AIPersonality[] {
  switch (ideology) {
    case 'democrazia':
      return ['diplomatic', 'pragmatic', 'populist', 'technocratic'];
    case 'dittatura':
      return ['aggressive', 'militarist', 'opportunist'];
    case 'monarchia':
      return ['nationalist', 'diplomatic', 'pragmatic'];
    case 'teocrazia':
      return ['nationalist', 'populist', 'pacifist'];
    case 'comunismo':
      return ['populist', 'pragmatic', 'isolationist'];
    case 'fascismo':
      return ['aggressive', 'militarist', 'nationalist'];
    case 'anarchia':
      return ['isolationist', 'opportunist'];
    default:
      return ['pragmatic', 'diplomatic'];
  }
}
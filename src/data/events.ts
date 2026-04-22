import type { ChoiceEffect } from '../types';

export interface GameEventData {
  id: string;
  name: string;
  description: string;
  category: 'disastro' | 'crisi' | 'scoperta' | 'rivelazione' | 'movimento' | 'unico';
  probability: number;
  effects: ChoiceEffect[];
  requirements?: {
    minTurn?: number;
    economy?: { minGdp?: number; maxDebtGdp?: number };
    consensus?: { minGeneral?: number };
    tech?: { minLevel?: string };
  };
  severity: 'positive' | 'neutral' | 'negative' | 'critical';
}

export const GAME_EVENTS: GameEventData[] = [
  // ============================================
  // DISASTRI NATURALI
  // ============================================
  {
    id: 'earthquake',
    name: 'Terremoto Devastante',
    description: 'Un potente terremoto colpisce il paese, causando danni enormi',
    category: 'disastro',
    probability: 0.03,
    severity: 'critical',
    effects: [
      { type: 'immediate', target: 'economy', value: -15, duration: 5 },
      { type: 'immediate', target: 'stability', value: -10, duration: 8 },
      { type: 'delayed', target: 'population', value: -5, duration: 3 }
    ]
  },
  {
    id: 'hurricane',
    name: 'Uragano catastrofico',
    description: 'Un uragano di categoria 5 si abbatte sulle coste',
    category: 'disastro',
    probability: 0.025,
    severity: 'critical',
    effects: [
      { type: 'immediate', target: 'economy', value: -12, duration: 4 },
      { type: 'immediate', target: 'food', value: -10, duration: 6 }
    ]
  },
  {
    id: 'flood',
    name: 'Alluvione',
    description: 'Inondazioni devastanti colpiscono le zone agricole',
    category: 'disastro',
    probability: 0.04,
    severity: 'negative',
    effects: [
      { type: 'immediate', target: 'food', value: -15, duration: 4 },
      { type: 'delayed', target: 'economy', value: -8, duration: 6 }
    ]
  },
  {
    id: 'drought',
    name: 'Sicità',
    description: 'Una grave sicità colpisce il paese',
    category: 'disastro',
    probability: 0.05,
    severity: 'negative',
    effects: [
      { type: 'immediate', target: 'food', value: -20, duration: 6 },
      { type: 'immediate', target: 'economy', value: -5, duration: 8 }
    ]
  },
  {
    id: 'pandemic',
    name: 'Pandemia Globale',
    description: 'Una nuova pandemia si diffonde nel paese',
    category: 'disastro',
    probability: 0.02,
    severity: 'critical',
    effects: [
      { type: 'immediate', target: 'economy', value: -20, duration: 8 },
      { type: 'immediate', target: 'stability', value: -15, duration: 6 },
      { type: 'delayed', target: 'population', value: -3, duration: 4 }
    ]
  },
  {
    id: 'wildfire',
    name: 'Incendi Forestali',
    description: 'Incendi devastanti distruggono foreste e abitazioni',
    category: 'disastro',
    probability: 0.04,
    severity: 'negative',
    effects: [
      { type: 'immediate', target: 'economy', value: -8, duration: 4 },
      { type: 'immediate', target: 'environment', value: -15, duration: 10 }
    ]
  },

  // ============================================
  // CRISI ECONOMICHE
  // ============================================
  {
    id: 'recession',
    name: 'Recessione Economica',
    description: 'L\'economia entra in recessione',
    category: 'crisi',
    probability: 0.08,
    severity: 'negative',
    effects: [
      { type: 'immediate', target: 'economy', value: -15, duration: 6 },
      { type: 'immediate', target: 'unemployment', value: 10, duration: 8 },
      { type: 'delayed', target: 'stability', value: -10, duration: 4 }
    ]
  },
  {
    id: 'bank_crisis',
    name: 'Crisi Bancaria',
    description: 'Il sistema bancario è in crisi',
    category: 'crisi',
    probability: 0.04,
    severity: 'critical',
    effects: [
      { type: 'immediate', target: 'economy', value: -20, duration: 8 },
      { type: 'immediate', target: 'stability', value: -15, duration: 6 }
    ]
  },
  {
    id: 'inflation_spike',
    name: 'Inflazione Record',
    description: 'L\'inflazione raggiunge livelli critici',
    category: 'crisi',
    probability: 0.06,
    severity: 'negative',
    effects: [
      { type: 'immediate', target: 'economy', value: -10, duration: 5 },
      { type: 'immediate', target: 'stability', value: -8, duration: 4 }
    ]
  },
  {
    id: 'currency_collapse',
    name: 'Crollo Valutario',
    description: 'La valuta nazionale crolla',
    category: 'crisi',
    probability: 0.02,
    severity: 'critical',
    effects: [
      { type: 'immediate', target: 'economy', value: -25, duration: 10 },
      { type: 'immediate', target: 'stability', value: -20, duration: 8 }
    ]
  },
  {
    id: 'debt_crisis',
    name: 'Crisi del Debito',
    description: 'Il debito pubblico diventa insostenibile',
    category: 'crisi',
    probability: 0.05,
    severity: 'critical',
    requirements: { economy: { maxDebtGdp: 150 } },
    effects: [
      { type: 'immediate', target: 'economy', value: -15, duration: 8 },
      { type: 'delayed', target: 'stability', value: -15, duration: 6 }
    ]
  },
  {
    id: 'trade_war',
    name: 'Guerra Commerciale',
    description: 'Una guerra commerciale riduce le esportazioni',
    category: 'crisi',
    probability: 0.04,
    severity: 'negative',
    effects: [
      { type: 'immediate', target: 'economy', value: -12, duration: 6 },
      { type: 'immediate', target: 'trade', value: -20, duration: 8 }
    ]
  },

  // ============================================
  // CRISI POLITICHE
  // ============================================
  {
    id: 'coup',
    name: 'Colpo di Stato',
    description: 'Un gruppo militare tenta un colpo di stato',
    category: 'crisi',
    probability: 0.02,
    severity: 'critical',
    effects: [
      { type: 'immediate', target: 'stability', value: -30, duration: 10 },
      { type: 'immediate', target: 'economy', value: -15, duration: 6 }
    ]
  },
  {
    id: 'protests',
    name: 'Proteste di Piazza',
    description: 'Grandi proteste scuotono il paese',
    category: 'crisi',
    probability: 0.06,
    severity: 'negative',
    effects: [
      { type: 'immediate', target: 'stability', value: -15, duration: 4 },
      { type: 'delayed', target: 'economy', value: -5, duration: 3 }
    ]
  },
  {
    id: 'scandal',
    name: 'Scandalo Politico',
    description: 'Uno scandalo coinvolge il governo',
    category: 'crisi',
    probability: 0.05,
    severity: 'negative',
    effects: [
      { type: 'immediate', target: 'stability', value: -12, duration: 5 },
      { type: 'immediate', target: 'reputation', value: -15, duration: 6 }
    ]
  },
  {
    id: 'assassination',
    name: 'Assassinio Politico',
    description: 'Un leader viene assassinato',
    category: 'crisi',
    probability: 0.01,
    severity: 'critical',
    effects: [
      { type: 'immediate', target: 'stability', value: -25, duration: 8 },
      { type: 'immediate', target: 'economy', value: -10, duration: 4 }
    ]
  },

  // ============================================
  // SCOPERTE
  // ============================================
  {
    id: 'oil_discovery',
    name: 'Scoperta Petrolifera',
    description: 'Viene scoperto un grande giacimento di petrolio',
    category: 'scoperta',
    probability: 0.03,
    severity: 'positive',
    effects: [
      { type: 'immediate', target: 'economy', value: 15, duration: 10 },
      { type: 'immediate', target: 'oil', value: 30, duration: 15 }
    ]
  },
  {
    id: 'tech_breakthrough',
    name: 'Svolta Tecnologica',
    description: 'Una scoperta rivoluziona la tecnologia',
    category: 'scoperta',
    probability: 0.04,
    severity: 'positive',
    effects: [
      { type: 'immediate', target: 'technology', value: 20, duration: 10 },
      { type: 'immediate', target: 'economy', value: 10, duration: 8 }
    ]
  },
  {
    id: 'rare_earth',
    name: 'Giacimento Terre Rare',
    description: 'Viene scoperto un giacimento di terre rare',
    category: 'scoperta',
    probability: 0.02,
    severity: 'positive',
    effects: [
      { type: 'immediate', target: 'economy', value: 12, duration: 12 },
      { type: 'immediate', target: 'technology', value: 15, duration: 10 }
    ]
  },
  {
    id: 'medical_breakthrough',
    name: 'Scoperta Medica',
    description: 'Una nuova cura viene scoperta',
    category: 'scoperta',
    probability: 0.03,
    severity: 'positive',
    effects: [
      { type: 'immediate', target: 'health', value: 15, duration: 8 },
      { type: 'immediate', target: 'reputation', value: 10, duration: 6 }
    ]
  },
  {
    id: 'agricultural_breakthrough',
    name: 'Rivoluzione Agricola',
    description: 'Nuove tecniche aumentano la produzione',
    category: 'scoperta',
    probability: 0.04,
    severity: 'positive',
    effects: [
      { type: 'immediate', target: 'food', value: 25, duration: 8 },
      { type: 'immediate', target: 'economy', value: 8, duration: 6 }
    ]
  },

  // ============================================
  // EVENTI DIPLOMATICI
  // ============================================
  {
    id: 'alliance_offer',
    name: 'Offerta di Alleanza',
    description: 'Una nazione offre un\'alleanza',
    category: 'movimento',
    probability: 0.05,
    severity: 'positive',
    effects: [
      { type: 'immediate', target: 'diplomacy', value: 15, duration: 5 },
      { type: 'delayed', target: 'security', value: 10, duration: 8 }
    ]
  },
  {
    id: 'trade_deal',
    name: 'Accordo Commerciale',
    description: 'Viene siglato un importante accordo commerciale',
    category: 'movimento',
    probability: 0.06,
    severity: 'positive',
    effects: [
      { type: 'immediate', target: 'economy', value: 10, duration: 6 },
      { type: 'immediate', target: 'trade', value: 15, duration: 8 }
    ]
  },
  {
    id: 'sanctions_lifted',
    name: 'Sanzioni Rimosse',
    description: 'Le sanzioni vengono rimosse',
    category: 'movimento',
    probability: 0.04,
    severity: 'positive',
    effects: [
      { type: 'immediate', target: 'economy', value: 12, duration: 6 },
      { type: 'immediate', target: 'reputation', value: 8, duration: 5 }
    ]
  },
  {
    id: 'war_declaration',
    name: 'Dichiarazione di Guerra',
    description: 'Una nazione dichiara guerra',
    category: 'crisi',
    probability: 0.02,
    severity: 'critical',
    effects: [
      { type: 'immediate', target: 'stability', value: -20, duration: 10 },
      { type: 'immediate', target: 'economy', value: -15, duration: 8 }
    ]
  },
  {
    id: 'peace_treaty',
    name: 'Trattato di Pace',
    description: 'Viene firmato un trattato di pace',
    category: 'movimento',
    probability: 0.03,
    severity: 'positive',
    effects: [
      { type: 'immediate', target: 'stability', value: 15, duration: 8 },
      { type: 'immediate', target: 'economy', value: 8, duration: 5 }
    ]
  },
  {
    id: 'summit_success',
    name: 'Vertice Riuscito',
    description: 'Un vertice internazionale ha successo',
    category: 'movimento',
    probability: 0.05,
    severity: 'positive',
    effects: [
      { type: 'immediate', target: 'diplomacy', value: 12, duration: 6 },
      { type: 'immediate', target: 'reputation', value: 10, duration: 5 }
    ]
  },

  // ============================================
  // EVENTI SPAZIALI
  // ============================================
  {
    id: 'satellite_launch',
    name: 'Lancio Satellitare',
    description: 'Un satellite viene lanciato con successo',
    category: 'scoperta',
    probability: 0.08,
    severity: 'positive',
    requirements: { tech: { minLevel: 'launchers' } },
    effects: [
      { type: 'immediate', target: 'technology', value: 8, duration: 5 },
      { type: 'immediate', target: 'reputation', value: 5, duration: 4 }
    ]
  },
  {
    id: 'space_station',
    name: 'Stazione Spaziale',
    description: 'La stazione spaziale diventa operativa',
    category: 'scoperta',
    probability: 0.03,
    severity: 'positive',
    requirements: { tech: { minLevel: 'stations' } },
    effects: [
      { type: 'immediate', target: 'technology', value: 15, duration: 10 },
      { type: 'immediate', target: 'reputation', value: 20, duration: 8 }
    ]
  },
  {
    id: 'moon_landing',
    name: 'Allunaggio',
    description: 'Il paese attera sulla Luna',
    category: 'scoperta',
    probability: 0.01,
    severity: 'positive',
    requirements: { tech: { minLevel: 'lunar' } },
    effects: [
      { type: 'immediate', target: 'technology', value: 25, duration: 15 },
      { type: 'immediate', target: 'reputation', value: 30, duration: 20 }
    ]
  },
  {
    id: 'mars_mission',
    name: 'Missione Marziana',
    description: 'Una missione raggiunge Marte',
    category: 'scoperta',
    probability: 0.005,
    severity: 'positive',
    requirements: { tech: { minLevel: 'mars' } },
    effects: [
      { type: 'immediate', target: 'technology', value: 40, duration: 20 },
      { type: 'immediate', target: 'reputation', value: 50, duration: 25 }
    ]
  },

  // ============================================
  // EVENTI MILITARI
  // ============================================
  {
    id: 'military_coup',
    name: 'Golpe Militare',
    description: 'I militari prendono il potere',
    category: 'crisi',
    probability: 0.015,
    severity: 'critical',
    effects: [
      { type: 'immediate', target: 'stability', value: -25, duration: 10 },
      { type: 'immediate', target: 'military', value: 20, duration: 5 },
      { type: 'delayed', target: 'economy', value: -15, duration: 8 }
    ]
  },
  {
    id: 'military_victory',
    name: 'Vittoria Militare',
    description: 'Le forze armate riportano una vittoria',
    category: 'movimento',
    probability: 0.04,
    severity: 'positive',
    effects: [
      { type: 'immediate', target: 'stability', value: 15, duration: 8 },
      { type: 'immediate', target: 'military', value: 10, duration: 6 },
      { type: 'immediate', target: 'reputation', value: 12, duration: 5 }
    ]
  },
  {
    id: 'military_defeat',
    name: 'Sconfitta Militare',
    description: 'Le forze armate subiscono una sconfitta',
    category: 'crisi',
    probability: 0.03,
    severity: 'negative',
    effects: [
      { type: 'immediate', target: 'stability', value: -20, duration: 8 },
      { type: 'immediate', target: 'military', value: -15, duration: 6 }
    ]
  },
  {
    id: 'arms_race',
    name: 'Corsa agli Armamenti',
    description: 'Inizia una corsa agli armamenti',
    category: 'crisi',
    probability: 0.04,
    severity: 'negative',
    effects: [
      { type: 'immediate', target: 'economy', value: -10, duration: 6 },
      { type: 'immediate', target: 'military', value: 15, duration: 5 }
    ]
  },

  // ============================================
  // EVENTI INTERNI
  // ============================================
  {
    id: 'election_win',
    name: 'Vittoria Elettorale',
    description: 'Il partito al potere vince le elezioni',
    category: 'movimento',
    probability: 0.1,
    severity: 'positive',
    effects: [
      { type: 'immediate', target: 'stability', value: 10, duration: 5 },
      { type: 'immediate', target: 'reputation', value: 8, duration: 4 }
    ]
  },
  {
    id: 'election_loss',
    name: 'Sconfitta Elettorale',
    description: 'Il partito al potere perde le elezioni',
    category: 'crisi',
    probability: 0.08,
    severity: 'neutral',
    effects: [
      { type: 'immediate', target: 'stability', value: -8, duration: 4 },
      { type: 'delayed', target: 'economy', value: -5, duration: 3 }
    ]
  },
  {
    id: 'reform_success',
    name: 'Riforme Riuscite',
    description: 'Le riforme vengono implementate con successo',
    category: 'movimento',
    probability: 0.06,
    severity: 'positive',
    effects: [
      { type: 'immediate', target: 'economy', value: 10, duration: 6 },
      { type: 'immediate', target: 'stability', value: 8, duration: 5 }
    ]
  },
  {
    id: 'reform_failure',
    name: 'Riforme Fallite',
    description: 'Le riforme non funzionano',
    category: 'crisi',
    probability: 0.05,
    severity: 'negative',
    effects: [
      { type: 'immediate', target: 'stability', value: -10, duration: 5 },
      { type: 'immediate', target: 'reputation', value: -8, duration: 4 }
    ]
  },
  {
    id: 'brain_drain',
    name: 'Fuga di Cervelli',
    description: 'I talenti emigrano all\'estero',
    category: 'crisi',
    probability: 0.05,
    severity: 'negative',
    effects: [
      { type: 'immediate', target: 'technology', value: -10, duration: 8 },
      { type: 'immediate', target: 'economy', value: -8, duration: 6 }
    ]
  },
  {
    id: 'brain_gain',
    name: 'Arrivo di Cervelli',
    description: 'Talenti stranieri arrivano nel paese',
    category: 'movimento',
    probability: 0.04,
    severity: 'positive',
    effects: [
      { type: 'immediate', target: 'technology', value: 12, duration: 8 },
      { type: 'immediate', target: 'economy', value: 8, duration: 6 }
    ]
  },
  {
    id: 'tourism_boom',
    name: 'Turismo in Crescita',
    description: 'Il turismo aumenta drasticamente',
    category: 'movimento',
    probability: 0.06,
    severity: 'positive',
    effects: [
      { type: 'immediate', target: 'economy', value: 15, duration: 8 },
      { type: 'immediate', target: 'reputation', value: 10, duration: 6 }
    ]
  },
  {
    id: 'tourism_decline',
    name: 'Calo Turistico',
    description: 'Il turismo diminuisce',
    category: 'crisi',
    probability: 0.05,
    severity: 'negative',
    effects: [
      { type: 'immediate', target: 'economy', value: -10, duration: 6 },
      { type: 'delayed', target: 'reputation', value: -5, duration: 4 }
    ]
  },
  {
    id: 'crime_wave',
    name: 'Ondata di Criminalità',
    description: 'La criminalità aumenta',
    category: 'crisi',
    probability: 0.06,
    severity: 'negative',
    effects: [
      { type: 'immediate', target: 'stability', value: -12, duration: 5 },
      { type: 'immediate', target: 'economy', value: -8, duration: 4 }
    ]
  },
  {
    id: 'crime_down',
    name: 'Calo della Criminalità',
    description: 'La criminalità diminuisce',
    category: 'movimento',
    probability: 0.05,
    severity: 'positive',
    effects: [
      { type: 'immediate', target: 'stability', value: 10, duration: 5 },
      { type: 'immediate', target: 'reputation', value: 5, duration: 4 }
    ]
  },

  // ============================================
  // EVENTI UNICI
  // ============================================
  {
    id: 'golden_age',
    name: 'Età dell\'Oro',
    description: 'Il paese attraversa un periodo di prosperità',
    category: 'unico',
    probability: 0.02,
    severity: 'positive',
    requirements: { minTurn: 10 },
    effects: [
      { type: 'immediate', target: 'economy', value: 25, duration: 15 },
      { type: 'immediate', target: 'stability', value: 20, duration: 12 },
      { type: 'immediate', target: 'reputation', value: 15, duration: 10 }
    ]
  },
  {
    id: 'dark_age',
    name: 'Età Oscura',
    description: 'Il paese attraversa un periodo buio',
    category: 'unico',
    probability: 0.015,
    severity: 'critical',
    requirements: { minTurn: 15 },
    effects: [
      { type: 'immediate', target: 'economy', value: -30, duration: 15 },
      { type: 'immediate', target: 'stability', value: -25, duration: 12 },
      { type: 'immediate', target: 'reputation', value: -20, duration: 10 }
    ]
  },
  {
    id: 'revolution',
    name: 'Rivoluzione',
    description: 'Scoppia una rivoluzione',
    category: 'unico',
    probability: 0.01,
    severity: 'critical',
    requirements: { consensus: { minGeneral: 25 } },
    effects: [
      { type: 'immediate', target: 'stability', value: -40, duration: 20 },
      { type: 'immediate', target: 'economy', value: -25, duration: 15 },
      { type: 'delayed', target: 'government', value: -30, duration: 10 }
    ]
  },
  {
    id: 'economic_miracle',
    name: 'Miracolo Economico',
    description: 'L\'economia cresce a ritmi record',
    category: 'unico',
    probability: 0.03,
    severity: 'positive',
    effects: [
      { type: 'immediate', target: 'economy', value: 30, duration: 12 },
      { type: 'immediate', target: 'trade', value: 20, duration: 10 }
    ]
  },
  {
    id: 'natural_disaster',
    name: 'Disastro Naturale',
    description: 'Un disastro naturale colpisce il paese',
    category: 'unico',
    probability: 0.04,
    severity: 'negative',
    effects: [
      { type: 'immediate', target: 'economy', value: -18, duration: 8 },
      { type: 'immediate', target: 'stability', value: -12, duration: 6 },
      { type: 'immediate', target: 'population', value: -2, duration: 4 }
    ]
  }
];

export function getRandomEvent(turnNumber: number, conditions?: {
  minGdp?: number;
  maxDebtGdp?: number;
  minConsensus?: number;
  techLevel?: string;
}): GameEventData | null {
  const eligible = GAME_EVENTS.filter(event => {
    if (event.requirements?.minTurn && turnNumber < event.requirements.minTurn) return false;
    if (event.requirements?.economy?.minGdp && conditions && (conditions.minGdp || 0) < event.requirements.economy.minGdp) return false;
    if (event.requirements?.economy?.maxDebtGdp && conditions && (conditions.maxDebtGdp || 0) > event.requirements.economy.maxDebtGdp) return false;
    if (event.requirements?.consensus?.minGeneral && conditions && (conditions.minConsensus || 0) < event.requirements.consensus.minGeneral) return false;
    if (event.requirements?.tech?.minLevel && conditions && conditions.techLevel) {
      const levels = ['launchers', 'satellites', 'stations', 'lunar', 'mars'];
      const minIdx = levels.indexOf(event.requirements.tech.minLevel);
      const curIdx = levels.indexOf(conditions.techLevel);
      if (curIdx < minIdx) return false;
    }
    return true;
  });

  if (eligible.length === 0) return null;

  for (const event of eligible) {
    if (Math.random() < event.probability) {
      return event;
    }
  }
  return null;
}

export function getEventById(id: string): GameEventData | undefined {
  return GAME_EVENTS.find(e => e.id === id);
}

export function getEventsByCategory(category: GameEventData['category']): GameEventData[] {
  return GAME_EVENTS.filter(e => e.category === category);
}
import { Choice, ChoiceCategory, ChoiceEffect, ChoiceType, RegionType, IdeologyType, FocusType, VictoryCondition, GameEvent, ChoiceConsequence } from '../types';

export const REGION_TYPES: RegionType[] = [
  {
    id: 'citta_stato',
    name: 'Città-Stato',
    description: 'Una piccola ma ricca regione urbana con economia fiorente',
    startingResources: { money: 500, food: 30, oil: 5, steel: 20, population: 50 },
    bonus: { economy: 20, technology: 10 },
    weakness: { military: -15, territory: -20 },
    expansionPotential: 'commerciale',
    difficulty: 'facile'
  },
  {
    id: 'regione_agricola',
    name: 'Regione Agricola',
    description: 'Vaste terre fertili ideali per l agricoltura',
    startingResources: { money: 200, food: 100, oil: 5, steel: 10, population: 100 },
    bonus: { food: 30, population: 15 },
    weakness: { economy: -10, military: -5 },
    expansionPotential: 'agricola',
    difficulty: 'facile'
  },
  {
    id: 'regione_mineraria',
    name: 'Regione Mineraria',
    description: 'Ricca di risorse naturali ma popolazione ridotta',
    startingResources: { money: 250, food: 40, oil: 30, steel: 50, population: 40 },
    bonus: { steel: 25, oil: 20 },
    weakness: { population: -15, diplomacy: -10 },
    expansionPotential: 'industriale',
    difficulty: 'media'
  },
  {
    id: 'regione_costiera',
    name: 'Regione Costiera',
    description: 'Sbocco al mare con vantaggi commerciali marittimi',
    startingResources: { money: 350, food: 50, oil: 15, steel: 15, population: 70 },
    bonus: { commerce: 20, navy: 15 },
    weakness: { defense: -10, territory: -10 },
    expansionPotential: 'navale',
    difficulty: 'media'
  },
  {
    id: 'regione_frontiera',
    name: 'Regione di Frontiera',
    description: 'Territorio vasto e inesplorato, pieno di opportunità',
    startingResources: { money: 150, food: 50, oil: 10, steel: 15, population: 30 },
    bonus: { territory: 30, exploration: 20 },
    weakness: { stability: -20, administration: -15 },
    expansionPotential: 'militare',
    difficulty: 'difficile'
  },
  {
    id: 'regione_montagna',
    name: 'Regione Montana',
    description: 'Posizione difensiva naturale ma risorse limitate',
    startingResources: { money: 150, food: 40, oil: 5, steel: 30, population: 40 },
    bonus: { defense: 25, morale: 10 },
    weakness: { economy: -15, movement: -10 },
    expansionPotential: 'difensiva',
    difficulty: 'facile'
  },
  {
    id: 'regione_island',
    name: 'Isola',
    description: 'Territorio isolato, difficile da conquistare ma anche da espandere',
    startingResources: { money: 300, food: 40, oil: 20, steel: 15, population: 50 },
    bonus: { navy: 25, isolation: 15 },
    weakness: { territory: -25, land: -20 },
    expansionPotential: 'navale',
    difficulty: 'media'
  },
  {
    id: 'regione_sacra',
    name: 'Regione Sacra',
    description: 'Centro religioso con forte influenza culturale',
    startingResources: { money: 250, food: 50, oil: 5, steel: 10, population: 60 },
    bonus: { culture: 25, softPower: 20 },
    weakness: { military: -20, economy: -5 },
    expansionPotential: 'culturale',
    difficulty: 'media'
  },
  {
    id: 'regione_industriale',
    name: 'Regione Industriale',
    description: 'Fabbriche e produzione di massa',
    startingResources: { money: 300, food: 30, oil: 25, steel: 40, population: 80 },
    bonus: { production: 25, technology: 15 },
    weakness: { environment: -20, health: -10 },
    expansionPotential: 'tecnologica',
    difficulty: 'media'
  },
  {
    id: 'regione_capitale',
    name: 'Capitale Imperiale',
    description: 'Ex capitale di un grande impero, eredità di gloria passata',
    startingResources: { money: 400, food: 60, oil: 15, steel: 30, population: 100 },
    bonus: { prestige: 20, administration: 15 },
    weakness: { corruption: -15, conservative: 10 },
    expansionPotential: 'diplomatica',
    difficulty: 'media'
  }
];

export const IDEOLOGY_TYPES: IdeologyType[] = [
  {
    id: 'democrazia',
    name: 'Democrazia',
    description: 'Governo del popolo, elezioni e diritti civili',
    effects: { consensus: 15, stability: -5, military: -10, economy: 5 },
    compatibleFactions: ['progressists', 'liberals', 'democrats'],
    color: '#3498db'
  },
  {
    id: 'dittatura',
    name: 'Dittatura',
    description: 'Potere concentrato in un leader o partito unico',
    effects: { military: 20, stability: 15, consensus: -15, diplomacy: -10 },
    compatibleFactions: ['military', 'nationalists', 'authoritarians'],
    color: '#e74c3c'
  },
  {
    id: 'monarchia',
    name: 'Monarchia',
    description: 'Regno guidato da un sovrano ereditario',
    effects: { prestige: 15, stability: 10, tradition: 15, flexibility: -15 },
    compatibleFactions: ['conservatives', 'royalists', 'aristocrats'],
    color: '#9b59b6'
  },
  {
    id: 'teocrazia',
    name: 'Teocrazia',
    description: 'Potere religioso che governa in nome del divino',
    effects: { culture: 20, consensus: 10, softPower: 15, technology: -10 },
    compatibleFactions: ['clergy', 'traditionalists', 'believers'],
    color: '#f1c40f'
  },
  {
    id: 'comunismo',
    name: 'Comunismo',
    description: 'Proprietà collettiva dei mezzi di produzione',
    effects: { equality: 25, production: 15, military: 5, incentive: -20 },
    compatibleFactions: ['workers', 'socialists', 'communists'],
    color: '#c0392b'
  },
  {
    id: 'fascismo',
    name: 'Fascismo',
    description: 'Nazionalismo estremo e militarismo',
    effects: { military: 25, nationalism: 20, unity: 15, aggression: 20 },
    compatibleFactions: ['nationalists', 'militarists', 'extremists'],
    color: '#8e44ad'
  },
  {
    id: 'anarchia',
    name: 'Anarchia',
    description: 'Assenza di governo centrale, autofinzione',
    effects: { freedom: 30, innovation: 15, chaos: -20, stability: -25 },
    compatibleFactions: ['libertarians', 'activists', 'revolts'],
    color: '#2ecc71'
  },
  {
    id: 'sistema_ibrido',
    name: 'Sistema Ibrido',
    description: 'Mix di elementi di diversi sistemi',
    effects: { flexibility: 15, stability: 5, adaptability: 20 },
    compatibleFactions: ['pragmatists', 'moderates', 'reformists'],
    color: '#95a5a6'
  }
];

export const FOCUS_TYPES: FocusType[] = [
  {
    id: 'espansionista',
    name: 'Espansionista',
    description: 'Aumentare il territorio e la influenza',
    bonus: { conquest: 20, territory: 15 },
    weakness: { stability: -10, diplomacy: -10 },
    unlockedChoices: ['militarY_reconquista', 'annexation', 'colonization']
  },
  {
    id: 'difensivo',
    name: 'Difensivo',
    description: 'Proteggere e consolidare',
    bonus: { defense: 25, stability: 10 },
    weakness: { expansion: -15, aggression: -10 },
    unlockedChoices: ['fortification', 'ally_defense', 'fortress']
  },
  {
    id: 'commerciale',
    name: 'Commerciale',
    description: 'Arricchire attraverso il commercio',
    bonus: { economy: 20, trade: 25 },
    weakness: { military: -10, autarky: -15 },
    unlockedChoices: ['trade_deal', 'embassy', 'market']
  },
  {
    id: 'tecnologico',
    name: 'Tecnologico',
    description: 'Innovare e progredire',
    bonus: { technology: 25, innovation: 20 },
    weakness: { tradition: -15, resources: -10 },
    unlockedChoices: ['research', 'academy', 'patent']
  },
  {
    id: 'diplomatico',
    name: 'Diplomatico',
    description: 'Allearsi e negoziare',
    bonus: { alliance: 20, reputation: 15 },
    weakness: { sovereignty: -10, military: -5 },
    unlockedChoices: ['treaty', 'summit', 'mediation']
  },
  {
    id: 'isolazionista',
    name: 'Isolazionista',
    description: 'Autarchia e indipendenza',
    bonus: { independence: 25, selfReliance: 20 },
    weakness: { alliance: -20, trade: -15 },
    unlockedChoices: ['tariff', 'embargo', 'seclusion']
  },
  {
    id: 'culturale',
    name: 'Culturale',
    description: 'Diffondere la propria cultura',
    bonus: { culture: 20, softPower: 20 },
    weakness: { military: -5, economy: -5 },
    unlockedChoices: ['propaganda', 'festival', 'export_culture']
  },
  {
    id: 'spaziale',
    name: 'Spaziale',
    description: 'Conquistare lo spazio',
    bonus: { space: 30, prestige: 15 },
    weakness: { earth: -10, economy: -15 },
    unlockedChoices: ['launch', 'satellite', 'station', 'moon', 'mars']
  }
];

export const VICTORY_CONDITIONS: VictoryCondition[] = [
  {
    id: 'conquista_totale',
    name: 'Conquista Totale',
    description: 'Controlla il 100% del mondo conosciuto',
    type: 'conquista',
    target: { worldControl: 100 },
    difficulty: 'impossibile',
    turnsRequired: 200
  },
  {
    id: 'conquista_moderata',
    name: 'Conquista Regionale',
    description: 'Controlla il 50% del mondo',
    type: 'conquista',
    target: { worldControl: 50 },
    difficulty: 'difficile',
    turnsRequired: 100
  },
  {
    id: 'dominio_economico',
    name: 'Dominio Economico',
    description: 'Raggiungi il PIL più alto del mondo',
    type: 'economica',
    target: { gdpRank: 1 },
    difficulty: 'media',
    turnsRequired: 50
  },
  {
    id: 'alleanza_mondiale',
    name: 'Lega Mondiale',
    description: 'Alleaoti con tutte le nazioni',
    type: 'diplomatica',
    target: { alliesRequired: 20 },
    difficulty: 'difficile',
    turnsRequired: 80
  },
  {
    id: 'supremazia_tecnologica',
    name: 'Era Spaziale',
    description: 'Colonizza Marte',
    type: 'spaziale',
    target: { spaceLevel: 'mars_colony' },
    difficulty: 'media',
    turnsRequired: 60
  },
  {
    id: 'governo_perpetuo',
    name: 'Governo Perpetuo',
    description: 'Mantieni il potere per 100 turni',
    type: 'sopravvivenza',
    target: { survivalTurns: 100 },
    difficulty: 'media',
    turnsRequired: 100
  },
  {
    id: 'equilibrio_perfetto',
    name: 'Equilibrio Perfetto',
    description: 'Raggiungi tutti gli obiettivi insieme',
    type: 'mista',
    target: { gdpRank: 3, worldControl: 30, alliesRequired: 10, spaceLevel: 'lunar_base' },
    difficulty: 'difficile',
    turnsRequired: 80
  },
  {
    id: 'sandbox',
    name: 'Partita Non Finita',
    description: 'Gioca indefinitamente senza vincere',
    type: 'infinita',
    target: {},
    difficulty: 'nessuna',
    turnsRequired: Infinity
  }
];

export type { RegionType, IdeologyType, FocusType, VictoryCondition };
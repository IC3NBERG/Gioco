import { Choice, SpaceQuest, SpaceBranch } from '../../types';

export const SPACE_CHOICES: Choice[] = [
  // RAMO PESANTI - Lanciatori Pesanti per cargo massivo
  {
    id: 'heavy_launcher_dev',
    name: 'Sviluppo Lanciatori Pesanti',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Costruisci razzi vettore per cargo pesanti',
    cost: { pa: 2, resources: { money: 100, steel: 40 } },
    effects: [
      { type: 'immediate', target: 'heavy_launchers', value: 15, duration: 10 },
      { type: 'delayed', target: 'space_capacity', value: 20, duration: 15 }
    ],
    requirements: { technology: 30 },
    unlocks: ['heavy_launcher'],
    risk: { type: 'launch_failure', probability: 0.2 }
  },
  {
    id: 'orbital_heavy_construction',
    name: 'Costruzione Orbitale Pesante',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Assembla strutture massive in orbita',
    cost: { pa: 3, resources: { money: 150, steel: 80 } },
    effects: [
      { type: 'immediate', target: 'orbital_construction', value: 20, duration: 15 },
      { type: 'delayed', target: 'space_defense', value: 15, duration: 20 }
    ],
    requirements: { technology: 50, heavy_launchers: 1 },
    unlocks: ['heavy_station'],
    risk: { type: 'debris', probability: 0.15 }
  },
  {
    id: 'solar_gamma_array',
    name: 'Array Solare Gamma',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Insieme di pannelli solari orbitali',
    cost: { pa: 3, resources: { money: 200, steel: 60 } },
    effects: [
      { type: 'immediate', target: 'energy_production', value: 30, duration: 25 },
      { type: 'delayed', target: 'economy', value: 15, duration: 20 }
    ],
    requirements: { technology: 70, orbital_construction: 2 },
    unlocks: ['solar_gamma'],
    risk: { type: 'satellite_loss', probability: 0.1 }
  },
  {
    id: 'dysons_swarm',
    name: 'Sciame di Dyson (Iniziale)',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Primi componenti per raccolta energia solare',
    cost: { pa: 3, resources: { money: 400, steel: 150 } },
    effects: [
      { type: 'immediate', target: 'energy_infinite', value: 50, duration: 30 },
      { type: 'immediate', target: 'prestige', value: 30, duration: 0 }
    ],
    requirements: { technology: 90, solar_gamma: 2 },
    unlocks: ['dysons_swarm'],
    risk: { type: 'engineering', probability: 0.3 }
  },

  // RAMO LEGGERI - Costellazioni e sorveglianza
  {
    id: 'light_launcher_dev',
    name: 'Sviluppo Lanciatori Leggeri',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Lanciatori rapidi ed economici',
    cost: { pa: 2, resources: { money: 70, steel: 20 } },
    effects: [
      { type: 'immediate', target: 'light_launchers', value: 15, duration: 10 },
      { type: 'delayed', target: 'launch_frequency', value: 25, duration: 15 }
    ],
    requirements: { technology: 25 },
    unlocks: ['light_launcher'],
    risk: { type: 'launch_failure', probability: 0.15 }
  },
  {
    id: 'satellite_constellation',
    name: 'Costellazione Satellitare',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'rete globale di satelliti',
    cost: { pa: 2, resources: { money: 80, steel: 30 } },
    effects: [
      { type: 'immediate', target: 'constellation', value: 20, duration: 15 },
      { type: 'immediate', target: 'reconnaissance', value: 20, duration: 10 },
      { type: 'delayed', target: 'communication', value: 15, duration: 15 }
    ],
    requirements: { technology: 35, light_launchers: 1 },
    unlocks: ['satellite_network'],
    risk: { type: 'collision', probability: 0.1 }
  },
  {
    id: 'global_orbital_control',
    name: 'Dominio Orbitale Globale',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Controlla lorbita terrestre',
    cost: { pa: 3, resources: { money: 180, steel: 70 } },
    effects: [
      { type: 'immediate', target: 'orbital_control', value: 30, duration: 25 },
      { type: 'delayed', target: 'early_warning', value: 25, duration: 20 }
    ],
    requirements: { technology: 55, constellation: 2 },
    unlocks: ['orbital_dominion'],
    risk: { type: 'detection', probability: 0.2 }
  },

  // RAMO VELOCI - Attacco e difesa spaziale
  {
    id: 'fast_launcher_dev',
    name: 'Sviluppo Lanci Veloce',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Lanciatori per risposta rapida',
    cost: { pa: 2, resources: { money: 90, steel: 25 } },
    effects: [
      { type: 'immediate', target: 'fast_launchers', value: 15, duration: 10 },
      { type: 'delayed', target: 'strike_time', value: -30, duration: 15 }
    ],
    requirements: { technology: 30 },
    unlocks: ['fast_launcher'],
    risk: { type: 'accident', probability: 0.2 }
  },
  {
    id: 'space_strike_force',
    name: 'Forza di Strike Spaziale',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Unita operative spaziali',
    cost: { pa: 3, resources: { money: 120, steel: 50 } },
    effects: [
      { type: 'immediate', target: 'space_strike', value: 25, duration: 15 },
      { type: 'delayed', target: 'orbital_assault', value: 20, duration: 20 }
    ],
    requirements: { technology: 45, fast_launchers: 1 },
    unlocks: ['space_marines'],
    risk: { type: 'mission_failure', probability: 0.25 }
  },
  {
    id: 'orbital_defense_grid',
    name: 'Griglia Difesa Orbitale',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Sistema difensivo spaziale',
    cost: { pa: 3, resources: { money: 160, steel: 80 } },
    effects: [
      { type: 'immediate', target: 'space_defense', value: 35, duration: 25 },
      { type: 'delayed', target: 'missile_interception', value: 30, duration: 20 }
    ],
    requirements: { technology: 60, space_strike: 2 },
    unlocks: ['space_shield'],
    risk: { type: 'satellite_loss', probability: 0.15 }
  },

  // RAMO ECONOMICO - Turismo e profitto
  {
    id: 'economy_launcher_dev',
    name: 'Sviluppo Lanci Economici',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Lanciatori a basso costo',
    cost: { pa: 2, resources: { money: 60, steel: 15 } },
    effects: [
      { type: 'immediate', target: 'economy_launchers', value: 15, duration: 10 },
      { type: 'delayed', target: 'cost_per_kg', value: -25, duration: 15 }
    ],
    requirements: { technology: 20 },
    unlocks: ['cheap_launcher'],
    risk: { type: 'reliability', probability: 0.2 }
  },
  {
    id: 'space_tourism',
    name: 'Turismo Spaziale',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Viaggi orbitali commerciali',
    cost: { pa: 2, resources: { money: 100, steel: 30 } },
    effects: [
      { type: 'immediate', target: 'tourism', value: 25, duration: 15 },
      { type: 'delayed', target: 'economy', value: 20, duration: 20 },
      { type: 'delayed', target: 'culture', value: 10, duration: 15 }
    ],
    requirements: { technology: 40, economy_launchers: 1 },
    unlocks: ['space_tourism'],
    risk: { type: 'accident', probability: 0.2 }
  },
  {
    id: 'orbital_mining_operations',
    name: 'Estrazione Mineraria Orbitale',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Mining su asteroidi',
    cost: { pa: 3, resources: { money: 140, steel: 60 } },
    effects: [
      { type: 'immediate', target: 'orbital_mining', value: 25, duration: 20 },
      { type: 'delayed', target: 'rare_earth', value: 30, duration: 25 },
      { type: 'delayed', target: 'economy', value: 15, duration: 20 }
    ],
    requirements: { technology: 55, tourism: 1 },
    unlocks: ['asteroid_mining'],
    risk: { type: 'equipment_loss', probability: 0.25 }
  },

  // PROGRESSIONE CLASSICA (mantenuta)
  {
    id: 'launcher_upgrade',
    name: 'Potenziamento Lanciatori',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Migliora capacita di lancio',
    cost: { pa: 2, resources: { money: 80, steel: 25 } },
    effects: [
      { type: 'immediate', target: 'launchers', value: 15, duration: 10 },
      { type: 'delayed', target: 'technology', value: 10, duration: 10 }
    ],
    unlocks: ['launcher_ii'],
    risk: { type: 'test_failure', probability: 0.15 }
  },
  {
    id: 'satellite_deployment',
    name: 'Dispiegamento Satelliti',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Lancia satelliti orbitali',
    cost: { pa: 2, resources: { money: 100, steel: 35 } },
    effects: [
      { type: 'immediate', target: 'satellites', value: 15, duration: 15 },
      { type: 'immediate', target: 'communication', value: 15, duration: 10 }
    ],
    requirements: { launchers: 1 },
    unlocks: ['comm_satellite'],
    risk: { type: 'launch_failure', probability: 0.15 }
  },
  {
    id: 'space_station_construction',
    name: 'Costruzione Stazione Spaziale',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Piattaforma orbitale abitata',
    cost: { pa: 3, resources: { money: 150, steel: 70 } },
    effects: [
      { type: 'immediate', target: 'stations', value: 15, duration: 20 },
      { type: 'delayed', target: 'research', value: 20, duration: 15 }
    ],
    requirements: { satellites: 2, technology: 40 },
    unlocks: ['iss_type'],
    risk: { type: 'decompression', probability: 0.2 }
  },
  {
    id: 'lunar_program',
    name: 'Programma Lunare',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Missione sulla Luna',
    cost: { pa: 3, resources: { money: 200, steel: 90 } },
    effects: [
      { type: 'immediate', target: 'lunar', value: 15, duration: 20 },
      { type: 'delayed', target: 'prestige', value: 25, duration: 15 }
    ],
    requirements: { stations: 2, technology: 55 },
    unlocks: ['moon_mission'],
    risk: { type: 'launch_failure', probability: 0.25 }
  },
  {
    id: 'lunar_base_construction',
    name: 'Costruzione Base Lunare',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Base permanente sulla Luna',
    cost: { pa: 3, resources: { money: 300, steel: 120 } },
    effects: [
      { type: 'immediate', target: 'lunar_colony', value: 20, duration: 25 },
      { type: 'immediate', target: 'territory', value: 10, duration: 30 },
      { type: 'delayed', target: 'prestige', value: 30, duration: 20 }
    ],
    requirements: { lunar: 2, technology: 70 },
    unlocks: ['permanent_moon'],
    risk: { type: 'life_support', probability: 0.2 }
  },
  {
    id: 'mars_mission_prep',
    name: 'Preparazione Missione Marziana',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Prepara missione su Marte',
    cost: { pa: 3, resources: { money: 250, steel: 100 } },
    effects: [
      { type: 'immediate', target: 'mars_prep', value: 20, duration: 20 },
      { type: 'delayed', target: 'technology', value: 15, duration: 15 }
    ],
    requirements: { lunar_colony: 2, technology: 65 },
    unlocks: ['mars_approach'],
    risk: { type: 'radiation', probability: 0.2 }
  },
  {
    id: 'mars_colonization',
    name: 'Colonizzazione Marziana',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Prima colonia su Marte',
    cost: { pa: 3, resources: { money: 500, steel: 200 } },
    effects: [
      { type: 'immediate', target: 'mars_colony', value: 30, duration: 30 },
      { type: 'immediate', target: 'prestige', value: 50, duration: 0 },
      { type: 'delayed', target: 'conquest', value: 20, duration: 30 }
    ],
    requirements: { mars_prep: 2, technology: 85 },
    unlocks: ['permanent_mars'],
    risk: { type: 'life_support', probability: 0.35 }
  }
];

export const SPACE_QUESTS: SpaceQuest[] = [
  {
    id: 'quest_asteroid_mining',
    name: 'Esplorazione Asteroidi',
    type: 'asteroid_mining',
    description: 'Individua e analiza asteroidi ricchi di risorse',
    status: 'available',
    progress: 0,
    requirements: { technology: 30, launchers: 1 },
    rewards: [
      { type: 'immediate', target: 'rare_earth', value: 20, duration: 0 },
      { type: 'delayed', target: 'economy', value: 10, duration: 10 }
    ],
    unlocks: ['orbital_mining']
  },
  {
    id: 'quest_lunar_outpost',
    name: 'Avamposto Lunare',
    type: 'lunar_base',
    description: 'Costruisci un piccolo avamposto sulla Luna',
    status: 'locked',
    progress: 0,
    requirements: { technology: 50, launchers: 2 },
    rewards: [
      { type: 'immediate', target: 'lunar', value: 15, duration: 0 },
      { type: 'delayed', target: 'research', value: 15, duration: 15 }
    ],
    unlocks: ['lunar_base']
  },
  {
    id: 'quest_crew_flight',
    name: 'Volo con Equipaggio',
    type: 'crew_flight',
    description: 'Primo volo spaziale con astronauti',
    status: 'locked',
    progress: 0,
    requirements: { technology: 40, satellites: 1 },
    rewards: [
      { type: 'immediate', target: 'prestige', value: 15, duration: 0 },
      { type: 'delayed', target: 'technology', value: 10, duration: 10 }
    ],
    unlocks: ['human_spaceflight']
  },
  {
    id: 'quest_mars_preparation',
    name: 'Preparazione Marte',
    type: 'mars_colony',
    description: 'Prepara everything per missione marziana',
    status: 'locked',
    progress: 0,
    requirements: { technology: 65, lunar: 2 },
    rewards: [
      { type: 'immediate', target: 'mars_prep', value: 25, duration: 0 },
      { type: 'delayed', target: 'technology', value: 15, duration: 15 }
    ],
    unlocks: ['mars_mission']
  },
  {
    id: 'quest_orbital_research',
    name: 'Ricerca Orbitale',
    type: 'research',
    description: 'Condui esperimenti in microgravita',
    status: 'locked',
    progress: 0,
    requirements: { technology: 35, stations: 1 },
    rewards: [
      { type: 'immediate', target: 'technology', value: 15, duration: 0 },
      { type: 'delayed', target: 'innovation', value: 10, duration: 15 }
    ],
    unlocks: ['space_research']
  },
  {
    id: 'quest_space_defense',
    name: 'Difesa Spaziale',
    type: 'space_defense',
    description: 'Sviluppa capacita difensive orbitali',
    status: 'locked',
    progress: 0,
    requirements: { technology: 55, fast_launchers: 1 },
    rewards: [
      { type: 'immediate', target: 'space_defense', value: 25, duration: 0 },
      { type: 'delayed', target: 'military', value: 15, duration: 15 }
    ],
    unlocks: ['orbital_shield']
  },
  {
    id: 'quest_tourism_program',
    name: 'Programma Turismo Spaziale',
    type: 'tourism',
    description: 'Offri voli turistici suborbitali',
    status: 'locked',
    progress: 0,
    requirements: { technology: 40, economy_launchers: 1 },
    rewards: [
      { type: 'immediate', target: 'tourism', value: 20, duration: 0 },
      { type: 'delayed', target: 'economy', value: 15, duration: 15 }
    ],
    unlocks: ['space_tourism']
  },
  {
    id: 'quest_constellation',
    name: 'Costellazione Globale',
    type: 'satellite_constellation',
    description: 'Costruisci rete globale di comunicazione',
    status: 'locked',
    progress: 0,
    requirements: { technology: 45, light_launchers: 1 },
    rewards: [
      { type: 'immediate', target: 'communication', value: 20, duration: 0 },
      { type: 'delayed', target: 'reconnaissance', value: 15, duration: 15 }
    ],
    unlocks: ['global_network']
  }
];

export const BRANCH_INFO: Record<SpaceBranch, { name: string; description: string; color: string; bonus: Record<string, number> }> = {
  heavy: {
    name: 'Lanciatori Pesanti',
    description: 'Capacita di cargo massiva e costruzione orbitale',
    color: '#ef4444',
    bonus: { cargo: 50, construction: 40 }
  },
  light: {
    name: 'Costellazioni',
    description: 'Sorveglianza globale e comunicazioni',
    color: '#3b82f6',
    bonus: { reconnaissance: 45, communication: 40 }
  },
  fast: {
    name: 'Risposta Rapida',
    description: 'Strike e difesa spaziale',
    color: '#f59e0b',
    bonus: { strike: 50, defense: 35 }
  },
  economy: {
    name: 'Economia Spaziale',
    description: 'Turismo e mining orbitale',
    color: '#10b981',
    bonus: { tourism: 45, profit: 40 }
  }
};

export type { Choice };
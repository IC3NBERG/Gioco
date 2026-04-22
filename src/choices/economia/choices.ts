import { Choice, ChoiceCategory, ChoiceEffect, ChoiceConsequence } from '../../types';

export const ECONOMY_CHOICES: Choice[] = [
  // AGRICOLTURA (15 scelte)
  {
    id: 'agri_reforma',
    name: 'Riforma Agraria',
    category: 'economia',
    subcategory: 'agricoltura',
    description: 'Riforma del sistema di proprietà terriera',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'food', value: 20, duration: 3 },
      { type: 'delayed', target: 'stability', value: -5, duration: 5 }
    ],
    requirements: { stability: 20 },
    unlocks: ['collective_farm'],
    risk: { type: 'civil_unrest', probability: 0.15 }
  },
  {
    id: 'irriguez',
    name: 'Irrigazione',
    category: 'economia',
    subcategory: 'agricoltura',
    description: 'Costruisci sistemi di irrigazione',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'food', value: 30, duration: 5 },
      { type: 'immediate', target: 'development', value: 10, duration: 0 }
    ],
    unlocks: ['hydroponic_farm'],
    risk: { type: 'drought', probability: 0.1 }
  },
  {
    id: 'fertilizzanti',
    name: 'Fertilizzanti Chimici',
    category: 'economia',
    subcategory: 'agricoltura',
    description: 'Introduci fertilizzanti chimici',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'food', value: 25, duration: 3 },
      { type: 'delayed', target: 'health', value: -10, duration: 10 }
    ],
    risk: { type: 'cancer', probability: 0.2 }
  },
  {
    id: 'meccanizzazione_agri',
    name: 'Meccanizzazione Agricola',
    category: 'economia',
    subcategory: 'agricoltura',
    description: 'Trattori e macchine agricole',
    cost: { pa: 2, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'efficiency', value: 30, duration: 10 },
      { type: 'immediate', target: 'unemployment', value: 10, duration: 0 }
    ],
    unlocks: ['tractor_factory'],
    risk: { type: 'debt', probability: 0.1 }
  },
  {
    id: 'agricoltura_biologica',
    name: 'Agricoltura Biologica',
    category: 'economia',
    subcategory: 'agricoltura',
    description: 'Produzione biologica sostenibile',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'health', value: 15, duration: 5 },
      { type: 'immediate', target: 'export', value: 10, duration: 3 },
      { type: 'delayed', target: 'reputation', value: 5, duration: 8 }
    ],
    risk: { type: 'low_yield', probability: 0.15 }
  },
  {
    id: 'stoccaggio',
    name: 'Dispensa Reale',
    category: 'economia',
    subcategory: 'agricoltura',
    description: 'Costruisci silos per il grano',
    cost: { pa: 1, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'reserve', value: 50, duration: 0 },
      { type: 'delayed', target: 'price_stability', value: 15, duration: 10 }
    ],
    risk: { type: 'pest', probability: 0.05 }
  },
  {
    id: 'pesca',
    name: 'Industria della Pesca',
    category: 'economia',
    subcategory: 'agricoltura',
    description: 'Sviluppa la flotta peschereccia',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'food', value: 20, duration: 5 },
      { type: 'immediate', target: 'jobs', value: 15, duration: 0 }
    ],
    requirements: { coastline: true },
    unlocks: ['fishing_fleet'],
    risk: { type: 'overfishing', probability: 0.1 }
  },
  {
    id: 'allevamento',
    name: 'Allevamento Intensivo',
    category: 'economia',
    subcategory: 'agricoltura',
    description: 'Fabbriche di carne',
    cost: { pa: 2, resources: { money: 55 } },
    effects: [
      { type: 'immediate', target: 'food', value: 35, duration: 5 },
      { type: 'delayed', target: 'environment', value: -20, duration: 8 }
    ],
    unlocks: ['slaughterhouse'],
    risk: { type: 'pandemic', probability: 0.15 }
  },
  {
    id: 'serre',
    name: 'Agricoltura in Serra',
    category: 'economia',
    subcategory: 'agricoltura',
    description: 'Coltivazione protetta tutto l anno',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'food', value: 40, duration: 10 },
      { type: 'immediate', target: 'technology', value: 10, duration: 0 }
    ],
    requirements: { technology: 20 },
    risk: { type: 'energy_cost', probability: 0.1 }
  },
  {
    id: 'genetica',
    name: 'OGM',
    category: 'economia',
    subcategory: 'agricoltura',
    description: 'Organismi Geneticamente Modificati',
    cost: { pa: 3, resources: { money: 100 } },
    effects: [
      { type: 'immediate', target: 'food', value: 50, duration: 5 },
      { type: 'immediate', target: 'research', value: 20, duration: 0 }
    ],
    requirements: { technology: 40 },
    unlocks: ['gmo_research'],
    risk: { type: 'protest', probability: 0.25 }
  },
  {
    id: 'cooperativa',
    name: 'Cooperativa Agricola',
    category: 'economia',
    subcategory: 'agricoltura',
    description: 'Associazione di agricoltori',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'efficiency', value: 20, duration: 8 },
      { type: 'immediate', target: 'stability', value: 10, duration: 0 }
    ],
    risk: { type: 'competition', probability: 0.05 }
  },
  {
    id: 'latte',
    name: 'Industria Casearia',
    category: 'economia',
    subcategory: 'agricoltura',
    description: 'Latterie e formaggi',
    cost: { pa: 1, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'food', value: 15, duration: 5 },
      { type: 'immediate', target: 'export', value: 15, duration: 3 }
    ],
    risk: { type: 'disease', probability: 0.1 }
  },
  {
    id: 'biofuel',
    name: 'Biocombustibili',
    category: 'economia',
    subcategory: 'agricoltura',
    description: 'Etanol da mais/grani',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'energy', value: 20, duration: 5 },
      { type: 'immediate', target: 'oil_independence', value: 15, duration: 0 }
    ],
    requirements: { technology: 15 },
    unlocks: ['ethanol_plant'],
    risk: { type: 'food_shortage', probability: 0.15 }
  },
  {
    id: 'export_agri',
    name: 'Esportazione Alimentare',
    category: 'economia',
    subcategory: 'agricoltura',
    description: 'Vendi cibo all estero',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'money', value: 25, duration: 3 },
      { type: 'delayed', target: 'diplomacy', value: 5, duration: 5 }
    ],
    requirements: { food: 30 },
    risk: { type: 'embargo', probability: 0.1 }
  },
  {
    id: 'desert_agri',
    name: 'Agricoltura nel Deserto',
    category: 'economia',
    subcategory: 'agricoltura',
    description: 'Coltivazione in zone aride',
    cost: { pa: 3, resources: { money: 90 } },
    effects: [
      { type: 'immediate', target: 'territory', value: 20, duration: 0 },
      { type: 'immediate', target: 'food', value: 30, duration: 5 }
    ],
    requirements: { technology: 35, desert: true },
    unlocks: ['desert_farming'],
    risk: { type: 'water_depletion', probability: 0.2 }
  },

  // INDUSTRIA (20 scelte)
  {
    id: 'industria_pesante',
    name: 'Industria Pesante',
    category: 'economia',
    subcategory: 'industria',
    description: 'Acciaio, cemento e cantieri',
    cost: { pa: 3, resources: { money: 120 } },
    effects: [
      { type: 'immediate', target: 'steel', value: 40, duration: 10 },
      { type: 'immediate', target: 'jobs', value: 30, duration: 0 },
      { type: 'delayed', target: 'pollution', value: 20, duration: 8 }
    ],
    unlocks: ['steel_mill', 'tank_factory', 'shipyard'],
    risk: { type: 'revolution', probability: 0.1 }
  },
  {
    id: 'industria_leggera',
    name: 'Industria Leggera',
    category: 'economia',
    subcategory: 'industria',
    description: 'Tessili, cibo e beni di consumo',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'gdp', value: 25, duration: 5 },
      { type: 'immediate', target: 'import', value: -10, duration: 0 },
      { type: 'delayed', target: 'quality', value: 10, duration: 8 }
    ],
    risk: { type: 'competition', probability: 0.15 }
  },
  {
    id: 'elettronica',
    name: 'Industria Elettronica',
    category: 'economia',
    subcategory: 'industria',
    description: 'Computer, chip e tecnologia',
    cost: { pa: 3, resources: { money: 100 } },
    effects: [
      { type: 'immediate', target: 'technology', value: 30, duration: 10 },
      { type: 'immediate', target: 'gdp', value: 20, duration: 5 },
      { type: 'delayed', target: 'cyber_warfare', value: 10, duration: 10 }
    ],
    requirements: { technology: 30 },
    unlocks: ['chip_factory', 'tech_hub'],
    risk: { type: 'sanction', probability: 0.15 }
  },
  {
    id: 'farmaceutica',
    name: 'Industria Farmaceutica',
    category: 'economia',
    subcategory: 'industria',
    description: 'Medicinali e ricerca medica',
    cost: { pa: 3, resources: { money: 90 } },
    effects: [
      { type: 'immediate', target: 'health', value: 20, duration: 5 },
      { type: 'immediate', target: 'export', value: 25, duration: 3 },
      { type: 'immediate', target: 'reputation', value: 15, duration: 0 }
    ],
    requirements: { technology: 25 },
    unlocks: ['pharma_lab'],
    risk: { type: 'scandal', probability: 0.15 }
  },
  {
    id: 'automotive',
    name: 'Industria Automobilistica',
    category: 'economia',
    subcategory: 'industria',
    description: 'Case automobilistiche',
    cost: { pa: 3, resources: { money: 110 } },
    effects: [
      { type: 'immediate', target: 'jobs', value: 35, duration: 0 },
      { type: 'immediate', target: 'gdp', value: 25, duration: 5 },
      { type: 'delayed', target: 'oil_dependence', value: 15, duration: 8 }
    ],
    requirements: { technology: 20 },
    unlocks: ['car_factory'],
    risk: { type: 'oil_crisis', probability: 0.15 }
  },
  {
    id: 'aerospaziale',
    name: 'Industria Aerospaziale',
    category: 'economia',
    subcategory: 'industria',
    description: 'Aerei e missili',
    cost: { pa: 3, resources: { money: 130 } },
    effects: [
      { type: 'immediate', target: 'airforce', value: 25, duration: 0 },
      { type: 'immediate', target: 'technology', value: 25, duration: 5 },
      { type: 'immediate', target: 'prestige', value: 15, duration: 0 }
    ],
    requirements: { technology: 45 },
    unlocks: ['aircraft_plant', 'missile_factory'],
    risk: { type: 'accident', probability: 0.1 }
  },
  {
    id: 'navale',
    name: 'Cantieri Navali',
    category: 'economia',
    subcategory: 'industria',
    description: 'Navi mercantili e militari',
    cost: { pa: 3, resources: { money: 115 } },
    effects: [
      { type: 'immediate', target: 'navy', value: 30, duration: 0 },
      { type: 'immediate', target: 'trade', value: 20, duration: 5 },
      { type: 'immediate', target: 'jobs', value: 25, duration: 0 }
    ],
    requirements: { coastline: true },
    unlocks: ['shipyard'],
    risk: { type: 'pirates', probability: 0.1 }
  },
  {
    id: 'energia_nucleare',
    name: 'Energia Nucleare',
    category: 'economia',
    subcategory: 'industria',
    description: 'Centrali nucleari',
    cost: { pa: 3, resources: { money: 150 } },
    effects: [
      { type: 'immediate', target: 'energy', value: 50, duration: 20 },
      { type: 'immediate', target: 'oil_independence', value: 30, duration: 0 }
    ],
    requirements: { technology: 50 },
    unlocks: ['nuclear_plant'],
    risk: { type: 'meltdown', probability: 0.05 }
  },
  {
    id: 'energia_solare',
    name: 'Energia Solare',
    category: 'economia',
    subcategory: 'industria',
    description: 'Pannelli solari e rinnovabili',
    cost: { pa: 2, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'energy', value: 25, duration: 15 },
      { type: 'immediate', target: 'environment', value: 20, duration: 0 },
      { type: 'delayed', target: 'technology', value: 15, duration: 8 }
    ],
    requirements: { technology: 30 },
    unlocks: ['solar_plant'],
    risk: { type: 'weather', probability: 0.1 }
  },
  {
    id: 'energia_eolica',
    name: 'Energia Eolica',
    category: 'economia',
    subcategory: 'industria',
    description: 'Mulini a vento e turbine',
    cost: { pa: 2, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'energy', value: 20, duration: 10 },
      { type: 'immediate', target: 'environment', value: 15, duration: 0 }
    ],
    risk: { type: 'calm', probability: 0.1 }
  },
  {
    id: 'arma',
    name: 'Industria Bellica',
    category: 'economia',
    subcategory: 'industria',
    description: 'Produzione di armi',
    cost: { pa: 3, resources: { money: 100 } },
    effects: [
      { type: 'immediate', target: 'military_production', value: 40, duration: 10 },
      { type: 'immediate', target: 'export', value: 20, duration: 3 },
      { type: 'delayed', target: 'militarism', value: 15, duration: 8 }
    ],
    unlocks: ['arms_factory'],
    risk: { type: 'warfever', probability: 0.15 }
  },
  {
    id: 'cemento',
    name: 'Industria Cementizia',
    category: 'economia',
    subcategory: 'industria',
    description: 'Cemento e calcestruzzo',
    cost: { pa: 2, resources: { money: 65 } },
    effects: [
      { type: 'immediate', target: 'construction', value: 30, duration: 10 },
      { type: 'immediate', target: 'infrastructure', value: 20, duration: 0 }
    ],
    risk: { type: 'pollution', probability: 0.1 }
  },
  {
    id: 'chimica',
    name: 'Industria Chimica',
    category: 'economia',
    subcategory: 'industria',
    description: 'Prodotti chimici',
    cost: { pa: 2, resources: { money: 75 } },
    effects: [
      { type: 'immediate', target: 'gdp', value: 20, duration: 5 },
      { type: 'immediate', target: 'research', value: 15, duration: 0 },
      { type: 'delayed', target: 'environment', value: -15, duration: 10 }
    ],
    requirements: { technology: 25 },
    risk: { type: 'toxic_spill', probability: 0.1 }
  },
  {
    id: 'robotica',
    name: 'Robotica',
    category: 'economia',
    subcategory: 'industria',
    description: 'Automazione e robot',
    cost: { pa: 3, resources: { money: 120 } },
    effects: [
      { type: 'immediate', target: 'efficiency', value: 40, duration: 15 },
      { type: 'immediate', target: 'technology', value: 30, duration: 0 },
      { type: 'delayed', target: 'unemployment', value: 20, duration: 10 }
    ],
    requirements: { technology: 55 },
    unlocks: ['robot_factory'],
    risk: { type: 'ai_ takeover', probability: 0.05 }
  },
  {
    id: 'banconote',
    name: 'Zecca Monetaria',
    category: 'economia',
    subcategory: 'industria',
    description: 'Stampa denaro',
    cost: { pa: 1, resources: { money: 10 } },
    effects: [
      { type: 'immediate', target: 'treasury', value: 50, duration: 0 },
      { type: 'delayed', target: 'inflation', value: 15, duration: 5 }
    ],
    risk: { type: 'hyperinflation', probability: 0.2 }
  },
  {
    id: 'tecnologia',
    name: 'Zona Tecnologica',
    category: 'economia',
    subcategory: 'industria',
    description: 'Distretto tech e startup',
    cost: { pa: 2, resources: { money: 85 } },
    effects: [
      { type: 'immediate', target: 'technology', value: 35, duration: 10 },
      { type: 'immediate', target: 'gdp', value: 20, duration: 5 },
      { type: 'delayed', target: 'brain_drain', value: -10, duration: 10 }
    ],
    requirements: { technology: 35 },
    risk: { type: 'bubble', probability: 0.15 }
  },
  {
    id: 'parco_industriale',
    name: 'Parco Industriale',
    category: 'economia',
    subcategory: 'industria',
    description: 'Area industriale dedicata',
    cost: { pa: 2, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'jobs', value: 40, duration: 0 },
      { type: 'immediate', target: 'efficiency', value: 20, duration: 10 },
      { type: 'delayed', target: 'health', value: -10, duration: 8 }
    ],
    risk: { type: 'accident', probability: 0.08 }
  },
  {
    id: 'riciclaggio',
    name: 'Industria del Riciclaggio',
    category: 'economia',
    subcategory: 'industria',
    description: 'Riciclo e sostenibilità',
    cost: { pa: 1, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'environment', value: 25, duration: 10 },
      { type: 'immediate', target: 'jobs', value: 15, duration: 0 },
      { type: 'delayed', target: 'reputation', value: 10, duration: 8 }
    ],
    risk: { type: 'contamination', probability: 0.1 }
  },

  // COMMERCIO (25 scelte)
  {
    id: 'porto_libero',
    name: 'Porto Franco',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Zona doganale libera',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'trade', value: 40, duration: 10 },
      { type: 'immediate', target: 'gdp', value: 20, duration: 5 },
      { type: 'delayed', target: 'criminal', value: 10, duration: 8 }
    ],
    requirements: { coastline: true },
    risk: { type: 'smuggling', probability: 0.15 }
  },
  {
    id: 'borsa',
    name: 'Borsa Valori',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Mercato azionario',
    cost: { pa: 2, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'gdp', value: 25, duration: 5 },
      { type: 'immediate', target: 'investment', value: 30, duration: 0 },
      { type: 'delayed', target: 'bubble', value: 15, duration: 10 }
    ],
    requirements: { technology: 25 },
    risk: { type: 'crash', probability: 0.2 }
  },
  {
    id: 'trattato_commerciare',
    name: 'Trattato Commerciale',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Accordo commerciale con altra nazione',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'trade', value: 30, duration: 10 },
      { type: 'immediate', target: 'gdp', value: 15, duration: 5 }
    ],
    requirements: { diplomacy: 20 },
    risk: { type: 'betrayal', probability: 0.1 }
  },
  {
    id: 'silk_road',
    name: 'Via della Seta',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Rotte commerciali storiche',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'trade', value: 35, duration: 10 },
      { type: 'immediate', target: 'culture', value: 20, duration: 0 },
      { type: 'delayed', target: 'reputation', value: 15, duration: 10 }
    ],
    risk: { type: 'bandits', probability: 0.15 }
  },
  {
    id: 'zona_euro',
    name: 'Unione Monetaria',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Adotta valuta unica',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'trade', value: 25, duration: 10 },
      { type: 'immediate', target: 'stability', value: 15, duration: 5 },
      { type: 'delayed', target: 'sovereignty', value: -10, duration: 10 }
    ],
    requirements: { allies: 3 },
    risk: { type: 'currency_crisis', probability: 0.15 }
  },
  {
    id: 'tariffa',
    name: 'Tariffa Doganale',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Tassa sulle importazioni',
    cost: { pa: 1, resources: { money: 5 } },
    effects: [
      { type: 'immediate', target: 'treasury', value: 20, duration: 3 },
      { type: 'delayed', target: 'export', value: -10, duration: 5 }
    ],
    risk: { type: 'retaliation', probability: 0.15 }
  },
  {
    id: 'libero_scambio',
    name: 'Libero Scambio',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Zero tariffe doganali',
    cost: { pa: 1, resources: { money: 5 } },
    effects: [
      { type: 'immediate', target: 'trade', value: 30, duration: 10 },
      { type: 'delayed', target: 'domestic_production', value: -15, duration: 8 }
    ],
    requirements: { diplomacy: 15 },
    risk: { type: 'unfair_competition', probability: 0.15 }
  },
  {
    id: 'fiera',
    name: 'Fiera Internazionale',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Evento commerciale',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'trade', value: 25, duration: 5 },
      { type: 'immediate', target: 'reputation', value: 20, duration: 0 }
    ],
    risk: { type: 'boycott', probability: 0.1 }
  },
  {
    id: 'monopolio',
    name: 'Monopolio di Stato',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Controllo statale su bene',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'treasury', value: 30, duration: 5 },
      { type: 'delayed', target: 'black_market', value: 20, duration: 8 }
    ],
    risk: { type: 'corruption', probability: 0.2 }
  },
  {
    id: 'banca_centrale',
    name: 'Banca Centrale',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Istituto di emissione',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'stability', value: 20, duration: 10 },
      { type: 'immediate', target: 'inflation_control', value: 25, duration: 0 },
      { type: 'delayed', target: 'trust', value: 15, duration: 10 }
    ],
    requirements: { gdp: 100 },
    risk: { type: 'fraud', probability: 0.1 }
  },
  {
    id: 'credito',
    name: 'Credito facile',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Prestiti facili alle imprese',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'gdp', value: 20, duration: 5 },
      { type: 'delayed', target: 'debt', value: 15, duration: 5 }
    ],
    risk: { type: 'default', probability: 0.2 }
  },
  {
    id: 'investimento_straniero',
    name: 'Investimenti Esteri',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Attira capitali stranieri',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'gdp', value: 30, duration: 5 },
      { type: 'immediate', target: 'technology', value: 15, duration: 0 },
      { type: 'delayed', target: 'influence', value: -10, duration: 8 }
    ],
    requirements: { stability: 30 },
    risk: { type: 'capital_flight', probability: 0.15 }
  },
  {
    id: 'export_leader',
    name: 'Leader Esportatore',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Diventa leader in un settore',
    cost: { pa: 2, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'export', value: 40, duration: 15 },
      { type: 'immediate', target: 'reputation', value: 25, duration: 0 }
    ],
    requirements: { production: 30 },
    risk: { type: 'monopoly', probability: 0.1 }
  },
  {
    id: 'mercato_nazionale',
    name: 'Mercato Interno',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Sviluppa il mercato locale',
    cost: { pa: 1, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'gdp', value: 15, duration: 8 },
      { type: 'immediate', target: 'self_reliance', value: 20, duration: 0 }
    ],
    risk: { type: 'stagnation', probability: 0.1 }
  },
  {
    id: 'nave_mercantile',
    name: 'Flotta Mercantile',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Navi per il commercio',
    cost: { pa: 2, resources: { money: 55 } },
    effects: [
      { type: 'immediate', target: 'trade', value: 35, duration: 10 },
      { type: 'immediate', target: 'jobs', value: 15, duration: 0 }
    ],
    requirements: { technology: 15 },
    risk: { type: 'piracy', probability: 0.15 }
  },
  {
    id: 'dogana',
    name: 'Apparato Doganale',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Controlli e burocrazia',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'treasury', value: 15, duration: 5 },
      { type: 'delayed', target: 'trade', value: -10, duration: 8 }
    ],
    risk: { type: 'bureaucracy', probability: 0.1 }
  },
  {
    id: 'stock_exchange',
    name: 'Borsa Merci',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Mercato delle materie prime',
    cost: { pa: 1, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'gdp', value: 15, duration: 5 },
      { type: 'immediate', target: 'price_stability', value: 20, duration: 0 }
    ],
    risk: { type: 'speculation', probability: 0.15 }
  },
  {
    id: 'franchising',
    name: 'Franchising',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Catene di negozi',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'jobs', value: 20, duration: 5 },
      { type: 'immediate', target: 'gdp', value: 10, duration: 3 }
    ],
    risk: { type: 'brand_damage', probability: 0.1 }
  },
  {
    id: 'e_commerce',
    name: 'Commercio Elettronico',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Vendite online',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'trade', value: 30, duration: 10 },
      { type: 'immediate', target: 'jobs', value: 10, duration: 0 }
    ],
    requirements: { technology: 20 },
    risk: { type: 'fraud', probability: 0.15 }
  },
  {
    id: 'embargo',
    name: 'Embargo Commerciale',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Blocca importazioni da nazione',
    cost: { pa: 1, resources: { money: 10 } },
    effects: [
      { type: 'immediate', target: 'self_reliance', value: 15, duration: 5 },
      { type: 'delayed', target: 'diplomacy', value: -15, duration: 8 }
    ],
    risk: { type: 'retaliation', probability: 0.2 }
  },
  {
    id: 'sanction_trade',
    name: 'Sanzioni Commerciali',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Imponi sanzioni',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'reputation', value: 10, duration: 0 },
      { type: 'delayed', target: 'trade', value: -20, duration: 10 }
    ],
    risk: { type: 'economic_warfare', probability: 0.15 }
  },
  {
    id: 'contrabbando',
    name: 'Contrabbando',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Commercio illegale',
    cost: { pa: 1, resources: { money: 10 } },
    effects: [
      { type: 'immediate', target: 'treasury', value: 25, duration: 3 },
      { type: 'delayed', target: 'crime', value: 20, duration: 8 }
    ],
    risk: { type: 'discovery', probability: 0.25 }
  },
  {
    id: 'asta',
    name: 'Asta Pubblica',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Privatizzazioni',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'treasury', value: 30, duration: 0 },
      { type: 'delayed', target: 'services', value: -15, duration: 8 }
    ],
    risk: { type: 'scandal', probability: 0.15 }
  },
  {
    id: 'subscription',
    name: 'Abbonamenti',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Modello subscription',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'stability', value: 20, duration: 10 },
      { type: 'delayed', target: 'gdp', value: 10, duration: 8 }
    ],
    requirements: { technology: 15 },
    risk: { type: 'cancel', probability: 0.1 }
  },
  {
    id: 'cartello',
    name: 'Cartello',
    category: 'economia',
    subcategory: 'commercio',
    description: 'Accordo tra produttori',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'profit', value: 25, duration: 5 },
      { type: 'delayed', target: 'competition', value: -20, duration: 10 }
    ],
    risk: { type: 'investigation', probability: 0.2 }
  },

  // FINANZA (15 scelte)
  {
    id: 'tassa',
    name: 'Riforma Fiscale',
    category: 'economia',
    subcategory: 'finanza',
    description: 'Ristruttura il sistema tributario',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'revenue', value: 25, duration: 10 },
      { type: 'delayed', target: 'compliance', value: 15, duration: 8 }
    ],
    risk: { type: 'protest', probability: 0.15 }
  },
  {
    id: 'flat_tax',
    name: 'Flat Tax',
    category: 'economia',
    subcategory: 'finanza',
    description: 'Tassa unica',
    cost: { pa: 2, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'investment', value: 30, duration: 10 },
      { type: 'delayed', target: 'revenue', value: -10, duration: 8 }
    ],
    risk: { type: 'inequality', probability: 0.2 }
  },
  {
    id: 'patrimonio',
    name: 'Tassa sul Patrimonio',
    category: 'economia',
    subcategory: 'finanza',
    description: 'Tassa su proprietà',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'revenue', value: 20, duration: 5 },
      { type: 'delayed', target: 'capital_flight', value: 15, duration: 8 }
    ],
    risk: { type: 'mass_protest', probability: 0.15 }
  },
  {
    id: 'successione',
    name: 'Tassa Successione',
    category: 'economia',
    subcategory: 'finanza',
    description: 'Tassa su eredità',
    cost: { pa: 1, resources: { money: 10 } },
    effects: [
      { type: 'immediate', target: 'revenue', value: 15, duration: 5 },
      { type: 'delayed', target: 'aristocracy', value: -10, duration: 8 }
    ],
    risk: { type: 'elite_opposition', probability: 0.15 }
  },
  {
    id: 'latrocinio',
    name: 'Lotizzazione',
    category: 'economia',
    subcategory: 'finanza',
    description: 'Lotteria nazionale',
    cost: { pa: 1, resources: { money: 10 } },
    effects: [
      { type: 'immediate', target: 'revenue', value: 10, duration: 3 },
      { type: 'delayed', target: 'addiction', value: 10, duration: 8 }
    ],
    risk: { type: 'scandal', probability: 0.1 }
  },
  {
    id: 'gioco',
    name: 'Casinò',
    category: 'economia',
    subcategory: 'finanza',
    description: 'Giochi d azzardo',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'tourism', value: 25, duration: 5 },
      { type: 'immediate', target: 'revenue', value: 20, duration: 3 }
    ],
    requirements: { tourism: 10 },
    risk: { type: 'addiction', probability: 0.15 }
  },
  {
    id: 'crowdfunding',
    name: 'Raccolta Fondi',
    category: 'economia',
    subcategory: 'finanza',
    description: 'Finanziamento collettivo',
    cost: { pa: 1, resources: { money: 5 } },
    effects: [
      { type: 'immediate', target: 'funding', value: 20, duration: 3 },
      { type: 'immediate', target: 'support', value: 10, duration: 0 }
    ],
    risk: { type: 'scam', probability: 0.1 }
  },
  {
    id: 'bond',
    name: 'Bond',
    category: 'economia',
    subcategory: 'finanza',
    description: 'Emetti obbligazioni',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'treasury', value: 40, duration: 0 },
      { type: 'delayed', target: 'debt', value: 30, duration: 10 }
    ],
    risk: { type: 'default', probability: 0.15 }
  },
  {
    id: 'austerity',
    name: 'Austerità',
    category: 'economia',
    subcategory: 'finanza',
    description: 'Taglia la spesa pubblica',
    cost: { pa: 1, resources: { money: 5 } },
    effects: [
      { type: 'immediate', target: 'treasury', value: 25, duration: 5 },
      { type: 'delayed', target: 'unemployment', value: 15, duration: 8 },
      { type: 'delayed', target: 'stability', value: -10, duration: 5 }
    ],
    risk: { type: 'riots', probability: 0.2 }
  },
  {
    id: 'stimolo',
    name: 'Stimolo Fiscale',
    category: 'economia',
    subcategory: 'finanza',
    description: 'Tagliare le tasse',
    cost: { pa: 1, resources: { money: 10 } },
    effects: [
      { type: 'immediate', target: 'gdp', value: 20, duration: 5 },
      { type: 'delayed', target: 'treasury', value: -20, duration: 5 }
    ],
    risk: { type: 'inflation', probability: 0.15 }
  },
  {
    id: 'spesa_pubblica',
    name: 'Spesa Pubblica',
    category: 'economia',
    subcategory: 'finanza',
    description: 'Investi in infrastrutture',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'jobs', value: 30, duration: 0 },
      { type: 'immediate', target: 'infrastructure', value: 25, duration: 10 },
      { type: 'delayed', target: 'gdp', value: 15, duration: 8 }
    ],
    risk: { type: 'debt', probability: 0.15 }
  },
  {
    id: 'spionaggio_economico',
    name: 'Spionaggio Economico',
    category: 'economia',
    subcategory: 'finanza',
    description: 'Ruba segreti commerciali',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'technology', value: 20, duration: 0 },
      { type: 'delayed', target: 'reputation', value: -15, duration: 8 }
    ],
    risk: { type: 'diplomatic_crisis', probability: 0.2 }
  },
  {
    id: 'corruzione',
    name: 'Corruzione',
    category: 'economia',
    subcategory: 'finanza',
    description: 'Accetta tangenti',
    cost: { pa: 0, resources: { money: 0 } },
    effects: [
      { type: 'immediate', target: 'treasury', value: 15, duration: 2 },
      { type: 'delayed', target: 'corruption', value: 20, duration: 10 },
      { type: 'delayed', target: 'reputation', value: -15, duration: 8 }
    ],
    risk: { type: 'scandal', probability: 0.25 }
  },
  {
    id: 'riciclaggio_soldi',
    name: 'Riciclaggio',
    category: 'economia',
    subcategory: 'finanza',
    description: 'Pulisci denaro sporco',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'treasury', value: 30, duration: 3 },
      { type: 'delayed', target: 'crime', value: 25, duration: 10 }
    ],
    risk: { type: 'investigation', probability: 0.25 }
  },
  {
    id: 'bitcoin',
    name: 'Cryptovaluta',
    category: 'economia',
    subcategory: 'finanza',
    description: 'Introduci valuta digitale',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'technology', value: 25, duration: 10 },
      { type: 'immediate', target: 'investment', value: 20, duration: 5 },
      { type: 'delayed', target: 'regulation', value: -10, duration: 10 }
    ],
    requirements: { technology: 40 },
    risk: { type: 'crash', probability: 0.25 }
  },

  // RISORSE NATURALI (20 scelte)
  {
    id: 'oil_discovery',
    name: 'Scoperta Petrolio',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Trova giacimenti petroliferi',
    cost: { pa: 2, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'oil', value: 50, duration: 20 },
      { type: 'immediate', target: 'treasury', value: 30, duration: 5 }
    ],
    requirements: { technology: 20 },
    risk: { type: 'dry_well', probability: 0.3 }
  },
  {
    id: 'oil_rig',
    name: 'Pozzo Petrolio',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Estrai petrolio',
    cost: { pa: 2, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'oil', value: 40, duration: 15 },
      { type: 'delayed', target: 'environment', value: -20, duration: 10 }
    ],
    requirements: { oil: 30 },
    risk: { type: 'spill', probability: 0.1 }
  },
  {
    id: 'miniera',
    name: 'Miniera',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Estrai minerali',
    cost: { pa: 2, resources: { money: 55 } },
    effects: [
      { type: 'immediate', target: 'steel', value: 30, duration: 15 },
      { type: 'delayed', target: 'health', value: -15, duration: 10 }
    ],
    risk: { type: 'accident', probability: 0.15 }
  },
  {
    id: 'gas_naturale',
    name: 'Gas Naturale',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Estrai gas',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'energy', value: 35, duration: 15 },
      { type: 'delayed', target: 'environment', value: -10, duration: 10 }
    ],
    risk: { type: 'explosion', probability: 0.1 }
  },
  {
    id: 'carbone',
    name: 'Miniera di Carbone',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Estrai carbone',
    cost: { pa: 1, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'energy', value: 25, duration: 10 },
      { type: 'delayed', target: 'health', value: -20, duration: 10 },
      { type: 'delayed', target: 'pollution', value: 25, duration: 10 }
    ],
    risk: { type: 'accident', probability: 0.15 }
  },
  {
    id: 'uranio',
    name: 'Uranio',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Estrai uranio',
    cost: { pa: 3, resources: { money: 90 } },
    effects: [
      { type: 'immediate', target: 'nuclear', value: 50, duration: 20 },
      { type: 'delayed', target: 'radiation', value: 15, duration: 15 }
    ],
    requirements: { technology: 45 },
    risk: { type: 'meltdown', probability: 0.08 }
  },
  {
    id: 'diamanti',
    name: 'Miniera Diamanti',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Estrai diamanti',
    cost: { pa: 2, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'wealth', value: 50, duration: 15 },
      { type: 'delayed', target: 'reputation', value: 20, duration: 10 }
    ],
    risk: { type: 'war', probability: 0.2 }
  },
  {
    id: 'acqua',
    name: 'Dessalinizzazione',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Dissala acqua di mare',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'water', value: 40, duration: 15 },
      { type: 'delayed', target: 'environment', value: -10, duration: 10 }
    ],
    requirements: { technology: 30, coastline: true },
    risk: { type: 'energy_cost', probability: 0.1 }
  },
  {
    id: 'legname',
    name: 'Disboscamento',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Taglia alberi',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'wood', value: 30, duration: 5 },
      { type: 'delayed', target: 'environment', value: -25, duration: 10 },
      { type: 'delayed', target: 'erosion', value: 15, duration: 10 }
    ],
    risk: { type: 'deforestation', probability: 0.15 }
  },
  {
    id: 'pesca_eccesso',
    name: 'Pesca Eccessiva',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Sovrappesca',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'food', value: 20, duration: 3 },
      { type: 'delayed', target: 'ecosystem', value: -30, duration: 10 }
    ],
    risk: { type: 'collapse', probability: 0.25 }
  },
  {
    id: 'geotermico',
    name: 'Energia Geotermica',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Sfrutta calore terrestre',
    cost: { pa: 2, resources: { money: 65 } },
    effects: [
      { type: 'immediate', target: 'energy', value: 30, duration: 15 },
      { type: 'immediate', target: 'environment', value: 15, duration: 0 }
    ],
    requirements: { technology: 35 },
    risk: { type: 'eruption', probability: 0.05 }
  },
  {
    id: 'maree',
    name: 'Energia Mareale',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Sfrutta le maree',
    cost: { pa: 2, resources: { money: 55 } },
    effects: [
      { type: 'immediate', target: 'energy', value: 25, duration: 15 },
      { type: 'immediate', target: 'clean', value: 20, duration: 0 }
    ],
    requirements: { coastline: true },
    risk: { type: 'storm_damage', probability: 0.15 }
  },
  {
    id: 'geyser',
    name: 'Geyser',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Sfrutta geyser',
    cost: { pa: 1, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'tourism', value: 25, duration: 10 },
      { type: 'immediate', target: 'energy', value: 15, duration: 10 }
    ],
    risk: { type: 'scale', probability: 0.1 }
  },
  {
    id: 'litio',
    name: 'Litio',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Estrai litio per batterie',
    cost: { pa: 2, resources: { money: 65 } },
    effects: [
      { type: 'immediate', target: 'technology', value: 25, duration: 15 },
      { type: 'immediate', target: 'export', value: 20, duration: 5 }
    ],
    requirements: { technology: 25 },
    risk: { type: 'conflict', probability: 0.2 }
  },
  {
    id: 'rame',
    name: 'Rame',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Estrai rame',
    cost: { pa: 1, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'electronics', value: 30, duration: 10 },
      { type: 'immediate', target: 'export', value: 15, duration: 5 }
    ],
    risk: { type: 'price_fluctuation', probability: 0.15 }
  },
  {
    id: 'terra_rare',
    name: 'Terre Rare',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Estrai terre rare',
    cost: { pa: 3, resources: { money: 85 } },
    effects: [
      { type: 'immediate', target: 'technology', value: 35, duration: 15 },
      { type: 'immediate', target: 'monopoly', value: 20, duration: 10 }
    ],
    requirements: { technology: 40 },
    risk: { type: 'toxic_waste', probability: 0.15 }
  },
  {
    id: 'acqua_sotterranea',
    name: 'Falda Acquifera',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Sfrutta falde sotterranee',
    cost: { pa: 1, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'water', value: 30, duration: 10 },
      { type: 'delayed', target: 'depletion', value: 15, duration: 10 }
    ],
    risk: { type: 'drought', probability: 0.15 }
  },
  {
    id: 'metano_idrato',
    name: 'Idrato di Metano',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Estrai metano dai fondali',
    cost: { pa: 3, resources: { money: 100 } },
    effects: [
      { type: 'immediate', target: 'energy', value: 40, duration: 20 },
      { type: 'delayed', target: 'ocean_damage', value: 20, duration: 15 }
    ],
    requirements: { technology: 50, coastline: true },
    risk: { type: 'methane_release', probability: 0.15 }
  },
  {
    id: 'nucleare_avanzato',
    name: 'Nucleare di Nuova Gen',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Reattori avanzati',
    cost: { pa: 3, resources: { money: 140 } },
    effects: [
      { type: 'immediate', target: 'energy', value: 60, duration: 25 },
      { type: 'immediate', target: 'safety', value: 25, duration: 0 },
      { type: 'delayed', target: 'waste', value: -10, duration: 15 }
    ],
    requirements: { technology: 70 },
    risk: { type: 'meltdown', probability: 0.03 }
  },
  {
    id: 'fusione',
    name: 'Fusione Nucleare',
    category: 'economia',
    subcategory: 'risorse',
    description: 'Sviluppa fusione',
    cost: { pa: 3, resources: { money: 200 } },
    effects: [
      { type: 'immediate', target: 'energy', value: 100, duration: 30 },
      { type: 'immediate', target: 'tech', value: 50, duration: 20 },
      { type: 'delayed', target: 'oil_obsolete', value: 30, duration: 25 }
    ],
    requirements: { technology: 90 },
    risk: { type: 'fail', probability: 0.4 }
  },

  // LAVORO (10 scelte)
  {
    id: 'salario_minimo',
    name: 'Salario Minimo',
    category: 'economia',
    subcategory: 'lavoro',
    description: 'Introduci salario minimo',
    cost: { pa: 2, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'wages', value: 25, duration: 10 },
      { type: 'immediate', target: 'welfare', value: 15, duration: 0 },
      { type: 'delayed', target: 'unemployment', value: 10, duration: 8 }
    ],
    risk: { type: 'business_closure', probability: 0.15 }
  },
  {
    id: 'sindacati',
    name: 'Diritti Sindacali',
    category: 'economia',
    subcategory: 'lavoro',
    description: 'Permetti sindacati',
    cost: { pa: 1, resources: { money: 10 } },
    effects: [
      { type: 'immediate', target: 'workers_rights', value: 30, duration: 15 },
      { type: 'immediate', target: 'stability', value: 15, duration: 0 },
      { type: 'delayed', target: 'productivity', value: -10, duration: 10 }
    ],
    risk: { type: 'strike', probability: 0.1 }
  },
  {
    id: 'pensioni',
    name: 'Sistema Pensionistico',
    category: 'economia',
    subcategory: 'lavoro',
    description: 'Crea previdenza',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'welfare', value: 30, duration: 15 },
      { type: 'immediate', target: 'stability', value: 20, duration: 0 },
      { type: 'delayed', target: 'debt', value: 20, duration: 15 }
    ],
    risk: { type: 'bankruptcy', probability: 0.15 }
  },
  {
    id: 'disoccupazione',
    name: 'Sussidio Disoccupazione',
    category: 'economia',
    subcategory: 'lavoro',
    description: 'Aiuta disoccupati',
    cost: { pa: 1, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'welfare', value: 25, duration: 10 },
      { type: 'immediate', target: 'stability', value: 15, duration: 0 },
      { type: 'delayed', target: 'budget', value: -20, duration: 10 }
    ],
    risk: { type: 'fraud', probability: 0.15 }
  },
  {
    id: 'lavoro_minori',
    name: 'Divieto Lavoro Minori',
    category: 'economia',
    subcategory: 'lavoro',
    description: 'Vieta lavoro ai minori',
    cost: { pa: 1, resources: { money: 10 } },
    effects: [
      { type: 'immediate', target: 'rights', value: 25, duration: 15 },
      { type: 'delayed', target: 'education', value: 20, duration: 10 }
    ],
    risk: { type: 'informal_economy', probability: 0.1 }
  },
  {
    id: 'ora_lavoro',
    name: 'Limite Ore Lavoro',
    category: 'economia',
    subcategory: 'lavoro',
    description: 'Limita orario lavoro',
    cost: { pa: 1, resources: { money: 5 } },
    effects: [
      { type: 'immediate', target: 'health', value: 20, duration: 10 },
      { type: 'delayed', target: 'productivity', value: -10, duration: 10 }
    ],
    risk: { type: 'evasion', probability: 0.1 }
  },
  {
    id: 'maternita',
    name: 'Congedo Maternità',
    category: 'economia',
    subcategory: 'lavoro',
    description: 'Congedo pagato madri',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'population', value: 15, duration: 10 },
      { type: 'immediate', target: 'rights', value: 20, duration: 0 }
    ],
    risk: { type: 'discrimination', probability: 0.1 }
  },
  {
    id: 'immigrati',
    name: 'Lavoro Immigrati',
    category: 'economia',
    subcategory: 'lavoro',
    description: 'Permetti migranti',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'workers', value: 30, duration: 5 },
      { type: 'delayed', target: 'culture', value: -10, duration: 10 }
    ],
    risk: { type: 'xenophobia', probability: 0.15 }
  },
  {
    id: 'telelavoro',
    name: 'Smart Working',
    category: 'economia',
    subcategory: 'lavoro',
    description: 'Introduci telelavoro',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'productivity', value: 15, duration: 10 },
      { type: 'immediate', target: 'environment', value: 15, duration: 0 },
      { type: 'delayed', target: 'real_estate', value: -10, duration: 10 }
    ],
    requirements: { technology: 20 },
    risk: { type: 'productivity_drop', probability: 0.1 }
  },
  {
    id: 'robot_lavoro',
    name: 'Robot nel Lavoro',
    category: 'economia',
    subcategory: 'lavoro',
    description: 'Sostituisci umani con robot',
    cost: { pa: 2, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'efficiency', value: 40, duration: 15 },
      { type: 'delayed', target: 'unemployment', value: 30, duration: 10 }
    ],
    requirements: { technology: 50 },
    risk: { type: 'rebellion', probability: 0.2 }
  }
];

export type { Choice };
import { Choice } from '../../types';

export const TECHNOLOGY_CHOICES: Choice[] = [
  // RICERCA (30 scelte)
  {
    id: 'ricerca_base',
    name: 'Laboratorio di Ricerca',
    category: 'tecnologia',
    subcategory: 'ricerca',
    description: 'Costruisci laboratorio base',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'research_capacity', value: 35, duration: 30 },
      { type: 'immediate', target: 'innovation_base', value: 25, duration: 0 }
    ],
    requirements: { gdp: 50 },
    unlocks: ['research_lab'],
    risk: { type: 'brain_drain', probability: 0.1 }
  },
  {
    id: 'ricerca_universitaria',
    name: 'Università',
    category: 'tecnologia',
    subcategory: 'ricerca',
    description: 'Crea università',
    cost: { pa: 2, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'university_research', value: 40, duration: 30 },
      { type: 'immediate', target: 'education', value: 25, duration: 0 },
      { type: 'delayed', target: 'talent_pool', value: 25, duration: 20 }
    ],
    unlocks: ['university'],
    risk: { type: 'cost', probability: 0.1 }
  },
  {
    id: 'ricerca_pubblica',
    name: 'Ente di Ricerca Pubblico',
    category: 'tecnologia',
    subcategory: 'ricerca',
    description: 'Istituto statale',
    cost: { pa: 2, resources: { money: 55 } },
    effects: [
      { type: 'immediate', target: 'public_research', value: 35, duration: 25 },
      { type: 'immediate', target: 'basic_science', value: 30, duration: 0 }
    ],
    requirements: { gdp: 70 },
    unlocks: ['research_institute'],
    risk: { type: 'bureaucracy', probability: 0.1 }
  },
  {
    id: 'ricerca_segreta',
    name: 'Programma Segreto',
    category: 'tecnologia',
    subcategory: 'ricerca',
    description: 'Ricerca nascosta',
    cost: { pa: 2, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'secret_research', value: 40, duration: 20 },
      { type: 'delayed', target: 'breakthrough', value: 30, duration: 15 }
    ],
    requirements: { intelligence: 25 },
    unlocks: ['black_research'],
    risk: { type: 'exposure', probability: 0.25 }
  },
  {
    id: 'ricerca_collaborativa',
    name: 'Consorzio di Ricerca',
    category: 'tecnologia',
    subcategory: 'ricerca',
    description: 'Collaborazione pubblico-privato',
    cost: { pa: 2, resources: { money: 65 } },
    effects: [
      { type: 'immediate', target: 'collaborative_research', value: 35, duration: 25 },
      { type: 'immediate', target: 'industry_academia', value: 30, duration: 0 }
    ],
    requirements: { technology: 25 },
    unlocks: ['research_consortium'],
    risk: { type: 'intellectual_property_dispute', probability: 0.15 }
  },
  {
    id: 'ricerca_open',
    name: 'Open Source Research',
    category: 'tecnologia',
    subcategory: 'ricerca',
    description: 'Condividi scoperte',
    cost: { pa: 1, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'open_source', value: 30, duration: 20 },
      { type: 'immediate', target: 'global_collaboration', value: 25, duration: 0 },
      { type: 'delayed', target: 'rapid_progress', value: 25, duration: 15 }
    ],
    requirements: { technology: 30 },
    risk: { type: 'lost_advantage', probability: 0.15 }
  },
  {
    id: 'ricerca_brain',
    name: 'Recluta Scienziati',
    category: 'tecnologia',
    subcategory: 'ricerca',
    description: 'Importa cervelli',
    cost: { pa: 2, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'imported_expertise', value: 40, duration: 15 },
      { type: 'immediate', target: 'research_speed', value: 30, duration: 0 }
    ],
    requirements: { technology: 30, money: 50 },
    risk: { type: 'expense', probability: 0.1 }
  },
  {
    id: 'ricerca_premio',
    name: 'Premi per Innovazione',
    category: 'tecnologia',
    subcategory: 'ricerca',
    description: 'Incentivi scoperte',
    cost: { pa: 1, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'incentive', value: 30, duration: 20 },
      { type: 'immediate', target: 'innovation_rate', value: 25, duration: 0 }
    ],
    requirements: { gdp: 60 },
    risk: { type: 'fraud', probability: 0.15 }
  },
  {
    id: 'ricerca_crowdsource',
    name: 'Citizen Science',
    category: 'tecnologia',
    subcategory: 'ricerca',
    description: 'Cittadini ricercatori',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'crowd_research', value: 25, duration: 15 },
      { type: 'immediate', target: 'public_engagement', value: 20, duration: 0 }
    ],
    requirements: { technology: 15 },
    risk: { type: 'quality', probability: 0.15 }
  },
  {
    id: 'ricerca_leading',
    name: 'Diventa Leader Mondiale',
    category: 'tecnologia',
    subcategory: 'ricerca',
    description: 'Guidi la scienza globale',
    cost: { pa: 3, resources: { money: 150 } },
    effects: [
      { type: 'immediate', target: 'global_leadership', value: 50, duration: 40 },
      { type: 'immediate', target: 'attract_talent', value: 40, duration: 0 }
    ],
    requirements: { technology: 60, research: 50 },
    risk: { type: 'competition', probability: 0.2 }
  },

  // INNOVAZIONE (20 scelte)
  {
    id: 'innovazione_patent',
    name: 'Ufficio Brevetti',
    category: 'tecnologia',
    subcategory: 'innovazione',
    description: 'Protegge invenzioni',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'patent_system', value: 35, duration: 30 },
      { type: 'immediate', target: 'innovation_protection', value: 30, duration: 0 }
    ],
    requirements: { technology: 25 },
    unlocks: ['patent_office'],
    risk: { type: 'monopoly', probability: 0.1 }
  },
  {
    id: 'innovazione_startup',
    name: 'Incubatore Startup',
    category: 'tecnologia',
    subcategory: 'innovazione',
    description: 'Supporta startup',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'startup_incubator', value: 35, duration: 25 },
      { type: 'immediate', target: 'entrepreneurship', value: 25, duration: 0 }
    ],
    unlocks: ['startup_ecosystem'],
    risk: { type: 'bubble', probability: 0.15 }
  },
  {
    id: 'innovazione_techpark',
    name: 'Parco Tecnologico',
    category: 'tecnologia',
    subcategory: 'innovazione',
    description: 'Area dedicata tech',
    cost: { pa: 2, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'tech_park', value: 35, duration: 30 },
      { type: 'immediate', target: 'cluster_effect', value: 30, duration: 0 }
    ],
    requirements: { technology: 35 },
    unlocks: ['tech_park'],
    risk: { type: 'cost_overrun', probability: 0.1 }
  },
  {
    id: 'innovazione_venture',
    name: 'Venture Capital',
    category: 'tecnologia',
    subcategory: 'innovazione',
    description: ' Finanziamenti rischio',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'vc_funding', value: 35, duration: 20 },
      { type: 'immediate', target: 'risk_capital', value: 30, duration: 0 }
    ],
    requirements: { gdp: 80 },
    unlocks: ['venture_capital'],
    risk: { type: 'bubble', probability: 0.2 }
  },
  {
    id: 'innovazione_accelerator',
    name: 'Acceleratore',
    category: 'tecnologia',
    subcategory: 'innovazione',
    description: 'Crescita veloce',
    cost: { pa: 2, resources: { money: 55 } },
    effects: [
      { type: 'immediate', target: 'accelerator_program', value: 35, duration: 20 },
      { type: 'immediate', target: 'scale_up', value: 25, duration: 0 }
    ],
    requirements: { technology: 30 },
    risk: { type: 'failure', probability: 0.15 }
  },
  {
    id: 'innovazione_pilota',
    name: 'Projects Pilota',
    category: 'tecnologia',
    subcategory: 'innovazione',
    description: 'Test nuove tech',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'pilot_projects', value: 30, duration: 15 },
      { type: 'delayed', target: 'breakthrough_potential', value: 25, duration: 15 }
    ],
    requirements: { technology: 20 },
    risk: { type: 'failure', probability: 0.25 }
  },
  {
    id: 'innovazione_hackathon',
    name: 'Hackathon',
    category: 'tecnologia',
    subcategory: 'innovazione',
    description: 'Maratona coders',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'hackathon', value: 25, duration: 10 },
      { type: 'immediate', target: 'rapid_prototyping', value: 20, duration: 0 }
    ],
    requirements: { technology: 20 },
    risk: { type: 'low_output', probability: 0.1 }
  },
  {
    id: 'innovazione_coworking',
    name: 'Coworking Space',
    category: 'tecnologia',
    subcategory: 'innovazione',
    description: 'Spazio condiviso',
    cost: { pa: 1, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'coworking', value: 25, duration: 15 },
      { type: 'immediate', target: 'collaboration', value: 20, duration: 0 }
    ],
    risk: { type: 'distraction', probability: 0.1 }
  },
  {
    id: 'innovazione_acquisition',
    name: 'Acquire Startup',
    category: 'tecnologia',
    subcategory: 'innovazione',
    description: 'Compra innovazione',
    cost: { pa: 2, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'acquisition', value: 40, duration: 10 },
      { type: 'delayed', target: 'integration', value: 25, duration: 15 }
    ],
    requirements: { money: 70 },
    risk: { type: 'overpay', probability: 0.15 }
  },
  {
    id: 'innovazione_disruptive',
    name: 'Disruptive Innovation',
    category: 'tecnologia',
    subcategory: 'innovazione',
    description: 'Cambia paradigma',
    cost: { pa: 3, resources: { money: 120 } },
    effects: [
      { type: 'immediate', target: 'disruption', value: 50, duration: 25 },
      { type: 'immediate', target: 'new_market', value: 35, duration: 0 }
    ],
    requirements: { technology: 60 },
    risk: { type: 'resistance', probability: 0.25 }
  },

  // INDUSTRIALIZZAZIONE (15 scelte)
  {
    id: 'industria_1',
    name: 'Industrializzazione Base',
    category: 'tecnologia',
    subcategory: 'industrializzazione',
    description: 'Trasforma in potenza industriale',
    cost: { pa: 3, resources: { money: 100 } },
    effects: [
      { type: 'immediate', target: 'industrialization', value: 45, duration: 30 },
      { type: 'immediate', target: 'manufacturing', value: 35, duration: 0 }
    ],
    requirements: { gdp: 80 },
    risk: { type: 'environmental_damage', probability: 0.2 }
  },
  {
    id: 'industria_2',
    name: 'Automazione',
    category: 'tecnologia',
    subcategory: 'industrializzazione',
    description: 'Fabbriche automatiche',
    cost: { pa: 3, resources: { money: 120 } },
    effects: [
      { type: 'immediate', target: 'automation', value: 45, duration: 30 },
      { type: 'immediate', target: 'efficiency', value: 35, duration: 0 }
    ],
    requirements: { technology: 50 },
    risk: { type: 'unemployment', probability: 0.25 }
  },
  {
    id: 'industria_3',
    name: 'Catena Fornitura',
    category: 'tecnologia',
    subcategory: 'industrializzazione',
    description: 'Supply chain',
    cost: { pa: 2, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'supply_chain', value: 40, duration: 25 },
      { type: 'immediate', target: 'efficiency', value: 30, duration: 0 }
    ],
    requirements: { technology: 30 },
    risk: { type: 'disruption', probability: 0.15 }
  },
  {
    id: 'industria_4',
    name: 'Lean Manufacturing',
    category: 'tecnologia',
    subcategory: 'industrializzazione',
    description: 'Produzione snella',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'lean', value: 35, duration: 25 },
      { type: 'immediate', target: 'waste_reduction', value: 30, duration: 0 }
    ],
    requirements: { technology: 35 },
    risk: { type: 'quality_issues', probability: 0.1 }
  },
  {
    id: 'industria_5',
    name: 'Just-in-Time',
    category: 'tecnologia',
    subcategory: 'industrializzazione',
    description: 'Consegna immediata',
    cost: { pa: 2, resources: { money: 65 } },
    effects: [
      { type: 'immediate', target: 'jit', value: 35, duration: 20 },
      { type: 'immediate', target: 'inventory_reduction', value: 30, duration: 0 }
    ],
    requirements: { technology: 40 },
    risk: { type: 'supply_shock', probability: 0.2 }
  },
  {
    id: 'industria_6',
    name: '3D Printing',
    category: 'tecnologia',
    subcategory: 'industrializzazione',
    description: 'Stampa 3D',
    cost: { pa: 2, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'additive_manufacturing', value: 40, duration: 25 },
      { type: 'immediate', target: 'customization', value: 30, duration: 0 }
    ],
    requirements: { technology: 45 },
    risk: { type: 'ip_theft', probability: 0.15 }
  },
  {
    id: 'industria_7',
    name: 'Industrial Internet',
    category: 'tecnologia',
    subcategory: 'industrializzazione',
    description: 'IoT industriale',
    cost: { pa: 3, resources: { money: 90 } },
    effects: [
      { type: 'immediate', target: 'iiot', value: 45, duration: 30 },
      { type: 'immediate', target: 'real_time', value: 35, duration: 0 }
    ],
    requirements: { technology: 55 },
    risk: { type: 'cyber_attack', probability: 0.2 }
  },
  {
    id: 'industria_8',
    name: 'Robotica Avanzata',
    category: 'tecnologia',
    subcategory: 'industrializzazione',
    description: 'Robot柔性',
    cost: { pa: 3, resources: { money: 130 } },
    effects: [
      { type: 'immediate', target: 'advanced_robotics', value: 50, duration: 30 },
      { type: 'immediate', target: 'flexibility', value: 35, duration: 0 }
    ],
    requirements: { technology: 60 },
    risk: { type: 'malfunction', probability: 0.15 }
  },
  {
    id: 'industria_9',
    name: 'Nanotecnologia',
    category: 'tecnologia',
    subcategory: 'industrializzazione',
    description: 'Produzione molecolare',
    cost: { pa: 3, resources: { money: 150 } },
    effects: [
      { type: 'immediate', target: 'nanotech', value: 55, duration: 40 },
      { type: 'immediate', target: 'precision', value: 40, duration: 0 }
    ],
    requirements: { technology: 75 },
    risk: { type: 'unknown_risks', probability: 0.3 }
  },
  {
    id: 'industria_10',
    name: 'Biotech Produzione',
    category: 'tecnologia',
    subcategory: 'industrializzazione',
    description: 'Biofabbriche',
    cost: { pa: 3, resources: { money: 110 } },
    effects: [
      { type: 'immediate', target: 'biotech_manufacturing', value: 45, duration: 30 },
      { type: 'immediate', target: 'sustainability', value: 35, duration: 0 }
    ],
    requirements: { technology: 55 },
    risk: { type: 'biosafety', probability: 0.2 }
  },
  {
    id: 'industria_11',
    name: 'Green Manufacturing',
    category: 'tecnologia',
    subcategory: 'industrializzazione',
    description: 'Produzione sostenibile',
    cost: { pa: 2, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'green_industry', value: 40, duration: 30 },
      { type: 'immediate', target: 'environment', value: 30, duration: 0 },
      { type: 'delayed', target: 'cost_savings', value: 20, duration: 20 }
    ],
    requirements: { technology: 40 },
    risk: { type: 'lower_efficiency', probability: 0.15 }
  },
  {
    id: 'industria_12',
   _name: 'Additive Manufacturing',
    category: 'tecnologia',
    subcategory: 'industrializzazione',
    description: 'Produzione additiva',
    cost: { pa: 2, resources: { money: 75 } },
    effects: [
      { type: 'immediate', target: 'additive', value: 35, duration: 25 },
      { type: 'immediate', target: 'waste_reduction', value: 30, duration: 0 }
    ],
    requirements: { technology: 45 },
    risk: { type: 'quality_control', probability: 0.15 }
  },
  {
    id: 'industria_13',
    name: 'Smart Factory',
    category: 'tecnologia',
    subcategory: 'industrializzazione',
    description: 'Fabbrica intelligente',
    cost: { pa: 3, resources: { money: 140 } },
    effects: [
      { type: 'immediate', target: 'smart_factory', value: 55, duration: 40 },
      { type: 'immediate', target: 'ai_integration', value: 40, duration: 0 }
    ],
    requirements: { technology: 70 },
    risk: { type: 'system_failure', probability: 0.2 }
  },
  {
    id: 'industria_14',
    name: 'Circular Economy',
    category: 'tecnologia',
    subcategory: 'industrializzazione',
    description: 'Economia circolare',
    cost: { pa: 2, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'circular_economy', value: 40, duration: 30 },
      { type: 'immediate', target: 'resource_efficiency', value: 35, duration: 0 }
    ],
    requirements: { technology: 40 },
    risk: { type: 'consumer_adoption', probability: 0.15 }
  },

  // SPAZIO (25 scelte)
  {
    id: 'spazio_1',
    name: 'Agenzia Spaziale',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Crea agenzia',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'space_agency', value: 40, duration: 40 },
      { type: 'immediate', target: 'coordination', value: 30, duration: 0 }
    ],
    requirements: { gdp: 60 },
    unlocks: ['space_agency'],
    risk: { type: 'budget_overrun', probability: 0.15 }
  },
  {
    id: 'spazio_2',
    name: 'Lanciatore Lite',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Primo razzo',
    cost: { pa: 2, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'basic_launcher', value: 35, duration: 30 },
      { type: 'immediate', target: 'orbital_access', value: 25, duration: 0 }
    ],
    requirements: { technology: 25 },
    unlocks: ['launch_capability'],
    risk: { type: 'launch_failure', probability: 0.3 }
  },
  {
    id: 'spazio_3',
    name: 'Satellite Comunicazioni',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Satelliti per telecom',
    cost: { pa: 2, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'comm_satellites', value: 40, duration: 30 },
      { type: 'immediate', target: 'global_communication', value: 30, duration: 0 }
    ],
    requirements: { launch_capability: 1 },
    unlocks: ['comm_satellites'],
    risk: { type: 'debris', probability: 0.15 }
  },
  {
    id: 'spazio_4',
    name: 'Satellite Osservazione',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Ricognizione orbitale',
    cost: { pa: 2, resources: { money: 85 } },
    effects: [
      { type: 'immediate', target: 'observation_satellites', value: 40, duration: 30 },
      { type: 'immediate', target: 'surveillance', value: 30, duration: 0 }
    ],
    requirements: { comm_satellites: 1 },
    risk: { type: 'anti_satellite', probability: 0.15 }
  },
  {
    id: 'spazio_5',
    name: 'Stazione Spaziale',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Orbita abitata',
    cost: { pa: 3, resources: { money: 150 } },
    effects: [
      { type: 'immediate', target: 'space_station', value: 50, duration: 40 },
      { type: 'immediate', target: 'human_presence', value: 35, duration: 0 }
    ],
    requirements: { technology: 50, launch_capability: 2 },
    unlocks: ['orbital_station'],
    risk: { type: 'life_support_failure', probability: 0.2 }
  },
  {
    id: 'spazio_6',
    name: 'Razzo Pesante',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Trasporto heavy',
    cost: { pa: 3, resources: { money: 130 } },
    effects: [
      { type: 'immediate', target: 'heavy_lift', value: 45, duration: 40 },
      { type: 'immediate', target: 'payload_capacity', value: 35, duration: 0 }
    ],
    requirements: { launch_capability: 2 },
    unlocks: ['heavy_lift'],
    risk: { type: 'cost_overrun', probability: 0.2 }
  },
  {
    id: 'spazio_7',
    name: 'Esplorazione Lunare',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Missione Luna',
    cost: { pa: 3, resources: { money: 180 } },
    effects: [
      { type: 'immediate', target: 'lunar_mission', value: 50, duration: 30 },
      { type: 'immediate', target: 'exploration', value: 35, duration: 0 }
    ],
    requirements: { space_station: 1 },
    unlocks: ['lunar_program'],
    risk: { type: 'mission_failure', probability: 0.35 }
  },
  {
    id: 'spazio_8',
    name: 'Base Lunare',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Permanenza Luna',
    cost: { pa: 3, resources: { money: 250 } },
    effects: [
      { type: 'immediate', target: 'lunar_base', value: 60, duration: 50 },
      { type: 'immediate', target: 'permanent_presence', value: 40, duration: 0 }
    ],
    requirements: { lunar_program: 1, technology: 70 },
    unlocks: ['lunar_colony'],
    risk: { type: 'radiation', probability: 0.25 }
  },
  {
    id: 'spazio_9',
    name: 'Marte',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Missione Marziana',
    cost: { pa: 3, resources: { money: 300 } },
    effects: [
      { type: 'immediate', target: 'mars_mission', value: 70, duration: 40 },
      { type: 'immediate', target: 'deep_space', value: 50, duration: 0 }
    ],
    requirements: { lunar_base: 1, technology: 80 },
    unlocks: ['mars_program'],
    risk: { type: 'radiation_isolation', probability: 0.5 }
  },
  {
    id: 'spazio_10',
    name: 'Colonizzazione Marziana',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Colonia su Marte',
    cost: { pa: 3, resources: { money: 400 } },
    effects: [
      { type: 'immediate', target: 'mars_colony', value: 80, duration: 60 },
      { type: 'immediate', target: 'multi_planetary', value: 60, duration: 0 }
    ],
    requirements: { mars_program: 1, technology: 90 },
    risk: { type: 'unknown_environment', probability: 0.6 }
  },
  {
    id: 'spazio_11',
    name: 'Tecnologia Razzo',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Migliora propulsione',
    cost: { pa: 2, resources: { money: 90 } },
    effects: [
      { type: 'immediate', target: 'propulsion_upgrade', value: 40, duration: 30 },
      { type: 'immediate', target: 'fuel_efficiency', value: 30, duration: 0 }
    ],
    requirements: { technology: 45 },
    risk: { type: 'cost', probability: 0.1 }
  },
  {
    id: 'spazio_12',
    name: 'Razzo Riutilizzabile',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Razzo riutilizzabile',
    cost: { pa: 3, resources: { money: 120 } },
    effects: [
      { type: 'immediate', target: 'reusability', value: 50, duration: 40 },
      { type: 'immediate', target: 'cost_reduction', value: 40, duration: 0 }
    ],
    requirements: { technology: 55 },
    unlocks: ['reusable_rocket'],
    risk: { type: 'landing_failure', probability: 0.25 }
  },
  {
    id: 'spazio_13',
    name: 'Satellite Navigazione',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'GPS globale',
    cost: { pa: 2, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'navigation_satellites', value: 40, duration: 40 },
      { type: 'immediate', target: 'positioning', value: 35, duration: 0 }
    ],
    requirements: { comm_satellites: 1 },
    unlocks: ['gps'],
    risk: { type: 'signal_loss', probability: 0.1 }
  },
  {
    id: 'spazio_14',
    name: 'Telescopio Spaziale',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Osservatorio orbitale',
    cost: { pa: 2, resources: { money: 100 } },
    effects: [
      { type: 'immediate', target: 'space_telescope', value: 45, duration: 50 },
      { type: 'immediate', target: 'astronomy', value: 35, duration: 0 }
    ],
    requirements: { launch_capability: 2 },
    unlocks: ['orbital_observatory'],
    risk: { type: 'mirror_damage', probability: 0.15 }
  },
  {
    id: 'spazio_15',
    name: 'Mining Asteroidi',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Estrai da asteroidi',
    cost: { pa: 3, resources: { money: 200 } },
    effects: [
      { type: 'immediate', target: 'asteroid_mining', value: 55, duration: 40 },
      { type: 'immediate', target: 'rare_resources', value: 40, duration: 0 }
    ],
    requirements: { technology: 70, mars_program: 1 },
    unlocks: ['space_mining'],
    risk: { type: 'technical_challenge', probability: 0.4 }
  },
  {
    id: 'spazio_16',
    name: 'Stazione Lunare Commerciale',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Hotel lunare',
    cost: { pa: 3, resources: { money: 350 } },
    effects: [
      { type: 'immediate', target: 'space_tourism', value: 50, duration: 30 },
      { type: 'immediate', target: 'tourism_revenue', value: 40, duration: 0 }
    ],
    requirements: { lunar_base: 1 },
    risk: { type: 'accident', probability: 0.35 }
  },
  {
    id: 'spazio_17',
    name: 'Difesa Asteroidi',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Difesa planetaria',
    cost: { pa: 3, resources: { money: 180 } },
    effects: [
      { type: 'immediate', target: 'planetary_defense', value: 50, duration: 50 },
      { type: 'immediate', target: 'early_warning', value: 40, duration: 0 }
    ],
    requirements: { technology: 65 },
    unlocks: ['asteroid_defense'],
    risk: { type: 'false_alarm', probability: 0.2 }
  },
  {
    id: 'spazio_18',
    name: 'Energia Solare Spaziale',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Pannelli orbitali',
    cost: { pa: 3, resources: { money: 200 } },
    effects: [
      { type: 'immediate', target: 'space_solar', value: 55, duration: 50 },
      { type: 'immediate', target: 'clean_energy', value: 40, duration: 0 }
    ],
    requirements: { technology: 65 },
    unlocks: ['space_solar_power'],
    risk: { type: 'construction_difficulty', probability: 0.3 }
  },
  {
    id: 'spazio_19',
    name: 'Generator',
    name: 'Generatore Terra',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Terraforming',
    cost: { pa: 3, resources: { money: 500 } },
    effects: [
      { type: 'immediate', target: 'terraforming_start', value: 60, duration: 60 },
      { type: 'immediate', target: 'atmosphere', value: 40, duration: 0 }
    ],
    requirements: { mars_colony: 1, technology: 95 },
    risk: { type: 'centuries', probability: 0.8 }
  },
  {
    id: 'spazio_20',
    name: 'Propulsione EmDrive',
    category: 'tecnologia',
    subcategory: 'spazio',
    description: 'Motore rivoluzionario',
    cost: { pa: 3, resources: { money: 140 } },
    effects: [
      { type: 'immediate', target: 'revolutionary_propulsion', value: 60, duration: 50 },
      { type: 'immediate', target: 'fast_travel', value: 45, duration: 0 }
    ],
    requirements: { technology: 80 },
    risk: { type: 'physics_not_working', probability: 0.6 }
  },

  // ENERGIA (15 scelte)
  {
    id: 'energia_nucleare_1',
    name: 'Nucleare standard',
    category: 'tecnologia',
    subcategory: 'energia',
    description: 'Centrale nucleare',
    cost: { pa: 3, resources: { money: 120 } },
    effects: [
      { type: 'immediate', target: 'nuclear_energy', value: 50, duration: 40 },
      { type: 'immediate', target: 'base_load', value: 40, duration: 0 }
    ],
    requirements: { technology: 50 },
    risk: { type: 'meltdown', probability: 0.08 }
  },
  {
    id: 'energia_nucleare_2',
    name: 'Nucleare Sicuro',
    category: 'tecnologia',
    subcategory: 'energia',
    description: 'Reattori avanzati',
    cost: { pa: 3, resources: { money: 160 } },
    effects: [
      { type: 'immediate', target: 'safe_nuclear', value: 55, duration: 50 },
      { type: 'immediate', target: 'meltdown_proof', value: 45, duration: 0 }
    ],
    requirements: { technology: 65 },
    risk: { type: 'cost', probability: 0.15 }
  },
  {
    id: 'energia_fusione',
    name: 'Fusione',
    category: 'tecnologia',
    subcategory: 'energia',
    description: 'Stelle in contenitore',
    cost: { pa: 3, resources: { money: 250 } },
    effects: [
      { type: 'immediate', target: 'fusion_energy', value: 80, duration: 60 },
      { type: 'immediate', target: 'unlimited_power', value: 60, duration: 0 }
    ],
    requirements: { technology: 90 },
    risk: { type: 'not_working', probability: 0.7 }
  },
  {
    id: 'energia_solare_1',
    name: 'Solare Fotovoltaico',
    category: 'tecnologia',
    subcategory: 'energia',
    description: 'Pannelli solari',
    cost: { pa: 2, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'solar_power', value: 40, duration: 40 },
      { type: 'immediate', target: 'renewable', value: 30, duration: 0 }
    ],
    requirements: { technology: 35 },
    risk: { type: 'efficiency', probability: 0.1 }
  },
  {
    id: 'energia_eolica_1',
    name: 'Eolico',
    category: 'tecnologia',
    subcategory: 'energia',
    description: 'Mulini a vento',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'wind_power', value: 35, duration: 30 },
      { type: 'immediate', target: 'renewable', value: 30, duration: 0 }
    ],
    requirements: { technology: 25 },
    risk: { type: 'wind_patterns', probability: 0.1 }
  },
  {
    id: 'energia_idroelettrica',
    name: 'Idroelettrico',
    category: 'tecnologia',
    subcategory: 'energia',
    description: 'Dighe e turbine',
    cost: { pa: 2, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'hydro_power', value: 40, duration: 40 },
      { type: 'immediate', target: 'storage', value: 30, duration: 0 }
    ],
    requirements: { territory: 20 },
    risk: { type: 'drought', probability: 0.15 }
  },
  {
    id: 'energia_geotermica',
    name: 'Geotermico',
    category: 'tecnologia',
    subcategory: 'energia',
    description: 'Calore terrestre',
    cost: { pa: 2, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'geothermal_energy', value: 40, duration: 40 },
      { type: 'immediate', target: 'constant_power', value: 30, duration: 0 }
    ],
    requirements: { technology: 40 },
    risk: { type: 'depletion', probability: 0.1 }
  },
  {
    id: 'energia_mareale',
    name: 'Energia Mareale',
    category: 'tecnologia',
    subcategory: 'energia',
    description: 'Correnti marine',
    cost: { pa: 2, resources: { money: 75 } },
    effects: [
      { type: 'immediate', target: 'tidal_energy', value: 40, duration: 40 },
      { type: 'immediate', target: 'predictable', value: 30, duration: 0 }
    ],
    requirements: { coastline: true, technology: 35 },
    risk: { type: 'storm_damage', probability: 0.15 }
  },
  {
    id: 'energia_biomasse',
    name: 'Biomassa',
    category: 'tecnologia',
    subcategory: 'energia',
    description: 'Vegetazione',
    cost: { pa: 1, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'biomass_energy', value: 30, duration: 30 },
      { type: 'immediate', target: 'biofuel', value: 25, duration: 0 }
    ],
    risk: { type: 'land_use', probability: 0.1 }
  },
  {
    id: 'energia_idrogeno',
    name: 'Idrogeno Verde',
    category: 'tecnologia',
    subcategory: 'energia',
    description: 'Idrogeno pulito',
    cost: { pa: 2, resources: { money: 90 } },
    effects: [
      { type: 'immediate', target: 'hydrogen_economy', value: 45, duration: 40 },
      { type: 'immediate', target: 'storage', value: 35, duration: 0 }
    ],
    requirements: { technology: 50 },
    risk: { type: 'infrastructure', probability: 0.2 }
  },
  {
    id: 'energia_smart_grid',
    name: 'Smart Grid',
    category: 'tecnologia',
    subcategory: 'energia',
    description: 'Rete intelligente',
    cost: { pa: 2, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'smart_grid', value: 45, duration: 40 },
      { type: 'immediate', target: 'distribution_efficiency', value: 35, duration: 0 }
    ],
    requirements: { technology: 45 },
    risk: { type: 'hacking', probability: 0.15 }
  },
  {
    id: 'energia_accumulo',
    name: 'Batterie Giganti',
    category: 'tecnologia',
    subcategory: 'energia',
    description: 'Storage su scala',
    cost: { pa: 2, resources: { money: 100 } },
    effects: [
      { type: 'immediate', target: 'battery_storage', value: 50, duration: 50 },
      { type: 'immediate', target: 'grid_stability', value: 40, duration: 0 }
    ],
    requirements: { technology: 55 },
    risk: { type: 'fire', probability: 0.15 }
  },
  {
    id: 'energia_fredda',
    name: 'Fusione Fredda',
    category: 'tecnologia',
    subcategory: 'energia',
    description: 'Cold fusion',
    cost: { pa: 3, resources: { money: 180 } },
    effects: [
      { type: 'immediate', target: 'cold_fusion', value: 70, duration: 60 },
      { type: 'immediate', target: 'breakthrough', value: 50, duration: 0 }
    ],
    requirements: { technology: 80 },
    risk: { type: 'not_replicable', probability: 0.8 }
  }
];

export type { Choice };
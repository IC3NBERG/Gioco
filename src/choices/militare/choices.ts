import { Choice } from '../../types';

export const MILITARY_CHOICES: Choice[] = [
  // FORZE ARMATE (20 scelte)
  {
    id: 'reclutamento',
    name: 'Reclutamento di Massa',
    category: 'militare',
    subcategory: 'forze_armate',
    description: 'Arruola più soldati possibili',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'army_size', value: 30, duration: 5 },
      { type: 'delayed', target: 'food_demand', value: 15, duration: 8 }
    ],
    unlocks: ['conscription'],
    risk: { type: 'desertion', probability: 0.15 }
  },
  {
    id: 'esercito_professionista',
    name: 'Esercito Professionista',
    category: 'militare',
    subcategory: 'forze_armate',
    description: 'Solo volontari esperti',
    cost: { pa: 2, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'quality', value: 30, duration: 15 },
      { type: 'immediate', target: 'morale', value: 20, duration: 0 },
      { type: 'delayed', target: 'flexibility', value: -10, duration: 10 }
    ],
    requirements: { gdp: 150 },
    risk: { type: 'cost_overrun', probability: 0.1 }
  },
  {
    id: 'paramilitari',
    name: 'Forze Paramilitari',
    category: 'militare',
    subcategory: 'forze_armate',
    description: 'Milizie e guardie',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'paramilitary', value: 25, duration: 8 },
      { type: 'delayed', target: 'instability', value: 15, duration: 10 }
    ],
    unlocks: ['militia'],
    risk: { type: 'coup', probability: 0.15 }
  },
  {
    id: 'guardia_reale',
    name: 'Guardia Reale',
    category: 'militare',
    subcategory: 'forze_armate',
    description: 'Elite guarding the leader',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'elite_defense', value: 35, duration: 15 },
      { type: 'immediate', target: 'prestige', value: 15, duration: 0 },
      { type: 'delayed', target: 'loyalty', value: 10, duration: 10 }
    ],
    risk: { type: 'assassination', probability: 0.1 }
  },
  {
    id: 'leva_obbligatoria',
    name: 'Servizio Militare Obbligatorio',
    category: 'militare',
    subcategory: 'forze_armate',
    description: 'Tutti i cittadini servono',
    cost: { pa: 2, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'army_size', value: 40, duration: 10 },
      { type: 'immediate', target: 'patriotism', value: 20, duration: 0 },
      { type: 'delayed', target: 'productivity', value: -15, duration: 10 }
    ],
    requirements: { population: 50 },
    risk: { type: 'desertion', probability: 0.2 }
  },
  {
    id: 'mercenario',
    name: 'Mercenari',
    category: 'militare',
    subcategory: 'forze_armate',
    description: 'Assolda soldati di ventura',
    cost: { pa: 2, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'army_size', value: 35, duration: 5 },
      { type: 'immediate', target: 'cost', value: 25, duration: 0 },
      { type: 'delayed', target: 'loyalty', value: -20, duration: 10 }
    ],
    unlocks: ['mercs'],
    risk: { type: 'betrayal', probability: 0.25 }
  },
  {
    id: 'airborne',
    name: 'Truppe Aviotrasportate',
    category: 'militare',
    subcategory: 'forze_armate',
    description: 'Paracadutisti',
    cost: { pa: 2, resources: { money: 55 } },
    effects: [
      { type: 'immediate', target: 'air_assault', value: 30, duration: 10 },
      { type: 'immediate', target: 'technology', value: 15, duration: 0 }
    ],
    requirements: { technology: 25 },
    unlocks: ['paratroopers'],
    risk: { type: 'accident', probability: 0.15 }
  },
  {
    id: 'special_forces',
    name: 'Forze Speciali',
    category: 'militare',
    subcategory: 'forze_armate',
    description: 'Operazioni speciali',
    cost: { pa: 3, resources: { money: 90 } },
    effects: [
      { type: 'immediate', target: 'special_ops', value: 40, duration: 15 },
      { type: 'immediate', target: 'stealth', value: 25, duration: 0 },
      { type: 'delayed', target: 'reputation', value: 15, duration: 10 }
    ],
    requirements: { technology: 40 },
    unlocks: ['delta_force'],
    risk: { type: 'mission_fail', probability: 0.2 }
  },
  {
    id: 'marine',
    name: 'Fanteria di Marina',
    category: 'militare',
    subcategory: 'forze_armate',
    description: 'Truppe anfibie',
    cost: { pa: 2, resources: { money: 55 } },
    effects: [
      { type: 'immediate', target: 'amphibious', value: 30, duration: 10 },
      { type: 'immediate', target: 'coastal', value: 20, duration: 0 }
    ],
    requirements: { coastline: true },
    unlocks: ['marines'],
    risk: { type: 'drowning', probability: 0.1 }
  },
  {
    id: 'guerrigliero',
    name: 'Guerrigliero',
    category: 'militare',
    subcategory: 'forze_armate',
    description: 'Tattiche di guerriglia',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'guerrilla', value: 30, duration: 15 },
      { type: 'delayed', target: 'tradition', value: -10, duration: 10 }
    ],
    requirements: { territory: 20 },
    unlocks: ['guerrilla_tactics'],
    risk: { type: 'infighting', probability: 0.15 }
  },
  {
    id: 'cyber_warfare',
    name: 'Guerra Cibernetica',
    category: 'militare',
    subcategory: 'forze_armate',
    description: 'Hacker militari',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'cyber', value: 35, duration: 15 },
      { type: 'immediate', target: 'espionage', value: 25, duration: 0 }
    ],
    requirements: { technology: 45 },
    unlocks: ['cyber_unit'],
    risk: { type: 'counter_attack', probability: 0.2 }
  },
  {
    id: 'psicologico',
    name: 'Operazioni Psicologiche',
    category: 'militare',
    subcategory: 'forze_armate',
    description: 'Propaganda bellica',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'morale', value: 20, duration: 5 },
      { type: 'immediate', target: 'enemy_morale', value: -15, duration: 5 }
    ],
    unlocks: ['psyops'],
    risk: { type: 'backfire', probability: 0.15 }
  },
  {
    id: 'medico',
    name: 'Corpo Medico',
    category: 'militare',
    subcategory: 'forze_armate',
    description: 'Medici militari',
    cost: { pa: 1, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'healthcare', value: 25, duration: 10 },
      { type: 'immediate', target: 'survival_rate', value: 20, duration: 0 }
    ],
    unlocks: ['medical_corps'],
    risk: { type: 'disease', probability: 0.1 }
  },
  {
    id: 'logistica',
    name: 'Corpo Logistico',
    category: 'militare',
    subcategory: 'forze_armate',
    description: 'Supporto avanzi',
    cost: { pa: 1, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'supply', value: 30, duration: 15 },
      { type: 'delayed', target: 'efficiency', value: 15, duration: 10 }
    ],
    requirements: { technology: 15 },
    unlocks: ['logistics'],
    risk: { type: 'supply_line', probability: 0.1 }
  },
  {
    id: 'intelligence',
    name: 'Servizi Segreti',
    category: 'militare',
    subcategory: 'forze_armate',
    description: 'Spionaggio interno',
    cost: { pa: 1, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'intelligence', value: 30, duration: 15 },
      { type: 'immediate', target: 'security', value: 25, duration: 0 },
      { type: 'delayed', target: 'privacy', value: -15, duration: 10 }
    ],
    unlocks: ['secret_service'],
    risk: { type: 'leak', probability: 0.15 }
  },
  {
    id: 'guardia_nazionale',
    name: 'Guardia Nazionale',
    category: 'militare',
    subcategory: 'forze_armate',
    description: 'Milizia nazionale',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'reserve', value: 25, duration: 10 },
      { type: 'immediate', target: 'stability', value: 15, duration: 0 }
    ],
    requirements: { population: 30 },
    risk: { type: 'coup', probability: 0.1 }
  },
  {
    id: 'robot_militare',
    name: 'Robot Militari',
    category: 'militare',
    subcategory: 'forze_armate',
    description: 'Droni e robot da guerra',
    cost: { pa: 3, resources: { money: 120 } },
    effects: [
      { type: 'immediate', target: 'automation', value: 40, duration: 20 },
      { type: 'immediate', target: 'precision', value: 30, duration: 0 },
      { type: 'delayed', target: 'human_casualties', value: -25, duration: 15 }
    ],
    requirements: { technology: 60 },
    unlocks: ['drone_army'],
    risk: { type: 'malfunction', probability: 0.2 }
  },
  {
    id: 'armi_nucleari',
    name: 'Armi Nucleari',
    category: 'militare',
    subcategory: 'forze_armate',
    description: 'Armi di distruzione',
    cost: { pa: 3, resources: { money: 200 } },
    effects: [
      { type: 'immediate', target: 'nuclear', value: 50, duration: 30 },
      { type: 'immediate', target: 'deterrent', value: 40, duration: 0 },
      { type: 'delayed', target: 'proliferation', value: 20, duration: 20 }
    ],
    requirements: { technology: 80 },
    unlocks: ['nuclear_arsenal'],
    risk: { type: 'escalation', probability: 0.3 }
  },

  // DIFESA (15 scelte)
  {
    id: 'muro',
    name: 'Fortificazione',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Muri e fortezze',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'defense', value: 30, duration: 15 },
      { type: 'immediate', target: 'history', value: 15, duration: 0 }
    ],
    requirements: { territory: 15 },
    unlocks: ['fortress'],
    risk: { type: 'obsolescence', probability: 0.1 }
  },
  {
    id: 'bunker',
    name: 'Bunker',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Rifugi sotterranei',
    cost: { pa: 2, resources: { money: 55 } },
    effects: [
      { type: 'immediate', target: 'protection', value: 35, duration: 20 },
      { type: 'delayed', target: 'mobilty', value: -15, duration: 10 }
    ],
    unlocks: ['bunker_network'],
    risk: { type: 'collapse', probability: 0.08 }
  },
  {
    id: 'radar',
    name: 'Rete Radar',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Rilevamento aereo',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'detection', value: 35, duration: 15 },
      { type: 'immediate', target: 'air_defense', value: 25, duration: 0 }
    ],
    requirements: { technology: 30 },
    unlocks: ['radar_network'],
    risk: { type: 'jamming', probability: 0.15 }
  },
  {
    id: 'missile',
    name: 'Difesa Missilistica',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Abbatti missili',
    cost: { pa: 3, resources: { money: 100 } },
    effects: [
      { type: 'immediate', target: 'missile_defense', value: 40, duration: 20 },
      { type: 'immediate', target: 'security', value: 25, duration: 0 }
    ],
    requirements: { technology: 55 },
    unlocks: ['anti_missile'],
    risk: { type: 'overwhelming', probability: 0.2 }
  },
  {
    id: 'rete_difesiva',
    name: 'Linea Maginot',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Difesa statica avanzata',
    cost: { pa: 2, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'static_defense', value: 35, duration: 15 },
      { type: 'delayed', target: 'offense', value: -20, duration: 10 }
    ],
    requirements: { technology: 25 },
    risk: { type: 'flanking', probability: 0.2 }
  },
  {
    id: 'civil_defense',
    name: 'Difesa Civile',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Preparazione populace',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'civil_defense', value: 25, duration: 15 },
      { type: 'immediate', target: 'stability', value: 15, duration: 0 }
    ],
    requirements: { population: 30 },
    risk: { type: 'panic', probability: 0.1 }
  },
  {
    id: 'sorveglianza',
    name: 'Sorveglianza di Massa',
    category: 'militare',
    subcategory: 'difesa',
    description: 'TeleCamer ovunque',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'surveillance', value: 35, duration: 15 },
      { type: 'immediate', target: 'crime_detection', value: 25, duration: 0 },
      { type: 'delayed', target: 'privacy', value: -25, duration: 10 }
    ],
    requirements: { technology: 35 },
    risk: { type: 'leak', probability: 0.15 }
  },
  {
    id: 'protezione_civile',
    name: 'Protezione Civile',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Forze di emergenza',
    cost: { pa: 1, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'emergency_response', value: 30, duration: 15 },
      { type: 'immediate', target: 'disaster_readiness', value: 25, duration: 0 }
    ],
    unlocks: ['civil_protection'],
    risk: { type: 'overload', probability: 0.1 }
  },
  {
    id: 'scudo_spaziale',
    name: 'Scudo Spaziale',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Orbita difensiva',
    cost: { pa: 3, resources: { money: 150 } },
    effects: [
      { type: 'immediate', target: 'space_defense', value: 45, duration: 25 },
      { type: 'delayed', target: 'space_debris', value: 20, duration: 15 }
    ],
    requirements: { technology: 70 },
    risk: { type: 'attack', probability: 0.2 }
  },
  {
    id: 'crypto',
    name: 'Crittografia',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Comunicazioni sicure',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'encryption', value: 35, duration: 20 },
      { type: 'immediate', target: 'security', value: 25, duration: 0 }
    ],
    requirements: { technology: 40 },
    unlocks: ['crypto_defense'],
    risk: { type: 'hacking', probability: 0.15 }
  },
  {
    id: 'insurance',
    name: 'Assicurazione Rischi',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Assicurazioni belliche',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'risk_mitigation', value: 20, duration: 10 },
      { type: 'delayed', target: 'economy_stabilty', value: 15, duration: 10 }
    ],
    risk: { type: 'unpayable', probability: 0.15 }
  },
  {
    id: 'rifugio',
    name: 'Rifugi Anti missile',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Bunker nucleari',
    cost: { pa: 2, resources: { money: 65 } },
    effects: [
      { type: 'immediate', target: 'nuclear_protection', value: 40, duration: 25 },
      { type: 'delayed', target: 'cost', value: 20, duration: 15 }
    ],
    requirements: { technology: 45 },
    risk: { type: 'collapse', probability: 0.08 }
  },
  {
    id: 'allarme',
    name: 'Sistema di Allarme',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Allerta precoce',
    cost: { pa: 1, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'early_warning', value: 30, duration: 15 },
      { type: 'delayed', target: 'response_time', value: -20, duration: 10 }
    ],
    requirements: { technology: 25 },
    unlocks: ['alert_system'],
    risk: { type: 'false_alarm', probability: 0.15 }
  },
  {
    id: 'sanitario_militare',
    name: 'Ospedale da Campo',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Strutture mediche mobili',
    cost: { pa: 1, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'field_medicine', value: 30, duration: 15 },
      { type: 'immediate', target: 'casualty_rate', value: -20, duration: 0 }
    ],
    requirements: { technology: 20 },
    unlocks: ['field_hospital'],
    risk: { type: 'attack', probability: 0.1 }
  },
  {
    id: 'armi_non_letali',
    name: 'Armi Non Letali',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Tecnologie non letali',
    cost: { pa: 2, resources: { money: 55 } },
    effects: [
      { type: 'immediate', target: 'non_lethal', value: 30, duration: 15 },
      { type: 'immediate', target: 'reputation', value: 20, duration: 0 },
      { type: 'delayed', target: 'effectiveness', value: -10, duration: 10 }
    ],
    requirements: { technology: 35 },
    unlocks: ['non_lethal_weapons'],
    risk: { type: 'failure', probability: 0.15 }
  },

  // ATTACO (25 scelte)
  {
    id: 'invasione',
    name: 'Invasione',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Attacco convenzionale',
    cost: { pa: 3, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'conquest', value: 30, duration: 5 },
      { type: 'immediate', target: 'territory', value: 20, duration: 0 },
      { type: 'delayed', target: 'resistance', value: 25, duration: 10 }
    ],
    requirements: { military: 50 },
    unlocks: ['invasion'],
    risk: { type: 'stalemate', probability: 0.25 }
  },
  {
    id: 'assedio',
    name: 'Assedio',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Circonda e affama',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'siege', value: 35, duration: 8 },
      { type: 'delayed', target: 'food_shortage', value: 25, duration: 8 }
    ],
    requirements: { territory: 10 },
    unlocks: ['siege_tactics'],
    risk: { type: 'breach', probability: 0.15 }
  },
  {
    id: 'blitzkrieg',
    name: 'Blitzkrieg',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Guerra lampo',
    cost: { pa: 3, resources: { money: 90 } },
    effects: [
      { type: 'immediate', target: 'speed', value: 40, duration: 5 },
      { type: 'immediate', target: 'surprise', value: 30, duration: 0 },
      { type: 'delayed', target: 'supply', value: -20, duration: 8 }
    ],
    requirements: { technology: 35, motorizzazione: true },
    unlocks: ['blitzkrieg'],
    risk: { type: 'overextension', probability: 0.2 }
  },
  {
    id: 'guerriglia_offensiva',
    name: 'Guerriglia Offensiva',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Attacchi terroristici',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'terror', value: 35, duration: 8 },
      { type: 'delayed', target: 'enemy_stability', value: -25, duration: 10 }
    ],
    unlocks: ['terror_campaign'],
    risk: { type: 'crackdown', probability: 0.25 }
  },
  {
    id: 'sabotaggio',
    name: 'Sabotaggio',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Distruggi infrastrutture',
    cost: { pa: 2, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'sabotage', value: 30, duration: 5 },
      { type: 'delayed', target: 'enemy_economy', value: -20, duration: 10 }
    ],
    requirements: { intelligence: 20 },
    unlocks: ['sabotage_ops'],
    risk: { type: 'capture', probability: 0.2 }
  },
  {
    id: 'attacco_aereo',
    name: 'Attacco Aereo',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Bombardamenti',
    cost: { pa: 2, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'air_raide', value: 35, duration: 5 },
      { type: 'immediate', target: 'infrastructure_damage', value: 25, duration: 0 },
      { type: 'delayed', target: 'civilian_casualties', value: 20, duration: 8 }
    ],
    requirements: { airforce: 25 },
    unlocks: ['bombing'],
    risk: { type: 'surrender', probability: 0.15 }
  },
  {
    id: 'attacco_navale',
    name: 'Attacco Navale',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Assalto anfibio',
    cost: { pa: 3, resources: { money: 85 } },
    effects: [
      { type: 'immediate', target: 'naval_assault', value: 35, duration: 5 },
      { type: 'immediate', target: 'coastal_control', value: 25, duration: 0 }
    ],
    requirements: { navy: 30, coastline: true },
    unlocks: ['amphibious_assault'],
    risk: { type: 'repulse', probability: 0.2 }
  },
  {
    id: 'attacco_balistico',
    name: 'Attacco Missilistico',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Missili a lungo raggio',
    cost: { pa: 3, resources: { money: 100 } },
    effects: [
      { type: 'immediate', target: 'ballistic', value: 40, duration: 5 },
      { type: 'immediate', target: 'deep_strike', value: 30, duration: 0 }
    ],
    requirements: { missile_capability: true },
    unlocks: ['ballistic_missile'],
    risk: { type: 'interception', probability: 0.2 }
  },
  {
    id: 'attacco_nucleare',
    name: 'Attacco Nucleare',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Armi nucleari tattiche',
    cost: { pa: 3, resources: { money: 200 } },
    effects: [
      { type: 'immediate', target: 'nuclear_strike', value: 60, duration: 1 },
      { type: 'immediate', target: 'radiation', value: 50, duration: 30 }
    ],
    requirements: { nuclear: true },
    risk: { type: 'retaliation', probability: 0.5 }
  },
  {
    id: 'cyber_attacco',
    name: 'Cyber Attack',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Hacker attack',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'cyber_attack', value: 35, duration: 5 },
      { type: 'delayed', target: 'infrastructure', value: -25, duration: 10 }
    ],
    requirements: { cyber_capability: 30 },
    unlocks: ['cyber_offense'],
    risk: { type: 'counter_attack', probability: 0.2 }
  },
  {
    id: 'disinformazione',
    name: 'Disinformazione',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Fake news e propaganda',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'disinfo', value: 30, duration: 8 },
      { type: 'delayed', target: 'enemy_trust', value: -20, duration: 10 }
    ],
    unlocks: ['disinfo_campaign'],
    risk: { type: 'exposure', probability: 0.2 }
  },
  {
    id: 'economico',
    name: 'Guerra Economica',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Sanzioni devastanti',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'econ_warfare', value: 30, duration: 10 },
      { type: 'delayed', target: 'enemy_trade', value: -30, duration: 15 }
    ],
    requirements: { diplomacy: 20 },
    unlocks: ['econ_sanctions'],
    risk: { type: 'coalition_collapse', probability: 0.15 }
  },
  {
    id: 'diplomatico_offensivo',
    name: 'Isolamento Diplomatico',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Trova alleati contro il nemico',
    cost: { pa: 2, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'coalition', value: 30, duration: 10 },
      { type: 'delayed', target: 'enemy_isolation', value: -25, duration: 15 }
    ],
    requirements: { diplomacy: 25 },
    risk: { type: 'refusal', probability: 0.2 }
  },
  {
    id: 'supporto_aereo',
    name: 'Supporto Aereo Ravvicinato',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Close Air Support',
    cost: { pa: 2, resources: { money: 65 } },
    effects: [
      { type: 'immediate', target: 'cas', value: 35, duration: 5 },
      { type: 'immediate', target: 'ground_support', value: 25, duration: 0 }
    ],
    requirements: { airforce: 20 },
    unlocks: ['cas'],
    risk: { type: 'friendly_fire', probability: 0.15 }
  },
  {
    id: 'infiltrazione',
    name: 'Infiltrazione',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Agenti dietro le linee',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'infiltration', value: 30, duration: 8 },
      { type: 'delayed', target: 'sabotage', value: 20, duration: 8 }
    ],
    requirements: { special_ops: 20 },
    unlocks: ['infiltration'],
    risk: { type: 'caught', probability: 0.25 }
  },
  {
    id: 'deterrenza',
    name: 'Deterrenza Nucleare',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Non usare ma minacciare',
    cost: { pa: 2, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'deterrence', value: 45, duration: 30 },
      { type: 'delayed', target: 'proliferation', value: 15, duration: 20 }
    ],
    requirements: { nuclear: true },
    risk: { type: 'misunderstanding', probability: 0.3 }
  },
  {
    id: 'propaganda_offensiva',
    name: 'Propaganda Bellica',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Parla al nemico',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'propaganda', value: 25, duration: 5 },
      { type: 'delayed', target: 'enemy_morale', value: -15, duration: 8 }
    ],
    unlocks: ['war_propaganda'],
    risk: { type: 'rejection', probability: 0.15 }
  },
  {
    id: 'assedio_aeréo',
    name: 'Assedio Aereo',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Blocca e bombarda',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'air_blockade', value: 30, duration: 10 },
      { type: 'delayed', target: 'surrender_prob', value: 25, duration: 10 }
    ],
    requirements: { airforce: 30, coastline: true },
    unlocks: ['air_blockade'],
    risk: { type: 'humanitarian_crisis', probability: 0.2 }
  },
  {
    id: 'fronte_unico',
    name: 'Offensiva Multi Front',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Attaca da più fronti',
    cost: { pa: 3, resources: { money: 100 } },
    effects: [
      { type: 'immediate', target: 'multi_front', value: 40, duration: 5 },
      { type: 'immediate', target: 'enemy_divide', value: 30, duration: 0 }
    ],
    requirements: { allies: 2 },
    risk: { type: 'coordination_failure', probability: 0.25 }
  },
  {
    id: 'stato_assedio',
    name: 'Stato d Assedio',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Leggi speciali di guerra',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'martial_law', value: 30, duration: 10 },
      { type: 'delayed', target: 'rights', value: -25, duration: 15 }
    ],
    risk: { type: 'coup', probability: 0.15 }
  },
  {
    id: 'scorched_earth',
    name: 'Terra Bruciata',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Distruggi tutto',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'scorched', value: 40, duration: 5 },
      { type: 'delayed', target: 'economic_collapse', value: 35, duration: 15 }
    ],
    requirements: { stability: 30 },
    risk: { type: 'international_condemnation', probability: 0.3 }
  },
  {
    id: 'colpo_di_main',
    name: 'Colpo di Mano',
    category: 'militare',
    subcategory: 'attacco',
    description: 'Attacco rapidissimo',
    cost: { pa: 1, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'coup_de_main', value: 35, duration: 2 },
      { type: 'delayed', target: 'surprise', value: 20, duration: 5 }
    ],
    requirements: { special_ops: 30 },
    risk: { type: 'failure', probability: 0.3 }
  },

  // SPIONAGGIO (15 scelte)
  {
    id: 'spie',
    name: 'Rete di Spie',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Informatori ovunque',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'intelligence', value: 35, duration: 15 },
      { type: 'immediate', target: 'early_warning', value: 25, duration: 0 }
    ],
    unlocks: ['spy_network'],
    risk: { type: 'double_agent', probability: 0.2 }
  },
  {
    id: 'satelliti_spia',
    name: 'Satelliti di Ricognizione',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Orbita di sorveglianza',
    cost: { pa: 2, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'sat_recon', value: 40, duration: 25 },
      { type: 'immediate', target: 'reconnaissance', value: 35, duration: 0 }
    ],
    requirements: { space: 20 },
    unlocks: ['spy_satellite'],
    risk: { type: 'anti_satellite', probability: 0.15 }
  },
  {
    id: 'hacking',
    name: 'Hacking di Stato',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Frobe segreti',
    cost: { pa: 2, resources: { money: 55 } },
    effects: [
      { type: 'immediate', target: 'hacking', value: 35, duration: 10 },
      { type: 'delayed', target: 'secrets', value: 25, duration: 10 }
    ],
    requirements: { cyber_capability: 30 },
    unlocks: ['hacking_unit'],
    risk: { type: 'attribution', probability: 0.25 }
  },
  {
    id: 'contraffazione',
    name: 'Controfformazione',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Disinformazione nemica',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'counterfeiting', value: 30, duration: 10 },
      { type: 'delayed', target: 'misinformation', value: 25, duration: 10 }
    ],
    requirements: { intelligence: 25 },
    unlocks: ['disinformation_ops'],
    risk: { type: 'exposure', probability: 0.2 }
  },
  {
    id: 'agente_duplice',
    name: 'Agente Duplice',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Doppio agente',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'double_agent', value: 35, duration: 15 },
      { type: 'delayed', target: 'deception', value: 30, duration: 10 }
    ],
    requirements: { intelligence: 30 },
    risk: { type: 'blow_cover', probability: 0.25 }
  },
  {
    id: 'tradimento',
    name: ' Tradimento',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Compra il nemico',
    cost: { pa: 2, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'bribery', value: 30, duration: 10 },
      { type: 'delayed', target: 'defection', value: 25, duration: 10 }
    ],
    requirements: { money: 50 },
    unlocks: ['bribery_ops'],
    risk: { type: 'refusal', probability: 0.3 }
  },
  {
    id: 'intercettazione',
    name: 'Intercettazioni',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Ascolta comunicazioni',
    cost: { pa: 1, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'interception', value: 30, duration: 15 },
      { type: 'immediate', target: 'signals', value: 25, duration: 0 }
    ],
    requirements: { technology: 30 },
    unlocks: ['sigint'],
    risk: { type: 'detection', probability: 0.2 }
  },
  {
    id: 'scafatura',
    name: 'Sfregiatura',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Rubla tecnologia',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'theft', value: 30, duration: 5 },
      { type: 'delayed', target: 'tech_advancement', value: 20, duration: 10 }
    ],
    requirements: { intelligence: 25 },
    unlocks: ['tech_theft'],
    risk: { type: 'prosecution', probability: 0.2 }
  },
  {
    id: 'omicidio',
    name: 'Operazione Oscura',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Elimina bersaglio',
    cost: { pa: 3, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'elimination', value: 40, duration: 2 },
      { type: 'delayed', target: 'retaliation', value: 30, duration: 10 }
    ],
    requirements: { special_ops: 40 },
    unlocks: ['elimination_ops'],
    risk: { type: 'failure', probability: 0.35 }
  },
  {
    id: 'sabotaggio_op',
    name: 'Sabotaggio Occulto',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Guasta silenziosamente',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'covert_sabotage', value: 35, duration: 8 },
      { type: 'delayed', target: 'system_failure', value: 25, duration: 10 }
    ],
    requirements: { special_ops: 25 },
    unlocks: ['covert_sabotage'],
    risk: { type: 'discovery', probability: 0.25 }
  },
  {
    id: 'infiltrazione_cyber',
    name: 'Infiltrato',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Metti uno dentro',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'infiltrated', value: 30, duration: 15 },
      { type: 'delayed', target: 'insider_threat', value: 25, duration: 10 }
    ],
    requirements: { intelligence: 30 },
    risk: { type: 'exposure', probability: 0.2 }
  },
  {
    id: 'psicologico_op',
    name: 'Operazione Psicosociale',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Manipola la mente',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'psyop', value: 30, duration: 10 },
      { type: 'delayed', target: 'breakdown', value: 20, duration: 10 }
    ],
    requirements: { intelligence: 20 },
    unlocks: ['psyop_unit'],
    risk: { type: 'resistance', probability: 0.2 }
  },
  {
    id: 'copertura',
    name: 'Copertura Diplomatica',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Spie sotto copertura',
    cost: { pa: 1, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'cover', value: 30, duration: 15 },
      { type: 'delayed', target: 'detection', value: -10, duration: 10 }
    ],
    requirements: { diplomacy: 20 },
    unlocks: ['cover_ops'],
    risk: { type: 'blow', probability: 0.2 }
  },
  {
    id: 'denuncia',
    name: 'Denuncia Pubblica',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Rvela segreti al mondo',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'whistleblowing', value: 30, duration: 3 },
      { type: 'delayed', target: 'international_pressure', value: 25, duration: 8 }
    ],
    requirements: { intelligence: 15 },
    risk: { type: 'retaliation', probability: 0.25 }
  },

  // LOGISTICA (10 scelte)
  {
    id: 'deposito',
    name: 'Depositi',
    category: "militare",
    subcategory: 'logistica',
    description: 'Magazzini militari',
    cost: { pa: 1, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'storage', value: 30, duration: 15 },
      { type: 'delayed', target: 'supplies', value: 15, duration: 10 }
    ],
    unlocks: ['depots'],
    risk: { type: 'raid', probability: 0.1 }
  },
  {
    id: 'logistica_avanzata',
    name: 'Catena Logistica',
    category: 'militare',
    subcategory: 'logistica',
    description: 'Supply chain militare',
    cost: { pa: 2, resources: { money: 55 } },
    effects: [
      { type: 'immediate', target: 'supply_chain', value: 35, duration: 15 },
      { type: 'delayed', target: 'efficiency', value: 20, duration: 10 }
    ],
    requirements: { technology: 25 },
    unlocks: ['supply_chain'],
    risk: { type: 'interdiction', probability: 0.15 }
  },
  {
    id: 'stoccaggio_segreto',
    name: 'Stoccaggio Segreto',
    category: 'militare',
    subcategory: 'logistica',
    description: 'Riserve nascoste',
    cost: { pa: 1, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'hidden_stocks', value: 30, duration: 20 },
      { type: 'delayed', target: 'surprise', value: 20, duration: 15 }
    ],
    unlocks: ['hidden_depots'],
    risk: { type: 'discovery', probability: 0.15 }
  },
  {
    id: 'trasporto_aereo',
    name: 'Trasporto Aereo',
    category: 'militare',
    subcategory: 'logistica',
    description: 'Airbus militari',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'airlift', value: 35, duration: 15 },
      { type: 'immediate', target: 'mobility', value: 25, duration: 0 }
    ],
    requirements: { technology: 30 },
    unlocks: ['airlift_capability'],
    risk: { type: 'interception', probability: 0.15 }
  },
  {
    id: 'pipelines',
    name: 'Pipelines',
    category: 'militare',
    subcategory: 'logistica',
    description: 'Condotte per rifornimenti',
    cost: { pa: 2, resources: { money: 65 } },
    effects: [
      { type: 'immediate', target: 'pipeline', value: 35, duration: 25 },
      { type: 'immediate', target: 'supply_security', value: 25, duration: 0 }
    ],
    requirements: { technology: 25, territory: 20 },
    risk: { type: 'sabotage', probability: 0.15 }
  },
  {
    id: 'base_avanzata',
    name: 'Base Avanzata',
    category: 'militare',
    subcategory: 'logistica',
    description: 'Fwd Operating Base',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'fob', value: 30, duration: 15 },
      { type: 'immediate', target: 'range', value: 20, duration: 0 }
    ],
    requirements: { technology: 20 },
    unlocks: ['fob'],
    risk: { type: 'overrun', probability: 0.15 }
  },
  {
    id: 'medic',
    name: 'Unità Mediche',
    category: 'militare',
    subcategory: 'logistica',
    description: 'Evacuazione medica',
    cost: { pa: 1, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'medevac', value: 30, duration: 15 },
      { type: 'immediate', target: 'survival', value: 25, duration: 0 }
    ],
    unlocks: ['medevac'],
    risk: { type: 'ambush', probability: 0.1 }
  },
  {
    id: 'risarcimento',
    name: 'Risarcimento',
    category: 'militare',
    subcategory: 'logistica',
    description: 'Paga retroattiva',
    cost: { pa: 1, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'reparations', value: 25, duration: 10 },
      { type: 'delayed', target: 'loyalty', value: 15, duration: 10 }
    ],
    risk: { type: 'inflation', probability: 0.1 }
  },
  {
    id: 'manutenzione',
    name: 'Manutenzione',
    category: 'militare',
    subcategory: 'logistica',
    description: 'Ripara equipaggiamento',
    cost: { pa: 1, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'maintenance', value: 30, duration: 15 },
      { type: 'delayed', target: 'durability', value: 15, duration: 10 }
    ],
    risk: { type: 'shortage', probability: 0.1 }
  },
  {
    id: 'standardizzazione',
    name: 'Standardizzazione',
    category: 'militare',
    subcategory: 'logistica',
    description: 'Equip comune',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'standardization', value: 25, duration: 20 },
      { type: 'delayed', target: 'logistics_cost', value: -15, duration: 15 }
    ],
    requirements: { technology: 15 },
    risk: { type: 'quality', probability: 0.1 }
  },

  // DIPLOMAZIA BELLICA (10 scelte)
  {
    id: 'dichiarazione',
    name: 'Dichiarazione di Guerra',
    category: 'militare',
    subcategory: 'diplomazia_bellica',
    description: ' Guerra formale',
    cost: { pa: 1, resources: { money: 10 } },
    effects: [
      { type: 'immediate', target: 'formal_war', value: 40, duration: 10 },
      { type: 'delayed', target: 'international_law', value: -20, duration: 15 }
    ],
    requirements: { military: 30 },
    risk: { type: 'coalition', probability: 0.2 }
  },
  {
    id: 'pace',
    name: 'Proposta di Pace',
    category: 'militare',
    subcategory: 'diplomazia_bellica',
    description: 'Cessate il fuoco',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'ceasefire', value: 30, duration: 5 },
      { type: 'delayed', target: 'negotiation', value: 20, duration: 10 }
    ],
    risk: { type: 'rejection', probability: 0.25 }
  },
  {
    id: 'annessione',
    name: 'Anne ssione',
    category: 'militare',
    subcategory: 'diplomazia_bellica',
    description: 'Integra territorio',
    cost: { pa: 2, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'annexation', value: 35, duration: 10 },
      { type: 'delayed', target: 'resistance', value: 25, duration: 15 }
    ],
    requirements: { conquering: 30 },
    risk: { type: 'international_condemnation', probability: 0.3 }
  },
  {
    id: 'client_state',
    name: 'Stato fantoccio',
    category: 'militare',
    subcategory: 'diplomazia_bellica',
    description: 'Governo favorevole',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'puppet', value: 30, duration: 15 },
      { type: 'delayed', target: 'influence', value: 25, duration: 10 }
    ],
    requirements: { military: 30 },
    risk: { type: 'independence', probability: 0.2 }
  },
  {
    id: 'trattato',
    name: 'Trattato di Pace',
    category: 'militare',
    subcategory: 'diplomazia_bellica',
    description: 'Pace permanente',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'permanent_peace', value: 40, duration: 30 },
      { type: 'immediate', target: 'recognition', value: 25, duration: 0 }
    ],
    requirements: { victory: true },
    risk: { type: 'violation', probability: 0.15 }
  },
  {
    id: 'alleanza_difensiva',
    name: 'Patto Difensivo',
    category: 'militare',
    subcategory: 'diplomazia_bellica',
    description: 'Difesa mutua',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'defensive_alliance', value: 30, duration: 20 },
      { type: 'delayed', target: 'treaty_loyalty', value: 15, duration: 15 }
    ],
    requirements: { diplomacy: 20 },
    risk: { type: 'abandonment', probability: 0.15 }
  },
  {
    id: 'guerrra_fredda',
    name: 'Guerra Fredda',
    category: 'militare',
    subcategory: 'diplomazia_bellica',
    description: 'Tensione permanente',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'cold_war', value: 35, duration: 20 },
      { type: 'delayed', target: 'stance', value: 20, duration: 20 }
    ],
    risk: { type: 'escalation', probability: 0.25 }
  },
  {
    id: 'neutralita',
    name: 'Neutralità Armata',
    category: 'militare',
    subcategory: 'diplomazia_bellica',
    description: 'Non intervenire',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'neutrality', value: 30, duration: 15 },
      { type: 'delayed', target: 'isolation', value: 15, duration: 10 }
    ],
    risk: { type: 'invasion', probability: 0.2 }
  },
  {
    id: 'intervento',
    name: 'Intervento Umano',
    category: 'militare',
    subcategory: 'diplomazia_bellica',
    description: 'Intervieni nel conflitto',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'intervention', value: 35, duration: 5 },
      { type: 'delayed', target: 'escalation', value: 25, duration: 10 }
    ],
    requirements: { military: 35 },
    risk: { type: 'overextension', probability: 0.25 }
  },
  {
    id: 'mediatione',
    name: 'Mediazione',
    category: 'militare',
    subcategory: 'diplomazia_bellica',
    description: 'Fatti mediatore',
    cost: { pa: 1, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'mediation', value: 30, duration: 10 },
      { type: 'immediate', target: 'prestige', value: 20, duration: 0 }
    ],
    requirements: { diplomacy: 25 },
    risk: { type: 'rejection', probability: 0.2 }
  },

  // SPIONAGGIO - Gestione Rete (Nuove)
  {
    id: 'spy_network_build',
    name: 'Costruisci Rete di Spionaggio',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Crea una rete di agenti in una nazione target',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'spy_network', value: 20, duration: 15 },
      { type: 'immediate', target: 'intelligence', value: 15, duration: 10 }
    ],
    unlocks: ['spy_network'],
    risk: { type: 'detection', probability: 0.25 }
  },
  {
    id: 'spy_operation_assassin',
    name: 'Operazione Assassinio',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Elimina un target di alto valore',
    cost: { pa: 3, resources: { money: 100 } },
    effects: [
      { type: 'immediate', target: 'elimination', value: 50, duration: 1 },
      { type: 'delayed', target: 'retaliation', value: 30, duration: 10 }
    ],
    requirements: { spy_network: 2, special_ops: 30 },
    unlocks: ['assassination'],
    risk: { type: 'failure', probability: 0.4 }
  },
  {
    id: 'spy_operation_kidnap',
    name: 'Rapimento Scienziato',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Rappodisci uno scienziato nemico',
    cost: { pa: 3, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'kidnapping', value: 40, duration: 5 },
      { type: 'delayed', target: 'tech_advancement', value: 25, duration: 15 }
    ],
    requirements: { spy_network: 2, intelligence: 25 },
    unlocks: ['kidnapping'],
    risk: { type: 'capture', probability: 0.3 }
  },
  {
    id: 'spy_tech_theft',
    name: 'Furto Tecnologico',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Rubla segreti tecnologici',
    cost: { pa: 2, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'tech_theft', value: 35, duration: 10 },
      { type: 'delayed', target: 'technology', value: 15, duration: 15 }
    ],
    requirements: { spy_network: 1, cyber_capability: 20 },
    unlocks: ['tech_theft'],
    risk: { type: 'attribution', probability: 0.25 }
  },
  {
    id: 'spy_industrial_sabotage',
    name: 'Sabotaggio Industriale',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Guasta infrastrutture industriali nemiche',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'sabotage', value: 30, duration: 8 },
      { type: 'delayed', target: 'production', value: -20, duration: 15 }
    ],
    requirements: { spy_network: 1, special_ops: 20 },
    unlocks: ['industrial_sabotage'],
    risk: { type: 'discovery', probability: 0.25 }
  },
  {
    id: 'spy_coup_prep',
    name: 'Preparazione Colpo di Stato',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Prepara un colpo di stato nel paese nemico',
    cost: { pa: 3, resources: { money: 120 } },
    effects: [
      { type: 'immediate', target: 'coup_prep', value: 25, duration: 20 },
      { type: 'delayed', target: 'regime_change', value: 30, duration: 25 }
    ],
    requirements: { spy_network: 3, diplomacy: 30 },
    unlocks: ['coup_operation'],
    risk: { type: 'exposure', probability: 0.4 }
  },
  {
    id: 'double_agent_insert',
    name: 'Inserisci Agente Duplice',
    category: 'militare',
    subcategory: 'spionaggio',
    description: 'Metti un agente nella rete nemica',
    cost: { pa: 2, resources: { money: 55 } },
    effects: [
      { type: 'immediate', target: 'double_agent', value: 30, duration: 20 },
      { type: 'delayed', target: 'counter_intel', value: 20, duration: 15 }
    ],
    requirements: { intelligence: 30 },
    unlocks: ['double_agent_ops'],
    risk: { type: 'blow_cover', probability: 0.3 }
  },

  // DIFESA - Controspionaggio e Sicurezza (Nuove)
  {
    id: 'counter_spy_cleanse',
    name: 'Pulizia Interna',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Rimuovi spie nemiche dalla nazione',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'counter_spy', value: 25, duration: 15 },
      { type: 'immediate', target: 'security', value: 15, duration: 10 }
    ],
    requirements: { intelligence: 20 },
    unlocks: ['counter_intel'],
    risk: { type: 'innocent', probability: 0.15 }
  },
  {
    id: 'counter_intel_network',
    name: 'Rete Controspionaggio',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Crea rete per individuare spie',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'counter_intel_network', value: 30, duration: 20 },
      { type: 'delayed', target: 'detection', value: 20, duration: 15 }
    ],
    unlocks: ['counter_network'],
    risk: { type: 'infiltration', probability: 0.2 }
  },
  {
    id: 'security_personnel_screening',
    name: 'Screening Personale',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Ctrlodia accuratamente i dipendenti',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'personnel_security', value: 25, duration: 15 },
      { type: 'delayed', target: 'insider_threat', value: -15, duration: 10 }
    ],
    requirements: { intelligence: 15 },
    unlocks: ['personnel_screen'],
    risk: { type: 'false_positive', probability: 0.1 }
  },
  {
    id: 'encryption_upgrade',
    name: 'Aggiornamento Crittografia',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Migliora seguridadza delle comunicazioni',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'encryption', value: 30, duration: 20 },
      { type: 'delayed', target: 'hacking_risk', value: -20, duration: 15 }
    ],
    requirements: { technology: 35 },
    unlocks: ['crypto_adv'],
    risk: { type: 'hacking', probability: 0.1 }
  },
  {
    id: 'security_chain_internal',
    name: 'Catena di Sicurezza Interna',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Crea livelli multipli di sicurezza',
    cost: { pa: 3, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'security_chain', value: 35, duration: 25 },
      { type: 'delayed', target: 'defense_depth', value: 25, duration: 20 }
    ],
    requirements: { intelligence: 30 },
    unlocks: ['defense_in_depth'],
    risk: { type: 'insider', probability: 0.15 }
  },
  {
    id: 'radar_network_expand',
    name: 'Espandi Rete Radar',
    category: 'militare',
    subcategory: 'difesa',
    description: 'Aumenta la sorveglianza aerea',
    cost: { pa: 2, resources: { money: 55 } },
    effects: [
      { type: 'immediate', target: 'detection', value: 30, duration: 20 },
      { type: 'immediate', target: 'early_warning', value: 25, duration: 15 }
    ],
    requirements: { technology: 30 },
    unlocks: ['extended_radar'],
    risk: { type: 'jamming', probability: 0.15 }
  },

  // GUERRA FREDDA - Azioni Specifiche (Nuove)
  {
    id: 'coldwar_escalate_provoke',
    name: 'Provocazione Militare',
    category: 'militare',
    subcategory: 'diplomazia_bellica',
    description: 'Esercitazioni al confine',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'tension', value: 15, duration: 10 },
      { type: 'delayed', target: 'military_presence', value: 10, duration: 10 }
    ],
    unlocks: ['provocation'],
    risk: { type: 'incident', probability: 0.2 }
  },
  {
    id: 'coldwar_support_rebels',
    name: 'Supporto Ribelli Clandestino',
    category: 'militare',
    subcategory: 'diplomazia_bellica',
    description: 'Arma segretamente gruppi ribelli',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'proxy_war', value: 25, duration: 15 },
      { type: 'delayed', target: 'tension', value: 20, duration: 15 }
    ],
    requirements: { military: 20 },
    unlocks: ['proxy_support'],
    risk: { type: 'exposure', probability: 0.3 }
  },
  {
    id: 'coldwar_propaganda',
    name: 'Propaganda Bellica',
    category: 'militare',
    subcategory: 'diplomazia_bellica',
    description: 'Campagna propagandistica contro nemico',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'propaganda', value: 20, duration: 8 },
      { type: 'delayed', target: 'enemy_consensus', value: -10, duration: 10 }
    ],
    unlocks: ['cold_propaganda'],
    risk: { type: 'exposure', probability: 0.15 }
  },
  {
    id: 'coldwar_arm_race',
    name: 'Corsa agli Armamenti',
    category: 'militare',
    subcategory: 'diplomazia_bellica',
    description: 'Aumenta spese militari',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'arms_race', value: 30, duration: 15 },
      { type: 'delayed', target: 'military', value: 20, duration: 15 }
    ],
    requirements: { economy: 30 },
    unlocks: ['militarization'],
    risk: { type: 'economic_strain', probability: 0.2 }
  },
  {
    id: 'coldwar_embargo',
    name: 'Embargo Totale',
    category: 'militare',
    subcategory: 'diplomazia_bellica',
    description: 'Blocca completamente commercio',
    cost: { pa: 1, resources: { money: 10 } },
    effects: [
      { type: 'immediate', target: 'embargo', value: 30, duration: 15 },
      { type: 'delayed', target: 'economy', value: -15, duration: 15 }
    ],
    requirements: { allies: 2 },
    unlocks: ['total_embargo'],
    risk: { type: 'coalitionCrack', probability: 0.25 }
  },
  {
    id: 'coldwar_deescalate',
    name: 'Distensione',
    category: 'militare',
    subcategory: 'diplomazia_bellica',
    description: 'Riduci tensioni con il nemico',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'deescalation', value: -20, duration: 10 },
      { type: 'delayed', target: 'prestige', value: 10, duration: 10 }
    ],
    requirements: { cold_war: 1 },
    unlocks: ['detente'],
    risk: { type: 'weakness', probability: 0.1 }
  },
  {
    id: 'coldwar_treaty',
    name: 'Trattato di Controllo Armi',
    category: 'militare',
    subcategory: 'diplomazia_bellica',
    description: 'Accordi per limitare armamenti',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'arms_treaty', value: -25, duration: 25 },
      { type: 'immediate', target: 'prestige', value: 20, duration: 0 }
    ],
    requirements: { diplomacy: 30 },
    unlocks: ['arms_control'],
    risk: { type: 'violation', probability: 0.15 }
  },
  {
    id: 'coldwar_troop_withdraw',
    name: 'Ritiro Truppe Confine',
    category: 'militare',
    subcategory: 'diplomazia_bellica',
    description: 'Ritira truppe dalla frontiera',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'deescalation', value: -15, duration: 10 },
      { type: 'delayed', target: 'stability', value: 10, duration: 10 }
    ],
    unlocks: ['troop_withdrawal'],
    risk: { type: 'opportunity', probability: 0.1 }
  }
];

export type { Choice };
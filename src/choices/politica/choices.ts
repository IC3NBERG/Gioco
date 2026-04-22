import { Choice } from '../../types';

export const POLITICS_CHOICES: Choice[] = [
  // LEGGI (25 scelte)
  {
    id: 'costituzione',
    name: 'Costituzione',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Scrivi la carta fondamentale',
    cost: { pa: 3, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'foundation', value: 40, duration: 30 },
      { type: 'immediate', target: 'legitimacy', value: 30, duration: 0 },
      { type: 'delayed', target: 'rigidity', value: 15, duration: 20 }
    ],
    requirements: { stability: 40 },
    unlocks: ['constitutional_rights'],
    risk: { type: 'contestation', probability: 0.2 }
  },
  {
    id: 'codice_civile',
    name: 'Codice Civile',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Unifica le leggi civili',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'legal_unity', value: 30, duration: 25 },
      { type: 'immediate', target: 'predictability', value: 25, duration: 0 }
    ],
    requirements: { gdp: 80 },
    unlocks: ['civil_code'],
    risk: { type: 'incompatibility', probability: 0.1 }
  },
  {
    id: 'codice_penale',
    name: 'Codice Penale',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Definisci i crimini',
    cost: { pa: 2, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'crime_definition', value: 30, duration: 25 },
      { type: 'immediate', target: 'justice', value: 20, duration: 0 }
    ],
    unlocks: ['criminal_code'],
    risk: { type: 'controversy', probability: 0.15 }
  },
  {
    id: 'diritto_lavoro',
    name: 'Legge sul Lavoro',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Regola i rapporti lavorativi',
    cost: { pa: 2, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'worker_rights', value: 30, duration: 20 },
      { type: 'delayed', target: 'productivity', value: 15, duration: 15 }
    ],
    requirements: { population: 40 },
    unlocks: ['labor_law'],
    risk: { type: 'business_resistance', probability: 0.15 }
  },
  {
    id: 'proprieta_intellettuale',
    name: 'Proprietà Intellettuale',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Protegge le idee',
    cost: { pa: 2, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'ip_protection', value: 35, duration: 25 },
      { type: 'immediate', target: 'innovation', value: 20, duration: 0 }
    ],
    requirements: { technology: 25 },
    unlocks: ['ip_law'],
    risk: { type: 'monopoly', probability: 0.1 }
  },
  {
    id: 'privacy',
    name: 'Legge Privacy',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Protegge i dati personali',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'privacy', value: 35, duration: 20 },
      { type: 'immediate', target: 'trust', value: 25, duration: 0 },
      { type: 'delayed', target: 'tech_industry', value: 15, duration: 15 }
    ],
    requirements: { technology: 30 },
    unlocks: ['privacy_law'],
    risk: { type: 'tech_industry_opposition', probability: 0.15 }
  },
  {
    id: 'ambiente',
    name: 'Legge Ambientale',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Protegge lambiente',
    cost: { pa: 2, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'environment_protection', value: 35, duration: 25 },
      { type: 'immediate', target: 'sustainability', value: 25, duration: 0 },
      { type: 'delayed', target: 'industry_cost', value: 20, duration: 15 }
    ],
    requirements: { gdp: 100 },
    unlocks: ['environmental_law'],
    risk: { type: 'industry_lobby', probability: 0.2 }
  },
  {
    id: 'stampa',
    name: 'Libertà di Stampa',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Libera informazione',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'press_freedom', value: 35, duration: 25 },
      { type: 'immediate', target: 'transparency', value: 25, duration: 0 }
    ],
    requirements: { consensus: 30 },
    unlocks: ['press_law'],
    risk: { type: 'misinformation', probability: 0.15 }
  },
  {
    id: 'culto',
    name: 'Libertà di Culto',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Religione libera',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'religious_freedom', value: 30, duration: 25 },
      { type: 'immediate', target: 'tolerance', value: 25, duration: 0 }
    ],
    unlocks: ['religious_law'],
    risk: { type: 'religious_tension', probability: 0.15 }
  },
  {
    id: 'riunione',
    name: 'Libertà di Riunione',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Manifestare liberamente',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'assembly_right', value: 30, duration: 20 },
      { type: 'immediate', target: 'protest_right', value: 25, duration: 0 }
    ],
    unlocks: ['assembly_rights'],
    risk: { type: 'unrest', probability: 0.15 }
  },
  {
    id: 'circolazione',
    name: 'Libertà di Circolazione',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Muoversi liberamente',
    cost: { pa: 1, resources: { money: 10 } },
    effects: [
      { type: 'immediate', target: 'movement_freedom', value: 30, duration: 20 },
      { type: 'immediate', target: 'tourism', value: 20, duration: 0 }
    ],
    unlocks: ['movement_rights'],
    risk: { type: 'illegal_immigration', probability: 0.15 }
  },
  {
    id: 'elezioni',
    name: 'Legge Elettorale',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Sistema di voto',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'electoral_system', value: 35, duration: 25 },
      { type: 'immediate', target: 'democracy', value: 25, duration: 0 }
    ],
    requirements: { ideology: 'democrazia' },
    unlocks: ['electoral_law'],
    risk: { type: 'manipulation', probability: 0.2 }
  },
  {
    id: 'partiti',
    name: 'Legge sui Partiti',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Regola partiti politici',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'party_regulation', value: 30, duration: 20 },
      { type: 'delayed', target: 'fragmentation', value: -15, duration: 15 }
    ],
    unlocks: ['party_law'],
    risk: { type: 'suppression', probability: 0.15 }
  },
  {
    id: 'sindacato_legge',
    name: 'Diritti Sindacali',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Legge sindacale',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'union_rights', value: 30, duration: 20 },
      { type: 'immediate', target: 'collective_bargaining', value: 25, duration: 0 }
    ],
    unlocks: ['union_law'],
    risk: { type: 'strike_disruption', probability: 0.1 }
  },
  {
    id: 'immigrazione_legge',
    name: 'Legge sull Immigrazione',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Regola flussi migratori',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'immigration_regulation', value: 30, duration: 20 },
      { type: 'immediate', target: 'control', value: 25, duration: 0 },
      { type: 'delayed', target: 'xenophobia', value: 10, duration: 15 }
    ],
    unlocks: ['immigration_law'],
    risk: { type: 'humanitarian_crisis', probability: 0.15 }
  },
  {
    id: 'droga',
    name: 'Legge sulla Droga',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Norme su stupefacenti',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'drug_policy', value: 30, duration: 20 },
      { type: 'delayed', target: 'addiction_rate', value: -15, duration: 15 }
    ],
    unlocks: ['drug_law'],
    risk: { type: 'controversy', probability: 0.2 }
  },
  {
    id: 'arme_legge',
    name: 'Legge sulle Armi',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Regola possesso armi',
    cost: { pa: 2, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'gun_control', value: 30, duration: 25 },
      { type: 'delayed', target: 'crime_rate', value: -15, duration: 15 }
    ],
    unlocks: ['gun_law'],
    risk: { type: 'lobby_opposition', probability: 0.2 }
  },
  {
    id: 'matrimonio',
    name: 'Matrimonio',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Definisci famiglia',
    cost: { pa: 2, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'family_definition', value: 30, duration: 25 },
      { type: 'delayed', target: 'family_structure', value: 15, duration: 20 }
    ],
    unlocks: ['family_law'],
    risk: { type: 'social_controversy', probability: 0.2 }
  },
  {
    id: 'istruzione_obbligo',
    name: 'Istruzione Obbligatoria',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Scuola obbligatoria',
    cost: { pa: 2, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'education_years', value: 30, duration: 25 },
      { type: 'immediate', target: 'literacy', value: 25, duration: 0 }
    ],
    requirements: { gdp: 60 },
    unlocks: ['education_requirement'],
    risk: { type: 'non_compliance', probability: 0.1 }
  },
  {
    id: 'sanita_pubblica',
    name: 'Sanità Pubblica',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Assistenza sanitaria universale',
    cost: { pa: 3, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'healthcare_access', value: 40, duration: 30 },
      { type: 'immediate', target: 'life_expectancy', value: 20, duration: 0 },
      { type: 'delayed', target: 'cost', value: 25, duration: 20 }
    ],
    requirements: { gdp: 120 },
    unlocks: ['universal_healthcare'],
    risk: { type: 'cost_overrun', probability: 0.2 }
  },
  {
    id: 'previdenza',
    name: 'Previdenza Sociale',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Pensioni pubbliche',
    cost: { pa: 2, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'pension_coverage', value: 35, duration: 30 },
      { type: 'immediate', target: 'elderly_care', value: 25, duration: 0 },
      { type: 'delayed', target: 'pension_fund', value: -20, duration: 20 }
    ],
    requirements: { gdp: 80 },
    unlocks: ['social_security'],
    risk: { type: 'funding_shortfall', probability: 0.25 }
  },
  {
    id: 'banca_centrale_autonoma',
    name: 'Banca Centrale Indipendente',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Autonomia monetaria',
    cost: { pa: 2, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'central_bank_independence', value: 35, duration: 30 },
      { type: 'immediate', target: 'inflation_control', value: 25, duration: 0 }
    ],
    requirements: { gdp: 100 },
    unlocks: ['independent_central_bank'],
    risk: { type: 'coordination', probability: 0.1 }
  },
  {
    id: 'antitrust',
    name: 'Legge Antitrust',
    category: 'politica',
    subcategory: 'leggi',
    description: 'Combatte monopoli',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'competition', value: 35, duration: 25 },
      { type: 'immediate', target: 'market_openness', value: 25, duration: 0 }
    ],
    requirements: { gdp: 80 },
    unlocks: ['antitrust_law'],
    risk: { type: 'corporate_lobby', probability: 0.15 }
  },

  // RIFORME (20 scelte)
  {
    id: 'riforma_agraria',
    name: 'Riforma Agraria',
    category: 'politica',
    subcategory: 'riforme',
    description: 'Ridistribuisci terre',
    cost: { pa: 3, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'land_reform', value: 40, duration: 10 },
      { type: 'immediate', target: 'farmer_wealth', value: 30, duration: 0 },
      { type: 'delayed', target: 'landowner_opposition', value: 30, duration: 15 }
    ],
    risk: { type: 'violence', probability: 0.3 }
  },
  {
    id: 'riforma_fiscale',
    name: 'Riforma Fiscale',
    category: 'politica',
    subcategory: 'riforme',
    description: 'Ristruttura tributi',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'tax_efficiency', value: 35, duration: 20 },
      { type: 'delayed', target: 'compliance', value: 20, duration: 15 }
    ],
    requirements: { gdp: 80 },
    risk: { type: 'protest', probability: 0.2 }
  },
  {
    id: 'riforma_sanitaria',
    name: 'Riforma Sanitaria',
    category: 'politica',
    subcategory: 'riforme',
    description: 'Cambia sistema salute',
    cost: { pa: 3, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'healthcare_reform', value: 40, duration: 25 },
      { type: 'immediate', target: 'efficiency', value: 25, duration: 0 }
    ],
    requirements: { gdp: 100 },
    risk: { type: 'lobby_opposition', probability: 0.2 }
  },
  {
    id: 'riforma_istruzione',
    name: 'Riforma Istruzione',
    category: 'politica',
    subcategory: 'riforme',
    description: 'Cambia scuola',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'education_reform', value: 35, duration: 25 },
      { type: 'delayed', target: 'skill_level', value: 25, duration: 20 }
    ],
    requirements: { technology: 20 },
    risk: { type: 'teacher_strike', probability: 0.15 }
  },
  {
    id: 'decentralizzazione',
    name: 'Decentralizzazione',
    category: 'politica',
    subcategory: 'riforme',
    description: 'Poteri locali',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'local_power', value: 35, duration: 25 },
      { type: 'immediate', target: 'responsiveness', value: 25, duration: 0 },
      { type: 'delayed', target: 'coordination', value: -15, duration: 15 }
    ],
    risk: { type: 'fragmentation', probability: 0.15 }
  },
  {
    id: 'centralizzazione',
    name: 'Centralizzazione',
    category: 'politica',
    subcategory: 'riforme',
    description: 'Poteri centrali',
    cost: { pa: 2, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'central_power', value: 40, duration: 25 },
      { type: 'immediate', target: 'efficiency', value: 25, duration: 0 },
      { type: 'delayed', target: 'local_responsiveness', value: -20, duration: 15 }
    ],
    risk: { type: 'rebellion', probability: 0.15 }
  },
  {
    id: 'privatizzazione',
    name: 'Privatizzazione',
    category: 'politica',
    subcategory: 'riforme',
    description: 'Vendi aziende pubbliche',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'privatization', value: 35, duration: 20 },
      { type: 'immediate', target: 'revenue', value: 30, duration: 0 },
      { type: 'delayed', target: 'service_quality', value: -15, duration: 15 }
    ],
    requirements: { gdp: 70 },
    risk: { type: 'monopoly', probability: 0.15 }
  },
  {
    id: 'nazionalizzazione',
    name: 'Nazionalizzazione',
    category: 'politica',
    subcategory: 'riforme',
    description: 'Compra aziende',
    cost: { pa: 3, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'nationalization', value: 40, duration: 25 },
      { type: 'immediate', target: 'state_control', value: 30, duration: 0 },
      { type: 'delayed', target: 'efficiency', value: -20, duration: 20 }
    ],
    risk: { type: 'capital_flight', probability: 0.25 }
  },
  {
    id: 'riforma_amministrativa',
    name: 'Riforma Amministrativa',
    category: 'politica',
    subcategory: 'riforme',
    description: 'Semplifica burocrazia',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'bureaucracy_reform', value: 35, duration: 20 },
      { type: 'immediate', target: 'efficiency', value: 25, duration: 0 },
      { type: 'delayed', target: 'cost', value: 15, duration: 15 }
    ],
    risk: { type: 'bureaucrat_resistance', probability: 0.15 }
  },
  {
    id: 'riforma_giudiziaria',
    name: 'Riforma Giudiziaria',
    category: 'politica',
    subcategory: 'riforme',
    description: 'Cambia sistema giustizia',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'judicial_reform', value: 35, duration: 25 },
      { type: 'immediate', target: 'speed', value: 25, duration: 0 }
    ],
    risk: { type: 'judge_resistance', probability: 0.15 }
  },
  {
    id: 'riforma_elettorale',
    name: 'Riforma Elettorale',
    category: 'politica',
    subcategory: 'riforme',
    description: 'Cambia sistema voto',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'electoral_reform', value: 35, duration: 25 },
      { type: 'immediate', target: 'representation', value: 25, duration: 0 }
    ],
    requirements: { ideology: 'democrazia' },
    risk: { type: 'manipulation', probability: 0.2 }
  },
  {
    id: 'riforma_militare',
    name: 'Riforma Militare',
    category: 'politica',
    subcategory: 'riforme',
    description: 'Modernizza forze armate',
    cost: { pa: 3, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'military_reform', value: 40, duration: 25 },
      { type: 'immediate', target: 'efficiency', value: 25, duration: 0 }
    ],
    requirements: { technology: 30 },
    risk: { type: 'resistance', probability: 0.15 }
  },
  {
    id: 'riforma_pENSION',
    name: 'Riforma Pensioni',
    category: 'politica',
    subcategory: 'riforme',
    description: 'Cambia pensioni',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'pension_reform', value: 35, duration: 25 },
      { type: 'delayed', target: 'cost', value: 20, duration: 15 }
    ],
    requirements: { gdp: 90 },
    risk: { type: 'elder_protest', probability: 0.25 }
  },
  {
    id: 'riforma_energetica',
    name: 'Riforma Energetica',
    category: 'politica',
    subcategory: 'riforme',
    description: 'Passa a rinnovabili',
    cost: { pa: 3, resources: { money: 90 } },
    effects: [
      { type: 'immediate', target: 'energy_reform', value: 40, duration: 30 },
      { type: 'immediate', target: 'environment', value: 25, duration: 0 },
      { type: 'delayed', target: 'cost', value: 15, duration: 20 }
    ],
    requirements: { technology: 40 },
    risk: { type: 'industry_pushback', probability: 0.2 }
  },
  {
    id: 'riforma_finanziamento',
    name: 'Riforma Finanziamento Partiti',
    category: 'politica',
    subcategory: 'riforme',
    description: 'Finanziamento trasparente',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'transparency', value: 35, duration: 25 },
      { type: 'immediate', target: 'corruption_reduction', value: 25, duration: 0 }
    ],
    risk: { type: 'party_resistance', probability: 0.15 }
  },
  {
    id: 'riforma_territoriale',
    name: 'Riforma Territoriale',
    category: 'politica',
    subcategory: 'riforme',
    description: 'Riorganizza regioni',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'territorial_reform', value: 35, duration: 25 },
      { type: 'immediate', target: 'efficiency', value: 20, duration: 0 }
    ],
    risk: { type: 'regional_resistance', probability: 0.2 }
  },
  {
    id: 'riforma_difesa',
    name: 'Riforma Difesa Civile',
    category: 'politica',
    subcategory: 'riforme',
    description: 'Difesa non militare',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'civil_defense', value: 35, duration: 25 },
      { type: 'immediate', target: 'total_defense', value: 25, duration: 0 }
    ],
    requirements: { population: 50 },
    risk: { type: 'militarist_opposition', probability: 0.15 }
  },
  {
    id: 'riforma_cittadinanza',
    name: 'Legge sulla Cittadinanza',
    category: 'politica',
    subcategory: 'riforme',
    description: 'Come ottenere cittadinanza',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'citizenship_rules', value: 35, duration: 25 },
      { type: 'delayed', target: 'integration', value: 20, duration: 15 }
    ],
    unlocks: ['citizenship_law'],
    risk: { type: 'nationalist_backlash', probability: 0.2 }
  },
  {
    id: 'riforma_asilo',
    name: 'Diritto d Asilo',
    category: 'politica',
    subcategory: 'riforme',
    description: 'Permetti richiedenti asilo',
    cost: { pa: 2, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'asylum_rights', value: 35, duration: 25 },
      { type: 'immediate', target: 'humanitarian', value: 25, duration: 0 },
      { type: 'delayed', target: 'integration_pressure', value: 15, duration: 15 }
    ],
    risk: { type: 'xenophobic_rise', probability: 0.2 }
  },

  // PROPAGANDA (15 scelte)
  {
    id: 'propaganda_1',
    name: 'Campagna Nazionalista',
    category: 'politica',
    subcategory: 'propaganda',
    description: 'Celebra la nazione',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'nationalism', value: 25, duration: 8 },
      { type: 'immediate', target: 'morale', value: 15, duration: 0 },
      { type: 'delayed', target: 'xenophobia', value: 10, duration: 10 }
    ],
    risk: { type: 'backlash', probability: 0.15 }
  },
  {
    id: 'propaganda_2',
    name: 'Propaganda del Terrore',
    category: 'politica',
    subcategory: 'propaganda',
    description: 'Minaccia nemico',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'fear', value: 25, duration: 5 },
      { type: 'immediate', target: 'unity', value: 20, duration: 0 }
    ],
    risk: { type: 'trauma', probability: 0.2 }
  },
  {
    id: 'propaganda_3',
    name: 'Storytelling',
    category: 'politica',
    subcategory: 'propaganda',
    description: 'Racconta una storia',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'narrative', value: 25, duration: 10 },
      { type: 'delayed', target: 'memory', value: 15, duration: 15 }
    ],
    risk: { type: 'disbelief', probability: 0.15 }
  },
  {
    id: 'propaganda_4',
    name: 'Symbolic',
    category: 'politica',
    subcategory: 'propaganda',
    description: 'Usa simboli potenti',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'symbolism', value: 25, duration: 15 },
      { type: 'immediate', target: 'identity', value: 20, duration: 0 }
    ],
    risk: { type: 'trivialization', probability: 0.1 }
  },
  {
    id: 'propaganda_5',
    name: 'Celebrazione',
    category: 'politica',
    subcategory: 'propaganda',
    description: 'Celebra successi',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'pride', value: 25, duration: 8 },
      { type: 'immediate', target: 'morale', value: 15, duration: 0 }
    ],
    risk: { type: 'exaggeration', probability: 0.1 }
  },
  {
    id: 'propaganda_6',
    name: 'Vittimismo',
    category: 'politica',
    subcategory: 'propaganda',
    description: 'Celebra sofferenze passate',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'victimhood', value: 25, duration: 10 },
      { type: 'delayed', target: 'resentment', value: 15, duration: 15 }
    ],
    risk: { type: 'division', probability: 0.15 }
  },
  {
    id: 'propaganda_7',
    name: 'Future',
    category: 'politica',
    subcategory: 'propaganda',
    description: 'Prometti futuro',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'hope', value: 25, duration: 8 },
      { type: 'immediate', target: 'morale', value: 15, duration: 0 },
      { type: 'delayed', target: 'disappointment', value: 20, duration: 10 }
    ],
    risk: { type: 'broken_promise', probability: 0.2 }
  },
  {
    id: 'propaganda_8',
    name: 'Enemy',
    category: 'politica',
    subcategory: 'propaganda',
    description: 'Mostra nemico',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'enemy_image', value: 25, duration: 8 },
      { type: 'delayed', target: 'hate', value: 15, duration: 10 }
    ],
    risk: { type: 'escalation', probability: 0.15 }
  },
  {
    id: 'propaganda_9',
    name: 'Unity',
    category: 'politica',
    subcategory: 'propaganda',
    description: 'Siamo uniti',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'unity', value: 30, duration: 10 },
      { type: 'immediate', target: 'morale', value: 15, duration: 0 }
    ],
    risk: { type: 'ignored', probability: 0.1 }
  },
  {
    id: 'propaganda_10',
    name: 'Glorificazione',
    category: 'politica',
    subcategory: 'propaganda',
    description: 'Celebra leadership',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'leadership_cult', value: 30, duration: 15 },
      { type: 'delayed', target: 'personality_cult', value: 20, duration: 15 }
    ],
    risk: { type: 'backlash', probability: 0.2 }
  },
  {
    id: 'propaganda_11',
    name: 'Progress',
    category: 'politica',
    subcategory: 'propaganda',
    description: 'Mostra progresso',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'progress_narrative', value: 25, duration: 10 },
      { type: 'immediate', target: 'pride', value: 15, duration: 0 }
    ],
    risk: { type: 'inequality_awareness', probability: 0.15 }
  },
  {
    id: 'propaganda_12',
    name: 'Media Control',
    category: 'politica',
    subcategory: 'propaganda',
    description: 'Controlla media',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'media_control', value: 40, duration: 20 },
      { type: 'delayed', target: 'alternative_media', value: 20, duration: 15 }
    ],
    requirements: { technology: 20 },
    risk: { type: 'censorship_backlash', probability: 0.25 }
  },
  {
    id: 'propaganda_13',
    name: 'Education',
    category: 'politica',
    subcategory: 'propaganda',
    description: 'Control education',
    cost: { pa: 2, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'education_control', value: 35, duration: 25 },
      { type: 'delayed', target: 'ideology', value: 25, duration: 20 }
    ],
    risk: { type: 'rebellion', probability: 0.15 }
  },
  {
    id: 'propaganda_14',
    name: 'Social Media',
    category: 'politica',
    subcategory: 'propaganda',
    description: 'Influenza social',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'social_influence', value: 35, duration: 15 },
      { type: 'immediate', target: 'online_presence', value: 25, duration: 0 }
    ],
    requirements: { technology: 30 },
    risk: { type: 'viral_backlash', probability: 0.2 }
  },
  {
    id: 'propaganda_15',
    name: 'Eventi Pubblici',
    category: 'politica',
    subcategory: 'propaganda',
    description: 'Organizza eventi',
    cost: { pa: 1, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'public_events', value: 30, duration: 10 },
      { type: 'immediate', target: 'morale', value: 15, duration: 0 }
    ],
    risk: { type: 'poor_organization', probability: 0.1 }
  },

  // CORRUZIONE (10 scelte)
  {
    id: 'corruzione_1',
    name: 'Tangenti',
    category: 'politica',
    subcategory: 'corruzione',
    description: 'Accept bribes',
    cost: { pa: 0, resources: { money: 0 } },
    effects: [
      { type: 'immediate', target: 'bribe_income', value: 20, duration: 3 },
      { type: 'delayed', target: 'corruption_level', value: 20, duration: 8 },
      { type: 'delayed', target: 'trust', value: -15, duration: 10 }
    ],
    risk: { type: 'investigation', probability: 0.25 }
  },
  {
    id: 'corruzione_2',
    name: 'Ne-potismo',
    category: 'politica',
    subcategory: 'corruzione',
    description: 'Assumi familiari',
    cost: { pa: 0, resources: { money: 0 } },
    effects: [
      { type: 'immediate', target: 'family_positions', value: 25, duration: 8 },
      { type: 'delayed', target: 'competence', value: -15, duration: 10 }
    ],
    risk: { type: 'scandal', probability: 0.2 }
  },
  {
    id: 'corruzione_3',
    name: 'Frode',
    category: 'politica',
    subcategory: 'corruzione',
    description: 'Fondi pubblici rubati',
    cost: { pa: 0, resources: { money: 0 } },
    effects: [
      { type: 'immediate', target: 'stolen_funds', value: 25, duration: 3 },
      { type: 'delayed', target: 'corruption', value: 25, duration: 8 }
    ],
    risk: { type: 'audit', probability: 0.25 }
  },
  {
    id: 'corruzione_4',
    name: 'Riciclaggio',
    category: 'politica',
    subcategory: 'corruzione',
    description: 'Pulisci denaro sporco',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'money_laundering', value: 30, duration: 5 },
      { type: 'delayed', target: 'crime_influence', value: 20, duration: 10 }
    ],
    risk: { type: 'investigation', probability: 0.3 }
  },
  {
    id: 'corruzione_5',
    name: 'Contrabbando',
    category: 'politica',
    subcategory: 'corruzione',
    description: 'Permetti contrabbando',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'contraband_income', value: 25, duration: 5 },
      { type: 'delayed', target: 'crime_syndicates', value: 25, duration: 10 }
    ],
    risk: { type: 'crackdown', probability: 0.2 }
  },
  {
    id: 'corruzione_6',
    name: 'Extortion',
    category: 'politica',
    subcategory: 'corruzione',
    description: 'Estorci pagamenti',
    cost: { pa: 0, resources: { money: 0 } },
    effects: [
      { type: 'immediate', target: 'extortion_income', value: 20, duration: 3 },
      { type: 'delayed', target: 'fear', value: 20, duration: 8 }
    ],
    risk: { type: 'revolt', probability: 0.25 }
  },
  {
    id: 'corruzione_7',
    name: 'Embezzlement',
    category: 'politica',
    subcategory: 'corruzione',
    description: 'Appropriazione indebita',
    cost: { pa: 0, resources: { money: 0 } },
    effects: [
      { type: 'immediate', target: 'embezzlement', value: 20, duration: 3 },
      { type: 'delayed', target: 'corruption', value: 20, duration: 8 }
    ],
    risk: { type: 'discovery', probability: 0.25 }
  },
  {
    id: 'corruzione_8',
    name: 'Bid Rigging',
    category: 'politica',
    subcategory: 'corruzione',
    description: 'Froda appalti',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'rigged_contracts', value: 25, duration: 5 },
      { type: 'delayed', target: 'corruption', value: 15, duration: 10 }
    ],
    risk: { type: 'whistleblower', probability: 0.2 }
  },
  {
    id: 'corruzione_9',
    name: 'Fast-track',
    category: 'politica',
    subcategory: 'corruzione',
    description: 'Accelera pratiche a pagamento',
    cost: { pa: 0, resources: { money: 0 } },
    effects: [
      { type: 'immediate', target: 'speed_income', value: 15, duration: 3 },
      { type: 'delayed', target: 'corruption', value: 15, duration: 8 }
    ],
    risk: { type: 'exposure', probability: 0.2 }
  },
  {
    id: 'corruzione_10',
    name: 'Insider Trading',
    category: 'politica',
    subcategory: 'corruzione',
    description: 'Commercia con info',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'insider_profit', value: 25, duration: 3 },
      { type: 'delayed', target: 'market_impact', value: 20, duration: 8 }
    ],
    requirements: { technology: 20 },
    risk: { type: 'investigation', probability: 0.25 }
  }
];

export type { Choice };
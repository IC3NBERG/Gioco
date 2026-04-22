import { Choice } from '../../types';

export const DIPLOMACY_CHOICES: Choice[] = [
  // TRATTATI (30 scelte)
  {
    id: 'trattato_amico',
    name: 'Trattato di Amicizia',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Patto damicizia permanente',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'friendship', value: 35, duration: 30 },
      { type: 'immediate', target: 'trust', value: 25, duration: 0 }
    ],
    requirements: { diplomacy: 20, relation: 20 },
    risk: { type: 'change_of_heart', probability: 0.15 }
  },
  {
    id: 'trattato_commercio',
    name: 'Trattato Commerciale',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Accordo commerciale',
    cost: { pa: 2, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'trade_deal', value: 35, duration: 25 },
      { type: 'immediate', target: 'economic_bond', value: 25, duration: 0 }
    ],
    requirements: { gdp: 50 },
    risk: { type: 'economic_dispute', probability: 0.15 }
  },
  {
    id: 'trattato_non_aggressione',
    name: 'Patto di Non Aggressione',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Non attaccarsi mai',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'non_aggression', value: 40, duration: 30 },
      { type: 'immediate', target: 'security', value: 20, duration: 0 }
    ],
    requirements: { relation: 10 },
    risk: { type: 'violation', probability: 0.2 }
  },
  {
    id: 'alleanza_difensiva',
    name: 'Alleanza Difensiva',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Difesa reciproca',
    cost: { pa: 3, resources: { money: 60 } },
    effects: [
      { type: 'immediate', target: 'defensive_alliance', value: 45, duration: 30 },
      { type: 'immediate', target: 'security', value: 30, duration: 0 },
      { type: 'delayed', target: 'obligation', value: 20, duration: 20 }
    ],
    requirements: { diplomacy: 30, relation: 30 },
    risk: { type: 'entrapment', probability: 0.25 }
  },
  {
    id: 'alleanza_offensiva',
    name: 'Alleanza Offensiva',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Attacco congiunto',
    cost: { pa: 3, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'offensive_alliance', value: 45, duration: 20 },
      { type: 'immediate', target: 'military_cooperation', value: 30, duration: 0 }
    ],
    requirements: { military: 40, alliance: 1 },
    risk: { type: 'escalation', probability: 0.3 }
  },
  {
    id: 'trattato_cultura',
    name: 'Trattato Cultural',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Scambio culturale',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'cultural_exchange', value: 30, duration: 25 },
      { type: 'immediate', target: 'soft_power', value: 20, duration: 0 }
    ],
    requirements: { culture: 20 },
    risk: { type: 'cultural_clash', probability: 0.1 }
  },
  {
    id: 'trattato_tecnologia',
    name: 'Scambio Tecnologico',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Condivisione tech',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'tech_sharing', value: 35, duration: 20 },
      { type: 'immediate', target: 'innovation', value: 20, duration: 0 }
    ],
    requirements: { technology: 30 },
    risk: { type: 'spying', probability: 0.15 }
  },
  {
    id: 'trattato_scienza',
    name: 'Cooperazione Scientifica',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Ricerca congiunta',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'scientific_cooperation', value: 35, duration: 25 },
      { type: 'immediate', target: 'research', value: 25, duration: 0 }
    ],
    requirements: { technology: 25 },
    risk: { type: 'brain_drain', probability: 0.1 }
  },
  {
    id: 'trattato_pesca',
    name: 'Accordo di Pesca',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Zone di pesca condivise',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'fishing_rights', value: 30, duration: 20 },
      { type: 'immediate', target: 'coastal_relation', value: 20, duration: 0 }
    ],
    requirements: { coastline: true },
    risk: { type: 'overfishing', probability: 0.1 }
  },
  {
    id: 'trattato_acqua',
    name: 'Gestione Acque',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Condivisione fiumi',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'water_management', value: 30, duration: 30 },
      { type: 'immediate', target: 'cooperation', value: 25, duration: 0 }
    ],
    requirements: { relation: 10 },
    risk: { type: 'pollution', probability: 0.1 }
  },
  {
    id: 'trattato_frontiera',
    name: 'Delimitazione Frontiera',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Definisci confini',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'border_agreement', value: 35, duration: 30 },
      { type: 'immediate', target: 'stability', value: 25, duration: 0 }
    ],
    requirements: { territory: 10 },
    risk: { type: 'dispute', probability: 0.15 }
  },
  {
    id: 'trattato_espatri',
    name: 'Trattato Lavoratori',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Lavoratori allestero',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'labor_mobility', value: 30, duration: 20 },
      { type: 'immediate', target: 'workers_rights', value: 20, duration: 0 }
    ],
    requirements: { relation: 15 },
    risk: { type: 'immigration_pressure', probability: 0.15 }
  },
  {
    id: 'trattato_crime',
    name: 'Cooperazione Giudiziaria',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Extradizione',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'judicial_cooperation', value: 35, duration: 25 },
      { type: 'immediate', target: 'crime_fighting', value: 25, duration: 0 }
    ],
    requirements: { stability: 25 },
    risk: { type: 'human_rights_concern', probability: 0.15 }
  },
  {
    id: 'trattato_fiscale',
    name: 'Accordo Fiscale',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Evita doppia tassazione',
    cost: { pa: 2, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'tax_agreement', value: 30, duration: 25 },
      { type: 'immediate', target: 'investment', value: 20, duration: 0 }
    ],
    requirements: { gdp: 60 },
    risk: { type: 'loophole', probability: 0.1 }
  },
  {
    id: 'trattato_energia',
    name: 'Cooperazione Energetica',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Energia condivisa',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'energy_cooperation', value: 35, duration: 25 },
      { type: 'immediate', target: 'energy_security', value: 25, duration: 0 }
    ],
    requirements: { energy: 20 },
    risk: { type: 'supply_disruption', probability: 0.15 }
  },
  {
    id: 'trattato_spazio',
    name: 'Cooperazione Spaziale',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Programma spaziale congiunto',
    cost: { pa: 3, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'space_cooperation', value: 40, duration: 30 },
      { type: 'immediate', target: 'prestige', value: 25, duration: 0 }
    ],
    requirements: { space: 20 },
    risk: { type: 'technological_dispute', probability: 0.15 }
  },
  {
    id: 'trattato_mare',
    name: 'Legge del Mare',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Diritti marini',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'maritime_rights', value: 30, duration: 30 },
      { type: 'immediate', target: 'naval_cooperation', value: 20, duration: 0 }
    ],
    requirements: { coastline: true },
    risk: { type: 'piracy', probability: 0.1 }
  },
  {
    id: 'trattato_armi',
    name: 'Controllo Armi',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Limitazione armamenti',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'arms_control', value: 35, duration: 25 },
      { type: 'immediate', target: 'trust', value: 20, duration: 0 }
    ],
    requirements: { military: 30 },
    risk: { type: 'cheating', probability: 0.2 }
  },
  {
    id: 'trattato_ambiente',
    name: 'Accordo Ambientale',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Protezione ambiente',
    cost: { pa: 2, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'environmental_cooperation', value: 35, duration: 30 },
      { type: 'immediate', target: 'reputation', value: 25, duration: 0 }
    ],
    risk: { type: 'non_compliance', probability: 0.15 }
  },
  {
    id: 'trattato_sanita',
    name: 'Cooperazione Sanitaria',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Salute condivisa',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'health_cooperation', value: 35, duration: 25 },
      { type: 'immediate', target: 'pandemic_response', value: 25, duration: 0 }
    ],
    requirements: { health: 20 },
    risk: { type: 'infection_spread', probability: 0.1 }
  },
  {
    id: 'trattato_istruzione',
    name: 'Scambio Studenti',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Programmi STUDIO',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'student_exchange', value: 30, duration: 20 },
      { type: 'immediate', target: 'cultural_bond', value: 20, duration: 0 }
    ],
    requirements: { education: 15 },
    risk: { type: 'brain_drain', probability: 0.1 }
  },
  {
    id: 'trattato_sicurezza',
    name: 'Intelligence Condivisa',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Condividi info',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'intelligence_sharing', value: 40, duration: 20 },
      { type: 'immediate', target: 'security', value: 25, duration: 0 }
    ],
    requirements: { intelligence: 20 },
    risk: { type: 'leak', probability: 0.25 }
  },
  {
    id: 'trattato_nucleare',
    name: 'Trattato Nucleare',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Non proliferazione',
    cost: { pa: 3, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'nuclear_control', value: 45, duration: 40 },
      { type: 'immediate', target: 'international_trust', value: 30, duration: 0 }
    ],
    requirements: { nuclear: true },
    risk: { type: 'proliferation', probability: 0.2 }
  },
  {
    id: 'trattato_comprehensive',
    name: 'Trattato Omnibus',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Accordo大全',
    cost: { pa: 3, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'comprehensive_deal', value: 50, duration: 40 },
      { type: 'immediate', target: 'all_aspects', value: 35, duration: 0 }
    ],
    requirements: { diplomacy: 40, relation: 40 },
    risk: { type: 'complexity', probability: 0.15 }
  },
  {
    id: 'trattato_terminato',
    name: 'Rinnova Trattato',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Estendi accordo',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'renewal', value: 30, duration: 25 },
      { type: 'immediate', target: 'continuity', value: 25, duration: 0 }
    ],
    requirements: { existing_treaty: 1 },
    risk: { type: 'renegotiation', probability: 0.1 }
  },
  {
    id: 'trattato_termina',
    name: 'Termina Trattato',
    category: 'diplomazia',
    subcategory: 'trattati',
    description: 'Cancella accordo',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'termination', value: 25, duration: 3 },
      { type: 'delayed', target: 'relation_damage', value: 25, duration: 10 }
    ],
    requirements: { existing_treaty: 1 },
    risk: { type: 'diplomatic_incident', probability: 0.2 }
  },

  // RELAZIONI (25 scelte)
  {
    id: 'relazione_inizia',
    name: 'Approccio Diplomatico',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Inizia relazione',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'first_contact', value: 25, duration: 10 },
      { type: 'immediate', target: 'opening', value: 20, duration: 0 }
    ],
    requirements: { relation: -10 },
    risk: { type: 'rejection', probability: 0.2 }
  },
  {
    id: 'relazione_summit',
    name: 'Summit',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Incontro al vertice',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'summit_bonus', value: 35, duration: 15 },
      { type: 'immediate', target: 'photo_opportunity', value: 25, duration: 0 }
    ],
    requirements: { diplomacy: 15 },
    risk: { type: 'no_agreement', probability: 0.15 }
  },
  {
    id: 'relazione_ambasciata',
    name: 'Apri Ambasciata',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Rappresentanza permanente',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'embassy', value: 35, duration: 30 },
      { type: 'immediate', target: 'direct_contact', value: 25, duration: 0 }
    ],
    requirements: { gdp: 60 },
    risk: { type: 'incident', probability: 0.1 }
  },
  {
    id: 'relazione_embassy_close',
    name: 'Chiudi Ambasciata',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Richiama ambasciatore',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'embassy_closure', value: 25, duration: 3 },
      { type: 'delayed', target: 'relation_damage', value: 20, duration: 10 }
    ],
    requirements: { embassy_status: 1 },
    risk: { type: 'escalation', probability: 0.15 }
  },
  {
    id: 'relazione_state_visit',
    name: 'Visita di Stato',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Leader visita leader',
    cost: { pa: 3, resources: { money: 70 } },
    effects: [
      { type: 'immediate', target: 'state_visit_impact', value: 45, duration: 20 },
      { type: 'immediate', target: 'prestige', value: 25, duration: 0 }
    ],
    requirements: { diplomacy: 25, relation: 20 },
    risk: { type: 'protocol_incident', probability: 0.15 }
  },
  {
    id: 'relazione_sport',
    name: 'Cooperazione Sportiva',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Eventi sportivi',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'sports_cooperation', value: 30, duration: 15 },
      { type: 'immediate', target: 'people_bond', value: 20, duration: 0 }
    ],
    risk: { type: 'sports_rivalry', probability: 0.1 }
  },
  {
    id: 'relazione_gemellaggio',
    name: 'Gemellaggio Città',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Città gemellate',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'city_twinning', value: 25, duration: 20 },
      { type: 'immediate', target: 'local_bond', value: 20, duration: 0 }
    ],
    risk: { type: 'negligence', probability: 0.1 }
  },
  {
    id: 'relazione_filosofia',
    name: 'Dialogo Filosofico',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Scambio idee',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'philosophical_exchange', value: 25, duration: 15 },
      { type: 'immediate', target: 'understanding', value: 20, duration: 0 }
    ],
    risk: { type: 'fundamental_disagreement', probability: 0.1 }
  },
  {
    id: 'relazione_solidarieta',
    name: 'Esprimi Solidarietà',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Supporto pubblico',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'solidarity', value: 30, duration: 10 },
      { type: 'immediate', target: 'moral_support', value: 20, duration: 0 }
    ],
    risk: { type: 'insincere', probability: 0.1 }
  },
  {
    id: 'relazione_condoglianze',
    name: 'Condoglianze',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Disaster support',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'condolence_support', value: 30, duration: 10 },
      { type: 'immediate', target: 'empathy', value: 25, duration: 0 }
    ],
    risk: { type: 'insincere', probability: 0.1 }
  },
  {
    id: 'relazione_congratula',
    name: 'Congratulazioni',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Celebra successo',
    cost: { pa: 1, resources: { money: 10 } },
    effects: [
      { type: 'immediate', target: 'congratulation', value: 25, duration: 8 },
      { type: 'immediate', target: 'goodwill', value: 20, duration: 0 }
    ],
    risk: { type: 'jealousy', probability: 0.05 }
  },
  {
    id: 'relazione_scuse',
    name: 'Scuse Ufficiali',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Chiedi scusa',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'apology', value: 30, duration: 15 },
      { type: 'immediate', target: 'restoration', value: 25, duration: 0 }
    ],
    requirements: { mistake_made: 1 },
    risk: { type: 'insufficient', probability: 0.15 }
  },
  {
    id: 'relazione_protesta',
    name: 'Protesta Ufficiale',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Esprimi disappunto',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'official_complaint', value: 30, duration: 5 },
      { type: 'delayed', target: 'relation_tension', value: 20, duration: 10 }
    ],
    requirements: { grievance: 1 },
    risk: { type: 'escalation', probability: 0.2 }
  },
  {
    id: 'relazione_minaccia',
    name: 'Minaccia Ufficiale',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Avvertimento duro',
    cost: { pa: 2, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'official_threat', value: 35, duration: 5 },
      { type: 'delayed', target: 'escalation_risk', value: 30, duration: 10 }
    ],
    requirements: { serious_grievance: 1 },
    risk: { type: 'breakdown', probability: 0.35 }
  },
  {
    id: 'relazione_ritiro_ambasciatore',
    name: 'Ritiro Ambasciatore',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Torna a casa',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'recall_ambassador', value: 30, duration: 3 },
      { type: 'delayed', target: 'cooling_period', value: 25, duration: 15 }
    ],
    requirements: { embassy_status: 1 },
    risk: { type: 'permanent_damage', probability: 0.2 }
  },
  {
    id: 'relazione_chiamata',
    name: 'Telefonata',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Chiama leader',
    cost: { pa: 1, resources: { money: 10 } },
    effects: [
      { type: 'immediate', target: 'phone_call', value: 20, duration: 3 },
      { type: 'immediate', target: 'direct_channel', value: 15, duration: 0 }
    ],
    risk: { type: 'eavesdropping', probability: 0.1 }
  },
  {
    id: 'relazione_invito',
    name: 'Invito Ufficiale',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Invita leader',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'official_invitation', value: 25, duration: 8 },
      { type: 'immediate', target: 'hospitality', value: 20, duration: 0 }
    ],
    risk: { type: 'refusal', probability: 0.15 }
  },
  {
    id: 'relazione_rifiuto',
    name: 'Rifiuto Invito',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Declina invito',
    cost: { pa: 1, resources: { money: 5 } },
    effects: [
      { type: 'immediate', target: 'refusal', value: 15, duration: 3 },
      { type: 'delayed', target: 'cooling', value: 15, duration: 8 }
    ],
    risk: { type: 'offense', probability: 0.15 }
  },
  {
    id: 'relazione_business',
    name: 'Missione Commerciale',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Business insieme',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'business_mission', value: 30, duration: 10 },
      { type: 'immediate', target: 'trade_potential', value: 25, duration: 0 }
    ],
    requirements: { gdp: 40 },
    risk: { type: 'no_deal', probability: 0.15 }
  },
  {
    id: 'relazione_chiesa',
    name: 'Dialogo Religioso',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Leader religiosi',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'religious_dialogue', value: 25, duration: 15 },
      { type: 'immediate', target: 'spiritual_bond', value: 20, duration: 0 }
    ],
    requirements: { religion: 1 },
    risk: { type: 'doctrinal_clash', probability: 0.15 }
  },
  {
    id: 'relazione_esportazione',
    name: 'Esporta Valori',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Diffondi ideali',
    cost: { pa: 2, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'value_export', value: 30, duration: 15 },
      { type: 'delayed', target: 'influence', value: 20, duration: 15 }
    ],
    requirements: { culture: 20 },
    risk: { type: 'cultural_imperialism_accusation', probability: 0.2 }
  },
  {
    id: 'relazione_stampa',
    name: 'Intervista Stampa',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Intervista congiunta',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'press_interview', value: 25, duration: 5 },
      { type: 'immediate', target: 'publicity', value: 20, duration: 0 }
    ],
    risk: { type: 'misquote', probability: 0.15 }
  },
  {
    id: 'relazione_alleato',
    name: 'Chiama Alleato',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Richiedi aiuto',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'call_for_help', value: 25, duration: 5 },
      { type: 'immediate', target: 'alliance_invocation', value: 20, duration: 0 }
    ],
    requirements: { alliance: 1 },
    risk: { type: 'refusal', probability: 0.2 }
  },
  {
    id: 'relazione_neutrale',
    name: 'Neutralità',
    category: 'diplomazia',
    subcategory: 'relazioni',
    description: 'Non schierarsi',
    cost: { pa: 1, resources: { money: 10 } },
    effects: [
      { type: 'immediate', target: 'neutrality', value: 30, duration: 20 },
      { type: 'immediate', target: 'non_alignment', value: 25, duration: 0 }
    ],
    risk: { type: 'pressure', probability: 0.15 }
  },

  // SANZIONI (20 scelte)
  {
    id: 'sanctions_economiche',
    name: 'Sanzioni Economiche',
    category: 'diplomazia',
    subcategory: 'sanzioni',
    description: 'Blocca commercio',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'economic_sanctions', value: 35, duration: 15 },
      { type: 'delayed', target: 'economic_damage', value: 30, duration: 15 }
    ],
    requirements: { diplomatic_reason: 1 },
    risk: { type: 'retaliation', probability: 0.25 }
  },
  {
    id: 'sanctions_travel',
    name: 'Divieto Viaggio',
    category: 'diplomazia',
    subcategory: 'sanzioni',
    description: 'Stop ai cittadini',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'travel_ban', value: 30, duration: 15 },
      { type: 'immediate', target: 'tourism_impact', value: 20, duration: 0 }
    ],
    risk: { type: 'humanitarian_crisis', probability: 0.15 }
  },
  {
    id: 'sanctions_asset',
    name: 'Freeze Asset',
    category: 'diplomazia',
    subcategory: 'sanzioni',
    description: 'Blocca beni',
    cost: { pa: 2, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'asset_freeze', value: 35, duration: 15 },
      { type: 'immediate', target: 'financial_pressure', value: 25, duration: 0 }
    ],
    requirements: { financial_evidence: 1 },
    risk: { type: 'financial_countermeasures', probability: 0.2 }
  },
  {
    id: 'sanctions_diplomatica',
    name: 'Espulsione Diplomatici',
    category: 'diplomazia',
    subcategory: 'sanzioni',
    description: 'Via ambasciatori',
    cost: { pa: 2, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'expulsion', value: 35, duration: 5 },
      { type: 'delayed', target: 'diplomatic_isolation', value: 30, duration: 15 }
    ],
    requirements: { serious_incident: 1 },
    risk: { type: 'escalation', probability: 0.3 }
  },
  {
    id: 'sanctions_weapon',
    name: 'Embargo Armi',
    category: 'diplomazia',
    subcategory: 'sanzioni',
    description: 'Stop armi',
    cost: { pa: 2, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'arms_embargo', value: 35, duration: 20 },
      { type: 'immediate', target: 'military_supply', value: -25, duration: 0 }
    ],
    requirements: { conflict_zone: 1 },
    risk: { type: 'smuggling', probability: 0.2 }
  },
  {
    id: 'sanctions_tech',
    name: 'Sanzioni Tecnologiche',
    category: 'diplomazia',
    subcategory: 'sanzioni',
    description: 'No tech avanzata',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'tech_sanctions', value: 35, duration: 20 },
      { type: 'immediate', target: 'technology_gap', value: 25, duration: 0 }
    ],
    requirements: { technology: 30 },
    risk: { type: 'indigenous_development', probability: 0.15 }
  },
  {
    id: 'sanctions_spiritual',
    name: 'Sanzioni Spirituali',
    category: 'diplomazia',
    subcategory: 'sanzioni',
    description: 'Excommunication',
    cost: { pa: 2, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'spiritual_sanction', value: 35, duration: 20 },
      { type: 'immediate', target: 'religious_impact', value: 25, duration: 0 }
    ],
    requirements: { theocracy: 1 },
    risk: { type: 'religious_backlash', probability: 0.25 }
  },
  {
    id: 'sanctions_silenzio',
    name: 'Ignora',
    category: 'diplomazia',
    subcategory: 'sanzioni',
    description: 'Ignora completamente',
    cost: { pa: 0, resources: { money: 0 } },
    effects: [
      { type: 'immediate', target: 'ignore', value: 20, duration: 10 },
      { type: 'delayed', target: 'snub', value: 15, duration: 15 }
    ],
    risk: { type: 'perceived_weakness', probability: 0.1 }
  }
];

export type { Choice };
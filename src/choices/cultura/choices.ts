import { Choice } from '../../types';

export const CULTURE_CHOICES: Choice[] = [
  // ISTRUZIONE (15 scelte)
  {
    id: 'istruzione_1',
    name: 'Scuola Elementare',
    category: 'cultura',
    subcategory: 'istruzione',
    description: 'Istruzione base per tutti',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'literacy', value: 40, duration: 30 },
      { type: 'immediate', target: 'education_base', value: 35, duration: 0 }
    ],
    requirements: { gdp: 40 },
    risk: { type: 'cost', probability: 0.1 }
  },
  {
    id: 'istruzione_2',
    name: 'Scuola Secondaria',
    category: 'cultura',
    subcategory: 'istruzione',
    description: 'Istruzione media',
    cost: { pa: 2, resources: { money: 55 } },
    effects: [
      { type: 'immediate', target: 'secondary_education', value: 40, duration: 30 },
      { type: 'immediate', target: 'skills', value: 30, duration: 0 }
    ],
    requirements: { literacy: 50 },
    risk: { type: 'dropout', probability: 0.15 }
  },
  {
    id: 'istruzione_3',
    name: 'Università Pubblica',
    category: 'cultura',
    subcategory: 'istruzione',
    description: 'Accesso universitario',
    cost: { pa: 3, resources: { money: 80 } },
    effects: [
      { type: 'immediate', target: 'university_access', value: 45, duration: 40 },
      { type: 'immediate', target: 'higher_education', value: 35, duration: 0 }
    ],
    requirements: { gdp: 80 },
    risk: { type: 'cost_overrun', probability: 0.15 }
  },
  {
    id: 'istruzione_4',
    name: 'Scuola Tecnica',
    category: 'cultura',
    subcategory: 'istruzione',
    description: 'Formazione professionale',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'technical_school', value: 40, duration: 30 },
      { type: 'immediate', target: 'workforce_skills', value: 35, duration: 0 }
    ],
    requirements: { secondary_education: 30 },
    risk: { type: 'mismatch', probability: 0.15 }
  },
  {
    id: 'istruzione_5',
    name: 'Scuola Online',
    category: 'cultura',
    subcategory: 'istruzione',
    description: 'E-learning',
    cost: { pa: 2, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'online_education', value: 35, duration: 25 },
      { type: 'immediate', target: 'accessibility', value: 30, duration: 0 }
    ],
    requirements: { technology: 20 },
    risk: { type: 'quality', probability: 0.2 }
  },
  {
    id: 'istruzione_6',
    name: 'Borse di Studio',
    category: 'cultura',
    subcategory: 'istruzione',
    description: 'Supporto studenti',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'scholarships', value: 40, duration: 30 },
      { type: 'immediate', target: 'access', value: 35, duration: 0 }
    ],
    requirements: { university_access: 20 },
    risk: { type: 'budget', probability: 0.1 }
  },
  {
    id: 'istruzione_7',
    name: 'Scuola Privata',
    category: 'cultura',
    subcategory: 'istruzione',
    description: 'Sistema privato',
    cost: { pa: 1, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'private_schools', value: 35, duration: 25 },
      { type: 'immediate', target: 'choice', value: 30, duration: 0 }
    ],
    risk: { type: 'inequality', probability: 0.15 }
  },
  {
    id: 'istruzione_8',
    name: 'Curriculum Nazionale',
    category: 'cultura',
    subcategory: 'istruzione',
    description: 'Programma unificato',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'national_curriculum', value: 40, duration: 40 },
      { type: 'immediate', target: 'standardization', value: 35, duration: 0 }
    ],
    risk: { type: 'ideological', probability: 0.15 }
  },
  {
    id: 'istruzione_9',
    name: 'Educazione Civica',
    category: 'cultura',
    subcategory: 'istruzione',
    description: 'Insegnamento cittadinanza',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'civic_education', value: 35, duration: 30 },
      { type: 'immediate', target: 'citizenship', value: 30, duration: 0 }
    ],
    risk: { type: 'controversy', probability: 0.1 }
  },
  {
    id: 'istruzione_10',
    name: 'Programmi STEM',
    category: 'cultura',
    subcategory: 'istruzione',
    description: 'Scienza e tecnologia',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'stem_education', value: 40, duration: 30 },
      { type: 'immediate', target: 'tech_talent', value: 35, duration: 0 }
    ],
    requirements: { technology: 20 },
    risk: { type: 'gender_gap', probability: 0.15 }
  },
  {
    id: 'istruzione_11',
    name: 'Programmi Art',
    category: 'cultura',
    subcategory: 'istruzione',
    description: 'Arte e creatività',
    cost: { pa: 1, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'arts_education', value: 35, duration: 25 },
      { type: 'immediate', target: 'creativity', value: 30, duration: 0 }
    ],
    risk: { type: 'budget', probability: 0.1 }
  },
  {
    id: 'istruzione_12',
    name: 'Educazione Religiosa',
    category: 'cultura',
    subcategory: 'istruzione',
    description: 'Istruzione religiosa',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'religious_education', value: 35, duration: 30 },
      { type: 'immediate', target: 'faith', value: 30, duration: 0 }
    ],
    requirements: { theocracy: 1 },
    risk: { type: 'secular_backlash', probability: 0.15 }
  },
  {
    id: 'istruzione_13',
    name: 'Programmi Sport',
    category: 'cultura',
    subcategory: 'istruzione',
    description: 'Educazione fisica',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'physical_education', value: 35, duration: 25 },
      { type: 'immediate', target: 'health', value: 25, duration: 0 }
    ],
    risk: { type: 'injury', probability: 0.05 }
  },
  {
    id: 'istruzione_14',
    name: 'Programmi Lingua',
    category: 'cultura',
    subcategory: 'istruzione',
    description: 'Multilinguismo',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'language_programs', value: 35, duration: 25 },
      { type: 'immediate', target: 'globalization', value: 30, duration: 0 }
    ],
    risk: { type: 'identity_loss', probability: 0.1 }
  },
  {
    id: 'istruzione_15',
    name: 'Educazione Ambientale',
    category: 'cultura',
    subcategory: 'istruzione',
    description: 'Sostenibilità a scuola',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'environmental_education', value: 35, duration: 30 },
      { type: 'immediate', target: 'awareness', value: 30, duration: 0 }
    ],
    risk: { type: 'ideology', probability: 0.1 }
  },

  // RELIGIONE (20 scelte)
  {
    id: 'religione_1',
    name: 'Stato Laico',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Separazione chiesa-stato',
    cost: { pa: 2, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'secularism', value: 40, duration: 40 },
      { type: 'immediate', target: 'freedom', value: 35, duration: 0 }
    ],
    risk: { type: 'religious_backlash', probability: 0.2 }
  },
  {
    id: 'religione_2',
    name: 'Religione di Stato',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Religione ufficiale',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'state_religion', value: 45, duration: 40 },
      { type: 'immediate', target: 'unity', value: 30, duration: 0 }
    ],
    risk: { type: 'minority_oppression', probability: 0.25 }
  },
  {
    id: 'religione_3',
    name: 'Tolleranza Religiosa',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Tutte le fedi',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'religious_tolerance', value: 45, duration: 40 },
      { type: 'immediate', target: 'diversity', value: 35, duration: 0 }
    ],
    risk: { type: 'extremism', probability: 0.15 }
  },
  {
    id: 'religione_4',
    name: 'Conversione Forzata',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Obbliga fede',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'forced_conversion', value: 35, duration: 15 },
      { type: 'delayed', target: 'resistance', value: 40, duration: 20 }
    ],
    risk: { type: 'rebellion', probability: 0.4 }
  },
  {
    id: 'religione_5',
    name: 'Missioni',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Diffondi fede',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'missions', value: 40, duration: 30 },
      { type: 'immediate', target: 'expansion', value: 30, duration: 0 }
    ],
    risk: { type: 'cultural_clash', probability: 0.2 }
  },
  {
    id: 'religione_6',
    name: 'Inquisizione',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Polizia della fede',
    cost: { pa: 2, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'inquisition', value: 40, duration: 25 },
      { type: 'delayed', target: 'fear', value: 35, duration: 20 }
    ],
    risk: { type: 'mass_escape', probability: 0.3 }
  },
  {
    id: 'religione_7',
    name: 'Riforma Religiosa',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Cambia dottrina',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'religious_reform', value: 40, duration: 30 },
      { type: 'immediate', target: 'modernization', value: 30, duration: 0 }
    ],
    risk: { type: 'schism', probability: 0.25 }
  },
  {
    id: 'religione_8',
    name: 'Patto con Cler',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Stato-chiesa',
    cost: { pa: 2, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'church_pact', value: 40, duration: 30 },
      { type: 'immediate', target: 'legitimacy', value: 30, duration: 0 }
    ],
    risk: { type: 'clerical_power', probability: 0.2 }
  },
  {
    id: 'religione_9',
    name: 'Confessionalismo',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Religioni multiple',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'denominations', value: 35, duration: 30 },
      { type: 'immediate', target: 'diversity', value: 30, duration: 0 }
    ],
    risk: { type: 'tension', probability: 0.15 }
  },
  {
    id: 'religione_10',
    name: 'Secolarizzazione',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Declino religione',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'secularization', value: 40, duration: 40 },
      { type: 'immediate', target: 'rationalism', value: 30, duration: 0 }
    ],
    risk: { type: 'backlash', probability: 0.2 }
  },
  {
    id: 'religione_11',
    name: 'Nuova Religione',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Culto statale',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'state_cult', value: 45, duration: 30 },
      { type: 'immediate', target: 'loyalty', value: 35, duration: 0 }
    ],
    risk: { type: 'irrationality', probability: 0.25 }
  },
  {
    id: 'religione_12',
    name: 'Sincretismo',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Mescola fedi',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'syncretism', value: 35, duration: 30 },
      { type: 'immediate', target: 'tolerance', value: 30, duration: 0 }
    ],
    risk: { type: 'orthodox_protest', probability: 0.2 }
  },
  {
    id: 'religione_13',
    name: 'Culto Ancestrale',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Tradizioni antiche',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'ancestor_worship', value: 35, duration: 40 },
      { type: 'immediate', target: 'tradition', value: 30, duration: 0 }
    ],
    risk: { type: 'progress_blocked', probability: 0.15 }
  },
  {
    id: 'religione_14',
    name: 'Misticismo',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Spiritualità mistica',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'mysticism', value: 35, duration: 30 },
      { type: 'immediate', target: 'spirituality', value: 30, duration: 0 }
    ],
    risk: { type: 'irrational', probability: 0.15 }
  },
  {
    id: 'religione_15',
    name: 'Ateismo Organizzato',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Stato ateo',
    cost: { pa: 2, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'organized_atheism', value: 40, duration: 40 },
      { type: 'immediate', target: 'rationalism', value: 35, duration: 0 }
    ],
    risk: { type: 'religious_persecution', probability: 0.25 }
  },
  {
    id: 'religione_16',
    name: 'Pellegrinaggi',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Siti sacri',
    cost: { pa: 1, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'pilgrimages', value: 35, duration: 25 },
      { type: 'immediate', target: 'tourism', value: 25, duration: 0 }
    ],
    risk: { type: 'exploitation', probability: 0.1 }
  },
  {
    id: 'religione_17',
    name: 'Festività Pubbliche',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Giorni festivi',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'public_holidays', value: 35, duration: 30 },
      { type: 'immediate', target: 'culture', value: 25, duration: 0 }
    ],
    risk: { type: 'productivity_loss', probability: 0.1 }
  },
  {
    id: 'religione_18',
    name: 'Carità',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Opere pie',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'charity', value: 35, duration: 30 },
      { type: 'immediate', target: 'welfare', value: 25, duration: 0 }
    ],
    risk: { type: 'dependency', probability: 0.1 }
  },
  {
    id: 'religione_19',
    name: 'Clero Privilegiato',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Clero al potere',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'clerical_privilege', value: 40, duration: 30 },
      { type: 'immediate', target: 'church_power', value: 35, duration: 0 }
    ],
    risk: { type: 'corruption', probability: 0.2 }
  },
  {
    id: 'religione_20',
    name: 'Scientismo',
    category: 'cultura',
    subcategory: 'religione',
    description: 'Scienza come fede',
    cost: { pa: 2, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'scientism', value: 40, duration: 40 },
      { type: 'immediate', target: 'rationalism', value: 35, duration: 0 }
    ],
    requirements: { technology: 40 },
    risk: { type: 'faith_loss', probability: 0.2 }
  },

  // MEDIA (15 scelte)
  {
    id: 'media_1',
    name: 'Stampa Libera',
    category: 'cultura',
    subcategory: 'media',
    description: 'Giornalismo libero',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'free_press', value: 45, duration: 40 },
      { type: 'immediate', target: 'transparency', value: 35, duration: 0 }
    ],
    risk: { type: 'misinformation', probability: 0.2 }
  },
  {
    id: 'media_2',
    name: 'Censura',
    category: 'cultura',
    subcategory: 'media',
    description: 'Controllo media',
    cost: { pa: 1, resources: { money: 15 } },
    effects: [
      { type: 'immediate', target: 'censorship', value: 40, duration: 30 },
      { type: 'immediate', target: 'control', value: 35, duration: 0 }
    ],
    risk: { type: 'underground', probability: 0.25 }
  },
  {
    id: 'media_3',
    name: 'Televisione Pubblica',
    category: 'cultura',
    subcategory: 'media',
    description: 'RAI style',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'public_broadcasting', value: 45, duration: 40 },
      { type: 'immediate', target: 'national_identity', value: 35, duration: 0 }
    ],
    requirements: { gdp: 60 },
    risk: { type: 'bias', probability: 0.15 }
  },
  {
    id: 'media_4',
    name: 'Media Privati',
    category: 'cultura',
    subcategory: 'media',
    description: 'Multimedia privati',
    cost: { pa: 1, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'private_media', value: 40, duration: 35 },
      { type: 'immediate', target: 'diversity', value: 30, duration: 0 }
    ],
    risk: { type: 'monopoly', probability: 0.2 }
  },
  {
    id: 'media_5',
    name: 'Social Media',
    category: 'cultura',
    subcategory: 'media',
    description: 'Piattaforme online',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'social_media', value: 50, duration: 40 },
      { type: 'immediate', target: 'connectivity', value: 35, duration: 0 }
    ],
    requirements: { technology: 30 },
    risk: { type: 'misinformation', probability: 0.3 }
  },
  {
    id: 'media_6',
    name: 'Propaganda',
    category: 'cultura',
    subcategory: 'media',
    description: 'Media di stato',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'propaganda', value: 50, duration: 30 },
      { type: 'immediate', target: 'narrative', value: 40, duration: 0 }
    ],
    risk: { type: 'credibility_loss', probability: 0.25 }
  },
  {
    id: 'media_7',
    name: 'Fake News',
    category: 'cultura',
    subcategory: 'media',
    description: 'Disinformazione',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'fake_news', value: 40, duration: 15 },
      { type: 'delayed', target: 'trust_loss', value: 35, duration: 20 }
    ],
    risk: { type: 'exposure', probability: 0.3 }
  },
  {
    id: 'media_8',
    name: 'Giornalismo Investigativo',
    category: 'cultura',
    subcategory: 'media',
    description: 'Inchieste',
    cost: { pa: 2, resources: { money: 35 } },
    effects: [
      { type: 'immediate', target: 'investigative_journalism', value: 45, duration: 40 },
      { type: 'immediate', target: 'accountability', value: 35, duration: 0 }
    ],
    requirements: { free_press: 1 },
    risk: { type: 'intimidation', probability: 0.2 }
  },
  {
    id: 'media_9',
    name: 'Entertainment',
    category: 'cultura',
    subcategory: 'media',
    description: 'Intrattenimento',
    cost: { pa: 1, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'entertainment', value: 40, duration: 30 },
      { type: 'immediate', target: 'culture_industry', value: 30, duration: 0 }
    ],
    risk: { type: 'distraction', probability: 0.1 }
  },
  {
    id: 'media_10',
    name: 'Documentari',
    category: 'cultura',
    subcategory: 'media',
    description: 'Film documentari',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'documentaries', value: 35, duration: 30 },
      { type: 'immediate', target: 'education', value: 30, duration: 0 }
    ],
    risk: { type: 'controversy', probability: 0.15 }
  },
  {
    id: 'media_11',
    name: 'Cinema Nazionale',
    category: 'cultura',
    subcategory: 'media',
    description: 'Industria filmica',
    cost: { pa: 2, resources: { money: 45 } },
    effects: [
      { type: 'immediate', target: 'national_cinema', value: 40, duration: 35 },
      { type: 'immediate', target: 'soft_power', value: 30, duration: 0 }
    ],
    risk: { type: 'low_quality', probability: 0.15 }
  },
  {
    id: 'media_12',
    name: 'Radio',
    category: 'cultura',
    subcategory: 'media',
    description: 'Broadcasting radio',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'radio', value: 35, duration: 30 },
      { type: 'immediate', target: 'reach', value: 30, duration: 0 }
    ],
    risk: { type: 'interference', probability: 0.1 }
  },
  {
    id: 'media_13',
    name: 'Podcast',
    category: 'cultura',
    subcategory: 'media',
    description: 'Audio on demand',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'podcasts', value: 35, duration: 25 },
      { type: 'immediate', target: 'niche_content', value: 30, duration: 0 }
    ],
    requirements: { technology: 20 },
    risk: { type: 'regulation', probability: 0.1 }
  },
  {
    id: 'media_14',
    name: 'Gaming',
    category: 'cultura',
    subcategory: 'media',
    description: 'Videogame',
    cost: { pa: 1, resources: { money: 30 } },
    effects: [
      { type: 'immediate', target: 'gaming_industry', value: 40, duration: 30 },
      { type: 'immediate', target: 'culture_export', value: 30, duration: 0 }
    ],
    requirements: { technology: 25 },
    risk: { type: 'addiction', probability: 0.15 }
  },
  {
    id: 'media_15',
    name: 'News Aggregator',
    category: 'cultura',
    subcategory: 'media',
    description: 'Aggregatore notizie',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'news_aggregator', value: 35, duration: 25 },
      { type: 'immediate', target: 'convenience', value: 30, duration: 0 }
    ],
    requirements: { technology: 20 },
    risk: { type: 'filter_bubble', probability: 0.2 }
  },

  // TRADIZIONE (10 scelte)
  {
    id: 'tradizione_1',
    name: 'Patrimonio UNESCO',
    category: 'cultura',
    subcategory: 'tradizione',
    description: 'Siti storici',
    cost: { pa: 2, resources: { money: 40 } },
    effects: [
      { type: 'immediate', target: 'heritage', value: 45, duration: 50 },
      { type: 'immediate', target: 'tourism', value: 30, duration: 0 }
    ],
    risk: { type: 'overtourism', probability: 0.15 }
  },
  {
    id: 'tradizione_2',
    name: 'Festival Nazionale',
    category: 'cultura',
    subcategory: 'tradizione',
    description: 'Feste nazionali',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'national_festival', value: 40, duration: 30 },
      { type: 'immediate', target: 'unity', value: 30, duration: 0 }
    ],
    risk: { type: 'commercialization', probability: 0.1 }
  },
  {
    id: 'tradizione_3',
    name: 'Musei',
    category: 'cultura',
    subcategory: 'tradizione',
    description: 'Musei nazionali',
    cost: { pa: 2, resources: { money: 50 } },
    effects: [
      { type: 'immediate', target: 'museums', value: 40, duration: 50 },
      { type: 'immediate', target: 'heritage_preservation', value: 35, duration: 0 }
    ],
    risk: { type: 'funding', probability: 0.1 }
  },
  {
    id: 'tradizione_4',
    name: 'Artigianato',
    category: 'cultura',
    subcategory: 'tradizione',
    description: 'Mestieri tradizionali',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'craftsmanship', value: 40, duration: 40 },
      { type: 'immediate', target: 'cultural_identity', value: 30, duration: 0 }
    ],
    risk: { type: 'extinction', probability: 0.15 }
  },
  {
    id: 'tradizione_5',
    name: 'Patriotismo',
    category: 'cultura',
    subcategory: 'tradizione',
    description: 'Amor patrio',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'patriotism', value: 45, duration: 40 },
      { type: 'immediate', target: 'nationalism', value: 35, duration: 0 }
    ],
    risk: { type: 'jingoism', probability: 0.2 }
  },
  {
    id: 'tradizione_6',
    name: 'Modernizzazione',
    category: 'cultura',
    subcategory: 'tradizione',
    description: 'Abitudini nuove',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'modernization', value: 40, duration: 30 },
      { type: 'immediate', target: 'progress', value: 35, duration: 0 }
    ],
    risk: { type: 'cultural_loss', probability: 0.2 }
  },
  {
    id: 'tradizione_7',
    name: 'Riti Passaggio',
    category: 'cultura',
    subcategory: 'tradizione',
    description: 'Cerimonie',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'rites_of_passage', value: 40, duration: 50 },
      { type: 'immediate', target: 'social_cohesion', value: 35, duration: 0 }
    ],
    risk: { type: 'formality', probability: 0.1 }
  },
  {
    id: 'tradizione_8',
    name: 'Cucina Tradizionale',
    category: 'cultura',
    subcategory: 'tradizione',
    description: 'Gastronomia',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'cuisine', value: 40, duration: 50 },
      { type: 'immediate', target: 'cultural_heritage', value: 35, duration: 0 }
    ],
    risk: { type: 'health', probability: 0.1 }
  },
  {
    id: 'tradizione_9',
    name: 'Musica Tradizionale',
    category: 'cultura',
    subcategory: 'tradizione',
    description: 'Musica folk',
    cost: { pa: 1, resources: { money: 20 } },
    effects: [
      { type: 'immediate', target: 'traditional_music', value: 40, duration: 50 },
      { type: 'immediate', target: 'identity', value: 30, duration: 0 }
    ],
    risk: { type: 'commercialization', probability: 0.1 }
  },
  {
    id: 'tradizione_10',
    name: 'Architettura Tradizionale',
    category: 'cultura',
    subcategory: 'tradizione',
    description: 'Stile locale',
    cost: { pa: 1, resources: { money: 25 } },
    effects: [
      { type: 'immediate', target: 'traditional_architecture', value: 40, duration: 50 },
      { type: 'immediate', target: 'tourism', value: 30, duration: 0 }
    ],
    risk: { type: 'cost', probability: 0.15 }
  }
];

export type { Choice };
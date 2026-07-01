export interface ScatterItem {
  app: string;
  quote: string;
}

export const SCATTERED_INTENT: ScatterItem[] = [
  { app: 'Slack', quote: 'We need a quick page for this launch.' },
  { app: 'Group text', quote: "Can we just figure out the trip already?" },
  { app: 'WhatsApp', quote: 'This email should feel more premium, less salesy.' },
  { app: 'Discord', quote: 'Someone should make a bracket for this.' },
  { app: 'Meeting thread', quote: 'The onboarding flow needs to feel simpler.' },
];

export const ERA_TIMELINE = [
  { era: 'Command line', mode: 'Technical' },
  { era: 'GUI', mode: 'Visual' },
  { era: 'Mobile', mode: 'Accessible' },
  { era: 'AI Chat', mode: 'One human ↔ one model' },
  { era: 'Actual', mode: 'Shared conversation', highlight: true },
];

export const SPEED_CONTRAST = {
  before: {
    label: 'Old AI',
    steps: ['Stop your work', 'Ask a model', 'Wait', 'Copy, paste, re-contextualize'],
    result: 'Feels separate. A tool.',
  },
  now: {
    label: 'Actual',
    steps: ['Say it in the thread', 'Actual keeps pace', 'It stays in the room'],
    result: 'Feels present. A participant.',
  },
};

export interface RefinementStep {
  id: string;
  command: string;
  isInitial?: boolean;
  preview: {
    title: string;
    tag: string;
    bullets: string[];
  };
}

export const REFINEMENT_STEPS: RefinementStep[] = [
  {
    id: 'brief',
    command:
      'We need a landing page for the new AI onboarding feature. Premium but simple. Target: growth teams at B2B SaaS. Announce next Tuesday.',
    isInitial: true,
    preview: {
      title: 'Launch Page — v1',
      tag: 'Enterprise / Premium',
      bullets: ['Hero: "Onboarding, solved."', 'Enterprise-grade messaging', 'Case study logos'],
    },
  },
  {
    id: 'less-enterprise',
    command: 'Make it less enterprise.',
    preview: {
      title: 'Launch Page — v2',
      tag: 'Warmer, direct',
      bullets: ['Hero: "Onboarding that just clicks."', 'Conversational copy', 'Product screenshot hero'],
    },
  },
  {
    id: 'agencies',
    command: 'Add a section for agencies.',
    preview: {
      title: 'Launch Page — v3',
      tag: 'Warmer + agency segment',
      bullets: ['New section: "Built for agencies too"', 'Client-facing use cases', 'White-label note'],
    },
  },
  {
    id: 'sales',
    command: 'Can we send this to sales?',
    preview: {
      title: 'Sales Blurb — Ready',
      tag: 'Shareable',
      bullets: ['One-paragraph pitch for AEs', 'Linked to live launch page', 'Ready to paste into Outreach'],
    },
  },
];

export const LATENT_REQUESTS = [
  'Landing pages',
  'Internal tools',
  'Dashboards',
  'Customer emails',
  'Launch plans',
  'Mockups',
  'Campaign concepts',
  'Sales collateral',
  'Onboarding flows',
  'Forms',
  'Prototypes',
  'Microsites',
];

export const EXPANSION_CHANNELS = [
  'Slack',
  'Discord',
  'WhatsApp',
  'SMS',
  'iMessage',
  'Teams',
  'Telegram',
  'Email threads',
];

export const BRAND_ARCHITECTURE = [
  { role: 'Product / company', value: 'Actual' },
  { role: 'Invocation', value: '@Actual' },
  { role: 'Spoken behavior', value: 'atActual' },
  { role: 'Verb', value: 'Actualize · "make it actual"' },
];

export const MEMORY_COLUMNS = [
  {
    title: 'For a company',
    items: [
      'Brand voice',
      'Design preferences',
      'Launch patterns',
      'Approved copy',
      'Product positioning',
      'Past campaigns',
    ],
  },
  {
    title: 'For a personal group',
    items: [
      'Tone of the group',
      'Recurring plans',
      'Family preferences',
      'Travel habits',
      'Event patterns',
      'Who usually decides what',
    ],
  },
];

export const GROWTH_MODEL = {
  free: {
    label: 'Free — social proof',
    items: [
      'Personal group threads',
      'Discord demos',
      'Lightweight Slack trials',
      'Public showcases',
      'Shareable, watermarked outputs',
    ],
  },
  paid: {
    label: 'Paid — memory & ownership',
    items: [
      'Company workspaces',
      'Brand memory',
      'Private context',
      'Custom domains',
      'Approval flows',
      'Model routing',
    ],
  },
};

export const MODEL_LAYER = ['OpenAI', 'Anthropic', 'Google', 'Meta', 'Future models'];

export const ONE_LINERS = [
  { text: 'Actual is the app layer for conversation.', starred: true },
  { text: 'Make it actual.', starred: true },
  { text: 'Actual turns conversations into software.' },
  { text: 'The next app store is the group chat.' },
  { text: 'Software that appears when the conversation needs it.' },
  { text: 'Stop opening apps. Start making them in the thread.' },
  { text: 'Every conversation contains an app. Actual builds it.' },
];

export const SLIDES = [
  { id: 'hook', label: 'Hook' },
  { id: 'problem', label: 'Problem' },
  { id: 'insight', label: 'Insight' },
  { id: 'timing', label: 'Why Now' },
  { id: 'demo', label: 'Demo' },
  { id: 'wedge', label: 'Wedge' },
  { id: 'discord', label: 'Discord' },
  { id: 'brand', label: 'Brand' },
  { id: 'moat', label: 'Moat' },
  { id: 'growth', label: 'Growth' },
  { id: 'close', label: 'Close' },
] as const;

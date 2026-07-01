export interface DemoExample {
  id: string;
  prompt: string;
  appLabel: string;
  items: string[];
}

export const HERO_DEMOS: DemoExample[] = [
  {
    id: 'landing',
    prompt: 'Can someone make a landing page?',
    appLabel: 'Landing Page',
    items: ['Hero + headline', 'Feature grid', 'Signup form', 'Live preview link'],
  },
  {
    id: 'onboarding',
    prompt: "Let's mock up a new onboarding flow.",
    appLabel: 'Interactive Prototype',
    items: ['3-step wizard', 'Progress indicator', 'Sample data', 'Clickable prototype'],
  },
  {
    id: 'trip',
    prompt: "Let's plan the trip.",
    appLabel: 'Trip Planner',
    items: ['Itinerary', 'Map + routes', 'Booking links', 'Shared checklist'],
  },
];

export const SHIFT_ERAS = [
  { era: 'GUI', result: 'Windows & Apps' },
  { era: 'Web', result: 'Websites' },
  { era: 'Mobile', result: 'Apps everywhere' },
  { era: 'AI Chat', result: 'Language interfaces' },
  { era: 'Actual', result: 'Conversations become software', highlight: true },
];

export const POSITIONING_OPTIONS = [
  {
    id: 'app-layer',
    label: 'The app layer for conversation.',
  },
  {
    id: 'appears',
    label: 'Software that appears when conversations need it.',
  },
  {
    id: 'turn',
    label: 'Turn conversations into working software.',
  },
];

export const CHANNELS = [
  'Slack',
  'Discord',
  'WhatsApp',
  'iMessage',
  'Teams',
  'Telegram',
  'Email threads',
];

export interface ProactiveScenario {
  id: string;
  trigger: string;
  message: string;
  items: string[];
}

export const PROACTIVE_SCENARIOS: ProactiveScenario[] = [
  {
    id: 'event',
    trigger: 'Event Planning',
    message: "I noticed you're planning an event. Want me to build:",
    items: ['Invitation', 'Landing page', 'Calendar', 'RSVP form', 'Flyer'],
  },
  {
    id: 'onboarding',
    trigger: 'Onboarding',
    message: "Looks like you're discussing onboarding. I can generate:",
    items: ['User flow', 'Interactive prototype', 'Launch checklist', 'Announcement email'],
  },
];

export const MODEL_LAYER = ['OpenAI', 'Anthropic', 'Google', 'Future models'];

export const NAME_EXAMPLES = ["Let's ask Actual.", 'Add Actual.', '@Actual'];

export const SECTIONS = [
  { id: 'hero', label: 'Actual' },
  { id: 'thesis', label: 'Thesis' },
  { id: 'shift', label: 'The Shift' },
  { id: 'insight', label: 'Speed' },
  { id: 'positioning', label: 'Positioning' },
  { id: 'messaging', label: 'Everywhere' },
  { id: 'principle', label: 'Principle' },
  { id: 'vision', label: 'Vision' },
  { id: 'name', label: 'Name' },
  { id: 'close', label: 'Close' },
] as const;

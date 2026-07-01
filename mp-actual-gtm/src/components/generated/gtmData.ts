export interface Reference {
  id: number;
  label: string;
  url: string;
}

export const REFERENCES: Reference[] = [
  { id: 1, label: 'Slack — About Us', url: 'https://slack.com/about' },
  { id: 2, label: 'Slack — AI work platform', url: 'https://slack.com/intl/en-in' },
  { id: 3, label: 'Discord — About / Mission', url: 'https://discord.com/company' },
  {
    id: 4,
    label: 'OpenAI — ChatGPT beyond WhatsApp',
    url: 'https://openai.com/index/chatgpt-whatsapp-transition/',
  },
  {
    id: 5,
    label: 'Anthropic — Introducing Claude Tag',
    url: 'https://www.anthropic.com/news/introducing-claude-tag',
  },
  {
    id: 6,
    label: 'Twilio — Group MMS for business',
    url: 'https://www.twilio.com/en-us/blog/group-mms-texting-for-businesses',
  },
  {
    id: 7,
    label: 'Discord — How Midjourney built a business on Discord',
    url: 'https://discord.com/build-case-studies/midjourney',
  },
];

export type Priority =
  | 'Very high'
  | 'High'
  | 'Medium-high'
  | 'Medium'
  | 'Medium-long-term'
  | 'Later / cautious'
  | 'Lower priority';

export interface MarketRow {
  segment: string;
  priority: Priority;
  why: string;
  useCase: string;
  motion: string;
}

export const MARKET_MAP: MarketRow[] = [
  {
    segment: 'AI-native B2B SaaS teams',
    priority: 'Very high',
    why: 'Fast launch cycles, Slack-heavy, AI-friendly, willing to try beta products',
    useCase: 'Turn launch / growth / product threads into landing pages, emails, prototypes, one-pagers',
    motion: 'Founder-led outbound, design partners, Slack app, case studies',
  },
  {
    segment: 'Growth / performance marketing teams',
    priority: 'Very high',
    why: 'Constant need for creative, landing pages, funnel tests, campaign variants',
    useCase: '"Make this campaign real from the thread"',
    motion: 'Direct sales + PLG',
  },
  {
    segment: 'Product marketing teams',
    priority: 'High',
    why: 'Every launch starts in cross-functional conversations',
    useCase: 'Launch page, announcement email, sales enablement, demo page',
    motion: 'Community-led + partner with PMM creators',
  },
  {
    segment: 'Founder-led startups',
    priority: 'High',
    why: 'Founder has ideas faster than team can execute',
    useCase: 'Idea → demo, landing page, waitlist, investor/customer mockup',
    motion: 'Founder-led content, viral demos, Product Hunt',
  },
  {
    segment: 'Agencies / growth studios',
    priority: 'High',
    why: 'They repeat the same problem across many clients',
    useCase: 'Client Slack thread → campaign options / page / pitch asset',
    motion: 'Agency partner program',
  },
  {
    segment: 'Discord-native AI / creator communities',
    priority: 'Medium-high',
    why: 'Best social proof surface; people learn by watching others use it',
    useCase: 'Public build rooms, event pages, community tools, hackathon pages',
    motion: 'Community-led, public demos, ambassador program',
  },
  {
    segment: 'Enterprise teams',
    priority: 'Medium',
    why: 'Big budgets, but slow procurement and privacy/security friction',
    useCase: 'Internal tools, campaign workflows, brand-compliant assets',
    motion: 'Later sales-led motion',
  },
  {
    segment: 'Personal group chats',
    priority: 'Medium-long-term',
    why: 'Huge vision, high virality, but low willingness to pay and harder distribution',
    useCase: 'Trip planner, party invite, family calendar, RSVP page',
    motion: 'Later consumer experiment',
  },
  {
    segment: 'WhatsApp-first businesses',
    priority: 'Later / cautious',
    why: 'Massive reach, but policy/platform risk for third-party AI distribution',
    useCase: 'Narrow business-specific workflows only',
    motion: 'Wait, partner, or use compliant business-specific flows',
  },
  {
    segment: 'Developers',
    priority: 'Lower priority',
    why: 'They already have Cursor, Claude Code, Codex, IDE agents, terminal agents',
    useCase: 'App scaffolding from conversations',
    motion: 'Avoid as first wedge',
  },
];

export const PRIORITY_ORDER: Priority[] = [
  'Very high',
  'High',
  'Medium-high',
  'Medium',
  'Medium-long-term',
  'Later / cautious',
  'Lower priority',
];

export const TIERS = [
  {
    tier: 'Tier 1',
    title: 'Start here',
    subtitle: 'Slack-first AI / B2B SaaS growth teams',
    detail:
      'High urgency, clear ROI, strong AI adoption, fast feedback cycles, internal virality, budget, constant need for visual artifacts. This is the beachhead.',
  },
  {
    tier: 'Tier 2',
    title: 'Expand quickly',
    subtitle: 'Agencies and product marketing teams',
    detail:
      'Repeatable workflows and many assets. One agency can introduce Actual into many client conversations.',
  },
  {
    tier: 'Tier 3',
    title: 'Build the social spectacle',
    subtitle: 'Discord-native creators, communities, accelerators, hackathons',
    detail:
      'Best for visible usage and category education — the Midjourney-style "watch people use it" effect. Not the first revenue engine.',
  },
  {
    tier: 'Tier 4',
    title: 'Strategic platform expansion',
    subtitle: 'SMS / phone-number contact layer',
    detail:
      'Technically plausible via group MMS, but media richness, compliance, cost, and UX are harder than Slack or Discord — treat as a later expansion.',
  },
  {
    tier: 'Tier 5',
    title: 'Long-term consumer dream',
    subtitle: 'iMessage / WhatsApp / personal group chats',
    detail:
      'The big cultural vision, but not the first business. Risk of burning money on low-intent requests before the high-value workflow is proven.',
  },
];

export const ICP_PROFILE = [
  { attribute: 'Company stage', ideal: 'Seed to Series C' },
  { attribute: 'Employee count', ideal: '15–300' },
  { attribute: 'Category', ideal: 'AI SaaS, dev tools, MarTech, SalesTech, PLG SaaS, creator/business tools' },
  { attribute: 'Collaboration stack', ideal: 'Slack, Notion, Linear/Jira, Figma, Webflow/Framer, HubSpot, Docs' },
  { attribute: 'Team shape', ideal: 'Small design/dev team supporting too many GTM requests' },
  { attribute: 'Launch rhythm', ideal: 'New pages, campaigns, updates, experiments every week' },
  { attribute: 'AI appetite', ideal: 'Already using ChatGPT, Claude, Cursor, Perplexity, Gamma, Lovable, Replit' },
  { attribute: 'Pain', ideal: '"We talk about ideas faster than we can ship them."' },
  { attribute: 'Budget owner', ideal: 'Founder, Head of Growth, VP Marketing, PMM Lead' },
  { attribute: 'Buying motion', ideal: 'Self-serve install → team trial → paid workspace' },
];

export interface Persona {
  id: string;
  name: string;
  title: string;
  company: string;
  pain: string;
  aha: string;
  buys: string;
  messaging: string;
  isSecondary?: boolean;
}

export const PERSONAS: Persona[] = [
  {
    id: 'maya',
    name: 'Maya',
    title: 'Head of Growth',
    company: '80-person B2B SaaS · 2 marketers, 1 shared designer, 1 lifecycle',
    pain: 'Too many campaigns, not enough production bandwidth. Bottleneck isn\u2019t ideas — it\u2019s turning conversation into external assets.',
    aha: '"@Actual make this into a landing page and email sequence" → she gets a page, 3 headline variants, an email, ad copy, and a shareable preview before the meeting ends.',
    buys: 'One saved contractor brief or one faster campaign test justifies the tool.',
    messaging: 'Your Slack threads already contain the campaign brief. Actual turns them into launch-ready pages, emails, and creative assets.',
  },
  {
    id: 'priya',
    name: 'Priya',
    title: 'Product Marketing Lead',
    company: '150-person SaaS · owns launch briefs, sales enablement, release notes',
    pain: 'Context is scattered across product, sales, CS, leadership, and design — she has to synthesize it manually every launch.',
    aha: 'Actual: "Looks like this is a launch for the new analytics feature. I can make the launch page, announcement, FAQ, and sales one-pager." → "Do all four, enterprise tone."',
    buys: 'Actual becomes the bridge between discussion and launch execution.',
    messaging: 'Stop rebuilding launch context from scratch. Actual reads the room and turns the launch thread into the assets your team needs.',
  },
  {
    id: 'alex',
    name: 'Alex',
    title: 'Founder / CEO',
    company: '20-person AI startup · sells vision, closes customers, ships fast',
    pain: 'Constant ideas posted in Slack — some vague, some need to become demos immediately — but the team can\u2019t chase every one.',
    aha: '"We should show this as a visual workflow, maybe a page with three steps and a fake dashboard." → "@Actual make this real." → shareable prototype, ready to send.',
    buys: 'Founders pay for speed when it helps them sell, recruit, fundraise, or clarify direction.',
    messaging: 'Actual turns founder brain dumps into working demos, pages, and prototypes.',
  },
  {
    id: 'leo',
    name: 'Leo',
    title: 'Design Lead',
    company: '100-person SaaS · maintains quality across product, marketing, growth',
    pain: 'Fears Actual becomes "another tool generating off-brand garbage" that creates more cleanup work.',
    aha: 'Needs to believe Actual handles first drafts and low-stakes production — brand kit memory, approved components, guardrails, export to Figma/Framer/Webflow.',
    buys: 'Not the economic buyer, but can kill or accelerate adoption.',
    messaging: 'Actual gives your team a safe first-draft layer, using your brand system, so design is no longer the bottleneck for every campaign idea.',
    isSecondary: true,
  },
  {
    id: 'sam',
    name: 'Sam',
    title: 'Agency Owner',
    company: '12-person growth agency / creative studio · 10–30 clients',
    pain: 'Repeats the same workflow across many clients: brainstorm → brief → page → ads → copy → revisions → delivery.',
    aha: 'Turn client Slack threads into polished campaign options before the call ends — natural virality because every client sees the workflow.',
    buys: 'Increases margin, reduces production time, makes the agency look faster and more strategic.',
    messaging: 'Actual turns client feedback into campaign assets in real time.',
    isSecondary: true,
  },
];

export const AVOID_PERSONA = {
  title: 'The generic "knowledge worker"',
  detail:
    'Too broad. "Use Actual to get more done in Slack" puts Actual in direct competition with Slack AI, Claude Tag, ChatGPT connectors, and Notion AI. Anthropic\u2019s Claude Tag already validates "tag an AI teammate in Slack" — which makes generic AI-teammate positioning more crowded.',
  citation: 5,
};

export const POSITIONING_BY_MARKET = [
  {
    market: 'B2B SaaS teams',
    tagline: 'Actual turns Slack threads into launch-ready assets.',
    useCases: ['Landing pages', 'Launch pages', 'Onboarding flows', 'Lifecycle emails', 'Ad concepts', 'Sales one-pagers'],
  },
  {
    market: 'Agencies',
    tagline: 'Actual turns client conversations into polished campaign options.',
    useCases: ['Campaign concepts', 'Client-ready pages', 'Pitch decks', 'Ad creative', 'Brand-consistent variants'],
  },
  {
    market: 'Discord communities',
    tagline: 'Actual turns community conversations into shared experiences.',
    useCases: ['Event pages', 'Hackathon projects', 'Community tools', 'Brackets', 'Signup pages'],
  },
  {
    market: 'Consumers (later)',
    tagline: 'Actual turns group chats into useful things.',
    useCases: ['Trip plans', 'Party invites', 'Family calendars', 'RSVP pages', 'Weekend plans'],
  },
];

export interface GtmPhase {
  phase: string;
  title: string;
  goal: string;
  actions: string[];
  citation?: number;
}

export const GTM_PHASES: GtmPhase[] = [
  {
    phase: 'Phase 1',
    title: 'Design Partner GTM',
    goal: 'Prove teams will add Actual to a real Slack channel and use it to create shippable assets from real conversations.',
    actions: [
      '20–30 design partners: Slack-first, AI-forward, 15–300 employees, launching frequently',
      'Install into #growth, #marketing, #launch, #product-marketing, #founders',
      'Actual leads with context: "Looks like this channel is working on the new onboarding launch..."',
      'Success metric: conversation → artifact within 10 minutes of being added',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Narrow to One Killer Workflow',
    goal: 'Dominate one repeated workflow instead of trying to make every kind of app.',
    actions: [
      'Launch thread → branded launch asset pack',
      'Landing page, announcement email, LinkedIn post, sales blurb',
      'Internal launch checklist, hero copy variants, simple visual prototype',
      'Cross-functional, frequent, high-value, easy to evaluate ("yes this is useful" / "no, missed the point")',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Product-Led Slack Launch',
    goal: 'Turn the design-partner workflow into a self-serve Slack install once 20–30 partners prove usage.',
    actions: [
      'Core CTA: "Add Actual to Slack" · Secondary: "Watch Actual build from a real thread"',
      'Homepage shows a live thread on the left, Actual creating the asset on the right',
      'Pricing: workspace base fee + creator seats + artifact credits (avoid pure seat-based)',
      'Free / Team / Business / Agency tiers, generous enough to go viral, constrained enough to convert',
    ],
  },
  {
    phase: 'Phase 4',
    title: 'Agency Channel',
    goal: 'Multiply distribution — one agency can expose Actual to 10–50 client teams.',
    actions: [
      'Multiple client workspaces, separate brand kits, white-label previews',
      'Reusable campaign templates, approval comments, before/after revision history',
      'Growth loop: agency uses with client → client asks to keep it → expands into client workspace → agency becomes reseller',
    ],
  },
  {
    phase: 'Phase 5',
    title: 'Public Discord Demonstration',
    goal: 'Spectacle layer, not the first monetization layer — teach the market and create visible creation loops.',
    actions: [
      '"The Actual Build Room" — a public server where people watch Actual build live',
      'Suggestions turn into landing pages, event pages, prototypes, community tools',
      'Borrows the Midjourney mechanism: visible creation + community learning, not "look at our product"',
    ],
    citation: 7,
  },
  {
    phase: 'Phase 6',
    title: 'Phone Number / SMS Experiments',
    goal: 'Test the "added like a person" concierge concept carefully, after the B2B workflow works.',
    actions: [
      'Group MMS with 3+ participants is technically plausible for the phone-number concierge idea',
      'Controlled "Actual Concierge Number" experiment: 100–500 users, narrow use cases only',
      'Event planning, trip planning, party invites, parent group logistics',
      'Key metric: how many new group threads does one active group create?',
    ],
    citation: 6,
  },
];

export const NINETY_DAY_PLAN = [
  {
    range: 'Days 1–30',
    title: 'Prove the wedge',
    goal: '10 teams create useful launch assets from real Slack conversations.',
    actions: [
      'Recruit 20–30 design partners, manually onboard each',
      'Install in one channel, focus only on launch/growth/PMM workflows',
      'Collect every failed prompt and successful artifact',
      'Weekly feedback calls · measure time from install to first useful artifact',
    ],
    question: 'Do teams want this in the room?',
  },
  {
    range: 'Days 31–60',
    title: 'Package the repeatable use case',
    goal: 'Turn the design-partner workflow into a self-serve Slack install.',
    actions: [
      'Build the launch asset pack workflow + brand kit onboarding',
      'Add shareable previews and export/publish paths',
      'Launch first case studies + 10–20 demo videos',
      'Test pricing with active teams · start agency outreach',
    ],
    question: 'Can a team activate without hand-holding?',
  },
  {
    range: 'Days 61–90',
    title: 'Expand distribution',
    goal: 'Create repeatable acquisition loops.',
    actions: [
      'Launch Slack App Directory listing · founder-led outbound at scale',
      'Launch public Discord Build Room · recruit 5 agency partners',
      'Weekly "thread to app" teardown content · prep Product Hunt launch',
      'Referral loop: "invite Actual to another channel"',
    ],
    question: 'Does usage create more usage?',
  },
];

export const METRIC_GROUPS = [
  {
    group: 'Activation',
    metrics: [
      '% of installed workspaces creating an artifact in first 24 hours',
      'Time from install to first artifact',
      '% of first artifacts created from existing conversation context',
      'Number of humans participating in first artifact revision',
    ],
  },
  {
    group: 'Retention',
    metrics: [
      'Weekly active channels',
      'Repeat artifact creation per channel',
      'Number of channels per workspace',
      'Artifacts shipped / exported',
    ],
  },
  {
    group: 'Quality',
    metrics: [
      'Artifact accepted vs. regenerated',
      'Revisions to usable output',
      'User-rated usefulness',
      'Brand compliance score',
    ],
  },
  {
    group: 'Virality',
    metrics: [
      'Share links created',
      'External viewers per artifact',
      'New workspace installs from shared artifacts',
      'Agency client referrals',
    ],
  },
  {
    group: 'Monetization',
    metrics: [
      'Free → paid conversion',
      'Cost per artifact',
      'Gross margin per workspace',
      'Expansion revenue from channels / brand kits / credits',
    ],
  },
];

export const MESSAGING_ARCHITECTURE = [
  { label: 'Category', value: 'Actual is the app layer for conversation.' },
  { label: 'Product', value: 'Turn Slack threads into launch-ready assets.' },
  { label: 'Emotional', value: 'Make it actual.' },
  {
    label: 'Functional',
    value:
      'Add Actual to a channel. It reads the context, suggests what to create, and turns the conversation into pages, prototypes, emails, forms, and campaign assets.',
  },
];

export const ANTI_POSITIONING = [
  'Another chatbot',
  'Another blank prompt box',
  'Another coding agent',
  'Another project management tool',
  'Another design tool',
  'Another generic AI teammate',
];

export const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'market-map', label: 'Market Map' },
  { id: 'tiers', label: 'Targeting Tiers' },
  { id: 'icp', label: 'Beachhead ICP' },
  { id: 'personas', label: 'Personas' },
  { id: 'positioning', label: 'Positioning' },
  { id: 'phases', label: 'GTM Phases' },
  { id: 'plan', label: '30/60/90' },
  { id: 'metrics', label: 'Metrics' },
  { id: 'messaging', label: 'Messaging' },
  { id: 'references', label: 'References' },
] as const;

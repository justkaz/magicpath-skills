export interface Reference {
  id: number;
  label: string;
  url: string;
}

export const REFERENCES: Reference[] = [
  { id: 1, label: 'OpenAI — Codex', url: 'https://developers.openai.com/codex' },
  {
    id: 2,
    label: 'Anthropic — Claude Code Overview',
    url: 'https://docs.anthropic.com/en/docs/claude-code/overview',
  },
  { id: 3, label: 'Cursor — AI coding agent', url: 'https://cursor.com/' },
  { id: 4, label: 'MagicPath — shared workspace', url: 'https://magicpath.ai/' },
];

export const INTENT_SOURCES = [
  'Slack thread',
  'Founder brain dump',
  'Customer conversation',
  'Growth brainstorm',
  'Product planning channel',
  'Sales objection',
  'Figma comment',
  'Linear ticket',
  'Discord discussion',
  'WhatsApp group',
  'Meeting recap',
];

export const SILO_AGENTS = [
  {
    name: 'Codex',
    knows: 'the coding task',
    detail:
      'Optimized for software development — writing code, understanding codebases, reviewing code, debugging, automating dev tasks. Non-developer adoption has grown for automation, data transformation, and structured analysis.',
    citation: 1,
  },
  {
    name: 'Claude Code',
    knows: 'the terminal session',
    detail:
      'An agentic coding tool that reads codebases, edits files, runs commands, integrates with dev tools, creates commits and PRs, connects via MCP, and builds memory across sessions.',
    citation: 2,
  },
  {
    name: 'Cursor',
    knows: 'the IDE and repo',
    detail:
      'A coding agent for building software — turns ideas into code, runs in parallel, works autonomously, collaborates in Slack, reviews PRs in GitHub, understands codebases.',
    citation: 3,
  },
  {
    name: 'Slack',
    knows: 'the conversation',
    detail: 'Holds the discussion — but has no way to turn it into a visual, shippable artifact.',
  },
  {
    name: 'Linear',
    knows: 'the ticket',
    detail: 'Holds the task — but not the discourse that produced it.',
  },
  {
    name: 'Figma',
    knows: 'the design history',
    detail: 'Holds the mockup — but not why the team chose that direction.',
  },
];

export interface LadderLevel {
  level: number;
  title: string;
  subtitle: string;
  detail: string;
}

export const ADOPTION_LADDER: LadderLevel[] = [
  {
    level: 1,
    title: '"Make this real"',
    subtitle: 'Non-technical user, in Slack / Discord / a group thread',
    detail:
      'Actual creates the first artifact — a page, flow, prototype, email, form, or dashboard. The user experiences the magic without learning a new tool.',
  },
  {
    level: 2,
    title: '"Make it visual"',
    subtitle: 'The work moves into MagicPath',
    detail:
      'MagicPath becomes the place where the team can see it, edit it, comment on it, and collaborate with agents side by side. This is where the idea becomes tangible.',
  },
  {
    level: 3,
    title: '"Make it buildable"',
    subtitle: 'The artifact becomes a code-ready brief',
    detail:
      'Intent, audience, brand context, prior conversation, design constraints, approved copy, acceptance criteria, and repo context get packaged for a coding agent — far better input than a blank prompt.',
  },
  {
    level: 4,
    title: '"Make it real in the repo"',
    subtitle: 'Codex, Cursor, or Claude Code does the deep technical work',
    detail:
      'Implement the component, create the PR, fix the bug, build the feature, wire the interface in. This is where specialized agents shine — Actual and MagicPath don\u2019t replace them, they feed them.',
  },
  {
    level: 5,
    title: '"Bring it back to the room"',
    subtitle: 'The result returns to MagicPath or the original conversation',
    detail:
      'The team reviews what changed, how it looks, whether it matches intent, and what needs another pass. That feedback becomes memory — the next build gets smarter.',
  },
];

export interface WhyReason {
  id: string;
  title: string;
  body: string;
}

export const WHY_AGGREGATORS_WIN: WhyReason[] = [
  {
    id: 'starting-point',
    title: 'Aggregators own the starting point',
    body:
      'The most valuable context is captured at the moment of intent — usually in conversation. Search owned the start of web intent. The App Store owned mobile discovery. GitHub owns code collaboration. The prompt box is not the start. The thread is the start.',
  },
  {
    id: 'one-workflow',
    title: 'Aggregators turn fragmented tools into one workflow',
    body:
      'Slack for discussion, Notion for the brief, Linear for the ticket, Figma for the mockup, Cursor for code, GitHub for review, Vercel for deployment — that\u2019s a lot of context loss. The promise: one conversation, many agents, one shared memory.',
  },
  {
    id: 'raise-ceiling',
    title: 'Aggregators make every specialized agent better',
    body:
      'A weak prompt produces weak implementation. A missing brand system produces off-brand UI. Actual feeds agents the whole story — what was discussed, rejected, and constrained — so it raises their ceiling instead of competing with them.',
  },
  {
    id: 'model-churn',
    title: 'Aggregators protect against model churn',
    body:
      'One month a model is best; next month another wins. If Actual is tied to one model, it inherits that volatility. As an aggregator, model churn becomes an advantage — the model war becomes supply-side competition, and Actual owns the demand.',
  },
  {
    id: 'control-plane',
    title: 'Aggregators create a neutral control plane',
    body:
      'Enterprises want optionality — Codex for some tasks, Cursor for others, Claude Code for others, plus permissioning, audit trails, and cost controls. Actual becomes the neutral orchestration layer above the agents.',
  },
];

export interface MemoryType {
  id: string;
  title: string;
  remembers: string[];
  note: string;
}

export const MEMORY_GRAPH: MemoryType[] = [
  {
    id: 'personal',
    title: 'Personal memory',
    remembers: [
      'Preferred tone',
      'Risk tolerance',
      'Taste & writing style',
      'Design preferences',
      'What "good" means to this person',
      'What they tend to reject',
    ],
    note: 'Makes the system feel personal.',
  },
  {
    id: 'team',
    title: 'Team memory',
    remembers: [
      'Brand voice & positioning',
      'Customer segments',
      'Approved claims',
      'Design system',
      'Launch rituals',
      'What needs legal review',
    ],
    note: 'Makes the system useful to the company, not just the individual.',
  },
  {
    id: 'conversation',
    title: 'Conversation memory',
    remembers: [
      'Why the team chose one direction',
      'Who objected and why',
      'What customer quote changed the framing',
      'What constraint came up late',
      'What got cut',
      'The unstated consensus',
    ],
    note: 'The unique wedge — most agents only see the sanitized prompt. Actual sees the discourse.',
  },
  {
    id: 'artifact',
    title: 'Artifact memory',
    remembers: [
      'Which pages were generated',
      'Which variants were selected',
      'Which components were reused',
      'Which outputs shipped',
      'Which ones died',
      'Which patterns became canonical',
    ],
    note: 'Remembers not just what people said, but what worked.',
  },
  {
    id: 'agent',
    title: 'Agent performance memory',
    remembers: [
      'Codex → best on repo-aware debugging',
      'Cursor → best for IDE-native iteration',
      'Claude Code → best on long multi-file tasks',
      'MagicPath agents → best on visual exploration',
      'Task-routing map per company, per risk level',
      'Prompt structure & guardrails that worked',
    ],
    note: 'An underrated aggregator moat — very hard for a single agent silo to replicate.',
  },
];

export const OPINIONATED_LINES = [
  'This feels off-brand.',
  'This is too enterprise for the audience you described.',
  'The CTA conflicts with the launch goal.',
  'The design is drifting from the component system.',
  'Codex is probably the right agent for this next step.',
  'Claude Code should handle this — it needs multi-file reasoning.',
  'Keep this in MagicPath for now — the team hasn\u2019t aligned on the flow.',
];

export interface HandoffOption {
  id: string;
  label: string;
  destination: string;
}

export const HANDOFF_OPTIONS: HandoffOption[] = [
  { id: 'magicpath', label: 'Continue in MagicPath', destination: 'Shared visual canvas' },
  { id: 'codex', label: 'Send to Codex', destination: 'Repo-aware implementation' },
  { id: 'cursor', label: 'Send to Cursor', destination: 'IDE-native iteration' },
  { id: 'claude', label: 'Send to Claude Code', destination: 'Multi-file / terminal work' },
  { id: 'linear', label: 'Create Linear ticket', destination: 'Task tracking' },
  { id: 'github', label: 'Open GitHub issue', destination: 'Engineering backlog' },
];

export const CONTEXT_PACKET_FIELDS = [
  'What the conversation was about',
  'What the team decided',
  'What the artifact is supposed to do',
  'Brand rules',
  'Technical constraints',
  'Design references',
  'Copy direction',
  'Acceptance criteria',
  'Open questions',
  'Relevant prior decisions',
];

export const PRODUCT_IMPLICATIONS = [
  {
    title: 'Agent handoff cards',
    body: 'Context-preserving handoff, not just export — continue in MagicPath, send to Codex/Cursor/Claude Code, create a ticket.',
  },
  {
    title: 'Context packets',
    body: 'Structured packets bridging conversation and execution — intent, brand rules, constraints, acceptance criteria, prior decisions.',
  },
  {
    title: 'Agent memory ledger',
    body: 'Which agent was used, what it was asked, what it produced, what was accepted or rejected, what the team learned.',
  },
  {
    title: 'Shared agent workspace',
    body: 'Multiple agents work side by side in MagicPath — one explores visuals, one implements, one reviews architecture — while Actual keeps memory synced.',
  },
  {
    title: 'Permissioned memory',
    body: 'User-controlled, permissioned memory that makes work better — not "we read everything everywhere." Enterprises need retention, deletion, and audit controls.',
  },
];

export const RYAN_PERSONA = {
  name: 'Ryan',
  title: 'AI-forward Head of Product / CTO / Growth Lead / Founder',
  company: '30–500 person SaaS company, already using Cursor, Claude Code, Codex, ChatGPT',
  pain: 'Design talks in Figma. Growth talks in Slack. Product writes in Linear. Engineering works in Cursor. Claude Code has one context, Codex has another. Nobody knows what the agents did last time, or which context is canonical.',
  belief: 'Agents are the future, but adoption is messy.',
  promise: 'One shared memory layer for your humans and agents.',
  buys: 'He already believes in agents — he needs help making them usable across the company.',
};

export const GTM_MESSAGES = [
  {
    audience: 'Developer-facing',
    message:
      'Start with the conversation. Let Actual turn it into a visual spec. Then send it to your coding agent with the context already packaged.',
  },
  {
    audience: 'Founder-facing',
    message:
      'Your team is already discussing the product. Actual turns that conversation into a prototype, then lets your coding agents build from the same context.',
  },
  {
    audience: 'Growth / PMM-facing',
    message:
      'You don\u2019t need to know how to use coding agents. Actual lets you create the first version, then technical teammates continue in MagicPath, Cursor, Codex, or Claude Code.',
  },
  {
    audience: 'Enterprise-facing',
    message: 'Stop letting every agent build a separate memory silo. Actual gives your agents one shared context layer.',
  },
];

export const SECTIONS = [
  { id: 'hero', label: 'The Front Door' },
  { id: 'silos', label: 'Trapped in Silos' },
  { id: 'position', label: 'Strategic Position' },
  { id: 'ladder', label: 'Adoption Ladder' },
  { id: 'why', label: 'Why Aggregators Win' },
  { id: 'memory', label: 'Memory as the Moat' },
  { id: 'implications', label: 'Product' },
  { id: 'gtm', label: 'GTM Shift' },
  { id: 'close', label: 'Close' },
] as const;

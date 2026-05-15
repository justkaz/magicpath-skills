# magicpath-skills

Three Claude Code or Codex skills that turn the [MagicPath CLI](https://www.magicpath.ai) into a workflow champion — minting fresh project canvases, pulling analytics + tickets, and shipping ready-to-debate design variations in minutes.

| Skill | What it does |
|---|---|
| **`/run-the-room`** | Stages a fully-loaded sprint room — Linear/Asana tickets, Mixpanel/PostHog/Optimizely/LaunchDarkly data, optional 3 design variations, a picked design-thinking exercise (LDJ, Note-and-Vote, etc.) with a runbook the facilitator reads from on the day, and a Slack-able cover whose CTA opens the new MagicPath project. |
| **`/choose-your-own-path`** | RPG-style A/B test winner analysis. Pulls experiment data from your datasource, identifies the winner, mints **8 MagicPath designs** (5 variations + data summary + replication playbook + ticket card) into a fresh `CYOP: <descriptor>` project, and files the Linear/Asana review ticket with everything attached. |
| **`/install-magicpath-stack`** | Companion installer — wires up the MagicPath CLI, the Mixpanel MCP, and the Linear MCP in one flow, with EACCES escape hatches for nvm/volta/asdf. Run this first if you're new to the stack. |

## Install

**All three at once** (recommended):

```bash
npx skills add justkaz/magicpath-skills -g
```

**Or pick individually:**

```bash
npx skills add justkaz/magicpath-skills -s install-magicpath-stack -g
npx skills add justkaz/magicpath-skills -s run-the-room -g
npx skills add justkaz/magicpath-skills -s choose-your-own-path -g
```

The `-g` flag installs globally to `~/.claude/skills/`. Restart Claude Code (or open a new session) and the slash commands appear.

## First run

```text
/install-magicpath-stack         # one-time setup (CLI + MCPs)
/run-the-room                    # to prep a sprint room
/choose-your-own-path            # to analyze an A/B test winner
```

Both `/run-the-room` and `/choose-your-own-path` mint **a fresh MagicPath project per invocation**, with strict naming conventions:

- `Run The Room: <descriptor>` — sprint rooms (4–6 components per run)
- `CYOP: <descriptor>` — experiment-analysis quests (8 designs per run)

The MagicPath project picker becomes self-organizing — type `Run The Room:` or `CYOP:` to filter to one skill's history.

## What you'll need

- [Claude Code](https://docs.claude.com/en/docs/claude-code) installed and authenticated
- A [MagicPath](https://www.magicpath.ai) account (the CLI prompts a login flow on first use)
- One **datasource MCP**: Mixpanel, PostHog, Optimizely, or LaunchDarkly
- One **quest board MCP**: Linear or Asana
- The `npx skills` CLI is fetched on demand — no separate install needed

`/install-magicpath-stack` walks you through the MCP wiring if it's your first time.

## Repo layout

```
magicpath-skills/
├── README.md
├── LICENSE
└── skills/
    ├── run-the-room/
    │   └── SKILL.md
    ├── choose-your-own-path/
    │   └── SKILL.md
    └── install-magicpath-stack/
        └── SKILL.md
```

Skills are single Markdown files with YAML frontmatter — no scripts, no build step. Fork, edit, ship your own variants.

## Updating

`npx skills` re-runs are idempotent. To pull the latest version:

```bash
npx skills add justkaz/magicpath-skills -g
```

## Caveats these skills always preserve

- **Winner-by-traffic ≠ A/B winner.** When `/choose-your-own-path` analyzes Mixpanel-style traffic data, it always flags the test as winner-by-volume, never claims conversion lift the data doesn't support.
- **Sample-size honesty.** If n is small, the skill says so out loud — in the data summary, the runbook's caveat phase, and the Linear ticket.
- **Pre-mortem before ship.** `/run-the-room`'s Note-and-Vote runbook forces a written falsifiable hypothesis (metric, target, window, kill condition) before any variation reaches production traffic.

## License

MIT — see [LICENSE](./LICENSE). Fork, remix, ship.

## Built with

- [MagicPath](https://www.magicpath.ai) — AI-native design canvas
- [Claude Code](https://docs.claude.com/en/docs/claude-code) — agent harness
- [Vercel Labs `skills` CLI](https://github.com/vercel-labs/skills) — skill installer

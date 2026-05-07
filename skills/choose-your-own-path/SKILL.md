---
name: choose-your-own-path
description: MagicPath-centered experiment analysis and design-review workflow. Use when the user wants to pick a datasource and project management platform, check or explain missing MCP installs, use the MagicPath CLI as the main collaboration tool, analyze an A/B test winner, create five MagicPath design variations plus a data-summary design plus a replication-playbook design (a how-to component a teammate can use to repeat the run in Claude Code), and send preview links into Asana or Linear for review. Trigger when the user says choose-your-own-path, MagicPath experiment analysis, A/B test winner to variations, design review task, or similar.
---

# Choose Your Own Path

Run this like a compact RPG quest. MagicPath CLI is the champion character: it grants shared context, where agents and humans collaborate on an infinite canvas. The datasource and project management platform are the user's weapons or spells.

Keep the tone playful, but keep the workflow precise. Do not invent results, links, tasks, or MCP access.

## Character Select

If the user has not already chosen tools, ask these two questions first and stop for answers:

1. **Choose your data spell:** Optimizley, Mixpanel, Posthog, or LaunchDarkley. This is most likely where you run a/b tests or have analytics on specific urls.
2. **Choose your quest board:** Asana or Linear.

Use only those options. Accept the common product spellings as aliases: Optimizely for Optimizley, PostHog for Posthog, and LaunchDarkly for LaunchDarkley.

After the user answers, summarize the loadout:

```text
Champion: MagicPath CLI - shared context on an infinite canvas
Data spell: <datasource> - this is most likely where you run a/b tests or have analytics on specific urls
Quest board: <Asana or Linear>
```

Confirm scope: this skill **mints a fresh `CYOP: <descriptor>` MagicPath project** as Step 2 of the Quest Flow (after the test is named) and lands all 8 designs inside it — 5 variations · 1 data summary · 1 replication playbook · 1 ticket card. Once the test is named, the skill runs end-to-end without further prompts.

## MCP Gear Check

Check the available tools/connectors before fetching data or creating tasks. Use current MCP/app tools when available. If a needed connector is missing, provide setup instructions for the selected choice, then pause until the user confirms it is installed or connected.

### Datasource MCP Needs

For every datasource, explain that it is most likely where the user runs a/b tests or has analytics on specific urls.

- **Optimizley:** This is most likely where you run a/b tests or have analytics on specific urls. Need an Optimizely-capable MCP or connector that can read experiments, variations, metrics/results, audiences, dates, and URLs. Typical setup requires an API token plus account/project context. Ask the user to install or connect that MCP and provide the experiment ID/name or URL.
- **Mixpanel:** This is most likely where you run a/b tests or have analytics on specific urls. Need a Mixpanel-capable MCP or connector that can query funnels/events/properties for a URL or experiment segment. Typical setup requires project access and service credentials or an API secret. Ask for the project and event/funnel names if the test is not obvious.
- **Posthog:** This is most likely where you run a/b tests or have analytics on specific urls. Need a PostHog-capable MCP or connector that can read experiments, feature flags, cohorts, events, and insights. Typical setup requires host URL, project ID, and API key.
- **LaunchDarkley:** This is most likely where you run a/b tests or have analytics on specific urls. Need a LaunchDarkly-capable MCP or connector that can read flags, experiments, variations, metrics, environments, and targeting rules. Typical setup requires access token, project key, and environment key.

### Quest Board MCP Needs

- **Linear:** Use the Linear MCP/app tools if available. If not, ask the user to connect Linear with permission to create issues and comments, then ask which team/project should receive the review task.
- **Asana:** Use an Asana MCP/app connector if available. If not, ask the user to connect Asana with permission to create tasks, then ask which workspace/project should receive the review task.

## Summon MagicPath

Before creating designs, check MagicPath CLI auth and project context:

```bash
npx magicpath-ai info -o json
npx magicpath-ai whoami
```

If the CLI is unavailable, tell the user to install or run it with:

```bash
npm install -g magicpath-ai
```

or use the project-local invocation:

```bash
npx magicpath-ai <command>
```

If auth is missing, run the MagicPath login flow or tell the user to log in, then verify again. Prefer `-o json` for data-returning commands. Discover the current CLI surface with `npx magicpath-ai --help` and command-specific help when creating or submitting new designs. Choose the CLI route that fits the installed version rather than assuming one fixed command exists.

## Quest Flow

Once datasource access, quest board access, and MagicPath are ready:

1. Ask: "What running test should we analyze for a winner? Send the experiment name/ID and URL if you have them."
2. **Mint a fresh `CYOP: <descriptor>` MagicPath project.** Distill the test name from Step 1 into a short title-cased descriptor (the most distinguishing noun phrase, no filler). Always lead with the literal prefix `CYOP: ` (with trailing colon-space). Keep the whole name under 50 characters so it's scannable in the project picker. Use the CLI directly:

   ```bash
   npx magicpath-ai create-project \
     --name "CYOP: <descriptor>" \
     --team "<team-name-or-id>" \
     -o json
   ```

   - Default `--team` to the user's primary team (`npx magicpath-ai list-teams -o json` if they belong to multiple — ask before minting).
   - Capture `.id` from the response — every later `code start --project <id>` uses **this** project, never an old one.
   - Save the project URL (`https://www.magicpath.ai/projects/<id>`) — it's the destination of the ticket card's primary CTA in Step 12.
   - Confirm the name out loud: "Minted `CYOP: <descriptor>` — all 8 designs from this run will land there."
   - Fallback (only if `create-project` errors): instruct the user to mint at `https://www.magicpath.ai/projects/new` with the exact name, then read the ID from `npx magicpath-ai active-project -o json`.

   **Examples:**

   | Test from Step 1 | Project name |
   |---|---|
   | iPhone Air, 30d /projects winner | `CYOP: iPhone Air 30d Winner` |
   | Pricing page V3 experiment | `CYOP: Pricing V3 Experiment` |
   | Top /blog page last 30d | `CYOP: Top Blog Page 30d` |
   | Checkout CTA color test | `CYOP: Checkout CTA Test` |

3. Pull the experiment data from the chosen datasource. Capture dates, URL(s), variants, primary metric, secondary metrics, sample sizes, conversion rates, lift, confidence/significance if provided, and any visible segment caveats.
4. Decide whether there is a winner. If the data is inconclusive, say so and ask whether to create exploratory variations anyway.
5. Infer why the winner likely won. Ground the rationale in observed data and page context, not vibes alone.
6. Create five MagicPath variations using that rationale (all scaffolded into the Step 2 project via `code start --project <id>`):
   - Variation 1: closest refinement of the winner.
   - Variation 2: stronger messaging or headline.
   - Variation 3: clearer layout or visual hierarchy.
   - Variation 4: trust, proof, urgency, or friction reduction.
   - Variation 5: bolder challenger that still follows the winning hypothesis.
7. Create one MagicPath data-summary design that explains the pulled results and why the winning hypothesis matters. Same project as the variations.
8. Submit or publish the five variations and the data-summary design through the MagicPath CLI using the best supported command path in the installed CLI.
9. Collect preview links for every MagicPath design.
10. Create a new Asana task or Linear issue for design review. **Kick this off concurrently with Step 11** — both produce artifacts that don't depend on each other, so run them in parallel to save wall-clock time. The Linear/Asana save and the MagicPath build for the playbook can fire from the same turn.
11. **Mint a replication-playbook design** (concurrent with Step 10) into the Step 2 project. One MagicPath component that summarizes what the skill did *and* spells out how a teammate could replicate the run from scratch in Claude Code. Treat it as a takeaway you'd hand a new hire — a self-contained recipe, not a duplicate of the ticket. Because it doesn't reference the ticket URL, it can build at the same time as the `save_issue` call.
12. **Mint a finished-ticket design** into the Step 2 project. Once the task exists and you have its real URL and ID, push one more MagicPath design — a "ticket card" that visualizes the finished ticket and links directly to it. This is the artifact someone can paste into Slack or a doc and let a reviewer click straight through to Linear/Asana, the variations, or the data summary, without bouncing through chat. Treat it as the cover page of the quest, not a duplicate of the data summary.

## Replication Playbook Shape

Create the replication-playbook MagicPath component with:

- A header that reads as a how-to guide, not a report — title like "How to replicate this quest" with a `Skill · /choose-your-own-path` pill.
- A "what we did" panel summarizing the run in one paragraph: the question asked, the loadout (data spell + quest board), the winning page or experiment, the variation count, and the elapsed wall-clock time. Keep it tight — three sentences.
- A "your inputs" callout showing the *exact* phrases a teammate would type at the interview: the loadout pick (e.g. `Mixpanel + Linear`), the test-or-URL prompt, and the variation count. These are quotable — render them as styled chips or a transcript snippet.
- A four-block "set up Claude Code" section with copy-ready code blocks:
  1. Install Claude Code (one-liner pointer to the docs)
  2. Install the skill — the canonical one-liner: `npx skills add justkaz/magicpath-skills -s choose-your-own-path -g`. (This uses the Vercel Labs `skills` CLI — the de-facto standard for installing Claude Code skills from a public GitHub repo. The `-g` flag installs globally to `~/.claude/skills/`.)
  3. Run `/install-magicpath-stack` to wire up MagicPath CLI + Mixpanel MCP + Linear/Asana MCP
  4. Invoke `/choose-your-own-path` with the same loadout pick the original run used
- A "what comes back" section listing the seven artifacts (5 variations + 1 data summary + 1 ticket card) and the Linear/Asana ticket — so the teammate knows what success looks like before they start.
- A "common pitfalls" footnote — at minimum: missing MCPs (point at `/install-magicpath-stack`), winner-by-traffic vs. true A/B (preserve the caveat), and the zsh 1-indexed parallel-loop trap if the teammate forks the skill.
- A footer with a copy-pasteable single-line invocation (the slash command), the skill's canonical URL, and the date the playbook was generated.

Submit it via the same `code start --project <step-2-id>` → write → `code submit --wait` flow used for the variations. Track its `generatedName` separately. **Build it in parallel with the Step 10 ticket creation** — fire both async calls in the same turn so wall-clock stays low.

The playbook does *not* embed the resulting ticket URL (it builds before the ticket exists). If a teammate later wants to see the ticket the original run produced, the **ticket-card design from Step 12** is where they'll find it — link the two together via the quest-complete summary, not inside the playbook itself.

## Ticket Card Shape

Create the ticket-card MagicPath component with:

- Header that mimics the chosen quest board's chrome (Linear or Asana), including a primary "Open in Linear/Asana" button linking to the real ticket URL.
- Status, priority, assignee avatar, label pills, and the human-readable ticket ID — all shown the way the actual board renders them, so the card reads as native.
- The full ticket title, with the experiment URL or test name as a styled inline code chip when applicable.
- A compact "win summary" callout — one line of headline data (e.g., view count, lift, share-of-traffic) so the card stands on its own.
- A 5-tile row linking to each variation by `generatedName`, plus a separate tile linking to the data-summary design.
- The same caveat banner from the ticket if the data was inconclusive — never quietly drop the warning.
- A footer CTA repeating the ticket URL in plain text so it's copy-pasteable.

Submit it via the same `code start --project <step-2-id>` → write → `code submit --wait` flow used for the variations. Track its `generatedName` separately — it becomes the headline link in the quest-complete summary.

## Review Task Shape

Create the project management task with:

- Title: `Review MagicPath variations for <experiment/test name>`
- Datasource and test URL or ID.
- Winner summary with the main evidence.
- Caveats or "not statistically clear" warning if applicable.
- Five variation links, each with one-line rationale.
- Data-summary design preview link.
- Suggested review questions: "Which variation best preserves the winning signal?", "Which should ship next?", and "What metric should guardrail the next test?"

End with a short "Quest complete" summary listing, in order:
1. The datasource and quest board (the loadout, in one line).
2. The **ticket-card preview link** (called out first — it's the single shareable URL).
3. **The Step 2 project URL** (`https://www.magicpath.ai/projects/<id>`) — the home for all 8 designs, named `CYOP: <descriptor>`.
4. The replication-playbook preview link (so a teammate can repeat the run).
5. The data-summary preview link.
6. The five variation preview links.
7. The Asana/Linear task URL.

## Rules

- Keep MagicPath as the champion; other tools are supporting gear.
- Do not offer datasource options outside Optimizley, Mixpanel, Posthog, and LaunchDarkley.
- Do not offer project management options outside Asana and Linear.
- Include the context phrase when referring to datasources: "this is most likely where you run a/b tests or have analytics on specific urls".
- Stop and ask for missing MCP/app installs instead of pretending access exists.
- Never claim a test winner unless the datasource supports that conclusion.
- Do not run MagicPath preview/view commands in parallel.
- Push preview links to the selected project management platform only after the user has selected the platform and connector access is available.
- **Every run mints a fresh `CYOP: <descriptor>` MagicPath project (Quest Flow Step 2).** Never push designs from a `/choose-your-own-path` invocation into a pre-existing or default project. Naming is non-negotiable: prefix `CYOP: ` exactly, then a short title-cased descriptor under 50 chars total.
- Every `code start --project <id>` from Step 6 onward uses the **Step 2 project ID** — never an old one. If a design lands in the wrong project, treat it as a bug, not a sunk cost.
- The Step 12 ticket card's footer/share-line includes the Step 2 project URL so the room can pan/zoom across all 8 designs in one place.

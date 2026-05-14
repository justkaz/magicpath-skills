---
name: run-the-room
description: Prep a fully-loaded "sprint room" inside MagicPath — all relevant tickets, all relevant data, all relevant designs, plus a chosen design-thinking exercise — in one shot. Use whenever the user wants to kick off a design sprint, prep a workshop, "run a sprint room," set up a sprint board on the MagicPath canvas, facilitate a team session that needs context pulled from Linear/Asana and Mixpanel/PostHog/Optimizely/LaunchDarkly, or asks to "run the room," "prep the room," "stage a sprint," "run a design studio," "set up a critique session," "spin up a design-thinking exercise," "kickoff a workshop with all the tickets and data on the canvas," or similar. Trigger even when the user doesn't name every tool — phrases like "I'm running a sprint Tuesday, get me ready" or "facilitate a session for the team about the checkout flow" should also invoke this. Leave the user with a tasks board, a data-color overlay, optional design variations, and a single picked exercise with how-to-run instructions.
---

# Run the Room

A facilitator's preflight check, end-to-end. Drop the user into a sprint with everything on the canvas already — tickets pulled from Linear or Asana, data pulled from their chosen analytics tool, optional design variations of any artifact mentioned in the tickets, and a single best-fit design-thinking exercise with a runbook the facilitator can read straight from the screen.

The point is to **collapse the prep**: instead of switching between 4 tools to assemble context for a 60-minute session, the user opens MagicPath and the room is ready.

## When to use this skill

Trigger on any "I have to facilitate something soon" flavor of request — the user wants context staged, not a single artifact. Common signals:

- "Prep my sprint" / "run the room" / "stage the room"
- "I'm running a design sprint Tuesday — get me ready"
- "Set up a critique session" / "design studio" / "workshop"
- "Pull everything for the [X] sprint" / "build me a sprint room about [Y]"
- Mentions a topic + a date + a team — the format is "facilitator about to brief humans"
- Asks about design-thinking exercises (Crazy 8s · Lightning Decision Jam · How Might We · Premortem · Note-and-Vote · etc.) and wants one picked

If the user only wants *one* of the artifacts (just tickets, just data, just a runbook) defer to the more focused skill — `/choose-your-own-path` for analytics → variations, or pull from Linear/Asana directly. This skill is for the multi-artifact pre-meeting load.

## Sprint Brief (interview)

Two questions, asked together. Stop and wait for both answers.

1. **What's the sprint about?** One-sentence brief — the topic (e.g., "checkout flow redesign," "onboarding drop-off," "pricing page experiment") plus a Linear/Asana label, project, or search query if the user has one. The skill uses this to filter tickets and pick the design-thinking exercise.
2. **Choose your loadout:**
   - **Data spell** — Mixpanel · Posthog · Optmizely · LaunchDarkley *(accept Optimizely / PostHog / LaunchDarkly as aliases)*
   - **Quest board** — Linear · Asana

After the user answers, summarize:

```text
Topic: <one-sentence brief>
Data spell: <datasource>
Quest board: <Linear or Asana>
```

Then confirm scope: this skill **mints a fresh `Run The Room: <descriptor>` MagicPath project** as Step 1 and lands ~4–6 components inside it (tasks board · data analysis · optional design variations · sprint runbook · sprint room ready cover). Ask if the user wants to skip any before kicking off — and propose the exact project name from the topic for confirmation.

## MCP Gear Check

Before pulling anything, check that the relevant connectors are installed and reachable. Don't pretend access exists.

### Datasource MCPs

For every datasource, explain that it's where the user runs A/B tests or has analytics on specific URLs.

- **Mixpanel** — Mixpanel-capable MCP that can query funnels/events/properties for a URL or experiment segment. Typical setup: project access + service credentials or API secret.
- **Posthog** — PostHog MCP that can read experiments, feature flags, cohorts, events, insights. Typical setup: host URL + project ID + API key.
- **Optmizely** — Optimizely MCP that can read experiments, variations, metrics/results, audiences, dates, URLs. Typical setup: API token + account/project context.
- **LaunchDarkley** — LaunchDarkly MCP that can read flags, experiments, variations, metrics, environments, targeting rules. Typical setup: access token + project key + environment key.

### Quest Board MCPs

- **Linear** — Linear MCP with permission to read issues, labels, projects, comments. Default team is whichever the user belongs to; ask if they have multiple.
- **Asana** — Asana MCP with permission to read tasks, projects, sections. Ask which workspace/project to scope to.

### MagicPath CLI

```bash
npx -y magicpath-ai@beta info -o json
npx -y magicpath-ai@beta whoami
```

If the CLI is missing or auth is stale, install MagicPath's official `magicpath` skill — it wraps the CLI install + auth in a single command:

```bash
npx skills add https://github.com/magicpathai/agent-skills --skill magicpath
```

For the full Mixpanel + Linear MCP wiring on top of the CLI, defer to the **`/install-magicpath-stack`** companion skill. Pause until the user confirms install.

## Sprint Flow

Once the brief is captured and the gear is reachable, run these steps in order. Some can be parallelized — call that out when it applies.

### Step 1 — Mint a fresh MagicPath project for the sprint room

Every run gets its own project so the canvas isn't polluted with components from earlier rooms. Create the project **before any component scaffolding** — every later `code start` call uses this new project's ID via `--project <id>`.

**Naming convention (strict):**

- **Always lead with the literal prefix `Run The Room: `** (with the trailing colon-space).
- Append a short, title-cased descriptor distilled from the sprint topic — the most distinguishing noun phrase, no filler.
- Keep the **whole name under 50 chars** so it's scannable in the project picker.
- Must be specific enough that a teammate searching the picker for "docs" or "pricing" finds the right room without scrolling.

**Examples:**

| Topic from the brief | Project name |
|---|---|
| /documentation content strategy — what to add and double down on | `Run The Room: Docs Content Strategy` |
| Top trafficked /v1/ URLs — remix the top 3 and explain why | `Run The Room: Top /v1/ Remixes` |
| Pricing page conversion review — Linear project: Pricing | `Run The Room: Pricing Conversion` |
| Onboarding drop-off — MagicPath onboarding redo | `Run The Room: Onboarding Drop-off` |
| Mobile nav rework — anything tagged mobile | `Run The Room: Mobile Nav Rework` |

**How to create it:**

The `magicpath-ai` CLI ships a `create-project` subcommand — use it. **Do not pause for the user to create the project in the web app** unless this command fails.

```bash
npx -y magicpath-ai@beta create-project \
  --name "Run The Room: <descriptor>" \
  --team "<team-name-or-id>" \
  -o json
```

- The command returns a JSON payload — capture `.id` for `--project` flags downstream and `.ownerName` to confirm the team in the user-facing summary.
- Default `--team` to the user's primary team. If the user belongs to multiple teams (check `npx -y magicpath-ai@beta list-teams -o json`), ask which one before minting.
- Omit `--team` only when the user explicitly wants a personal project; in that case the project lands under their personal namespace.
- Verify the response — if `create-project` errors (offline, auth, version drift), only then fall back to the manual flow: ask the user to mint at `https://www.magicpath.ai/projects/new` with the exact `Run The Room: <descriptor>` name, then read the ID from `npx -y magicpath-ai@beta active-project -o json`.

**Capture and reuse:**

- Save the new project ID locally for the rest of the run — every subsequent `code start --project <id>` uses this new project, never an old one.
- Save the project URL (`https://www.magicpath.ai/projects/<id>`) — this is the **destination of the Step 9 cover's primary CTA**.
- Confirm the name out loud back to the user: "Minted `Run The Room: <descriptor>` — all 4–6 components from this run will land there."

### Step 2 — Pull all relevant tickets from the quest board

Filter by the topic from the brief. For Linear, use `list_issues` with a `query`, `project`, `cycle`, or `label` filter that matches the brief. For Asana, use the project/section filter.

Capture for each task: **id (e.g., MP-281), title, status, assignee, labels, priority, the description preview, any URLs in the body, and the source ticket URL**. Limit to the top ~20 most relevant — if the brief returns more, trim by recency or priority and tell the user.

### Step 3 — Build the "Sprint Tasks Board" MagicPath component

One component, not N. Render the pulled tasks as a single board on the canvas — kanban-style columns (Todo / In Progress / Review / Done) with task cards inside, *or* a flat list grouped by label, whichever fits the data better.

Each card shows: ticket ID badge, title, assignee avatar, priority pill, label chips, and a "Open in Linear/Asana" link to the source. Add a header that names the sprint topic, the date, and the count.

This is the **single source of truth** during the room — the facilitator scrolls it on the projector.

### Step 4 — Pull data that adds color to the tasks

Re-read the task descriptions and titles. Extract any URLs, page paths, feature flag names, experiment IDs, or metric names mentioned. Use those as the input to a query against the chosen datasource:

- **URLs** in tickets → page-view or funnel queries on those exact paths
- **Experiment names / flag names** → result tables for those experiments
- **Metric names** → trend lines for those metrics over the relevant window

Capture totals, deltas, and any obvious caveats (low sample size, recent flag changes, bot traffic spikes). The point is to give the room **numbers next to the tickets** so debate can be evidence-led rather than opinion-led.

### Step 5 — Build the "Data Analysis" MagicPath component

One component, parallel to Step 3 in spirit. Render the data extracted in Step 4 as a single analysis page — bar chart of the most-affected pages, table of experiment outcomes if any, and a "what this means for the sprint" callout that ties the numbers back to specific ticket IDs from Step 3.

Always preserve caveats. If the data was inconclusive, say so. Never claim a winner the data doesn't support.

### Step 6 — Decide whether to spin design variations *(judgment call)*

Re-read the tickets. If any ticket mentions a specific design, page, or screen that needs redesign work in this sprint (e.g., "redesign the pricing page," "review the new onboarding hero"), it's worth generating 3 variations of that artifact so the room has options to argue over. If the tickets are all bug fixes or back-end work, **skip variations** — they'd be noise.

The decision rule:
- **Spin variations** when ≥1 ticket references a design surface that's the topic of the sprint.
- **Skip variations** when the sprint is operational, debugging, or planning-only.

If spinning: cap at **3 variations of one design surface** (the most-referenced one), not a sprawling matrix. Use the `/choose-your-own-path` style — V1 refinement, V2 outcome headline, V3 bolder challenger. Ship as separate MagicPath components.

If skipping: tell the user explicitly "skipping variations because the tickets are operational" so they understand what was *not* generated.

### Step 7 — Pick the single best design-thinking exercise

Look at the brief, the tickets, and the data, and pick **one** exercise. The decision tree:

- Team has many competing options and needs to converge → **Lightning Decision Jam (LDJ)**
- Team needs to generate fresh concept variants quickly → **Crazy 8s + Note-and-Vote**
- Problem framing is unclear → **How Might We + Affinity Diagram**
- Launching something risky next sprint → **Premortem**
- Reviewing many existing designs at once → **Speed Critique / Design Studio**
- Alignment on the user journey is missing → **Journey Map**
- Root-causing a recurring issue → **5 Whys**
- Prioritizing a backlog → **Dot Voting + Effort/Impact 2×2**
- Debating which variation ships → **Note-and-Vote** (with the variations from Step 6)

Pick **one** and commit. Don't list options. The point of this skill is to *facilitate by deciding*, not to widen the menu. If the data is genuinely ambiguous, default to **Lightning Decision Jam** — it's the most general-purpose.

### Step 8 — Build the "Sprint Runbook" MagicPath component

The capstone component. Render the chosen exercise as a how-to-run-it page the facilitator reads from on the day. Include:

- **Exercise name + one-paragraph why-this-fits.** Tie it directly back to the tickets and data, not generic boilerplate.
- **Materials & timing** — how long, what's needed (sticky notes, dot stickers, the canvas itself, etc.).
- **Step-by-step facilitator script** — minute-by-minute, with prompts to read aloud.
- **Inputs to pull in** — links to the Tasks Board (Step 3), the Data Analysis (Step 5), and any variations (Step 6).
- **Decision criteria** — how the room knows it's done. What gets written down. Who owns the next step.
- **A single one-line CTA** at the bottom for what happens *after* the room.

Treat this as the ONE component someone would screenshot and DM a teammate before the meeting.

### Step 9 — Build the "Sprint Room Ready" cover (the Slack-able index)

The capstone-of-the-capstone. After every other component is shipped, build **one final MagicPath component** that acts as the cover/index for the whole room — the single URL the facilitator drops in Slack so the team can jump straight into the canvas and see everything the skill produced.

**The main CTA on this cover must be the project URL minted in Step 1** — the fresh `Run The Room: <descriptor>` project, not the personal default project, not an individual component. The cover is just the door; the room IS that project.

**Use the project URL from Step 1.** Format: `https://www.magicpath.ai/projects/<id>` where `<id>` is the project ID minted in Step 1. Never hand-construct a different URL or substitute a stale project.

**Cover structure:**

- **Header pill** — "Sprint Room Ready · `<topic>`" with the date. The project name (`Run The Room: <descriptor>`) appears in the meta strip.
- **Headline** — the one decision the room is making, phrased as a question.
- **Primary CTA (big, can't-miss button)** — `Open the MagicPath project →` linking to the **Step 1 project URL**. This is the Slack-shareable anchor.
- **Anchor tile** — Sprint Runbook (Step 8) called out as "Read this first" with its own preview link as a secondary action.
- **Two-up cards** — Sprint Tasks Board (Step 3) and Data Analysis (Step 5), each with their preview link.
- **Variation tiles** — if Step 6 produced variations, render each as a tile with its preview link. If a variation is blocked or sprint-2 deferred, mark it visibly (badge + grayscale) — never quietly drop the warning.
- **Quest board ticket strip** — pill list of the top tickets from Step 2 with priority chips, each linking to the source ticket.
- **Meta strip** — `/run-the-room` skill name, **the project name (`Run The Room: <descriptor>`)**, loadout (data spell + quest board), component count, generation date.
- **Share-line footer** — the Step 1 project URL again in plain copy-pasteable text, so a teammate can paste it anywhere.

Build this component **after** the Runbook (Step 8) so every preview link the cover references is already minted. Do not parallelize this with earlier steps — it's the index, it needs everyone else's URLs.

## Quest complete

End with a "Sprint room ready" summary listing, in order:
1. The chosen exercise (one line)
2. **The Sprint Room Ready cover preview link** (called out first — it's the single Slack-able URL that contains the project-file CTA)
3. **The Step 1 project URL** (`https://www.magicpath.ai/projects/<id>`) — the destination of the cover's main CTA, named `Run The Room: <descriptor>`
4. The Sprint Runbook preview link
5. The Sprint Tasks Board preview link
6. The Data Analysis preview link
7. Variation preview links if Step 6 produced any
8. A reminder of the date/time the user mentioned (if they did)

## Rules

- One component per artifact, not N. The Tasks Board is *one* board, not 20 cards. Same for Data Analysis. The room can't navigate 30 tabs.
- Do not offer datasource options outside Mixpanel, Posthog, Optmizely, and LaunchDarkley.
- Do not offer project management options outside Linear and Asana.
- Use the context phrase when introducing a datasource: "this is most likely where you run a/b tests or have analytics on specific urls."
- Stop and ask for missing MCP installs instead of pretending access exists. Point at `/install-magicpath-stack`.
- Never claim a test or sprint outcome the data doesn't support.
- Pick *one* design-thinking exercise — never offer a menu in the runbook.
- Skip Step 6 (variations) silently is not allowed — if you skip, say so out loud and explain why.
- Do not run MagicPath preview/view commands in parallel.
- Push tickets/links into MagicPath only after all source-tool access has been verified.
- **Every run mints a fresh `Run The Room: <descriptor>` project (Step 1).** Never push components from a `/run-the-room` invocation into a pre-existing or default project. Naming is non-negotiable: prefix `Run The Room: ` exactly, then a short title-cased descriptor under 50 chars total.
- Every `code start --project <id>` from Step 3 onward uses the **Step 1 project ID** — never an old one. If a component lands in the wrong project, treat it as a bug, not a sunk cost.
- The Step 9 cover's primary CTA is **always the Step 1 project URL**, never an individual component preview. The cover is just the door. Never hand-construct or substitute a different project URL.
- Build Step 9 last. It depends on every prior preview link existing.

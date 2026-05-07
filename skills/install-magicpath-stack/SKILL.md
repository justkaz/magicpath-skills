---
name: install-magicpath-stack
description: Install and connect the three prerequisites for MagicPath's Mixpanel → MagicPath → Linear workflow — the MagicPath CLI (`magicpath-ai`), the Mixpanel MCP, and the Linear MCP. Use this whenever the user mentions setting up, installing, or wiring up any combination of MagicPath, Mixpanel, or Linear for Claude Code, asks "how do I install the MagicPath CLI", "add the Linear MCP", "connect Mixpanel to Claude", wants to run the `/mixpanel-to-magicpath-to-linear` skill for the first time and needs prerequisites, or is onboarding a teammate to the stack. Also trigger on "install MCPs", "set up my Claude Code for MagicPath", "get me ready for the Mixpanel skill", or similar phrasings. Use this BEFORE running `/mixpanel-to-magicpath-to-linear` so the user has what they need.
---

# Install the MagicPath stack

The `/mixpanel-to-magicpath-to-linear` skill (and any data-driven MagicPath work) needs three things wired into Claude Code first:

1. **MagicPath CLI** (`magicpath-ai@beta`) — scaffolds and builds components on the canvas
2. **Mixpanel MCP** — reads analytics data (events, breakdowns, properties)
3. **Linear MCP** — creates and updates issues

This skill walks through installing and verifying all three. Some steps Claude can automate (npm install, file edits, CLI auth via browser); some require the user to click through an OAuth flow. The skill calls out which is which at each step.

## When to use this skill

Trigger on any onboarding or setup flavor of request:

- "Install the MagicPath CLI" / "set up magicpath-ai"
- "Add the Mixpanel MCP to Claude Code" / "connect Linear to Claude"
- "I want to run `/mixpanel-to-magicpath-to-linear` — what do I need?"
- "Help my teammate get set up with MagicPath + Mixpanel + Linear"
- "Check that my MagicPath stack is installed correctly"

If the user only wants to *run* the pipeline (not install it), don't trigger this — `/mixpanel-to-magicpath-to-linear` handles the running. This skill is strictly for getting the machine ready.

## The flow

### Step 0 — Check what's already installed

Before suggesting any installs, find out what state the machine is in. This saves 5 minutes of needless reinstallation when the user already has some of the pieces.

Run these in parallel and read the results:

```bash
# MagicPath CLI presence + version + auth
npx -y magicpath-ai@beta info -o json 2>&1 | head -30

# Claude Code's registered MCP servers
claude mcp list 2>&1 || echo "claude mcp cmd unavailable"

# Check for common MCP config paths
test -f ~/.claude/settings.json && echo "user-settings exists" || echo "no user-settings"
test -f ./.mcp.json && echo "project mcp config exists" || echo "no project mcp config"
```

From that output, report back what's installed vs. missing. Don't install what's already there.

### Step 1 — Install the MagicPath CLI

The CLI is a regular npm package. Beta track is what the `/mixpanel-to-magicpath-to-linear` skill targets:

```bash
npm install -g magicpath-ai@beta
```

**If this fails with `EACCES`** (macOS default), two options — present both to the user:

- **Preferred:** use a Node version manager (nvm, volta, asdf) so npm can install globally without sudo. Don't prescribe a specific manager; ask the user which they use.
- **Fast path:** skip the global install and use `npx -y magicpath-ai@beta` at every call site. It's slower per-invocation (cache warm-up on first run) but avoids the permission issue entirely. The `/mixpanel-to-magicpath-to-linear` skill already uses `npx` form, so this works fine.

Never suggest `sudo npm install -g` without explicit user acknowledgement — sudo-installed globals cause permission headaches later when the user tries to update or uninstall. If the user says "just use sudo," fine, but flag the caveat once.

After install, verify:

```bash
magicpath-ai info -o json | head -20
# or if using npx form:
npx -y magicpath-ai@beta info -o json | head -20
```

The `cli.version` field must end in `-beta.N` (e.g. `1.5.0-beta.1`). If it doesn't, the package install ran against the wrong dist-tag — reinstall with `@beta` explicit.

### Step 2 — Log into MagicPath

The CLI needs OAuth against the **preview** environment (`preview.magicpath.ai`). Browser flow is ~10 seconds; the user has to sign in, Claude can't do it for them.

```bash
magicpath-ai login
```

This opens a browser to `preview.magicpath.ai/auth/cli?port=...`. User authorizes, the CLI captures the token, and subsequent commands are authed. Verify with:

```bash
magicpath-ai whoami -o json
```

If `auth.authenticated` is `true`, move on. If the wrong environment is authed (production instead of preview), re-run `login` — the beta CLI always points at preview, so this shouldn't happen, but worth a sanity check.

### Step 3 — Add the Mixpanel MCP

Mixpanel ships an MCP server. There are two install paths depending on how the user manages MCP in Claude Code:

#### Path A — `claude mcp add` (Claude Code CLI)

```bash
claude mcp add mixpanel --transport http https://mcp.mixpanel.com/mcp
```

Then open Claude Code, find Mixpanel in the MCP panel, click **Connect**, and complete the OAuth flow (Mixpanel workspace picker in browser). For MagicPath's workspace, the project ID is `3733276` — the user should confirm that's the one they're authing against.

#### Path B — Settings JSON (manual)

If the user prefers editing config directly, add this block to `~/.claude/settings.json` under `mcpServers`:

```json
{
  "mcpServers": {
    "mixpanel": {
      "transport": {
        "type": "http",
        "url": "https://mcp.mixpanel.com/mcp"
      }
    }
  }
}
```

Restart Claude Code, then authorize via the same OAuth flow.

**Sanity check.** After auth, ask Claude to run a trivial Mixpanel call (e.g., `Get-Projects`) and confirm it returns the user's workspace. If it errors with "not authenticated," the OAuth flow didn't complete — re-run.

### Step 4 — Add the Linear MCP

Same two paths, same pattern:

#### Path A — `claude mcp add`

```bash
claude mcp add linear --transport http https://mcp.linear.app/mcp
```

Then authorize through the OAuth panel. The skill's default team for `save_issue` is MagicPath (team id `e371fd83-a17f-42a7-a23d-9b317305ce09`) — if the user's on a different team, they'll swap the default in the SKILL.md later.

#### Path B — Settings JSON

```json
{
  "mcpServers": {
    "linear": {
      "transport": {
        "type": "http",
        "url": "https://mcp.linear.app/mcp"
      }
    }
  }
}
```

**Scope note.** Linear's MCP will ask for `issue:create` and `issue:update` scopes. The first time the skill tries to write, Claude Code will show the user a permission prompt — that's expected, not a bug.

**Sanity check.** Run `list_teams` or `get_user me` via the Linear MCP and confirm the expected team list comes back.

### Step 5 — End-to-end verification

Once all three are installed and authed, smoke-test the full stack in a single message. Have Claude run:

1. `magicpath-ai selection -o json` — proves the CLI is authed
2. `Get-Projects` (Mixpanel MCP) — proves Mixpanel is authed and returns the workspace
3. `list_teams` (Linear MCP) — proves Linear is authed and returns the user's teams

If all three return real data, the stack is ready and the user can immediately run `/mixpanel-to-magicpath-to-linear`.

## Common failure modes

- **`magicpath-ai: command not found`** — the global bin isn't on PATH. Either fix PATH or switch to `npx -y magicpath-ai@beta` in every script/skill reference.
- **MCP server shows up in `claude mcp list` but errors with "not authenticated"** — the server is registered but OAuth wasn't completed. Open Claude Code's MCP panel and click Connect for that server.
- **Mixpanel returns empty results** — might be the wrong workspace. Run `Get-Projects` and confirm the project IDs match what the user expects. For MagicPath, the project_id is `3733276`.
- **Linear returns `403 — team not found`** — the `save_issue` call is using a team id the user doesn't belong to. The default in the `/mixpanel-to-magicpath-to-linear` skill is MagicPath's team; edit the SKILL.md if the user's on a different team.
- **`npm install -g` fails with EACCES on macOS** — the global install dir isn't writable. Use nvm/volta/asdf or fall back to `npx`. Do NOT suggest `sudo`.

## Platform notes

**macOS / Linux.** Everything above works as written. Node 20+ recommended for the MagicPath CLI.

**Windows.** The same npm and `claude mcp` commands work in PowerShell. The only caveat: `~/.claude/settings.json` lives at `%USERPROFILE%\.claude\settings.json` — same file, different path.

**Cowork / remote Claude Code sessions.** Browser-based OAuth (for `magicpath-ai login` and the MCP connects) requires the user to open a link on their local machine. Work through that step interactively rather than trying to automate it.

## What's next

Once the stack is up, the natural next move is to run `/mixpanel-to-magicpath-to-linear` for a first pipeline. Point the user at that skill, and include the one-line example in the handoff so they have something concrete to try:

> Try it: `/mixpanel-to-magicpath-to-linear` with *last 30 days, /blog pages, 3 variations* to get a feel for the flow.

The `/mixpanel-to-magicpath-to-linear` skill's Step 1 (interview) catches the three inputs — date range, filter + count, variations per page — so the user doesn't need to remember the exact query shape.

## What done looks like

When the install finishes, report back:

1. **What was installed** (versions where relevant) — so the user has a record
2. **Three smoke-test outputs** proving each piece is authed and reachable
3. **Next-step prompt** — one paste-ready invocation of `/mixpanel-to-magicpath-to-linear`

If any piece couldn't be auto-installed (OAuth steps, PATH issues), list what the user still needs to do themselves. Don't claim done when it isn't.

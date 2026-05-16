# Getting Started

## Prerequisites

An AI coding tool compatible with Planifest:

| Tool | Setup argument | Notes |
|------|---------------|-------|
| Claude Code | `claude-code` | Full support — enforcement hooks, slash-command workflows, auto-trigger |
| Cursor | `cursor` | Full support |
| Windsurf | `windsurf` | Full support |
| Cline | `cline` | Full support |
| GitHub Copilot | `copilot` | Full support |
| Codex (OpenAI) | `codex` | Full support |
| Google Antigravity | `antigravity` | Full support — installs into `.gemini/skills/` and `GEMINI.md` |
| OpenCode | `opencode` | Tier 2 — separate setup path, requires Bun |
| Roo-Code | `roo-code` | Tier 2 — separate setup path |

No other dependencies. The setup scripts use only built-in OS tools.

---

## New Project

### 1. Add the framework

Copy the `planifest-framework/` folder into your repository root. This folder contains everything: skills, templates, standards, hooks, and setup scripts. Do not modify it per-project — update it when the framework version changes.

### 2. Create the project structure

```bash
mkdir plan plan/changelog src docs
```

| Directory | Purpose |
|-----------|---------|
| `plan/current/` | The active pipeline run — confirmed design, requirements, ADRs |
| `plan/archive/` | Completed plans filed after merge |
| `plan/changelog/` | Record of all changes (`{feature-id}-{YYYY-MM-DD}.md`) |
| `src/` | Component source code, tests, and manifests (`component.yml`) |
| `docs/` | Living repository documentation |

### 3. Run the setup script

**macOS / Linux:**

```bash
chmod +x planifest-framework/setup.sh
./planifest-framework/setup.sh claude-code
```

**Windows (PowerShell):**

```powershell
.\planifest-framework\setup.ps1 claude-code
```

Replace `claude-code` with your tool's setup argument from the table above.

### What setup installs

Setup configures four things:

**Skills** — Agent instruction files copied into the directory your tool auto-discovers. Each skill is a phase agent (orchestrator, spec-agent, codegen-agent, etc.). The tool loads them on demand.

**Boot file** — A project-level instruction file your tool reads at session start. For Claude Code this is `CLAUDE.md`; for Cursor it is `.cursorrules`; for Gemini it is `GEMINI.md`. The boot file enforces the hard limits (no code without a confirmed design, no credentials in context, etc.).

**Git hooks** — Four hooks installed via `git config core.hooksPath planifest-framework/hooks`:

| Hook | Trigger | What it does |
|------|---------|--------------|
| `gate-write` | PreToolUse (Write, Edit) | Blocks writes to `src/` unless `plan/current/design.md` exists and the target path is in scope |
| `auto-trigger-orchestrator` | Session start | Loads the orchestrator skill automatically when a pipeline is active |
| `check-design` | Every prompt | Injects active component scope from `design.md` as context |
| `commit-msg` | `git commit` | Blocks commits that violate the commit standard (see below) |

**CI workflow** — `.github/workflows/planifest.yml` is created, enforcing the same doc-sync check on every pull request.

### Commit standard

The `commit-msg` hook enforces these rules on every commit. Violations block the commit with exit 1:

- Subject line ≤ 72 characters total
- Format: `type(scope): short description` — e.g. `feat(auth-service): add token refresh`
- Imperative mood: "add", "fix", "remove" — not "added", "fixed"
- No AI attribution — `Co-Authored-By: Claude`, `AI-assisted`, model names in an authorship context are all blocked
- No confirmatory language — "Done!", "Fixed!", "Working now"

Use `git commit --no-verify` to bypass intentionally (e.g. for WIP commits on a personal branch).

### Git guardrails (three tiers)

| Tier | When | What happens |
|------|------|--------------|
| **Advisory pre-commit** | Every local commit | Warns if code was staged without docs. Commit succeeds. |
| **Enforcing pre-push** | Every `git push` | Fails if `src/` changed with no corresponding update to `plan/`, `docs/`, or `component.yml` |
| **CI/CD** | Every pull request | Same check in GitHub Actions. Blocks merge on violation. |

The enforcing tiers recognise the `fix(fast-path):` commit prefix and apply a relaxed rule — only `component.yml` or `plan/changelog/` must be updated.

---

## Existing Project

If your repository already has code, use Retrofit mode rather than the new project flow above.

The orchestrator reads your existing codebase and infers the architecture — components, dependencies, and data ownership — before producing a confirmed design. No code is moved or deleted.

See [Retrofit](07-retrofit.md) for the step-by-step process.

---

## Optional: Telemetry

Planifest can emit structured pipeline events (`phase_start`, `phase_end`) to a backend of your choice for team dashboards, audit trails, or CI integration.

Telemetry is **off by default**. It activates only when both of the following are in place:

1. **`PLANIFEST_TELEMETRY_URL` environment variable** — the URL of your telemetry receiver. Events are POSTed to `{PLANIFEST_TELEMETRY_URL}/emit`.
2. **`.claude/telemetry-enabled` sentinel file** — create this empty file in your project root to opt in.

If either is absent, emission is silently skipped — no errors, no warnings.

```bash
touch .claude/telemetry-enabled
export PLANIFEST_TELEMETRY_URL=https://telemetry.yourco.com
```

Each event is a JSON envelope carrying the phase name, agent skill, tool, model, session ID, and timestamp. The orchestrator emits these — phase skills do not. See `planifest-framework/hooks/telemetry/` for the event schema.

---

## Optional: Strict Mode

By default the orchestrator presence check is **advisory**: it injects a reminder banner on each prompt when a pipeline is active, but never blocks the agent.

**Strict mode** upgrades this to a hard gate: the agent cannot process any prompt until it has loaded the orchestrator skill and confirmed the session by writing its session ID to `plan/.orchestrator-ack`. Once confirmed, future prompts in that session pass silently.

Enable strict mode by creating the sentinel file:

```bash
touch plan/.orchestrator-strict
```

| Mode | Behaviour |
|------|-----------|
| Advisory (default) | Banner injected on every prompt — agent may still proceed |
| Strict (`plan/.orchestrator-strict` present) | Agent blocked until `plan/.orchestrator-ack` contains current session ID |

Remove `plan/.orchestrator-strict` to return to advisory mode. The `.orchestrator-ack` file is session-scoped — a new session will trigger re-acknowledgement even if the file already exists.

---

## Optional: Context-Mode MCP

[context-mode](https://github.com/mksglu/context-mode) routes large command output — search results, file analysis, web fetches — into a sandboxed knowledge base. Only summaries enter the context window, keeping agents fast and focused on large codebases.

Install context-mode first, then pass `--context-mode-mcp` to the setup script:

```bash
./planifest-framework/setup.sh claude-code --context-mode-mcp
```

```powershell
.\planifest-framework\setup.ps1 claude-code --context-mode-mcp
```

This adds routing rules (`AGENTS.md`) and, for Claude Code, enforcement hooks that physically prevent the agent from bypassing context-mode with direct Bash or Grep calls.

---

## Updating the Framework

After pulling a new version of `planifest-framework/`, re-run setup to sync the updated skills and hooks:

```bash
./planifest-framework/setup.sh claude-code
.\planifest-framework\setup.ps1 claude-code   # Windows
```

The setup script overwrites generated copies. The source of truth is always `planifest-framework/`.

---

## First Run

### 1. Open your tool in the repository

The orchestrator skill loads automatically on session start (via the `auto-trigger-orchestrator` hook). You do not need to invoke it manually.

### 2. Describe what you want to build

You can either:
- Write a Feature Brief at `plan/current/feature-brief.md` before opening your tool, or
- Simply describe the feature directly in the chat

### 3. Phase 0 — Assess and Coach

The orchestrator begins by assessing your request against the three layers Planifest requires every feature to cover: **Product** (what and why), **Architecture** (non-functional requirements and standards), and **Engineering** (stack, components, data ownership).

It asks one question at a time, in priority order, until every required concern has been addressed or explicitly deferred. Typical questions:

- "What problem does this solve, and for whom?"
- "What are the acceptance criteria for each story — how do you know it's done?"
- "What is the latency target for the primary endpoint?"
- "Which component owns this data?"

When the requirements are complete, the orchestrator produces a **confirmed design** at `plan/current/design.md` and asks you to confirm it before any code is written.

### 4. Pipeline phases

Every response from a Planifest skill begins with a phase prefix so you always know where you are:

| Prefix | Phase |
|--------|-------|
| `P0:` | Assess & Coach |
| `P1:` | Specification |
| `P2:` | ADRs |
| `P3:` | Code Generation |
| `P4:` | Validation |
| `P5:` | Security Review |
| `P6:` | Documentation |
| `P7:` | Ship |
| `P8:` | Build Assessment |
| `PC:` | Change Pipeline |

### 5. Pause and resume

If you need to stop mid-pipeline, say **"pause"**. The orchestrator writes a `plan/current/pause.md` file capturing the exact in-progress state, then stops all pipeline work. In the next session it detects the pause file, resumes from the exact point, and deletes the file.

### 6. After the pipeline

When the pipeline completes:
- A changelog entry is written to `plan/changelog/{feature-id}-{YYYY-MM-DD}.md`
- `plan/current/` artifacts are archived to `plan/archive/{feature-id}/`
- A commit is prepared for your review before push

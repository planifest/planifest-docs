# Getting Started

## Prerequisites

An AI coding tool compatible with Planifest:

| Tool | Notes |
|------|-------|
| Claude Code | Full support including enforcement hooks |
| Cursor | Full support |
| GitHub Copilot | Full support |
| Windsurf | Full support |
| Cline | Full support |
| Codex (OpenAI) | Full support |

No other dependencies. The setup scripts use only built-in OS tools.

## New Project

### 1. Add the framework

Copy the `planifest-framework/` folder into your repository root. This folder contains everything: skills, templates, standards, hooks, and setup scripts.

### 2. Create the project structure

```bash
mkdir plan plan/changelog src docs
```

| Directory | Purpose |
|-----------|---------|
| `plan/current/` | The active pipeline run: confirmed design, requirements, ADRs |
| `plan/archive/` | Historical plans filed after merge |
| `plan/changelog/` | Record of all changes (`{feature-id}-{YYYY-MM-DD}.md`) |
| `src/` | Component source code, tests, and component manifests (`component.yml`) |
| `docs/` | Living repository documentation — component registry, dependency graph |

### 3. Run the setup script

```bash
# macOS / Linux
chmod +x planifest-framework/setup.sh
./planifest-framework/setup.sh claude-code
# other options: cursor  codex  copilot  windsurf  cline  all
```

```powershell
# Windows (PowerShell)
.\planifest-framework\setup.ps1 claude-code
# other options: cursor  codex  copilot  windsurf  cline  all
```

The script installs:

- Skill files into the directory your tool expects
- Supporting files (templates, standards)
- A boot file for your tool (`CLAUDE.md`, `AGENTS.md`, etc.)
- Git hooks for the Progressive Guardrail System

### Git Guardrails

Setup activates a three-tier guardrail system automatically:

| Tier | When | What happens |
|------|------|--------------|
| **Advisory pre-commit** | Every local commit | Warns if code was staged without docs. Commit succeeds. |
| **Enforcing pre-push** | Every `git push` | Fails if `src/` changed with no corresponding update to `plan/`, `docs/`, or `component.yml`. |
| **CI/CD** | Every pull request | Same check in GitHub Actions. Blocks merge on violation. |

The enforcing tiers recognise the `fix(fast-path):` commit prefix and apply a relaxed rule — only `component.yml` or `plan/changelog/` must be updated.

## Optional: Telemetry

Planifest can emit structured pipeline events (`phase_start`, `phase_end`) to a backend of your choice for team dashboards, audit trails, or CI integration.

Telemetry is **off by default**. It activates only when both of the following are in place:

1. **`PLANIFEST_TELEMETRY_URL` environment variable** — the URL of your telemetry receiver (e.g. `https://telemetry.yourco.com`). Events are POSTed to `{PLANIFEST_TELEMETRY_URL}/emit`.
2. **`.claude/telemetry-enabled` sentinel file** — create this empty file in your project root to opt in.

If either is absent, emission is silently skipped — no errors, no warnings.

```bash
# Opt in
touch .claude/telemetry-enabled
export PLANIFEST_TELEMETRY_URL=https://telemetry.yourco.com
```

Each event is a JSON envelope carrying the phase name, agent skill, tool, model, session ID, and timestamp. The orchestrator emits these — phase skills do not. See `planifest-framework/hooks/telemetry/` for the event schema.

## Optional: Strict Mode

By default the orchestrator presence check is **advisory**: it injects a reminder banner on each prompt when a pipeline is active, but never blocks.

**Strict mode** upgrades this to a hard gate: the agent cannot process any prompt until it has loaded the orchestrator skill and confirmed the session by writing its session ID to `plan/.orchestrator-ack`. Once confirmed, future prompts in that session pass silently.

Enable strict mode by creating the sentinel file:

```bash
touch plan/.orchestrator-strict
```

| Mode | Behaviour |
|------|-----------|
| Advisory (default) | Banner injected on every prompt — agent may still proceed |
| Strict (`plan/.orchestrator-strict` present) | Agent blocked until `plan/.orchestrator-ack` contains current session ID |

Remove `plan/.orchestrator-strict` to return to advisory mode. The `.orchestrator-ack` file is session-scoped and can be left in place between sessions — a new session ID will trigger re-acknowledgement.

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

## Optional: Full External Skill Library

Planifest ships with a curated library of 200+ open-source skills (MIT/Apache-2.0 licensed). Not installed by default:

```bash
./planifest-framework/setup.sh claude-code --include-full-skill-library
```

See [Agent Skills Reference](08-agent-skills-reference.md) for details on what's included.

## Updating the Framework

After updating any files in `planifest-framework/`:

```bash
# Re-run setup to sync changes to your tool's directory
./planifest-framework/setup.sh claude-code
.\planifest-framework\setup.ps1 claude-code   # Windows
```

The setup script overwrites generated copies. The source of truth is always `planifest-framework/`.

## First Run

1. Open your AI tool in the repository
2. Write a Feature Brief at `plan/current/feature-brief.md`, or simply describe what you want to build
3. The orchestrator skill loads automatically and begins Phase 0 — Assess and Coach

The orchestrator will ask you questions about the feature — one at a time — until it has everything it needs to produce the confirmed design. Once you confirm the design, the pipeline runs.

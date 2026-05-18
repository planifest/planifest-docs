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
| `plan/_archive/` | Completed plans filed after merge |
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

**Git hooks** — Hooks installed via `git config core.hooksPath planifest-framework/hooks`:

| Hook | Trigger | What it does |
|------|---------|--------------|
| `gate-write` | PreToolUse (Write, Edit) | Blocks writes to `src/` unless `plan/current/design.md` exists and the target path is in scope |
| `auto-trigger-orchestrator` | Session start | Loads the orchestrator skill automatically when a pipeline is active |
| `check-design` | Every prompt | Injects active component scope from `design.md` as context |
| `commit-msg` | `git commit` | Blocks commits that violate the commit standard |

**CI workflow** — `.github/workflows/planifest.yml` is created, enforcing the doc-sync check on every pull request.

→ For git guardrails, the commit standard, and how the orchestrator sentinel works: [Project Operations](11-project-operations.md)

---

## Existing Project

If your repository already has code, use Retrofit mode rather than the new project flow above.

The orchestrator reads your existing codebase and infers the architecture — components, dependencies, and data ownership — before producing a confirmed design. No code is moved or deleted.

See [Retrofit](07-retrofit.md) for the step-by-step process.

---

## Optional: Telemetry

Planifest emits structured pipeline events (`phase_start`, `phase_end`) via [structured-telemetry-mcp](https://github.com/planifest/structured-telemetry-mcp).

Telemetry is **off by default**. To enable it, install [structured-telemetry-mcp](https://github.com/planifest/structured-telemetry-mcp) first, then pass `--structured-telemetry-mcp` to the setup script:

```bash
./planifest-framework/setup.sh claude-code --structured-telemetry-mcp
```

```powershell
.\planifest-framework\setup.ps1 claude-code --structured-telemetry-mcp
```

The setup script writes the opt-in sentinel and wires the emission hooks automatically. See the [structured-telemetry-mcp](https://github.com/planifest/structured-telemetry-mcp) repo for installation and configuration.

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

---

## Optional: Full External Skill Library

Planifest ships with a curated library of 200+ open-source agent skills (MIT/Apache-2.0 licensed) covering frontend design, testing strategies, infrastructure patterns, and more. Not installed by default — add them with:

```bash
./planifest-framework/setup.sh claude-code --include-full-skill-library
```

```powershell
.\planifest-framework\setup.ps1 claude-code --include-full-skill-library
```

See [Agent Skills Reference](08-agent-skills-reference.md) for the full list and what each skill provides.

---

## 4. Open your tool and describe what you want to build

Open your AI tool in the repository. The orchestrator skill loads automatically on session start — you do not need to invoke it manually.

Describe what you want to build in plain language. For example:

```
I want to add a user authentication system with email/password login and JWT tokens.
```

The orchestrator begins **Phase 0 — Assess and Coach**. It will ask you questions one at a time — about the problem, the users, the acceptance criteria, your stack, and non-functional requirements — until it has everything it needs. You do not need to prepare a feature brief in advance; the orchestrator coaches you through it.

**If you prefer to prepare in advance**, copy the feature brief template and fill it in before opening your tool:

```bash
cp planifest-framework/templates/feature-brief.template.md plan/current/feature-brief.md
```

The orchestrator reads it at session start and skips questions you have already answered.

---

## 5. Confirm the design and run the pipeline

When the orchestrator has gathered enough information, it produces a **confirmed design** at `plan/current/design.md` and presents it for your approval. No code is written until you confirm.

After confirmation, the orchestrator asks:

```
Do you want to review and confirm after each phase completes, or authorise a
continuous run for this session?

  [1] Check after each phase
  [2] Continuous run — proceed without phase confirmations
```

The pipeline then runs through all phases. Every response begins with a phase prefix so you always know where you are:

| Prefix | Phase |
|--------|-------|
| `P0:` | Assess & Coach |
| `P1:` | Specification |
| `P2:` | ADRs |
| `P3:` | Code Generation |
| `P4:` | Validation |
| `P5:` | Security Review |
| `P6:` | Documentation |
| `P7:` | Archive |
| `P8:` | Build Assessment |
| `P9:` | Ship |
| `PC:` | Change Pipeline |

If you need to stop mid-pipeline, say **"pause"**. The orchestrator writes `plan/current/pause.md` capturing the exact in-progress state and stops all pipeline work. In the next session it resumes from the exact point and deletes the file.

---

## Next Steps

| Topic | Where to look |
|-------|---------------|
| Git guardrails and how enforcement works | [Project Operations](11-project-operations.md#git-guardrails) |
| Commit message standard | [Project Operations](11-project-operations.md#commit-standard) |
| Orchestrator sentinel and strict mode | [Project Operations](11-project-operations.md#orchestrator-sentinel) |
| Customising with planifest-overrides | [Project Operations](11-project-operations.md#customising-with-planifest-overrides) |
| Updating the framework | [Project Operations](11-project-operations.md#updating-the-framework) |
| What to commit | [Project Operations](11-project-operations.md#what-to-commit) |
| Retrofit an existing project | [Retrofit](07-retrofit.md) |
| Fast Path and Change Pipeline | [The Pipeline](03-pipeline.md#fast-path) |
| Phase mechanics and confirmation gates | [The Pipeline](03-pipeline.md) |

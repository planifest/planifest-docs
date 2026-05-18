---
title: "Requirement: REQ-001 - expand-pipeline-reference"
summary: "Expand pipeline-reference.md with detailed step-by-step sections for all ops topics moved out of getting-started.md."
status: "active"
version: "0.1.0"
---
# Requirement: REQ-001 - expand-pipeline-reference

**Skill:** spec-agent
**Feature:** 0000002-doc-structure
**Source:** US-003
**Priority:** must-have

---

## User Story

As a user who needs depth, I find detailed step-by-step explanations of all ops topics in pipeline-reference.md, so that I do not need to read source code or skill files to understand how Planifest works.

---

## Functional Requirements

- `planifest-framework/pipeline-reference.md` must be expanded with new sections inserted after the existing "Change Pipeline" section and before the existing "Customising with planifest-overrides" section
- New sections to add, in this order:
  1. **Git Guardrails** — three-tier enforcement model with the tier table; hook file location (`planifest-framework/hooks/`); `git config core.hooksPath` wiring; CI workflow path (`.github/workflows/planifest.yml`); `fix(fast-path):` prefix behaviour at each tier; what happens on a violation at each tier
  2. **Orchestrator Sentinel** — full sentinel lifecycle (created at P0, checked each turn, deleted last at P7); the three hooks (gate-write, check-orchestrator-presence, check-design) with detailed descriptions of what each does and when; the sentinel file path and contents; manual recovery instructions (what to delete and in what order); how `plan/current/design.md` interacts with gate-write
  3. **Strict Orchestrator Mode** — what `plan/.orchestrator-strict` enables; the hard-block banner behaviour; the ack file (`plan/.orchestrator-ack`) — when it is written and what value it contains; when the ack file is deleted; the setup command (bash and PowerShell) with the `--strict-orchestrator` flag
  4. **Retrofit an Existing Project** — the four setup steps; the full discovery protocol the orchestrator runs in retrofit mode: entry point scan (package.json, go.mod, etc.), component identification, data ownership mapping, API contract discovery, pattern detection, tech debt surfacing; what the orchestrator presents to the human after discovery
  5. **Updating the Framework** — what "updating" means (pulling new planifest-framework/ files); the full command matrix: base command, `--context-mode-mcp`, `--context-mode-mcp --structured-telemetry-mcp` variants for both bash and PowerShell; idempotency guarantee; note on migrations (check `planifest-framework/migrations/` for pending `.md` files after update)
  6. **What to Commit** — the full path/commit/why table; guidance on what "Optional" means (can be `.gitignore`d and regenerated); note that `planifest-overrides/` must always be committed to share team customisations
- The existing "Customising with planifest-overrides" section must remain unchanged
- Section heading anchors (lowercase, hyphenated) must match the anchors referenced in project-operations.md pointer lines

## Acceptance Criteria

- [ ] Six new sections appear in pipeline-reference.md in the order listed, inserted between "Change Pipeline" and "Customising with planifest-overrides"
- [ ] Git Guardrails section includes the three-tier table, hook file location, CI workflow path, and fix(fast-path): prefix behaviour
- [ ] Orchestrator Sentinel section includes full lifecycle, all three hooks with detailed descriptions, sentinel file path, and manual recovery instructions
- [ ] Strict Orchestrator Mode section includes the ack file lifecycle and both setup commands
- [ ] Retrofit section includes the four setup steps and the full discovery protocol checklist
- [ ] Updating section includes all command variants (base, context-mode, both MCPs) for both bash and PowerShell, plus the migrations note
- [ ] What to Commit section includes the full table with the "Optional" guidance note
- [ ] All section anchors match the anchors used in project-operations.md (verified after REQ-002 is complete)

## Dependencies

- No upstream requirement dependencies — must be implemented first
- REQ-002 and REQ-003 pointer lines reference anchors defined here — anchor names must be stable once written

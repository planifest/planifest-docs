# Change Pipeline

The Change Pipeline handles targeted modifications to existing features — bug fixes, small additions, or updates to 1–2 components with fewer than three new user stories.

## When to Use

Route to the Change Pipeline when:

- Fixing a bug in an existing component
- Adding a small feature to an existing component (< 3 user stories)
- Adding a new component to an existing feature
- Updating behaviour without changing the problem statement

If the change spans more than two components, requires new infrastructure, or introduces three or more new user stories, use the Feature Pipeline instead.

## How It Works

The `planifest-change-agent` skill handles the change. It:

1. **Loads domain context** — reads the affected component's manifest (`component.yml`), its data contracts, consumers, and change policy
2. **Implements the minimum necessary change** — no refactoring beyond scope
3. **Validates** — runs CI checks (lint, typecheck, test, build)
4. **Checks for contract or schema changes** — flags anything that could break consumers
5. **Updates documentation** — `component.yml`, per-component docs, and the changelog

## Invoking

Tell the orchestrator what you want to change. It will confirm:

- Which feature is affected
- Which component(s) are involved
- What the change is

No Feature Brief, Execution Plan, or ADRs are required unless the change is architecturally significant. If the request is ambiguous, the orchestrator asks one clarifying question at a time before proceeding.

## Mid-Pipeline Requirement Changes

If requirements change while a pipeline is running:

| Scope of change | Action |
|-----------------|--------|
| Cosmetic (naming, wording, formatting) | Fix in place, continue |
| Additive (new user story, new endpoint) | Update spec artifacts, re-run from the earliest affected phase |
| Contradictory (reverses a prior decision) | Halt, update the confirmed design, create an ADR for the reversal, re-run from P1 |

Re-running a phase invalidates all downstream phases. Always regenerate from the updated spec — never patch generated code manually to match a spec change. The change is recorded in `plan/current/build-log.md`.

## Commit Convention

Change Pipeline commits follow the standard commit format defined in `planifest-framework/standards/commit-standards.md`. The pre-push hook and CI check require `plan/`, `docs/`, or `component.yml` to be updated alongside any `src/` change.

# The Pipeline

Planifest's pipeline takes a confirmed design from requirements to a production-ready pull request in nine phases. Each phase is driven by a dedicated skill, invoked by the orchestrator.

## Phase Overview

| Prefix | Phase | What happens |
|--------|-------|--------------|
| `P0:` | Assess & Coach | Orchestrator reads the Feature Brief, identifies gaps across the three layers, asks the human to fill them one at a time, and produces the confirmed design at `plan/current/design.md`. |
| `P1:` | Spec | spec-agent produces requirements artifacts: execution plan, scope, risk register, domain glossary, operational model, SLO definitions, cost model. |
| `P2:` | ADRs | adr-agent produces Architecture Decision Records for every significant decision: stack choice, database, auth strategy, deployment topology, component boundaries. |
| `P3:` | Codegen | codegen-agent generates the full implementation: application code, shared types, tests, infrastructure as code, Dockerfiles. |
| `P4:` | Validate | validate-agent runs CI checks (lint, typecheck, test, build) and self-corrects up to five times. Halts and reports if checks cannot be resolved. |
| `P5:` | Security | security-agent produces a security report with STRIDE threat model and findings categorised by severity. |
| `P6:` | Docs | docs-agent produces living documentation: per-component docs, system-wide component registry, dependency graph. |
| `P7:` | Ship | ship-agent raises the PR, writes the changelog, processes skip records, archives `plan/current/`. |
| `P8:` | Build Assessment | build-assessment-agent reads the archived build log and produces an efficiency report: model routing, parallelism, self-corrections, context behaviour. |

## Phase Indicators

Every agent response begins with a phase prefix. You always know where you are.

| Format | Meaning |
|--------|---------|
| `Px: Starting — {description}` | Entering a phase |
| `Px: Resuming — {what was in progress, what is next}` | Continuing after a session break |
| `Px: Complete — {summary}` | Phase finished |
| `P0: Blocked — {gap}` | Waiting for human input |
| `Px: Skipped — {reason}` | Phase bypassed at human request |
| `PC:` | Change Pipeline — targeted change to an existing feature |

## Confirmation Gates

At the end of Phase 0, before the pipeline begins, you choose how you want to run:

```
Do you want to review and confirm after each phase completes, or authorise a
continuous run for this session?

  [1] Check after each phase
  [2] Continuous run — proceed without phase confirmations
```

Per-phase gates may be skipped automatically in continuous run mode if there is genuinely nothing to review (e.g. P5 with zero security findings, P4 with all checks passing first attempt).

**P7 always stops.** Raising a PR is external and irreversible — it is never auto-confirmed, even in continuous run mode.

## Skipping a Phase

To skip a phase, tell the orchestrator explicitly (e.g. "skip security" or "skip ADRs"). It will:

1. Acknowledge immediately — no argument
2. Append a skip record to `plan/current/.skips`
3. Continue to the next phase

Skipped phases are included in the changelog when the plan is archived at P7.

## Pause and Resume

Say "pause" at any point. The orchestrator writes `plan/current/pause.md` with the exact in-progress state and stops all pipeline work. In a new session, the orchestrator detects the file and resumes from the exact pause point — then deletes the file.

## Artifacts by Phase

| Phase | Artifacts written |
|-------|------------------|
| P0 | `plan/current/design.md`, `plan/.orchestrator-active` |
| P1 | `plan/current/requirements/*.md`, `plan/current/scope.md`, `plan/current/risk-register.md`, `plan/current/domain-glossary.md` |
| P2 | `plan/current/adr/*.md` |
| P3 | `src/{component-id}/` |
| P4 | `plan/current/test-report.md` |
| P5 | `plan/current/security-report.md` |
| P6 | `docs/`, `src/{component-id}/docs/` |
| P7 | PR raised, `plan/changelog/{feature-id}-{date}.md`, `plan/archive/{feature-id}-{date}/` |
| P8 | `plan/archive/{feature-id}-{date}/build-report.md` |

## Build Log

Every pipeline run produces `plan/current/build-log.md` — a structured record of phases executed, model tiers used, skills invoked, MCP call counts, and parallel task batches. The build-assessment-agent reads this at P8 to produce the efficiency report.

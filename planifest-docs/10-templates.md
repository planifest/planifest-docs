# Templates Reference

Planifest's templates define the structure of every artifact produced by the pipeline. Agents read the relevant template immediately before generating output — the template is the most recent thing in the agent's attention window when it writes the corresponding artifact, preventing template drift across sessions.

All templates live in `planifest-framework/templates/`. Most have a companion guide (`*-guide.md`) that explains the intent behind each field.

## Feature Brief

`feature-brief.template.md` — The human-authored document that starts every pipeline run. Sections: business goal, features and user stories, phase groupings, target architecture and components, stack declaration, scope boundaries (in / out / deferred), and acceptance criteria.

## Confirmed Design

`design.template.md` — The locked plan produced at the end of P0. Covers all three layers (Product, Architecture, Engineering) plus the skill map, ADR index, component list, and adoption mode. Immutable once the human confirms it.

## Requirement

`requirement.template.md` — One file per requirement, produced by the spec-agent in P1. Sections: user story, acceptance criteria, scope, risk level, input validation (when applicable), and the ADR reference. Requirements are the test cases — vagueness here propagates to P3 and P4.

## Execution Plan

`execution-plan.template.md` — The ordered list of requirements produced by the spec-agent. Includes dependency order, phase grouping for multi-phase features, and estimated effort per requirement.

## Scope

`scope.template.md` — Explicit statement of what is in scope, out of scope, and deferred. All three sections must be populated — "nothing deferred" is a valid entry, but the section cannot be omitted.

## Domain Glossary

`domain-glossary.template.md` — Shared vocabulary for the feature domain. Prevents terminology drift between requirements, ADRs, and code. Agents use it to resolve ambiguous terms during P3.

## Risk Register

`risk-register.template.md` — Identified risks with likelihood, impact, and mitigation. At least one entry is required before P1 completes. Risks are reassessed at P5 (security) and P8 (build efficiency).

## Architecture Decision Record (ADR)

`adr.template.md` — Records a significant architectural decision: context, the decision made, alternatives considered, and consequences. One ADR per decision, produced in P2. ADRs are immutable after confirmation — changes require a new ADR referencing the original.

## Component Manifest

`component.template.yml` — The machine-readable descriptor for a component. Fields: identity, purpose, stack, responsibilities, data ownership, consumers, contracts, quality metrics, and pipeline metadata. Written by agents after P3, read by agents before any change in subsequent sessions. This is how Planifest gives agents context about existing components without requiring them to re-read all the source code.

## Data Contract

`data-contract.template.md` — Defines the interface between a data-owning component and its consumers: schema, versioning, breaking-change policy, and migration strategy. Required when a component exposes data to another.

## Operational Model

`operational-model.template.md` — How the component runs in production: deployment topology, scaling policy, failure modes, alerting thresholds, and on-call responsibilities.

## SLO Definitions

`slo-definitions.template.md` — Service Level Objectives: which SLIs are measured, their targets, error budget policy, and review cadence.

## Cost Model

`cost-model.template.md` — Cost drivers, per-unit cost estimates, and budget boundaries. Informs infrastructure choices during P2 and P3.

## Security Report

`security-report.template.md` — P5 output. STRIDE threat model, findings by severity (critical / high / medium / low), and recommended mitigations. Critical and high findings are flagged at the P7 gate.

## Test Report

`test-report.template.md` — P4 output. CI check results per check, self-correction count, coverage summary, and any unresolved failures.

## Build Log

`build-log.template.md` — Structured record of the pipeline run: phases executed, model tiers used, skills invoked, MCP call counts, parallel task batch counts. Created at P0, appended throughout, read by the build-assessment-agent at P8.

## Change Summary

`change-summary.template.md` — PR description template. Structured summary of what changed, why, which requirements are satisfied, and which phases were skipped (if any).

## Iteration Log

`iteration-log.template.md` — Audit trail of every significant agent action during the pipeline run: what was done, what was found, what deviated from the spec and why.

## Recommendations

`recommendations.template.md` — Post-pipeline observations from the docs-agent: patterns to standardise, tech debt to address, deferred items to revisit, and future improvements.

## Pause State

`pause.template.md` — Written when the human says "pause". Records the active phase, the task in progress, the last artifact written, and enough in-progress state for exact-point resume in a new session.

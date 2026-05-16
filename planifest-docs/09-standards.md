# Standards Reference

Planifest ships with a set of standards that agents consult during code generation, spec writing, and architecture decisions. Standards encode what *correct* looks like for each concern — not guidelines, but constraints that agents read before generating relevant output.

All standards live in `planifest-framework/standards/`.

## API Design

`api-design-standards.md` — REST/HTTP API conventions: resource naming, HTTP method semantics, status codes, error response formats, pagination patterns, and versioning strategy.

## Build Target

`build-target-standards.md` — How to declare compute targets in the stack (`docker`, `node`, `lambda`, etc.) and what each declaration implies for agents generating Dockerfiles, IaC, and deployment configuration. When `compute: docker` appears in the stack, agents never check host runtimes — they build for the declared target.

## Code Quality

`code-quality-standards.md` — Code quality rules: complexity thresholds, naming conventions, module boundaries, and the criteria for what constitutes a self-correction versus an escalation to the human.

## Commit

`commit-standards.md` — Commit message format enforced by the `commit-msg` git hook. Key rules: no AI attribution, no affirmatory language ("implemented", "created", "added" are fine; "as requested" is not), subject line ≤ 72 characters, imperative mood. The hook exits 1 on violation.

## Database

`database-standards.md` — Database conventions: migration sequencing, schema change safety, naming rules, and the proposal protocol required before any destructive operation. Drop column, drop table, or rename: propose first, stop for human approval, never execute without it.

## Deployment

`deployment-standards.md` — Deployment patterns: blue-green, canary, rollback readiness, and how infrastructure as code is structured per component.

## Formatting

`formatting-standards.md` — Code formatting rules by language. Enforced by the lint step in P4.

## Infrastructure

`infrastructure-standards.md` — Cloud infrastructure conventions: resource tagging, naming, IAM least-privilege, secrets management, and cost tagging requirements.

## Language Quirks (en-GB)

`language-quirks-en-gb.md` — British English conventions used throughout the framework's own documentation, templates, and generated output.

## Monorepo

`monorepo-standards.md` — How to structure a monorepo within Planifest: component directory layout, shared code policy (`src/shared/` only when genuinely needed by two or more components), build isolation, and the rule that no two components write to the same data store.

## Observability

`observability-standards.md` — Structured logging schema, metrics naming conventions, distributed tracing requirements, and which SLIs must be instrumented for every component.

## Stack Summary

`stack-summary.md` — A comparative summary of supported stacks for frontend, backend, and infrastructure. Includes agent-specific considerations: first-pass compilation rates, type safety at generation time, and where each stack tends to produce reliable agent output. Use this as a starting point; see `standards/reference/` for deep evaluations.

## Telemetry

`telemetry-standards.md` — The Planifest framework's own telemetry: 14 event types emitted during a pipeline run (`phase_start`, `phase_end`, `spec_gap`, `adr_decision`, `security_finding`, and others), the event envelope format, and how to configure `PLANIFEST_TELEMETRY_URL` to receive them. Set the environment variable to enable; no-op when absent.

## Testing

`testing-standards.md` — Testing conventions: TDD red-green-refactor cycle (one failing test → minimum green code → refactor), coverage requirements, test isolation rules, and the distinction between unit, integration, and end-to-end tests.

## Library Standards

`standards/library-standards/` — Language-specific library selection standards. Defines preferred libraries for common concerns (HTTP clients, ORMs, loggers, validation) per stack, preventing agents from selecting arbitrary dependencies.

## Reference Material

`standards/reference/` — Deep-dive evaluations: backend stack evaluation, frontend stack evaluation, and observability patterns. Excluded from semantic search indexes by default (`.cursorindexingignore`) to preserve context window capacity. Read them explicitly when you need them.

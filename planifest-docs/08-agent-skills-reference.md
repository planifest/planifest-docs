# Agent Skills Reference

Planifest is delivered as **Agent Skills** — structured files that compatible AI tools discover and load automatically. There are two categories: Planifest's built-in pipeline skills, and an optional curated library of external skills.

## Planifest Built-in Skills

### Pipeline Skills

These ten skills drive the pipeline. The orchestrator invokes them in sequence.

| Skill | Phase | What it does |
|-------|-------|--------------|
| `planifest-orchestrator` | P0 | Entry point. Coaches the human through gaps in the Feature Brief, produces the confirmed design, routes requests to the correct track, and invokes all phase skills in sequence. |
| `planifest-spec-agent` | P1 | Produces requirements artifacts: execution plan, scope document, risk register, domain glossary, operational model, SLO definitions, cost model. |
| `planifest-adr-agent` | P2 | Produces Architecture Decision Records for every significant decision: stack choice, database, auth strategy, deployment topology, component boundaries. |
| `planifest-codegen-agent` | P3 | Generates the full implementation: application code, shared types, tests, infrastructure as code, Dockerfiles. Orchestrates a TDD inner loop using the test-writer, implementer, and refactor skills. |
| `planifest-validate-agent` | P4 | Runs CI checks (lint, typecheck, test, build). Self-corrects up to five times. Halts and reports context if resolution is not possible within the limit. |
| `planifest-security-agent` | P5 | Produces a security report with a STRIDE threat model and specific findings categorised by severity (critical / high / medium / low). |
| `planifest-docs-agent` | P6 | Produces living documentation: per-component docs at `src/{component-id}/docs/`, system-wide component registry and dependency graph at `docs/`. |
| `planifest-ship-agent` | P7–P9 | Owns the complete close-out sequence. P7: writes the changelog, processes skip records, archives `plan/current/`. P8: spawns build-assessment-agent as a sub-agent. P9: creates a local git tag, then raises the PR via `gh pr create` or outputs a PR description for manual use. |
| `planifest-build-assessment-agent` | P8 | Runs as a sub-agent spawned by ship-agent. Reads the archived build log and produces an efficiency report: model routing decisions, parallelism usage, self-correction count, context window behaviour. |

### Specialist Skills

These skills are invoked for specific purposes outside the main pipeline sequence.

| Skill | When invoked | What it does |
|-------|-------------|--------------|
| `planifest-change-agent` | Change Pipeline | Loads domain context for the affected component, implements the minimum change, validates, checks for contract or schema changes, updates documentation. |
| `planifest-migrator` | Session start | Executes pending framework migrations found in `planifest-framework/migrations/`. Runs before any phase work when a migration file is detected. |
| `planifest-test-writer` | P3 (TDD red phase) | Writes exactly one failing test per requirement and confirms non-zero exit before handing off to the implementer. |
| `planifest-implementer` | P3 (TDD green phase) | Writes the minimum code to make one failing test pass and confirms zero exit before handing off to the refactor skill. |
| `planifest-refactor` | P3 (TDD refactor phase) | Improves code quality while keeping all tests passing. |
| `planifest-optimise-agent` | On demand | Reviews framework skills for superfluous content and presents one suggestion at a time for human confirmation. Never modifies files without explicit approval. |

## External Skills Library

Planifest ships with a curated library of 200+ open-source skills from 19 upstream repositories, all under MIT or Apache-2.0 licences. These are **not installed by default**.

### Installing

```bash
# macOS / Linux
./planifest-framework/setup.sh claude-code --include-full-skill-library

# Windows (PowerShell)
.\planifest-framework\setup.ps1 claude-code --include-full-skill-library
```

### What's Included

| Category | Example skills |
|----------|---------------|
| **Architecture** | `architecture-ddd`, `architecture-microservices`, `architecture-monolith`, `c4-diagramming`, `clean-architecture` |
| **Frontend** | `frontend-design`, `react-component-design`, `nextjs-best-practices`, `vue-best-practices`, `refactoring-ui` |
| **Backend** | `fastapi-service-development`, `express-api-development`, `golang-pro`, `rust-pro`, `python-pro` |
| **Testing** | `testing-tdd`, `testing-bdd`, `testing-e2e`, `webapp-testing`, `playwright` |
| **Security** | `security-threat-modeling`, `security-secure-coding`, `api-security`, `vulnerability-scanner` |
| **Infrastructure** | `terraform-skill`, `kubernetes-deployment`, `docker-expert`, `aws-cdk-development` |
| **Databases** | `database-design`, `db-migration-strategy`, `postgresql-optimization` |
| **Observability** | `observability-logging`, `observability-metrics`, `observability-tracing` |
| **Product** | `spec-driven-development`, `user-story-writing`, `jobs-to-be-done`, `requirement-elicitation` |
| **Git & CI** | `git-workflow-and-versioning`, `github-actions-workflow-design`, `ci-cd-pipeline-design` |

Full licence attribution is in each skill's `attribution.txt` file.

## Capability Skills

Teams can add their own custom skills — either scoped to a single project or installed permanently:

| Scope | Location |
|-------|---------|
| Project-scoped | `plan/current/capability-skills/{name}/` |
| Permanent | `planifest-overrides/capability-skills/{name}/` |

Drop a `SKILL.md` file in `planifest-framework/skills-inbox/` and the orchestrator will detect it at session start (or at each phase transition) and prompt you to choose a scope before installing it.

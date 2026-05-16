# Retrofit

Retrofit is the adoption mode for bringing an existing codebase into Planifest. Instead of starting from a Feature Brief, the orchestrator reads the codebase first — inferring architecture, patterns, and existing decisions — then proceeds with an informed coaching conversation.

## When to Use

Use Retrofit when:

- You have existing code in `src/` with no Planifest manifests or plan artifacts
- You want to start using the pipeline for an existing project
- You need to produce `component.yml` manifests and `docs/` artifacts for existing components

## Discovery

Before Phase 0 coaching begins, the orchestrator runs a structured codebase scan:

| Step | What it looks for |
|------|-------------------|
| **Entry points** | `package.json`, `go.mod`, `requirements.txt`, `Cargo.toml`, `Makefile`, `Dockerfile`, `docker-compose.yml` — reveals the stack |
| **Components** | Directories with their own build or test configuration — candidates for `component.yml` manifests |
| **Data ownership** | Database connections, ORM config, migration files — which component owns which tables or collections |
| **API contracts** | Route definitions, controllers, gRPC proto files — drafts an OpenAPI spec from what exists |
| **Existing patterns** | Auth middleware, logging, error handling, testing conventions — recorded as constraints in the confirmed design |
| **Tech debt** | Inconsistencies, missing tests, deprecated dependencies, security concerns — recorded in the risk register |

The orchestrator presents a discovery summary before coaching begins. Questions the codebase already answers don't need to be asked — but conflicts the codebase reveals do.

## Steps

1. **Load the orchestrator** — it detects the adoption mode and begins discovery
2. **Review the discovery summary** — confirm the orchestrator's inferences are correct or redirect where they are not
3. **Phase 0 coaching** — informed by the codebase, not just a brief. Fewer gaps to fill because the code answers them; more to discuss if the code reveals conflicts.
4. **Proceed through the pipeline** — once the confirmed design is locked, Phases 1–7 run as normal

## Notes

- The spec-agent also operates in retrofit mode — it reads the codebase before producing artifacts
- Existing architecture decisions should be captured as ADRs, not re-decided
- The adoption mode is recorded in the confirmed design: `adoption_mode: retrofit`
- **Monorepos:** each directory with its own build configuration becomes a separate component with its own `component.yml`. Shared code goes in `src/shared/` only when genuinely needed by two or more components.
- **Data ownership:** if two components write to the same tables, the orchestrator will coach you to redesign with a single owning component. Two components writing to the same data store is a hard limit violation.

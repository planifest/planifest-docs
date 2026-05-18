---
title: "Domain Glossary - 0000003-p9-phase-docs"
---
# Domain Glossary - 0000003-p9-phase-docs

| Term | Definition |
|------|------------|
| **P7 — Archive** | The seventh pipeline phase. ship-agent writes the changelog, processes skip records, writes `.feature-id`, confirms regressions, and archives `plan/current/` to `plan/_archive/`. Does NOT raise the PR. |
| **P8 — Build Assessment** | The eighth pipeline phase. Spawned as a sub-agent by ship-agent. Reads the archived build log and produces an efficiency report at `plan/_archive/{feature-id}-{date}/build-report.md`. |
| **P9 — Ship** | The ninth and terminal pipeline phase. ship-agent creates a local git tag (`v{version}`), then asks the human whether to push and raise the PR or output a PR description for manual use. Always stops — never auto-confirmed. |
| **Hard Limit** | A non-negotiable rule in the orchestrator. Violation is a pipeline error, not a warning. Hard Limit 8: build log must have a phase block for every phase; a missing block halts the pipeline. |
| **build log** | `plan/current/build-log.md`. Mandatory structured record appended by the orchestrator at every phase boundary. Records model tier, skills loaded, agent count, MCP calls, parallel task batches. Archived at P7; read by build-assessment-agent at P8. |
| **ship-agent** | `planifest-ship-agent`. Owns the complete close-out sequence P7–P9. A single skill invocation from the orchestrator; the agent emits P7, P8, and P9 prefixes as it moves through each step. |
| **local-git-only** | An override instruction placed in `planifest-overrides/instructions/`. When present, signals to ship-agent at P9 to skip the push/PR prompt and output a PR description for manual use. Use case: teams that push manually or enforce human-in-the-loop for git push. |
| **planifest-overrides** | Project-specific customisation layer at `planifest-overrides/`. Committed to the repo, never overwritten by setup scripts. Contains `instructions/`, `capability-skills/`, and `library-standards/` subdirectories. |
| **anchor link** | A markdown hyperlink with a fragment identifier (e.g. `#section-name`). Broken if the target heading does not exist in the linked file. |
| **sub-agent** | An agent session spawned by a parent agent to handle an isolated task. The build-assessment-agent runs as a sub-agent of ship-agent — it is not invoked directly by the orchestrator. |

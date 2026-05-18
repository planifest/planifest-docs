---
title: "Domain Glossary - doc-structure"
summary: "Ubiquitous language for feature 0000002-doc-structure."
status: "active"
version: "0.1.0"
---
# Domain Glossary - doc-structure

**Skill:** spec-agent
**Tool:** Claude Code
**Model:** claude-sonnet-4-6
**Feature:** 0000002-doc-structure
**Version:** 0.1.0

---

## Terms

| Term | Definition | Aliases | Used In |
|------|-----------|---------|---------|
| getting-started.md | The first-run walkthrough doc — covers prerequisites and the five steps to run a first pipeline. After this feature: lean, no ops reference content. | — | getting-started.md |
| project-operations.md | New brief high-level ops reference doc created by this feature. Covers all ops topics in short sections with pointers to pipeline-reference.md for depth. | ops reference | project-operations.md |
| pipeline-reference.md | The existing deep reference doc for pipeline mechanics. Expanded by this feature with detailed ops sections. | pipeline reference, deep reference | pipeline-reference.md |
| first-run walkthrough | The minimal path a new user follows to set up Planifest and run their first pipeline. Scope: prerequisites + steps 1–5. Everything else is ops reference or pipeline reference. | getting started | getting-started.md |
| ops topic | A day-to-day operations concern: git guardrails, orchestrator sentinel, strict mode, customising, updating the framework, what to commit, or retrofit. These topics are not specific to first-run setup. | operational topic | project-operations.md, pipeline-reference.md |
| pointer line | A single `→ See [destination](file.md#anchor)` line at the end of a brief section, directing readers to detailed coverage. | cross-reference | project-operations.md |
| anchor | A GitHub-Flavored Markdown heading anchor used in hyperlinks (e.g. `#git-guardrails`). Derived from the heading text: lowercase, spaces replaced with hyphens. | section anchor | pipeline-reference.md, project-operations.md |
| Next Steps table | A reference table at the end of getting-started.md listing all ops topics with links to their destinations in project-operations.md and pipeline-reference.md. Replaces all the removed standalone sections. | — | getting-started.md |
| Progressive Guardrail System | Planifest's three-tier git enforcement model: advisory pre-commit (Tier 1), blocking pre-push (Tier 2), CI pipeline gate (Tier 3). | git guardrails, guardrails | project-operations.md, pipeline-reference.md |
| orchestrator sentinel | The file `plan/.orchestrator-active` written at P0 and deleted at P7. Its presence signals that a pipeline run is in progress and activates the three enforcement hooks. | sentinel | project-operations.md, pipeline-reference.md |
| strict mode | An opt-in enforcement mode enabled by `plan/.orchestrator-strict` that hard-blocks agent sessions until the orchestrator skill loads and writes a session acknowledgement. | strict orchestrator mode | project-operations.md, pipeline-reference.md |
| retrofit | Planifest adoption mode for adding the framework to an existing codebase. The orchestrator runs a structured discovery pass before coaching. | retrofit mode | project-operations.md, pipeline-reference.md |

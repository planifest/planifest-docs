---
title: "Requirement: REQ-002 - create-project-operations"
summary: "Create planifest-framework/project-operations.md as a brief high-level ops reference covering all topics extracted from getting-started.md."
status: "active"
version: "0.1.0"
---
# Requirement: REQ-002 - create-project-operations

**Skill:** spec-agent
**Feature:** 0000002-doc-structure
**Source:** US-002
**Priority:** must-have

---

## User Story

As a returning user, I open project-operations.md and find brief high-level coverage of all ops topics, so that I can quickly orient without reading the full pipeline reference.

---

## Functional Requirements

- `planifest-framework/project-operations.md` must be created
- The file header must link back to `getting-started.md` and forward to `pipeline-reference.md`
- The file must contain exactly these seven sections, in this order:
  1. **Git Guardrails** — brief description of the three-tier model with the tier table; source: §3a of getting-started.md
  2. **Orchestrator Sentinel** — brief description of the sentinel file, the three hooks with one-line descriptions, and recovery instruction; source: §3b of getting-started.md
  3. **Strict Orchestrator Mode** — brief description of what strict mode does and the setup command; source: §3b of getting-started.md
  4. **Customising with planifest-overrides** — brief table of the three override directories and their purpose; source: existing pipeline-reference.md section
  5. **Updating the Framework** — brief command block for re-running setup after framework updates; source: "Updating the Framework" section of getting-started.md
  6. **What to Commit** — the commit/don't-commit table; source: "What to Commit" section of getting-started.md
  7. **Retrofit an Existing Project** — the four setup steps and brief description of retrofit mode; source: "Retrofit" section of getting-started.md
- Each section must end with `→ [Detailed step-by-step](pipeline-reference.md#{anchor})` pointing to the corresponding section in pipeline-reference.md
- Each section must be brief: no more than ~15 lines of content before the pointer line
- No content is invented — all content is sourced from existing getting-started.md or pipeline-reference.md

## Acceptance Criteria

- [ ] `planifest-framework/project-operations.md` exists
- [ ] File header contains links to both `getting-started.md` and `pipeline-reference.md`
- [ ] All seven sections are present in the order listed above
- [ ] Every section ends with a `→` pointer to `pipeline-reference.md` with a correct anchor
- [ ] Git Guardrails section includes the three-tier table (Tier 1/2/3, When, Effect)
- [ ] Orchestrator Sentinel section names all three hooks (gate-write, check-orchestrator-presence, check-design) with one-line descriptions
- [ ] Strict Orchestrator Mode section includes the setup command (bash and PowerShell)
- [ ] Customising section includes the three-directory table (library-standards, instructions, capability-skills)
- [ ] Updating section includes the command blocks with flag variants
- [ ] What to Commit section includes the full table
- [ ] Retrofit section includes the four setup steps

## Dependencies

- REQ-003 must be complete before `pipeline-reference.md` anchors referenced in pointer lines can be verified

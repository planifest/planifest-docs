---
title: "Requirement: REQ-005 - create-website-project-operations"
summary: "Create planifest-docs/11-project-operations.md as the website source for the new Project Operations page."
status: "active"
version: "0.1.0"
---
# Requirement: REQ-005 - create-website-project-operations

**Skill:** spec-agent
**Feature:** 0000002-doc-structure
**Source:** US-005
**Priority:** must-have

---

## User Story

As a website reader, I open a new Project Operations page on planifest.dev and find brief coverage of all ops topics, so that I can access operational reference without cloning the repo.

---

## Functional Requirements

- `planifest-docs/11-project-operations.md` must be created
- Content must mirror `planifest-framework/project-operations.md` (REQ-002), adapted for the website context:
  - Internal links must use `.md` extension (build script converts to `.html`)
  - Links to `pipeline-reference.md` must point to the website pipeline page (`03-pipeline.md`) rather than the framework file
  - Links to `getting-started.md` must point to the website getting started page (`02-getting-started.md`)
- Must contain the same seven sections as `planifest-framework/project-operations.md`: Git Guardrails, Orchestrator Sentinel, Strict Orchestrator Mode, Customising with planifest-overrides, Updating the Framework, What to Commit, Retrofit an Existing Project
- Each section must end with a `→` pointer to the Pipeline page (`03-pipeline.md`) with the appropriate anchor
- Follows the two-tier depth model from ADR-002: brief sections (≤15 lines) with pointers to detail

## Acceptance Criteria

- [ ] `planifest-docs/11-project-operations.md` exists
- [ ] Contains all seven sections matching `planifest-framework/project-operations.md`
- [ ] All internal links use `.md` extension
- [ ] Pointer lines reference `03-pipeline.md` (not `pipeline-reference.md`)
- [ ] Header links reference `02-getting-started.md` (not `getting-started.md`)

## Dependencies

- REQ-002 must be complete — content is derived from `planifest-framework/project-operations.md`
- REQ-006 must be complete before this page appears in website navigation

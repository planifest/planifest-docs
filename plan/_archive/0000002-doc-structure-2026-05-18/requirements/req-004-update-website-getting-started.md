---
title: "Requirement: REQ-004 - update-website-getting-started"
summary: "Update planifest-docs/02-getting-started.md to match the trimmed first-run walkthrough content from planifest-framework/getting-started.md."
status: "active"
version: "0.1.0"
---
# Requirement: REQ-004 - update-website-getting-started

**Skill:** spec-agent
**Feature:** 0000002-doc-structure
**Source:** US-004
**Priority:** must-have

---

## User Story

As a website reader, I view the updated Getting Started page on planifest.dev and find only the first-run walkthrough with a Next Steps section, so that the website stays in sync with the trimmed framework docs.

---

## Functional Requirements

- `planifest-docs/02-getting-started.md` must be updated to reflect the same structure as the trimmed `planifest-framework/getting-started.md`
- The "Git Guardrails" subsection currently embedded in step 3 must be removed from the body; a pointer line must replace it: `→ See [Project Operations](11-project-operations.md#git-guardrails)`
- The "Updating the Framework" section must be removed; replaced with a pointer in the Next Steps table
- The "First Run" section must be replaced with step 4 (Write your first feature brief) and step 5 (Start the orchestrator) from the framework docs — matching the 5-step structure
- A **Next Steps** section must be added at the end, with links to the new website Project Operations page (`11-project-operations.md`) and the Pipeline page (`03-pipeline.md`) for all topics removed from the body
- Links to other pages use `.md` extension (the build script converts them to `.html`)
- The file must not contain any content not present in the trimmed `planifest-framework/getting-started.md`

## Acceptance Criteria

- [ ] `planifest-docs/02-getting-started.md` contains: prerequisites, steps 1–5, and a Next Steps section — nothing else
- [ ] No Git Guardrails table appears in the body
- [ ] No Updating the Framework section appears in the body
- [ ] A Next Steps section links to: Project Operations (`11-project-operations.md`) for ops topics, Pipeline page (`03-pipeline.md`) for phase mechanics
- [ ] All internal links use `.md` extension

## Dependencies

- REQ-003 must be complete — content is derived from the trimmed `planifest-framework/getting-started.md`
- REQ-005 must be complete before links to `11-project-operations.md` can be verified

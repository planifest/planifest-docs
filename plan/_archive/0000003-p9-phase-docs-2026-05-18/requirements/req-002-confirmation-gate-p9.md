---
title: "Requirement: REQ-002 - confirmation-gate-p9"
summary: "Update 03-pipeline.md confirmation gates section: 'P9 always stops' replaces 'P7 always stops'."
status: "active"
version: "0.1.0"
---
# Requirement: REQ-002 - confirmation-gate-p9

**Skill:** planifest-docs-agent
**Feature:** 0000003-p9-phase-docs
**Source:** US-002
**Priority:** must-have

---

## User Story

As a doc reader, I see "P9 always stops" in the confirmation gates section (not P7), so that I know when to expect the human gate before a PR is raised.

---

## Functional Requirements
- The sentence "**P7 always stops.**" in the Confirmation Gates section of `planifest-docs/03-pipeline.md` is replaced with "**P9 always stops.**"
- The accompanying explanation is updated to reflect that P9 is where the PR is raised (not P7)

## Acceptance Criteria
- [ ] The string "P7 always stops" does not appear in `03-pipeline.md`
- [ ] The string "P9 always stops" appears in the Confirmation Gates section
- [ ] The explanation following the bold statement correctly identifies P9 as the phase where the PR is raised (external, irreversible action)

## Dependencies
- REQ-001 (phase table must correctly define P9 for this gate note to be coherent)

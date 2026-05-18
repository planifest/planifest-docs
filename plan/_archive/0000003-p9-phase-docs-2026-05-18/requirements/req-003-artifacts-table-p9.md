---
title: "Requirement: REQ-003 - artifacts-table-p9"
summary: "Update the Artifacts by Phase table in 03-pipeline.md: fix P7 row, add P9 row."
status: "active"
version: "0.1.0"
---
# Requirement: REQ-003 - artifacts-table-p9

**Skill:** planifest-docs-agent
**Feature:** 0000003-p9-phase-docs
**Source:** US-003
**Priority:** must-have

---

## User Story

As a doc reader, I see P9 artifacts (local git tag, PR raised or PR description) in the artifacts-by-phase table, so that I know what the ship phase produces.

---

## Functional Requirements
- The P7 row in the Artifacts by Phase table of `planifest-docs/03-pipeline.md` is updated: "PR raised" is removed; the row retains `plan/changelog/{feature-id}-{date}.md` and `plan/_archive/{feature-id}-{date}/`
- A new P9 row is added to the table containing: local git tag (`v{version}`), and either PR raised via `gh pr create` or PR description output for manual use
- The P8 row remains unchanged

## Acceptance Criteria
- [ ] P7 row no longer includes "PR raised"
- [ ] P7 row retains changelog and archive path artifacts
- [ ] P9 row exists in the table
- [ ] P9 row lists git tag and PR raised/description artifacts
- [ ] Table rows are ordered P0 through P9 sequentially

## Dependencies
- REQ-001 (P9 must be defined in the phase table before this row is coherent)

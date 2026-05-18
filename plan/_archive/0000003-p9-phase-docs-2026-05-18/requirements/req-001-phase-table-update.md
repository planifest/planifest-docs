---
title: "Requirement: REQ-001 - phase-table-update"
summary: "Update 03-pipeline.md phase table and opening sentence to reflect the 10-phase pipeline (P7=Archive, P8=Build Assessment sub-agent, P9=Ship)."
status: "active"
version: "0.1.0"
---
# Requirement: REQ-001 - phase-table-update

**Skill:** planifest-docs-agent
**Feature:** 0000003-p9-phase-docs
**Source:** US-001
**Priority:** must-have

---

## User Story

As a doc reader, I see the correct 10-phase pipeline table (P0–P9: P7=Archive, P8=Build Assessment sub-agent, P9=Ship), so that I understand the complete phase structure.

---

## Functional Requirements
- The opening sentence of `planifest-docs/03-pipeline.md` is updated from "nine phases" to "ten phases"
- The P7 row in the phase table is updated: name changed from "Ship" to "Archive"; description updated to reflect archive work (changelog, skips, archive plan/current/, regression confirmation, test report)
- The P8 row in the phase table is updated: description notes that build-assessment-agent runs as a sub-agent of ship-agent
- A new P9 row is added to the phase table: name "Ship"; description covers git tag creation, push/PR decision, PR raised or PR description output
- The `PC:` Change Pipeline row remains unchanged and stays at the bottom of the table

## Acceptance Criteria
- [ ] Opening sentence reads "ten phases" (not "nine phases")
- [ ] P7 row label is "Archive" with description matching framework: changelog, skips, archive `plan/current/`, regression confirmation, test report
- [ ] P8 row description notes build-assessment-agent is a sub-agent of ship-agent
- [ ] P9 row exists with label "Ship" and description: git tag, push/PR decision, PR raised or PR description output
- [ ] Phase table contains rows for P0 through P9 plus PC (11 rows total)

## Dependencies
- Framework source of truth: `planifest-framework/skills/planifest-orchestrator/SKILL.md` (phase prefix table) and `planifest-framework/pipeline-reference.md`

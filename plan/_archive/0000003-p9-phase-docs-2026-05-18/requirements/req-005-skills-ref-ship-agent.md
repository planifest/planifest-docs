---
title: "Requirement: REQ-005 - skills-ref-ship-agent"
summary: "Update planifest-ship-agent row in 08-agent-skills-reference.md to reflect P7–P9 ownership."
status: "active"
version: "0.1.0"
---
# Requirement: REQ-005 - skills-ref-ship-agent

**Skill:** planifest-docs-agent
**Feature:** 0000003-p9-phase-docs
**Source:** US-005
**Priority:** must-have

---

## User Story

As a doc reader checking the skills reference, I see ship-agent correctly described as owning P7–P9 (archive, build assessment, ship), so that the skills table matches reality.

---

## Functional Requirements
- The `planifest-ship-agent` row in `planifest-docs/08-agent-skills-reference.md` has its Phase column updated from "P7" to "P7–P9"
- The description for `planifest-ship-agent` is updated to reflect the three-phase sequence it owns: P7 Archive (changelog, skips, archive plan/current/), P8 Build Assessment (spawns build-assessment-agent as sub-agent), P9 Ship (creates git tag, raises PR or outputs PR description)
- The `planifest-build-assessment-agent` row is updated to note it runs as a sub-agent of ship-agent (not standalone)

## Acceptance Criteria
- [ ] `planifest-ship-agent` Phase column reads "P7–P9"
- [ ] `planifest-ship-agent` description covers all three phases it owns
- [ ] `planifest-build-assessment-agent` description notes sub-agent relationship with ship-agent

## Dependencies
- None (self-contained table update)

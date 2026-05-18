---
title: "Requirement: REQ-004 - build-log-hard-limit"
summary: "Update the Build Log section of 03-pipeline.md to document it as mandatory (Hard Limit 8)."
status: "active"
version: "0.1.0"
---
# Requirement: REQ-004 - build-log-hard-limit

**Skill:** planifest-docs-agent
**Feature:** 0000003-p9-phase-docs
**Source:** US-004
**Priority:** must-have

---

## User Story

As a doc reader, I see the build log documented as mandatory (Hard Limit — missing phase block is a pipeline error), so that I understand the consequence of skipping it.

---

## Functional Requirements
- The Build Log section of `planifest-docs/03-pipeline.md` is updated to state that the build log is mandatory
- The section notes that a missing phase block is a pipeline error (Hard Limit 8)
- The section retains its existing description of what the build log contains and how it is used

## Acceptance Criteria
- [ ] Build Log section states the build log is mandatory
- [ ] Section explicitly states that a missing phase block is a pipeline error
- [ ] The phrase "Hard Limit" or equivalent severity language is present
- [ ] Existing description of build log contents and P8 usage is preserved

## Dependencies
- None (self-contained section update)

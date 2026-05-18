---
title: "Requirement: REQ-006 - fix-broken-anchors"
summary: "Remove two broken cross-reference anchor links from 11-project-operations.md."
status: "active"
version: "0.1.0"
---
# Requirement: REQ-006 - fix-broken-anchors

**Skill:** planifest-docs-agent
**Feature:** 0000003-p9-phase-docs
**Source:** US-006
**Priority:** must-have

---

## User Story

As a doc reader following cross-reference links in project-operations, the links resolve correctly (no broken anchors), so that I am not sent to a non-existent section.

---

## Functional Requirements
- The line `→ [Full directory structure and examples](03-pipeline.md#customising-with-planifest-overrides)` is removed from `planifest-docs/11-project-operations.md`
- The line `→ [Strict mode internals and ack file lifecycle](03-pipeline.md#strict-orchestrator-mode)` is removed from `planifest-docs/11-project-operations.md`
- No replacement links are added (the full content already exists on the same page)
- The surrounding prose in each section remains intact

## Acceptance Criteria
- [ ] Neither broken anchor link appears in `11-project-operations.md`
- [ ] The "Customising with planifest-overrides" section prose is otherwise unchanged
- [ ] The "Strict Orchestrator Mode" section prose is otherwise unchanged

## Dependencies
- None (removal only, no cross-dependencies)

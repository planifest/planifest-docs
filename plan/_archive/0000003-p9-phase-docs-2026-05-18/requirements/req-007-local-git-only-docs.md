---
title: "Requirement: REQ-007 - local-git-only-docs"
summary: "Document the local-git-only override and its P9 effect in 11-project-operations.md."
status: "active"
version: "0.1.0"
---
# Requirement: REQ-007 - local-git-only-docs

**Skill:** planifest-docs-agent
**Feature:** 0000003-p9-phase-docs
**Source:** US-007
**Priority:** must-have

---

## User Story

As a doc reader, I understand what the `local-git-only` override does and how it affects P9, so that I can use it in my project when I need the agent to skip the push/PR prompt.

---

## Functional Requirements
- A new subsection or prose block is added to the `planifest-overrides/instructions/` description in `planifest-docs/11-project-operations.md`
- The addition documents the `local-git-only` convention: a file named `custom-NNN-local-git-only.md` (or any `.md` file containing the text `local-git-only`) in `planifest-overrides/instructions/` signals to the ship-agent at P9 to skip the push/PR prompt and output a PR description for manual use instead
- The addition notes the use case: teams that push manually (e.g. no remote passphrase in agent context, or enforced human-in-the-loop for git push)
- The addition includes the example filename `custom-001-local-git-only.md` as a concrete reference

## Acceptance Criteria
- [ ] `local-git-only` is documented in the `planifest-overrides` section of `11-project-operations.md`
- [ ] Documentation states the P9 effect: ship-agent outputs PR description instead of pushing and raising PR
- [ ] The use case (manual push / human-in-the-loop) is noted
- [ ] An example filename is shown

## Dependencies
- REQ-006 (broken links removed before this addition so the section is clean)

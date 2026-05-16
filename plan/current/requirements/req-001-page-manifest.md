---
title: "Requirement: REQ-001 - page-manifest"
summary: "Create a page order manifest that is the single source of truth for doc page order and titles."
status: "active"
version: "0.1.0"
---
# Requirement: REQ-001 - page-manifest

**Skill:** planifest-codegen-agent
**Feature:** 0000001-doc-nav
**Source:** US-001, US-002, US-003 — manifest-driven nav requires an authoritative page order definition
**Priority:** must-have

---

## Functional Requirements
- A file `src/web-app/docs.manifest.json` must exist and define the ordered list of documentation pages
- Each entry must contain: `file` (output HTML filename, e.g. `01-overview.html`), `title` (human-readable page title)
- The manifest must list all current doc pages in reading order: 01-overview through 10-templates
- The manifest is the single source of truth — `build-docs.js` must use it to determine page order and titles rather than inferring from filesystem order

## Acceptance Criteria
- [ ] `src/web-app/docs.manifest.json` exists and is valid JSON
- [ ] All 10 doc pages are listed in reading order
- [ ] Each entry has `file` and `title` fields
- [ ] Adding a new entry to the manifest causes it to appear in nav and prev/next on next build

## Dependencies
- None — this is the foundational artifact for REQ-002 and REQ-003

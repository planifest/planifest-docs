---
title: "Requirement: REQ-003 - prev-next-injection"
summary: "Extend build-docs.js to inject prev/next page navigation at the bottom of each doc page."
status: "active"
version: "0.1.0"
---
# Requirement: REQ-003 - prev-next-injection

**Skill:** planifest-codegen-agent
**Feature:** 0000001-doc-nav
**Source:** US-002, US-003 — as a reader, I can move to the next/previous page at the bottom of each doc
**Priority:** must-have

---

## Functional Requirements
- `build-docs.js` must inject a prev/next navigation block into the generated HTML of each doc page
- The block must be inserted inside `<main class="doc-container glass-panel">`, after the page content, before `</main>`
- The "Previous" link must point to the preceding page per manifest order; it must be absent on the first page
- The "Next" link must point to the following page per manifest order; it must be absent on the last page
- The nav block must use class `doc-pagination` for styling: `<nav class="doc-pagination">`
- Each link must display the label ("← Previous" / "Next →") and the adjacent page's title as subtitle text

## Acceptance Criteria
- [ ] Every doc page (except the first) shows a "← Previous" link pointing to the preceding page
- [ ] Every doc page (except the last) shows a "Next →" link pointing to the following page
- [ ] The first page shows only "Next →"
- [ ] The last page shows only "← Previous"
- [ ] Link titles match the `title` field from `docs.manifest.json`
- [ ] CSS class `doc-pagination` is applied to the nav block

## Dependencies
- REQ-001: `docs.manifest.json` must exist

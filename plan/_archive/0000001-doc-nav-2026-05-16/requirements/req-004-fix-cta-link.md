---
title: "Requirement: REQ-004 - fix-cta-link"
summary: "Fix the broken homepage CTA link that points to a non-existent page."
status: "active"
version: "0.1.0"
---
# Requirement: REQ-004 - fix-cta-link

**Skill:** planifest-codegen-agent
**Feature:** 0000001-doc-nav
**Source:** US-004 — the homepage CTA leads to the first doc page
**Priority:** must-have

---

## Functional Requirements
- The `href` on the "Read the Docs" CTA button in `src/web-app/index.html` must be updated from `./docs/p001-planifest-master-plan.html` to `./docs/01-overview.html`
- The fix must be applied to the source file `src/web-app/index.html`
- `build-docs.js` must also patch `src/web-app/index.html` in-place if the broken href is detected, so the fix survives future regeneration scenarios

## Acceptance Criteria
- [ ] Clicking "Read the Docs" on the homepage navigates to `01-overview.html`
- [ ] No 404 on the CTA link
- [ ] `src/web-app/index.html` contains `href="./docs/01-overview.html"` in the CTA

## Dependencies
- None — this is an isolated fix

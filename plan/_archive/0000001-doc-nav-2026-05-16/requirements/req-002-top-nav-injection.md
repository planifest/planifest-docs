---
title: "Requirement: REQ-002 - top-nav-injection"
summary: "Extend build-docs.js to inject doc page links into the top nav of every doc page, driven by the manifest."
status: "active"
version: "0.1.0"
---
# Requirement: REQ-002 - top-nav-injection

**Skill:** planifest-codegen-agent
**Feature:** 0000001-doc-nav
**Source:** US-001 — as a reader, I can navigate to any doc page from the top nav
**Priority:** must-have

---

## Functional Requirements
- `build-docs.js` must read `docs.manifest.json` and generate a `<div class="nav-links">` block containing one `<a class="nav-link">` per manifest entry, in manifest order
- The existing static links (About, Structure) must be preserved before the doc page links
- The generated nav must replace the hardcoded single "Overview" link currently in the template
- The nav must be injected into every generated doc page (all 10) via the shared template mechanism
- The template must use a `{{DOC_NAV_LINKS}}` placeholder; `build-docs.js` replaces it at build time with the generated links

## Acceptance Criteria
- [ ] All 10 doc pages appear as links in the top nav of every doc page
- [ ] Links are in manifest order
- [ ] Static links (About, Structure) still appear before doc links
- [ ] Adding a page to `docs.manifest.json` and rebuilding causes it to appear in the nav

## Dependencies
- REQ-001: `docs.manifest.json` must exist

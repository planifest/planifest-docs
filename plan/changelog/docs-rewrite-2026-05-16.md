# Changelog — docs-rewrite — 2026-05-16

**Feature:** docs-rewrite
**Branch:** feat/rewrite-docs-for-latest-framework-updates
**Date:** 2026-05-16
**Author:** agent (claude-sonnet-4-6) + Martin Mayer

---

## Summary

Full rewrite of `planifest-docs/` for Planifest v0.10. Replaced 10 stale internal planning documents with 10 user-facing documentation pages. Updated the web app build pipeline to serve the new docs correctly.

---

## Changes

### planifest-docs/ — content

- Deleted 10 old planning docs (`p001`, `p002`, `p003`, `p004`, `p010`, `p011`, `p013`, `p015`, `p016`, `p017`)
- Created 10 new user-facing documentation pages:
  - `01-overview.md` — What is Planifest
  - `02-getting-started.md` — Getting Started
  - `03-pipeline.md` — The Pipeline
  - `04-routing.md` — Routing & Tracks
  - `05-change-pipeline.md` — Change Pipeline
  - `06-fast-path.md` — Fast Path
  - `07-retrofit.md` — Retrofit
  - `08-agent-skills-reference.md` — Agent Skills Reference
  - `09-standards.md` — Standards Reference
  - `10-templates.md` — Templates Reference
- Created `planifest-docs/component.yml`

### src/web-app/ — build pipeline

- `scripts/build-docs.js`: added heading ID renderer (slug generation); reordered nav-actions to match homepage; updated hardcoded nav link from `p001-planifest-master-plan.html` to `01-overview.html`
- `vite.config.ts`: replaced all old entry points (`p001`–`p017`) with new ones (`doc01`–`doc10` + sitemap)
- `index.html`: updated stale nav link and hero CTA link from `p001-planifest-master-plan.html` to `01-overview.html`
- Deleted 11 stale pre-built HTML files from `src/web-app/docs/`
- Created `src/web-app/component.yml`

### src/web-app/ — CSS

- `style.css`: added `scroll-margin-top: 72px` on all headings (fixed nav offset for hash navigation)
- `style.css`: widened `.doc-container` from narrow fixed width to `max-width: 1400px; width: 94%`

### src/web-app/ — TypeScript

- `main.ts`: set `mermaid.initialize({ startOnLoad: false })` to prevent async re-render from resetting hash scroll position
- `main.ts`: added `mermaid.run().then(() => re-scroll to hash)` to restore scroll position after Mermaid renders
- `main.ts`: changed `securityLevel: 'loose'` → `'antiscript'` (security finding S-001)
- `main.ts`: HTML-escaped `item.title` and `item.file` in nav injection (security finding S-002)
- `main.ts`: wrapped `document.querySelector(window.location.hash)` in try/catch (security finding S-003)
- `main.ts`: updated nav dedup filter from `p001` → `01-overview`

---

## Plan Artifacts

- `plan/current/scope.md` — in/out/deferred scope
- `plan/current/risk-register.md` — 5 risks (all low; 3 accepted, 2 open for monitoring)
- `plan/current/adr/ADR-001-doc-naming-convention.md`
- `plan/current/adr/ADR-002-heading-scroll-offset.md`
- `plan/current/adr/ADR-003-doc-container-width.md`
- `plan/current/security-report.md` — 3 findings, all mitigated
- `plan/current/iteration-log.md`

---

## Skips

- P0 (Assess & Coach): skipped — design confirmed by human without full feature brief
- P8 (Build Assessment): not applicable — static site, no runtime metrics

---

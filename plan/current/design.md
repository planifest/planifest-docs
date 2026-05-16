# Confirmed Design — docs-rewrite

## Summary

Rewrite `planifest-docs/` from scratch for Planifest v0.10. Replace 10 early-stage planning documents with 10 user-facing documentation pages covering what the framework is, how to install it, and how to use it. Update the web-app build pipeline to serve the new docs correctly.

## Adoption Mode

Change Pipeline — targeted content and build change across two components. No schema changes, no new external dependencies.

## Component Paths

- planifest-docs/
- src/web-app/

## Scope

### In Scope

- Delete 10 old planning docs (`p001`–`p017`) from `planifest-docs/`
- Write 10 new user-facing docs in `planifest-docs/` (`01-overview` through `10-templates`)
- Update `src/web-app/scripts/build-docs.js`: heading ID generation, nav-actions button order, fixed `p001` hardcoded nav link → `01-overview`
- Update `src/web-app/src/style.css`: `scroll-margin-top: 72px` on headings (fixed nav offset), wider `doc-container` (`max-width: 1400px`, `width: 94%`)
- Update `src/web-app/src/main.ts`: Mermaid post-render hash re-scroll, nav dedup filter updated from `p001` → `01-overview`
- Update `src/web-app/vite.config.ts`: entry points updated from old `p001`–`p017` to new `doc01`–`doc10`
- Update `src/web-app/index.html`: fixed stale `p001` nav link → `01-overview`
- Delete 11 stale pre-built HTML files from `src/web-app/docs/`

### Out of Scope

- Changes to homepage content or hero section
- New doc site features (search, versioning, interactive playground)

### Deferred

- Nothing

## Documents Written

| File | Title |
|------|-------|
| `planifest-docs/01-overview.md` | What is Planifest |
| `planifest-docs/02-getting-started.md` | Getting Started |
| `planifest-docs/03-pipeline.md` | The Pipeline |
| `planifest-docs/04-routing.md` | Routing & Tracks |
| `planifest-docs/05-change-pipeline.md` | Change Pipeline |
| `planifest-docs/06-fast-path.md` | Fast Path |
| `planifest-docs/07-retrofit.md` | Retrofit |
| `planifest-docs/08-agent-skills-reference.md` | Agent Skills Reference |
| `planifest-docs/09-standards.md` | Standards Reference |
| `planifest-docs/10-templates.md` | Templates Reference |

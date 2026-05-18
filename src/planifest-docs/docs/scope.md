# Scope — planifest-docs

## In Scope

- All documentation pages in `planifest-docs/*.md`
- Content accuracy for all pipeline phases (P0–P9), routing tracks, project operations, agent skills reference, standards, templates, and getting-started guide
- The `local-git-only` override documentation in `11-project-operations.md`

## Out of Scope

- HTML generation — handled by `src/web-app/scripts/build-docs.js`
- Navigation structure, page order, pagination — managed by `src/web-app/docs.manifest.json`
- Framework skill files, hook scripts, and templates — live in `planifest-framework/`
- API documentation — this system exposes no API
- Versioned documentation — one canonical version, aligned to the current framework version

## Deferred

- Automated link-checking (anchors and external links) — not yet implemented; currently caught by human review only
- Versioned doc snapshots per framework release — deferred pending framework release cadence decision

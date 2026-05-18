# Decisions Index

> Living document. Index of all ADRs across all features. Updated after every pipeline run.
> Do not archive this file — update it in place.

Last updated: 0000003-p9-phase-docs

---

## All Architecture Decision Records

| ADR | Title | Feature | Status | Summary |
|-----|-------|---------|--------|---------|
| ADR-001 | Static Site Generation with Vite | website (pre-ID) | active | Vite chosen over Next.js / Astro for simplicity and zero server-side runtime; production is pure static HTML |
| ADR-002 | Build-Time Markdown Rendering | website (pre-ID) | active | Markdown compiled to HTML by `marked` at build time; no runtime markdown parser needed |
| ADR-003 | Deployment via GitHub Actions to GitHub Pages | website (pre-ID) | active | GitHub Actions builds on merge to `main` and publishes `dist/` to GitHub Pages |
| ADR-001 | Manifest as Page-Order Source of Truth | 0000001-doc-nav | active | `docs.manifest.json` is the single source of truth for page titles, filenames, and nav order; build script reads it to inject consistent nav |
| ADR-002 | Nav Injection via Template Placeholder | 0000001-doc-nav | active | Sidebar nav and prev/next links are injected by the build script via an `{{NAV}}` placeholder in each generated HTML page |
| ADR-001 | Three-File Docs Structure | 0000002-doc-structure | active | Documentation split into three levels: website pages (`planifest-docs/`), project operations (`11-project-operations.md`), and pipeline reference (`03-pipeline.md`) |
| ADR-002 | Two-Tier Depth Model | 0000002-doc-structure | active | Quick-reference content lives on the website page; detailed step-by-step content lives in the pipeline reference; pages link to the reference rather than duplicating |
| ADR-003 | Project Operations as a Dedicated Website Page | 0000002-doc-structure | active | Day-to-day operations reference added as `11-project-operations.md` to surface hooks, commit standard, sentinel, and customisation without crowding Getting Started |
| ADR-001 | planifest-docs Formalised as a Tracked Component | 0000003-p9-phase-docs | active | `src/planifest-docs/component.yml` created; enables pipeline gate enforcement, manifest-level drift detection, and consistent P6 docs generation |
| ADR-002 | Remove Broken Anchors, Not Add Sections | 0000003-p9-phase-docs | active | Broken links in `11-project-operations.md` removed rather than resolved by adding stub sections, to prevent duplication and drift with `03-pipeline.md` |

---

## Status Definitions

| Status | Meaning |
|--------|---------|
| active | Decision stands; implementation follows it |
| superseded | Replaced by a later ADR (reference provided in the ADR body) |
| amended | Core decision unchanged but conditions or scope updated |

---

*Template: decisions-index.template.md*

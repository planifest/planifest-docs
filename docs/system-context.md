# System Context

Last updated: 18 May 2026

---

## What This Repo Is

`planifest-docs` is the official landing page and documentation site for the Planifest framework. It serves two purposes simultaneously:

1. **A public website** — the static documentation site at planifest.dev, built from markdown and deployed to GitHub Pages.
2. **A reference implementation** — this repo is managed using the Planifest framework it documents. Every feature is built through the confirmed-design pipeline.

---

## Repository Structure

```
planifest-docs/
├── planifest-docs/          # Markdown source for all website pages
├── planifest-framework/     # Vendored dev dependency (see below)
├── src/web-app/             # Vite static site (consumes generated HTML from planifest-docs/)
├── docs/                    # Living repo documentation (this directory)
├── plan/                    # Active and archived pipeline plans
└── graphics/                # Logos and favicons
```

---

## The Two Components

### planifest-docs (`planifest-docs/`)

The markdown source for all website pages. Every edit to the public documentation starts here. The build script reads these files and converts them to HTML — they are never served directly.

### web-app (`src/web-app/`)

A Vite-bundled static site that renders the framework documentation. It has no backend. All content originates as markdown in `planifest-docs/` and is converted to HTML at build time.

---

## The Build Pipeline

Markdown content is never served directly. It goes through a two-stage build:

**Stage 1 — Markdown → HTML** (`node scripts/build-docs.js`)
- Reads each page listed in `docs.manifest.json`
- Converts markdown to HTML via `marked`
- Rewrites inter-document `.md` links to `.html`
- Injects persistent sidebar nav, next/prev pagination, and page title
- Writes output to `src/web-app/docs/*.html`
- Writes `public/sitemap-data.json` for runtime hamburger nav

**Stage 2 — Vite bundle** (`npm run build`)
- Bundles all HTML pages as a multi-page app
- Outputs production-ready assets to `dist/`

Both stages run automatically via `npm run dev` (predev hook) and `npm run build` (prebuild hook).

---

## Deployment

A GitHub Actions workflow (`.github/workflows/`) triggers on merge to `main`. It runs the full two-stage build and publishes `dist/` to GitHub Pages. No server infrastructure is required.

---

## Dev Dependency: planifest-framework

`planifest-framework/` is a vendored copy of the Planifest framework used exclusively to manage development of this repo. It has no role at compile time or runtime for the web-app — it is not part of the build output and is not shipped with the site.

The framework's source of truth is at [github.com/planifest/planifest-framework](https://github.com/planifest/planifest-framework). The copy here is updated by pulling from that repo and re-running `setup.sh` / `setup.ps1`. Consumer projects obtain the framework directly from the source repo — not from here.

It provides the enforcement hooks, phase skills, standards, and templates that the confirmed-design pipeline uses when building features in this repo.

---

## How This Repo Uses the Framework

`planifest-framework/` is checked into this repo and this repo is its own first consumer. Every change to the framework docs or website goes through the confirmed-design pipeline:

1. Feature brief written to `plan/current/feature-brief.md`
2. Orchestrator coaches through P0 → P1 (spec) → P2 (ADRs) → P3 (implementation) → P4 (validate) → P5 (security) → P6 (docs) → P7 (ship)
3. Gate-write hook enforces no writes to `src/` without an active `plan/current/design.md`
4. Changelog entry written to `plan/changelog/`
5. Completed plan archived to `plan/_archive/`

Active pipeline state lives in `plan/current/`. Historical plans are in `plan/_archive/`. Change records are in `plan/changelog/`.

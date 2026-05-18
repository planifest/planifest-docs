# Component Registry

Last updated: 0000003-p9-phase-docs

---

## Components

| ID | Type | Purpose | Stack | Status |
|----|------|---------|-------|--------|
| `web-app` | static site | Public documentation site for the Planifest framework. Manifest-driven nav, paginated HTML pages generated from markdown source. Deployed to GitHub Pages via GitHub Actions on merge to `main`. | Vite 7, TypeScript 5.9, Vanilla CSS, Node.js (marked 17, mermaid 11) | active |
| `planifest-docs` | content | Markdown source for all website pages. Consumed by `web-app` build pipeline. Single point of edit — no direct HTML editing. | Markdown | active |
| `planifest-framework` | dev dependency | The Planifest framework vendored into this repo and used to manage its own development. All features in this repo are built through its confirmed-design pipeline. This is not the framework's source repo — it is a consumer of the framework like any other project. | Bash, PowerShell, Node.js (hooks) | active |

---

## web-app

**Path:** `src/web-app/`

**Responsibilities:**
- Render framework documentation as a navigable static site
- Generate per-page HTML from markdown source via `scripts/build-docs.js` (runs as `predev`/`prebuild` hook)
- Provide persistent sidebar nav and paginated next/prev links driven by `docs.manifest.json`
- Write `public/sitemap-data.json` for runtime hamburger nav population
- Bundle all pages as a Vite multi-page app and output to `dist/`

**Source files:**
- `src/main.ts` — entry point (Mermaid initialisation, runtime nav)
- `src/style.css` — global styles
- `scripts/build-docs.js` — markdown-to-HTML converter (marked, link rewriting, nav injection)
- `docs.manifest.json` — page order, titles, and filenames
- `vite.config.ts` — multi-page entry points, one per doc page

**Pages:** Generated dynamically from the markdown content in `planifest-docs/`. See the `planifest-docs` section below for the full page list.

**Dev dependencies:** Vite 7, TypeScript 5.9, marked 17, mermaid 11

**Not responsible for:**
- Framework logic, hook scripts, or skill files
- Server-side rendering or backend services

---

## planifest-docs

**Path:** `planifest-docs/`

**Responsibilities:**
- Hold the authoritative markdown source for all website documentation
- Be the single point of edit for website content — no direct HTML editing

**Pages:**

| File | Title |
|------|-------|
| `01-overview.md` | What is Planifest |
| `02-getting-started.md` | Getting Started |
| `03-pipeline.md` | The Pipeline |
| `04-routing.md` | Routing & Tracks |
| `05-change-pipeline.md` | Change Pipeline |
| `06-fast-path.md` | Fast Path |
| `07-retrofit.md` | Retrofit |
| `08-agent-skills-reference.md` | Agent Skills Reference |
| `09-standards.md` | Standards Reference |
| `10-templates.md` | Templates Reference |
| `11-project-operations.md` | Project Operations |

**Not responsible for:**
- HTML generation (handled by `web-app` build script)
- Navigation or pagination logic

---

## planifest-framework (dev dependency)

**Path:** `planifest-framework/`

> This directory contains a vendored copy of the Planifest framework used to manage development of this repo. It is updated by pulling new versions from [github.com/planifest/planifest-framework](https://github.com/planifest/planifest-framework) and running `setup.sh` / `setup.ps1`. It is not maintained here — it is consumed here.

**Role in this repo:**
- Provides the enforcement hooks (`gate-write`, `check-design`, `commit-msg`, `pre-push`) that govern all development work
- Provides the phase skills the orchestrator uses to run the confirmed-design pipeline for every feature
- Supplies standards and templates referenced during planning and implementation

**What it contains (for reference):**
- Phase skills: orchestrator, spec-agent, codegen-agent, validate-agent, security-agent, docs-agent, ship-agent, build-assessment-agent, change-agent, optimise-agent
- Standards: library preferences (TypeScript, Python, Go, Java, databases), testing, API design, commit format, observability, telemetry, formatting, code quality, build targets
- Templates: feature brief, design, execution plan, requirements, ADRs, data contracts, component manifests, and more
- Setup scripts: `setup.sh` / `setup.ps1` with per-tool installers for Claude Code, Cursor, Windsurf, Cline, Codex, Antigravity, GitHub Copilot, OpenCode
- Test harness: bespoke Bash tests covering hook behaviour, setup, and telemetry

**Documentation:**
- `getting-started.md` — First-run walkthrough (steps 1–5)
- `project-operations.md` — Brief ops reference with pointers to detailed sections
- `pipeline-reference.md` — Full step-by-step coverage of every pipeline topic
- `tool-setup-reference.md` — Per-tool setup details and capability tiers

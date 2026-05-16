# Purpose — web-app

Static Vite site that renders the Planifest homepage and documentation pages, with manifest-driven navigation generation at build time.

## Why this component exists

The Planifest project needs a public documentation site deployable to GitHub Pages with no server-side runtime. `web-app` owns the build pipeline that converts markdown sources (in `planifest-docs/`) into browsable HTML, applies consistent layout and navigation, and produces a static site artifact for deployment.

## What it does

- Renders the Planifest homepage (hero, structure section, CTA)
- Converts `planifest-docs/*.md` to HTML at build time via `scripts/build-docs.js`
- Reads `docs.manifest.json` to determine page order; injects manifest-driven top nav links and prev/next pagination into every doc page
- Applies a shared HTML template with theme toggle, Mermaid diagram support, and hamburger nav
- Generates `public/sitemap-data.json` for runtime hamburger menu population
- Deploys via GitHub Actions to GitHub Pages as a fully static site

## What it does NOT do

- Process or accept user-supplied content at runtime (static site only)
- Own or modify planifest-docs markdown content (owned by planifest-docs component)
- Expose any server-side API or dynamic endpoint

# Design - 0000001-doc-nav

## Feature
- Problem: Doc site navigation is hardcoded and incomplete — homepage CTA is a 404, top nav links only one doc page, and no prev/next navigation exists between pages.
- Adoption mode: retrofit
- Feature ID: 0000001-doc-nav

## Product Layer
- User stories confirmed: 4
- Acceptance criteria confirmed: 4
- Constraints: No new runtime dependencies; build time increase < 5s
- Integrations: none

## Architecture Layer
- Latency target: not applicable (static site)
- Availability target: not applicable (static site, served via GitHub Pages)
- Scalability target: not applicable
- Security: no auth; public static site; no PII
- Data privacy: no regulated data
- Observability: standard defaults (build script console output)
- Cost boundary: not constrained

## Engineering Layer
- Stack: frontend: plain HTML/CSS | build: Node.js (ESM) | bundler: Vite | language: TypeScript | IaC: none | cloud: GitHub Pages | compute: static | CI: GitHub Actions | Build target: static HTML
- Components:
  - web-app: existing Vite app — extended to support manifest-driven nav generation
- Data ownership: web-app owns docs/manifest and all HTML output
- Deployment: GitHub Pages via dist/ output of `npm run build`
- API versioning: not applicable

## Scope
- In:
  - Page order manifest file (`src/web-app/docs.manifest.json`) — defines page order, titles, filenames
  - `build-docs.js` extended to read manifest and inject top nav links into all doc pages
  - `build-docs.js` extended to inject prev/next nav at bottom of all doc pages
  - Fix broken CTA link in `src/web-app/index.html` via build-docs.js (applied at build time)
- Out:
  - sitemap.html changes
  - Mobile hamburger menu changes
  - Search functionality
- Deferred:
  - Active-page highlight in nav (requires runtime JS or per-page class; can follow as fast-path change)

## Assumptions
- build-docs.js already processes all doc HTML files — impact if wrong: injection logic needs a new file-discovery step
- dist/ is fully regenerated on build — impact if wrong: dist/ fixes may be stale; always rebuild before deploying

## Risks
- Top nav injection may conflict with existing nav markup if pages have varying structures (likelihood: low; impact: malformed nav on affected pages)
- dist/index.html link fix applied directly may be overwritten by Vite build (likelihood: medium; impact: 404 CTA persists post-build) — mitigate by applying fix in build-docs.js

## Dependencies
- Upstream: none
- Downstream: none

## Active Skills
None

## Skill Map
| Requirement | Best-fit Skill | Rationale |
|-------------|----------------|-----------|
| REQ-001 - page-manifest | planifest-codegen-agent | New config file authoring |
| REQ-002 - top-nav-injection | planifest-codegen-agent | Build script extension |
| REQ-003 - prev-next-injection | planifest-codegen-agent | Build script extension |
| REQ-004 - fix-cta-link | planifest-codegen-agent | Isolated HTML fix via build script |

## Repo Instructions
None

## Confirmation
Human confirmed this design before proceeding: yes
Date confirmed: 16 May 2026
continuous_run: true

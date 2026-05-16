# Scope — web-app

## In Scope

- Homepage layout and styling
- Doc page build pipeline (`scripts/build-docs.js`)
- Page order manifest (`docs.manifest.json`) — authoritative page sequence
- Manifest-driven top nav link generation (injected via `{{DOC_NAV_LINKS}}`)
- Manifest-driven prev/next pagination (injected via `{{PREV_NEXT_NAV}}`)
- Theme toggle (light/dark)
- Mobile nav (hamburger menu with dynamic doc links from sitemap-data.json)
- Mermaid diagram rendering
- Hash anchor scroll behaviour
- Homepage CTA link (maintained by build-docs.js patch + direct edit)

## Out of Scope

- Documentation content (owned by planifest-docs)
- Framework source (owned by planifest-framework)
- Sitemap.html structural changes
- Mobile hamburger menu behaviour changes
- Search / full-text index

## Deferred

- **Active-page highlight in top nav** — requires runtime JS or per-page class injection; deferred to follow-up fast-path change
- **Doc versioning**
- **Interactive playground**
- **Automated test suite** — no testing framework configured; build validation is manual

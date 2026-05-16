# Interface Contract — web-app

## Inputs

| Name | Type | Description |
|------|------|-------------|
| `planifest-docs/*.md` | filesystem (build-time) | Markdown source files consumed by `scripts/build-docs.js` |
| `docs.manifest.json` | filesystem (build-time) | Page order manifest — authoritative source of page sequence and titles |
| `doc-template.html` | filesystem (build-time, optional) | External HTML template; if absent, inline template in build-docs.js is used |
| `public/sitemap-data.json` | filesystem (runtime) | JSON sitemap consumed by hamburger menu in `src/main.ts` |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `dist/` | filesystem | Built static site deployed to GitHub Pages |
| `docs/*.html` | filesystem (build artefact) | Generated doc pages (intermediate build artefacts, not deployed directly) |
| `public/sitemap-data.json` | filesystem | JSON index of all doc pages, written by build-docs.js |

## Consumed By

None — this is a leaf consumer. The `dist/` output is consumed by the GitHub Actions deployment workflow, not by another component.

## Consumes

- `planifest-docs` — markdown source content
- `planifest-framework` — referenced in docs content but not imported at build time

## Breaking Change Policy

`requires-human-approval` — changes to `docs.manifest.json` schema or `build-docs.js` template contract require human review before merging.

## Template Placeholder Contract

The HTML template (inline or external) must contain these placeholders:

| Placeholder | Replaced with |
|-------------|--------------|
| `{{TITLE}}` | Page title string |
| `{{CONTENT}}` | Rendered HTML from markdown |
| `{{DOC_NAV_LINKS}}` | Generated `<a>` tags for all manifest pages |
| `{{PREV_NEXT_NAV}}` | Per-page `<nav class="doc-pagination">` block (empty string for sitemap) |

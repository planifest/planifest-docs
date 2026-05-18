# Interface Contract — planifest-docs

## Outputs

| Output | Type | Path | Consumer |
|--------|------|------|----------|
| Documentation pages | Markdown files | `planifest-docs/*.md` | `src/web-app/scripts/build-docs.js` |

## Input

None. This is a content-only component. It has no runtime inputs, no API, and no data ingress.

## Consumption Protocol

The web-app build script reads every `.md` file listed in `src/web-app/docs.manifest.json`. The manifest drives page order and titles; the markdown files provide content. The script:

1. Reads each file in manifest order
2. Converts markdown to HTML using `marked`
3. Rewrites relative links to `.html` equivalents
4. Injects sidebar nav and prev/next links from the manifest
5. Writes `src/web-app/docs/{filename}.html`

## Breaking Change Policy

Requires human approval. Breaking changes include:
- Removing a page that is listed in `docs.manifest.json`
- Renaming a page without updating `docs.manifest.json`
- Removing a heading that is referenced by an anchor link from another page or external source

Non-breaking changes include additions, rewrites, and clarifications that preserve existing anchors and page filenames.

## Schema

No formal schema. Files are CommonMark-compliant markdown. GitHub-flavoured extensions (tables, code fences) are supported by the `marked` renderer in web-app.

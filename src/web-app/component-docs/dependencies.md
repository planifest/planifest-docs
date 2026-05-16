# Dependencies — web-app

## Upstream (what this component consumes)

| Dependency | Type | Description |
|-----------|------|-------------|
| `planifest-docs` | filesystem (build-time) | Markdown source files at `planifest-docs/*.md` |
| `docs.manifest.json` | internal config | Page order manifest owned by this component |

## Downstream (what depends on this component)

None. `web-app` is a leaf in the dependency graph — its `dist/` output is consumed only by GitHub Infrastructure (GitHub Pages CDN).

## Runtime Dependencies (npm)

| Package | Version | Purpose |
|---------|---------|---------|
| `marked` | ^17.0.4 | Markdown-to-HTML conversion in build-docs.js |
| `mermaid` | ^11.13.0 | Mermaid diagram rendering at runtime |
| `vite` | ^7.3.1 | Bundler and dev server |
| `typescript` | ~5.9.3 | Type checking |

## Dependency Notes

- `marked` runs at build time only (in build-docs.js, a Node.js script).
- `mermaid` runs at runtime in the browser, loaded via dynamic import.
- No runtime server-side dependencies — fully static output.

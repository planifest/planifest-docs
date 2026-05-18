# Dependencies — planifest-docs

## What planifest-docs Consumes

| Dependency | Type | Why |
|------------|------|-----|
| `planifest-framework/` | Dev reference | Docs must accurately reflect the skills, templates, standards, and hooks defined in the framework. When framework content changes, a docs pipeline run is triggered to update this component. |

`planifest-docs` does not import, link to, or execute the framework at build time. The dependency is a human and pipeline-level concern, not a code dependency.

## What Depends on planifest-docs

| Consumer | How | When |
|----------|-----|------|
| `src/web-app` | `scripts/build-docs.js` reads all markdown files | At build time (`npm run build`, `npm run dev`) |

## External Dependencies

None. This is plain markdown content — no npm packages, no runtime services.

## Dependency Direction

```
planifest-framework/ → (human review + pipeline) → planifest-docs/ → (build script) → web-app/
```

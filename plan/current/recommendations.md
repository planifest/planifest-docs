# Recommendations — 0000001-doc-nav

## REC-001: Run `npm audit fix` (high priority)

8 high-severity Vite dev-server vulnerabilities reported by `npm audit`. All are dev-only (no production exposure), but should be resolved promptly. Takes < 1 minute.

```bash
cd src/web-app && npm audit fix
```

## REC-002: Add unit tests for build-docs.js pure functions

`buildPrevNextNav()` and `stripMetadata()` are pure functions with clear inputs/outputs — ideal unit test targets. No test framework is currently configured. Adding Vitest would catch regressions when manifest logic is extended.

Suggested test cases:
- `buildPrevNextNav(0)` → next only (no prev)
- `buildPrevNextNav(9)` → prev only (no next)
- `buildPrevNextNav(4)` → both prev and next
- `stripMetadata()` → `.md` links converted to `.html`

## REC-003: Implement active-page highlight in top nav (deferred, fast-path eligible)

Currently all doc page links in the top nav render identically — there is no visual indication of the current page. This is the most visible UX gap remaining after this feature.

Options:
- **Static per-page class:** In `build-docs.js`, add `class="nav-link active"` to the link matching the current page (comparing manifest file to output filename). Zero runtime JS. Simple.
- **Runtime JS:** Add a `<script>` that reads `location.pathname` and adds `.active` to the matching link. Works without a rebuild.

Recommendation: static per-page class — consistent with the existing placeholder injection pattern and eliminates a runtime dependency.

## REC-004: Add authoring guide for new doc pages

R-005 (manifest drift) is only partially mitigated by the build warning. A short `CONTRIBUTING.md` or section in the site README explaining the two-step process (add `.md` + update manifest) would prevent the most common authoring mistake.

## REC-005: Extract doc-template.html from build-docs.js

The HTML template is currently inline in `build-docs.js` as a fallback. Extracting it to `src/web-app/doc-template.html` (which the script already supports) would make template edits more accessible to non-JavaScript contributors and enable syntax highlighting in editors.

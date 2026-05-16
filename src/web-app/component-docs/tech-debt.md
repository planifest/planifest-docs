# Tech Debt — web-app

## TD-001: No automated test suite

**Debt:** Zero test coverage. Build validation is manual (`npm run build`). There is no unit test for `buildPrevNextNav()`, `stripMetadata()`, or manifest validation logic.
**Impact:** Regressions in build-docs.js logic may not be caught until the site is visually inspected.
**Recommended fix:** Add Vitest as a dev dependency; write unit tests for the pure functions in build-docs.js. Acceptance: each pure function has at least one happy-path and one edge-case test.

## TD-002: Vite dependency vulnerabilities (8 high)

**Debt:** `npm audit` reports 8 high-severity vulnerabilities in Vite 7.0.0–7.3.1 (dev-server path traversal, WebSocket file read, fs.deny bypass). All are dev-server-only — no production impact.
**Impact:** Developer machines running `npm run dev` are exposed to the vulnerabilities if the dev server is accessible on the network.
**Recommended fix:** Run `npm audit fix` to update Vite to the patched version.

## TD-003: Hardcoded nav height in scroll-margin-top

**Debt:** `scroll-margin-top: 72px` is hardcoded in CSS to match the nav height. If the nav height changes, anchor scroll position will be wrong.
**Impact:** Low — nav height is stable. But any nav height change requires a manual CSS update.
**Recommended fix:** Use a CSS custom property `--nav-height` set via JS on DOMContentLoaded.

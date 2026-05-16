# Test Coverage — web-app

**Status as of 0000001-doc-nav (2026-05-16)**

| Tier | Coverage | Notes |
|------|----------|-------|
| Unit | 0% | No test framework configured |
| Integration | 0% | No test framework configured |
| E2E | 0% | No test framework configured |

**Manual validation performed:**
- `npm run build` passes cleanly (tsc + vite build)
- `node scripts/build-docs.js` output verified for 3 representative pages:
  - `01-overview.html`: next-only pagination ✓, all 10 nav links present ✓
  - `05-change-pipeline.html`: prev + next pagination ✓
  - `10-templates.html`: prev-only pagination ✓
- CTA link in `index.html` updated to `01-overview.html` ✓
- Manifest validation (missing file, invalid JSON) not tested — process.exit(1) paths

**Recommended:** Add Vitest and write unit tests for `buildPrevNextNav()`, `stripMetadata()`, and manifest validation logic (see `tech-debt.md` TD-001).

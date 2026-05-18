# Recommendations — 0000003-p9-phase-docs

> Suggested improvements for future iterations. Constructive and specific.

---

## High Value

### 1. Add automated link-checking to CI

**File:** `src/web-app/` / `.github/workflows/`

A CI step using `markdown-link-check` (or a custom Node script wrapping `marked` and checking anchor targets) would catch broken anchors before merge. This is the only remaining gap in the doc-sync enforcement chain: the existing `planifest.yml` check ensures docs are updated with code, but does not validate internal link targets.

**Effort:** Low. `markdown-link-check` is a single `npm install` and one workflow step.

---

### 2. Run `npm audit fix` in `src/web-app/`

**File:** `src/web-app/package.json`

Three pre-existing Vite 7.0–7.3.1 high-severity advisories (path traversal in optimised deps, `server.fs.deny` bypass, arbitrary file read via WebSocket) are dev-server only — the production site is unaffected. However, resolving them removes noise from future audits and keeps the dependency tree clean.

**Effort:** Low. `npm audit fix` in `src/web-app/` resolves all three.

---

### 3. Version-pin the framework vendored copy

**Context:** `planifest-framework/` is vendored directly with no version record. When the framework is updated, there is no machine-readable way to check which version is in use or whether a migration is pending.

**Suggestion:** Add a `planifest-framework/.version` file containing the framework version tag (e.g. `v0.13.0`) on each update. A setup script could compare this against the source repo tag to surface stale copies.

**Effort:** Low for the version file; moderate for automated staleness detection.

---

## Housekeeping

### 4. Periodic external link audit

**Files:** All `planifest-docs/*.md`

External links to `github.com/planifest/*` and `github.com/mksglu/context-mode` were verified at the time of this feature run. These are not validated automatically. A quarterly review or a CI external-link check would prevent silent link rot.

---

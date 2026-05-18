# Security Report - 0000001-doc-nav

**Date:** 2026-05-16
**Component:** web-app
**Reviewer:** planifest-security-agent (claude-sonnet-4-6)
**Overall risk rating: Low**

---

## Threat Model (STRIDE)

| Threat | Category | Severity | Mitigation |
|--------|----------|----------|------------|
| Attacker modifies `docs.manifest.json` in the repo to inject malicious page titles/filenames into nav HTML | Tampering | Low | Mitigated: manifest is a version-controlled build artefact; any change goes through git review. Titles are escaped by `esc()` in `main.ts` before DOM insertion. |
| Attacker inserts malicious HTML/JS into planifest-docs markdown sources, injected into pages via `marked` | Tampering | Low | Partially mitigated: markdown sources are repo-controlled (not user-supplied). `marked` does not sanitise HTML by default — but the threat actor would need repo write access, which is already a full compromise. Not a runtime user-input risk. |
| Denial of service via build script failure (malformed manifest → `process.exit(1)`) | DoS | Low | Mitigated: build fails loudly; GitHub Actions catches the failure. Dev machine impact only. |
| Information disclosure via path traversal in Vite dev server | Info Disclosure | Medium | Partially mitigated: Vite dev server is never exposed in production (GitHub Pages static site). Risk confined to developer machines running `npm run dev`. Mitigated by `npm audit fix`. |
| Repudiation of nav changes (no build audit trail) | Repudiation | Low | Mitigated: git history records all manifest/template changes with author. |

---

## Dependency Audit

**12 vulnerabilities found via `npm audit`:** 4 moderate, 8 high.

| Package | Severity | Advisory | Production impact | Action |
|---------|----------|----------|------------------|--------|
| `vite` 7.0.0–7.3.1 | High (×3) | GHSA-4w7w-66w2-5vf9, GHSA-v2wj-q39q-566r, GHSA-p9ff-h696-f583 | **None** — vulnerabilities are dev-server-only (path traversal in `.map` handling, `server.fs.deny` bypass, WebSocket arbitrary file read). Production is a static build on GitHub Pages; dev server is never deployed. | Run `npm audit fix` to update Vite |
| `uuid` 11.0.0–11.1.0 | Moderate | GHSA-w5hq-g745-h8pq | **None** — `uuid` is a transitive dependency not called in application code paths modified by this feature. | Run `npm audit fix` |

**Recommendation:** Run `npm audit fix` as a follow-up fast-path change. Not blocking for this feature (no production exposure) but should not be deferred indefinitely.

---

## Secrets Management

No hardcoded credentials, API keys, tokens, or secrets found in:
- `scripts/build-docs.js`
- `src/main.ts`
- `docs.manifest.json`

The GitHub Actions deployment workflow (`.github/workflows/`) was not modified by this feature and is out of scope for this review.

---

## Authentication & Authorisation Review

Not applicable. This component has no API, no authentication, and no user accounts. It is a public static site.

---

## Input Validation Review

Two HTML generation paths were assessed:

**1. `scripts/build-docs.js` — build-time markdown-to-HTML (build artefact, not runtime):**
- `marked` parses markdown from `planifest-docs/` into HTML without explicit sanitisation (`sanitize` option is not set).
- **Risk:** Low. Markdown sources are version-controlled repo content, not user-supplied input. A threat actor would need repo write access to inject malicious content — this is already a full system compromise, beyond the scope of this mitigation.
- **Mitigation status:** Acceptable for a developer documentation site. Would require `DOMPurify` or `marked`'s `sanitize` option if markdown sources were ever to accept user contributions.

**2. `src/main.ts:112–120` — runtime hamburger nav injection via `innerHTML`:**
- Data source: `public/sitemap-data.json` (build-time generated, not user input).
- Escaping: `esc()` function at line 112 escapes `&`, `<`, `>`, `"` before inserting `item.file` and `item.title` into HTML. **This is correct and sufficient for the data source.**
- **Finding:** Safe as implemented. No XSS risk from this path given the data source.

---

## Network Policy

Static site hosted on GitHub Pages. No custom ingress or egress rules required. No ports to configure.

---

## Infrastructure as Code Review

No IaC files in scope for this feature. Deployment is via GitHub Actions pushing to GitHub Pages (existing configuration, not modified by this feature).

---

## Risk Register Cross-Reference

| Risk ID | Risk | Status |
|---------|------|--------|
| R-001 | `dist/index.html` CTA fix overwritten by Vite build | **Mitigated** — fix applied in `build-docs.js` patch logic, not dist/ directly |
| R-002 | Manifest out of sync with filesystem | **Mitigated** — build-docs.js warns on undeclared pages |
| R-003 | Top nav too wide with many pages | **Open** — deferred by design (active-page highlight is deferred) |
| R-004 | `{{DOC_NAV_LINKS}}` placeholder absent from external template | **Mitigated** — build-docs.js validates placeholder and exits with error |
| R-005 | Developers forget to update manifest | **Partially mitigated** — build-docs.js warns; README update not yet done |

---

## Summary

**Overall risk rating: Low**

This feature introduces no new attack surface at runtime. It is a build-time extension to a static site generator. The existing Vite dev-server vulnerabilities are the most significant finding but have zero production impact.

**Top actions before production:**
1. Run `npm audit fix` to update Vite and uuid (dev-only vulnerabilities, but good hygiene)
2. If planifest-docs ever accepts external contributor markdown, add `DOMPurify` to the build pipeline or enable `marked`'s sanitiser
3. Update README/authoring guide to document the manifest update step (R-005 partial mitigation)

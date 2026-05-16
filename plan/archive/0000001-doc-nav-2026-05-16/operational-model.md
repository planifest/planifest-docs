---
title: "Operational Model - 0000001-doc-nav"
---
# Operational Model - 0000001-doc-nav

## Runbook Triggers
- **Build failure:** `build-docs.js` exits non-zero → GitHub Actions workflow fails → no deployment. Check: manifest missing, placeholder absent from template, malformed JSON.
- **404 on doc page:** Page exists in manifest but source .md file missing from planifest-docs → build succeeds but page links to 404. Fix: add missing .md file or remove from manifest.

## On-Call Expectations
None — static site. No runtime services, no on-call rotation required.

## Alerting Thresholds
None — GitHub Pages uptime monitored by GitHub infrastructure. No custom alerting.

## Authoring Operations
When adding a new doc page:
1. Add the `.md` source to `planifest-docs/`
2. Add the entry to `src/web-app/docs.manifest.json` in the correct position
3. Run `npm run build` to verify nav and prev/next links are correct

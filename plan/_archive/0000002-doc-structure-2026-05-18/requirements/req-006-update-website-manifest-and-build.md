---
title: "Requirement: REQ-006 - update-website-manifest-and-build"
summary: "Register the new Project Operations page in docs.manifest.json and vite.config.ts so it appears in website navigation and is included in the build."
status: "active"
version: "0.1.0"
---
# Requirement: REQ-006 - update-website-manifest-and-build

**Skill:** spec-agent
**Feature:** 0000002-doc-structure
**Source:** US-005
**Priority:** must-have

---

## User Story

As a website reader, I can navigate to the Project Operations page via the site navigation, so that the page is discoverable without knowing its direct URL.

---

## Functional Requirements

- `src/web-app/docs.manifest.json` must have a new entry added after the existing Retrofit entry (`07-retrofit.html`) and before the Agent Skills Reference entry (`08-agent-skills-reference.html`):
  ```json
  { "file": "11-project-operations.html", "title": "Project Operations" }
  ```
  Note: the file number `11` is already above `10-templates.html`; position in manifest determines nav order, not file number. Insert at position 7 (after Retrofit, before Agent Skills Reference) to group operational topics together.
- `src/web-app/vite.config.ts` must have a new input entry added to `rollupOptions.input`:
  ```ts
  doc11: resolve(__dirname, 'docs/11-project-operations.html'),
  ```
- The new entry in `docs.manifest.json` must use the title "Project Operations"
- Both changes must be made together — a manifest entry without a vite input would cause a build warning; a vite input without a manifest entry would generate a page not reachable via navigation

## Acceptance Criteria

- [ ] `src/web-app/docs.manifest.json` contains `{ "file": "11-project-operations.html", "title": "Project Operations" }` inserted at position 7 (after Retrofit)
- [ ] `src/web-app/vite.config.ts` contains `doc11: resolve(__dirname, 'docs/11-project-operations.html')`
- [ ] Running `node scripts/build-docs.js` generates `src/web-app/docs/11-project-operations.html` without warnings
- [ ] "Project Operations" appears in the site navigation between "Retrofit" and "Agent Skills Reference"

## Dependencies

- REQ-005 must be complete — the manifest entry references the HTML output of `planifest-docs/11-project-operations.md`

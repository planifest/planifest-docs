---
title: "Risk Register - 0000001-doc-nav"
---
# Risk Register - 0000001-doc-nav

| ID | Category | Risk | Likelihood | Impact | Mitigation |
|----|----------|------|-----------|--------|------------|
| R-001 | Technical | `dist/index.html` CTA fix overwritten by Vite build | Medium | Medium | Apply fix via build-docs.js patch logic, not directly to dist/ |
| R-002 | Technical | Manifest out of sync with actual doc files — a page exists on disk but not in manifest | Low | Medium | build-docs.js logs a warning when a .md file exists in DOCS_DIR but is not listed in manifest |
| R-003 | Technical | Top nav becomes too wide on desktop if many pages added in future | Low | Low | Deferred: active-page highlight + collapsing nav is a separate change |
| R-004 | Technical | `{{DOC_NAV_LINKS}}` placeholder absent from external `doc-template.html` if it exists | Medium | High | build-docs.js must validate placeholder presence and fail loudly if missing |
| R-005 | Operational | Developers forget to update manifest when adding a new doc page | Medium | Medium | build-docs.js warns on undeclared pages; README updated with authoring instructions |

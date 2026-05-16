# Risk — web-app

| ID | Risk | Likelihood | Impact | Status |
|----|------|-----------|--------|--------|
| R-001 | `dist/index.html` CTA fix overwritten by Vite build | Medium | Medium | Mitigated — fix applied in build-docs.js patch logic |
| R-002 | Manifest out of sync with planifest-docs filesystem | Medium | Medium | Mitigated — build-docs.js warns on undeclared pages |
| R-003 | Top nav too wide on desktop if many pages added | Low | Low | Open — deferred (active-page highlight is a separate change) |
| R-004 | `{{DOC_NAV_LINKS}}` placeholder missing from external doc-template.html | Medium | High | Mitigated — build-docs.js validates and exits with error |
| R-005 | Developers forget to update manifest when adding new doc pages | Medium | Medium | Partially mitigated — build-docs.js warns; authoring doc not yet written |
| R-006 | Vite dev-server vulnerabilities (GHSA-4w7w-66w2-5vf9 et al.) | Low | None (prod) | Open — dev-only exposure; `npm audit fix` recommended |
| R-007 | build-docs.js must run before vite build/dev | Low | High | Mitigated — enforced by npm `pre` hooks |
| R-008 | scroll-margin-top hardcoded to 72px (nav height) | Low | Low | Open — known quirk in component.yml |

# Tech Debt — planifest-docs

## Open Items

| ID | Description | Impact | Introduced |
|----|-------------|--------|-----------|
| TD-001 | No automated link-checking — broken anchor links and stale external links are caught only on human review or when a user reports a 404 | Low — docs remain readable; only navigation convenience is affected | Pre-existing; noted explicitly at 0000003-p9-phase-docs |

## Notes

TD-001 could be resolved by adding a CI step (e.g. `markdown-link-check` or a custom Node script) that runs against all `.md` files on every PR. This would complement the existing `planifest.yml` doc-sync check. Recommended as a future pipeline improvement.

The pre-existing Vite dev-server vulnerabilities in `src/web-app/` are recorded in `src/web-app/component.yml` tech debt, not here — they are not introduced or owned by `planifest-docs`.

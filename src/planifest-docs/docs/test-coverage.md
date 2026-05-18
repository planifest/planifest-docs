# Test Coverage — planifest-docs

## Coverage State

| Type | Coverage | Notes |
|------|----------|-------|
| Unit | N/A | Content component — no executable code |
| Integration | N/A | No API, no runtime behaviour |
| E2E | N/A | No user-facing endpoints owned by this component |

## Validation Approach

Content correctness is validated by:

1. **Manual review** at the PR gate — all content changes reviewed against the feature requirements
2. **Semantic consistency** — the validate-agent checks that requirement acceptance criteria are met by the content changes
3. **Build success** — `npm run build` in `src/web-app/` exercises markdown parsing and confirms no build-breaking syntax errors in the docs

Automated markdown lint and link-checking are not currently implemented (see `tech-debt.md` TD-001).

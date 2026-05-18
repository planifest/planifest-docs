# Risk — planifest-docs

## Component-Scoped Risks

| Risk | Likelihood | Impact | Status |
|------|-----------|--------|--------|
| Docs drift from framework skills when framework is updated without a corresponding docs pipeline run | Medium | Medium | Open — no automated check links docs content to framework version |
| Broken anchor links produce silent 404s in the static site | Low | Low | Partially mitigated — ADR-002 established policy to remove broken anchors rather than accumulate them; no automated link-checker exists |
| Stale phase numbering or naming if framework renames phases without a docs update | Low | Medium | Open — same drift risk as above; mitigated by pipeline discipline |

## Risks Inherited from the System

See `plan/current/risk-register.md` for system-level risks, including pre-existing Vite dev-server vulnerabilities in web-app (not introduced by planifest-docs, dev only, production unaffected).

## Mitigations

- Every framework update triggers a docs pipeline run (process control, not automated)
- `ADR-002` removes broken anchor links on detection rather than leaving them
- `planifest-docs` component manifest formalised (0000003) — enables future automated drift detection against the manifest

# Security Report - 0000003-p9-phase-docs

## Threat Model (STRIDE)

| Threat | Category | Severity | Mitigation |
|--------|----------|----------|------------|
| Doc content contains misleading instructions that cause users to expose credentials | Tampering | Low | Mitigated: all new content reviewed; no credential prompts introduced. New `local-git-only` section explicitly advises against putting passphrases in agent context. |
| External links in docs point to hijacked repos | Tampering | Low | Partially mitigated: links verified at review time (github.com/planifest/*, github.com/mksglu/context-mode). No new external links introduced by this feature. |
| Static site serves stale content after deploy (stale cache) | Info Disclosure | Low | Mitigated by GitHub Pages cache headers; not affected by doc content changes. |
| No auth or data handling introduced | N/A | N/A | This feature produces static markdown. No runtime, no user input, no data processing. |

## Dependency Audit

No new dependencies introduced by this feature. The `planifest-docs` component is pure markdown content.

**Pre-existing findings in web-app (not introduced by this feature):**

| Package | Severity | Advisory | Context |
|---------|----------|----------|---------|
| `vite` 7.0.0–7.3.1 | High (×3) | Path traversal in optimised deps, `server.fs.deny` bypass, arbitrary file read via WebSocket | Dev server only — production is a static GitHub Pages site. `npm audit fix` resolves. Already noted in `src/web-app/component.yml` tech debt. |
| `uuid` | Moderate | See `npm audit` output | Fix available via `npm audit fix`. |

These pre-exist this feature. Remediation is out of scope here but recommended as a follow-up.

## Secrets Management

No secrets, credentials, API keys, or tokens in any new or modified content. References to "credentials" and "token" in the unchanged doc content are documentation examples and explanations, not actual values.

## Authentication & Authorisation Review

Not applicable. No API, no authentication, no authorisation surface. Static public documentation.

## Input Validation Review

Not applicable. No user input processing. The `local-git-only` detection in ship-agent reads file content from `planifest-overrides/instructions/` — this is a trusted, version-controlled path, not user-supplied input at runtime.

## Network Policy

Not applicable. Static site hosted on GitHub Pages. No ports, no network policy, no egress/ingress configuration introduced.

## Infrastructure as Code Review

No IaC files introduced or modified by this feature.

## Summary

**Overall risk rating: Low**

No critical or high findings introduced by this feature. All content is static markdown.

Top actions before production:
1. Run `npm audit fix` in `src/web-app/` to resolve pre-existing Vite dev-server vulnerabilities (not blocking — dev-server only, production site unaffected)
2. Periodically verify external GitHub links in docs remain valid and point to maintained repos

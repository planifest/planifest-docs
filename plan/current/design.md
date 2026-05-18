# Design - 0000003-p9-phase-docs

## Feature
- Problem: `planifest-docs/03-pipeline.md` (and related docs) are stale after framework PR #34, which formalised P9 as a discrete Ship phase, renamed P7 to Archive, mandated the build log, and added a pre-flight check at P0. The docs still say P7=Ship, "P7 always stops", and 8-phase pipeline.
- Adoption mode: retrofit
- Feature ID: 0000003-p9-phase-docs

## Product Layer
- User stories:
  - US-001: As a doc reader, I see the correct 10-phase pipeline table (P0–P9: P7=Archive, P8=Build Assessment sub-agent, P9=Ship) so I understand the complete phase structure.
  - US-002: As a doc reader, I see "P9 always stops" in the confirmation gates section (not P7) so I know when to expect the human gate before a PR is raised.
  - US-003: As a doc reader, I see P9 artifacts (local git tag, PR raised or PR description) in the artifacts-by-phase table so I know what the ship phase produces.
  - US-004: As a doc reader, I see the build log documented as mandatory (Hard Limit — missing phase block is a pipeline error) so I understand the consequence of skipping it.
  - US-005: As a doc reader checking the skills reference, I see ship-agent correctly described as owning P7–P9 (archive, build assessment, ship) so the skills table matches reality.
  - US-006: As a doc reader following cross-reference links in project-operations, the links resolve correctly (no broken anchors).
  - US-007: As a doc reader, I understand what the `local-git-only` override does and how it affects P9 so I can use it in my project.
- Acceptance criteria confirmed: 7
- Constraints:
  - Doc content must match the framework SKILL.md files exactly (source of truth)
  - No code changes — docs only
  - Website nav/manifest unaffected (no new pages, no page renames)
- Integrations: planifest-docs website build (existing CI); no new integrations

## Architecture Layer
- Latency target: not applicable (static site)
- Availability target: not applicable
- Scalability target: not applicable
- Security: not applicable (no auth, no PII, public docs)
- Data privacy: no regulated data
- Observability: standard defaults
- Cost boundary: not constrained

## Engineering Layer
- Stack: Markdown content authoring — no runtime, no build step beyond existing CI
- Components:
  - `planifest-docs` — the published docs website source (planifest-docs/)
- Data ownership: not applicable
- Deployment: GitHub Pages via existing CI workflow
- API versioning: not applicable

## Scope
- In:
  - `planifest-docs/03-pipeline.md` — phase table, phase descriptions, confirmation gates, artifacts table, build log section
  - `planifest-docs/08-agent-skills-reference.md` — ship-agent row (P7 only → P7–P9)
  - `planifest-docs/11-project-operations.md` — remove two broken anchor links, add local-git-only override documentation
  - `planifest-docs/02-getting-started.md` — scan for stale P7/P8 references (likely clean)
- Out:
  - New documentation pages
  - Changes to website manifest or nav
  - Code changes in src/
  - Framework skill file edits
  - Adding new sections to 03-pipeline.md for overrides/strict-mode (content already in 11-project-operations.md)
- Deferred: None

## Assumptions
- framework PR #34 is the authoritative source for new phase behaviour — impact if wrong: docs would contradict the framework
- No other planifest-docs pages reference the old P7=Ship or P8=Build Assessment framing — impact if wrong: additional files need updating (discovered during P3)

## Risks
- Low likelihood / low impact: Additional stale references found in docs pages not in scope — mitigation: grep all planifest-docs for "P7" and "P8" references during P3

## Dependencies
- Upstream: framework PR #34 (merged — already in planifest-framework/)
- Downstream: none

## Active Skills
None

## Skill Map
| Requirement | Best-fit Skill | Rationale |
|-------------|----------------|-----------|
| REQ-001 - phase-table-update | planifest-docs-agent | Prose/markdown update to existing doc section |
| REQ-002 - confirmation-gate-p9 | planifest-docs-agent | Single-sentence correction to existing doc section |
| REQ-003 - artifacts-table-p9 | planifest-docs-agent | Table row addition to existing doc section |
| REQ-004 - build-log-hard-limit | planifest-docs-agent | Prose update to existing build log section |
| REQ-005 - skills-ref-ship-agent | planifest-docs-agent | Table row correction in skills reference |
| REQ-006 - fix-broken-anchors | planifest-docs-agent | Remove two broken cross-ref lines in project-operations |
| REQ-007 - local-git-only-docs | planifest-docs-agent | New prose block in overrides section of project-operations |

## Repo Instructions
None

## Confirmation
Human confirmed this design before proceeding: yes
Date confirmed: 18 May 2026

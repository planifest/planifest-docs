# Design - 0000002-doc-structure

## Feature
- Problem: getting-started.md contains deep reference material mixed into a first-run walkthrough, making it overwhelming for new users and hard to scan for returning users
- Adoption mode: greenfield
- Feature ID: 0000002-doc-structure

## Product Layer
- User stories:
  - US-001: As a first-time user, I read getting-started.md and find only the steps needed to run my first pipeline, so that I am not overwhelmed by reference material during setup
  - US-002: As a returning user, I open project-operations.md and find brief high-level coverage of git guardrails, sentinel, strict mode, customising, updating, what to commit, and retrofit, so that I can quickly orient without reading the full reference
  - US-003: As a user who needs depth, I find detailed step-by-step explanations of all ops topics in pipeline-reference.md, so that I do not need to read source code or skill files
- US-004: As a website reader, I view the updated Getting Started page on planifest.dev and find only the first-run walkthrough with a Next Steps section, so that the website stays in sync with the trimmed framework docs
- US-005: As a website reader, I open a new Project Operations page on planifest.dev and find brief coverage of all ops topics, so that I can access operational reference without cloning the repo
- Acceptance criteria confirmed: 7
- Constraints: all content currently in getting-started.md must be preserved — moved, not deleted
- Integrations: none

## Architecture Layer
- Latency target: not applicable
- Availability target: not applicable
- Scalability target: not applicable
- Security: not applicable — documentation only
- Data privacy: no regulated data
- Observability: not applicable
- Cost boundary: not constrained

## Engineering Layer
- Stack: Markdown / local / GitHub Actions
- Components:
  - getting-started.md (existing) — lean first-run walkthrough, steps 1-5 only
  - project-operations.md (new) — brief high-level ops reference
  - pipeline-reference.md (existing) — detailed step-by-step reference, expanded with ops topics
  - planifest-docs/02-getting-started.md (existing) — website getting started source, trimmed to match framework docs
  - planifest-docs/11-project-operations.md (new) — website project operations source
  - src/web-app/docs.manifest.json (existing) — updated to register the new page
  - src/web-app/vite.config.ts (existing) — updated to add doc11 build entry
- Data ownership: not applicable
- Deployment: static documentation in git
- API versioning: not applicable

## Scope
- In: trim getting-started.md to steps 1-5; create project-operations.md with brief sections; expand pipeline-reference.md with detailed sections for all ops topics
- Out: changes to skill files, templates, standards, or any other files
- Deferred: none

## Assumptions
- project-operations.md lives in planifest-framework/ alongside the other two docs — impact if wrong: links break

## Risks
- Content loss during restructure (likelihood: low, impact: high) — mitigated by writing new files before trimming getting-started.md

## Dependencies
- Upstream: none
- Downstream: none

## Active Skills
None

## Skill Map
| Requirement | Best-fit Skill | Rationale |
|-------------|----------------|-----------|
| US-001 - trim-getting-started | planifest-docs-agent | Documentation restructuring |
| US-002 - create-project-operations | planifest-docs-agent | New reference doc authoring |
| US-003 - expand-pipeline-reference | planifest-docs-agent | Expanding existing reference doc |

## Repo Instructions
None

## Confirmation
Human confirmed this design before proceeding: yes
Date confirmed: 17 May 2026

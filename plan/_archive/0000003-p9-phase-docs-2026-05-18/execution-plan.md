---
title: "Execution Plan - 0000003-p9-phase-docs"
summary: "NFRs, delivery tracks, and artifact summary for the p9-phase-docs feature."
---
# Execution Plan - 0000003-p9-phase-docs

## Overview

Update three planifest-docs pages to reflect framework PR #34, which formalised P9 as a discrete Ship phase, renamed P7 to Archive, mandated the build log as Hard Limit 8, and introduced the local-git-only override at P9.

## Non-Functional Requirements

| NFR | Target |
|-----|--------|
| Accuracy | All doc content must match the framework SKILL.md source of truth exactly — no paraphrase that changes meaning |
| Completeness | Every stale reference to P7=Ship or "P7 always stops" must be updated; no partial updates |
| Consistency | Phase naming must be consistent across all three files updated (P7=Archive, P9=Ship) |
| No regressions | Unchanged sections of updated files must remain byte-for-byte identical to current content |
| No nav changes | Website manifest and page nav are unaffected — no new pages, no renames |

## Delivery Tracks

### Track 1 — `planifest-docs/03-pipeline.md` (REQ-001 through REQ-004)
Four changes to one file, implemented as a single edit pass:
1. Opening sentence: "nine phases" → "ten phases"
2. Phase table: P7 renamed, P8 note added, P9 row added
3. Confirmation gates: "P7 always stops" → "P9 always stops"
4. Artifacts table: P7 row fixed, P9 row added
5. Build log section: mandatory / Hard Limit 8 noted

### Track 2 — `planifest-docs/08-agent-skills-reference.md` (REQ-005)
Single table row update: ship-agent phase P7 → P7–P9, description updated.
build-assessment-agent description updated to note sub-agent relationship.

### Track 3 — `planifest-docs/11-project-operations.md` (REQ-006, REQ-007)
Two changes to one file:
1. Remove two broken cross-reference lines
2. Add local-git-only documentation block

## Functional Requirements Summary

| ID | Slug | Priority | File |
|----|------|----------|------|
| REQ-001 | phase-table-update | must-have | 03-pipeline.md |
| REQ-002 | confirmation-gate-p9 | must-have | 03-pipeline.md |
| REQ-003 | artifacts-table-p9 | must-have | 03-pipeline.md |
| REQ-004 | build-log-hard-limit | must-have | 03-pipeline.md |
| REQ-005 | skills-ref-ship-agent | must-have | 08-agent-skills-reference.md |
| REQ-006 | fix-broken-anchors | must-have | 11-project-operations.md |
| REQ-007 | local-git-only-docs | must-have | 11-project-operations.md |

## API / Data Summary

Not applicable — docs-only feature. No API, no database, no data contracts.

## Component

- `planifest-docs` — markdown source for the published documentation website

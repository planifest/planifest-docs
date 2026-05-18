# Execution Plan - doc-structure

> Written by the spec-agent. Derived from the Feature Brief — not invented.

**Skill:** spec-agent
**Tool:** Claude Code
**Model:** claude-sonnet-4-6
**Feature:** 0000002-doc-structure
**Version:** 0.1.0
**Status:** active

---

## Active Skills

| Skill | Scope | Purpose |
|-------|-------|---------|
| planifest-docs-agent | plan | Documentation restructuring and authoring |

---

## Functional Requirements Directory

| File | Requirement |
|------|------------|
| [req-001-expand-pipeline-reference.md](requirements/req-001-expand-pipeline-reference.md) | Expand pipeline-reference.md with detailed ops sections (no dependencies — implement first) |
| [req-002-create-project-operations.md](requirements/req-002-create-project-operations.md) | Create planifest-framework/project-operations.md — brief ops reference (depends on REQ-001 anchors) |
| [req-003-trim-getting-started.md](requirements/req-003-trim-getting-started.md) | Trim planifest-framework/getting-started.md to steps 1–5 (depends on REQ-001, REQ-002) |
| [req-004-update-website-getting-started.md](requirements/req-004-update-website-getting-started.md) | Update planifest-docs/02-getting-started.md to match trimmed framework docs (depends on REQ-003) |
| [req-005-create-website-project-operations.md](requirements/req-005-create-website-project-operations.md) | Create planifest-docs/11-project-operations.md — website ops page source (depends on REQ-002; parallel with REQ-004) |
| [req-006-update-website-manifest-and-build.md](requirements/req-006-update-website-manifest-and-build.md) | Update docs.manifest.json and vite.config.ts to register new page (depends on REQ-005) |

---

## Non-Functional Requirements

| ID | Category | Requirement | Target | Measurement |
|----|----------|------------|--------|-------------|
| NFR-001 | Completeness | No content from getting-started.md is lost | 100% of extracted content appears in project-operations.md or pipeline-reference.md | Manual review against original file |
| NFR-002 | Consistency | All cross-links between the three files resolve correctly | Zero broken anchors | Manual link verification after all three files are written |

---

## API Summary

Not applicable — documentation only, no API.

---

## Data Model Summary

Not applicable — documentation only, no data model.

---

## Component Interactions

```
getting-started.md
  └─→ project-operations.md (brief high-level for each ops topic)
        └─→ pipeline-reference.md (detailed step-by-step for each ops topic)
```

---

## Assumptions

| ID | Assumption | Impact if Wrong |
|----|-----------|----------------|
| A-001 | project-operations.md lives in planifest-framework/ alongside the other two docs | All cross-links break; file must be moved and links updated |

---

## Open Questions

None — requirements are fully derivable from the feature brief and existing file content.

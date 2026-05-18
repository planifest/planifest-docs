---
title: "Risk Register - doc-structure"
summary: "Technical and operational risks for 0000002-doc-structure."
status: "active"
version: "0.1.0"
---
# Risk Register - doc-structure

**Skill:** spec-agent
**Tool:** Claude Code
**Model:** claude-sonnet-4-6
**Feature:** 0000002-doc-structure
**Version:** 0.1.0
**Overall Risk Level:** low

---

## Risks

| ID | Category | Description | Likelihood | Impact | Mitigation | Status |
|----|----------|------------|------------|--------|-----------|--------|
| R-001 | technical | Content loss — a section from getting-started.md is removed but not added to either new destination file | low | high | Write REQ-003 (pipeline-reference.md additions) and REQ-002 (project-operations.md) before trimming getting-started.md (REQ-001); verify against original during P4 | open |
| R-002 | technical | Broken anchor links — project-operations.md pointer lines reference anchors that don't exist in pipeline-reference.md because headings differ | medium | medium | Anchor names must be defined in REQ-003 and used verbatim in REQ-002; link verification is an explicit P4 acceptance criterion | open |
| R-003 | operational | Reader confusion — getting-started.md is linked from external sources (README, other docs) and its trimmed content surprises users who bookmarked deep links | low | low | The file path and step numbering do not change; only sub-section content is removed; no existing anchors are deleted | open |

---

## Assumptions Logged as Risks

| ID | Assumption | Impact if Wrong | Status |
|----|-----------|----------------|--------|
| A-001 | project-operations.md lives in planifest-framework/ at the same level as getting-started.md and pipeline-reference.md | All relative cross-links break; file must be relocated and every link updated | open |

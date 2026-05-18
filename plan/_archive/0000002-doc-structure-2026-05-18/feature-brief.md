---
title: "Feature Brief - doc-structure"
summary: "Restructure planifest-framework docs: trim getting-started.md to a lean first-run guide, create project-operations.md (brief high-level ops reference), and expand pipeline-reference.md with detailed step-by-step content."
status: "approved"
version: "0.1.0"
---
# Feature Brief - doc-structure

**Feature ID:** 0000002-doc-structure

## Business Goal

`getting-started.md` contains deep reference material (git guardrails, orchestrator sentinel, strict mode, customising, updating, retrofit) embedded in a first-run walkthrough. Readers doing initial setup are overwhelmed; readers who need operational reference can't find it. Splitting the content into three focused docs (lean getting-started, brief ops reference, detailed pipeline reference) gives each audience the right depth.

---

## Features

| Feature | User Stories | Priority | Phase |
|---------|-------------|----------|-------|
| Trim getting-started.md | As a first-time user, I read getting-started.md and find only the steps needed to run my first pipeline, so that I'm not overwhelmed by reference material during setup | must-have | 1 |
| Create project-operations.md | As a returning user, I open project-operations.md and find brief high-level coverage of git guardrails, sentinel, strict mode, customising, updating, what to commit, and retrofit, so that I can quickly orient without reading the full reference | must-have | 1 |
| Expand pipeline-reference.md | As a user who needs depth, I find detailed step-by-step explanations of git guardrails, sentinel, strict mode, customising, updating, what to commit, and retrofit in pipeline-reference.md, so that I don't need to read source code or skill files | must-have | 1 |

---

## Target Architecture

### Components

| Component | Type | New or Existing | Responsibility |
|-----------|------|-----------------|---------------|
| getting-started.md | doc | existing | Lean first-run walkthrough (steps 1–5 only) |
| project-operations.md | doc | new | Brief high-level ops reference for post-setup topics |
| pipeline-reference.md | doc | existing | Full detailed reference including ops topics |

### Data Ownership

N/A — documentation only, no data stores.

### Integration Points

All three files cross-link: getting-started.md → project-operations.md (for ops topics), project-operations.md → pipeline-reference.md (for depth).

---

## Stack

| Concern | Decision |
|---------|----------|
| Language | Markdown |
| Build target | local |
| CI | GitHub Actions |

---

## Scope Boundaries

### In Scope
- Trim getting-started.md: keep steps 1–5 (add framework, create structure, run setup, write brief, start orchestrator); replace deep sub-sections (3a, 3b, 4a) with one-line pointers
- Create planifest-framework/project-operations.md with brief sections covering: Git Guardrails, Orchestrator Sentinel, Strict Mode, Customising with planifest-overrides, Updating the Framework, What to Commit, Retrofit
- Expand pipeline-reference.md with detailed step-by-step versions of the same topics

### Out of Scope
- Changes to any skill files, templates, or standards
- Changes to pipeline-reference.md sections that already exist (Phase Indicators, Phase Gates, P8, etc.)
- Content rewrites beyond structural reorganisation

### Deferred
- Nothing

---

## Non-Functional Requirements

| NFR | Target | Measurement |
|-----|--------|-------------|
| Completeness | No content lost — every item in getting-started.md appears in one of the three docs | Manual review |

---

## Constraints and Assumptions

### Constraints
- All content currently in getting-started.md must be preserved — moved, not deleted

### Assumptions
- project-operations.md lives in planifest-framework/ alongside getting-started.md and pipeline-reference.md

---

## Acceptance Criteria

- [ ] getting-started.md contains only steps 1–5 with pointers to project-operations.md for ops topics
- [ ] project-operations.md exists with a brief section for each ops topic (guardrails, sentinel, strict mode, customising, updating, what to commit, retrofit)
- [ ] pipeline-reference.md contains detailed step-by-step sections for each ops topic
- [ ] No content from getting-started.md is lost — it appears in project-operations.md or pipeline-reference.md
- [ ] All cross-links between the three files are correct

---
title: "Requirement: REQ-003 - trim-getting-started"
summary: "Trim getting-started.md to a lean first-run walkthrough covering only prerequisites and steps 1-5."
status: "active"
version: "0.1.0"
---
# Requirement: REQ-003 - trim-getting-started

**Skill:** spec-agent
**Feature:** 0000002-doc-structure
**Source:** US-001
**Priority:** must-have

---

## User Story

As a first-time user, I read getting-started.md and find only the steps needed to run my first pipeline, so that I am not overwhelmed by reference material during setup.

---

## Functional Requirements

- `planifest-framework/getting-started.md` must contain only: the intro tagline, Prerequisites, and steps 1–5 (Add the framework, Create the project structure, Run the setup script, Write your first feature brief, Start the orchestrator)
- §3a (Git Guardrails — the full three-tier enforcement table and hook details) must be removed from the body and replaced with a single pointer line: `→ See [project-operations.md](project-operations.md#git-guardrails)`
- §3b (Orchestrator Sentinel — sentinel lifecycle, hook table, strict mode) must be removed from the body and replaced with a single pointer line: `→ See [project-operations.md](project-operations.md#orchestrator-sentinel)`
- §4a (Phase Indicators table embedded in step 4) must be removed and replaced with: `→ See [pipeline-reference.md → Phase Indicators](pipeline-reference.md#phase-indicators)`
- The standalone sections after step 5 (Retrofit, Trivial Fixes, Customising, Updating the Framework, What to Commit) must be removed and replaced with a single **Next Steps** reference table
- The Next Steps table must list every removed topic with its destination file and anchor

## Acceptance Criteria

- [ ] `getting-started.md` contains only: intro tagline with pointers, Prerequisites, and steps 1–5
- [ ] No §3a, §3b content (enforcement tier table, hook table, strict mode) appears in the file
- [ ] No §4a phase indicators table appears in the file
- [ ] A "Next Steps" section appears after step 5 listing: Git Guardrails, Orchestrator Sentinel, Strict Mode, Customising, Updating, What to Commit, Retrofit, Fast Path / Change Pipeline, Phase mechanics — each with a correct file + anchor link
- [ ] Step 3 retains a one-line mention that guardrails and the sentinel are activated by setup, with a pointer to project-operations.md

## Dependencies

- REQ-001 must be complete before links to new `pipeline-reference.md` anchors can be verified
- REQ-002 must be complete before links to `project-operations.md` anchors can be verified

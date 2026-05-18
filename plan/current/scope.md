---
title: "Scope - doc-structure"
summary: "Defines explicit boundaries of what is in scope and out of scope for 0000002-doc-structure."
status: "active"
version: "0.1.0"
---
# Scope - doc-structure

**Skill:** spec-agent
**Tool:** Claude Code
**Model:** claude-sonnet-4-6
**Feature:** 0000002-doc-structure
**Version:** 0.1.0

---

## In Scope

- Trim `planifest-framework/getting-started.md` to a lean first-run walkthrough: prerequisites and steps 1–5 only, with a Next Steps reference table replacing all removed sections
- Create `planifest-framework/project-operations.md` with seven brief sections: Git Guardrails, Orchestrator Sentinel, Strict Orchestrator Mode, Customising with planifest-overrides, Updating the Framework, What to Commit, Retrofit an Existing Project
- Expand `planifest-framework/pipeline-reference.md` with six detailed sections inserted between the Change Pipeline and Customising sections: Git Guardrails, Orchestrator Sentinel, Strict Orchestrator Mode, Retrofit an Existing Project, Updating the Framework, What to Commit
- Cross-link verification: all `→ See` pointer lines in project-operations.md must resolve to real anchors in pipeline-reference.md; all Next Steps links in getting-started.md must resolve to real anchors
- Update `planifest-docs/02-getting-started.md` to mirror the trimmed framework getting-started content (website source)
- Create `planifest-docs/11-project-operations.md` as website source for the Project Operations page, mirroring planifest-framework/project-operations.md with website-relative links
- Update `src/web-app/docs.manifest.json` — add `{ "file": "11-project-operations.html", "title": "Project Operations" }` at position 7 (after Retrofit)
- Update `src/web-app/vite.config.ts` — add `doc11` build entry

---

## Out of Scope

- Changes to any skill files (`planifest-framework/skills/`)
- Changes to any template files (`planifest-framework/templates/`)
- Changes to any standards files (`planifest-framework/standards/`)
- Changes to hook scripts or enforcement logic
- Changes to `tool-setup-reference.md`
- Changes to the existing sections of `pipeline-reference.md` (Phase Indicators, Phase Confirmation Gates, P8, Model Tier Routing, Fast Path, Change Pipeline, Customising — these are untouched except for inserting the new sections)
- Adding new content not sourced from the original `getting-started.md` or existing framework documentation

---

## Deferred

Nothing deferred.

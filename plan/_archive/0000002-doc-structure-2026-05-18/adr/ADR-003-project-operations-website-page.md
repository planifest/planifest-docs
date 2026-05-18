---
title: "ADR 003: Add Project Operations as a dedicated website page"
summary: "Add an 11th page to the Planifest website covering ops topics (git guardrails, sentinel, strict mode, customising, updating, what to commit, retrofit), positioned after Retrofit in the navigation."
status: "accepted"
version: "0.1.0"
---
# ADR-003 - Add Project Operations as a dedicated website page

**Skill:** adr-agent
**Tool:** Claude Code
**Model:** claude-sonnet-4-6
**Feature:** 0000002-doc-structure
**Component:** web-app
**Status:** accepted
**Date:** 2026-05-17

---

## Context

The website expansion (US-004, US-005) requires a new page for ops reference content. Two decisions needed to be made together: (1) whether this deserves its own page or belongs inside an existing page, and (2) where in the navigation it should sit relative to the existing 10 pages.

The website navigation currently follows the pipeline lifecycle: Overview → Getting Started → Pipeline → Routing → Change Pipeline → Fast Path → Retrofit → Agent Skills → Standards → Templates. The ops topics (guardrails, sentinel, customising, updating, what to commit) are not pipeline-lifecycle content — they are project administration topics that a developer revisits after initial setup.

---

## Decision

Create a dedicated **Project Operations** page (`11-project-operations.html`) positioned in the manifest after **Retrofit** and before **Agent Skills Reference**. Rationale:

- Retrofit is the last of the "how to adopt Planifest" topics — Project Operations is a natural continuation (how to run and maintain a Planifest project day-to-day)
- Keeping it before the reference pages (Agent Skills, Standards, Templates) preserves the navigation's conceptual flow: adopt → operate → reference
- A dedicated page is preferable to expanding an existing page (Getting Started is being trimmed; Pipeline is already long with phase mechanics)

The file is numbered `11` to follow the existing naming convention, but its manifest position (index 7) determines the navigation order.

---

## Alternatives Considered

| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|-------------|
| Add ops content to Getting Started page | No new page; single entry point for setup | Getting Started is being trimmed for exactly this reason — adding ops content defeats the purpose | Contradicts the goal of this feature |
| Add ops content to Pipeline page | Pipeline is already the "deep reference" page | Pipeline is about pipeline mechanics, not project operations; mixing concerns makes the page harder to navigate | Category mismatch; Pipeline page is already long |
| Place after Templates (at end of nav) | Simple — just append | Operations are not reference material; placing them after Standards and Templates buries them | Wrong conceptual position for day-to-day operations content |

---

## Affected Components

| Component | Impact |
|-----------|--------|
| src/web-app/docs.manifest.json | New entry added at index 7 |
| src/web-app/vite.config.ts | New `doc11` input entry added |
| planifest-docs/11-project-operations.md | New source file created |
| Website navigation | "Project Operations" link appears between Retrofit and Agent Skills Reference |

---

## Consequences

**Positive:**
- Website readers have a dedicated ops reference page matching the two-tier depth model (ADR-002)
- Navigation flow makes conceptual sense: adopt → operate → reference
- The website stays in sync with the framework docs restructure

**Negative:**
- The nav now has 11 pages; on small screens the hamburger menu becomes longer
- File is numbered `11` but sits at nav position 8 — the number/position mismatch is a minor source of confusion for contributors

**Risks:**
- Future pages added to the nav may follow the `11-` numbering and cause further number/position divergence; mitigated by documenting that manifest position determines nav order, not file number

---

## Related ADRs

- ADR-001 - depends-on (three-file structure is the reason the website needs a new page)
- ADR-002 - depends-on (two-tier depth model governs how content is written for this page)

---

## Supersedes

- None

## Superseded By

- None

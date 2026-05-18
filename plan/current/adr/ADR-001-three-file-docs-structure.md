---
title: "ADR 001: Three-file documentation structure"
summary: "Split Planifest framework docs into three focused files: a lean first-run walkthrough (getting-started.md), a brief ops reference (project-operations.md), and a detailed pipeline reference (pipeline-reference.md). This replaces the single overloaded getting-started.md."
status: "accepted"
version: "0.1.0"
---
# ADR-001 - Three-file documentation structure

**Skill:** adr-agent
**Tool:** Claude Code
**Model:** claude-sonnet-4-6
**Feature:** 0000002-doc-structure
**Component:** planifest-framework docs
**Status:** accepted
**Date:** 2026-05-17

---

## Context

`getting-started.md` was the single entry point for all Planifest documentation. Over time it accumulated content for two distinct audiences: first-time users following setup steps, and returning users looking up operational reference (git guardrails, sentinel behaviour, customising, updating). The two audiences have different needs and different reading modes — first-time users read linearly and need a short, linear guide; returning users scan for a specific topic. A file that serves both audiences well serves neither.

The question: should operational content move into the existing `pipeline-reference.md`, or into a new intermediate file?

---

## Decision

Introduce a three-file structure:

1. **`getting-started.md`** — first-run walkthrough only. Prerequisites + steps 1–5. No operational reference. Readers who finish step 5 have a running pipeline.
2. **`project-operations.md`** (new) — brief, scannable ops reference. One short section per topic with a pointer to the detailed version. Audience: returning users who know what they're looking for.
3. **`pipeline-reference.md`** (existing, expanded) — deep, step-by-step reference for all topics. Audience: users who need to understand how something works, not just what to do.

The three files form a deliberate depth ladder: getting-started → project-operations → pipeline-reference. Each file links forward to the next level of depth.

---

## Alternatives Considered

| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|-------------|
| Two files: trim getting-started, expand pipeline-reference | Simpler file count; no new file to maintain | pipeline-reference becomes two things: pipeline mechanics and ops reference; returning users must scan a long file to find ops topics | Mixing pipeline mechanics with ops reference makes pipeline-reference harder to scan; the two audiences (pipeline understanding vs ops lookup) are distinct |
| Leave getting-started.md as-is, add a separate ops-reference.md | No change to an established file | getting-started.md remains overloaded; new users still hit the full weight of the file on first visit | Does not solve the first-time user problem |
| Single expanded getting-started.md | One file, no navigation decisions | Gets longer over time; overload problem worsens | Directly worsens the problem being solved |

---

## Affected Components

| Component | Impact |
|-----------|--------|
| getting-started.md | Trimmed to steps 1–5; all ops sections replaced with Next Steps table |
| project-operations.md | New file created; must be maintained alongside the other two |
| pipeline-reference.md | Expanded with new ops sections; existing sections unchanged |

---

## Consequences

**Positive:**
- First-time users reach a running pipeline without reading operational reference material
- Returning users have a scannable one-page ops reference without reading the full pipeline reference
- pipeline-reference.md remains focused on pipeline mechanics; ops content is additive at the end

**Negative:**
- Three files to maintain instead of two; any ops topic update must be kept consistent across project-operations.md (brief) and pipeline-reference.md (detailed)
- Any external links to the sections removed from getting-started.md break — those sections did not have stable anchors in the old file, so breakage is minimal in practice

**Risks:**
- Content drift: brief section in project-operations.md describes the feature differently from the detailed section in pipeline-reference.md; mitigated by the pointer model (the brief section summarises, the detailed section is authoritative)

---

## Related ADRs

- ADR-002 - related-to (defines the content depth rule that determines what goes in project-operations vs pipeline-reference)

---

## Supersedes

- None

## Superseded By

- None

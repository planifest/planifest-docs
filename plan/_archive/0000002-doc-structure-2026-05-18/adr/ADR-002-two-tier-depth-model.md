---
title: "ADR 002: Two-tier depth model for ops topics"
summary: "Each ops topic is covered at two levels of depth: a brief section (≤15 lines) in project-operations.md ending with a pointer, and a full step-by-step section in pipeline-reference.md. This rule governs all current and future ops topic additions."
status: "accepted"
version: "0.1.0"
---
# ADR-002 - Two-tier depth model for ops topics

**Skill:** adr-agent
**Tool:** Claude Code
**Model:** claude-sonnet-4-6
**Feature:** 0000002-doc-structure
**Component:** planifest-framework docs
**Status:** accepted
**Date:** 2026-05-17

---

## Context

Once the three-file structure was decided (ADR-001), a rule was needed to determine how to write content for each file. Without a clear rule, contributors would make inconsistent depth decisions: some brief sections would be too thin to be useful, others would expand to the point of duplicating the detailed section. The pointer pattern would become inconsistent.

The question: what is the contract for how much content belongs in `project-operations.md` vs `pipeline-reference.md` for any given ops topic?

---

## Decision

Every ops topic is covered at exactly two tiers:

**Tier 1 — project-operations.md (brief)**
- Maximum ~15 lines of content per section
- Enough to orient a returning user who knows the concept: what it is, the key facts, what to do in the common case
- Ends with a single `→ [Detailed step-by-step](pipeline-reference.md#{anchor})` pointer line
- Does not duplicate the detail — it summarises and defers

**Tier 2 — pipeline-reference.md (detailed)**
- Complete step-by-step coverage: all edge cases, all commands with variants, all hook internals, all recovery paths
- The authoritative source for the topic — Tier 1 defers to this
- No length limit; as complete as needed

**What this means in practice:**
- If a section in project-operations.md grows beyond ~15 lines, content is moved to pipeline-reference.md and the brief section is trimmed back
- If a user needs more than Tier 1 provides, the pointer line is always there
- New ops topics added in future features follow the same pattern: brief section in project-operations.md, detailed section in pipeline-reference.md

---

## Alternatives Considered

| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|-------------|
| Single tier: brief only in project-operations.md, no detailed section | Less maintenance | Users who need depth have nowhere to go except source code or skill files | Fails US-003; depth is a stated requirement |
| Single tier: full detail in project-operations.md | One place per topic | project-operations.md becomes as long and hard to scan as the old getting-started.md | Recreates the original problem |
| Variable depth: author decides per section | Flexibility | Inconsistency; no clear signal to users about where to look for depth | Unpredictable navigation experience |

---

## Affected Components

| Component | Impact |
|-----------|--------|
| project-operations.md | Brief sections capped at ~15 lines; every section ends with a `→` pointer |
| pipeline-reference.md | Receives the detailed sections; authoritative source for all ops topics |

---

## Consequences

**Positive:**
- Users can orient in project-operations.md and escalate to pipeline-reference.md when needed — progressive disclosure
- The `→` pointer pattern is consistent and predictable; users learn it once and apply it everywhere
- Future contributors have a clear rule for where to put new ops content

**Negative:**
- Every ops topic requires writing at two levels; more total words to write and review than a single-tier approach
- Brief and detailed sections can drift if one is updated without the other; the detailed section is authoritative but users may read only the brief section

**Risks:**
- The ~15-line limit is a guideline, not a hard constraint; without enforcement, sections will grow over time; mitigated by making the limit explicit in this ADR so reviewers can flag violations

---

## Related ADRs

- ADR-001 - depends-on (the three-file structure is the prerequisite for the two-tier model to exist)

---

## Supersedes

- None

## Superseded By

- None

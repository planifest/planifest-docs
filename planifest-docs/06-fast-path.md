# Fast Path

The Fast Path is for trivial, low-risk changes that do not warrant the full pipeline. It bypasses Feature Briefs, Execution Plans, and ADRs entirely.

## Criteria

**All four must be met.** The orchestrator verifies this before engaging the Fast Path. If any criterion fails, the request is routed to the Change Pipeline instead — there are no exceptions.

1. Does **not** introduce new external dependencies
2. Does **not** alter, add, or remove database schemas or data models
3. Does **not** change security parameters, authentication, or routing logic
4. Confined to: UI styling, copy changes, or isolated pure-function logic bugs

## Steps

1. **Implement** the fix directly — minimum change only, no surrounding refactoring
2. **Validate** — run CI checks (lint, typecheck, test, build). Self-correct up to three times. If CI still fails after three attempts, escalate to the Change Pipeline.
3. **Update `component.yml`** — increment the patch version (`1.2.3` → `1.2.4`), update `metadata.updatedAt` to today's date
4. **Log the change** — append an entry to `plan/changelog/{feature-id}-{YYYY-MM-DD}.md`:

   ```
   ## {YYYY-MM-DD} - Fast Path: {description}
   - Change: {what was changed}
   - Component: {component-id}
   - Reason: {why}
   ```

5. **Commit** using the Fast Path convention:

   ```
   fix(fast-path): {description}
   ```

## Relaxed Documentation Check

The pre-push hook and CI workflow recognise the `fix(fast-path):` prefix and require only `component.yml` or `plan/changelog/` to be updated — not a full `plan/` or `docs/` change.

## What Is Not Touched

| Artifact | Why |
|----------|-----|
| `plan/current/design.md` | No design change — the fix is within existing scope |
| `plan/current/adr/` | No new architectural decisions |
| `docs/` | No structural change to document (unless the fix directly corrects a documentation error) |

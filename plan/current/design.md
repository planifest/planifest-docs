# Confirmed Design — getting-started-gaps

## Summary

Add two missing sections to `planifest-docs/02-getting-started.md` covering the telemetry opt-in option and the strict mode enforcement option. Both are implemented in the framework but absent from the user-facing guide.

## Adoption Mode

Change Pipeline — targeted content addition to one existing component. No code changes, no new dependencies, no schema changes.

## Component Paths

- planifest-docs/

## Scope

### In Scope

- Add **Telemetry** section: `PLANIFEST_TELEMETRY_URL` env var, `.claude/telemetry-enabled` sentinel, what events are emitted, silent/no-op default behaviour
- Add **Strict Mode** section: `plan/.orchestrator-strict` sentinel, advisory vs strict behaviour, `plan/.orchestrator-ack` handshake, when to use it

### Out of Scope

- Changes to any other doc page
- Changes to framework source
- Changes to the web app

### Deferred

- Nothing

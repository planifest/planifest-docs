# Component Purpose — planifest-docs

`planifest-docs` is the canonical content layer of the Planifest documentation website. It owns and maintains every documentation page as a markdown source file.

## Role in the System

The component sits between framework development (planifest-framework) and the public-facing site (web-app). When the framework ships a new feature, this component is updated via a Planifest pipeline run to reflect the change. The web-app then consumes the updated markdown files at build time to regenerate the site.

## What It Is Responsible For

- Owning the authoritative text of every documentation page (`planifest-docs/*.md`)
- Accurate representation of the current framework — phases, routing, standards, templates, project operations
- Agent Skills Reference and Getting Started guide

## What It Is Not Responsible For

- Rendering or serving documentation — that is the web-app component
- Navigation structure or page ordering — managed by `src/web-app/docs.manifest.json`
- Framework skill files, hooks, or templates — those live in `planifest-framework/`

## Consumers

`src/web-app/scripts/build-docs.js` reads all markdown files at build time. No runtime consumers.

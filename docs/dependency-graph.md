# Dependency Graph

Last updated: 0000003-p9-phase-docs

---

## Build Pipeline

```mermaid
graph TD
    subgraph Source
        md["planifest-docs/\n(Markdown source)"]
        manifest["docs.manifest.json\n(page order & titles)"]
        framework["planifest-framework/\n(skills, hooks, templates, standards)"]
    end

    subgraph Build
        builder["scripts/build-docs.js\n(Node.js — marked)"]
        vite["Vite\n(bundle & optimise)"]
    end

    subgraph Output
        html["src/web-app/docs/*.html\n(generated pages)"]
        sitemap["public/sitemap-data.json\n(runtime nav data)"]
        dist["dist/\n(production bundle)"]
    end

    subgraph Deployment
        ghpages["GitHub Pages\n(planifest.dev)"]
        ci["GitHub Actions\n(.github/workflows/)"]
    end

    md -- "parsed by marked,\nlinks rewritten" --> builder
    manifest -- "page order & titles" --> builder
    builder -- "generates HTML\nwith nav + pagination" --> html
    builder -- "writes" --> sitemap
    html -- "bundled as\nmulti-page app" --> vite
    sitemap -- "copied to dist" --> vite
    vite --> dist
    ci -- "triggers on merge to main" --> vite
    dist -- "published" --> ghpages
```

---

## Content Authoring Flow

```mermaid
graph LR
    author["Author edits\nplanifest-docs/*.md"]
    build["node scripts/build-docs.js"]
    preview["npm run dev\n(Vite dev server)"]
    pr["Pull Request\n→ main"]
    deploy["GitHub Actions\n→ GitHub Pages"]

    author --> build --> preview
    preview -- "approved" --> pr --> deploy
```

---

## planifest-framework (dev dependency only)

`planifest-framework/` is a vendored copy used exclusively to manage development of this repo — it is not part of the build output and is not shipped with the site. It has no role at compile time or runtime for the web-app.

The authoritative framework source is at [github.com/planifest/planifest-framework](https://github.com/planifest/planifest-framework). Consumer repos obtain the framework directly from there — not from this repo.

```mermaid
graph LR
    source["github.com/planifest/\nplanifest-framework\n(source of truth)"]
    vendored["planifest-framework/\n(vendored copy in this repo,\ndev only)"]
    consumer["Any Consumer Repo"]
    hooks[".claude/hooks/"]
    skills[".claude/skills/"]
    boot["CLAUDE.md / AGENTS.md"]

    source -- "pulled to update\nvendored copy" --> vendored
    vendored -- "governs development\nof planifest-docs only" --> vendored

    source -- "copied by developer" --> consumer
    consumer -- "setup.sh / setup.ps1\ninstalls" --> hooks
    consumer -- "setup.sh / setup.ps1\ninstalls" --> skills
    consumer -- "setup.sh / setup.ps1\nwrites" --> boot
```

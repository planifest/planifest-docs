import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './', // For GitHub Pages standard relative layout
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        doc01: resolve(__dirname, 'docs/01-overview.html'),
        doc02: resolve(__dirname, 'docs/02-getting-started.html'),
        doc03: resolve(__dirname, 'docs/03-pipeline.html'),
        doc04: resolve(__dirname, 'docs/04-routing.html'),
        doc05: resolve(__dirname, 'docs/05-change-pipeline.html'),
        doc06: resolve(__dirname, 'docs/06-fast-path.html'),
        doc07: resolve(__dirname, 'docs/07-retrofit.html'),
        doc08: resolve(__dirname, 'docs/08-agent-skills-reference.html'),
        doc09: resolve(__dirname, 'docs/09-standards.html'),
        doc10: resolve(__dirname, 'docs/10-templates.html'),
        sitemap: resolve(__dirname, 'docs/sitemap.html'),
      }
    }
  }
});

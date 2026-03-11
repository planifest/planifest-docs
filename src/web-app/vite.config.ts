import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './', // For GitHub Pages standard relative layout
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        p001: resolve(__dirname, 'docs/p001-planifest-master-plan.html'),
        p002: resolve(__dirname, 'docs/p002-planifest-product-concept.html'),
        p003: resolve(__dirname, 'docs/p003-planifest-functional-decisions.html'),
        p004: resolve(__dirname, 'docs/p004-the-pathway-to-agentic-development.html'),
        p010: resolve(__dirname, 'docs/p010-planifest-agentic-tool-runbook.html'),
        p011: resolve(__dirname, 'docs/p011-planifest-pilot-app.html'),
        p013: resolve(__dirname, 'docs/p013-planifest-backend-stack-evaluation.html'),
        p014: resolve(__dirname, 'docs/p014-planifest-roadmap.html'),
        p015: resolve(__dirname, 'docs/p015-planifest-pipeline.html'),
        p016: resolve(__dirname, 'docs/p016-planifest-frontend-stack-evaluation.html'),
        p017: resolve(__dirname, 'docs/p017-research-report-strategic-intent-vs-stochastic-execution.html')
      }
    }
  }
});

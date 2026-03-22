import fs from 'fs';
import path from 'path';
import { resolve } from 'path';
import { marked } from 'marked';

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DOCS_DIR = path.resolve(__dirname, '../../../planifest-docs');
const OUT_DIR = path.resolve(__dirname, '../docs');
const TEMPLATE_FILE = path.resolve(__dirname, '../doc-template.html');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const template = fs.existsSync(TEMPLATE_FILE)
  ? fs.readFileSync(TEMPLATE_FILE, 'utf-8')
  : `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{TITLE}} - Planifest Docs</title>
    <!-- We reference main CSS here; Vite will resolve and built it -->
    <link rel="stylesheet" href="../src/style.css">
    <script type="module" src="../src/main.ts"></script>
  </head>
  <body>
    <div id="app">
      <nav class="glass-nav">
        <div class="nav-content">
          <a href="../index.html" class="logo"><img src="../img/planifest-logo.svg" alt="Planifest Logo"></a>
          <div class="nav-links">
            <a href="../index.html#about" class="nav-link">About</a>
            <a href="../index.html#structure" class="nav-link">Structure</a>
            <a href="p001-planifest-master-plan.html" class="nav-link">Master Plan</a>
          </div>
          <div class="nav-actions">
            <button class="hamburger-btn" aria-label="Toggle menu" title="Menu">
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" class="menu-icon" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
              <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </button>
          </div>
        </div>
      </nav>
      <main class="doc-container glass-panel">
        {{CONTENT}}
      </main>
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="brand"><img src="../img/planifest-logo.svg" alt="Planifest Logo" style="height: 32px;"></div>
            <p>Generated via Agentic execution • Deployed with GitHub Actions</p>
            <div class="footer-links">
              <a href="sitemap.html">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </body>
</html>`;

const renderer = new marked.Renderer();
renderer.code = function({text, lang, escaped}) {
  if (lang === 'mermaid') {
    return `<pre class="mermaid">${text}</pre>`;
  }
  return `<pre><code class="language-${lang}">${escaped ? text : text}</code></pre>`;
};

marked.use({ renderer });

function stripMetadata(markdown) {
  // Replace .md cross-references with .html references
  let cleaned = markdown.replace(/href="([^"]+)\.md"/g, 'href="$1.html"');
  cleaned = cleaned.replace(/\]\(([^)]+)\.md\)/g, ']($1.html)');
  
  return cleaned;
}

const files = fs.readdirSync(DOCS_DIR).filter(file => file.endsWith('.md'));

const sitemapData = [];

files.forEach(file => {
  const mdPath = path.join(DOCS_DIR, file);
  const rawMarkdown = fs.readFileSync(mdPath, 'utf-8');
  const cleanedMarkdown = stripMetadata(rawMarkdown);
  const htmlContent = marked.parse(cleanedMarkdown);

  const titleMatch = cleanedMarkdown.match(/^#\s+(.+)$/m);
  let title = titleMatch ? titleMatch[1] : file.replace('.md', '');
  
  // Clean off the ID prefix if present (e.g., "p015-planifest-pipeline - ")
  title = title.replace(/^p\d{3}[-\w]*\s*-\s*/, '').trim();
  
  sitemapData.push({ file: file.replace('.md', '.html'), title });

  const finalHtml = template
    .replace('{{TITLE}}', title)
    .replace('{{CONTENT}}', htmlContent);

  const outHtmlPath = path.join(OUT_DIR, file.replace('.md', '.html'));
  fs.writeFileSync(outHtmlPath, finalHtml, 'utf-8');
  console.log(`Generated: ${outHtmlPath}`);
});

const sitemapPath = path.resolve(__dirname, '../src/sitemap-data.json');
fs.writeFileSync(sitemapPath, JSON.stringify(sitemapData, null, 2), 'utf-8');
console.log(`Generated Sitemap Data to: ${sitemapPath}`);

// Generate Sitemap HTML
let sitemapContent = '<h1>Planifest Document Sitemap</h1>\n<ul>\n';
sitemapData.forEach(item => {
  sitemapContent += `<li><a href="${item.file}">${item.title}</a></li>\n`;
});
sitemapContent += '</ul>';

const sitemapHtml = template
  .replace('{{TITLE}}', 'Sitemap')
  .replace('{{CONTENT}}', sitemapContent);

fs.writeFileSync(path.join(OUT_DIR, 'sitemap.html'), sitemapHtml, 'utf-8');
console.log('Generated Sitemap HTML.');

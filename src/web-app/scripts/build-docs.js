import fs from 'fs';
import path from 'path';
import { resolve } from 'path';
import { marked } from 'marked';

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DOCS_DIR = path.resolve(__dirname, '../../../planifest-docs');
const OUT_DIR = path.resolve(__dirname, '../docs');
const TEMPLATE_FILE = path.resolve(__dirname, '../doc-template.html');
const MANIFEST_FILE = path.resolve(__dirname, '../docs.manifest.json');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// --- Page order manifest (REQ-001) ---
if (!fs.existsSync(MANIFEST_FILE)) {
  console.error(`ERROR: docs.manifest.json not found at ${MANIFEST_FILE}`);
  process.exit(1);
}
let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf-8'));
} catch (e) {
  console.error(`ERROR: docs.manifest.json is not valid JSON: ${e.message}`);
  process.exit(1);
}
if (!Array.isArray(manifest.pages) || manifest.pages.length === 0) {
  console.error('ERROR: docs.manifest.json must have a non-empty "pages" array');
  process.exit(1);
}
const manifestPages = manifest.pages;

// --- Template ---
const rawTemplate = fs.existsSync(TEMPLATE_FILE)
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
            {{DOC_NAV_LINKS}}
          </div>
          <div class="nav-actions">
            <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
              <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </button>
            <a href="https://github.com/planifest/planifest-framework" class="code-icon-link" aria-label="GitHub Repository" title="GitHub Repository" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="code-icon"><polyline points="20 18 24 12 20 6"></polyline><polyline points="4 6 0 12 4 18"></polyline><line x1="14" y1="2" x2="10" y2="22"></line></svg>
            </a>
            <button class="hamburger-btn" aria-label="Toggle menu" title="Menu">
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" class="menu-icon" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </nav>
      <main class="doc-container glass-panel">
        {{CONTENT}}
        {{PREV_NEXT_NAV}}
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

// Validate required placeholders (REQ-002, R-004)
if (!rawTemplate.includes('{{DOC_NAV_LINKS}}')) {
  console.error('ERROR: Template is missing {{DOC_NAV_LINKS}} placeholder. Add it to doc-template.html inside <div class="nav-links">.');
  process.exit(1);
}
if (!rawTemplate.includes('{{PREV_NEXT_NAV}}')) {
  console.error('ERROR: Template is missing {{PREV_NEXT_NAV}} placeholder. Add it inside <main> after {{CONTENT}}.');
  process.exit(1);
}

// --- Generate doc nav links from manifest (REQ-002) ---
const docNavLinksHtml = manifestPages
  .map(p => `<a href="${p.file}" class="nav-link">${p.title}</a>`)
  .join('\n            ');

const template = rawTemplate.replace('{{DOC_NAV_LINKS}}', docNavLinksHtml);

// --- Helpers ---
const renderer = new marked.Renderer();
renderer.heading = function({ text, depth }) {
  const id = text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  return `<h${depth} id="${id}">${text}</h${depth}>\n`;
};
renderer.code = function({text, lang, escaped}) {
  if (lang === 'mermaid') {
    return `<pre class="mermaid">${text}</pre>`;
  }
  return `<pre><code class="language-${lang}">${escaped ? text : text}</code></pre>`;
};

marked.use({ renderer });

function stripMetadata(markdown) {
  let cleaned = markdown.replace(/href="([^"]+)\.md"/g, 'href="$1.html"');
  cleaned = cleaned.replace(/\]\(([^)]+)\.md\)/g, ']($1.html)');
  return cleaned;
}

function buildPrevNextNav(index) {
  const prev = index > 0 ? manifestPages[index - 1] : null;
  const next = index < manifestPages.length - 1 ? manifestPages[index + 1] : null;
  if (!prev && !next) return '';
  return `
<nav class="doc-pagination">
  ${prev ? `<a href="${prev.file}" class="doc-pagination__prev">← Previous<span class="doc-pagination__title">${prev.title}</span></a>` : '<span class="doc-pagination__spacer"></span>'}
  ${next ? `<a href="${next.file}" class="doc-pagination__next">Next →<span class="doc-pagination__title">${next.title}</span></a>` : '<span class="doc-pagination__spacer"></span>'}
</nav>`;
}

// --- Warn on undeclared pages (R-002) ---
const manifestFileSet = new Set(manifestPages.map(p => p.file.replace('.html', '.md')));
const allMdFiles = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.md'));
for (const f of allMdFiles) {
  if (!manifestFileSet.has(f)) {
    console.warn(`WARN: ${f} exists in planifest-docs but is not listed in docs.manifest.json — it will not appear in navigation`);
  }
}

// --- Process pages in manifest order (REQ-001, REQ-002, REQ-003) ---
const sitemapData = [];

manifestPages.forEach(({ file, title }, index) => {
  const mdFile = file.replace('.html', '.md');
  const mdPath = path.join(DOCS_DIR, mdFile);

  if (!fs.existsSync(mdPath)) {
    console.warn(`WARN: Manifest references ${mdFile} but file not found in ${DOCS_DIR} — skipping`);
    return;
  }

  const rawMarkdown = fs.readFileSync(mdPath, 'utf-8');
  const cleanedMarkdown = stripMetadata(rawMarkdown);
  const htmlContent = marked.parse(cleanedMarkdown);

  sitemapData.push({ file, title });

  const prevNextNav = buildPrevNextNav(index);

  const finalHtml = template
    .replace('{{TITLE}}', title)
    .replace('{{CONTENT}}', htmlContent)
    .replace('{{PREV_NEXT_NAV}}', prevNextNav);

  const outHtmlPath = path.join(OUT_DIR, file);
  fs.writeFileSync(outHtmlPath, finalHtml, 'utf-8');
  console.log(`Generated: ${outHtmlPath}`);
});

const sitemapDataPath = path.join(__dirname, '../public/sitemap-data.json');
fs.writeFileSync(sitemapDataPath, JSON.stringify(sitemapData, null, 2), 'utf-8');
console.log(`Wrote JSON sitemap to: ${sitemapDataPath}`);

// Generate Sitemap HTML
let sitemapContent = '<h1>Planifest Document Sitemap</h1>\n<ul>\n';
sitemapData.forEach(item => {
  sitemapContent += `<li><a href="${item.file}">${item.title}</a></li>\n`;
});
sitemapContent += '</ul>';

const sitemapHtml = template
  .replace('{{TITLE}}', 'Sitemap')
  .replace('{{CONTENT}}', sitemapContent)
  .replace('{{PREV_NEXT_NAV}}', '');

fs.writeFileSync(path.join(OUT_DIR, 'sitemap.html'), sitemapHtml, 'utf-8');
console.log('Generated Sitemap HTML.');

// --- REQ-004 safeguard: patch index.html CTA if stale href detected ---
const indexHtmlPath = path.resolve(__dirname, '../index.html');
if (fs.existsSync(indexHtmlPath)) {
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  const staleHref = './docs/p001-planifest-master-plan.html';
  if (indexHtml.includes(staleHref)) {
    const patched = indexHtml.replace(staleHref, './docs/01-overview.html');
    fs.writeFileSync(indexHtmlPath, patched, 'utf-8');
    console.log('Patched stale CTA href in index.html');
  }
}

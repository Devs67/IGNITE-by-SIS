// Post-build step for GitHub Pages (static hosting, no server):
// 1. Give every page its own index.html (a copy of the app shell) so deep
//    links and refreshes load with a 200 instead of a 404.
// 2. Put each page's own title, description, share tags and canonical URL in
//    that copy, so search engines see the right details without running JS.
// 3. Write sitemap.xml from the same page list, and a noindex 404.html.
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://ignitebysis.com';
const dist = path.resolve('dist');
const pages = JSON.parse(fs.readFileSync(path.resolve('src/pages.json'), 'utf8'));
const shell = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

// GitHub Pages serves /challenges as /challenges/ (the folder), so that's the canonical URL
const urlFor = (p) => (p === '/' ? `${SITE}/` : `${SITE}${p}/`);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function withMeta(html, page) {
  const url = urlFor(page.path);
  const replacements = [
    [/<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`],
    [/(<meta name="description" content=")[^"]*(")/, `$1${esc(page.description)}$2`],
    [/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(page.title)}$2`],
    [/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(page.description)}$2`],
    [/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`],
    [/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`],
  ];
  for (const [pattern, value] of replacements) {
    if (!pattern.test(html)) throw new Error(`spa-routes: index.html is missing ${pattern}`);
    html = html.replace(pattern, value);
  }
  return html;
}

for (const page of pages) {
  const file = page.path === '/' ? path.join(dist, 'index.html') : path.join(dist, page.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, withMeta(shell, page));
}

// Unknown addresses: the app redirects to Home; tell search engines not to index this copy
fs.writeFileSync(
  path.join(dist, '404.html'),
  withMeta(shell, pages[0]).replace('<head>', '<head>\n    <meta name="robots" content="noindex" />'),
);

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>\n    <loc>${urlFor(p.path)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

console.log(`spa-routes: ${pages.length} pages with their own meta, 404.html (noindex), sitemap.xml`);

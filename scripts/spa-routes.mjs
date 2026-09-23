// GitHub Pages only serves files that exist, so give every page its own
// index.html (a copy of the app shell). Deep links and refreshes then load
// with a 200 instead of a 404. 404.html catches any other address.
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const shell = fs.readFileSync(path.join(dist, 'index.html'));
// Keep in sync with src/pages.ts
const routes = ['challenges', 'journey', 'gallery', 'faq'];

for (const route of routes) {
  fs.mkdirSync(path.join(dist, route), { recursive: true });
  fs.writeFileSync(path.join(dist, route, 'index.html'), shell);
}
fs.writeFileSync(path.join(dist, '404.html'), shell);
console.log(`spa-routes: wrote ${routes.length} page shells + 404.html`);

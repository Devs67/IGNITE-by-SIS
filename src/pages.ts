// Site pages, in reading order. Drives the navbar, footer, and the
// previous/next navigation shown at the bottom of every page.
// The data lives in pages.json so the build script (scripts/spa-routes.mjs)
// can write each page's title, description and sitemap entry from it too.
import pages from './pages.json';

export const PAGES = pages;

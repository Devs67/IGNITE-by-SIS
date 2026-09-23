import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
// Fonts are self-hosted (bundled), so text never waits on a third-party server
import '@fontsource-variable/space-grotesk/wght.css';
import '@fontsource-variable/manrope/wght.css';
import '@fontsource/dm-mono/400.css';
import '@fontsource/dm-mono/500.css';
import './index.css';

// GitHub Pages serves each page as a folder and redirects /challenges to
// /challenges/. Drop the trailing slash so the app sees one address per page.
const { pathname, search, hash } = window.location;
if (pathname.length > 1 && pathname.endsWith('/')) {
  window.history.replaceState(null, '', pathname.replace(/\/+$/, '') + search + hash);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

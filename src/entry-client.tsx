import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource/ibm-plex-sans/latin-400.css';
import '@fontsource/ibm-plex-sans/latin-500.css';
import '@fontsource/ibm-plex-sans/latin-600.css';
import '@fontsource/ibm-plex-sans/latin-700.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import '@fontsource/ibm-plex-mono/latin-600.css';
import './index.css';
import App from './App';

const akar = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
// Build produksi: #root sudah berisi HTML hasil prerender, cukup dihidupkan. Mode dev: #root hanya berisi komentar penanda.
if (akar.firstElementChild) hydrateRoot(akar, app);
else createRoot(akar).render(app);

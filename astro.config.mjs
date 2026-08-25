import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import pagefind from 'astro-pagefind';

export default defineConfig({
  site: 'https://awlego.com',
  integrations: [react(), pagefind()],
  output: 'static',
  redirects: {
    '/posts': '/writing',
    '/writing/2024-10-01-resume': '/resume',
    '/chess-knowledge-visualization': '/writing/2024-10-09-lc0',
  },
  build: {
    format: 'directory',
  },
});

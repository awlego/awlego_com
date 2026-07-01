import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import pagefind from 'astro-pagefind';

export default defineConfig({
  site: 'https://awlego.com',
  integrations: [react(), pagefind()],
  output: 'static',
  build: {
    format: 'directory',
  },
});

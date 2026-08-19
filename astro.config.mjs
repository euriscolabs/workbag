// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import rehypeContentLinks from './src/lib/markdown-links.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://euriscolabs.com',
  integrations: [react(), mdx(), sitemap()],
  markdown: {
    rehypePlugins: [
      [
        rehypeContentLinks,
        { rootDir: fileURLToPath(new URL('./src/pages', import.meta.url)) },
      ],
    ],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});

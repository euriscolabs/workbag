// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import rehypeContentLinks from './src/lib/markdown-links.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://euriscolabs.com',
  integrations: [mdx()],
  markdown: {
    rehypePlugins: [
      [
        rehypeContentLinks,
        { contentDir: fileURLToPath(new URL('./src/content', import.meta.url)) },
      ],
    ],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});

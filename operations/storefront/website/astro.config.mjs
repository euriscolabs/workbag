// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import rehypeAstroRelativeMarkdownLinks from 'astro-rehype-relative-markdown-links';

// https://astro.build/config
export default defineConfig({
  site: 'https://euriscolabs.com',
  markdown: {
    rehypePlugins: [rehypeAstroRelativeMarkdownLinks],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://pratthananta.github.io',
  base: process.env.SITE_BASE || '/Portfolio',
  trailingSlash: 'always',
  output: 'static',
});

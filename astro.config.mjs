import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://parvisai.com',
  server: {
    port: 4321,
    host: true,
  },
  devToolbar: {
    enabled: false,
  },
});

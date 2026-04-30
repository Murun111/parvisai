import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: Number(process.env.PORT) || 5173,
    host: '127.0.0.1',
    strictPort: true,
  },
  build: {
    outDir: '../education-dashboard',
    emptyOutDir: true,
  },
});

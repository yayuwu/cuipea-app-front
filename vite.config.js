import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  base: './', // Esto permite que las rutas de scripts sean relativas
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173
  },
  
});


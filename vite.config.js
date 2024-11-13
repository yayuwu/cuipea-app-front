import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  base: './', // Esto permite que las rutas de scripts sean relativas
  build: {
    outDir: 'dist'
  },
  server: {
    port: 5173
  },
  
});

// Config con el back

// import { defineConfig } from 'vite';

// export default defineConfig({
//   root: './',
//   build: {
//     outDir: 'dist'
//   },
//   server: {
//     port: 3000,
//     proxy: {
//       // Proxy todas las peticiones a tu back-end
//       '/': {
//         target: 'http://localhost:8080', // El puerto de tu servidor Node.js
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/$/, '/')
//       }
//     }
//   }
// });

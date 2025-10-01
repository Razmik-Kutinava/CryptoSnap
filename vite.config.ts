import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  server: {
    port: 3003,
    host: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'scutiform-pushed-malorie.ngrok-free.dev',
      '.ngrok-free.dev',
      '.ngrok.io'
    ]
  },
  base: './',
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets'
  },
  publicDir: 'public'
});
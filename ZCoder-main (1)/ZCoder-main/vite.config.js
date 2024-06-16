/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from "vite-plugin-node-polyfills";



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),nodePolyfills()],
  server: {
      proxy: {
        '/register': {
          target: 'http://localhost:1000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/register/, ''),
        },
      },
    },
});
import path from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Only the browser bundle is chunked; the SSR bundle keeps dependencies
    // external, so naming them here would fail the build.
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            // Split slow-moving dependencies out of the app chunk so a copy
            // edit does not force every visitor to re-download React and
            // Framer Motion.
            manualChunks: {
              react: ['react', 'react-dom'],
              motion: ['framer-motion'],
              i18n: [
                'i18next',
                'react-i18next',
                'i18next-browser-languagedetector',
              ],
              forms: ['@tanstack/react-form', 'zod'],
            },
          },
        },
  },
}))

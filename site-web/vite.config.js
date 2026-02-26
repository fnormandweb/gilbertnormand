import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        galerie: resolve(__dirname, 'galerie.html'),
        famille: resolve(__dirname, 'famille.html'),
      },
    },
  },
})

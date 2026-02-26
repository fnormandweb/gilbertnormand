import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  base: process.env.VITE_BUILD_FOR_API === '1' ? '/admin/' : '/',
})

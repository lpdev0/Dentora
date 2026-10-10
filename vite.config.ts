import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    modulePreload: false,
    cssCodeSplit: false,
    rollupOptions: { output: { format: 'iife', inlineDynamicImports: true, entryFileNames: 'script.js', assetFileNames: asset => asset.names?.some(name => name.endsWith('.css')) ? 'style.css' : 'assets/[name]-[hash][extname]' } },
  },
})

import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@/': path.resolve(import.meta.dir, 'src'),
      '@server': path.resolve(import.meta.dir, '../server'),
    },
  },
  build: {
    outDir: path.resolve(import.meta.dir, 'dist'),
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})

import path from 'path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tsconfigPaths from "vite-tsconfig-paths"
import tailwindcss from '@tailwindcss/vite'


const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    tsconfigPaths(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, './src/'),
      '@/server': path.resolve(__dirname, '../server/'),
      "@/components": path.resolve(__dirname, './src/components/'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    modulePreload: true,
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

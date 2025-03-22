import path from 'path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tsconfigPaths from "vite-tsconfig-paths"
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    tsconfigPaths(),
    tailwindcss(),
    visualizer({ open: true }), // Add the visualizer plugin
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
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
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

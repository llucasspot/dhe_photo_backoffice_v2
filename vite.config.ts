import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: resolve(__dirname, './src/components'),
      features: resolve(__dirname, './src/features'),
      lib: resolve(__dirname, './src/lib'),
      assets: resolve(__dirname, './src/assets')
    }
  }
})
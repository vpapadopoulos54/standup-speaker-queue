import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.BUILD_TARGET === 'extension' ? '/' : '/standup-speaker-queue/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        popup: './public/popup.html',
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
})

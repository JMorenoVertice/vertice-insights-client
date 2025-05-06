import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        scormWorker: './public/worker/scormWorker.js'
      }
    }
  },
  optimizeDeps: {
    entries: ['./index.html', './public/worker/scormWorker.js']
  }
})

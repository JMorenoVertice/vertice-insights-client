import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        scormWorker: './src/scormWorker.tsx'
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'scormWorker') {
            return 'scorm-worker.js';
          }
          return 'assets/[name]-[hash].js';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
})

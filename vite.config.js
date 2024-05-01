import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://exam.razoyo.com',
        changeOrigin: true,
        
      },
    },
  },
  plugins: [react()],
})

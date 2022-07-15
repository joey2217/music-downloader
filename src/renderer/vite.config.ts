import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/netease': {
        target: 'https://netease-cloud-music-api-lyart-six.vercel.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/netease/, '')
      },
    }
  }
})

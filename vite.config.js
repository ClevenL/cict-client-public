import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

let target;
if (typeof process.env.CICT_CLIENT_API_HOST === 'undefined' || 
    typeof process.env.CICT_CLIENT_API_PORT === 'undefined'){
    target = 'http://localhost:3000'
} else {
    target = `http://${process.env.CICT_CLIENT_API_HOST}:${process.env.CICT_CLIENT_API_PORT}`
}

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    strictPort: true,
    proxy: {
      '/api': {
        target: target
      }
    }
  }
})

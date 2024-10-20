import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true, // ensures the host header of the request matches the backend
        secure: false, // only necessary if your backend is using HTTPS with self-signed certificates
      },
    },
  },
});
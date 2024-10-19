import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.REACT_APP_API_URL || 'http://localhost:3000', // Use env variable
        changeOrigin: true, // ensures the host header of the request matches the backend
        secure: false, // only necessary if your backend is using HTTPS with self-signed certificates
      },
    },
  },
});
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': {
        target: 'http://localhost:3000',
      },
      '/register': {
        target: 'http://localhost:3000',
      },
      '/posts': {
        target: 'http://localhost:3000',
      },
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: '192.168.29.242',  // Allows access from the local network
    port: 5173,        // Optional: Change the port if needed
    open: true,        // Optional: Automatically open the app in the browser
  }
})

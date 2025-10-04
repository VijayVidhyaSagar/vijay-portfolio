import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
//import { config } from 'dotenv'

// Load environment variables from .env file
//config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  base: '/vijay-portfolio/',
  // define: {
  //  'process.env': process.env
  // },
  // server: {
  //   watch: {
  //     usePolling: true,
  //   },
  //   host: true,
  //   port: 3000
  // },
})

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron/renderer'

export default defineConfig({
  plugins: [react(), electron()],
  server: { port: 4000 },
})

import { join } from 'path'
import { defineConfig } from 'vite'
import progress from 'vite-plugin-progress'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), progress()],
  css: {
    modules: {},
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: '',
      },
      {
        find: '@',
        replacement: join(__dirname, 'src'),
      },
    ],
  },
})

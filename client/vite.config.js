import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    include: [
      'tests/component/**/*.test.{js,jsx}',
      'tests/unit/**/*.test.{js,jsx}'
    ]
  },
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server:{
	proxy:{
		'/api': {
			target: 'http://98.86.156.251:8080/api/v1/user/',
			changeOrigin: true,
			secure: false
		}
	}
  },

  test: {
	 globals: true,
	 environment: "jsdom",
	 setupFiles: "./tests/setup.js",
	 coverage: {
		provider: "v8",
		reporter: ["text", "html"]
	 },
  },
})

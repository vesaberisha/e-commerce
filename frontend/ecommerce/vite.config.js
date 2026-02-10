import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Ensure JSX in `.js`/`.jsx` files is transformed before Vite's import analysis
    {
      name: 'transform-js-and-jsx-as-react-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.[jt]sx?$/)) {
          return null
        }
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        })
      },
    },
  ],
  // Ensure dependency pre-bundling also understands JSX in `.js` files
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

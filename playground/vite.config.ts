import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import StripExports from 'unplugin-strip-exports/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    StripExports({
      match(filepath: string, ssr) {
        // Ignore SSR build
        if (ssr)
          return

        if (filepath.includes('tsx'))
          return ['getServerSideProps']
      },
      beforeOutput(code) {
        return code.replace('loader,', '').replace('action,', '')
      },
    }),
    react(),
  ],
})

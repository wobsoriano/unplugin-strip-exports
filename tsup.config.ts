import { defineConfig } from 'tsup'

export default defineConfig({
  entryPoints: [
    'src/*.ts',
  ],
  format: ['esm', 'cjs'],
  target: 'node14',
  clean: true,
  dts: true,
  splitting: true,
  shims: true,
})

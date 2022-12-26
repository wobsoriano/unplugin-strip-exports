import type { Options } from 'tsup'

export default <Options>{
  entryPoints: [
    'src/*.ts',
  ],
  format: ['esm', 'cjs'],
  target: 'node14',
  clean: true,
  dts: true,
  splitting: true,
  shims: true,
}

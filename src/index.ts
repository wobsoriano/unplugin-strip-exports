import { createUnplugin } from 'unplugin'
import { transformSync } from '@babel/core'
import type { TransformOptions } from '@babel/core'
import type { Options } from './types'
import { babelTransformClientSidePages } from './core/transform'

const JS_RE = /\.(js|jsx|ts|tsx|mjs|cjs|vue)$/

export function removeExports(code: string, exportNames: string[], babelTransformOptions?: TransformOptions) {
  const result = transformSync(code, {
    ...babelTransformOptions,
    plugins: ['@babel/plugin-transform-typescript', ...babelTransformOptions?.plugins ?? [], babelTransformClientSidePages(exportNames)],
  })

  return result
}

export default createUnplugin<Options>(options => ({
  name: 'unplugin-strip-exports',
  enforce: 'post',
  async transform(code: string, id: string, opts?: { ssr?: boolean }) {
    const namesToExclude = JS_RE.test(id) && await options.match(id, opts?.ssr)
    if (!namesToExclude || namesToExclude.length === 0)
      return null

    const result = removeExports(code, namesToExclude, options.babelTransformOptions)

    if (result?.code) {
      // `beforeOutput` is meant to be used with Vue.
      if (options.beforeOutput) {
        return {
          code: options.beforeOutput(result.code),
          map: result.map,
        }
      }

      return {
        code: result.code,
        map: result.map,
      }
    }
  },
}))

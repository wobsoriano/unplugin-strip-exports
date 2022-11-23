import { createUnplugin } from 'unplugin'
import { transformSync } from '@babel/core'
import type { TransformOptions } from '@babel/core'
import type { Options } from '../types'
import { babelTransformClientSidePages } from './transform'

const JS_RE = /\.(js|jsx|ts|tsx|mjs|cjs|vue)$/

export function removeExports(code: string, exportNames: string[], babelTransformOptions?: TransformOptions) {
  const result = transformSync(code, {
    plugins: [...babelTransformOptions?.plugins ?? [], '@babel/plugin-transform-typescript', babelTransformClientSidePages(exportNames)],
    ...babelTransformOptions,
  })

  return result
}

export default createUnplugin<Options>(options => ({
  name: 'unplugin-strip-exports',
  enforce: 'post',
  transform(code: string, id: string, opts?: { ssr?: boolean }) {
    const namesToExclude = JS_RE.test(id) && options.match(id, opts?.ssr)
    if (!namesToExclude || namesToExclude.length === 0)
      return null

    const result = removeExports(code, namesToExclude, options.babelTransformOptions)

    if (result?.code) {
      return {
        code: result.code,
        map: result.map,
      }
    }
  },
}))

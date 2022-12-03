import type { TransformOptions } from '@babel/core'

type MatchFunction = (
  filepath: string,
  ssr?: boolean,
) => string[] | undefined | null | void

export interface Options {
  match: MatchFunction
  babelTransformOptions?: TransformOptions
}

import type { TransformOptions } from '@babel/core'

type MatchFunction = (
  filepath: string,
  ssr?: boolean,
) => string[] | undefined | null | void

type AdditionalTransformation = (code: string) => string

export interface Options {
  match: MatchFunction
  babelTransformOptions?: TransformOptions
  additionalTransformation?: AdditionalTransformation
}

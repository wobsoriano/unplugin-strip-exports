import type { TransformOptions } from '@babel/core'

type MatchFunction = (
  filepath: string,
  ssr?: boolean,
) => string[] | undefined | null | void

type BeforeOuput = (code: string) => string

export interface Options {
  match: MatchFunction
  babelTransformOptions?: TransformOptions
  beforeOutput?: BeforeOuput
}

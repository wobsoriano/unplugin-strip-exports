type MatchFunction = (
  filepath: string,
  ssr?: boolean,
) => string[] | undefined | null | void

export interface Options {
  match: MatchFunction
}

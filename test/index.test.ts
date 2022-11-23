import { expect, test } from 'vitest'
import { removeExports } from '../src'

const code = `
import { readFileSync } from 'fs'

export const getServerSideProps = () => {
  return {
    content: readFileSync('./foo.txt', 'utf-8'),
  }
}

console.log("hello world")
`

test('Correct markdown to tree-shakable ES Module imports', async () => {
  const result = removeExports(code, ['getServerSideProps'])
  expect(result?.code).toBe('console.log("hello world");')
})

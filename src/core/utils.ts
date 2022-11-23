/*!
 * Original code by Fatih Aygün
 * MIT Licensed, Copyright 2021 Fatih Aygün, see https://github.com/rakkasjs/rakkasjs/blob/main/LICENSE for details
 *
 * Credits to the Rakkas team for the client side exports strip implementation:
 * https://github.com/rakkasjs/rakkasjs/blob/main/packages/rakkasjs/src/features/run-server-side/implementation/transform/transform-utils.ts#L73
 */
import type { NodePath } from '@babel/core'
import type * as t from '@babel/types'

export function getAlreadyUnreferenced(program: NodePath<t.Program>) {
  const alreadyUnreferenced = new Set<string>()

  for (const [name, binding] of Object.entries(program.scope.bindings)) {
    if (!binding.referenced)
      alreadyUnreferenced.add(name)
  }

  return alreadyUnreferenced
}

export function removeUnreferenced(
  program: NodePath<t.Program>,
  alreadyUnreferenced: Set<string>,
) {
  for (;;) {
    program.scope.crawl()
    let removed = false
    for (const [name, binding] of Object.entries(program.scope.bindings)) {
      if (binding.referenced || alreadyUnreferenced.has(name))
        continue

      const parent = binding.path.parentPath
      if (
        parent?.isImportDeclaration() && parent.node.specifiers.length === 1
      )
        parent.remove()

      else
        binding.path.remove()

      removed = true
    }

    if (!removed)
      break
  }
}

/*!
 * Original code by Fatih Aygün
 * MIT Licensed, Copyright 2021 Fatih Aygün, see https://github.com/rakkasjs/rakkasjs/blob/main/LICENSE for details
 *
 * Credits to the Rakkas team for the client side exports strip implementation:
 * https://github.com/rakkasjs/rakkasjs/blob/main/packages/rakkasjs/src/features/run-server-side/implementation/transform/transform-client-page.ts
 */
import type { NodePath, PluginItem } from '@babel/core'
import * as t from '@babel/types'
import { getAlreadyUnreferenced, removeUnreferenced } from './utils'

export function babelTransformClientSidePages(SSR_EXPORTS: string[]): PluginItem {
  return {
    visitor: {
      Program: {
        exit(program) {
          const alreadyUnreferenced = getAlreadyUnreferenced(program)
          let modified = false

          program.traverse({
            ExportNamedDeclaration: {
              enter(path) {
                if (
                  t.isFunctionDeclaration(path.node.declaration)
                  && SSR_EXPORTS.includes(path.node.declaration.id!.name)
                ) {
                  path.remove()
                  modified = true
                }
                else if (t.isVariableDeclaration(path.node.declaration)) {
                  const declarations = path
                    .get('declaration')
                    .get('declarations') as NodePath<t.VariableDeclarator>[]

                  for (const declaration of declarations) {
                    if (
                      t.isIdentifier(declaration.node.id)
                      && SSR_EXPORTS.includes(declaration.node.id.name)
                    ) {
                      declaration.remove()
                      modified = true
                    }
                  }
                }
                else if (path.node.specifiers.length) {
                  const specifiers = path.get('specifiers')

                  for (const specifier of specifiers) {
                    if (
                      t.isExportSpecifier(specifier)
                      && t.isIdentifier(specifier.node.exported)
                      && SSR_EXPORTS.includes(specifier.node.exported.name)
                    ) {
                      specifier.remove()
                      modified = true
                    }
                  }
                }
              },
            },
          })

          if (modified)
            removeUnreferenced(program, alreadyUnreferenced)
        },
      },
    },
  }
}

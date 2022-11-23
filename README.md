# unplugin-strip-exports

[![Build Size](https://img.shields.io/bundlephobia/minzip/unplugin-strip-exports?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=unplugin-strip-exports)
[![Version](https://img.shields.io/npm/v/unplugin-strip-exports?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/unplugin-strip-exports)

[Markdoc](https://markdoc.io/) plugin for Vite/Webpack projects.

## Install

```bash
pnpm add @markdoc/markdoc unplugin-strip-exports
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import StripExports from 'unplugin-strip-exports/vite'

export default defineConfig({
  plugins: [
    StripExports({
      match() {
        return ['getServerSideProps']
      }
    }),
  ],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import StripExports from 'unplugin-strip-exports/rollup'

export default {
  plugins: [
    StripExports({
      match() {
        return ['getServerSideProps']
      }
    }),
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-strip-exports/webpack')({
      match() {
        return ['getServerSideProps']
      }
    })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    ['unplugin-strip-exports/nuxt', {
      match() {
        return ['getServerSideProps']
      }
    }],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-strip-exports/webpack')({
        match() {
          return ['getServerSideProps']
        }
      }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import StripExports from 'unplugin-strip-exports/esbuild'

build({
  plugins: [StripExports({
    match() {
      return ['getServerSideProps']
    }
  })],
})
```

<br></details>

Now if you have a `index.tsx`:

```tsx
import fs from 'fs'

export const getServerSideProps = () => {
  return {
    content: fs.readFileSync('./foo.txt', 'utf-8'),
  }
}

export default ({ content }) => {
  return <div>{content}</div>
}
```

The output will be:

```tsx
export default ({ content }) => {
  return <div>{content}</div>
}
```

## Advanced Usage

```ts
// vite.config.ts
import StripExports from 'unplugin-strip-exports/vite'

export default defineConfig({
  plugins: [
    StripExports({
      match(filepath, ssr) {
        // Ignore SSR build
        if (!ssr)
          return

        // Remove getServerSideProps in "pages" in browser build
        if (filepath.startsWith(pagesDir))
          return ['getServerSideProps']
      }
    }),
  ],
})
```

## License

MIT

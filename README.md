# unplugin-strip-exports

Remove specific named exports in your JavaScript code. Like `getServerSideProps` and `getStaticProps` of Next.js.

## Install

```bash
pnpm add unplugin-strip-exports -D
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
import { parseContent, sendMessage } from 'bar'

export const getServerSideProps = () => {
  return {
    content: parseContent(fs.readFileSync('./foo.txt', 'utf-8')),
  }
}

export default ({ content }) => {
  return <button onClick={sendMessage}>{content}</button>
}
```

The output will be:

```tsx
import { sendMessage } from 'bar'

export default ({ content }) => {
  return <button onClick={sendMessage}>{content}</button>
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
        if (ssr)
          return

        // Remove getServerSideProps in "pages" in browser build
        if (filepath.startsWith(pagesDir))
          return ['getServerSideProps']
      }
    }),
  ],
})
```

## Credits

This plugin is a essentially a copy of [babelTransformClientSidePages()](https://github.com/rakkasjs/rakkasjs/blob/main/packages/rakkasjs/src/features/run-server-side/implementation/transform/transform-client-page.ts) util function of [Rakkas](https://github.com/rakkasjs/rakkasjs).

## License

MIT

/**
 * Bakes the rendered app into dist/index.html.
 *
 * Runs after both Vite builds: the client build produces dist/index.html with
 * hashed asset links, the SSR build produces dist-ssr/entry-server.js. This
 * script renders the latter and injects the markup into the former, so the
 * deployed document ships real content instead of an empty root element.
 */
import { readFile, writeFile, rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = resolve(root, 'dist/index.html')
const ssrEntry = resolve(root, 'dist-ssr/entry-server.js')
const ROOT_PLACEHOLDER = '<div id="root"></div>'

/**
 * Framer Motion serializes entrance animations as `opacity:0` inline styles.
 * That is correct for JS visitors — it is what prevents a flash before the
 * animation runs — but it would leave a genuinely JS-disabled visitor staring
 * at a blank page. This rule only applies when scripting is off.
 */
const NOSCRIPT_FALLBACK = `<noscript><style>#root [style*="opacity:0"]{opacity:1!important;transform:none!important}</style></noscript>`

const { render } = await import(ssrEntry)
const appHtml = render()

if (!appHtml || appHtml.length < 1000) {
  throw new Error(
    `Prerender produced suspiciously little markup (${appHtml?.length ?? 0} chars). Aborting.`
  )
}

const template = await readFile(htmlPath, 'utf8')

if (!template.includes(ROOT_PLACEHOLDER)) {
  throw new Error(
    `Could not find ${ROOT_PLACEHOLDER} in dist/index.html — prerender injection point changed.`
  )
}

const html = template
  .replace('</head>', `  ${NOSCRIPT_FALLBACK}\n</head>`)
  .replace(ROOT_PLACEHOLDER, `<div id="root">${appHtml}</div>`)

await writeFile(htmlPath, html)
await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true })

console.log(
  `prerender: injected ${appHtml.length.toLocaleString()} chars into dist/index.html`
)

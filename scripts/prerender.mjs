/**
 * Bakes every route into its own static HTML document.
 *
 * Runs after both Vite builds: the client build produces dist/index.html with
 * hashed asset links (the template), the SSR build produces
 * dist-ssr/entry-server.js. For each route this renders the app and its
 * page-specific <head>, and writes dist/<path>/index.html — so `/es/` and
 * `/services/web-design/` are real files GitHub Pages can serve, with real
 * content for crawlers that never run JavaScript. It also writes the sitemap
 * (with hreflang alternates) and the 404 page.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const ssrEntry = resolve(root, 'dist-ssr/entry-server.js')

const ROOT_PLACEHOLDER = '<div id="root"></div>'
const HEAD_PLACEHOLDER = '<!--app-head-->'
const HTML_OPEN = '<html lang="en">'

/**
 * Framer Motion serializes entrance animations as `opacity:0` inline styles.
 * That is correct for JS visitors — it is what prevents a flash before the
 * animation runs — but it would leave a genuinely JS-disabled visitor staring
 * at a blank page. This rule only applies when scripting is off.
 */
const NOSCRIPT_FALLBACK = `<noscript><style>#root [style*="opacity:0"]{opacity:1!important;transform:none!important}</style></noscript>`

const { render, ROUTES, LANGS, pathIn, SITE_ORIGIN } = await import(ssrEntry)
const template = await readFile(resolve(dist, 'index.html'), 'utf8')

for (const marker of [ROOT_PLACEHOLDER, HEAD_PLACEHOLDER, HTML_OPEN]) {
  if (!template.includes(marker)) {
    throw new Error(`Template is missing ${marker} — injection point changed.`)
  }
}

async function bake(route, outFile) {
  const { html, head, lang } = await render(route)
  if (!html || html.length < 1000) {
    throw new Error(
      `Prerender of ${route.path} produced suspiciously little markup (${html?.length ?? 0} chars).`
    )
  }
  const doc = template
    .replace(HTML_OPEN, `<html lang="${lang}">`)
    .replace(HEAD_PLACEHOLDER, `${head}\n  ${NOSCRIPT_FALLBACK}`)
    .replace(ROOT_PLACEHOLDER, `<div id="root">${html}</div>`)
  await mkdir(dirname(outFile), { recursive: true })
  await writeFile(outFile, doc)
  return html.length
}

let total = 0
for (const route of ROUTES) {
  total += await bake(route, resolve(dist, `.${route.path}index.html`))
}

// GitHub Pages serves /404.html for any missing path, in either language.
await bake(
  { kind: 'notFound', lang: 'en', path: '/404.html' },
  resolve(dist, '404.html')
)

// ── Sitemap, with every page's language alternates ──────────────────────
const today = new Date().toISOString().slice(0, 10)
const priority = route =>
  route.kind === 'home' ? '1.0' : route.kind === 'services' ? '0.8' : '0.9'
const urls = ROUTES.map(route => {
  const alternates = [
    ...LANGS.map(
      lang =>
        `    <xhtml:link rel="alternate" hreflang="${lang}" href="${SITE_ORIGIN}${pathIn(route, lang)}" />`
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${pathIn(route, 'en')}" />`,
  ].join('\n')
  return `  <url>
    <loc>${SITE_ORIGIN}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority(route)}</priority>
${alternates}
  </url>`
}).join('\n')

await writeFile(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
)

await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true })

console.log(
  `prerender: ${ROUTES.length} pages + 404 (${total.toLocaleString()} chars), sitemap with ${ROUTES.length} URLs`
)

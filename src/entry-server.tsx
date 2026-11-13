// Build-time module, never hot-reloaded: it re-exports route data for the
// prerender script alongside the render function.
/* eslint-disable react-refresh/only-export-components */
import { renderToString } from 'react-dom/server'

import App from './App'
import { ThemeProvider } from './hooks/use-theme'
import i18n from './i18n'
import { ROUTES, SERVICE_KEYS, type Route } from './routes'
import { buildHead } from './seo/head'

import './index.css'

export { ROUTES, SERVICE_KEYS }
export { SITE_ORIGIN } from './lib/site'
export { pathIn, LANGS } from './routes'

/**
 * Renders one route to static markup at build time (see
 * `scripts/prerender.mjs`): the app HTML, the page-specific `<head>`, and the
 * document language. Every language and every service is its own document,
 * so crawlers that never run JavaScript still get the full page.
 */
export async function render(route: Route) {
  await i18n.changeLanguage(route.lang)
  const t = i18n.getFixedT(route.lang)

  const html = renderToString(
    <ThemeProvider>
      <App route={route} />
    </ThemeProvider>
  )

  return {
    html,
    head: buildHead(route, t),
    lang: route.lang === 'es' ? 'es' : 'en',
  }
}

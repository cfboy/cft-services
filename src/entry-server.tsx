import { renderToString } from 'react-dom/server'

import App from './App'
import { ThemeProvider } from './hooks/use-theme'

import './i18n'
import './index.css'

/**
 * Renders the site to static markup at build time (see `scripts/prerender.mjs`).
 *
 * The app is a client-rendered SPA on static hosting, so without this step the
 * shipped document is an empty `<div id="root">`: link unfurlers, text-only
 * crawlers, and AI answer engines see no headings, no copy, and no services.
 * Always the default language — Spanish is served from the same document and
 * swapped in the browser.
 */
export function render(): string {
  return renderToString(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

// Unregister any stale service workers (e.g. from a previous PWA setup)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(sw => sw.unregister())
  })
}

import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './hooks/use-theme.tsx'
import i18n from './i18n'
import { homePath, matchRoute } from './routes.ts'

// Spanish used to live at `/?lang=es`. Old links and bookmarks land on the
// Spanish home page instead of the English one.
const params = new URLSearchParams(window.location.search)
if (window.location.pathname === '/' && params.get('lang') === 'es') {
  window.location.replace(`${homePath('es')}${window.location.hash}`)
}

const route = matchRoute(window.location.pathname)
const container = document.getElementById('root')!

// Production pages get their <head> at build time. Two documents don't: the
// dev server's bare template, and the shared 404.html, which is served for a
// missing path in either language. Give those the right language and title.
if (import.meta.env.DEV || route.kind === 'notFound') {
  document.documentElement.lang = route.lang
  import('./seo/head').then(({ pageMeta }) => {
    document.title = pageMeta(route, i18n.t).title
  })
}

const app = (
  <StrictMode>
    <ThemeProvider>
      <App route={route} />
    </ThemeProvider>
  </StrictMode>
)

// Every real route is prerendered (scripts/prerender.mjs), so reuse that
// markup instead of painting twice. A 404 is served from one shared English
// 404.html whatever the language, so it renders fresh; in dev the root is
// empty and this is a plain client render too.
if (container.hasChildNodes() && route.kind !== 'notFound') {
  hydrateRoot(container, app)
} else {
  container.replaceChildren()
  createRoot(container).render(app)
}

import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

// Unregister any stale service workers (e.g. from a previous PWA setup)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(sw => sw.unregister())
  })
}

import './i18n'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './hooks/use-theme.tsx'

const container = document.getElementById('root')!

const app = (
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)

// Production builds are prerendered (scripts/prerender.mjs), so reuse that
// markup instead of throwing it away and painting twice. In dev the root is
// empty and this falls back to a plain client render.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)

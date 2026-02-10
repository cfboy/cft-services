import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

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

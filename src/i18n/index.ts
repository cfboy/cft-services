import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en.json'
import es from './es.json'
import servicesEn from './services.en.json'
import servicesEs from './services.es.json'

import { DEFAULT_LANG, LANGS, matchRoute } from '@/routes'

/**
 * The language comes from the URL — `/es/…` is Spanish, everything else is
 * English — never from the browser or a stored preference. Each language is a
 * separate prerendered document, so the server and the browser always agree
 * on what was rendered and hydration never has to throw the markup away.
 */
const initialLang =
  typeof window === 'undefined'
    ? DEFAULT_LANG
    : matchRoute(window.location.pathname).lang

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { ...en, servicePages: servicesEn } },
    es: { translation: { ...es, servicePages: servicesEs } },
  },
  lng: initialLang,
  supportedLngs: [...LANGS],
  fallbackLng: DEFAULT_LANG,
  // Resources are bundled, so initialise synchronously: the first render
  // already has the right strings.
  initAsync: false,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n

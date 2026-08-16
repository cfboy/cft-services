import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './en.json'
import es from './es.json'

export const SUPPORTED_LANGUAGES = ['en', 'es'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en'

/** Query parameter that makes a language choice linkable and indexable. */
export const LANGUAGE_PARAM = 'lang'

const isBrowser = typeof window !== 'undefined'

const instance = i18n.use(initReactI18next)

// The browser detector reads `navigator` and `document`; skip it during the
// prerender pass, which always renders the default language.
if (isBrowser) instance.use(LanguageDetector)

instance.init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  supportedLngs: [...SUPPORTED_LANGUAGES],
  fallbackLng: DEFAULT_LANGUAGE,
  lng: isBrowser ? undefined : DEFAULT_LANGUAGE,
  // Treat es-PR, es-MX, … as `es` rather than falling back to English.
  load: 'languageOnly',
  detection: {
    // Querystring first so a shared ?lang=es link always wins over a cached
    // preference — search engines and shared links must resolve predictably.
    order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
    lookupQuerystring: LANGUAGE_PARAM,
    caches: ['localStorage'],
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DEFAULT_LANGUAGE,
  LANGUAGE_PARAM,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from '@/i18n'

const SITE_ORIGIN = 'https://cftservicespr.com'

const OG_LOCALE: Record<SupportedLanguage, string> = {
  en: 'en_US',
  es: 'es_PR',
}

/** Canonical URL for a language — English lives at the bare root. */
function canonicalFor(lang: SupportedLanguage): string {
  return lang === DEFAULT_LANGUAGE
    ? `${SITE_ORIGIN}/`
    : `${SITE_ORIGIN}/?${LANGUAGE_PARAM}=${lang}`
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  )
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

function isSupported(lang: string): lang is SupportedLanguage {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(lang)
}

/**
 * Keeps the document's language signals in step with i18next.
 *
 * Without this the `<html lang>` attribute stays `en` forever: screen readers
 * announce Spanish copy with an English voice, and every crawler sees the page
 * as monolingual. It also normalizes `?lang=` so a Spanish session produces a
 * shareable, canonical URL that matches the hreflang alternates in index.html.
 */
export function useDocumentLanguage() {
  const { i18n } = useTranslation()
  const resolved = i18n.resolvedLanguage ?? DEFAULT_LANGUAGE
  const lang: SupportedLanguage = isSupported(resolved)
    ? resolved
    : DEFAULT_LANGUAGE

  useEffect(() => {
    document.documentElement.lang = lang

    const canonical = canonicalFor(lang)
    setCanonical(canonical)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:locale', OG_LOCALE[lang])
    setMeta(
      'property',
      'og:locale:alternate',
      OG_LOCALE[lang === 'en' ? 'es' : 'en']
    )

    // Reflect the active language in the address bar without adding history
    // entries, preserving any section hash the visitor is currently on.
    const url = new URL(window.location.href)
    if (lang === DEFAULT_LANGUAGE) url.searchParams.delete(LANGUAGE_PARAM)
    else url.searchParams.set(LANGUAGE_PARAM, lang)

    if (url.toString() !== window.location.href) {
      window.history.replaceState(null, '', url)
    }
  }, [lang])
}

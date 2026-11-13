/**
 * Every page the site ships, in both languages.
 *
 * The site is static: `scripts/prerender.mjs` renders each route below to its
 * own `index.html`, and the browser hydrates whichever document it was served.
 * There is no client router — links between pages are plain `<a href>`, which
 * is exactly what crawlers follow best.
 *
 * English lives at the root, Spanish under `/es/`. Slugs are written in the
 * language of the page so the URL itself matches what people search for.
 */

export const LANGS = ['en', 'es'] as const
export type Lang = (typeof LANGS)[number]
export const DEFAULT_LANG: Lang = 'en'

export const SERVICE_KEYS = [
  'websites',
  'webapps',
  'automation',
  'crm',
  'consulting',
  'events',
] as const
export type ServiceKey = (typeof SERVICE_KEYS)[number]

const SERVICE_SLUGS: Record<ServiceKey, Record<Lang, string>> = {
  websites: { en: 'web-design', es: 'diseno-de-paginas-web' },
  webapps: { en: 'web-app-development', es: 'desarrollo-de-aplicaciones-web' },
  automation: { en: 'business-automation', es: 'automatizacion-de-procesos' },
  crm: { en: 'crm-implementation', es: 'implementacion-de-crm' },
  consulting: { en: 'technology-consulting', es: 'consultoria-tecnologica' },
  events: { en: 'event-technology', es: 'tecnologia-para-eventos' },
}

const SERVICES_SEGMENT: Record<Lang, string> = {
  en: 'services',
  es: 'servicios',
}

export type Route =
  | { kind: 'home'; lang: Lang; path: string }
  | { kind: 'services'; lang: Lang; path: string }
  | { kind: 'service'; lang: Lang; path: string; service: ServiceKey }
  | { kind: 'notFound'; lang: Lang; path: string }

export function homePath(lang: Lang): string {
  return lang === DEFAULT_LANG ? '/' : `/${lang}/`
}

export function servicesPath(lang: Lang): string {
  return `${homePath(lang)}${SERVICES_SEGMENT[lang]}/`
}

export function servicePath(service: ServiceKey, lang: Lang): string {
  return `${servicesPath(lang)}${SERVICE_SLUGS[service][lang]}/`
}

function routesFor(lang: Lang): Route[] {
  return [
    { kind: 'home', lang, path: homePath(lang) },
    { kind: 'services', lang, path: servicesPath(lang) },
    ...SERVICE_KEYS.map(
      (service): Route => ({
        kind: 'service',
        lang,
        service,
        path: servicePath(service, lang),
      })
    ),
  ]
}

/** Every indexable route — the prerender and the sitemap both read this. */
export const ROUTES: Route[] = LANGS.flatMap(routesFor)

/** The same page in another language. */
export function pathIn(route: Route, lang: Lang): string {
  switch (route.kind) {
    case 'home':
    case 'notFound':
      return homePath(lang)
    case 'services':
      return servicesPath(lang)
    case 'service':
      return servicePath(route.service, lang)
  }
}

function normalise(pathname: string): string {
  const withSlash = pathname.endsWith('/') ? pathname : `${pathname}/`
  return withSlash.replace(/\/index\.html\/$/, '/').replace(/\/{2,}/g, '/')
}

/** Resolves a browser pathname to its route, or a 404 in the right language. */
export function matchRoute(pathname: string): Route {
  const path = normalise(pathname)
  const found = ROUTES.find(r => r.path === path)
  if (found) return found
  const lang: Lang = path.startsWith('/es/') ? 'es' : DEFAULT_LANG
  return { kind: 'notFound', lang, path }
}

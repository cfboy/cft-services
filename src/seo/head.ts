import type { TFunction } from 'i18next'

import { AREA_SERVED, CONTACT, SITE_NAME, SITE_ORIGIN } from '@/lib/site'
import {
  homePath,
  LANGS,
  pathIn,
  SERVICE_KEYS,
  servicePath,
  servicesPath,
  type Lang,
  type Route,
} from '@/routes'

/**
 * Builds the page-specific `<head>` for a route at prerender time: title,
 * description, canonical, hreflang alternates, Open Graph, Twitter and
 * JSON-LD. Everything shared by every page (charset, icons, fonts, theme
 * script) stays in `index.html`.
 */

const OG_LOCALE: Record<Lang, string> = { en: 'en_US', es: 'es_PR' }
const OG_IMAGE = `${SITE_ORIGIN}/og-image.png`
const ORG_ID = `${SITE_ORIGIN}/#organization`
const WEBSITE_ID = `${SITE_ORIGIN}/#website`

const abs = (path: string) => `${SITE_ORIGIN}${path}`

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

type Json = Record<string, unknown>

export type PageMeta = {
  title: string
  description: string
  canonical: string
  noindex: boolean
}

export function pageMeta(route: Route, t: TFunction): PageMeta {
  const canonical = abs(route.path)
  switch (route.kind) {
    case 'home':
      return {
        title: t('seo.home.title'),
        description: t('seo.home.description'),
        canonical,
        noindex: false,
      }
    case 'services':
      return {
        title: t('servicePages.hub.metaTitle'),
        description: t('servicePages.hub.metaDescription'),
        canonical,
        noindex: false,
      }
    case 'service':
      return {
        title: t(`servicePages.${route.service}.metaTitle`),
        description: t(`servicePages.${route.service}.metaDescription`),
        canonical,
        noindex: false,
      }
    case 'notFound':
      return {
        title: t('servicePages.notFound.metaTitle'),
        description: t('servicePages.notFound.metaDescription'),
        canonical: abs(homePath(route.lang)),
        noindex: true,
      }
  }
}

/* ── Structured data ─────────────────────────────────────────────────── */

function organization(t: TFunction, lang: Lang): Json {
  return {
    '@type': ['ProfessionalService', 'Organization'],
    '@id': ORG_ID,
    name: SITE_NAME,
    url: abs(homePath(lang)),
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_ORIGIN}/favicon-512.png`,
      width: 512,
      height: 512,
    },
    image: OG_IMAGE,
    description: t('seo.home.description'),
    slogan: t('footer.tagline'),
    email: CONTACT.email,
    telephone: '+1-787-218-2447',
    founder: { '@type': 'Person', name: 'Cristian F. Torres Collazo' },
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'PR',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Puerto Rico' },
      ...AREA_SERVED.map(name => ({
        '@type': 'City',
        name,
        containedInPlace: {
          '@type': 'AdministrativeArea',
          name: 'Puerto Rico',
        },
      })),
    ],
    knowsLanguage: ['es', 'en'],
    availableLanguage: ['es', 'en'],
    sameAs: [CONTACT.instagram],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t('servicePages.common.services'),
      itemListElement: SERVICE_KEYS.map(key => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: t(`servicePages.${key}.name`),
          url: abs(servicePath(key, lang)),
        },
      })),
    },
  }
}

function website(): Json {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_ORIGIN}/`,
    name: SITE_NAME,
    publisher: { '@id': ORG_ID },
    inLanguage: ['en', 'es'],
  }
}

function breadcrumbs(route: Route, t: TFunction): Json | null {
  if (route.kind !== 'services' && route.kind !== 'service') return null
  const items = [
    { name: t('servicePages.common.home'), path: homePath(route.lang) },
    { name: t('servicePages.common.services'), path: servicesPath(route.lang) },
  ]
  if (route.kind === 'service') {
    items.push({
      name: t(`servicePages.${route.service}.name`),
      path: route.path,
    })
  }
  return {
    '@type': 'BreadcrumbList',
    '@id': `${abs(route.path)}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  }
}

function graphFor(route: Route, t: TFunction, meta: PageMeta): Json[] {
  const url = abs(route.path)
  const crumbs = breadcrumbs(route, t)
  const nodes: Json[] = [organization(t, route.lang), website()]

  const webPage: Json = {
    '@type': route.kind === 'services' ? 'CollectionPage' : 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: route.lang === 'es' ? 'es-PR' : 'en-US',
    primaryImageOfPage: OG_IMAGE,
    ...(crumbs ? { breadcrumb: { '@id': crumbs['@id'] } } : {}),
    ...(route.kind === 'home' ? { about: { '@id': ORG_ID } } : {}),
  }
  nodes.push(webPage)
  if (crumbs) nodes.push(crumbs)

  if (route.kind === 'service') {
    const base = `servicePages.${route.service}`
    nodes.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: t(`${base}.h1`),
      serviceType: t(`${base}.name`),
      description: t(`${base}.lead`),
      url,
      provider: { '@id': ORG_ID },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Puerto Rico' },
        { '@type': 'City', name: 'San Juan' },
      ],
      availableLanguage: ['es', 'en'],
    })
    webPage.mainEntity = { '@id': `${url}#service` }

    const faqs = t(`${base}.faqs`, { returnObjects: true }) as Array<{
      q: string
      a: string
    }>
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  if (route.kind === 'services') {
    webPage.mainEntity = {
      '@type': 'ItemList',
      itemListElement: SERVICE_KEYS.map((key, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: t(`servicePages.${key}.name`),
        url: abs(servicePath(key, route.lang)),
      })),
    }
  }

  return nodes
}

/* ── Head markup ─────────────────────────────────────────────────────── */

export function buildHead(route: Route, t: TFunction): string {
  const meta = pageMeta(route, t)
  const other: Lang = route.lang === 'en' ? 'es' : 'en'
  const tags: string[] = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${
      meta.noindex
        ? 'noindex, follow'
        : 'index, follow, max-image-preview:large, max-snippet:-1'
    }" />`,
  ]

  if (!meta.noindex) {
    tags.push(`<link rel="canonical" href="${meta.canonical}" />`)
    for (const lang of LANGS) {
      tags.push(
        `<link rel="alternate" hreflang="${lang}" href="${abs(pathIn(route, lang))}" />`
      )
    }
    tags.push(
      `<link rel="alternate" hreflang="x-default" href="${abs(pathIn(route, 'en'))}" />`
    )
  }

  tags.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:url" content="${meta.canonical}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(meta.title)}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[route.lang]}" />`,
    `<meta property="og:locale:alternate" content="${OG_LOCALE[other]}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`
  )

  if (!meta.noindex) {
    const graph = {
      '@context': 'https://schema.org',
      '@graph': graphFor(route, t, meta),
    }
    // `<` is escaped so no string in the data can close the script element.
    const json = JSON.stringify(graph).replace(/</g, '\\u003c')
    tags.push(`<script type="application/ld+json">${json}</script>`)
  }

  return tags.map(tag => `  ${tag}`).join('\n')
}

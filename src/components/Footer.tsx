import { Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Logo } from '@/components/Logo'
import { useRoute, useSectionHref } from '@/hooks/use-route'
import { CONTACT } from '@/lib/site'
import {
  pathIn,
  SERVICE_KEYS,
  servicePath,
  servicesPath,
  type Lang,
} from '@/routes'

const NAV_LINKS = ['work', 'events', 'about', 'contact'] as const

const linkClass =
  'text-muted-foreground hover:text-foreground focus-visible:ring-ring w-fit rounded-sm text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none'

const headingClass =
  'font-display text-foreground text-sm font-semibold tracking-wider uppercase'

export function Footer() {
  const { t } = useTranslation()
  const route = useRoute()
  const sectionHref = useSectionHref()
  const year = new Date().getFullYear()
  const otherLang: Lang = route.lang === 'en' ? 'es' : 'en'

  // Contact is in-page on every page that has the contact section.
  const navHref = (key: (typeof NAV_LINKS)[number]) =>
    key === 'contact' && route.kind !== 'notFound'
      ? '#contact'
      : sectionHref(key)

  return (
    <footer className="border-border bg-muted/30 border-t px-4">
      <div className="mx-auto max-w-6xl py-14">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
            <Logo className="h-9" />
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="me noopener noreferrer"
              aria-label={t('a11y.instagram')}
              className="text-muted-foreground hover:text-foreground focus-visible:ring-ring -ml-1 w-fit rounded-md p-1 transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <Instagram aria-hidden="true" className="h-5 w-5" />
            </a>
          </div>

          {/* Services — every page links to every service page */}
          <div className="flex flex-col gap-4">
            <a href={servicesPath(route.lang)} className={headingClass}>
              {t('footer.services')}
            </a>
            <ul className="flex flex-col gap-2">
              {SERVICE_KEYS.map(key => (
                <li key={key}>
                  <a href={servicePath(key, route.lang)} className={linkClass}>
                    {t(`servicePages.${key}.name`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <span className={headingClass}>{t('footer.navigation')}</span>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map(key => (
                <li key={key}>
                  <a href={navHref(key)} className={linkClass}>
                    {t(`nav.${key}`)}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={pathIn(route, otherLang)}
                  hrefLang={otherLang}
                  lang={otherLang}
                  className={linkClass}
                >
                  {t('a11y.languageName')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact — NAP, identical to the structured data */}
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
            <span className={headingClass}>{t('footer.contact')}</span>
            <address className="flex flex-col gap-3 not-italic">
              <a
                href={`tel:${CONTACT.phoneE164}`}
                className={`${linkClass} flex items-center gap-2`}
              >
                <Phone aria-hidden="true" className="h-4 w-4 shrink-0" />
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className={`${linkClass} flex items-center gap-2`}
              >
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span className="break-all">{CONTACT.email}</span>
              </a>
              <span className="text-muted-foreground flex items-center gap-2 text-sm">
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
                {t('footer.location')}
              </span>
            </address>
          </div>
        </div>

        {/* Bottom bar. Privacy and Terms links are intentionally absent until
            the pages exist — a dead link is not a placeholder. */}
        <div className="border-border mt-12 flex flex-col justify-between gap-3 border-t pt-6 sm:flex-row">
          <span className="text-muted-foreground text-sm">
            &copy; {year} CFT Services. {t('footer.rights')}
          </span>
          <a href={navHref('contact')} className={linkClass}>
            {t('footer.startProject')}
          </a>
        </div>
      </div>
    </footer>
  )
}

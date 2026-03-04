import { Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Logo } from '@/components/Logo'

const NAV_LINKS = ['services', 'work', 'about', 'contact'] as const
const INSTAGRAM_URL = 'https://www.instagram.com/cftservicespr'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-border bg-muted/30 border-t">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {/* Brand */}
          <div className="col-span-2 flex flex-col items-center gap-4 sm:col-span-1 sm:items-start">
            <Logo className="h-12" />
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-foreground w-fit transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <span className="text-foreground text-sm font-semibold tracking-wider uppercase">
              {t('footer.navigation')}
            </span>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map(key => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {t(`nav.${key}`)}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <span className="text-foreground text-sm font-semibold tracking-wider uppercase">
              {t('footer.contact')}
            </span>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+17872182447"
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                787-218-2447
              </a>
              <a
                href="mailto:cristianf.torres15@gmail.com"
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span className="break-all">cristianf.torres15@gmail.com</span>
              </a>
              <span className="text-muted-foreground flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 shrink-0" />
                {t('footer.location')}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-border mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row">
          <span className="text-muted-foreground text-sm">
            &copy; {year} CFT Services. {t('footer.rights')}
          </span>
          <div className="flex gap-5 text-sm">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('footer.privacy')}
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

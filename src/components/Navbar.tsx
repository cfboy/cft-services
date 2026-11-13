import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Logo } from '@/components/Logo'
import { Button, buttonVariants } from '@/components/ui/button'
import { useActiveSection } from '@/hooks/use-active-section'
import { useRoute } from '@/hooks/use-route'
import { useTheme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'
import { homePath, pathIn, servicesPath, type Lang } from '@/routes'

/** Home-page section ids in document order — links and scroll spy. */
const SECTIONS = [
  'home',
  'work',
  'services',
  'events',
  'about',
  'contact',
] as const
type SectionId = (typeof SECTIONS)[number]

/** Fixed navbar height (h-20), matched by `scroll-margin-top` in index.css. */
const NAV_HEIGHT = 80

const linkBase =
  'focus-visible:ring-ring relative rounded-lg text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'

export function Navbar() {
  const { t } = useTranslation()
  const route = useRoute()
  const { resolvedTheme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const prefersReduced = useReducedMotion()
  const spied = useActiveSection(SECTIONS, NAV_HEIGHT + 16)
  const menuId = useId()
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const isHome = route.kind === 'home'
  const hasContact = route.kind !== 'notFound'
  const home = homePath(route.lang)
  const otherLang: Lang = route.lang === 'en' ? 'es' : 'en'

  // Where each link goes from the current page. On the home page everything
  // is an in-page fragment; elsewhere "Services" goes to the services hub and
  // the rest go back to their home-page section.
  const hrefFor = (id: SectionId): string => {
    if (isHome) return `#${id}`
    if (id === 'home') return home
    if (id === 'services') return servicesPath(route.lang)
    if (id === 'contact' && hasContact) return '#contact'
    return `${home}#${id}`
  }

  const activeId: SectionId | null = isHome
    ? (spied as SectionId)
    : route.kind === 'services' || route.kind === 'service'
      ? 'services'
      : null

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  // Dismiss the mobile menu on Escape or an outside click, and return focus to
  // the control that opened it.
  useEffect(() => {
    if (!mobileOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMobileOpen(false)
      toggleRef.current?.focus()
    }
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (menuRef.current?.contains(target)) return
      if (toggleRef.current?.contains(target)) return
      setMobileOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [mobileOpen])

  /** In-page fragments scroll smoothly; real page links navigate normally. */
  const onNavigate = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    wasInMenu: boolean
  ) => {
    setMobileOpen(false)
    if (!href.startsWith('#')) return
    const target = document.getElementById(href.slice(1))
    if (!target) return
    e.preventDefault()

    const scroll = () => {
      target.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start',
      })
      // Keep the URL shareable without pushing a history entry per click.
      window.history.replaceState(null, '', href === '#home' ? home : href)
    }
    // Let the menu finish collapsing so the target lands at the right offset.
    if (wasInMenu) window.setTimeout(scroll, 220)
    else scroll()
  }

  const navLinks = SECTIONS.map(id => ({
    id,
    href: hrefFor(id),
    label: t(`nav.${id}`),
  }))

  // Deliberately theme-neutral: any rendered output derived from
  // resolvedTheme mismatches the prerendered (always light) markup.
  const themeLabel = t('a11y.toggleTheme')

  // The language switch is a real link to the same page in the other
  // language — crawlable, shareable, and it works without JavaScript.
  const languageLink = (
    <a
      href={pathIn(route, otherLang)}
      hrefLang={otherLang}
      lang={otherLang}
      aria-label={t('a11y.switchLanguage')}
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'sm' }),
        'px-2.5 font-mono text-xs tracking-wide uppercase'
      )}
    >
      {otherLang}
    </a>
  )

  const themeButton = (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={themeLabel}
    >
      <Moon aria-hidden="true" className="block h-4 w-4 dark:hidden" />
      <Sun aria-hidden="true" className="hidden h-4 w-4 dark:block" />
    </Button>
  )

  return (
    <motion.nav
      initial={{ y: prefersReduced ? 0 : -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label={t('a11y.mainNavigation')}
      className="border-border/50 bg-background/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md"
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href={isHome ? '#home' : home}
          onClick={e => onNavigate(e, isHome ? '#home' : home, false)}
          className="focus-visible:ring-ring flex items-center rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Logo className="h-7 sm:h-8" />
          <span className="sr-only">{t('a11y.homeLink')}</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => {
            const isActive = activeId === link.id
            return (
              <a
                key={link.id}
                href={link.href}
                aria-current={
                  isActive
                    ? route.kind === 'services'
                      ? 'page'
                      : 'true'
                    : undefined
                }
                onClick={e => onNavigate(e, link.href, false)}
                className={cn(
                  linkBase,
                  'px-3 py-2',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden="true"
                    className="bg-cft-mint-ink absolute inset-x-3 -bottom-px h-0.5 rounded-full"
                    transition={
                      prefersReduced
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 380, damping: 32 }
                    }
                  />
                )}
              </a>
            )
          })}
          <div className="ml-2 flex items-center gap-1">
            {languageLink}
            {themeButton}
            <a
              href={hrefFor('contact')}
              onClick={e => onNavigate(e, hrefFor('contact'), false)}
              className={cn(
                buttonVariants({ size: 'sm' }),
                'ml-2 hidden px-4 lg:inline-flex'
              )}
            >
              {t('nav.cta')}
            </a>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          {languageLink}
          {themeButton}
          <Button
            ref={toggleRef}
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(open => !open)}
            aria-label={mobileOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
            aria-expanded={mobileOpen}
            aria-controls={menuId}
          >
            {mobileOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id={menuId}
            ref={menuRef}
            initial={{ opacity: 0, height: prefersReduced ? 'auto' : 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: prefersReduced ? 'auto' : 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="border-border/50 bg-background/95 overflow-hidden border-t backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {navLinks.map(link => {
                const isActive = activeId === link.id
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={e => onNavigate(e, link.href, true)}
                    className={cn(
                      linkBase,
                      'px-3 py-2.5',
                      isActive
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Moon, Sun, Globe, Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { useActiveSection } from '@/hooks/use-active-section'
import { useTheme } from '@/hooks/use-theme'

/** Section ids in document order — drives both the links and the scroll spy. */
const SECTIONS = [
  'home',
  'services',
  'events',
  'about',
  'work',
  'contact',
] as const

/** Fixed navbar height (h-20), matched by `scroll-margin-top` in index.css. */
const NAV_HEIGHT = 80

export function Navbar() {
  const { t, i18n } = useTranslation()
  const { resolvedTheme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const prefersReduced = useReducedMotion()
  const activeSection = useActiveSection(SECTIONS, NAV_HEIGHT + 16)
  const menuId = useId()
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const isSpanish = i18n.resolvedLanguage === 'es'

  const toggleLang = () => {
    i18n.changeLanguage(isSpanish ? 'en' : 'es')
  }

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

  const goToSection = (href: string, wasInMenu: boolean) => {
    const id = href.replace('#', '')
    setMobileOpen(false)

    const scroll = () => {
      const target = document.getElementById(id)
      if (!target) return
      target.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start',
      })
      // Keep the URL shareable without pushing a history entry per click.
      window.history.replaceState(null, '', href)
    }

    // Let the menu finish collapsing so the target lands at the right offset.
    if (wasInMenu) window.setTimeout(scroll, 220)
    else scroll()
  }

  const navLinks = SECTIONS.map(id => ({
    href: `#${id}`,
    id,
    label: t(`nav.${id}`),
  }))

  const languageLabel = isSpanish
    ? t('a11y.switchToEnglish')
    : t('a11y.switchToSpanish')
  // Deliberately theme-neutral: any rendered output derived from
  // resolvedTheme mismatches the prerendered (always light) markup on
  // hydration. The icon communicates the target state visually instead.
  const themeLabel = t('a11y.toggleTheme')

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
          href="#home"
          onClick={e => {
            e.preventDefault()
            goToSection('#home', false)
          }}
          className="focus-visible:ring-ring flex items-center rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Logo className="h-11 sm:h-12" />
          <span className="sr-only">{t('a11y.homeLink')}</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                onClick={e => {
                  e.preventDefault()
                  goToSection(link.href, false)
                }}
                className={`focus-visible:ring-ring relative rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden="true"
                    className="bg-cft-teal-primary absolute inset-x-3 -bottom-px h-0.5 rounded-full"
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
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLang}
              aria-label={languageLabel}
            >
              <Globe aria-hidden="true" className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={themeLabel}
            >
              <Moon aria-hidden="true" className="block h-4 w-4 dark:hidden" />
              <Sun aria-hidden="true" className="hidden h-4 w-4 dark:block" />
            </Button>
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-1 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLang}
            aria-label={languageLabel}
          >
            <Globe aria-hidden="true" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={themeLabel}
          >
            <Moon aria-hidden="true" className="block h-4 w-4 dark:hidden" />
            <Sun aria-hidden="true" className="hidden h-4 w-4 dark:block" />
          </Button>
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
                const isActive = activeSection === link.id
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={e => {
                      e.preventDefault()
                      goToSection(link.href, true)
                    }}
                    className={`focus-visible:ring-ring rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
                      isActive
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
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

import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Globe, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'

export function Navbar() {
  const { t, i18n } = useTranslation()
  const { resolvedTheme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#services', label: t('nav.services') },
    { href: '#about', label: t('nav.about') },
    { href: '#work', label: t('nav.work') },
    { href: '#contact', label: t('nav.contact') },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-border/50 bg-background/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md"
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="flex items-center">
          <Logo className="h-20" />
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="ml-2 flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLang}
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-1 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLang}
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-border/50 bg-background/95 overflow-hidden border-t backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-muted-foreground hover:text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

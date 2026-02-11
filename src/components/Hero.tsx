import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import patternBgDark from '@/assets/pattern-bg-dark.svg'
import patternBg from '@/assets/pattern-bg.svg'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'

export function Hero() {
  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
    >
      <img
        key={resolvedTheme}
        src={resolvedTheme === 'dark' ? patternBgDark : patternBg}
        className="absolute inset-0 h-full w-full object-cover"
        alt=""
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-cft-teal-primary mx-auto mb-10 max-w-xl text-lg"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <a href="#contact">
            <Button size="lg" className="group">
              {t('hero.cta')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
          <a href="#services">
            <Button variant="outline" size="lg">
              {t('hero.secondary')}
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="text-cft-teal-primary/60 h-5 w-5" />
        </motion.div>
      </motion.a>
    </section>
  )
}

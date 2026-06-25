import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'

export function Hero() {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()
  const identity = t('hero.identity', { returnObjects: true }) as Array<{
    label: string
    sub: string
  }>

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-4"
      aria-label="Hero"
    >
      {/* Structured editorial background — hairline grid + directional gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, var(--color-background) 0%, var(--color-muted) 100%),
            linear-gradient(var(--color-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: 'auto, 64px 64px, 64px 64px',
          backgroundBlendMode: 'normal, multiply, multiply',
          opacity: 1,
        }}
      />
      {/* Subtle top fade to keep navbar clean */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to bottom, var(--color-background), transparent)',
        }}
      />

      {/* Asymmetric content — left-weighted at lg */}
      <div className="relative z-10 mx-auto w-full max-w-6xl py-32 lg:flex lg:min-h-screen lg:items-center lg:py-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Left column — headline + CTAs */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-cft-teal-primary mb-6 inline-block font-sans text-xs font-semibold tracking-[0.18em] uppercase"
            >
              CFT Services
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-foreground mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-muted-foreground mb-10 max-w-lg font-sans text-base leading-relaxed sm:text-lg"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a href="#contact">
                <Button size="lg" className="group w-full sm:w-auto">
                  {t('hero.cta')}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </a>
              <a href="#services">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {t('hero.secondary')}
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right column — structured editorial accent (desktop only) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-end"
            aria-hidden="true"
          >
            <div className="relative w-full max-w-sm">
              {/* Vertical fine rule */}
              <div className="bg-border/60 absolute top-0 -left-8 h-full w-px" />

              {/* Structural stat / identity block */}
              <div className="space-y-8 pl-8">
                {identity.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: prefersReduced ? 0 : 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                    className="border-border/40 border-b pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-foreground/25 text-sm font-semibold tabular-nums">
                        {String(i + 1).padStart(2, '0')} /
                      </span>
                      <span className="font-display text-foreground text-base font-semibold">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1 pl-10 font-sans text-xs">
                      {item.sub}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#services"
        aria-label="Scroll to services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={prefersReduced ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown
            aria-hidden="true"
            className="text-cft-teal-primary/60 h-5 w-5"
          />
        </motion.div>
      </motion.a>
    </section>
  )
}

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/** Fades the hairline grid out toward the edges so it reads as texture. */
const GRID_MASK =
  'radial-gradient(ellipse 85% 65% at 50% 40%, black 25%, transparent 100%)'

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
      className="relative flex min-h-svh items-center overflow-hidden px-4"
      aria-labelledby="hero-title"
    >
      {/* Structured editorial background — directional wash, then hairline grid.
          The grid sits *above* the wash; layering it underneath (as an opaque
          background layer) hides it entirely. */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to bottom, var(--color-background) 0%, var(--color-muted) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: GRID_MASK,
          WebkitMaskImage: GRID_MASK,
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
      <div className="relative z-10 mx-auto w-full max-w-6xl py-32 lg:flex lg:min-h-svh lg:items-center lg:py-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Left column — headline + CTAs */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-cft-mint-ink mb-6 inline-block font-mono text-xs font-normal tracking-[0.2em] uppercase"
            >
              CFT Services
            </motion.span>

            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-foreground mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {t('hero.title')}
              {/* The brand's signature: the mint cursor, ready to build. */}
              <span aria-hidden="true" className="cft-cursor" />
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
              {/* Styled anchors, not buttons wrapped in anchors: nesting
                  interactive elements is invalid HTML and gives assistive tech
                  two conflicting controls for one action. */}
              <a
                href="#contact"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'group w-full sm:w-auto'
                )}
              >
                {t('hero.cta')}
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="#services"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'w-full sm:w-auto'
                )}
              >
                {t('hero.secondary')}
              </a>
            </motion.div>
          </div>

          {/* Right column — the two business lines, stated structurally.
              Real content, not decoration: it is the only place above the fold
              that names the experiential line, so it stays in the a11y tree. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm">
              {/* Vertical fine rule */}
              <div
                aria-hidden="true"
                className="bg-border/60 absolute top-0 -left-8 h-full w-px"
              />

              <ul className="space-y-8 pl-8">
                {identity.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: prefersReduced ? 0 : 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                    className="border-border/40 border-b pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        aria-hidden="true"
                        className="text-foreground/50 font-mono text-xs tabular-nums"
                      >
                        {String(i + 1).padStart(2, '0')} /
                      </span>
                      <span className="font-display text-foreground text-base font-semibold">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1 pl-10 font-sans text-xs">
                      {item.sub}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#services"
        aria-label={t('a11y.scrollToServices')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="focus-visible:ring-ring absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full p-3 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <motion.span
          className="block"
          animate={prefersReduced ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown
            aria-hidden="true"
            className="text-cft-mint-ink/70 h-5 w-5"
          />
        </motion.span>
      </motion.a>
    </section>
  )
}

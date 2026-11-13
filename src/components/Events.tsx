import { useReducedMotion, motion } from 'framer-motion'
import { Gamepad2, MonitorPlay, UserPlus, ClipboardCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { KioskMockup } from '@/components/events/KioskMockup'

// ---------------------------------------------------------------------------
// Register B — Events section
// Always-dark band (#0A1628 base), dark in BOTH light and dark themes.
// Text uses explicit light-foreground values (white/slate) — never semantic
// `text-foreground` which inverts in light mode.
// ---------------------------------------------------------------------------

const CAPABILITIES = [
  {
    key: 'kiosk' as const,
    icon: Gamepad2,
  },
  {
    key: 'signage' as const,
    icon: MonitorPlay,
  },
  {
    key: 'leads' as const,
    icon: UserPlus,
  },
  {
    key: 'checkin' as const,
    icon: ClipboardCheck,
  },
]

export function Events() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="events"
      aria-labelledby="events-title"
      className="relative overflow-hidden px-4 py-24 sm:py-32"
      style={{
        background:
          'radial-gradient(ellipse at 50% 10%, #0E2440 0%, #0A1628 55%, #050B16 100%)',
      }}
    >
      {/* Noise texture overlay — decorative, aria-hidden */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '200px',
        }}
      />

      {/* Vignette layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Brand mint glow — subtle ambient at center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 60% 50%, rgba(32,227,178,0.07) 0%, transparent 55%)',
        }}
      />

      {/* Content — relative z-10 to sit above decorative layers */}
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── Main content: asymmetric text-left + mockup-right layout ── */}
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-12">
          {/* ── Left column: copy + capabilities ── */}
          <div className="flex-1 lg:max-w-[55%]">
            {/* Eyebrow */}
            <motion.span
              className="mb-4 inline-block font-mono text-xs font-normal tracking-[0.2em] uppercase"
              style={{ color: '#20E3B2' }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.4, ease: 'easeOut' }
              }
            >
              {t('events.eyebrow')}
            </motion.span>

            {/* Headline — solid type; brand v2 has one accent and no gradients */}
            <motion.h2
              id="events-title"
              className="font-display mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]"
              style={
                {
                  color: 'rgba(255,255,255,0.95)',
                  textWrap: 'balance',
                } as React.CSSProperties
              }
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.5, delay: 0.08, ease: 'easeOut' }
              }
            >
              {t('events.title')}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="mb-10 max-w-[54ch] font-sans text-base leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.70)' }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.5, delay: 0.14, ease: 'easeOut' }
              }
            >
              {t('events.subtitle')}
            </motion.p>

            {/* Capabilities — a ruled 2-up list. Depth in this band comes
                from the background layers and the kiosk, not from a grid of
                glass cards. */}
            <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {CAPABILITIES.map(({ key, icon: Icon }, i) => (
                <motion.li
                  key={key}
                  className="flex gap-4 py-5"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.5,
                          delay: 0.18 + i * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }
                  }
                >
                  <Icon
                    className="mt-0.5 size-5 shrink-0"
                    style={{ color: '#20E3B2' }}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <div>
                    <h3
                      className="font-display mb-1.5 font-semibold"
                      style={{ color: 'rgba(255,255,255,0.92)' }}
                    >
                      {t(`events.capabilities.${key}.title`)}
                    </h3>
                    <p
                      className="font-sans text-sm leading-relaxed"
                      style={{ color: 'rgba(255,255,255,0.66)' }}
                    >
                      {t(`events.capabilities.${key}.description`)}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Context strip */}
            <motion.p
              className="mt-8 font-mono text-xs tracking-[0.2em] uppercase"
              style={{ color: 'rgba(255,255,255,0.45)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.6, delay: 0.55, ease: 'easeOut' }
              }
            >
              {t('events.contextStrip')}
            </motion.p>
          </div>

          {/* ── Right column: KioskMockup visual ── */}
          <motion.div
            className="flex w-full items-center justify-center lg:w-auto lg:flex-shrink-0 lg:justify-end"
            style={{ perspective: '900px' }}
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.2, ease: 'easeOut' }
            }
          >
            <KioskMockup className="w-full max-w-[300px] lg:max-w-[340px]" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

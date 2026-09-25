import { useReducedMotion, motion } from 'framer-motion'
import {
  ArrowRight,
  Gamepad2,
  MonitorPlay,
  UserPlus,
  ClipboardCheck,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { preselectContactTopic } from '@/components/Contact'
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
      // `events-band` (index.css) owns the background so dark mode can sink it
      // below the Night page surface and keep the register shift visible.
      className="events-band relative overflow-hidden px-4 py-24 sm:py-32"
    >
      {/* Threshold — a hairline of mint marks the step onto the event floor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(32,227,178,0.35) 50%, transparent)',
        }}
      />
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
              className="font-display mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
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

            {/* Capabilities grid — 2×2 on sm+, stacked on mobile */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {CAPABILITIES.map(({ key, icon: Icon }, i) => (
                <motion.div
                  key={key}
                  className="rounded-lg p-5"
                  style={{
                    background: 'rgba(14, 36, 64, 0.75)',
                    border: '1px solid rgba(32,227,178,0.18)',
                    backdropFilter: 'blur(8px)',
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.4,
                          delay: 0.18 + i * 0.08,
                          ease: 'easeOut',
                        }
                  }
                >
                  <Icon
                    className="mb-3 size-5"
                    style={{ color: '#20E3B2' }}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3
                    className="font-display mb-1.5 font-semibold"
                    style={{ color: 'rgba(255,255,255,0.90)' }}
                  >
                    {t(`events.capabilities.${key}.title`)}
                  </h3>
                  <p
                    className="font-sans text-sm leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.60)' }}
                  >
                    {t(`events.capabilities.${key}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Conversion — the organizer's next step, preselecting the topic */}
            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.5, delay: 0.45, ease: 'easeOut' }
              }
            >
              <a
                href="#contact"
                onClick={() => preselectContactTopic('events')}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#20E3B2] px-7 text-base font-medium text-[#0A1628] transition-colors hover:bg-[#20E3B2]/90 focus-visible:ring-2 focus-visible:ring-[#20E3B2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628] focus-visible:outline-none"
              >
                {t('events.cta')}
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </a>
              <p
                className="max-w-[30ch] font-sans text-sm leading-snug"
                style={{ color: 'rgba(255,255,255,0.70)' }}
              >
                {t('events.ctaNote')}
              </p>
            </motion.div>

            {/* Context strip */}
            <motion.p
              className="mt-8 font-mono text-xs tracking-[0.2em] uppercase"
              style={{ color: 'rgba(255,255,255,0.62)' }}
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

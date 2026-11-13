import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { buttonVariants } from '@/components/ui/button'
import { BrowserFrame } from '@/components/work/BrowserFrame'
import { heroStack, shotSizes } from '@/components/work/projects'
import { cn } from '@/lib/utils'

/** ease-out-quint */
const EASE = [0.22, 1, 0.36, 1] as const

// Clients only — Fudis is our own product, so it is not "shipped for" anyone.
const CLIENTS = [
  'Masterspace',
  'Clínica Dorsal',
  'MAC Educando',
  'Clínica Libélula',
  'Titi Amanda',
] as const

/**
 * Resting pose for each capture, back to front. The stack is the hero's
 * imagery: three live client sites, so the first thing a visitor sees is
 * shipped work rather than a decorative shape.
 */
const POSES = [
  { x: '-15%', y: '-17%', rotate: -5, depth: 0.4 },
  { x: '1%', y: '-2%', rotate: -1.5, depth: 0.7 },
  { x: '15%', y: '15%', rotate: 2.5, depth: 1 },
] as const

function StackCard({
  index,
  host,
  shot,
  px,
  py,
}: {
  index: number
  host: string
  shot: (typeof heroStack)[number]['shot']
  px: MotionValue<number>
  py: MotionValue<number>
}) {
  const prefersReduced = useReducedMotion()
  const pose = POSES[index]
  // Nearer cards travel further with the pointer — cheap, convincing depth.
  const tx = useTransform(px, v => v * 18 * pose.depth)
  const ty = useTransform(py, v => v * 14 * pose.depth)

  return (
    // Three layers, one transform each: parallax → centring → entrance.
    // Framer owns `transform` on the motion layers, so the centring
    // translate lives on a plain element between them.
    <motion.div
      className="absolute w-[70%]"
      style={{
        left: `calc(50% + ${pose.x})`,
        top: `calc(50% + ${pose.y})`,
        x: tx,
        y: ty,
        zIndex: index + 1,
      }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={
            prefersReduced
              ? false
              : { opacity: 0, y: 60, rotate: 0, scale: 0.94 }
          }
          animate={{ opacity: 1, y: 0, rotate: pose.rotate, scale: 1 }}
          transition={{
            duration: 1.1,
            delay: 0.35 + index * 0.12,
            ease: EASE,
          }}
        >
          <BrowserFrame
            host={host}
            shot={shot}
            sizes={shotSizes.hero}
            loading="eager"
            className="shadow-[0_30px_60px_-30px_rgb(10_22_40/0.35)]"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export function Hero() {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)

  // Pointer position over the stage, normalised to -1…1 and spring-smoothed.
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const px = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.6 })
  const py = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.6 })

  const onPointerMove = (e: React.PointerEvent) => {
    if (prefersReduced || e.pointerType !== 'mouse') return
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }
  const onPointerLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  const reveal = (delay: number, y = 24) => ({
    initial: prefersReduced ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  })

  return (
    <section
      id="home"
      className="relative overflow-hidden px-4"
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="relative mx-auto grid min-h-svh max-w-6xl grid-cols-1 content-center gap-14 pt-32 pb-16 lg:grid-cols-12 lg:gap-8 lg:pt-24">
        {/* Copy */}
        <div className="lg:col-span-6 lg:self-center">
          <motion.h1
            id="hero-title"
            {...reveal(0.1, 32)}
            className="font-display text-foreground text-[clamp(2.5rem,5.6vw,4.25rem)] leading-[1.02] font-bold tracking-[-0.035em] text-balance"
          >
            {t('hero.title')}
            {/* The brand's signature: the mint cursor, ready to build. */}
            <span aria-hidden="true" className="cft-cursor" />
          </motion.h1>

          <motion.p
            {...reveal(0.25)}
            className="text-muted-foreground mt-7 max-w-[46ch] text-lg leading-relaxed text-pretty"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            {...reveal(0.4, 16)}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            {/* Styled anchors, not buttons wrapped in anchors. */}
            <a
              href="#contact"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'group w-full px-7 sm:w-auto'
              )}
            >
              {t('hero.cta')}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#work"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'lg' }),
                'text-foreground w-full px-5 sm:w-auto'
              )}
            >
              <span className="decoration-cft-mint-ink underline decoration-2 underline-offset-[6px]">
                {t('hero.secondary')}
              </span>
            </a>
          </motion.div>
        </div>

        {/* Live-work stack */}
        <div
          ref={stageRef}
          role="img"
          aria-label={t('hero.stackLabel')}
          className="relative aspect-[5/4] w-full lg:col-span-6 lg:aspect-auto lg:h-[min(62vh,560px)]"
        >
          {heroStack.map((item, i) => (
            <StackCard
              key={item.key}
              index={i}
              host={item.host}
              shot={item.shot}
              px={px}
              py={py}
            />
          ))}
        </div>

        {/* Client line — proof, set as type rather than a logo wall */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="border-border/70 border-t pt-6 lg:col-span-12 lg:mt-6"
        >
          <p className="text-muted-foreground flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm">
            <span className="text-foreground/70 font-mono text-xs">
              {t('hero.clientsLabel')}
            </span>
            {CLIENTS.map(name => (
              <span
                key={name}
                className="font-display text-foreground/80 text-base font-semibold tracking-tight"
              >
                {name}
              </span>
            ))}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

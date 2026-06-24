import { useReducedMotion, motion } from 'framer-motion'

import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Floating particle — a single glowing dot drifting across the bezel screen
// ---------------------------------------------------------------------------

interface ParticleProps {
  x: number
  y: number
  size: number
  duration: number
  delay: number
  teal: boolean
  reduced: boolean
}

function GlowParticle({
  x,
  y,
  size,
  duration,
  delay,
  teal,
  reduced,
}: ParticleProps) {
  const color = teal
    ? 'rgba(32, 227, 178, 0.7)' // events-glow (#20E3B2)
    : 'rgba(27, 107, 147, 0.5)' // cft-navy-medium (#1B6B93)

  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: color,
        boxShadow: teal
          ? `0 0 ${size * 3}px rgba(32,227,178,0.5)`
          : `0 0 ${size * 2}px rgba(27,107,147,0.3)`,
      }}
      initial={{ opacity: 0, y: 0 }}
      animate={
        reduced
          ? { opacity: 0.4 }
          : {
              opacity: [0, 0.7, 0.4, 0.8, 0],
              y: [0, -18, -6, -22, -30],
            }
      }
      transition={
        reduced
          ? {}
          : {
              duration,
              delay,
              repeat: Infinity,
              repeatDelay: duration * 0.3,
              ease: 'easeInOut',
            }
      }
    />
  )
}

// ---------------------------------------------------------------------------
// Pick tile — a single game card in the faux touchscreen grid
// ---------------------------------------------------------------------------

interface TileProps {
  index: number
  reduced: boolean
}

const TILE_SYMBOLS = ['★', '◆', '✦', '●', '▲', '◉']
const TILE_STATES: Array<'idle' | 'glow' | 'win'> = [
  'idle',
  'glow',
  'idle',
  'win',
  'idle',
  'idle',
]

function PickTile({ index, reduced }: TileProps) {
  const symbol = TILE_SYMBOLS[index % TILE_SYMBOLS.length]
  const state = TILE_STATES[index % TILE_STATES.length]

  const isWin = state === 'win'
  const isGlow = state === 'glow'

  return (
    <motion.div
      className={cn(
        'relative flex aspect-square items-center justify-center rounded-md select-none',
        'font-display text-base font-semibold sm:text-lg'
        // Base surface: events-bg-soft tone via rgba
      )}
      style={{
        background: isWin
          ? 'rgba(32, 227, 178, 0.18)' // events-glow tint for revealed tile
          : 'rgba(15, 34, 54, 0.85)', // events-bg-soft (#0F2236) glass
        border: isWin
          ? '1px solid rgba(32, 227, 178, 0.6)'
          : isGlow
            ? '1px solid rgba(60, 174, 163, 0.4)' // cft-teal-primary
            : '1px solid rgba(15, 76, 117, 0.25)', // cft-navy-deep faint
        boxShadow: isWin
          ? '0 0 16px rgba(32,227,178,0.35), inset 0 0 8px rgba(32,227,178,0.15)'
          : isGlow
            ? '0 0 8px rgba(60,174,163,0.2)'
            : 'none',
        color: isWin
          ? '#20E3B2' // events-glow
          : isGlow
            ? '#3CAEA3' // cft-teal-primary
            : 'rgba(255,255,255,0.45)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        reduced
          ? { opacity: 1, scale: 1 }
          : isWin
            ? {
                opacity: 1,
                scale: 1,
              }
            : { opacity: 1, scale: 1 }
      }
      transition={
        reduced
          ? { duration: 0 }
          : {
              duration: 0.35,
              delay: index * 0.07,
              ease: 'easeOut',
            }
      }
    >
      {/* Win pulse ring — only on the 'win' tile when motion is allowed */}
      {isWin && !reduced && (
        <motion.div
          className="absolute inset-0 rounded-md"
          style={{
            border: '1px solid rgba(32,227,178,0.5)',
          }}
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
      <span>{symbol}</span>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// KioskMockup — main export
// ---------------------------------------------------------------------------

const PARTICLES: Array<{
  x: number
  y: number
  size: number
  duration: number
  delay: number
  teal: boolean
}> = [
  { x: 12, y: 70, size: 3, duration: 4.5, delay: 0, teal: true },
  { x: 85, y: 55, size: 2, duration: 5.2, delay: 0.8, teal: false },
  { x: 55, y: 88, size: 2.5, duration: 3.8, delay: 1.4, teal: true },
  { x: 28, y: 35, size: 2, duration: 6.0, delay: 2.1, teal: false },
  { x: 72, y: 22, size: 3, duration: 4.2, delay: 0.4, teal: true },
  { x: 40, y: 78, size: 2, duration: 5.5, delay: 1.9, teal: true },
  { x: 92, y: 80, size: 1.5, duration: 4.8, delay: 3.0, teal: false },
]

export function KioskMockup({ className }: { className?: string }) {
  const reduced = useReducedMotion() ?? false

  return (
    <div
      aria-hidden="true"
      className={cn('relative', className)}
      style={{ perspective: '900px' }}
    >
      {/* ── Outer device bezel ── */}
      <motion.div
        className="relative mx-auto"
        style={{
          width: '100%',
          maxWidth: 320,
          // Slight 3-D tilt
          transform: 'rotateY(-8deg) rotateX(4deg)',
          transformStyle: 'preserve-3d',
          borderRadius: 24,
          background:
            'linear-gradient(160deg, #1B3A52 0%, #0F1E2E 55%, #060E18 100%)',
          boxShadow: [
            '0 40px 80px rgba(0,0,0,0.55)',
            '0 0 0 1px rgba(27,107,147,0.25)',
            '8px 0 32px rgba(0,0,0,0.4)',
            '0 0 60px rgba(60,174,163,0.08)',
          ].join(', '),
          padding: '14px 12px 20px',
        }}
        initial={{ opacity: 0, scale: 0.88, rotateY: -16 }}
        animate={
          reduced
            ? { opacity: 1, scale: 1, rotateY: -8 }
            : { opacity: 1, scale: 1, rotateY: -8 }
        }
        transition={
          reduced
            ? { duration: 0 }
            : { type: 'spring', stiffness: 220, damping: 22, delay: 0.3 }
        }
      >
        {/* Bezel top bar — camera/sensor strip */}
        <div className="mb-3 flex items-center justify-center gap-2 px-2">
          <div
            className="h-1 w-1 rounded-full"
            style={{
              background: 'rgba(32,227,178,0.4)',
              boxShadow: '0 0 4px rgba(32,227,178,0.6)',
            }}
          />
          <div
            className="h-1 w-12 rounded-full"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          />
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.12)' }}
          />
        </div>

        {/* ── Touchscreen surface ── */}
        <div
          className="relative overflow-hidden rounded-lg"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, #0F2236 0%, #0A1420 60%, #050A12 100%)',
            minHeight: 320,
          }}
        >
          {/* Screen glare — top-left highlight */}
          <div
            className="pointer-events-none absolute top-0 left-0 h-1/3 w-1/2 rounded-tl-lg"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 70%)',
            }}
          />

          {/* Ambient teal glow radial at screen center */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 40%, rgba(60,174,163,0.07) 0%, transparent 65%)',
            }}
          />

          {/* Floating particles */}
          <div className="pointer-events-none absolute inset-0">
            {PARTICLES.map((p, i) => (
              <GlowParticle key={i} {...p} reduced={reduced} />
            ))}
          </div>

          {/* Screen content */}
          <div className="relative z-10 flex flex-col gap-3 p-4">
            {/* Faux header row */}
            <div className="flex items-center justify-between pb-1">
              <div className="flex flex-col gap-0.5">
                {/* Generic eyebrow */}
                <span
                  className="font-sans text-[9px] font-semibold tracking-[0.22em] uppercase"
                  style={{ color: '#3CAEA3' }} // cft-teal-primary
                >
                  Interactive
                </span>
                {/* Generic headline */}
                <span
                  className="font-display text-sm leading-tight font-bold"
                  style={{ color: 'rgba(255,255,255,0.92)' }}
                >
                  TAP TO PLAY
                </span>
              </div>

              {/* Score / status pill */}
              <div
                className="rounded-full px-2.5 py-0.5 font-sans text-[9px] font-semibold tracking-wider uppercase"
                style={{
                  background: 'rgba(32,227,178,0.12)',
                  border: '1px solid rgba(32,227,178,0.3)',
                  color: '#20E3B2', // events-glow
                }}
              >
                Live
              </div>
            </div>

            {/* Faux prize label */}
            <div
              className="font-display mb-1 rounded-md px-3 py-2 text-center text-xs font-semibold"
              style={{
                background: 'rgba(15, 76, 117, 0.2)', // cft-navy-deep tint
                border: '1px solid rgba(15,76,117,0.3)',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              Match 3 to reveal your prize
            </div>

            {/* Pick-to-win tile grid — 3 × 2 */}
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }, (_, i) => (
                <PickTile key={i} index={i} reduced={reduced} />
              ))}
            </div>

            {/* Faux CTA button strip at bottom */}
            <motion.div
              className="font-display mt-1 rounded-md py-2 text-center text-xs font-bold tracking-widest uppercase"
              style={{
                background:
                  'linear-gradient(135deg, rgba(60,174,163,0.35) 0%, rgba(32,227,178,0.2) 100%)',
                border: '1px solid rgba(32,227,178,0.4)',
                color: '#20E3B2',
              }}
              animate={
                reduced
                  ? {}
                  : {
                      boxShadow: [
                        '0 0 8px rgba(32,227,178,0.2)',
                        '0 0 20px rgba(32,227,178,0.45)',
                        '0 0 8px rgba(32,227,178,0.2)',
                      ],
                    }
              }
              transition={
                reduced
                  ? {}
                  : {
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
            >
              Confirm Selection
            </motion.div>

            {/* Screen footer — lead capture hint */}
            <p
              className="text-center font-sans text-[8px] leading-tight"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Enter your contact info to claim
            </p>
          </div>
        </div>

        {/* Bezel bottom — home indicator */}
        <div className="mt-3 flex justify-center">
          <div
            className="h-1 w-16 rounded-full"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          />
        </div>

        {/* Ambient glow behind the device */}
        <motion.div
          className="pointer-events-none absolute -bottom-8 left-1/2 -z-10 h-24 w-3/4 -translate-x-1/2 rounded-full"
          style={{
            background: 'rgba(60,174,163,0.12)',
            filter: 'blur(28px)',
          }}
          animate={
            reduced
              ? {}
              : {
                  opacity: [0.6, 1, 0.6],
                  scaleX: [1, 1.1, 1],
                }
          }
          transition={
            reduced
              ? {}
              : {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        />
      </motion.div>
    </div>
  )
}

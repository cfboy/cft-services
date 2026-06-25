import { useReducedMotion, motion } from 'framer-motion'
import { Gift, ScanLine, Sparkles, UserCheck } from 'lucide-react'

import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Floating particle — a single glowing dot drifting across the screen
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
  'glow',
]

function PickTile({ index, reduced }: TileProps) {
  const symbol = TILE_SYMBOLS[index % TILE_SYMBOLS.length]
  const state = TILE_STATES[index % TILE_STATES.length]

  const isWin = state === 'win'
  const isGlow = state === 'glow'

  return (
    <motion.div
      className={cn(
        'relative flex aspect-square items-center justify-center rounded-lg select-none',
        'font-display text-lg font-semibold'
      )}
      style={{
        background: isWin
          ? 'linear-gradient(145deg, rgba(32,227,178,0.28) 0%, rgba(32,227,178,0.10) 100%)'
          : 'linear-gradient(145deg, rgba(20,42,64,0.92) 0%, rgba(10,20,32,0.92) 100%)', // events-bg-soft → events-bg glass
        border: isWin
          ? '1px solid rgba(32, 227, 178, 0.65)'
          : isGlow
            ? '1px solid rgba(60, 174, 163, 0.4)' // cft-teal-primary
            : '1px solid rgba(120,150,180,0.12)',
        boxShadow: isWin
          ? '0 0 22px rgba(32,227,178,0.4), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 0 12px rgba(32,227,178,0.18)'
          : isGlow
            ? '0 0 10px rgba(60,174,163,0.22), inset 0 1px 0 rgba(255,255,255,0.06)'
            : 'inset 0 1px 0 rgba(255,255,255,0.05)',
        color: isWin
          ? '#5CF2D2'
          : isGlow
            ? '#3CAEA3' // cft-teal-primary
            : 'rgba(255,255,255,0.42)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={
        reduced
          ? { duration: 0 }
          : {
              duration: 0.35,
              delay: 0.5 + index * 0.07,
              ease: 'easeOut',
            }
      }
    >
      {/* Win pulse ring — only on the 'win' tile when motion is allowed */}
      {isWin && !reduced && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{ border: '1px solid rgba(32,227,178,0.5)' }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {isWin ? (
        <Gift aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
      ) : (
        <span>{symbol}</span>
      )}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Floating accent chip — generic, brand-neutral UI badge orbiting the device.
// Conveys the experiential story (gamification · lead capture · scan-to-play).
// ---------------------------------------------------------------------------

interface ChipProps {
  Icon: typeof Sparkles
  label: string
  value?: string
  reduced: boolean
  floatDelay: number
  className?: string
}

function AccentChip({
  Icon,
  label,
  value,
  reduced,
  floatDelay,
  className,
}: ChipProps) {
  return (
    <motion.div
      className={cn(
        'absolute z-20 flex items-center gap-2 rounded-xl px-3 py-2 backdrop-blur-md',
        className
      )}
      style={{
        background:
          'linear-gradient(145deg, rgba(20,42,64,0.92) 0%, rgba(10,20,32,0.88) 100%)',
        border: '1px solid rgba(60,174,163,0.30)',
        boxShadow:
          '0 12px 30px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04), 0 0 20px rgba(32,227,178,0.08)',
      }}
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={
        reduced
          ? { duration: 0 }
          : { type: 'spring', stiffness: 240, damping: 20, delay: floatDelay }
      }
    >
      <motion.div
        className="flex items-center gap-2"
        animate={reduced ? {} : { y: [0, -5, 0] }}
        transition={
          reduced
            ? {}
            : {
                duration: 4,
                delay: floatDelay,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
      >
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
          style={{
            background: 'rgba(32,227,178,0.14)',
            border: '1px solid rgba(32,227,178,0.28)',
          }}
        >
          <Icon
            aria-hidden="true"
            className="h-3.5 w-3.5"
            strokeWidth={1.75}
            style={{ color: '#20E3B2' }}
          />
        </span>
        <span className="flex flex-col leading-none">
          {value && (
            <span
              className="font-display text-sm font-bold"
              style={{ color: 'rgba(255,255,255,0.95)' }}
            >
              {value}
            </span>
          )}
          <span
            className="font-sans text-[9px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {label}
          </span>
        </span>
      </motion.div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// KioskMockup — main export
// A brand-neutral, code-built booth kiosk showing a generic pick-to-win game.
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
      style={{ perspective: '1100px' }}
    >
      {/* Floating accent chips — generic experiential UI, hidden on small screens */}
      <AccentChip
        Icon={Sparkles}
        value="+250"
        label="Points"
        reduced={reduced}
        floatDelay={0.6}
        className="-top-4 -right-2 hidden sm:flex"
      />
      <AccentChip
        Icon={UserCheck}
        label="Lead captured"
        reduced={reduced}
        floatDelay={1.1}
        className="top-1/3 -left-6 hidden md:flex"
      />
      <AccentChip
        Icon={ScanLine}
        label="Scan to play"
        reduced={reduced}
        floatDelay={1.5}
        className="right-2 -bottom-3 hidden sm:flex"
      />

      {/* Idle float wrapper — gentle lift so the device feels alive */}
      <motion.div
        className="relative mx-auto"
        style={{ maxWidth: 300 }}
        animate={reduced ? {} : { y: [0, -10, 0] }}
        transition={
          reduced ? {} : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        {/* ── Kiosk screen (bezel) ── */}
        <motion.div
          className="relative"
          style={{
            transform: 'rotateY(-7deg) rotateX(3deg)',
            transformStyle: 'preserve-3d',
            borderRadius: 22,
            background:
              'linear-gradient(160deg, #21465F 0%, #14283C 50%, #0A1422 100%)',
            boxShadow: [
              '0 50px 90px rgba(0,0,0,0.6)',
              '0 0 0 1px rgba(120,160,190,0.18)',
              'inset 0 1px 0 rgba(255,255,255,0.12)',
              'inset 0 -2px 6px rgba(0,0,0,0.5)',
              '0 0 70px rgba(60,174,163,0.10)',
            ].join(', '),
            padding: '12px 12px 16px',
          }}
          initial={{ opacity: 0, scale: 0.9, rotateY: -16 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: -7 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={
            reduced
              ? { duration: 0 }
              : { type: 'spring', stiffness: 200, damping: 22, delay: 0.15 }
          }
        >
          {/* Slim sensor dot — kiosk, not phone (no camera strip) */}
          <div className="mb-2.5 flex items-center justify-center">
            <div
              className="h-1 w-1 rounded-full"
              style={{
                background: 'rgba(32,227,178,0.45)',
                boxShadow: '0 0 5px rgba(32,227,178,0.6)',
              }}
            />
          </div>

          {/* ── Touchscreen surface ── */}
          <div
            className="relative overflow-hidden rounded-xl"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, #102A42 0%, #0A1420 58%, #050A12 100%)',
              minHeight: 360,
              boxShadow:
                'inset 0 0 0 1px rgba(0,0,0,0.5), inset 0 2px 16px rgba(0,0,0,0.55)',
            }}
          >
            {/* Screen glare — top-left highlight */}
            <div
              className="pointer-events-none absolute top-0 left-0 h-1/3 w-2/3 rounded-tl-xl"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 70%)',
              }}
            />

            {/* Ambient teal glow radial at screen center */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 42%, rgba(60,174,163,0.10) 0%, transparent 62%)',
              }}
            />

            {/* Floating particles */}
            <div className="pointer-events-none absolute inset-0">
              {PARTICLES.map((p, i) => (
                <GlowParticle key={i} {...p} reduced={reduced} />
              ))}
            </div>

            {/* Screen content */}
            <div className="relative z-10 flex flex-col gap-3.5 p-5">
              {/* Faux header row */}
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <span
                    className="font-sans text-[9px] font-semibold tracking-[0.24em] uppercase"
                    style={{ color: '#3CAEA3' }} // cft-teal-primary
                  >
                    Interactive
                  </span>
                  <span
                    className="font-display text-base leading-none font-bold"
                    style={{ color: 'rgba(255,255,255,0.95)' }}
                  >
                    TAP TO PLAY
                  </span>
                </div>

                {/* Live status pill */}
                <div
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-[9px] font-semibold tracking-wider uppercase"
                  style={{
                    background: 'rgba(32,227,178,0.12)',
                    border: '1px solid rgba(32,227,178,0.3)',
                    color: '#20E3B2', // events-glow
                  }}
                >
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: '#20E3B2' }}
                    animate={reduced ? {} : { opacity: [1, 0.25, 1] }}
                    transition={
                      reduced
                        ? {}
                        : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
                    }
                  />
                  Live
                </div>
              </div>

              {/* Faux prize label */}
              <div
                className="font-display rounded-lg px-3 py-2 text-center text-xs font-semibold"
                style={{
                  background:
                    'linear-gradient(145deg, rgba(15,76,117,0.28) 0%, rgba(15,76,117,0.12) 100%)', // cft-navy-deep tint
                  border: '1px solid rgba(60,174,163,0.22)',
                  color: 'rgba(255,255,255,0.78)',
                }}
              >
                Match 3 to reveal your prize
              </div>

              {/* Pick-to-win tile grid — 3 × 2 */}
              <div className="grid grid-cols-3 gap-2.5">
                {Array.from({ length: 6 }, (_, i) => (
                  <PickTile key={i} index={i} reduced={reduced} />
                ))}
              </div>

              {/* Faux CTA button strip at bottom */}
              <motion.div
                className="font-display mt-0.5 rounded-lg py-2.5 text-center text-xs font-bold tracking-widest uppercase"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(60,174,163,0.42) 0%, rgba(32,227,178,0.24) 100%)',
                  border: '1px solid rgba(32,227,178,0.45)',
                  color: '#CFFCF1',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)',
                }}
                animate={
                  reduced
                    ? {}
                    : {
                        boxShadow: [
                          'inset 0 1px 0 rgba(255,255,255,0.18), 0 0 8px rgba(32,227,178,0.2)',
                          'inset 0 1px 0 rgba(255,255,255,0.18), 0 0 22px rgba(32,227,178,0.5)',
                          'inset 0 1px 0 rgba(255,255,255,0.18), 0 0 8px rgba(32,227,178,0.2)',
                        ],
                      }
                }
                transition={
                  reduced
                    ? {}
                    : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                Confirm Selection
              </motion.div>

              {/* Screen footer — lead capture hint */}
              <p
                className="text-center font-sans text-[8px] leading-tight"
                style={{ color: 'rgba(255,255,255,0.32)' }}
              >
                Enter your contact info to claim
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Kiosk stand — slim neck + elliptical base ── */}
        <div className="relative mx-auto flex flex-col items-center">
          {/* Neck */}
          <div
            className="h-7 w-7"
            style={{
              background:
                'linear-gradient(90deg, #0A1422 0%, #21465F 50%, #0A1422 100%)',
              boxShadow: 'inset 0 0 0 1px rgba(120,160,190,0.12)',
            }}
          />
          {/* Base */}
          <div
            className="h-2.5 w-32 rounded-[50%]"
            style={{
              background: 'linear-gradient(180deg, #21465F 0%, #0A1422 100%)',
              boxShadow:
                '0 14px 26px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.10)',
            }}
          />
        </div>

        {/* Floor reflection / contact glow */}
        <motion.div
          className="pointer-events-none absolute -bottom-6 left-1/2 -z-10 h-16 w-3/4 -translate-x-1/2 rounded-[50%]"
          style={{
            background: 'rgba(60,174,163,0.16)',
            filter: 'blur(30px)',
          }}
          animate={
            reduced ? {} : { opacity: [0.55, 1, 0.55], scaleX: [1, 1.12, 1] }
          }
          transition={
            reduced
              ? {}
              : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      </motion.div>
    </div>
  )
}

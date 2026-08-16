import logoPrimary from '@/assets/cft-logo-primary.svg'
import logoWhite from '@/assets/cft-logo-white.svg'
import { cn } from '@/lib/utils'

/**
 * The light/dark variants swap in CSS rather than from `useTheme()`.
 * Branching the rendered `src` on theme breaks hydration of the prerendered
 * markup (the server always renders light) and flashes the wrong mark for a
 * frame; the `dark` class is already on `<html>` before first paint.
 */
export function Logo({ className = 'h-8' }: { className?: string }) {
  return (
    <>
      <img
        src={logoPrimary}
        alt="CFT Services"
        className={cn('block object-contain dark:hidden', className)}
        width={400}
        height={120}
      />
      <img
        src={logoWhite}
        alt=""
        aria-hidden="true"
        className={cn('hidden object-contain dark:block', className)}
        width={400}
        height={120}
      />
    </>
  )
}

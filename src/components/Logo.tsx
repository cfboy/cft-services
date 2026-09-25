import logoDark from '@/assets/cft-logo-horizontal-dark.svg'
import logoLight from '@/assets/cft-logo-horizontal-light.svg'
import { cn } from '@/lib/utils'

/**
 * The CFT_ | SERVICES wordmark, straight from the v2 brand kit — never
 * redraw it. The light-surface file carries the Deep Mint cursor and the
 * dark-surface file the Mint one, as the guidelines require.
 *
 * The variants swap in CSS rather than from `useTheme()`. Branching the
 * rendered `src` on theme breaks hydration of the prerendered markup (the
 * server always renders light) and flashes the wrong mark for a frame; the
 * `dark` class is already on `<html>` before first paint.
 */
export function Logo({ className = 'h-8' }: { className?: string }) {
  return (
    <>
      <img
        src={logoLight}
        alt="CFT Services"
        className={cn('block w-auto object-contain dark:hidden', className)}
        width={544}
        height={112}
      />
      <img
        src={logoDark}
        alt=""
        aria-hidden="true"
        className={cn('hidden w-auto object-contain dark:block', className)}
        width={544}
        height={112}
      />
    </>
  )
}

import { type ReactNode } from 'react'

import type { Shot } from './projects'

import { cn } from '@/lib/utils'

type BrowserFrameProps = {
  host: string
  className?: string
  /** Either a capture… */
  shot?: Shot
  alt?: string
  sizes?: string
  loading?: 'eager' | 'lazy'
  /** …or arbitrary content (a code-built mockup). */
  children?: ReactNode
}

/**
 * A quiet browser chrome around a live-site capture: a hairline bar with the
 * hostname in mono. No traffic-light dots — they read as stock mockup.
 */
export function BrowserFrame({
  host,
  className,
  shot,
  alt = '',
  sizes,
  loading = 'lazy',
  children,
}: BrowserFrameProps) {
  return (
    <div
      className={cn(
        'border-border/70 bg-card overflow-hidden rounded-lg border',
        className
      )}
    >
      <div
        aria-hidden="true"
        className="border-border/70 bg-muted/60 flex h-8 items-center gap-2 border-b px-3"
      >
        <span className="bg-cft-mint-ink h-2 w-2 shrink-0 rounded-[1px]" />
        <span className="text-muted-foreground truncate font-mono text-[11px] tracking-wide">
          {host}
        </span>
      </div>
      {shot ? (
        <img
          src={shot.src}
          srcSet={`${shot.srcSm} 720w, ${shot.src} 1440w`}
          sizes={sizes}
          alt={alt}
          width={1440}
          height={900}
          loading={loading}
          decoding="async"
          className="block aspect-16/10 h-auto w-full object-cover object-top"
        />
      ) : (
        children
      )}
    </div>
  )
}

/** A phone-shaped frame for 390×844 captures. */
export function PhoneFrame({
  src,
  alt = '',
  className,
}: {
  src: string
  alt?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'border-cft-night bg-cft-night dark:border-border dark:bg-border overflow-hidden rounded-[1.4rem] border-[5px] shadow-[0_24px_48px_-24px_rgb(10_22_40/0.45)]',
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        width={585}
        height={1266}
        loading="lazy"
        decoding="async"
        className="block aspect-390/844 h-auto w-full rounded-[1rem] object-cover object-top"
      />
    </div>
  )
}

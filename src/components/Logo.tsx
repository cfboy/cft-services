import logoPrimary from '@/assets/cft-logo-primary.svg'
import logoWhite from '@/assets/cft-logo-white.svg'
import { useTheme } from '@/hooks/use-theme'

export function Logo({ className = 'h-8' }: { className?: string }) {
  const { resolvedTheme } = useTheme()
  const src = resolvedTheme === 'dark' ? logoWhite : logoPrimary

  return (
    <img
      src={src}
      alt="CFT Services"
      className={className}
      style={{ objectFit: 'contain' }}
    />
  )
}

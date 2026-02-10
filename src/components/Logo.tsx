import { useTheme } from '@/hooks/use-theme'

export function Logo({ className = 'h-8' }: { className?: string }) {
  const { resolvedTheme } = useTheme()
  const primaryColor = resolvedTheme === 'dark' ? '#3CAEA3' : '#0F4C75'
  const accentColor = '#3CAEA3'

  return (
    <svg
      viewBox="0 0 200 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Mark - Abstract brackets representing code/technology */}
      <rect x="2" y="8" width="6" height="34" rx="3" fill={accentColor} />
      <rect x="12" y="2" width="6" height="46" rx="3" fill={primaryColor} />
      <rect x="22" y="8" width="6" height="34" rx="3" fill={accentColor} opacity="0.6" />

      {/* CFT text */}
      <text
        x="40"
        y="36"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="32"
        fill={primaryColor}
        letterSpacing="-1"
      >
        CFT
      </text>

      {/* Services text */}
      <text
        x="112"
        y="36"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="300"
        fontSize="20"
        fill={resolvedTheme === 'dark' ? '#94a3b8' : '#64748B'}
        letterSpacing="1"
      >
        services
      </text>
    </svg>
  )
}

import { useTranslation } from 'react-i18next'

import { Logo } from '@/components/Logo'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-border bg-muted/30 border-t px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-4">
          <Logo className="h-6" />
          <span className="text-muted-foreground text-sm">
            &copy; {year} CFT Services. {t('footer.rights')}
          </span>
        </div>
        {/* <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="transition-colors hover:text-foreground">
            {t('footer.privacy')}
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            {t('footer.terms')}
          </a>
        </div> */}
      </div>
    </footer>
  )
}

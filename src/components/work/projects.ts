import DorsalDesktopSm from '@/assets/projects/clinica-dorsal-desktop-sm.webp'
import DorsalDesktop from '@/assets/projects/clinica-dorsal-desktop.webp'
import DorsalMobile from '@/assets/projects/clinica-dorsal-mobile.webp'
import CRMAutomationImg from '@/assets/projects/CRM-Make-Automation.webp'
import FudisDesktopSm from '@/assets/projects/fudis-desktop-sm.webp'
import FudisDesktop from '@/assets/projects/fudis-desktop.webp'
import FudisMobile from '@/assets/projects/fudis-mobile.webp'
import LibelulaDesktopSm from '@/assets/projects/libelula-desktop-sm.webp'
import MacDesktopSm from '@/assets/projects/mac-educando-desktop-sm.webp'
import MasterspaceDesktopSm from '@/assets/projects/masterspace-desktop-sm.webp'
import MasterspaceDesktop from '@/assets/projects/masterspace-desktop.webp'
import MasterspaceMobile from '@/assets/projects/masterspace-mobile.webp'
import SalesReportImg from '@/assets/projects/Sales-Report.webp'
import TitiDesktopSm from '@/assets/projects/titi-amanda-desktop-sm.webp'

/**
 * Screenshots are captured from the live sites at 1440×900 and shipped as
 * WebP at two widths (720 and 1440). Mobile captures are 390×844 viewports.
 */
export type Shot = {
  /** 1440w capture. */
  src: string
  /** 720w capture, for srcset. */
  srcSm: string
}

export type FeaturedProject = {
  key: 'masterspace' | 'dorsal' | 'fudis' | 'school'
  /** Public URL. Absent for private client apps. */
  url?: string
  /** Hostname shown in the browser frame. */
  host: string
  stack: readonly string[]
  desktop?: Shot
  mobile?: string
}

export type IndexProject = {
  key: 'mac' | 'libelula' | 'titi' | 'crm' | 'sales'
  url?: string
  thumb: string
  /** Detail image shown in the drawer, for work with no public URL. */
  detail?: { src: string; width: number; height: number }
}

export const featured: Record<FeaturedProject['key'], FeaturedProject> = {
  masterspace: {
    key: 'masterspace',
    url: 'https://masterspacellc.com',
    host: 'masterspacellc.com',
    stack: ['React', 'Sanity', 'Tailwind', 'i18n'],
    desktop: { src: MasterspaceDesktop, srcSm: MasterspaceDesktopSm },
    mobile: MasterspaceMobile,
  },
  dorsal: {
    key: 'dorsal',
    url: 'https://clinicadorsal.com',
    host: 'clinicadorsal.com',
    stack: ['Next.js', 'Sanity', 'Netlify'],
    desktop: { src: DorsalDesktop, srcSm: DorsalDesktopSm },
    mobile: DorsalMobile,
  },
  fudis: {
    key: 'fudis',
    url: 'https://fudispr.com',
    host: 'fudispr.com',
    stack: ['Next.js', 'Supabase', 'PWA'],
    desktop: { src: FudisDesktop, srcSm: FudisDesktopSm },
    mobile: FudisMobile,
  },
  school: {
    key: 'school',
    host: 'itinerario',
    stack: ['Next.js', 'Supabase', 'Postgres RLS'],
  },
}

export const moreProjects: IndexProject[] = [
  {
    key: 'mac',
    url: 'https://maceducando.com/',
    thumb: MacDesktopSm,
  },
  {
    key: 'libelula',
    url: 'https://www.clinicalibelula.com/',
    thumb: LibelulaDesktopSm,
  },
  {
    key: 'titi',
    url: 'https://titiamandababysitter.com/',
    thumb: TitiDesktopSm,
  },
  {
    key: 'crm',
    thumb: CRMAutomationImg,
    detail: { src: CRMAutomationImg, width: 1200, height: 553 },
  },
  {
    key: 'sales',
    thumb: SalesReportImg,
    detail: { src: SalesReportImg, width: 1200, height: 519 },
  },
]

/** Hero stack — three live sites, back to front. */
export const heroStack = [
  { key: 'fudis', host: 'fudispr.com', shot: featured.fudis.desktop! },
  { key: 'dorsal', host: 'clinicadorsal.com', shot: featured.dorsal.desktop! },
  {
    key: 'masterspace',
    host: 'masterspacellc.com',
    shot: featured.masterspace.desktop!,
  },
] as const

/** Keeps the large captures out of the way of the 720w ones. */
export const shotSizes = {
  hero: '(min-width: 1024px) 560px, 90vw',
  featured: '(min-width: 1024px) 700px, 100vw',
  half: '(min-width: 1024px) 560px, 100vw',
}

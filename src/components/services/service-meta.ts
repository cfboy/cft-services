import {
  Code2,
  Gamepad2,
  GitBranch,
  Lightbulb,
  Monitor,
  Zap,
  type LucideIcon,
} from 'lucide-react'

import type { FeaturedProject, IndexProject } from '@/components/work/projects'
import type { ServiceKey } from '@/routes'

export type ProjectRef =
  | { type: 'featured'; key: FeaturedProject['key'] }
  | { type: 'index'; key: IndexProject['key'] }

const f = (key: FeaturedProject['key']): ProjectRef => ({
  type: 'featured',
  key,
})
const i = (key: IndexProject['key']): ProjectRef => ({ type: 'index', key })

/**
 * Per-service presentation: the line icon, and the shipped work that proves
 * it. The first related project is also the page's hero visual. Event
 * technology has no public client work to show, so it uses the kiosk mockup.
 */
export const SERVICE_META: Record<
  ServiceKey,
  { Icon: LucideIcon; related: ProjectRef[] }
> = {
  websites: {
    Icon: Monitor,
    related: [f('dorsal'), f('masterspace'), i('mac')],
  },
  webapps: { Icon: Code2, related: [f('school'), f('fudis')] },
  automation: { Icon: Zap, related: [i('crm'), i('sales')] },
  crm: { Icon: GitBranch, related: [i('crm'), i('sales')] },
  consulting: { Icon: Lightbulb, related: [f('school'), i('crm')] },
  events: { Icon: Gamepad2, related: [] },
}

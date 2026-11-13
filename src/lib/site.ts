/**
 * Business facts in one place: the name, address and phone (NAP) must read the
 * same in the footer, the contact section and the structured data, or local
 * search treats them as different businesses.
 */
export const SITE_ORIGIN = 'https://cftservicespr.com'
export const SITE_NAME = 'CFT Services'

export const CONTACT = {
  email: 'cristianf.torres15@gmail.com',
  phone: '787-218-2447',
  phoneE164: '+17872182447',
  calendly: 'https://calendly.com/cristianf-torres15/consulting',
  instagram: 'https://www.instagram.com/cftservicespr',
} as const

/**
 * Where we work. Listed in structured data as `areaServed` — the service is
 * island-wide and remote, so this names the municipalities people search by
 * rather than claiming an office in each.
 */
export const AREA_SERVED = [
  'San Juan',
  'Guaynabo',
  'Bayamón',
  'Carolina',
  'Caguas',
  'Dorado',
  'Ponce',
  'Mayagüez',
  'Arecibo',
] as const

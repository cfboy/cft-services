import { useEffect, useState } from 'react'

/**
 * Tracks which in-page section the visitor is currently reading.
 *
 * Sections here are full-height and unevenly sized, so an IntersectionObserver
 * ratio would flip between neighbours mid-scroll. Measuring which section top
 * has most recently passed the navbar is stable and matches what the eye sees.
 *
 * @param ids     Section element ids, in document order.
 * @param offset  Distance from the viewport top that counts as "arrived",
 *                normally the fixed navbar height.
 */
export function useActiveSection(ids: readonly string[], offset = 96): string {
  const [active, setActive] = useState<string>(ids[0] ?? '')
  const key = ids.join(',')

  useEffect(() => {
    const sectionIds = key.split(',')
    let frame = 0

    const measure = () => {
      frame = 0

      // Bottom of the page: the last section can be too short to ever reach
      // the offset line, so award it explicitly.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      if (atBottom) {
        setActive(sectionIds[sectionIds.length - 1])
        return
      }

      let current = sectionIds[0]
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) current = id
      }
      setActive(current)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [key, offset])

  return active
}

import { useRef, useCallback } from 'react'

/**
 * Enables click-and-drag horizontal scrolling.
 *
 * Attach `ref` to any wrapper element. The hook will look for a child with
 * `data-slot="scroll-area-viewport"` (Radix ScrollArea) and fall back to the
 * wrapper itself, so it works with both ScrollArea and a plain div.
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const getScrollEl = useCallback((): HTMLElement | null => {
    if (!ref.current) return null
    return (
      ref.current.querySelector<HTMLElement>(
        '[data-slot="scroll-area-viewport"]'
      ) ?? ref.current
    )
  }, [])

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const el = getScrollEl()
      if (!el) return
      isDragging.current = true
      startX.current = e.pageX - el.offsetLeft
      scrollLeft.current = el.scrollLeft
      el.style.cursor = 'grabbing'
    },
    [getScrollEl]
  )

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current) return
      const el = getScrollEl()
      if (!el) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      el.scrollLeft = scrollLeft.current - (x - startX.current)
    },
    [getScrollEl]
  )

  const stopDrag = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false
    const el = getScrollEl()
    if (el) el.style.cursor = ''
  }, [getScrollEl])

  return {
    ref,
    onMouseDown,
    onMouseMove,
    onMouseUp: stopDrag,
    onMouseLeave: stopDrag,
  }
}

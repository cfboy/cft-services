import { useRef, useCallback } from 'react'

/** Pointer travel (px) past which a gesture counts as a drag, not a click. */
const DRAG_THRESHOLD = 6

/**
 * Enables click-and-drag horizontal scrolling.
 *
 * Attach the returned handlers to any wrapper element. The hook looks for a
 * child with `data-slot="scroll-area-viewport"` (Radix ScrollArea) and falls
 * back to the wrapper itself, so it works with both ScrollArea and a plain div.
 *
 * `onClickCapture` swallows the click that a browser fires at the end of a
 * drag. Without it, dragging a carousel also activates whatever card the
 * pointer happened to land on.
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const travelled = useRef(0)

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
      // Let modified and non-primary clicks through to the browser.
      if (e.button !== 0) return
      const el = getScrollEl()
      if (!el) return
      isDragging.current = true
      travelled.current = 0
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
      const delta = x - startX.current
      travelled.current = Math.max(travelled.current, Math.abs(delta))
      el.scrollLeft = scrollLeft.current - delta
    },
    [getScrollEl]
  )

  const stopDrag = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false
    const el = getScrollEl()
    if (el) el.style.cursor = ''
  }, [getScrollEl])

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (travelled.current <= DRAG_THRESHOLD) return
    e.preventDefault()
    e.stopPropagation()
    travelled.current = 0
  }, [])

  return {
    ref,
    onMouseDown,
    onMouseMove,
    onMouseUp: stopDrag,
    onMouseLeave: stopDrag,
    onClickCapture,
  }
}

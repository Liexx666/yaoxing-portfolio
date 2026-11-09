import { useEffect } from 'react'

// One delegated listener, at most one update per animation frame; no React render per pointer move.
export function useGlassInteraction(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)')
    let panel: HTMLElement | null = null
    let frame = 0
    let pointerX = 0
    let pointerY = 0
    const reset = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      if (panel) {
        for (const property of ['--glass-x', '--glass-y', '--glass-dx', '--glass-dy']) {
          panel.style.removeProperty(property)
        }
      }
      panel = null
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !finePointer.matches) return
      const next = event.target instanceof Element ? event.target.closest<HTMLElement>('.glass-panel') : null
      if (panel !== next) { reset(); panel = next }
      if (!panel) return
      pointerX = event.clientX
      pointerY = event.clientY
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        if (!panel) return
        const bounds = panel.getBoundingClientRect()
        const x = Math.max(0, Math.min(1, (pointerX - bounds.left) / bounds.width))
        const y = Math.max(0, Math.min(1, (pointerY - bounds.top) / bounds.height))
        panel.style.setProperty('--glass-x', (x * 100).toFixed(2) + '%')
        panel.style.setProperty('--glass-y', (y * 100).toFixed(2) + '%')
        panel.style.setProperty('--glass-dx', ((x - .5) * 26).toFixed(2) + 'px')
        panel.style.setProperty('--glass-dy', ((y - .5) * 18).toFixed(2) + 'px')
      })
    }
    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', reset)
    window.addEventListener('blur', reset)
    return () => {
      reset()
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', reset)
      window.removeEventListener('blur', reset)
    }
  }, [enabled])
}

import { useEffect, useState } from 'react'

const preferenceKey = 'yaoxing-motion-paused'

function readPaused() {
  try { return localStorage.getItem(preferenceKey) === 'true' } catch { return false }
}

export function useAmbientMotion() {
  const [paused, setPaused] = useState(readPaused)
  const [reducedMotion, setReducedMotion] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [visible, setVisible] = useState(() => document.visibilityState !== 'hidden')
  const running = !paused && !reducedMotion && visible

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(media.matches)
    const updateVisibility = () => setVisible(document.visibilityState !== 'hidden')
    media.addEventListener('change', updatePreference)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => {
      media.removeEventListener('change', updatePreference)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.motion = running ? 'running' : 'paused'
    return () => { delete document.documentElement.dataset.motion }
  }, [running])

  useEffect(() => {
    try { localStorage.setItem(preferenceKey, String(paused)) } catch { /* In-memory preference still works. */ }
  }, [paused])

  return { running, paused, reducedMotion, togglePause: () => setPaused((value) => !value) }
}

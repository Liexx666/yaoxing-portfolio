import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'
const themeQuery = '(prefers-color-scheme: dark)'

function readPreference(): Theme {
  try {
    const value = localStorage.getItem('li-theme')
    return value === 'light' || value === 'dark' ? value : 'system'
  } catch {
    return 'system'
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readPreference)
  useEffect(() => {
    const media = window.matchMedia(themeQuery)
    const apply = () => {
      document.documentElement.dataset.theme =
        theme === 'system' ? (media.matches ? 'dark' : 'light') : theme
    }
    apply()
    media.addEventListener('change', apply)
    try {
      localStorage.setItem('li-theme', theme)
    } catch {
      // Theme still works when storage is unavailable.
    }
    return () => media.removeEventListener('change', apply)
  }, [theme])
  return { theme, setTheme }
}

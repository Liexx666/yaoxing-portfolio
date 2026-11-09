import { useEffect, useState, type ReactNode } from 'react'
import { profile } from '../data/portfolio'
import { LocaleContext } from './context'
import { messages } from './messages'
import type { Locale, LocalizedText } from './types'

function readLocale(): Locale {
  try {
    const saved = localStorage.getItem('li-locale')
    if (saved === 'en' || saved === 'zh') return saved
  } catch {
    // A browser that blocks storage can still switch languages in memory.
  }
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(readLocale)
  const copy = messages[locale]

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    document.title = profile.displayName + ' — ' + copy.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content', profile.displayName + ' — ' + copy.meta.description,
    )
    try {
      localStorage.setItem('li-locale', locale)
    } catch {
      // Do not make persistent storage a requirement for language switching.
    }
  }, [locale, copy])

  const localize = (text: LocalizedText) => text[locale]
  return <LocaleContext.Provider value={{ locale, setLocale, copy, localize }}>{children}</LocaleContext.Provider>
}

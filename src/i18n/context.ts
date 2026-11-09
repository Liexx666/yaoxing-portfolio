import { createContext } from 'react'
import type { Messages } from './messages'
import type { Locale, LocalizedText } from './types'

export type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  copy: Messages
  localize: (text: LocalizedText) => string
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)

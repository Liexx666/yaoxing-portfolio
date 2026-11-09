export type Locale = 'en' | 'zh'
export type LocalizedText = Record<Locale, string>

// Both arguments are required, so translated content always has an English/Chinese pair.
export function localized(en: string, zh: string): LocalizedText {
  return { en, zh }
}

// Product names, programming languages and other proper names can stay the same.
export function shared(text: string): LocalizedText {
  return localized(text, text)
}

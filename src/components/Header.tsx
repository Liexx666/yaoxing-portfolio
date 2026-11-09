import { useEffect, useState } from 'react'
import { ArrowUpRight, Languages, Menu, Monitor, Moon, Sparkle, Sun, X } from 'lucide-react'
import { profile } from '../data/portfolio'
import { useLocale } from '../hooks/useLocale'
import { useTheme, type Theme } from '../hooks/useTheme'
import { messages } from '../i18n/messages'

const navigation = ['home', 'about', 'projects', 'skills', 'interests', 'resume'] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const { theme, setTheme } = useTheme()
  const { locale, setLocale, copy } = useLocale()
  const targetLocale = locale === 'en' ? 'zh' : 'en'

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id)
      }
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 })
    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  const choices: { value: Theme; label: string; icon: typeof Sun }[] = [
    { value: 'light', label: copy.nav.light, icon: Sun },
    { value: 'dark', label: copy.nav.dark, icon: Moon },
    { value: 'system', label: copy.nav.system, icon: Monitor },
  ]
  const currentChoice = choices.find((choice) => choice.value === theme)!
  const nextChoice = choices[(choices.indexOf(currentChoice) + 1) % choices.length]
  const ThemeIcon = currentChoice.icon

  return (
    <header className="site-header">
      <div className="nav-shell container">
        <a className="wordmark" href="#home" aria-label={profile.displayName + ' — ' + copy.common.home}>
          {profile.displayName}<Sparkle className="wordmark-star" size={14} aria-hidden="true" />
        </a>
        <nav aria-label={copy.nav.main} className="desktop-nav">
          {navigation.map((id) => (
            <a key={id} href={'#' + id} aria-current={active === id ? 'location' : undefined}>{copy.common[id]}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <div className="theme-switch" role="group" aria-label={copy.nav.appearance}>
            {choices.map(({ value, label, icon: Icon }) => (
              <button key={value} type="button" aria-label={label} aria-pressed={theme === value}
                onClick={() => setTheme(value)}><Icon size={16} aria-hidden="true" /></button>
            ))}
          </div>
          <button className="mobile-theme icon-button" type="button"
            aria-label={copy.nav.appearance + ': ' + currentChoice.label + '. ' + copy.nav.nextTheme + ' ' + nextChoice.label}
            onClick={() => setTheme(nextChoice.value)}>
            <ThemeIcon size={18} aria-hidden="true" />
          </button>
          <button className="language-switch" type="button"
            lang={targetLocale === 'zh' ? 'zh-CN' : 'en'}
            aria-label={messages[targetLocale].common.switchLanguage}
            onClick={() => setLocale(targetLocale)}>
            <Languages size={17} aria-hidden="true" />
            <span>{targetLocale === 'zh' ? '中文' : 'EN'}</span>
          </button>
          <a className="nav-contact" href="#contact">{copy.nav.talk} <ArrowUpRight size={15} aria-hidden="true" /></a>
          <button className="mobile-toggle icon-button" type="button" aria-expanded={open}
            aria-controls="mobile-navigation" aria-label={open ? copy.nav.close : copy.nav.open}
            onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
        </div>
      </div>
      <nav id="mobile-navigation" aria-label={copy.nav.mobile} className="mobile-nav" hidden={!open}>
        {navigation.map((id) => <a key={id} href={'#' + id}
          onClick={() => setOpen(false)}>{copy.common[id]}</a>)}
        <a href="#contact" onClick={() => setOpen(false)}>{copy.common.contact}</a>
      </nav>
    </header>
  )
}

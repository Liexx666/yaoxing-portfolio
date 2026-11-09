import { Pause, Play, Sparkles } from 'lucide-react'
import { useLocale } from './hooks/useLocale'
import { useAmbientMotion } from './hooks/useAmbientMotion'
import { useGlassInteraction } from './hooks/useGlassInteraction'
import { AmbientBackground } from './components/AmbientBackground'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { About } from './components/About'
import { Hobbies } from './components/Hobbies'
import { Contact } from './components/Contact'

export default function App() {
  const { copy } = useLocale()
  const { running, paused, reducedMotion, togglePause } = useAmbientMotion()
  useGlassInteraction(running)

  return (
    <>
      <a className="skip-link" href="#main">{copy.common.skip}</a>
      <AmbientBackground />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Projects />
        <About />
        <Hobbies />
        <Contact />
      </main>
      <aside aria-label={copy.motion.controls}>
      <button className="ambient-toggle" type="button" onClick={togglePause} disabled={reducedMotion}
        aria-pressed={paused || reducedMotion}
        aria-label={reducedMotion ? copy.motion.reduced : paused ? copy.motion.resume : copy.motion.pause}>
        {reducedMotion ? <Sparkles size={16} aria-hidden="true" /> : paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
        <span>{reducedMotion ? copy.motion.reducedShort : paused ? copy.motion.resumeShort : copy.motion.pauseShort}</span>
      </button>
      </aside>
    </>
  )
}

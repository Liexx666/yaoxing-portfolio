import { useLocale } from '../hooks/useLocale'
import { ArrowDown, ArrowRight, Code2, Sparkle, Terminal } from 'lucide-react'
import { profile } from '../data/portfolio'

export function Hero() {
  const { copy, localize } = useLocale()
  return (
    <section className="hero container" id="home" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow"><span className="status-dot" /> {copy.hero.eyebrow}</p>
        <p className="hero-intro">{copy.hero.greeting} {profile.displayName}{copy.hero.greetingEnd}</p>
        <h1 id="hero-heading">{copy.hero.curiosity}<br />{copy.hero.code}<br /><span>{copy.hero.possibility}</span></h1>
        <p className="star-signature"><Sparkle size={15} aria-hidden="true" />{copy.hero.starMeaning}</p>
        <p className="hero-description">{localize(profile.introduction)} <span className="hero-closing">{copy.hero.closing}</span></p>
        <div className="hero-actions flex flex-wrap items-center gap-3">
          <a className="button button-primary" href="#projects">{copy.hero.projects} <ArrowRight size={17} aria-hidden="true" /></a>
          <a className="button button-secondary" href="#about">{copy.hero.about} <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
        <div className="hero-footnote"><span className="tiny-line" /> {copy.hero.identity}</div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
        <div className="art-shadow" />
        <div className="monogram-back" />
        <div className="monogram-tile">
          <span className="tile-corner"><Sparkle size={24} /></span>
          <span className="monogram monogram-name">{profile.monogramLines.map((line) => <span key={line}>{line}</span>)}</span>
          <span className="tile-caption">{copy.hero.progress}</span>
          <span className="tile-shine" />
        </div>
        <span className="hero-sparkle sparkle-a"><Sparkle size={35} /></span>
        <span className="hero-sparkle sparkle-b"><Sparkle size={19} /></span>
        <div className="floating-code"><span className="code-window-dots"><i /><i /><i /></span>
          <code><span>def</span> build_something():<br />&nbsp;&nbsp;<span>return</span> curiosity + code</code>
          <Terminal size={15} />
        </div>
        <div className="floating-tag tag-python"><span className="language-symbol">Py</span><span>Python</span></div>
        <div className="floating-tag tag-cpp"><Code2 size={19} /><span>C++</span></div>
        <div className="art-coordinate">{copy.hero.coordinate}</div>
      </div>
      <a className="scroll-cue" href="#projects"><span>{copy.hero.scroll}</span><ArrowDown size={14} aria-hidden="true" /></a>
    </section>
  )
}

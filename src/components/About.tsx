import { useLocale } from '../hooks/useLocale'
import { ArrowUpRight, BookOpen, Code2, Gamepad2, GraduationCap, Layers, Sparkles, Terminal, TestTube2 } from 'lucide-react'
import { profile, skillGroups } from '../data/portfolio'

const icons = { code: Code2, layers: Layers, test: TestTube2, terminal: Terminal }

export function About() {
  const { copy, localize } = useLocale()
  return (
    <>
      <section className="section container about-section" id="about" aria-labelledby="about-heading">
        <div className="about-copy"><p className="eyebrow">{copy.about.eyebrow}</p><h2 id="about-heading">{copy.about.titleFirst}<br /><span className="muted-heading">{copy.about.titleSecond}</span></h2><p>{localize(profile.background)}</p><p>{localize(profile.about)}</p><p>{copy.about.direction}</p>
          <a className="text-link" href="#contact">{copy.about.connect} <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        <div className="about-grid">
          <article className="education-card surface glass-panel"><GraduationCap size={26} strokeWidth={1.5} aria-hidden="true" /><span className="eyebrow">{copy.about.education}</span><h3>{localize(profile.university)}</h3><p>{localize(profile.degree)}</p><span className="education-period">{localize(profile.educationPeriod)}</span></article>
          <article className="interest-card surface"><Gamepad2 size={25} strokeWidth={1.5} aria-hidden="true" /><h3>{copy.about.beyond}</h3><p>{copy.about.interests}</p></article>
          <article className="learning-card surface"><BookOpen size={25} strokeWidth={1.5} aria-hidden="true" /><h3>{copy.about.mindset}</h3><p>{copy.about.mindsetBody}</p></article>
        </div>
      </section>
      <section className="section container" id="skills" aria-labelledby="skills-heading">
        <div className="section-heading"><div><p className="eyebrow">{copy.skills.eyebrow}</p><h2 id="skills-heading">{copy.skills.title}</h2></div><p className="section-aside">{copy.skills.asideFirst}<br />{copy.skills.asideSecond}</p></div>
        <div className="skills-grid">{skillGroups.map((group) => {
          const Icon = icons[group.icon]
          return <article className="skill-card surface glass-panel" key={group.title.en}><span className="skill-icon"><Icon size={23} strokeWidth={1.5} aria-hidden="true" /></span><h3>{localize(group.title)}</h3><ul>{group.items.map((item) => <li key={item.en}>{localize(item)}</li>)}</ul></article>
        })}</div>
        <p className="skills-footnote"><Sparkles size={14} aria-hidden="true" /> {copy.skills.footnote}</p>
      </section>
    </>
  )
}

import { useLocale } from '../hooks/useLocale'
import { useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { projects, profile, type Project } from '../data/portfolio'
import { ProjectDialog } from './ProjectDialog'
import { ProjectScreenshot } from './ProjectScreenshot'

export function Projects() {
  const { copy, localize } = useLocale()
  const [selected, setSelected] = useState<Project | null>(null)
  return (
    <section className="section container" id="projects" aria-labelledby="projects-heading">
      <div className="section-heading">
        <div><p className="eyebrow">{copy.projects.eyebrow}</p><h2 id="projects-heading">{copy.projects.title}</h2></div>
        <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">{copy.projects.github} <ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
      <article className="featured-project surface glass-panel">
        <div className="featured-copy">
          <span className="project-kicker"><span className="status-dot" /> {copy.projects.featured}</span>
          <h3>{localize(projects[0].name)}<span className="blue-dot">.</span></h3>
          <p>{localize(projects[0].summary)}</p>
          <div className="tags">{projects[0].technologies.map((tech) => <span key={tech.en}>{localize(tech)}</span>)}</div>
          <button className="text-link" onClick={() => setSelected(projects[0])}>{copy.projects.explore} <ArrowRight size={17} aria-hidden="true" /></button>
        </div>
        <ProjectScreenshot project={projects[0]} variant="featured" />
      </article>
      <div className="project-bottom-grid">
        <article className="game-project surface">
          <ProjectScreenshot project={projects[1]} variant="game" />
          <div className="game-copy"><p className="eyebrow">{copy.projects.gameEyebrow}</p><h3>{localize(projects[1].name)}</h3><p>{localize(projects[1].summary)}</p>
            <button className="text-link" onClick={() => setSelected(projects[1])}>{copy.projects.gameAction} <ArrowRight size={17} aria-hidden="true" /></button></div>
        </article>
        <aside className="philosophy-card surface glass-panel"><span className="quote-mark" aria-hidden="true">“</span><p>{copy.projects.quoteFirst}<br />{copy.projects.quoteSecond}</p><span className="eyebrow">{copy.projects.approach}</span><a className="circle-link" href="#about" aria-label={copy.projects.readApproach}><ArrowUpRight size={22} aria-hidden="true" /></a></aside>
      </div>
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

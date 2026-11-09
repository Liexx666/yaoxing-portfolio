import { useLocale } from '../hooks/useLocale'
import { useEffect, useRef } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import type { Project } from '../data/portfolio'
import { ProjectScreenshot } from './ProjectScreenshot'

export function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { copy, localize } = useLocale()
  const ref = useRef<HTMLDialogElement>(null)
  const caseStudy = project?.caseStudy
  useEffect(() => {
    const dialog = ref.current
    if (!project || !dialog) return
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [project])
  return (
    <dialog ref={ref} className="project-dialog" aria-labelledby="project-dialog-title"
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      {project && <div className="dialog-content">
        <button autoFocus className="icon-button dialog-close" aria-label={copy.projects.close}
          onClick={onClose}><X size={21} aria-hidden="true" /></button>
        <p className="eyebrow">{localize(project.category)}</p>
        <h2 id="project-dialog-title">{localize(project.detailName)}</h2>
        <p>{localize(project.summary)}</p>
        <ProjectScreenshot project={project} variant="detail" />
        <h3>{copy.projects.contributions}</h3>
        <ul>{project.contributions.map((item) => <li key={item.en}>{localize(item)}</li>)}</ul>
        {caseStudy && <section className="qa-case-study" aria-labelledby="qa-case-heading">
          <p className="eyebrow">{copy.projects.caseStudy}</p>
          <h3 id="qa-case-heading">{localize(caseStudy.title)}</h3>
          <dl>{([
            ['role', copy.projects.role],
            ['challenge', copy.projects.challenge],
            ['approach', copy.projects.approachTaken],
            ['takeaway', copy.projects.takeaway],
          ] as const).map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{localize(caseStudy[key])}</dd></div>)}</dl>
        </section>}
        <div className="tags">{project.technologies.map((tech) => <span key={tech.en}>{localize(tech)}</span>)}</div>
        <a className="button button-primary" href={project.href} target="_blank" rel="noreferrer">
          {localize(project.linkLabel)}<ArrowUpRight size={17} aria-hidden="true" /></a>
        {project.sourceHref !== project.href && <a className="button button-secondary dialog-source-link"
          href={project.sourceHref} target="_blank" rel="noreferrer">{copy.projects.source}<ArrowUpRight size={17} aria-hidden="true" /></a>}
        {project.id === 'agileflow' && <p className="dialog-note">{copy.projects.loginNote}</p>}
      </div>}
    </dialog>
  )
}

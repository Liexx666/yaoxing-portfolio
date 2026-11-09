import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/portfolio'
import { useLocale } from '../hooks/useLocale'

export function ProjectScreenshot({ project, variant }: { project: Project; variant: 'featured' | 'game' | 'detail' }) {
  const { copy, localize } = useLocale()
  return (
    <figure className={'project-screenshot project-screenshot--' + variant} data-project={project.id}>
      <a href={project.screenshot.src} target="_blank" rel="noreferrer"
        aria-label={copy.projects.openScreenshot + ' — ' + localize(project.detailName)}>
        <img src={project.screenshot.src} alt={localize(project.screenshot.alt)}
          width={project.screenshot.width} height={project.screenshot.height} loading="lazy" decoding="async" />
        <span className="screenshot-open" aria-hidden="true"><ArrowUpRight size={17} /></span>
      </a>
      <figcaption>{localize(project.screenshot.caption)}</figcaption>
    </figure>
  )
}

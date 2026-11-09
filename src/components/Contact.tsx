import { useLocale } from '../hooks/useLocale'
import { ArrowDownToLine, ArrowUpRight, FileText, Code2, Mail, Sparkle } from 'lucide-react'
import { profile } from '../data/portfolio'

const currentYear = new Date().getFullYear()

export function Contact() {
  const { copy, localize } = useLocale()
  const resumePdf = localize(profile.resumePdf)
  return (
    <>
      <section className="container resume-section" id="resume" aria-labelledby="resume-heading">
        <div className="resume-card surface glass-panel">
          <div className="resume-icon"><FileText size={28} strokeWidth={1.4} aria-hidden="true" /></div>
          <div className="resume-copy"><p className="eyebrow">{copy.resume.eyebrow}</p><h2 id="resume-heading">{copy.resume.title}</h2><p>{copy.resume.description}</p></div>
          {resumePdf ? <div className="resume-actions"><a className="button button-secondary" href={resumePdf} target="_blank" rel="noreferrer">{copy.resume.view} <ArrowUpRight size={16} aria-hidden="true" /></a><a className="button button-primary" href={resumePdf} download>{copy.resume.download} <ArrowDownToLine size={16} aria-hidden="true" /></a></div> :
            <div className="resume-pending"><span>{copy.resume.pending}</span><p>{copy.resume.pendingBody}</p></div>}
        </div>
      </section>
      <section className="contact-section container" id="contact" aria-labelledby="contact-heading">
        <p className="eyebrow">{copy.contact.eyebrow}</p><h2 id="contact-heading">{copy.contact.titleFirst}<br />{copy.contact.titleSecond} <span>{copy.contact.hello}</span></h2>
        <p>{copy.contact.bodyFirst}<br />{copy.contact.bodySecond}</p>
        <div className="contact-actions flex flex-wrap justify-center gap-3"><a className="button button-primary" href={profile.github} target="_blank" rel="noreferrer"><Code2 size={18} aria-hidden="true" />{copy.contact.github}<ArrowUpRight size={16} aria-hidden="true" /></a>
          {profile.email ? <a className="button button-secondary" href={'mailto:' + profile.email}><Mail size={18} aria-hidden="true" />{profile.email}</a> : <span className="contact-placeholder"><Mail size={17} aria-hidden="true" />{copy.contact.pending}</span>}
        </div>
      </section>
      <footer className="site-footer container"><a className="wordmark" href="#home" aria-label={copy.common.backHome}>{profile.displayName}<Sparkle className="wordmark-star" size={14} aria-hidden="true" /></a><p>{copy.contact.footer}</p><span>© {currentYear} {profile.displayName}</span></footer>
    </>
  )
}

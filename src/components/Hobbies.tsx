import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Copy, Guitar, Music2, Tv, Medal, Sparkles, Trophy } from 'lucide-react'
import { hobbies } from '../data/portfolio'
import { useLocale } from '../hooks/useLocale'

export function Hobbies() {
  const { copy, localize } = useLocale()
  const [copyStatus, setCopyStatus] = useState<{ region: 'global' | 'china'; result: 'copied' | 'error' } | null>(null)

  useEffect(() => {
    if (!copyStatus) return
    const timer = window.setTimeout(() => setCopyStatus(null), 3000)
    return () => window.clearTimeout(timer)
  }, [copyStatus])

  const copyAccount = async (region: 'global' | 'china') => {
    try {
      await navigator.clipboard.writeText(region === 'china' ? hobbies.valorant.chinaAccount : hobbies.valorant.account)
      setCopyStatus({ region, result: 'copied' })
    } catch {
      setCopyStatus({ region, result: 'error' })
    }
  }

  return (
    <section className="section container hobbies-section" id="interests" aria-labelledby="interests-heading">
      <div className="section-heading">
        <div><p className="eyebrow">{copy.hobbies.eyebrow}</p><h2 id="interests-heading">{copy.hobbies.title}</h2></div>
        <p className="section-aside">{copy.hobbies.asideFirst}<br />{copy.hobbies.asideSecond}</p>
      </div>
      <div className="hobbies-grid">
        <article className="hobby-card valorant-card surface glass-panel">
          <div className="hobby-card-top"><span className="hobby-index">01 / VALORANT</span><Sparkles size={19} aria-hidden="true" /></div>
          <div className="valorant-content">
            <div className="valorant-copy">
              <p className="eyebrow">{copy.hobbies.valorantEyebrow}</p>
              <h3>{copy.hobbies.valorantTitle}</h3>
              <p>{localize(hobbies.valorant.description)}</p>
              <div className="achievement-pills">
                <span><Trophy size={15} aria-hidden="true" />{copy.hobbies.champion}</span>
                <span><Medal size={15} aria-hidden="true" />{copy.hobbies.mvp}</span>
              </div>
              <div className="training-note"><span className="status-dot" /><p>{localize(hobbies.valorant.training)}</p></div>
            </div>
            <figure className="rank-figure">
              <a href={hobbies.valorant.image} target="_blank" rel="noreferrer" aria-label={copy.hobbies.enlarge}>
                <img src={hobbies.valorant.image} alt={copy.hobbies.rankAlt} width={630} height={460} loading="lazy" decoding="async" />
              </a>
              <figcaption>{copy.hobbies.rankCaption}<ArrowUpRight size={12} aria-hidden="true" /></figcaption>
            </figure>
          </div>
          {(['global', 'china'] as const).map((region) => (
            <div className="riot-account" key={region}>
              <div><span>{region === 'china' ? copy.hobbies.chinaAccount : copy.hobbies.account}</span><code>{region === 'china' ? hobbies.valorant.chinaAccount : hobbies.valorant.account}</code></div>
              <button className="icon-button" type="button" onClick={() => copyAccount(region)} aria-label={region === 'china' ? copy.hobbies.copyChinaAccount : copy.hobbies.copyAccount}>
                {copyStatus?.region === region && copyStatus.result === 'copied' ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
              </button>
            </div>
          ))}
          <p className="copy-feedback" role="status" aria-live="polite">
            {copyStatus?.result === 'copied' ? (copyStatus.region === 'china' ? copy.hobbies.chinaCopied : copy.hobbies.copied) : copyStatus?.result === 'error' ? copy.hobbies.copyFailed : ''}
          </p>
        </article>
        <article className="hobby-card guitar-card surface glass-panel">
          <div className="hobby-card-top"><span className="hobby-index">02 / {copy.hobbies.guitarLabel}</span><Guitar size={20} aria-hidden="true" /></div>
          <figure className="guitar-figure">
            <img src={hobbies.guitar.image} alt={copy.hobbies.guitarPhotoAlt} width={1200} height={1704} loading="lazy" decoding="async" />
            <figcaption>{copy.hobbies.guitarCaption} · <a href={hobbies.guitar.photoSource} target="_blank" rel="noreferrer">{hobbies.guitar.photoCredit}</a></figcaption>
          </figure>
          <div className="guitar-copy"><span className="music-note"><Music2 size={14} aria-hidden="true" />{copy.hobbies.jazz}</span><h3>{copy.hobbies.guitarTitle}</h3><p>{localize(hobbies.guitar.description)}</p></div>
        </article>
        <article className="hobby-card series-card surface glass-panel">
          <div className="series-intro">
            <div className="hobby-card-top"><span className="hobby-index">03 / {copy.hobbies.seriesLabel}</span><Tv size={20} aria-hidden="true" /></div>
            <h3>{copy.hobbies.seriesTitle}</h3><p>{copy.hobbies.seriesBody}</p>
          </div>
          <ul className="series-list">{hobbies.shows.map((show, index) => <li key={show.en}><span className="series-number" aria-hidden="true">0{index + 1}</span><span>{localize(show)}</span></li>)}</ul>
        </article>
      </div>
    </section>
  )
}

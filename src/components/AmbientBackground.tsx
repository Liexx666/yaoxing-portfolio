import type { CSSProperties } from 'react'

const sprites = [
  { kind: 'cloud', x: 10, y: 13, size: 68, duration: 26, delay: -8 },
  { kind: 'ghost', x: 3, y: 58, size: 43, duration: 21, delay: -4 },
  { kind: 'planet', x: 90, y: 20, size: 62, duration: 31, delay: -15 },
  { kind: 'cat', x: 93, y: 66, size: 46, duration: 25, delay: -12 },
  { kind: 'cloud', x: 73, y: 90, size: 60, duration: 29, delay: -5 },
]
const stars = [
  [5, 12, 18], [19, 38, 11], [33, 7, 14], [49, 17, 9], [69, 7, 16],
  [82, 43, 11], [96, 10, 15], [7, 86, 14], [27, 78, 10], [45, 93, 15],
  [64, 61, 11], [89, 86, 17], [97, 42, 8], [57, 37, 8],
]

export function AmbientBackground() {
  return (
    <div className="ambient-scene" aria-hidden="true">
      <div className="sky-haze haze-one" /><div className="sky-haze haze-two" />
      <div className="sky-grid" />
      {sprites.map((sprite, index) => (
        <div key={index} className={'ambient-sprite sprite-' + sprite.kind} style={{
          '--sprite-x': sprite.x + '%', '--sprite-y': sprite.y + '%',
          '--sprite-size': sprite.size + 'px', '--float-duration': sprite.duration + 's',
          '--float-delay': sprite.delay + 's',
        } as CSSProperties}>
          <svg viewBox="0 0 24 24" focusable="false"><use href={'/images/pixel-sprites.svg#' + sprite.kind} /></svg>
        </div>
      ))}
      {stars.map(([x, y, size], index) => (
        <svg key={index} className="twinkle-star" viewBox="0 0 24 24" focusable="false" style={{
          left: x + '%', top: y + '%', width: size + 'px', height: size + 'px',
          '--twinkle-duration': (4 + index % 4) + 's', '--twinkle-delay': -(index * .7) + 's',
        } as CSSProperties}><use href="/images/pixel-sprites.svg#star" /></svg>
      ))}
    </div>
  )
}

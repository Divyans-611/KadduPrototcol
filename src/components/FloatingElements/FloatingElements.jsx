import { useMemo } from 'react'
import './FloatingElements.css'

const ELEMENT_TYPES = [
  { emoji: '♡', className: 'heart' },
  { emoji: '✦', className: 'star' },
  { emoji: '✧', className: 'sparkle' },
  { emoji: '🌸', className: 'flower' },
  { emoji: '💕', className: 'double-heart' },
  { emoji: '🦋', className: 'butterfly' },
  { emoji: '·', className: 'dot' },
]

export default function FloatingElements() {
  const items = useMemo(() => {
    const generated = []
    for (let i = 0; i < 25; i++) {
      const type = ELEMENT_TYPES[i % ELEMENT_TYPES.length]
      generated.push({
        ...type,
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 25,
        duration: 18 + Math.random() * 22,
        size:
          type.className === 'dot'
            ? 0.3 + Math.random() * 0.5
            : 0.6 + Math.random() * 1.2,
        opacity: 0.15 + Math.random() * 0.25,
        drift: -50 + Math.random() * 100,
      })
    }
    return generated
  }, [])

  return (
    <div className="floating-elements" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item.id}
          className={`floating-item floating-${item.className}`}
          style={{
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
            fontSize: `${item.size}rem`,
            '--item-opacity': item.opacity,
            '--drift': `${item.drift}px`,
          }}
        >
          {item.emoji}
        </span>
      ))}

      <div className="star-field">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={`star-${i}`}
            className="bg-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

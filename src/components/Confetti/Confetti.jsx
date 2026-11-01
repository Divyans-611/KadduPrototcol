import { useEffect, useState } from 'react'
import './Confetti.css'

const COLORS = [
  '#f9a8c9', '#c4b5fd', '#fed7aa', '#fda4af',
  '#f472b6', '#a78bfa', '#fb923c', '#e11d48',
  '#fbcfe8', '#ddd6fe',
]

const SHAPES = ['square', 'rectangle', 'circle']

export default function Confetti({ active = true }) {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    if (!active) return
    const newPieces = []
    for (let i = 0; i < 100; i++) {
      newPieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        size: 5 + Math.random() * 8,
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        drift: -100 + Math.random() * 200,
      })
    }
    setPieces(newPieces)
  }, [active])

  if (!active || pieces.length === 0) return null

  return (
    <div className="confetti-container" aria-hidden="true">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={`confetti-piece confetti-${piece.shape}`}
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            backgroundColor: piece.color,
            '--rotation': `${piece.rotation}deg`,
            '--drift': `${piece.drift}px`,
            width:
              piece.shape === 'rectangle'
                ? `${piece.size}px`
                : `${piece.size * 0.7}px`,
            height:
              piece.shape === 'rectangle'
                ? `${piece.size * 0.4}px`
                : `${piece.size * 0.7}px`,
          }}
        />
      ))}
    </div>
  )
}

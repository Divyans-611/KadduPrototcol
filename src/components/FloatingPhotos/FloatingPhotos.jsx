import { motion } from 'framer-motion'
import './FloatingPhotos.css'

export const DEFAULT_PHOTOS = [
  {
    id: 1,
    url: './photos/photo1.jpg',
    caption: 'Roses for Kaddu 🌹',
    frameClass: 'polaroid'
  },
  {
    id: 2,
    url: './photos/photo2.jpg',
    caption: 'Cute smiles & sips 🥤',
    frameClass: 'soft-card'
  },
  {
    id: 3,
    url: './photos/photo3.jpg',
    caption: 'Us together ✨',
    frameClass: 'romantic'
  },
  {
    id: 4,
    url: './photos/photo4.jpg',
    caption: 'Chief Tasting Officer 🍨',
    frameClass: 'stamp'
  },
  {
    id: 5,
    url: './photos/photo5.jpg',
    caption: 'Pookie Approved 👍',
    frameClass: 'polaroid'
  }
]

export default function FloatingPhotos({ photos = DEFAULT_PHOTOS, mode = 'ambient' }) {
  if (!photos || photos.length === 0) return null

  if (mode === 'ambient') {
    // Subtle, floating dreamy memories in background
    return (
      <div className="floating-photos-ambient" aria-hidden="true">
        {photos.map((item, index) => {
          return (
            <motion.div
              key={item.id}
              className={`ambient-photo-card card-${index + 1} ${item.frameClass}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0.75, 0.95, 0.75],
                y: [0, -18, 0],
                rotate: [0, (index % 2 === 0 ? 3 : -3), 0]
              }}
              transition={{
                duration: 6 + index * 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.4
              }}
              whileHover={{ scale: 1.15, opacity: 1, zIndex: 50 }}
            >
              <div className="photo-pin">📌</div>
              <div className="photo-img-wrap">
                <img src={item.url} alt={item.caption || 'Memory'} loading="lazy" />
              </div>
              <p className="photo-caption">{item.caption}</p>
            </motion.div>
          )
        })}
      </div>
    )
  }

  // Showcase mode: carousel/deck animation for celebration & mission complete
  return (
    <div className="floating-photos-showcase">
      <div className="showcase-header">
        <span className="showcase-sparkle">✨</span>
        <span>AGENT K'S CLASSIFIED MEMORIES</span>
        <span className="showcase-sparkle">✨</span>
      </div>
      <div className="showcase-track">
        {photos.map((item, index) => (
          <motion.div
            key={item.id}
            className={`showcase-card ${item.frameClass}`}
            initial={{ opacity: 0, y: 30, rotate: (index % 2 === 0 ? -4 : 4) }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
            whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
          >
            <div className="photo-pin">🌸</div>
            <div className="showcase-img-wrap">
              <img src={item.url} alt={item.caption || 'Memory'} />
            </div>
            <span className="showcase-caption">{item.caption}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

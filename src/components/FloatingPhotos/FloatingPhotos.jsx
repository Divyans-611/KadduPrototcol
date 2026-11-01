import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  },
  {
    id: 6,
    url: './photos/photo6.jpg',
    caption: 'Knife Protocol 🔪',
    frameClass: 'soft-card'
  },
  {
    id: 7,
    url: './photos/photo7.jpg',
    caption: 'Snack Detective 🍗',
    frameClass: 'stamp'
  },
  {
    id: 8,
    url: './photos/photo8.jpg',
    caption: 'Mirror Selfie Duo 📸',
    frameClass: 'romantic'
  },
  {
    id: 9,
    url: './photos/photo9.jpg',
    caption: 'Kitty Whisperer 🐱',
    frameClass: 'polaroid'
  }
]

export default function FloatingPhotos({ photos = DEFAULT_PHOTOS, mode = 'ambient' }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [ambientIndex, setAmbientIndex] = useState(0)

  // On small mobile screens, cycle through photos in ambient corners smoothly so it's not overcrowded
  useEffect(() => {
    const timer = setInterval(() => {
      setAmbientIndex((prev) => (prev + 1) % photos.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [photos.length])

  if (!photos || photos.length === 0) return null

  if (mode === 'ambient') {
    // Ambient floating positions across background
    return (
      <>
        <div className="floating-photos-ambient" aria-hidden="true">
          {photos.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                className={`ambient-photo-card card-pos-${(index % 8) + 1} ${item.frameClass}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0.75, 0.95, 0.75],
                  y: [0, -14, 0],
                  rotate: [0, index % 2 === 0 ? 3 : -3, 0]
                }}
                transition={{
                  duration: 5.5 + (index % 4) * 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: (index % 5) * 0.35
                }}
                whileHover={{ scale: 1.15, opacity: 1, zIndex: 60 }}
                onClick={() => setSelectedPhoto(item)}
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

        {/* Modal for tapping any memory */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              className="photo-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                className={`photo-modal-card ${selectedPhoto.frameClass}`}
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="photo-modal-close"
                  onClick={() => setSelectedPhoto(null)}
                  aria-label="Close"
                >
                  ✕
                </button>
                <div className="photo-pin">🌸</div>
                <div className="modal-img-wrap">
                  <img src={selectedPhoto.url} alt={selectedPhoto.caption} />
                </div>
                <p className="modal-caption">{selectedPhoto.caption}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Showcase mode: carousel/deck animation for celebration & mission complete
  return (
    <div className="floating-photos-showcase">
      <div className="showcase-header">
        <span className="showcase-sparkle">✨</span>
        <span>AGENT K'S CLASSIFIED MEMORIES (TAP TO ENLARGE)</span>
        <span className="showcase-sparkle">✨</span>
      </div>
      <div className="showcase-track">
        {photos.map((item, index) => (
          <motion.div
            key={item.id}
            className={`showcase-card ${item.frameClass}`}
            initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -4 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + (index % 5) * 0.1 }}
            whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelectedPhoto(item)}
          >
            <div className="photo-pin">🌸</div>
            <div className="showcase-img-wrap">
              <img src={item.url} alt={item.caption || 'Memory'} loading="lazy" />
            </div>
            <span className="showcase-caption">{item.caption}</span>
          </motion.div>
        ))}
      </div>

      {/* Modal for tapping any memory in showcase */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="photo-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className={`photo-modal-card ${selectedPhoto.frameClass}`}
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="photo-modal-close"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close"
              >
                ✕
              </button>
              <div className="photo-pin">🌸</div>
              <div className="modal-img-wrap">
                <img src={selectedPhoto.url} alt={selectedPhoto.caption} />
              </div>
              <p className="modal-caption">{selectedPhoto.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

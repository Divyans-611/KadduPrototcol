import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Sparkles } from 'lucide-react'
import { Floating3DHeart } from './Floating3DHeart'
import HeartParticles from './HeartParticles'
import CameraParallax from './CameraParallax'
import './HeartUniverse.css'

// Heart data positioned around the scene at multiple depths and sizes
const CLUSTER_HEARTS = [
  // Surrounding midground hearts
  { position: [-2.6, 1.4, -1.2], scale: 0.85, color: '#ff2d55', speed: 1.4, rot: [-0.2, 0.4, 0.1] },
  { position: [2.5, 1.3, -1.5], scale: 0.78, color: '#e11d48', speed: 1.2, rot: [0.1, -0.5, -0.2] },
  { position: [-2.8, -1.2, -0.8], scale: 0.72, color: '#fb7185', speed: 1.6, rot: [0.3, 0.2, -0.1] },
  { position: [2.9, -1.1, -0.6], scale: 0.82, color: '#be123c', speed: 1.3, rot: [-0.1, -0.3, 0.2] },

  // Background floating hearts with high depth
  { position: [-4.2, 2.5, -4.5], scale: 0.55, color: '#f43f5e', speed: 0.9, rot: [0.4, 0.5, 0] },
  { position: [4.4, 2.8, -5.0], scale: 0.6, color: '#fda4af', speed: 0.85, rot: [-0.3, -0.6, 0.3] },
  { position: [-3.8, -2.6, -3.8], scale: 0.5, color: '#9f1239', speed: 1.1, rot: [0.2, 0.4, -0.2] },
  { position: [4.0, -2.5, -4.2], scale: 0.58, color: '#e11d48', speed: 1.0, rot: [-0.2, -0.4, 0.1] },
  { position: [0.3, 3.2, -3.5], scale: 0.48, color: '#fbcfe8', speed: 0.95, rot: [0.1, 0.2, 0] },
  { position: [-0.5, -3.2, -3.2], scale: 0.52, color: '#f43f5e', speed: 1.05, rot: [-0.2, 0.3, 0.1] },

  // Foreground delicate orbiting hearts
  { position: [-1.4, -2.0, 1.2], scale: 0.42, color: '#ff758f', speed: 1.8, rot: [0.1, 0.2, -0.3] },
  { position: [1.5, 2.1, 1.0], scale: 0.45, color: '#ffe4e6', speed: 1.7, rot: [-0.2, -0.1, 0.2] },
]

export default function HeartUniverse({ onContinue }) {
  const mouseRef = useRef({ x: 0, y: 0 })
  const [clickCount, setClickCount] = useState(0)
  const [heartSparkle, setHeartSparkle] = useState(false)
  const [webglSupported, setWebglSupported] = useState(true)

  // Verify WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setWebglSupported(false)
    } catch {
      setWebglSupported(false)
    }
  }, [])

  // Mouse / Touch listener for smooth parallax tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mouseRef.current = { x, y }
    }

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0]
        const x = (touch.clientX / window.innerWidth) * 2 - 1
        const y = -(touch.clientY / window.innerHeight) * 2 + 1
        mouseRef.current = { x, y }
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  const handleHeroClick = () => {
    setClickCount((prev) => prev + 1)
    setHeartSparkle(true)
    setTimeout(() => setHeartSparkle(false), 900)
  }

  return (
    <motion.div
      className="heart-universe-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 1.1, ease: 'easeInOut' }}
    >
      {/* 3D Canvas Scene */}
      {webglSupported ? (
        <div className="heart-canvas-container">
          <Canvas
            camera={{ position: [0, 0, 7.5], fov: 45 }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true
            }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <color attach="background" args={['#0a0106']} />
              <fog attach="fog" args={['#0a0106', 7, 24]} />

              {/* Cinematic Lights: Deep crimson rim & soft romantic highlights */}
              <ambientLight intensity={0.55} color="#4c1d4e" />
              <pointLight position={[6, 6, 6]} intensity={2.2} color="#fda4af" distance={20} />
              <pointLight position={[-6, -4, 4]} intensity={1.8} color="#e11d48" distance={18} />
              <pointLight position={[0, -5, -4]} intensity={2.5} color="#881337" distance={20} />
              <directionalLight position={[0, 8, 4]} intensity={1.2} color="#fff1f2" />

              {/* Glowing Particle Universe */}
              <HeartParticles count={700} />

              {/* Hero Central Heart */}
              <Floating3DHeart
                position={[0, 0.1, 0]}
                scale={1.65}
                color="#e11d48"
                speed={1.4}
                roughness={0.12}
                metalness={0.08}
                clearcoat={1.0}
                isHero={true}
                onClick={handleHeroClick}
              />

              {/* Surrounding Cluster Hearts */}
              {CLUSTER_HEARTS.map((heart, idx) => (
                <Floating3DHeart
                  key={idx}
                  position={heart.position}
                  scale={heart.scale}
                  color={heart.color}
                  speed={heart.speed}
                  rotationOffset={heart.rot}
                  onClick={() => setClickCount((prev) => prev + 1)}
                />
              ))}

              {/* Parallax Controller */}
              <CameraParallax mouseRef={mouseRef} />
            </Suspense>
          </Canvas>
        </div>
      ) : (
        /* Graceful Fallback if WebGL is disabled */
        <div className="webgl-fallback">
          <div className="fallback-heart">❤️</div>
        </div>
      )}

      {/* Floating Sparkle feedback when hearts are clicked */}
      <AnimatePresence>
        {heartSparkle && (
          <motion.div
            className="click-feedback-badge"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -20, scale: 1.1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <span>💕 +1 Love</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimalistic, Cinematic Overlay */}
      <div className="universe-ui-overlay">
        <motion.div
          className="universe-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Sparkles size={13} />
          <span>CHAPTER TWO — HEART UNIVERSE</span>
          <Sparkles size={13} />
        </motion.div>

        <motion.div
          className="universe-text-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="universe-quote">
            "Somewhere in this universe, there's a little world that exists only for you."
          </p>
          <p className="universe-tap-hint">
            (Tap the hearts to feel them beat)
          </p>
        </motion.div>

        <motion.div
          className="universe-action-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <button
            className="universe-continue-btn"
            onClick={onContinue}
            aria-label="Continue to next secret"
          >
            <span>CONTINUE</span>
            <ChevronRight size={18} />
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

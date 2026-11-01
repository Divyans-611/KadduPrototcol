import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Shield, Star } from 'lucide-react'
import Confetti from '../Confetti/Confetti'
import './AccessGrantedScreen.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.5 },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function AccessGrantedScreen({ onComplete }) {
  const [showContinue, setShowContinue] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContinue(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="access-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Confetti active={true} />

      <motion.div className="access-icon" variants={itemVariants}>
        <div className="access-shield">
          <Shield size={40} />
          <Heart size={18} className="shield-heart" fill="currentColor" />
        </div>
      </motion.div>

      <motion.div className="access-badge" variants={itemVariants}>
        <Star size={12} fill="currentColor" />
        <span>IDENTITY VERIFIED</span>
        <Star size={12} fill="currentColor" />
      </motion.div>

      <motion.h1 className="access-title" variants={itemVariants}>
        ACCESS GRANTED
      </motion.h1>

      <motion.p className="access-welcome" variants={itemVariants}>
        Welcome back, Kuchki Puchki! ♡
      </motion.p>

      <motion.p className="access-message" variants={itemVariants}>
        Identity verified. The birthday archive recognises its favourite human.
      </motion.p>

      <motion.div
        className="access-hearts"
        variants={itemVariants}
        aria-hidden="true"
      >
        {['💕', '✨', '🎂', '✨', '💕'].map((emoji, i) => (
          <span key={i} className="access-emoji">
            {emoji}
          </span>
        ))}
      </motion.div>

      {showContinue && (
        <motion.button
          className="continue-button"
          onClick={onComplete}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          CONTINUE THE MISSION ♡
        </motion.button>
      )}
    </motion.div>
  )
}

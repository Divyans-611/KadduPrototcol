import { motion } from 'framer-motion'
import { Gift, Heart, Star } from 'lucide-react'
import Confetti from '../Confetti/Confetti'
import './MissionCompleteScreen.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.5 },
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

export default function MissionCompleteScreen() {
  return (
    <motion.div
      className="mission-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Confetti active={true} />

      <motion.div className="mission-gift" variants={itemVariants}>
        <div className="gift-container">
          <Gift size={56} />
          <div className="gift-glow"></div>
        </div>
      </motion.div>

      <motion.div className="mission-badge" variants={itemVariants}>
        <Star size={10} fill="currentColor" />
        <span>OPERATION COMPLETE</span>
        <Star size={10} fill="currentColor" />
      </motion.div>

      <motion.h1 className="mission-title" variants={itemVariants}>
        MISSION COMPLETE
      </motion.h1>

      <motion.p className="mission-welcome" variants={itemVariants}>
        You've unlocked every secret, Kuchki Puchki. \u2661
      </motion.p>

      <motion.div className="mission-card" variants={itemVariants}>
        <p className="mission-instructions">
          Your final destination is waiting. Open the birthday PDF and enter
          your decoded password to reveal what's inside.
        </p>
      </motion.div>

      <motion.div
        className="mission-hearts"
        variants={itemVariants}
        aria-hidden="true"
      >
        {['\uD83D\uDC9D', '\uD83C\uDF81', '\uD83C\uDF82', '\uD83C\uDF81', '\uD83D\uDC9D'].map(
          (emoji, i) => (
            <span key={i} className="mission-emoji">
              {emoji}
            </span>
          )
        )}
      </motion.div>

      <motion.p className="mission-footer" variants={itemVariants}>
        Happy Birthday, Kaddu. \u2661
      </motion.p>
    </motion.div>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Radio, Copy, Check, ChevronRight } from 'lucide-react'
import './MorseScreen.css'

const MORSE_CODE = '-... .... .- .. -. ... / -.- .. / - .- .. -. -'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.6 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

export default function MorseScreen({ onComplete }) {
  const [copied, setCopied] = useState(false)
  const [revealed, setRevealed] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MORSE_CODE)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = MORSE_CODE
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div
      className="morse-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="morse-content" variants={itemVariants}>
        <div className="morse-badge">
          <Radio size={14} />
          <span>ENCRYPTED TRANSMISSION</span>
        </div>

        <h1 className="morse-title">ONE LAST SECRET...</h1>

        <p className="morse-subtitle">
          You've made it this far, Agent K. But the final archive requires one
          last key.
        </p>
      </motion.div>

      <motion.div className="morse-card" variants={itemVariants}>
        <div className="morse-card-header">
          <span className="morse-card-dot"></span>
          <span>FINAL CREDENTIAL — MORSE TRANSMISSION</span>
        </div>

        <div
          className="morse-code-display"
          role="img"
          aria-label="Morse code transmission"
        >
          <code className="morse-code-text">{MORSE_CODE}</code>
        </div>

        <button
          className="copy-button"
          onClick={handleCopy}
          aria-label={copied ? 'Copied!' : 'Copy Morse code'}
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy Morse Code</span>
            </>
          )}
        </button>

        <div className="morse-hint">
          <p>
            Decode the dots and dashes. The final key must be entered in{' '}
            <strong>ALL CAPS</strong>, with <strong>NO SPACEBAR</strong>.
          </p>
        </div>
      </motion.div>

      <motion.div className="morse-action" variants={itemVariants}>
        <button className="reveal-button" onClick={() => setRevealed(true)}>
          I'VE GOT THE PASSWORD ♡
          <ChevronRight size={16} />
        </button>

        {revealed && (
          <motion.div
            className="encouraging-message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>
              The final archive is waiting for you. Go unlock your birthday
              surprise! ✨
            </p>
            <button className="final-proceed-button" onClick={onComplete}>
              COMPLETE THE MISSION ♡
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

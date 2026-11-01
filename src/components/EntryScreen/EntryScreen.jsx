import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Lock, Sparkles } from 'lucide-react'
import './EntryScreen.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    filter: 'blur(10px)',
    transition: { duration: 0.8, ease: 'easeInOut' },
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

export default function EntryScreen({ onSuccess }) {
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = answer.trim().toLowerCase()
    if (trimmed === 'kaddu') {
      setIsSuccess(true)
      setError('')
      setTimeout(() => onSuccess(), 2800)
    } else {
      setError("Hmm... Agent K, you know this one! Try again, pookie. \u2661")
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
  }

  return (
    <motion.div
      className="entry-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {isSuccess && (
        <div className="success-overlay">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="success-heart"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                fontSize: `${1 + Math.random() * 2}rem`,
              }}
            >
              {['\u2661', '\u2726', '\uD83D\uDC95', '\u2727', '\u2665'][i % 5]}
            </span>
          ))}
        </div>
      )}

      <motion.div className="entry-content" variants={itemVariants}>
        <div className="entry-badge">
          <Lock size={14} />
          <span>CLASSIFIED</span>
        </div>

        <h1 className="entry-title">
          KADDU<br />PROTOCOL
        </h1>

        <p className="entry-subtitle">
          A tiny secret mission, made for one very special person.
        </p>

        <div className="entry-illustration">
          <div className="glow-heart">
            <Heart size={48} fill="currentColor" />
          </div>
          <div className="glow-ring"></div>
          <div className="glow-ring glow-ring-2"></div>
        </div>

        <p className="entry-supporting">
          Hello, Agent K. Your birthday archive is waiting to be unlocked.
        </p>
      </motion.div>

      <motion.div
        className={`question-card ${shake ? 'shake' : ''}`}
        variants={itemVariants}
      >
        <div className="card-header">
          <Sparkles size={16} />
          <span>FIRST SECURITY CHECK</span>
        </div>

        <p className="card-hint">
          A little hint: It's the name everyone knows you by. The name that
          makes this entire mission possible.
        </p>

        <form onSubmit={handleSubmit} className="question-form">
          <label htmlFor="agent-name" className="question-label">
            What is the subject's name?
          </label>
          <input
            id="agent-name"
            type="text"
            className="question-input"
            placeholder="Enter your answer..."
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value)
              setError('')
            }}
            autoComplete="off"
            disabled={isSuccess}
            aria-describedby={error ? 'error-message' : undefined}
          />
          {error && (
            <motion.p
              id="error-message"
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
            >
              {error}
            </motion.p>
          )}
          <button
            type="submit"
            className="submit-button"
            disabled={isSuccess || !answer.trim()}
          >
            {isSuccess ? 'UNLOCKED \u2661' : 'UNLOCK THE FIRST SECRET \u2661'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}

/**
 * Cute procedural audio synthesizer using Web Audio API.
 * Needs zero external MP3 assets, zero load delay, zero 404s!
 */
class CuteSoundEffects {
  constructor() {
    this.ctx = null
    this.enabled = true
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  // Cute magical chime / sparkle chime
  playHeartChime() {
    this.init()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    // Pentatonic happy chime frequencies
    const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
    const baseFreq = notes[Math.floor(Math.random() * notes.length)]

    // Primary bell tone
    const osc1 = this.ctx.createOscillator()
    const gain1 = this.ctx.createGain()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(baseFreq, now)
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.18)

    gain1.gain.setValueAtTime(0.2, now)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5)

    osc1.connect(gain1)
    gain1.connect(this.ctx.destination)

    osc1.start(now)
    osc1.stop(now + 0.5)

    // Sparkle harmonic
    const osc2 = this.ctx.createOscillator()
    const gain2 = this.ctx.createGain()
    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(baseFreq * 2, now + 0.05)
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 2.5, now + 0.3)

    gain2.gain.setValueAtTime(0.12, now + 0.05)
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45)

    osc2.connect(gain2)
    gain2.connect(this.ctx.destination)

    osc2.start(now + 0.05)
    osc2.stop(now + 0.45)
  }

  // Soft cute "pop / bubble" tone on hover
  playSoftPop() {
    this.init()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(420, now)
    osc.frequency.exponentialRampToValueAtTime(840, now + 0.08)

    gain.gain.setValueAtTime(0.07, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc.stop(now + 0.12)
  }

  // Cute lub-dub heartbeat sound
  playHeartbeat() {
    this.init()
    if (!this.ctx) return

    const now = this.ctx.currentTime

    // Lub
    const osc1 = this.ctx.createOscillator()
    const gain1 = this.ctx.createGain()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(85, now)
    osc1.frequency.exponentialRampToValueAtTime(45, now + 0.12)
    gain1.gain.setValueAtTime(0.25, now)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.14)
    osc1.connect(gain1)
    gain1.connect(this.ctx.destination)
    osc1.start(now)
    osc1.stop(now + 0.14)

    // Dub
    const osc2 = this.ctx.createOscillator()
    const gain2 = this.ctx.createGain()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(95, now + 0.16)
    osc2.frequency.exponentialRampToValueAtTime(50, now + 0.28)
    gain2.gain.setValueAtTime(0.2, now + 0.16)
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
    osc2.connect(gain2)
    gain2.connect(this.ctx.destination)
    osc2.start(now + 0.16)
    osc2.stop(now + 0.3)
  }
}

export const cuteSound = new CuteSoundEffects()

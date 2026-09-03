import { Suspense, lazy, useState, useEffect } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Magnetic, useCursor } from './Cursor'
import { useIsMobile } from '../hooks/useIsMobile'
import ErrorBoundary from './ErrorBoundary'
import { supportsWebGL } from '../hooks/webgl'

const ThreeScene = lazy(() => import('./ThreeScene'))

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const HEADLINE_WORDS = ['COURAGE', 'AGBAVOR', '.']

const ROLES = [
  'Full-Stack Developer',
  'Operations Specialist',
  'Systems Thinker',
  'Problem Untangler',
]

function RoleBadge() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2800)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '6px 14px 6px 8px',
      borderRadius: 999,
      border: '1px solid var(--color-border)',
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(8px)',
      width: 'fit-content',
      overflow: 'hidden',
    }}>
      <span style={{
        width: 8, height: 8, borderRadius: '50%',
        background: 'var(--color-lime)',
        boxShadow: '0 0 10px var(--color-lime)',
        flexShrink: 0,
        animation: 'glow-pulse 2s ease-in-out infinite',
      }} />
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: EASE }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.06em',
            color: 'var(--color-text-muted)',
            whiteSpace: 'nowrap',
          }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

function CountUpStat({ value, label }: { value: string; label: string }) {
  const [displayed, setDisplayed] = useState('0')
  const num = parseInt(value.replace(/\D/g, ''), 10)
  const suffix = value.replace(/[0-9]/g, '')

  useEffect(() => {
    if (isNaN(num)) { setDisplayed(value); return }
    let start = 0
    const duration = 1200
    const step = duration / num
    const timer = setInterval(() => {
      start += 1
      setDisplayed(`${start}${suffix}`)
      if (start >= num) clearInterval(timer)
    }, step)
    return () => clearInterval(timer)
  }, [num, suffix, value])

  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(28px, 4vw, 44px)',
        fontWeight: 900,
        lineHeight: 1,
        color: 'var(--color-paper)',
      }}>
        {displayed}
      </div>
      <div style={{
        marginTop: 6,
        fontSize: 10,
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-text-dim)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        {label}
      </div>
    </div>
  )
}

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const isMobile = useIsMobile()
  const { setVariant, setLabel } = useCursor()

  const portrait = (
    <motion.div
      initial={{ opacity: 0, x: 40, rotate: isMobile ? 3 : 6 }}
      animate={{ opacity: 1, x: 0, rotate: isMobile ? 3 : 6 }}
      transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
      style={{
        position: isMobile ? 'relative' : 'absolute',
        right: isMobile ? 'auto' : '7vw',
        bottom: isMobile ? 'auto' : '4rem',
        width: isMobile ? 'min(56vw, 220px)' : 'min(26vw, 320px)',
        aspectRatio: '3/4',
        margin: isMobile ? 'clamp(1.2rem, 4vw, 2rem) auto 0' : 0,
        zIndex: 5,
        border: '1px solid rgba(255,255,255,0.35)',
        borderRadius: isMobile ? '1rem' : '1.2rem',
        overflow: 'hidden',
        background: 'var(--color-base-2)',
        boxShadow: isMobile ? '10px 10px 0 var(--color-pink)' : '16px 16px 0 var(--color-pink)',
      }}
    >
      {/* Initials placeholder — swap with your real photo via src attribute */}
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(145deg, var(--color-base-2) 0%, color-mix(in srgb, var(--color-violet) 15%, var(--color-base-2)) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.4,
        }} />
        {/* Initials */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 10vw, 5rem)',
          fontWeight: 900,
          letterSpacing: '-0.06em',
          lineHeight: 1,
          background: 'linear-gradient(135deg, var(--color-blue), var(--color-violet), var(--color-pink))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          position: 'relative',
          zIndex: 1,
        }}>
          CA
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '0.15em',
          color: 'var(--color-text-dim)',
          textTransform: 'uppercase',
          marginTop: 10,
          position: 'relative',
          zIndex: 1,
        }}>
          Photo coming soon
        </div>
        {/* Corner accent */}
        <div style={{
          position: 'absolute', bottom: 16, right: 16,
          width: 28, height: 28, borderRadius: '50%',
          background: 'var(--color-lime)',
          opacity: 0.9,
          boxShadow: '0 0 20px var(--color-lime)',
          zIndex: 2,
        }} />
      </div>
    </motion.div>
  )

  return (
    <section
      id="top"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Three.js Canvas Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.7 }}>
        <ErrorBoundary>
          <Suspense fallback={null}>
            {!prefersReduced && supportsWebGL() && <ThreeScene />}
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Portrait (absolute, desktop) */}
      {!isMobile && portrait}

      {/* Content */}
      <div
        className="max-frame"
        style={{
          position: 'relative',
          zIndex: 5,
          paddingTop: isMobile ? '6rem' : '7rem',
          paddingBottom: isMobile ? '7rem' : '4rem',
        }}
      >
        {/* Eyebrow kicker */}
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="section-kicker"
        >
          ACCRA, GHANA · BUILDING WITH INTENT
        </motion.p>

        {/* Giant Headline */}
        <motion.h1
          initial="hidden"
          animate="visible"
          aria-label="Courage Agbavor, Above All"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4.2rem, 12vw, 10.5rem)',
            lineHeight: 0.82,
            letterSpacing: '-0.06em',
            maxWidth: 1000,
            margin: '0.9rem 0 1.4rem',
          }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 70, rotate: 3 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.13, ease: EASE }}
              style={{
                display: 'inline-block',
                color: 'var(--color-paper)',
                fontWeight: 900,
              }}
            >
              {word === 'AGBAVOR'
                ? <span className="gradient-text glitch-text" data-text={word}>{word}</span>
                : word}
              {word !== '.' && ' '}
            </motion.span>
          ))}
        </motion.h1>

        {/* Portrait (in-flow, mobile) */}
        {isMobile && portrait}

        {/* Role badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ marginBottom: '1rem' }}
        >
          <RoleBadge />
        </motion.div>

        {/* Role description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72 }}
          style={{
            maxWidth: 520,
            fontSize: 'clamp(1rem, 1.9vw, 1.25rem)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.6,
          }}
        >
          Full-Stack Developer &amp; Operations Specialist based in Accra. I take tangled
          systems and make them feel straightforward.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.88 }}
          style={{ marginTop: '1.8rem', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}
        >
          <Magnetic strength={0.25}>
            <a
              href="#projects"
              onMouseEnter={() => { setVariant('button'); setLabel('') }}
              onMouseLeave={() => setVariant('default')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                borderRadius: 999,
                padding: '0.95rem 1.5rem',
                border: '1px solid rgba(200,255,61,0.5)',
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
                background: 'var(--color-blue)',
                boxShadow: '0 0 30px rgba(40,121,255,0.4)',
                cursor: 'none',
                transition: 'box-shadow 0.25s ease',
              }}
            >
              Explore Selected Work
              <span style={{ fontSize: 14 }}>↘</span>
            </a>
          </Magnetic>

          <Magnetic strength={0.2}>
            <a
              href="#contact"
              onMouseEnter={() => { setVariant('link'); setLabel('') }}
              onMouseLeave={() => setVariant('default')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.95rem 1.5rem',
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                border: '1px solid var(--color-border)',
                borderRadius: 999,
                cursor: 'none',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              Get in touch <span>→</span>
            </a>
          </Magnetic>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          style={{ display: 'flex', gap: 44, marginTop: '3.5rem', flexWrap: 'wrap' }}
          className="stats-animate"
        >
          {[
            { value: '3+', label: 'Years Experience' },
            { value: '15+', label: 'Projects Delivered' },
            { value: 'L5', label: 'NCC Diploma' },
          ].map((stat) => (
            <CountUpStat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: 10, color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 1.5,
            height: 40,
            background: 'linear-gradient(180deg, color-mix(in srgb, var(--color-paper) 40%, transparent), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}

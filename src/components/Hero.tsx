import { Suspense, lazy } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Magnetic, useCursor } from './Cursor'

const ThreeScene = lazy(() => import('./ThreeScene'))

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const HEADLINE_WORDS = ['COURAGE', 'AGBAVOR', '.']

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const { setVariant, setLabel } = useCursor()

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
        <Suspense fallback={null}>
          {!prefersReduced && <ThreeScene />}
        </Suspense>
      </div>

      {/* Portrait */}
      <motion.div
        initial={{ opacity: 0, x: 40, rotate: 6 }}
        animate={{ opacity: 1, x: 0, rotate: 6 }}
        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        style={{
          position: 'absolute',
          right: '7vw',
          bottom: '4rem',
          width: 'min(27vw, 340px)',
          aspectRatio: '3/4',
          transform: 'rotate(6deg)',
          zIndex: 2,
          border: '1px solid rgba(255,255,255,0.4)',
          borderRadius: '1.2rem',
          overflow: 'hidden',
          background: 'var(--color-base-2)',
          boxShadow: '14px 14px 0 var(--color-pink)',
        }}
      >
        <img
          src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
          alt="Portrait"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'saturate(1.1) contrast(1.05)',
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="max-frame" style={{ position: 'relative', zIndex: 5, paddingTop: '7rem', paddingBottom: '4rem' }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
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
            margin: '0.9rem 0 1.8rem',
          }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 70, rotate: 3 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.14, ease: EASE }}
              style={{
                display: 'inline-block',
                color: 'var(--color-paper)',
                fontWeight: 900,
              }}
            >
              {word === 'AGBAVOR' ? <span className="gradient-text">{word}</span> : word}
              {word !== '.' && ' '}
            </motion.span>
          ))}
        </motion.h1>

        {/* Role line */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{
            maxWidth: 560,
            fontSize: 'clamp(1rem, 2vw, 1.35rem)',
            color: '#d8d3e7',
            lineHeight: 1.55,
          }}
        >
          Full-Stack Developer &amp; Operations Specialist. Turning knotty systems into
          sharp, human-friendly experiences.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          style={{ marginTop: '2rem' }}
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
                padding: '1rem 1.35rem',
                border: '1px solid rgba(200,255,61,0.55)',
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
                background: 'var(--color-blue)',
                boxShadow: '0 0 30px rgba(40,121,255,0.4)',
                cursor: 'none',
                transition: 'box-shadow 0.25s ease, transform 0.2s ease',
              }}
            >
              Explore Selected Work
              <span style={{ fontSize: 14 }}>↘</span>
            </a>
          </Magnetic>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          style={{ display: 'flex', gap: 44, marginTop: '4rem', flexWrap: 'wrap' }}
        >
          {[
            { value: '3+', label: 'Years Experience' },
            { value: '15+', label: 'Projects Delivered' },
            { value: 'L5', label: 'NCC Diploma' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'left' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 900,
                lineHeight: 1,
                color: 'var(--color-paper)',
              }}>
                {stat.value}
              </div>
              <div style={{
                marginTop: 6,
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-dim)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                {stat.label}
              </div>
            </div>
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
        <span style={{ fontSize: 11, color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 1.5,
            height: 40,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.4), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}

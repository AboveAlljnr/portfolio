import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Magnetic, useCursor } from './Cursor'

const EMAIL = 'elikplimagbavor@gmail.com'

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/courage-agbavor-5a1552349',
    color: '#2879ff',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/AboveAlljnr',
    color: '#9b5cff',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.4.6.11.82-.26.82-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.72.08-.72 1.19.08 1.82 1.22 1.82 1.22 1.06 1.82 2.78 1.3 3.46.99.1-.77.41-1.3.75-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: `mailto:${EMAIL}`,
    color: '#ff3ca6',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
]

/* ── Live local time for Accra (GMT+0) ───────────────────────────── */
function LocalClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const format = () => {
      const now = new Date()
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Accra',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }
      setTime(new Intl.DateTimeFormat('en-GB', opts).format(now))
    }
    format()
    const id = setInterval(format, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
      {time} local
    </span>
  )
}

/* ── Typewriter email ────────────────────────────────────────────── */
function TypewriterText({ text, active }: { text: string; active: boolean }) {
  const [displayed, setDisplayed] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (!active) { setDisplayed(''); return }
    let i = 0
    const interval = setInterval(() => {
      if (i <= text.length) { setDisplayed(text.slice(0, i)); i++ }
      else clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [active, text])

  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setShowCursor((p) => !p), 530)
    return () => clearInterval(id)
  }, [active])

  return (
    <span>
      {displayed}
      <span style={{ color: 'var(--color-lime)', opacity: showCursor ? 1 : 0 }}>▋</span>
    </span>
  )
}

/* ── Footer ──────────────────────────────────────────────────────── */
export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { setVariant, setLabel } = useCursor()
  const [copied, setCopied]         = useState(false)
  const [emailHovered, setEmailHovered] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <footer
      id="contact"
      ref={ref}
      style={{
        position: 'relative', zIndex: 10,
        paddingTop: 'clamp(5rem, 11vw, 10rem)',
        paddingBottom: '3rem',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="max-frame">
        <p className="section-kicker">05 / YOUR MOVE</p>

        {/* Big headline */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setVariant('text')}
          onMouseLeave={() => setVariant('default')}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.2rem, 8.5vw, 7.5rem)',
            fontWeight: 900,
            lineHeight: 0.88,
            letterSpacing: '-0.05em',
            maxWidth: 1000,
            margin: '1.1rem 0 1.4rem',
          }}
        >
          Have a knotty problem?{' '}
          <span className="gradient-text">Let's make it clearer.</span>
        </motion.h2>

        {/* Sub-copy + meta badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <p style={{
            fontSize: 18,
            color: 'var(--color-text-muted)',
            maxWidth: 500,
            lineHeight: 1.6,
          }}>
            I'm available for freelance projects, full-time roles, and collaborative
            ventures. Based in Accra — working everywhere.
          </p>

          {/* Meta info row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {/* Availability */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '6px 14px', borderRadius: 999,
              border: '1px solid rgba(200,255,61,0.35)',
              background: 'rgba(200,255,61,0.08)',
              fontFamily: 'var(--font-mono)', fontSize: 11,
              color: 'var(--color-lime)', letterSpacing: '0.05em',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: 'var(--color-lime)',
                boxShadow: '0 0 8px var(--color-lime)',
                animation: 'glow-pulse 2s ease-in-out infinite',
              }} />
              Available now
            </div>
            {/* Response time */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '6px 14px', borderRadius: 999,
              border: '1px solid var(--color-border)',
              background: 'rgba(255,255,255,0.04)',
              fontFamily: 'var(--font-mono)', fontSize: 11,
              color: 'var(--color-text-muted)', letterSpacing: '0.04em',
            }}>
              ⚡ Usually replies within 24h
            </div>
            {/* Clock */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '6px 14px', borderRadius: 999,
              border: '1px solid var(--color-border)',
              background: 'rgba(255,255,255,0.04)',
              fontFamily: 'var(--font-mono)', fontSize: 11,
              color: 'var(--color-text-dim)', letterSpacing: '0.04em',
            }}>
              🌍 Accra, GMT+0 · <LocalClock />
            </div>
          </div>
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          style={{ marginTop: '2.5rem', marginBottom: 56 }}
        >
          <Magnetic strength={0.3}>
            <a
              href={`mailto:${EMAIL}`}
              onMouseEnter={() => { setVariant('button'); setLabel("LET'S TALK") }}
              onMouseLeave={() => setVariant('default')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 14,
                padding: '1rem 2rem',
                borderRadius: 999,
                fontFamily: 'var(--font-body)',
                fontSize: 15, fontWeight: 700,
                letterSpacing: '0.04em', textTransform: 'uppercase',
                color: '#fff',
                background: 'var(--color-pink)',
                boxShadow: '0 0 30px rgba(255,60,166,0.4)',
                cursor: 'none',
                transition: 'box-shadow 0.25s ease',
              }}
            >
              Start a Conversation
              <span style={{ fontSize: 16 }}>✦</span>
            </a>
          </Magnetic>

          {/* Terminal-style email copy */}
          <div style={{
            margin: '18px 0 0',
            display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-lime)' }}>
              <span style={{ opacity: 0.55 }}>$</span> contact
            </div>
            <motion.button
              onClick={copyEmail}
              onMouseEnter={() => { setEmailHovered(true); setVariant('link') }}
              onMouseLeave={() => { setEmailHovered(false); setVariant('default') }}
              whileHover={{ x: 4 }}
              style={{
                background: 'none', border: 'none',
                fontFamily: 'var(--font-mono)', fontSize: 13,
                color: copied ? 'var(--color-lime)' : emailHovered ? 'var(--color-text)' : 'var(--color-text-dim)',
                cursor: 'none', letterSpacing: '0.02em',
                transition: 'color 0.3s ease',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              <span style={{
                padding: '2px 8px', borderRadius: 4,
                background: 'rgba(200,255,61,0.08)',
                border: '1px solid rgba(200,255,61,0.2)',
                marginRight: 4,
              }}>
                <TypewriterText text={EMAIL} active={emailHovered} />
              </span>
              {copied
                ? <span style={{ color: 'var(--color-lime)' }}>✓ Copied!</span>
                : <span style={{ opacity: 0.45, fontSize: 10 }}>[copy]</span>
              }
            </motion.button>
          </div>
        </motion.div>

        {/* Social cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45 }}
          style={{
            display: 'flex', gap: 12, flexWrap: 'wrap',
            borderTop: '1px solid var(--color-border)',
            paddingTop: '1.6rem',
          }}
        >
          {SOCIAL_LINKS.map((social) => (
            <Magnetic key={social.label} strength={0.3}>
              <motion.a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => { setVariant('link'); setLabel(social.label.toUpperCase()) }}
                onMouseLeave={() => { setVariant('default'); setLabel('') }}
                whileHover={{ y: -4, borderColor: `${social.color}88` }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '10px 20px',
                  borderRadius: 12,
                  border: '1px solid var(--color-border)',
                  background: 'rgba(255,255,255,0.03)',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.05em',
                  color: 'var(--color-text-muted)',
                  cursor: 'none',
                  transition: 'color 0.2s ease, background 0.2s ease',
                  textDecoration: 'none',
                }}
              >
                <span style={{ color: social.color }}>{social.icon}</span>
                {social.label.toUpperCase()}
                <span style={{ opacity: 0.4, fontSize: 10 }}>↗</span>
              </motion.a>
            </Magnetic>
          ))}
        </motion.div>

        {/* Footer bottom bar */}
        <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '2rem', paddingTop: 24 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: 16,
          }}>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700,
              letterSpacing: '-0.02em', color: 'var(--color-paper)',
            }}>
              ABOVE ALL<span style={{ color: 'var(--color-lime)' }}>™</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-dim)' }}>
              © {new Date().getFullYear()} — Accra, Ghana
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font-mono)', fontSize: 11,
              color: 'var(--color-text-dim)',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--color-lime)',
                boxShadow: '0 0 6px var(--color-lime)',
              }} />
              Available for new work
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </footer>
  )
}
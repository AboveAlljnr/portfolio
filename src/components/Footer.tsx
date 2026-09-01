import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Magnetic, useCursor } from './Cursor'

const EMAIL = 'elikplimagbavor@gmail.com'

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/courage-agbavor-5a1552349',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/AboveAlljnr',
  },
  {
    label: 'Email',
    href: `mailto:${EMAIL}`,
  },
]

function TypewriterText({ text, active }: { text: string; active: boolean }) {
  const [displayed, setDisplayed] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (!active) {
      setDisplayed('')
      return
    }

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayed(text.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 45)

    return () => clearInterval(interval)
  }, [active, text])

  useEffect(() => {
    if (!active) return
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [active])

  return (
    <span>
      {displayed}
      <span style={{
        color: 'var(--color-lime)',
        animation: showCursor ? 'blink 1s step-end infinite' : 'none',
      }}>▋</span>
    </span>
  )
}

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { setVariant, setLabel } = useCursor()
  const [copied, setCopied] = useState(false)
  const [emailHovered, setEmailHovered] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer
      id="contact"
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 10,
        paddingTop: 'clamp(5rem, 11vw, 10rem)',
        paddingBottom: '3rem',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="max-frame">
        <p className="section-kicker">05 / YOUR MOVE</p>

        {/* Bold headline */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setVariant('text')}
          onMouseLeave={() => setVariant('default')}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.4rem, 9vw, 8rem)',
            fontWeight: 900,
            lineHeight: 0.88,
            letterSpacing: '-0.05em',
            maxWidth: 1000,
            margin: '1.1rem 0 1.6rem',
          }}
        >
          Have a knotty problem?{' '}
          <span className="gradient-text">Let's make it clearer.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{
            fontSize: 18,
            color: 'var(--color-text-muted)',
            maxWidth: 520,
            lineHeight: 1.6,
          }}
        >
          I'm available for freelance projects, full-time roles, and collaborative
          ventures. Based in Accra — working everywhere.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          style={{ marginTop: '2.5rem', marginBottom: 56 }}
        >
          <Magnetic strength={0.3}>
            <a
              href={`mailto:${EMAIL}`}
              onMouseEnter={() => { setVariant('button'); setLabel("LET'S TALK") }}
              onMouseLeave={() => setVariant('default')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 14,
                padding: '1rem 1.9rem',
                borderRadius: 999,
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#fff',
                background: 'var(--color-pink)',
                boxShadow: '0 0 30px rgba(255,60,166,0.35)',
                cursor: 'none',
                transition: 'box-shadow 0.25s ease',
              }}
            >
              Start a Conversation
              <span style={{ fontSize: 15 }}>✦</span>
            </a>
          </Magnetic>

          {/* Typewriter email with copy */}
          <div style={{
            margin: '20px 0 0',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}>
            {/* Terminal-style prompt */}
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              color: 'var(--color-lime)',
            }}>
              <span style={{ opacity: 0.6 }}>$</span> contact
            </div>
            
            {/* Email typewriter */}
            <motion.button
              onClick={copyEmail}
              onMouseEnter={() => { setEmailHovered(true); setVariant('link') }}
              onMouseLeave={() => { setEmailHovered(false); setVariant('default') }}
              whileHover={{ x: 4 }}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                color: copied ? 'var(--color-lime)' : emailHovered ? 'var(--color-text)' : 'var(--color-text-dim)',
                cursor: 'none',
                letterSpacing: '0.02em',
                transition: 'color 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span style={{
                padding: '2px 8px',
                borderRadius: 4,
                background: 'rgba(200,255,61,0.1)',
                border: '1px solid rgba(200,255,61,0.2)',
                marginRight: 4,
              }}>
                <TypewriterText text={EMAIL} active={emailHovered} />
              </span>
              {copied ? (
                <span style={{ color: 'var(--color-lime)' }}>✓</span>
              ) : (
                <span style={{ opacity: 0.5, fontSize: 11 }}>[copy]</span>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{
            display: 'flex',
            gap: 32,
            flexWrap: 'wrap',
            borderTop: '1px solid var(--color-border)',
            paddingTop: '1.5rem',
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
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                style={{
                  display: 'inline-flex',
                  gap: 8,
                  alignItems: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.05em',
                  color: 'var(--color-text-muted)',
                  cursor: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                <span style={{ color: 'var(--color-pink)' }}>↗</span>
                {social.label.toUpperCase()}
              </motion.a>
            </Magnetic>
          ))}
        </motion.div>

        {/* Divider + copyright */}
        <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '2.5rem', paddingTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--color-paper)',
            }}>
              ABOVE ALL<span style={{ color: 'var(--color-lime)' }}>™</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-dim)' }}>
              © {new Date().getFullYear()} — Accra, Ghana
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-dim)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-lime)', boxShadow: '0 0 6px var(--color-lime)' }} />
              Available for new work
            </div>
          </div>
        </div>
      </div>

      {/* Cursor blink animation */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </footer>
  )
}
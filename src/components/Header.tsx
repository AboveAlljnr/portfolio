import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCursor, Magnetic } from './Cursor'
import { useIsMobile } from '../hooks/useIsMobile'

const NAV_LINKS = [
  { label: 'Profile',  href: '#bio'      },
  { label: 'About',    href: '#about'    },
  { label: 'Projects', href: '#projects' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const { setVariant, setLabel } = useCursor()

  useEffect(() => setMenuOpen(false), [isMobile])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        padding: scrolled ? (isMobile ? '12px 18px' : '12px 40px') : (isMobile ? '16px 18px' : '20px 40px'),
        background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        transition: 'padding 0.4s ease, background 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand */}
        <Magnetic strength={0.2}>
          <a
            href="#top"
            onMouseEnter={() => { setVariant('link'); setLabel('') }}
            onMouseLeave={() => { setVariant('default'); setLabel('') }}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              fontSize: 16,
              color: 'var(--color-paper)',
            }}
          >
            ABOVE ALL<span style={{ color: 'var(--color-lime)' }}>™</span>
          </a>
        </Magnetic>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {!isMobile && NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <Magnetic key={link.href} strength={0.2}>
                <a
                  href={link.href}
                  onMouseEnter={() => { setVariant('link'); setLabel('') }}
                  onMouseLeave={() => setVariant('default')}
                  style={{
                    position: 'relative',
                    padding: '8px 16px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--color-lime)' : 'var(--color-text-dim)',
                    transition: 'color 0.25s ease',
                  }}
                >
                  {link.label}
                  {/* Creative underline effect */}
                  <span style={{
                    position: 'absolute',
                    bottom: 4,
                    left: '50%',
                    width: isActive ? '80%' : '0%',
                    height: 1,
                    background: 'linear-gradient(90deg, var(--color-lime), var(--color-violet))',
                    transform: 'translateX(-50%)',
                    transition: 'width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
                    opacity: isActive ? 1 : 0,
                    boxShadow: isActive ? '0 0 8px var(--color-lime)' : 'none',
                  }} />
                </a>
              </Magnetic>
            )
          })}

          {/* CTA */}
          {!isMobile && (
            <Magnetic strength={0.25}>
              <a
                href="#contact"
                onMouseEnter={() => { setVariant('button'); setLabel('') }}
                onMouseLeave={() => setVariant('default')}
                style={{
                  marginLeft: 12,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 22px',
                  borderRadius: 999,
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ink)',
                  background: 'var(--color-lime)',
                  cursor: 'none',
                  boxShadow: '0 0 24px rgba(200,255,61,0.2)',
                  transition: 'box-shadow 0.25s ease',
                }}
              >
                Let's Talk
                <span style={{ fontSize: 14 }}>↗</span>
              </a>
            </Magnetic>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 5,
                width: 40,
                height: 40,
                padding: 10,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {[0, 1].map((i) => (
                <span key={i} style={{
                  display: 'block',
                  width: '100%',
                  height: 2,
                  borderRadius: 2,
                  background: 'var(--color-paper)',
                  transform: menuOpen && i === 0 ? 'translateY(3.5px) rotate(45deg)' : menuOpen && i === 1 ? 'translateY(-3.5px) rotate(-45deg)' : 'none',
                  transition: 'transform 0.3s ease',
                }} />
              ))}
            </button>
          )}
        </nav>
      </div>

      {/* Available badge (desktop only) */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute',
            bottom: -18,
            left: '50%',
            transform: 'translateX(-50%)',
            display: scrolled ? 'none' : 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 12px',
            background: 'rgba(200,255,61,0.12)',
            border: '1px solid rgba(200,255,61,0.35)',
            borderRadius: 20,
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-lime)',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--color-lime)',
            boxShadow: '0 0 8px var(--color-lime)',
            animation: 'glow-pulse 2s ease-in-out infinite',
          }} />
          Available for new projects
        </div>
      )}

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              top: 0,
              zIndex: -1,
              background: 'color-mix(in srgb, var(--color-base) 96%, transparent)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '0 32px',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.07 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.4rem, 12vw, 3.4rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  color: activeSection === link.href.slice(1) ? 'var(--color-lime)' : 'var(--color-paper)',
                  padding: '0.3rem 0',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{
                marginTop: '2rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 24px',
                borderRadius: 999,
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
                background: 'var(--color-lime)',
              }}
            >
              Let's Talk <span>↗</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

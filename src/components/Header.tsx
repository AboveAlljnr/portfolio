import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCursor, Magnetic } from './Cursor'
import { useIsMobile } from '../hooks/useIsMobile'

const NAV_LINKS = [
  { label: 'Profile',  href: '#bio'      },
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
]

export default function Header() {
  const [scrolled, setScrolled]           = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen]           = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const isMobile = useIsMobile()
  const { setVariant, setLabel } = useCursor()

  useEffect(() => setMenuOpen(false), [isMobile])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const total  = document.body.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? window.scrollY / total : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) }) },
      { threshold: 0.25 }
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
        top: 0, left: 0, right: 0,
        zIndex: 500,
        padding: scrolled
          ? (isMobile ? '10px 18px' : '10px 40px')
          : (isMobile ? '16px 18px' : '20px 40px'),
        background: scrolled ? 'rgba(10,10,15,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        transition: 'padding 0.4s ease, background 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* ── Scroll progress bar ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0, left: 0,
          height: 2,
          width: `${scrollProgress * 100}%`,
          background: 'linear-gradient(90deg, var(--color-blue), var(--color-violet), var(--color-pink), var(--color-lime))',
          zIndex: 10,
          transformOrigin: 'left',
        }}
        transition={{ duration: 0.05 }}
      />

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

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                    padding: '8px 14px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--color-lime)' : 'var(--color-text-dim)',
                    transition: 'color 0.25s ease',
                  }}
                >
                  {link.label}
                  <span style={{
                    position: 'absolute',
                    bottom: 4,
                    left: '50%',
                    width: isActive ? '70%' : '0%',
                    height: 1,
                    background: 'linear-gradient(90deg, var(--color-lime), var(--color-violet))',
                    transform: 'translateX(-50%)',
                    transition: 'width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    opacity: isActive ? 1 : 0,
                    boxShadow: isActive ? '0 0 8px var(--color-lime)' : 'none',
                  }} />
                </a>
              </Magnetic>
            )
          })}

          {/* Desktop CTA */}
          {!isMobile && (
            <Magnetic strength={0.25}>
              <a
                href="#contact"
                onMouseEnter={() => { setVariant('button'); setLabel('') }}
                onMouseLeave={() => setVariant('default')}
                style={{
                  marginLeft: 10,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '9px 20px',
                  borderRadius: 999,
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ink)',
                  background: 'var(--color-lime)',
                  cursor: 'none',
                  boxShadow: '0 0 24px rgba(200,255,61,0.25)',
                  transition: 'box-shadow 0.25s ease',
                }}
              >
                Let's Talk <span style={{ fontSize: 13 }}>↗</span>
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
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                gap: 5, width: 40, height: 40, padding: 10,
                background: 'transparent', border: 'none', cursor: 'pointer',
              }}
            >
              {[0, 1].map((i) => (
                <span key={i} style={{
                  display: 'block', width: '100%', height: 2, borderRadius: 2,
                  background: 'var(--color-paper)',
                  transform: menuOpen && i === 0 ? 'translateY(3.5px) rotate(45deg)'
                            : menuOpen && i === 1 ? 'translateY(-3.5px) rotate(-45deg)'
                            : 'none',
                  transition: 'transform 0.3s ease',
                }} />
              ))}
            </button>
          )}
        </nav>
      </div>

      {/* Available badge — desktop only, hidden once scrolled */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          bottom: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: scrolled ? 'none' : 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 12px',
          background: 'rgba(200,255,61,0.1)',
          border: '1px solid rgba(200,255,61,0.3)',
          borderRadius: 20,
          fontSize: 10,
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-lime)',
          letterSpacing: '0.06em',
          whiteSpace: 'nowrap',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--color-lime)',
            boxShadow: '0 0 8px var(--color-lime)',
            animation: 'glow-pulse 2s ease-in-out infinite',
          }} />
          Available for new projects
        </div>
      )}

      {/* ── Mobile slide-in drawer ── */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed', inset: 0, top: 0, zIndex: -2,
                background: 'rgba(10,10,15,0.6)',
                backdropFilter: 'blur(4px)',
              }}
            />
            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              style={{
                position: 'fixed',
                top: 0, right: 0, bottom: 0,
                width: 'min(80vw, 320px)',
                zIndex: -1,
                background: 'color-mix(in srgb, var(--color-base-2) 98%, transparent)',
                borderLeft: '1px solid var(--color-border)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 36px',
                gap: 0,
              }}
            >
              {/* Drawer brand */}
              <div style={{ marginBottom: 40, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, color: 'var(--color-lime)' }}>
                ABOVE ALL™
              </div>

              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, type: 'spring', stiffness: 300, damping: 28 }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.6rem, 8vw, 2.2rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.04em',
                    color: activeSection === link.href.slice(1) ? 'var(--color-lime)' : 'var(--color-paper)',
                    padding: '0.45rem 0',
                    borderBottom: '1px solid var(--color-border)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {link.label}
                  <span style={{ fontSize: '1rem', opacity: 0.4 }}>→</span>
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
                style={{
                  marginTop: '2.5rem',
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '13px 26px', borderRadius: 999,
                  fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700,
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                  color: 'var(--color-ink)', background: 'var(--color-lime)',
                  alignSelf: 'flex-start',
                }}
              >
                Let's Talk <span>↗</span>
              </motion.a>

              {/* Available badge inside drawer */}
              <div style={{
                marginTop: 28, display: 'flex', alignItems: 'center', gap: 8,
                fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-lime)',
                letterSpacing: '0.06em',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--color-lime)', boxShadow: '0 0 6px var(--color-lime)',
                  animation: 'glow-pulse 2s ease-in-out infinite',
                }} />
                Available for new work
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCursor, Magnetic } from './Cursor'

const NAV_LINKS = [
  { label: 'Profile',  href: '#bio'      },
  { label: 'About',    href: '#about'    },
  { label: 'Projects', href: '#projects' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { setVariant, setLabel } = useCursor()

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
        padding: scrolled ? '12px 40px' : '20px 40px',
        background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
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
          {NAV_LINKS.map((link) => {
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
                </a>
              </Magnetic>
            )
          })}

          {/* CTA */}
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
        </nav>

        {/* Available badge */}
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
      </div>
    </motion.header>
  )
}

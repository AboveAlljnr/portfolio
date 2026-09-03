import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCursor } from './Cursor'
import { useIsMobile } from '../hooks/useIsMobile'

/* ── Skill data ──────────────────────────────────────────────────── */
const BENTO_TILES = [
  {
    id: 'fullstack',
    num: '01',
    title: 'Full-Stack Development',
    sub: 'React · Next.js · TypeScript · Node.js',
    desc: 'End-to-end web systems — from architecture to deployment.',
    bg: 'var(--color-accent-1)',
    dark: false,
    colSpan: 5,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'backend',
    num: '02',
    title: 'Back-End & APIs',
    sub: 'REST · GraphQL · PostgreSQL · Redis',
    desc: 'Scalable server logic and performant data layers.',
    bg: 'var(--color-accent-3)',
    dark: false,
    colSpan: 3,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    ),
  },
  {
    id: 'infosystems',
    num: '03',
    title: 'Information Systems',
    sub: 'ERP · Data Modelling · Process Design',
    desc: 'Aligning technology with business workflows.',
    bg: 'var(--color-accent-2)',
    dark: false,
    colSpan: 4,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: 'pm',
    num: '04',
    title: 'IT Project Management',
    sub: 'Agile · Scrum · CI/CD · Delivery',
    desc: 'Keeping cross-functional teams pointed the same direction.',
    bg: 'var(--color-accent-4)',
    dark: false,
    colSpan: 4,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
  {
    id: 'js',
    num: '05',
    title: 'JavaScript · Web Systems',
    sub: 'Vite · Webpack · Docker · AWS · Linux',
    desc: 'The full build pipeline — local to cloud.',
    bg: 'var(--color-tile-dark)',
    dark: true,
    colSpan: 5,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" /><line x1="12" y1="22" x2="12" y2="15.5" /><polyline points="22 8.5 12 15.5 2 8.5" />
      </svg>
    ),
  },
  {
    id: 'ops',
    num: '06',
    title: 'Operations Thinking',
    sub: 'Automation · Analytics · Reporting',
    desc: 'Finding the 20% of friction causing 80% of pain.',
    bg: 'var(--color-accent-5)',
    dark: false,
    colSpan: 3,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
      </svg>
    ),
  },
]

const MARQUEE_ITEMS_A = [
  'React', 'TypeScript', 'Node.js', 'Python', 'Next.js', 'PostgreSQL', 'MongoDB',
  'Docker', 'Git', 'REST APIs', 'GraphQL', 'Tailwind CSS',
]
const MARQUEE_ITEMS_B = [
  'Framer Motion', 'Three.js', 'Express', 'Prisma', 'Redis', 'Agile / Scrum',
  'Linux', 'CI/CD', 'AWS', 'ERP Systems', 'Webpack', 'Vite', 'Figma',
]

/* ── Bento Tile ──────────────────────────────────────────────────── */
function BentoTile({ tile, index }: { tile: typeof BENTO_TILES[0]; index: number }) {
  const { setVariant } = useCursor()
  const isMobile = useIsMobile()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const dark = tile.dark

  const fg    = dark ? 'var(--color-paper)' : 'var(--color-ink)'
  const muted = dark ? 'rgba(255,255,255,0.6)' : 'rgba(10,10,15,0.55)'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => { setHovered(true); setVariant('text') }}
      onMouseLeave={() => { setHovered(false); setVariant('default') }}
      style={{
        gridColumn: `span ${isMobile ? 12 : tile.colSpan}`,
        minHeight: 190,
        padding: '1.6rem',
        borderRadius: '1.2rem',
        background: tile.bg,
        color: fg,
        cursor: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.35s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.35s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.4)' : '0 6px 24px rgba(0,0,0,0.25)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background number ghost */}
      <div style={{
        position: 'absolute',
        right: 12,
        bottom: -8,
        fontFamily: 'var(--font-display)',
        fontSize: '5.5rem',
        fontWeight: 900,
        lineHeight: 1,
        color: dark ? 'rgba(255,255,255,0.06)' : 'rgba(10,10,15,0.07)',
        pointerEvents: 'none',
        userSelect: 'none',
        letterSpacing: '-0.06em',
        transition: 'opacity 0.3s ease',
      }}>
        {tile.num}
      </div>

      {/* Top row: number + icon */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.7rem', color: muted }}>
          {tile.num}
        </span>
        <span style={{ opacity: dark ? 0.85 : 0.8, color: fg }}>
          {tile.icon}
        </span>
      </div>

      {/* Bottom: title + sub-skills + description */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.15rem, 2.2vw, 1.85rem)',
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          fontWeight: 900,
          marginBottom: 6,
        }}>
          {tile.title}
        </h3>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.06em',
          color: muted,
          marginBottom: hovered ? 8 : 0,
          transition: 'margin 0.3s ease',
        }}>
          {tile.sub}
        </div>
        {/* Desc — slides in on hover */}
        <motion.div
          initial={false}
          animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <p style={{ fontSize: 12.5, lineHeight: 1.55, color: muted, marginTop: 4 }}>
            {tile.desc}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ── Marquee Strip ───────────────────────────────────────────────── */
function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 0,
        animation: `marquee${reverse ? '-reverse' : ''} 30s linear infinite`,
        width: 'max-content',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
      onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
    >
      {[...items, ...items].map((item, i) => (
        <div
          key={i}
          style={{
            display: 'flex', alignItems: 'center', gap: 16,
            padding: '0 18px',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--color-text-muted)',
            whiteSpace: 'nowrap',
          }}
        >
          {item}
          <span style={{ color: 'var(--color-lime)', opacity: 0.7 }}>·</span>
        </div>
      ))}
    </div>
  )
}

/* ── Skills Section ──────────────────────────────────────────────── */
export default function Skills() {
  const headerRef = useRef(null)
  const isInView  = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section
      id="skills"
      style={{
        position: 'relative',
        zIndex: 10,
        paddingTop: 'clamp(5rem, 11vw, 10rem)',
        paddingBottom: '3rem',
        maxWidth: 1280,
        margin: '0 auto',
      }}
    >
      <div className="max-frame">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <p className="section-kicker">02 / TOOLKIT</p>
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            A colourful stack for<br />complex problems.
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: '1rem' }}>
          {BENTO_TILES.map((tile, i) => (
            <BentoTile key={tile.id} tile={tile} index={i} />
          ))}
        </div>

        {/* Dual marquee strip */}
        <div style={{
          marginTop: 52,
          borderRadius: 14,
          background: 'color-mix(in srgb, var(--color-paper) 4%, transparent)',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Left/right fade masks */}
          {(['left', 'right'] as const).map((side) => (
            <div key={side} style={{
              position: 'absolute', top: 0, bottom: 0,
              [side]: 0, width: 80,
              background: `linear-gradient(to ${side === 'left' ? 'right' : 'left'}, var(--color-base), transparent)`,
              zIndex: 2,
            }} />
          ))}

          {/* Row A — left to right */}
          <div style={{ padding: '12px 0', borderBottom: '1px solid var(--color-border)', overflow: 'hidden' }}>
            <MarqueeRow items={MARQUEE_ITEMS_A} />
          </div>
          {/* Row B — right to left */}
          <div style={{ padding: '12px 0', overflow: 'hidden' }}>
            <MarqueeRow items={MARQUEE_ITEMS_B} reverse />
          </div>
        </div>
      </div>
    </section>
  )
}

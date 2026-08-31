import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCursor } from './Cursor'

const BENTO_TILES = [
  {
    id: 'fullstack',
    num: '01',
    title: 'Full-Stack Development',
    bg: '#2879ff',
    colSpan: 5,
  },
  {
    id: 'backend',
    num: '02',
    title: 'Back-End Web Development',
    bg: '#ff3ca6',
    colSpan: 3,
  },
  {
    id: 'infosystems',
    num: '03',
    title: 'Information Systems',
    bg: '#9b5cff',
    colSpan: 4,
  },
  {
    id: 'pm',
    num: '04',
    title: 'IT Project Management',
    bg: '#c8ff3d',
    colSpan: 4,
  },
  {
    id: 'js',
    num: '05',
    title: 'JavaScript · Web Systems',
    bg: '#172247',
    colSpan: 5,
  },
  {
    id: 'ops',
    num: '06',
    title: 'Operations Thinking',
    bg: '#ff7a2f',
    colSpan: 3,
  },
]

const MARQUEE_ITEMS = [
  'React', 'TypeScript', 'Node.js', 'Python', 'Next.js', 'PostgreSQL', 'MongoDB',
  'Docker', 'Git', 'REST APIs', 'GraphQL', 'Tailwind CSS', 'Figma', 'GSAP',
  'Framer Motion', 'Three.js', 'Express', 'Prisma', 'Redis', 'Agile / Scrum',
  'Linux', 'CI/CD', 'AWS', 'ERP Systems', 'Webpack', 'Vite',
]

function isDark(bg: string) {
  return bg === '#172247'
}

function BentoTile({ tile, index }: { tile: typeof BENTO_TILES[0]; index: number }) {
  const { setVariant } = useCursor()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const dark = isDark(tile.bg)

  const fg = dark ? '#ffffff' : '#0a0a0f'
  const muted = dark ? 'rgba(255,255,255,0.7)' : 'rgba(10,10,15,0.6)'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setVariant('text')}
      onMouseLeave={() => setVariant('default')}
      style={{
        gridColumn: `span ${tile.colSpan}`,
        minHeight: 175,
        padding: '1.5rem',
        borderRadius: '1.2rem',
        background: tile.bg,
        color: fg,
        cursor: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.35s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.35s ease',
        boxShadow: '0 6px 24px rgba(0,0,0,0.3)',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: '0.72rem',
        color: muted,
      }}>
        {tile.num}
      </span>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.3rem, 2.4vw, 2.05rem)',
        lineHeight: 1,
        letterSpacing: '-0.045em',
        fontWeight: 900,
        marginTop: 14,
      }}>
        {tile.title}
      </h3>
    </motion.div>
  )
}

export default function Skills() {
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: '-60px' })

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
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '2.3rem' }}
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

        {/* Marquee Strip */}
        <div style={{
          marginTop: 48,
          overflow: 'hidden',
          borderRadius: 12,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '14px 0',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: 80,
            background: 'linear-gradient(to right, var(--color-base), transparent)',
            zIndex: 2,
          }} />
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: 80,
            background: 'linear-gradient(to left, var(--color-base), transparent)',
            zIndex: 2,
          }} />

          <div
            style={{
              display: 'flex',
              gap: 0,
              animation: 'marquee 28s linear infinite',
              width: 'max-content',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
            onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
          >
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: 20,
                  padding: '0 20px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.45)',
                  whiteSpace: 'nowrap',
                }}
              >
                {item}
                <span style={{ color: 'var(--color-lime)', opacity: 0.8 }}>·</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

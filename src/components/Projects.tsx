import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useCursor } from './Cursor'

const PROJECTS = [
  {
    id: 'cv-design',
    type: 'DESIGN SYSTEM / PERSONAL BRAND',
    title: 'CV, reimagined.',
    description: 'An interactive, generator-powered CV and portfolio system. It renders itself from data, switches themes, exports a clean animated PDF, and pulls content from a headless CMS.',
    result: 'Updating a CV went from hours to a few minutes.',
    stack: ['React', 'TypeScript', 'Node.js', 'Puppeteer', 'Framer Motion'],
    accent: '#2879ff',
    link: 'https://github.com/AboveAlljnr',
    year: '2024',
    image: 'https://images.pexels.com/photos/590044/pexels-photo-590044.jpeg',
    size: 'tall',   // tall | normal | wide
  },
  {
    id: 'nintendo-ops',
    type: 'BUSINESS OPERATIONS / ANALYSIS',
    title: 'Nintendo Co. Analysis.',
    description: 'A deep operational study of Nintendo — supply chain, IP management, and digital distribution — focused on where process quietly gets in the way.',
    result: 'Scored a distinction and was picked for the department showcase.',
    stack: ['Systems Analysis', 'ERP Strategy', 'Operations Research'],
    accent: '#ff3ca6',
    link: 'https://github.com/AboveAlljnr',
    year: '2023',
    image: 'https://images.pexels.com/photos/27141316/pexels-photo-27141316.jpeg',
    size: 'tall',
  },
  {
    id: 'fintech-platform',
    type: 'FINTECH / PAYMENT INFRASTRUCTURE',
    title: 'Micro-Transactions Platform.',
    description: 'A prototype payment architecture for African mobile-money markets — event-driven microservices, idempotent retries, and a live transaction dashboard.',
    result: 'Held 10k+ simulated transactions/min without breaking a sweat.',
    stack: ['Node.js', 'PostgreSQL', 'Redis', 'WebSockets', 'Docker'],
    accent: '#9b5cff',
    link: 'https://github.com/AboveAlljnr',
    year: '2024',
    image: 'https://images.pexels.com/photos/11696554/pexels-photo-11696554.jpeg',
    size: 'normal',
  },
  {
    id: 'opssync',
    type: 'ERP / WORKFLOW INTELLIGENCE',
    title: 'OpsSync Workflow Suite.',
    description: 'A workflow-sync suite that connects separate ERP systems, flags anomalies, and auto-generates reports for ops teams.',
    result: 'Report-writing that used to eat a day now takes minutes.',
    stack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Pandas'],
    accent: '#c8ff3d',
    link: 'https://github.com/AboveAlljnr',
    year: '2023',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    size: 'normal',
  },
  {
    id: 'sissys-store',
    type: 'E-COMMERCE / FASHION RETAIL',
    title: "Sissy's Luxury Storefront.",
    description: "A full storefront for Sissy's Luxury — product catalogue, live shopping in Ghanaian cedis, user accounts, and a checkout that actually processes money.",
    result: 'Adding a product takes minutes, not a developer.',
    stack: ['React', 'Next.js', 'TypeScript', 'Paystack', 'Node.js'],
    accent: '#2879ff',
    link: 'https://sissys-luxury.vercel.app/',
    year: '2025',
    image: '/projects/sissys-luxury.png',
    size: 'wide',
  },
  {
    id: 'sissys-editorial',
    type: 'E-COMMERCE / EDITORIAL BRAND',
    title: "Sissy's Luxury Brand Site.",
    description: 'The brand home — Italian-crafted fashion as an editorial experience, with collection pages, product details, and the story of the house.',
    result: 'A site that feels like the product: hand-finished and precise.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    accent: '#ff3ca6',
    link: 'https://wig-blush.vercel.app/',
    year: '2025',
    image: '/projects/wig-blush.png',
    size: 'normal',
  },
  {
    id: 'ubuntu-essence',
    type: 'PUBLISHING / CONTENT PLATFORM',
    title: 'Ubuntu Essence Magazine.',
    description: "A full digital magazine for African culture — categories, editor's picks, bookmarked reading, and login for a personalised feed.",
    result: 'Writers publish, readers come back to read from where they left off.',
    stack: ['React', 'Node.js', 'MongoDB', 'Auth', 'Responsive Design'],
    accent: '#ff7a2f',
    link: 'https://magazine-for-articles.vercel.app/',
    year: '2025',
    image: '/projects/ubuntu-essence.png',
    size: 'normal',
  },
  {
    id: 'mikayla-portfolio',
    type: 'PORTFOLIO / CONTENT STUDIO',
    title: "Michaella's Portfolio.",
    description: "A writer's portfolio for content and copywriting — essays, advocacy writing, selected works, and a downloadable CV, all arranged around the work itself.",
    result: 'Clients read the work, then book the writer.',
    stack: ['React', 'TypeScript', 'Framer Motion', 'Responsive Design'],
    accent: '#9b5cff',
    link: 'https://mikayla-s-portfolio.vercel.app/',
    year: '2025',
    image: '/projects/mikayla-portfolio.png',
    size: 'wide',
  },
]

/* ── Project Card ────────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  minHeight = 420,
}: {
  project: typeof PROJECTS[0]
  index: number
  minHeight?: number
}) {
  const { setVariant, setLabel } = useCursor()
  const [hovered, setHovered]   = useState(false)
  const ref = useRef<HTMLAnchorElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [6, -6])
  const rotateY = useTransform(x, [-100, 100], [-6, 6])
  const springRotX = useSpring(rotateX, { stiffness: 180, damping: 28 })
  const springRotY = useSpring(rotateY, { stiffness: 180, damping: 28 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    x.set(0); y.set(0)
    setHovered(false); setVariant('default'); setLabel('')
  }

  return (
    <motion.a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200, display: 'block', cursor: 'none' }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { setHovered(true); setVariant('project'); setLabel('VIEW →') }}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotX,
          rotateY: springRotY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          borderRadius: '1.4rem',
          overflow: 'hidden',
          minHeight,
          background: 'var(--color-base-2)',
          border: '1px solid rgba(255,255,255,0.14)',
          cursor: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          boxShadow: hovered
            ? `0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px ${project.accent}44`
            : '0 4px 30px rgba(0,0,0,0.35)',
          transition: 'box-shadow 0.45s ease',
        }}
      >
        {/* Background image */}
        <img
          src={project.image}
          alt={project.title}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: hovered
              ? 'saturate(1.3) brightness(0.5)'
              : 'saturate(1.05) brightness(0.75)',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.65s cubic-bezier(0.2,0.8,0.2,1), filter 0.65s ease',
          }}
        />

        {/* Gradient overlay — bottom-anchored, softer than before */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(180deg, rgba(10,10,15,0.15) 0%, rgba(10,10,15,0.55) 50%, rgba(10,10,15,0.93) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Ghost project number in top-right */}
        <div style={{
          position: 'absolute',
          top: 16, right: 20,
          fontFamily: 'var(--font-display)',
          fontSize: '5rem',
          fontWeight: 900,
          lineHeight: 1,
          color: 'rgba(255,255,255,0.06)',
          letterSpacing: '-0.06em',
          zIndex: 2,
          pointerEvents: 'none',
          userSelect: 'none',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* "View Site" arrow — slides in on hover */}
        <motion.div
          initial={false}
          animate={{
            opacity: hovered ? 1 : 0,
            y: hovered ? 0 : -10,
          }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'absolute',
            top: 20, right: 20,
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 14px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'rgba(255,255,255,0.9)',
            letterSpacing: '0.06em',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          VIEW SITE ↗
        </motion.div>

        {/* Content */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: 'clamp(1.4rem, 3.5vw, 2.2rem)',
          }}
        >
          {/* Category + year */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '0.65rem',
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            color: 'var(--color-lime)',
            marginBottom: 10,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: project.accent,
              boxShadow: `0 0 8px ${project.accent}`,
              display: 'inline-block',
            }} />
            {project.type} · {project.year}
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.7rem, 3.5vw, 3rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.055em',
            fontWeight: 900,
            color: 'var(--color-paper)',
            marginBottom: 12,
          }}>
            {project.title}
          </h3>

          {/* Description */}
          <p style={{
            fontSize: 14,
            color: 'rgba(232,227,242,0.8)',
            lineHeight: 1.65,
            maxWidth: 520,
            marginBottom: 14,
          }}>
            {project.description}
          </p>

          {/* Result callout */}
          <div style={{
            padding: '8px 14px',
            borderRadius: 8,
            background: `${project.accent}18`,
            border: `1px solid ${project.accent}44`,
            marginBottom: 14,
            fontSize: 12.5,
            fontFamily: 'var(--font-mono)',
            color: project.accent === '#c8ff3d' ? '#c8ff3d' : 'var(--color-lime)',
            width: 'fit-content',
          }}>
            ✦ {project.result}
          </div>

          {/* Stack tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.stack.map((tech) => (
              <span key={tech} style={{
                padding: '4px 11px', borderRadius: 20,
                fontSize: 11, fontFamily: 'var(--font-mono)',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.7)',
              }}>
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.a>
  )
}

/* ── Projects Section ────────────────────────────────────────────── */
export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const tall    = PROJECTS.filter((p) => p.size === 'tall')
  const normal  = PROJECTS.filter((p) => p.size === 'normal')
  const wide    = PROJECTS.filter((p) => p.size === 'wide')

  return (
    <section
      id="projects"
      style={{
        position: 'relative', zIndex: 10,
        paddingTop: 'clamp(5rem, 11vw, 10rem)',
        paddingBottom: 'clamp(5rem, 11vw, 10rem)',
        maxWidth: 1280, margin: '0 auto',
      }}
    >
      <div className="max-frame">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 56 }}
        >
          <p className="section-kicker">04 / SELECTED SIGNALS</p>
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            Work with a point of view.
          </h2>
        </motion.div>

        {/* ── Row 1: Two tall portrait cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: 20,
          marginBottom: 20,
        }}>
          {tall.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} minHeight={500} />
          ))}
        </div>

        {/* ── Row 2: Four normal cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: 20,
          marginBottom: 20,
        }}>
          {normal.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={tall.length + i} minHeight={380} />
          ))}
        </div>

        {/* ── Row 3: Two wide horizontal strip cards ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {wide.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={tall.length + normal.length + i}
              minHeight={280}
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: 60 }}
        >
          <a
            href="https://github.com/AboveAlljnr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 32px',
              fontFamily: 'var(--font-display)',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              border: '1px solid var(--color-border)',
              borderRadius: 12,
              cursor: 'none',
              transition: 'color 0.2s, border-color 0.2s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.4.6.11.82-.26.82-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.72.08-.72 1.19.08 1.82 1.22 1.82 1.22 1.06 1.82 2.78 1.3 3.46.99.1-.77.41-1.3.75-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
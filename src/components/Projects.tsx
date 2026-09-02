import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useCursor } from './Cursor'

const PROJECTS = [
  {
    id: 'cv-design',
    type: 'DESIGN SYSTEM / PERSONAL BRAND',
    title: "CV, reimagined.",
    description: 'An interactive, generator-powered CV and portfolio system. It renders itself from data, switches themes, exports a clean animated PDF, and pulls content from a headless CMS.',
    result: 'I keep reusing it for client profiles; updating a CV went from hours to a few minutes.',
    stack: ['React', 'TypeScript', 'Node.js', 'Puppeteer', 'Framer Motion'],
    accent: '#2879ff',
    link: 'https://github.com/AboveAlljnr',
    year: '2024',
    image: 'https://images.pexels.com/photos/590044/pexels-photo-590044.jpeg',
  },
  {
    id: 'nintendo-ops',
    type: 'BUSINESS OPERATIONS / ANALYSIS',
    title: 'Nintendo Co. Analysis.',
    description: 'A deep operational and systems study of Nintendo for my diploma â€” supply chain, IP management, and digital distribution â€” focused on where process quietly gets in the way.',
    result: 'Scored a distinction and was picked for the department showcase.',
    stack: ['Systems Analysis', 'ERP Strategy', 'Operations Research', 'Business Process Modelling'],
    accent: '#ff3ca6',
    link: 'https://github.com/AboveAlljnr',
    year: '2023',
    image: 'https://images.pexels.com/photos/27141316/pexels-photo-27141316.jpeg',
  },
  {
    id: 'fintech-platform',
    type: 'FINTECH / PAYMENT INFRASTRUCTURE',
    title: 'Micro-Transactions Platform.',
    description: 'A prototype payment architecture aimed at African mobile-money markets â€” event-driven microservices, idempotent retries, and a live transaction dashboard.',
    result: 'In a load test it held 10k+ simulated transactions a minute without breaking a sweat.',
    stack: ['Node.js', 'PostgreSQL', 'Redis', 'WebSockets', 'Docker'],
    accent: '#9b5cff',
    link: 'https://github.com/AboveAlljnr',
    year: '2024',
    image: 'https://images.pexels.com/photos/11696554/pexels-photo-11696554.jpeg',
  },
  {
    id: 'opssync',
    type: 'ERP / WORKFLOW INTELLIGENCE',
    title: 'OpsSync Workflow Suite.',
    description: 'A workflow-sync suite that connects separate ERP systems, flags anomalies, and auto-generates reports for ops teams.',
    result: 'A few small businesses run it now; the report-writing that used to eat a day takes minutes.',
    stack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Pandas'],
    accent: '#c8ff3d',
    link: 'https://github.com/AboveAlljnr',
    year: '2023',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
  },
  {
    id: 'sissys-store',
    type: 'E-COMMERCE / FASHION RETAIL',
    title: 'Sissyâ€™s Luxury Storefront.',
    description: 'A full storefront for Sissyâ€™s Luxury â€” product catalogue with categories, live shopping in Ghanaian cedis, user accounts, and a checkout the shop actually processes money through.',
    result: 'The store handles real orders with Paystack; adding a product to the shop takes minutes, not a developer.',
    stack: ['React', 'Next.js', 'TypeScript', 'Paystack', 'Node.js'],
    accent: '#2879ff',
    link: 'https://sissys-luxury.vercel.app/',
    year: '2025',
    image: '/projects/sissys-luxury.jpg',
  },
  {
    id: 'sissys-editorial',
    type: 'E-COMMERCE / EDITORIAL BRAND',
    title: 'Sissyâ€™s Luxury Brand Site.',
    description: 'The brand home â€” Italian-crafted fashion presented as an editorial experience, with collection pages, product details, and the story of the house.',
    result: 'A site that feels like the product: hand-finished, precise, and a little unreachable.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    accent: '#ff3ca6',
    link: 'https://wig-blush.vercel.app/',
    year: '2025',
    image: '/projects/wig-blush.jpg',
  },
  {
    id: 'ubuntu-essence',
    type: 'PUBLISHING / CONTENT PLATFORM',
    title: 'Ubuntu Essence Magazine.',
    description: 'A full digital magazine for African culture and heritage â€” categories, editorâ€™s picks, bookmarked reading, and account login for a personalised feed.',
    result: 'A real publication site: writers publish stories across sections and readers come back to read from where they left off.',
    stack: ['React', 'Node.js', 'MongoDB', 'Auth', 'Responsive Design'],
    accent: '#ff7a2f',
    link: 'https://magazine-for-articles.vercel.app/',
    year: '2025',
    image: '/projects/ubuntu-essence.jpg',
  },
  {
    id: 'mikayla-portfolio',
    type: 'PORTFOLIO / CONTENT STUDIO',
    title: 'Michaellaâ€™s Portfolio.',
    description: 'A writerâ€™s portfolio for content and copywriting â€” essays, advocacy writing, selected works, and a downloadable CV, all arranged around the work itself.',
    result: 'The CV lives on the site instead of an attachment â€” clients read the work, then book the writer.',
    stack: ['React', 'TypeScript', 'Framer Motion', 'Responsive Design'],
    accent: '#9b5cff',
    link: 'https://mikayla-s-portfolio.vercel.app/',
    year: '2025',
    image: '/projects/mikayla-portfolio.jpg',
  },
]

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const { setVariant, setLabel } = useCursor()
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLAnchorElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [8, -8])
  const rotateY = useTransform(x, [-100, 100], [-8, 8])

  const springRotX = useSpring(rotateX, { stiffness: 200, damping: 30 })
  const springRotY = useSpring(rotateY, { stiffness: 200, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setHovered(false)
    setVariant('default')
    setLabel('')
  }

  return (
    <motion.a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200, display: 'block', cursor: 'none' }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { setHovered(true); setVariant('project'); setLabel('VIEW SITE') }}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotX,
          rotateY: springRotY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          borderRadius: '1.45rem',
          overflow: 'hidden',
          minHeight: 420,
          background: 'var(--color-base-2)',
          border: '1px solid rgba(255,255,255,0.2)',
          cursor: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          boxShadow: hovered ? '0 30px 80px rgba(0,0,0,0.5)' : '0 4px 30px rgba(0,0,0,0.35)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Background image */}
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: hovered ? 'saturate(1.25) brightness(0.6)' : 'saturate(1.05) brightness(0.9)',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.2,0.8,0.2,1), filter 0.6s ease',
          }}
        />

        {/* Legibility overlay (anchored to the text side) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'linear-gradient(105deg, rgba(10,10,15,0.94) 0%, rgba(10,10,15,0.55) 38%, rgba(10,10,15,0.05) 68%, transparent 80%)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: 'clamp(1.4rem, 4vw, 2.6rem)',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '0.68rem',
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            color: 'var(--color-lime)',
            marginBottom: 12,
          }}>
            {project.type} Â· {project.year}
          </div>

          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.7rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.06em',
            fontWeight: 900,
            color: 'var(--color-paper)',
            marginBottom: 14,
          }}>
            {project.title}
          </h3>

          <p style={{
            fontSize: 15,
            color: 'rgba(232,227,242,0.85)',
            lineHeight: 1.65,
            maxWidth: 560,
            marginBottom: 18,
          }}>
            {project.description}
          </p>

          {/* Result callout */}
          <div style={{
            padding: '10px 16px',
            borderRadius: 10,
            background: 'rgba(200,255,61,0.1)',
            border: '1px solid rgba(200,255,61,0.3)',
            marginBottom: 18,
            fontSize: 13,
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-lime)',
            width: 'fit-content',
          }}>
            âœ¦ {project.result}
          </div>

          {/* Stack tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.stack.map((tech) => (
              <span key={tech} style={{
                padding: '5px 12px', borderRadius: 20,
                fontSize: 11, fontFamily: 'var(--font-mono)',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.14)',
                color: 'rgba(255,255,255,0.75)',
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

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        zIndex: 10,
        paddingTop: 'clamp(5rem, 11vw, 10rem)',
        paddingBottom: 'clamp(5rem, 11vw, 10rem)',
        maxWidth: 1280,
        margin: '0 auto',
      }}
    >
      <div className="max-frame">
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))',
          gap: 24,
        }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: 56 }}
        >
          <a
            href="https://github.com/AboveAlljnr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 30px',
              fontFamily: 'var(--font-display)',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              border: '1px solid var(--color-border)',
              borderRadius: 10,
              cursor: 'none',
              transition: 'color 0.2s, border-color 0.2s',
            }}
          >
            View All on GitHub â†’
          </a>
        </motion.div>
      </div>
    </section>
  )
}
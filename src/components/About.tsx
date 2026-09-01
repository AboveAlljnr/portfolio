import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useCursor } from './Cursor'

type TabId = 'work' | 'education' | 'opensource' | 'volunteering'

const TABS: { id: TabId; label: string }[] = [
  { id: 'work',        label: 'Work Experience' },
  { id: 'education',  label: 'Education'        },
  { id: 'opensource', label: 'Open Source'      },
  { id: 'volunteering', label: 'Volunteering'   },
]

const CONTENT: Record<TabId, React.ReactNode> = {
  work: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {[
        {
          role: 'Full-Stack Developer & Systems Engineer',
          company: 'Freelance / Independent Projects',
          period: '2022 — Present',
          color: 'var(--color-accent-1)',
          points: [
            'Built and deployed 10+ full-stack web applications for clients across Ghana and internationally.',
            'Architected RESTful and GraphQL APIs consumed by web and mobile frontends.',
            'Delivered complex e-commerce, SaaS, and analytics platforms from design to production.',
            'Implemented CI/CD pipelines, cloud deployments (AWS, Vercel, Railway).',
          ],
        },
        {
          role: 'Operations Specialist & Systems Analyst',
          company: 'Enterprise Project Engagements',
          period: '2021 — 2023',
          color: 'var(--color-accent-2)',
          points: [
            'Led end-to-end process mapping and workflow automation for business operations.',
            'Designed ERP integration strategies aligning IT systems with organisational objectives.',
            'Produced stakeholder-facing analytical reports and dashboards.',
            'Coordinated Agile project delivery cycles across cross-functional teams.',
          ],
        },
      ].map((job, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            padding: 28,
            borderRadius: 14,
            background: 'color-mix(in srgb, var(--color-paper) 4%, transparent)',
            border: `1px solid ${job.color}44`,
            borderLeft: `3px solid ${job.color}`,
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--color-paper)', marginBottom: 4 }}>
                {job.role}
              </h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: job.color }}>{job.company}</div>
            </div>
            <div style={{
              padding: '4px 12px', borderRadius: 20,
              fontSize: 12, fontFamily: 'var(--font-mono)',
              background: `${job.color}18`, border: `1px solid ${job.color}44`,
              color: job.color, whiteSpace: 'nowrap',
            }}>
              {job.period}
            </div>
          </div>
          <ul style={{ marginTop: 16, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {job.points.map((pt, j) => (
              <li key={j} style={{ fontSize: 14.5, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{pt}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  ),

  education: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        {
          degree: 'NCC Education Level 5 Diploma',
          field: 'Computing with Business Management',
          institution: 'IPMC College of Technology',
          location: 'Accra, Ghana',
          grade: 'Distinctions',
          color: 'var(--color-accent-3)',
          distinctions: [
            'Back-End Web Development',
            'Information Systems & Organisations',
            'IT Project Management',
          ],
        },
        {
          degree: 'Certificate in Full-Stack Web Development',
          field: 'Advanced Front-End & Back-End Specialisation',
          institution: 'IPMC College of Technology',
          location: 'Accra, Ghana',
          grade: 'Merit',
          color: 'var(--color-accent-4)',
          distinctions: ['React & Modern JavaScript', 'Node.js & Database Design'],
        },
      ].map((edu, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
          style={{
            padding: 28, borderRadius: 14,
            background: 'color-mix(in srgb, var(--color-paper) 4%, transparent)',
            border: `1px solid ${edu.color}44`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--color-paper)', marginBottom: 4 }}>
                {edu.degree}
              </h3>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: edu.color, marginBottom: 4 }}>{edu.field}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-muted)' }}>
                {edu.institution} · {edu.location}
              </div>
            </div>
            <div style={{
              padding: '6px 16px', borderRadius: 20,
              background: `${edu.color}18`, border: `1px solid ${edu.color}55`,
              color: edu.color, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700,
            }}>
              {edu.grade}
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Distinction Modules
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {edu.distinctions.map((d) => (
                <span key={d} style={{
                  padding: '5px 12px', borderRadius: 20,
                  fontSize: 12, fontFamily: 'var(--font-mono)',
                  background: `${edu.color}14`, border: `1px solid ${edu.color}44`,
                  color: edu.color,
                }}>
                  ✦ {d}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  ),

  opensource: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {[
        {
          name: 'Portfolio Design System',
          desc: 'Open-sourced component library and design tokens built from the ground up for high-performance React portfolios.',
          color: 'var(--color-accent-1)',
          link: 'https://github.com/AboveAlljnr',
          lang: 'TypeScript',
        },
        {
          name: 'OpsSync CLI Utilities',
          desc: 'Command-line toolkit for automating operational workflows, report generation, and cross-platform ERP data sync.',
          color: 'var(--color-accent-4)',
          link: 'https://github.com/AboveAlljnr',
          lang: 'Python',
        },
        {
          name: 'NodeAPI Starter Kit',
          desc: 'Production-ready Node.js API template with Prisma ORM, JWT authentication, and Swagger-auto documentation.',
          color: 'var(--color-accent-2)',
          link: 'https://github.com/AboveAlljnr',
          lang: 'Node.js',
        },
      ].map((proj, i) => (
        <motion.a
          key={i}
          href={proj.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ x: 6 }}
          style={{
            display: 'block',
            padding: 24, borderRadius: 14,
            background: 'color-mix(in srgb, var(--color-paper) 4%, transparent)',
            border: `1px solid ${proj.color}33`,
            cursor: 'none',
            textDecoration: 'none',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--color-paper)' }}>{proj.name}</h3>
            <span style={{
              padding: '3px 10px', borderRadius: 20, fontSize: 11, fontFamily: 'var(--font-mono)',
              background: `${proj.color}18`, color: proj.color, border: `1px solid ${proj.color}44`,
            }}>{proj.lang}</span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{proj.desc}</p>
        </motion.a>
      ))}
    </div>
  ),

  volunteering: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {[
        {
          role: 'Tech Mentor & Coding Facilitator',
          org: 'Developer Community Ghana',
          period: '2022 — Present',
          desc: 'Mentored aspiring developers across Accra, running workshops on web fundamentals, React, and career development in tech.',
          color: 'var(--color-accent-3)',
        },
        {
          role: 'Open Source Contributor',
          org: 'Various Ghana Tech Collectives',
          period: '2021 — Present',
          desc: 'Contributed to open-source tooling projects aimed at solving local business and operational challenges through software.',
          color: 'var(--color-accent-2)',
        },
      ].map((vol, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          style={{
            padding: 24, borderRadius: 14,
            background: 'color-mix(in srgb, var(--color-paper) 4%, transparent)',
            border: `1px solid ${vol.color}33`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--color-paper)' }}>{vol.role}</h3>
              <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: vol.color, marginTop: 2 }}>{vol.org}</div>
            </div>
            <div style={{
              padding: '3px 12px', borderRadius: 20, fontSize: 11, fontFamily: 'var(--font-mono)',
              background: `${vol.color}14`, color: vol.color, border: `1px solid ${vol.color}33`,
            }}>{vol.period}</div>
          </div>
          <p style={{ fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{vol.desc}</p>
        </motion.div>
      ))}
    </div>
  ),
}

export default function About() {
  const [activeTab, setActiveTab] = useState<TabId>('work')
  const [timelinePos, setTimelinePos] = useState(0)
  const { setVariant } = useCursor()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Handle keyboard navigation for timeline
  const handleKeyDown = useCallback((e: React.KeyboardEvent, tabId: TabId) => {
    const currentIndex = TABS.findIndex(t => t.id === tabId)
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = (currentIndex + 1) % TABS.length
      tabRefs.current[nextIndex]?.focus()
      setActiveTab(TABS[nextIndex].id)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      const prevIndex = (currentIndex - 1 + TABS.length) % TABS.length
      tabRefs.current[prevIndex]?.focus()
      setActiveTab(TABS[prevIndex].id)
    }
  }, [])

  // Update timeline position based on active tab
  useEffect(() => {
    const currentIndex = TABS.findIndex(t => t.id === activeTab)
    if (currentIndex >= 0) {
      const tabElement = tabRefs.current[currentIndex]
      if (tabElement) {
        const rect = tabElement.getBoundingClientRect()
        const containerRect = tabElement.parentElement?.getBoundingClientRect()
        if (containerRect) {
          const pos = ((rect.left + rect.width / 2) - containerRect.left) / containerRect.width
          setTimelinePos(pos)
        }
      }
    }
  }, [activeTab])

  return (
    <section
      id="about"
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 10,
        paddingTop: 'clamp(5rem, 11vw, 10rem)',
        paddingBottom: 'clamp(5rem, 11vw, 10rem)',
        paddingLeft: 'clamp(1.25rem, 4vw, 4rem)',
        paddingRight: 'clamp(1.25rem, 4vw, 4rem)',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: 48 }}
      >
        <p className="section-kicker">03 / THE RECEIPTS</p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 0.95,
          margin: '0.65rem 0 1.4rem',
          color: 'var(--color-paper)',
        }}>
          Curiosity, made practical.
        </h2>
        <p style={{ marginTop: 8, fontSize: 17, color: 'var(--color-text-muted)', maxWidth: 640, lineHeight: 1.7 }}>
          I'm a developer and operations thinker from Accra who believes the best systems — code or otherwise — are the ones that feel inevitable. Distinctions in Back-End Development, Information Systems, and IT Project Management. I build things that hold.
        </p>
      </motion.div>

      {/* Timeline Scrubber */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: 48 }}
      >
        {/* Timeline track */}
        <div style={{
          position: 'relative',
          height: 4,
          background: 'color-mix(in srgb, var(--color-paper) 15%, transparent)',
          borderRadius: 2,
          marginBottom: 24,
          cursor: 'pointer',
        }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width
            const index = Math.min(TABS.length - 1, Math.max(0, Math.floor(x * TABS.length)))
            setActiveTab(TABS[index].id)
          }}
        >
          {/* Active indicator */}
          <motion.div
            style={{
              position: 'absolute',
              left: `${timelinePos * 100}%`,
              top: -3,
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'var(--color-lime)',
              boxShadow: '0 0 14px var(--color-lime)',
              y: -1,
              pointerEvents: 'none',
            }}
            animate={{ left: `${timelinePos * 100}%` }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          />
          
          {/* Progress fill */}
          <motion.div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${timelinePos * 100}%`,
              background: 'linear-gradient(90deg, var(--color-lime), var(--color-pink))',
              borderRadius: 2,
            }}
            animate={{ width: `${timelinePos * 100}%` }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          />
        </div>

        {/* Tab buttons */}
        <div style={{
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
        }}>
          {TABS.map((tab, i) => {
            const isActive = activeTab === tab.id
            const prevTab = TABS[(i - 1 + TABS.length) % TABS.length]
            return (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[i] = el }}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, tab.id)}
                onMouseEnter={() => setVariant('link')}
                onMouseLeave={() => setVariant('default')}
                aria-label={`${tab.label} — ${isActive ? 'current' : 'not selected'}`}
                aria-pressed={isActive}
                style={{
                  position: 'relative',
                  padding: '1.1rem 1.5rem 1.1rem 0',
                  marginRight: '0.5rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--color-lime)' : 'var(--color-text-dim)',
                  transition: 'color 0.25s ease',
                  outline: 'none',
                  flex: '1 1 auto',
                  minWidth: 120,
                  textAlign: 'left',
                }}
              >
                {/* Timeline marker */}
                <span style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: isActive ? 12 : 8,
                  height: isActive ? 12 : 8,
                  borderRadius: '50%',
                  background: isActive ? 'var(--color-lime)' : 'color-mix(in srgb, var(--color-paper) 30%, transparent)',
                  transition: 'all 0.3s var(--ease-spring)',
                  boxShadow: isActive ? '0 0 10px var(--color-lime)' : 'none',
                }} />
                <span style={{ position: 'relative', zIndex: 1 }}>{tab.label}</span>
                
                {/* Underline for active tab */}
                {isActive && (
                  <motion.div
                    layoutId="tab-underline"
                    style={{
                      position: 'absolute',
                      left: 20,
                      right: 0,
                      bottom: 0,
                      height: 3,
                      background: 'var(--color-lime)',
                      boxShadow: '0 0 14px var(--color-lime)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {CONTENT[activeTab]}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
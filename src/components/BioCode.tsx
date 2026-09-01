import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const CODE_BLOCKS = {
  profile: {
    filename: 'profile.ts',
    language: 'TypeScript',
    code: `<span class="token-comment">// courage-agbavor · profile.ts</span>
<span class="token-keyword">import</span> <span class="token-punct">{</span> precision<span class="token-punct">,</span> curiosity<span class="token-punct">,</span> drive <span class="token-punct">}</span> <span class="token-keyword">from</span> <span class="token-string">'courage-agbavor'</span>

<span class="token-keyword">const</span> <span class="token-variable">profile</span> <span class="token-punct">=</span> <span class="token-keyword">new</span> <span class="token-class">Developer</span><span class="token-punct">(</span><span class="token-punct">{</span>
  <span class="token-key">name</span><span class="token-punct">:</span>   <span class="token-string">'Courage Agbavor'</span><span class="token-punct">,</span>
  <span class="token-key">alias</span><span class="token-punct">:</span>  <span class="token-string">'Above All'</span><span class="token-punct">,</span>
  <span class="token-key">role</span><span class="token-punct">:</span>   <span class="token-string">'Full-Stack Developer &amp; Operations Specialist'</span><span class="token-punct">,</span>
  <span class="token-key">focus</span><span class="token-punct">:</span>  <span class="token-punct">[</span><span class="token-string">'Web Development'</span><span class="token-punct">,</span> <span class="token-string">'Business Operations'</span><span class="token-punct">]</span><span class="token-punct">,</span>
<span class="token-punct">}</span><span class="token-punct">,</span> <span class="token-punct">{</span>
  <span class="token-key">basedIn</span><span class="token-punct">:</span>  <span class="token-string">'Accra, Ghana'</span><span class="token-punct">,</span>
  <span class="token-key">available</span><span class="token-punct">:</span> <span class="token-boolean">true</span><span class="token-punct">,</span>
<span class="token-punct">}</span><span class="token-punct">)</span>

<span class="token-keyword">export default</span> <span class="token-variable">profile</span>`,
    output: `> Initializing profile...
> Loading courage-agbavor@latest...
✓ Developer profile loaded
✓ Skills indexed: 24 competencies
✓ Projects catalogued: 15 deliverables
> Status: Available for new projects`,
  },
  skills: {
    filename: 'skills.json',
    language: 'JSON',
    code: `<span class="token-punct">{</span>
  <span class="token-key">"frontend"</span><span class="token-punct">:</span> <span class="token-punct">[</span><span class="token-string">"React"</span><span class="token-punct">,</span> <span class="token-string">"TypeScript"</span><span class="token-punct">,</span> <span class="token-string">"Next.js"</span><span class="token-punct">,</span> <span class="token-string">"Framer Motion"</span><span class="token-punct">]</span><span class="token-punct">,</span>
  <span class="token-key">"backend"</span><span class="token-punct">:</span> <span class="token-punct">[</span><span class="token-string">"Node.js"</span><span class="token-punct">,</span> <span class="token-string">"Python"</span><span class="token-punct">,</span> <span class="token-string">"PostgreSQL"</span><span class="token-punct">,</span> <span class="token-string">"Redis"</span><span class="token-punct">]</span><span class="token-punct">,</span>
  <span class="token-key">"devops"</span><span class="token-punct">:</span> <span class="token-punct">[</span><span class="token-string">"Docker"</span><span class="token-punct">,</span> <span class="token-string">"AWS"</span><span class="token-punct">,</span> <span class="token-string">"CI/CD"</span><span class="token-punct">,</span> <span class="token-string">"Linux"</span><span class="token-punct">]</span><span class="token-punct">,</span>
  <span class="token-key">"tools"</span><span class="token-punct">:</span> <span class="token-punct">[</span><span class="token-string">"Figma"</span><span class="token-punct">,</span> <span class="token-string">"Git"</span><span class="token-punct">,</span> <span class="token-string">"Agile/Scrum"</span><span class="token-punct">]</span>
<span class="token-punct">}</span>`,
    output: `> Parsing skills.json...
✓ Frontend: 4 technologies
✓ Backend: 4 technologies  
✓ DevOps: 4 technologies
✓ Tools: 3 technologies
> Total stack depth: 15 core competencies`,
  },
  stats: {
    filename: 'metrics.ts',
    language: 'TypeScript',
    code: `<span class="token-keyword">interface</span> <span class="token-class">Metrics</span> <span class="token-punct">{</span>
  <span class="token-key">experience</span><span class="token-punct">:</span> <span class="token-key">number</span>
  <span class="token-key">projects</span><span class="token-punct">:</span> <span class="token-key">number</span>
  <span class="token-key">clients</span><span class="token-punct">:</span> <span class="token-key">number</span>
<span class="token-punct">}</span>

<span class="token-keyword">const</span> <span class="token-variable">metrics</span><span class="token-punct">:</span> <span class="token-class">Metrics</span> <span class="token-punct">=</span> <span class="token-punct">{</span>
  <span class="token-key">experience</span><span class="token-punct">:</span> <span class="token-number">3</span><span class="token-punct">,</span>
  <span class="token-key">projects</span><span class="token-punct">:</span> <span class="token-number">15</span><span class="token-punct">,</span>
  <span class="token-key">clients</span><span class="token-punct">:</span> <span class="token-number">12</span><span class="token-punct">,</span>
<span class="token-punct">}</span>`,
    output: `> Compiling metrics.ts...
✓ TypeScript check passed
> ─────────────────────────────
>   Years of Experience: 3+
>   Projects Delivered: 15+
>   Client Profiles: 12+
>   NCC Diploma: Level 5
> ─────────────────────────────
> Build successful ✓`,
  },
}

type BlockId = keyof typeof CODE_BLOCKS

export default function BioCode() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeTab, setActiveTab] = useState<BlockId>('profile')
  const [hasRun, setHasRun] = useState<BlockId | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const activeBlock = CODE_BLOCKS[activeTab]
  const LINE_COUNT = activeBlock.code.split('\n').length

  const handleRun = () => {
    if (isRunning) return
    setIsRunning(true)
    setHasRun(null)
    
    setTimeout(() => {
      setHasRun(activeTab)
      setIsRunning(false)
    }, 800)
  }

  return (
    <section
      id="bio"
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 10,
        paddingTop: 'clamp(5rem, 11vw, 10rem)',
        paddingBottom: '2rem',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      <div className="max-frame">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '2.3rem' }}
        >
          <p className="section-kicker">01 / THE HUMAN BEHIND THE SYSTEM</p>
          <h2 className="section-title" style={{ marginBottom: 0, maxWidth: 900 }}>
            Not just shipping code.<br />Designing clarity.
          </h2>
        </motion.div>

        {/* Tab selector */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {Object.entries(CODE_BLOCKS).map(([id, block]) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id as BlockId); setHasRun(null) }}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: 'none',
                background: activeTab === id
                  ? 'color-mix(in srgb, var(--color-accent-2) 20%, transparent)'
                  : 'color-mix(in srgb, var(--color-paper) 5%, transparent)',
                color: activeTab === id ? 'var(--color-accent-2)' : 'var(--color-text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {block.filename}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            borderRadius: 20,
            overflow: 'hidden',
            background: 'rgba(14,14,24,0.83)',
            border: '1px solid rgba(155,92,255,0.8)',
            boxShadow: '0 0 0 1px rgba(40,121,255,0.2), 0 0 48px rgba(155,92,255,0.23)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
          }}
        >
          {/* Top bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.02)',
          }}>
            {/* Traffic lights */}
            <div style={{ display: 'flex', gap: 8 }}>
              {['#ff5d7e', '#ffc43d', '#c8ff3d'].map((c, i) => (
                <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: 0.9 }} />
              ))}
            </div>
            
            {/* Run button */}
            <button
              onClick={handleRun}
              disabled={isRunning}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px',
                borderRadius: 6,
                border: '1px solid color-mix(in srgb, var(--color-lime) 30%, transparent)',
                background: isRunning
                  ? 'color-mix(in srgb, var(--color-lime) 12%, transparent)'
                  : 'color-mix(in srgb, var(--color-lime) 5%, transparent)',
                color: isRunning
                  ? 'color-mix(in srgb, var(--color-lime) 55%, transparent)'
                  : 'var(--color-lime)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                cursor: isRunning ? 'wait' : 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {isRunning ? (
                <>
                  <span style={{ animation: 'spin 1s linear infinite' }}>⟳</span>
                  Running...
                </>
              ) : (
                <>
                  <span>▶</span>
                  Run
                </>
              )}
            </button>
          </div>

          {/* Code + Output layout */}
          <div style={{ display: 'flex', overflowX: 'auto' }}>
            {/* Line numbers */}
            <div style={{
              padding: '24px 16px 24px 20px',
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              lineHeight: 1.85,
              color: 'rgba(255,255,255,0.15)',
              userSelect: 'none',
              borderRight: '1px solid rgba(255,255,255,0.05)',
              minWidth: 44,
              textAlign: 'right',
            }}>
              {Array.from({ length: LINE_COUNT }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Code content */}
            <pre style={{
              padding: '24px 28px',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.75rem, 1.4vw, 0.9rem)',
              lineHeight: 1.85,
              color: '#dedaf0',
              overflowX: 'auto',
              flex: 1,
              margin: 0,
            }}>
              <code
                dangerouslySetInnerHTML={{ __html: activeBlock.code }}
                style={{ fontFamily: 'inherit' }}
              />
            </pre>
          </div>

          {/* Terminal output */}
          <AnimatePresence>
            {hasRun === activeTab && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  borderTop: '1px solid color-mix(in srgb, var(--color-lime) 20%, transparent)',
                  background: 'rgba(0,0,0,0.3)',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  padding: '16px 20px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  lineHeight: 1.7,
                  color: 'var(--color-lime)',
                  whiteSpace: 'pre-wrap',
                }}>
                  {activeBlock.output}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gradient glow bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 60,
            background: 'linear-gradient(to top, rgba(14,14,24,0.9), transparent)',
            pointerEvents: 'none',
          }} />
        </motion.div>

        {/* Spin animation */}
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>

        {/* Syntax highlighting */}
        <style>{`
          .token-comment  { color: var(--color-text-dim); font-style: italic; }
          .token-keyword  { color: var(--color-accent-3); }
          .token-variable { color: var(--color-accent-2); }
          .token-class    { color: var(--color-accent-1); }
          .token-string   { color: var(--color-accent-4); }
          .token-key      { color: var(--color-accent-1); }
          .token-boolean  { color: var(--color-accent-3); }
          .token-punct    { color: var(--color-text-dim); }
          .token-number   { color: var(--color-accent-5); }
        `}</style>
      </div>
    </section>
  )
}
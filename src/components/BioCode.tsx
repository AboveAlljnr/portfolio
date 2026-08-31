import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const CODE = `<span class="token-comment">// courage-agbavor · profile.ts</span>
<span class="token-keyword">import</span> <span class="token-punct">{</span> precision<span class="token-punct">,</span> curiosity<span class="token-punct">,</span> drive <span class="token-punct">}</span> <span class="token-keyword">from</span> <span class="token-string">'courage-agbavor'</span>

<span class="token-keyword">const</span> <span class="token-variable">profile</span> <span class="token-punct">=</span> <span class="token-keyword">new</span> <span class="token-class">Developer</span><span class="token-punct">(</span><span class="token-punct">{</span>
  <span class="token-key">name</span><span class="token-punct">:</span>   <span class="token-string">'Courage Agbavor'</span><span class="token-punct">,</span>
  <span class="token-key">alias</span><span class="token-punct">:</span>  <span class="token-string">'Above All'</span><span class="token-punct">,</span>
  <span class="token-key">role</span><span class="token-punct">:</span>   <span class="token-string">'Full-Stack Developer &amp; Operations Specialist'</span><span class="token-punct">,</span>
  <span class="token-key">focus</span><span class="token-punct">:</span>  <span class="token-punct">[</span><span class="token-string">'Web Development'</span><span class="token-punct">,</span> <span class="token-string">'Business Operations'</span><span class="token-punct">]</span><span class="token-punct">,</span>
  <span class="token-key">weaving</span><span class="token-punct">:</span> <span class="token-punct">[</span><span class="token-string">'code'</span><span class="token-punct">,</span> <span class="token-string">'systems'</span><span class="token-punct">,</span> <span class="token-string">'clarity'</span><span class="token-punct">]</span><span class="token-punct">,</span>
  <span class="token-key">stack</span><span class="token-punct">:</span>  <span class="token-punct">[</span><span class="token-string">'React'</span><span class="token-punct">,</span> <span class="token-string">'Node.js'</span><span class="token-punct">,</span> <span class="token-string">'TypeScript'</span><span class="token-punct">,</span> <span class="token-string">'Python'</span><span class="token-punct">]</span><span class="token-punct">,</span>
<span class="token-punct">}</span><span class="token-punct">,</span> <span class="token-punct">{</span>
  <span class="token-key">basedIn</span><span class="token-punct">:</span>  <span class="token-string">'Accra, Ghana'</span><span class="token-punct">,</span>
  <span class="token-key">email</span><span class="token-punct">:</span>   <span class="token-string">'elikplimagbavor@gmail.com'</span><span class="token-punct">,</span>
  <span class="token-key">available</span><span class="token-punct">:</span> <span class="token-boolean">true</span><span class="token-punct">,</span>
  <span class="token-key">open_to</span><span class="token-punct">:</span>  <span class="token-string">'remote &amp; on-site'</span><span class="token-punct">,</span>
<span class="token-punct">}</span><span class="token-punct">)</span>

<span class="token-keyword">export default</span> <span class="token-variable">profile</span>
<span class="token-comment">// → building tomorrow's web, today.</span>`

const LINE_COUNT = CODE.split('\n').length

export default function BioCode() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

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
          {/* Filename */}
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.04em',
          }}>
            profile.ts
          </span>
          {/* Language badge */}
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            padding: '2px 10px',
            borderRadius: 20,
            background: 'rgba(155,92,255,0.18)',
            color: '#bd96ff',
            border: '1px solid rgba(155,92,255,0.4)',
            letterSpacing: '0.04em',
          }}>
            TypeScript
          </span>
        </div>

        {/* Code body */}
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
              dangerouslySetInnerHTML={{ __html: CODE }}
              style={{ fontFamily: 'inherit' }}
            />
          </pre>
        </div>

        {/* Gradient glow bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 60,
          background: 'linear-gradient(to top, rgba(14,14,24,0.9), transparent)',
          pointerEvents: 'none',
        }} />
      </motion.div>

      {/* Inline syntax styles */}
      <style>{`
        .token-comment  { color: #6b6780; font-style: italic; }
        .token-keyword  { color: #ff72c2; }
        .token-variable { color: #bd96ff; }
        .token-class    { color: #6aa8ff; }
        .token-string   { color: #c8ff3d; }
        .token-key      { color: #6aa8ff; }
        .token-boolean  { color: #ff72c2; }
        .token-punct    { color: #7c7a8a; }
      `}</style>
      </div>
    </section>
  )
}

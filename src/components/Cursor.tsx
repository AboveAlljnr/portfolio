import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorVariant = 'default' | 'text' | 'project' | 'button' | 'link' | 'hidden'

interface CursorContextValue {
  setVariant: (v: CursorVariant) => void
  setLabel: (l: string) => void
}

export const CursorContext = createContext<CursorContextValue>({
  setVariant: () => {},
  setLabel: () => {},
})

export const useCursor = () => useContext(CursorContext)

const VARIANT_STYLES: Record<CursorVariant, React.CSSProperties> = {
  default: { width: 24, height: 24, backgroundColor: 'transparent', border: '2px solid rgba(200,255,61,0.6)', mixBlendMode: 'normal' },
  text:    { width: 80, height: 80, backgroundColor: 'rgba(40,121,255,0.15)', border: '1px solid rgba(40,121,255,0.6)' },
  project: { width: 90, height: 90, backgroundColor: 'rgba(255,60,166,0.15)', border: '1px solid rgba(255,60,166,0.6)' },
  button:  { width: 60, height: 60, backgroundColor: 'rgba(200,255,61,0.2)', border: '1px solid rgba(200,255,61,0.7)' },
  link:    { width: 44, height: 44, backgroundColor: 'rgba(155,92,255,0.15)', border: '1px solid rgba(155,92,255,0.7)' },
  hidden:  { width: 0,  height: 0,  opacity: 0 },
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [isTouch, setIsTouch] = useState(false)
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [label, setLabel] = useState('')

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springX = useSpring(cursorX, { stiffness: 300, damping: 25, mass: 0.5 })
  const springY = useSpring(cursorY, { stiffness: 300, damping: 25, mass: 0.5 })

  // Dot (fast)
  const dotX = useSpring(cursorX, { stiffness: 1000, damping: 50 })
  const dotY = useSpring(cursorY, { stiffness: 1000, damping: 50 })

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    if (isTouch) return
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [isTouch, cursorX, cursorY])

  const currentStyle = VARIANT_STYLES[variant]

  return (
    <CursorContext.Provider value={{ setVariant, setLabel }}>
      {!isTouch && (
        <>
          {/* Ring */}
          <motion.div
            style={{
              position: 'fixed',
              top: 0, left: 0,
              x: springX,
              y: springY,
              translateX: '-50%',
              translateY: '-50%',
              pointerEvents: 'none',
              zIndex: 9999,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'width 0.3s var(--ease-spring), height 0.3s var(--ease-spring), background-color 0.3s ease, border-color 0.3s ease',
              ...currentStyle,
            }}
          >
            {label && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: '#fff',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </motion.span>
            )}
          </motion.div>
          {/* Dot */}
          <motion.div
            style={{
              position: 'fixed',
              top: 0, left: 0,
              x: dotX,
              y: dotY,
              translateX: '-50%',
              translateY: '-50%',
              width: 5,
              height: 5,
              borderRadius: '50%',
              backgroundColor: variant === 'default' ? '#c8ff3d' : 'transparent',
              pointerEvents: 'none',
              zIndex: 10000,
            }}
          />
        </>
      )}
      {children}
    </CursorContext.Provider>
  )
}

/** Wrap any element to get magnetic pull toward cursor */
export function Magnetic({
  children,
  strength = 0.3,
  className = '',
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })
  const { setVariant } = useCursor()

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }, [x, y, strength])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
    setVariant('default')
  }, [x, y, setVariant])

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: 'inline-block' }}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVariant('button')}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

const PARTICLE_COUNT = 420
const SPREAD_X = 40
const SPREAD_Y = 26
const SPREAD_Z = 16

function StarPoints() {
  const ref = useRef<THREE.Points>(null)
  const prefersReduced = useReducedMotion()
  const { accent } = useTheme()

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const base = new THREE.Color()
    const ACCENTS = [accent(1), accent(2), accent(3), accent(4), accent(5)]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * SPREAD_X
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z

      base.set(ACCENTS[Math.floor(Math.random() * ACCENTS.length)])
      colors[i * 3] = base.r
      colors[i * 3 + 1] = base.g
      colors[i * 3 + 2] = base.b
    }

    return { positions, colors }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accent])

  useFrame((state) => {
    if (prefersReduced || !ref.current) return
    const t = state.clock.elapsedTime
    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = attr.array as Float32Array

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      // Slow per-particle vertical drift, gentle sine sway
      let x = arr[i3] + Math.sin(t * 0.12 + i) * 0.003
      let y = arr[i3 + 1] + Math.cos(t * 0.1 + i * 0.7) * 0.004
      const z = arr[i3 + 2] + Math.sin(t * 0.08 + i * 1.3) * 0.002

      // Wrap around vertical bounds so the field scrolls forever
      if (y > SPREAD_Y * 0.5) y = -SPREAD_Y * 0.5
      if (y < -SPREAD_Y * 0.5) y = SPREAD_Y * 0.5
      if (x > SPREAD_X * 0.5) x = -SPREAD_X * 0.5
      if (x < -SPREAD_X * 0.5) x = SPREAD_X * 0.5

      arr[i3] = x
      arr[i3 + 1] = y
      arr[i3 + 2] = z
    }
    attr.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function StarField() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 14], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <StarPoints />
    </Canvas>
  )
}

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from './ThemeProvider'

const PARTICLE_COUNT = 600
const BOUNDARY_X = 12
const BOUNDARY_Y = 8
const BOUNDARY_Z = 6

function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { accent } = useTheme()

  // Generate initial particle data once
  const { positions, velocities, linePositions } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)
    const linePositions = new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6)
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * BOUNDARY_X * 2
      positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDARY_Y * 2
      positions[i * 3 + 2] = (Math.random() - 0.5) * BOUNDARY_Z * 2
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }
    
    return { positions, velocities, linePositions }
  }, [])

  // Mouse tracking
  useMemo(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return
    
    const t = state.clock.elapsedTime
    const positionsAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const positionsArray = positionsAttr.array as Float32Array
    const lineGeom = linesRef.current.geometry
    const lineArray = lineGeom.attributes.position.array as Float32Array
    
    let lineIndex = 0
    
    // Update particle positions with flocking
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      let x = positionsArray[i3]
      let y = positionsArray[i3 + 1]
      let z = positionsArray[i3 + 2]
      
      // Mouse repulsion
      const mouseWorldX = mouseRef.current.x * 10
      const mouseWorldY = mouseRef.current.y * 6
      const dxMouse = x - mouseWorldX
      const dyMouse = y - mouseWorldY
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)
      if (distMouse < 5 && distMouse > 0) {
        const force = 0.03 / distMouse
        velocities[i3] += dxMouse * force
        velocities[i3 + 1] += dyMouse * force
      }
      
      // Gentle drift based on time
      velocities[i3] += Math.sin(t * 0.3 + i * 0.1) * 0.0008
      velocities[i3 + 1] += Math.cos(t * 0.4 + i * 0.15) * 0.0008
      velocities[i3 + 2] += Math.sin(t * 0.2 + i * 0.2) * 0.0004
      
      // Damping
      velocities[i3] *= 0.98
      velocities[i3 + 1] *= 0.98
      velocities[i3 + 2] *= 0.98
      
      // Update position
      x += velocities[i3]
      y += velocities[i3 + 1]
      z += velocities[i3 + 2]
      
      // Boundary reflection
      if (Math.abs(x) > BOUNDARY_X) { velocities[i3] *= -0.5; x = Math.sign(x) * BOUNDARY_X }
      if (Math.abs(y) > BOUNDARY_Y) { velocities[i3 + 1] *= -0.5; y = Math.sign(y) * BOUNDARY_Y }
      if (Math.abs(z) > BOUNDARY_Z) { velocities[i3 + 2] *= -0.5; z = Math.sign(z) * BOUNDARY_Z }
      
      positionsArray[i3] = x
      positionsArray[i3 + 1] = y
      positionsArray[i3 + 2] = z
      
      // Build connections to nearby particles
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const j3 = j * 3
        const dx = x - positionsArray[j3]
        const dy = y - positionsArray[j3 + 1]
        const dz = z - positionsArray[j3 + 2]
        const distSq = dx * dx + dy * dy + dz * dz
        
        if (distSq < 16 && lineIndex < lineArray.length - 6) {
          lineArray[lineIndex++] = x
          lineArray[lineIndex++] = y
          lineArray[lineIndex++] = z
          lineArray[lineIndex++] = positionsArray[j3]
          lineArray[lineIndex++] = positionsArray[j3 + 1]
          lineArray[lineIndex++] = positionsArray[j3 + 2]
        }
      }
    }
    
    // Zero out unused line vertices
    for (let i = lineIndex; i < lineArray.length; i++) {
      lineArray[i] = 0
    }
    
    positionsAttr.needsUpdate = true
    lineGeom.attributes.position.needsUpdate = true
    lineGeom.setDrawRange(0, lineIndex / 3)
    
    // Gentle rotation
    if (pointsRef.current.parent) {
      pointsRef.current.parent.rotation.y = t * 0.05
    }
  })

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color={accent(1)}
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={accent(2)}
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}

export default function ThreeScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 18], fov: 50 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ParticleNetwork />
    </Canvas>
  )
}
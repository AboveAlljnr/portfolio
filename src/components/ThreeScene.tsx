import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function WireGroup() {
  const group = useRef<THREE.Group>(null)
  const orb = useRef<THREE.Mesh>(null)
  const torus = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime
    group.current.rotation.y += 0.004
    group.current.rotation.x += (mouse.y - group.current.rotation.x) * 0.015
    group.current.rotation.y += (mouse.x - group.current.rotation.y) * 0.008
    if (orb.current) orb.current.rotation.x += 0.009
    if (torus.current) torus.current.rotation.y -= 0.012
    if (ring.current) ring.current.rotation.y = t * 0.004
  })

  return (
    <group ref={group}>
      {/* Wireframe icosahedron orb — blue */}
      <mesh ref={orb} position={[2.5, 0.4, 0]}>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshBasicMaterial color={0x2879ff} wireframe />
      </mesh>

      {/* Wireframe torus knot — pink */}
      <mesh ref={torus} position={[-2.2, -1.2, -1]}>
        <torusKnotGeometry args={[0.8, 0.22, 96, 12]} />
        <meshBasicMaterial color={0xff3ca6} wireframe />
      </mesh>

      {/* Wireframe ring — lime */}
      <mesh ref={ring} position={[0.4, 2, -1.5]} rotation={[0.6, 0, 0.3]}>
        <torusGeometry args={[1.05, 0.06, 10, 60]} />
        <meshBasicMaterial color={0xc8ff3d} wireframe />
      </mesh>
    </group>
  )
}

export default function ThreeScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 48 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <WireGroup />
    </Canvas>
  )
}

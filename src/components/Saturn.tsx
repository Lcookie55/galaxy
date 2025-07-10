// src/components/Saturn.tsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Mesh } from 'three'

export default function Saturn() {
  const planetRef = useRef<Mesh>(null)
  const ringRef = useRef<Mesh>(null)

  useFrame(() => {
    if (planetRef.current) planetRef.current.rotation.y += 0.0015
    if (ringRef.current) ringRef.current.rotation.y += 0.0015
  })

  return (
    <group>
      {/* Planet body */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#d9a066" />
      </mesh>

      {/* Rings */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 2.2, 64]} />
        <meshBasicMaterial
          color="#a78bfa"
          side={THREE.DoubleSide}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  )
}

// src/components/Moons.tsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type MoonProps = {
  radius: number
  speed: number
  size?: number
  color?: string
}

export default function Moons() {
  return (
    <>
      <Moon radius={2.5} speed={0.5} size={0.2} color="#fcd34d" />
      <Moon radius={3.2} speed={0.3} size={0.15} color="#a5b4fc" />
      <Moon radius={4.0} speed={0.2} size={0.1} color="#f9a8d4" />
    </>
  )
}

function Moon({ radius, speed, size = 0.2, color = 'white' }: MoonProps) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const angle = clock.getElapsedTime() * speed
    if (ref.current) {
      ref.current.position.x = Math.cos(angle) * radius
      ref.current.position.z = Math.sin(angle) * radius
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  )
}

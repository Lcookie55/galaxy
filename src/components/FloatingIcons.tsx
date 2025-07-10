// src/components/FloatingIcons.tsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type IconProps = {
  count?: number
}

export default function FloatingIcons({ count = 10 }: IconProps) {
  const group = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    group.current?.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh
      mesh.position.y += 0.002 + Math.sin(t + i) * 0.0005
      mesh.rotation.y += 0.005
      if (mesh.position.y > 5) mesh.position.y = -3
    })
  })

  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 8,
            Math.random() * 5 - 3,
            (Math.random() - 0.5) * 8,
          ]}
        >
          <tetrahedronGeometry args={[0.1]} />
          <meshStandardMaterial
            color={['#facc15', '#fb7185', '#60a5fa'][i % 3]}
            emissiveIntensity={0.6}
            emissive={['#facc15', '#fb7185', '#60a5fa'][i % 3]}
          />
        </mesh>
      ))}
    </group>
  )
}

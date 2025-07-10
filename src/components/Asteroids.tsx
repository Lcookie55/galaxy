// src/components/Asteroids.tsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Mesh } from 'three'

type Props = {
  gather: boolean
}

const ASTEROID_COUNT = 25

export default function Asteroids({ gather }: Props) {
  const asteroidRefs = useRef<Mesh[]>([])

  const asteroidData = useMemo(() => {
    return Array.from({ length: ASTEROID_COUNT }).map(() => ({
      origin: new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ),
      offset: new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ),
      speed: Math.random() * 0.002 + 0.001,
      size: 0.2 + Math.random() * 0.2, // <-- Add this line
    }))
  }, [])

  useFrame(() => {
    asteroidRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const data = asteroidData[i]

      if (gather) {
        // Move toward bottom center (around y = -2.5)
        const target = new THREE.Vector3(data.offset.x, -2.5 + data.offset.y, data.offset.z)
        mesh.position.lerp(target, 0.05)
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.color.setStyle(`#${interpolateColor(i)}`)
        }
      } else {
        // Float back to original space
        mesh.rotation.x += data.speed * 10
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.color.set('#9ca3af') // soft gray
        }
        mesh.position.lerp(data.origin, 0.02)
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.color.set('#9ca3af') // soft gray
        }
      }
    })
  })

  function interpolateColor(i: number) {
    const colors = ['f472b6', 'c084fc', '60a5fa', 'facc15', '34d399']
    return colors[i % colors.length]
  }

  return (
    <>
      {asteroidData.map((data, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) asteroidRefs.current[i] = el
          }}
          position={data.origin.clone()}
        >
          <icosahedronGeometry args={[data.size, 0]} /> {/* Use stable size */}
          <meshStandardMaterial color="#9ca3af" flatShading />
        </mesh>
      ))}
    </>
  )
}

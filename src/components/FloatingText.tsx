// src/components/FloatingText.tsx
import { Text } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function FloatingText() {
  const textRef = useRef<any>(null)

  useFrame(() => {
    if (textRef.current) {
      textRef.current.position.y += Math.sin(Date.now() * 0.001) * 0.0002
      textRef.current.rotation.y += 0.001
    }
  })

  return (
    <Text
      ref={textRef}
      position={[0, 2.5, 0]}
      fontSize={0.5}
      color="#e0e7ff"
      anchorX="center"
      anchorY="middle"
      maxWidth={6}
      fontWeight="bold"
    >
      "To those who stood by me—
      {"\n"}your light made the darkness gentle"
    </Text>
  )
}

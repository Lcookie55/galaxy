// src/components/AffirmationText.tsx
import { Text } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'

type Props = {
  message: string
  show: boolean
}

export default function AffirmationText({ show, message }: Props) {
  const { scale, opacity } = useSpring({
    scale: show ? 1 : 0.8,
    opacity: show ? 1 : 0,
    config: { tension: 120, friction: 18 },
  })

  return (
    <a.group scale={scale} position={[0, 0, 0]}>
      <a.group scale={[1, 1, 1]}>
        <Text
          position={[0, -1.1, 0]} // Moved higher so it's clearly visible
          fontSize={0.4}
          color="#fefce8"
          anchorX="center"
          anchorY="middle"
        >
          <a.meshStandardMaterial transparent opacity={opacity} attach="material" />
          {message}
        </Text>
      </a.group>
    </a.group>
  )
}

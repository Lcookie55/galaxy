import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { EffectComposer, Vignette } from '@react-three/postprocessing'
import { CameraShake } from '@react-three/drei'

import Saturn from './components/Saturn'
import Asteroids from './components/Asteroids'
import FloatingText from './components/FloatingText'
import AffirmationText from './components/AffirmationText'
import FloatingIcons from './components/FloatingIcons'
import Moons from './components/Moons'

import { useRef, useState } from 'react'
import * as THREE from 'three'
import confetti from 'canvas-confetti'

// ✅ Messages pool
const messages = [
  "I will rise again.",
  "I am not alone.",
  "Love surrounds me.",
  "Hope is stronger than fear.",
  "Even stars are born in darkness.",
  "I grow through what I go through.",
  "This too shall pass.",
]

// ✅ PowerRing effect
function PowerRing({ trigger }: { trigger: boolean }) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (!mesh.current) return

    const mat = mesh.current.material as THREE.MeshBasicMaterial

    if (trigger) {
      const s = mesh.current.scale.x
      if (s < 4) {
        const newScale = s + 0.2
        mesh.current.scale.set(newScale, newScale, newScale)
        mat.opacity = 1 - newScale / 4
      }
    } else {
      mesh.current.scale.set(0, 0, 0)
      mat.opacity = 1
    }
  })

  return (
    <mesh
      ref={mesh}
      scale={[0, 0, 0]}
      position={[0, -2.5, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <ringGeometry args={[1.5, 1.6, 64]} />
      <meshBasicMaterial color="#a78bfa" transparent opacity={1} />
    </mesh>
  )
}

// ✅ Sound FX (put file in /public/assets/Audio/)
const audio = new Audio('/assets/Audio/confetti_sfx.mp3')

// ✅ Confetti burst
function fireConfetti() {
  for (let i = 0; i < 3; i++) {
    confetti({
      particleCount: 80,
      spread: 70,
      startVelocity: 30,
      origin: { x: 0.5, y: 0.7 },
    })
  }

  audio.currentTime = 0
  audio.play()
}

export default function App() {
  const [isHovered, setIsHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [message, setMessage] = useState(messages[0])

  const handleClick = () => {
    const random = messages[Math.floor(Math.random() * messages.length)]
    setMessage(random)
    setClicked(true)
    fireConfetti()
    setTimeout(() => setClicked(false), 3000)
  }

  return (
    <div className={`relative h-screen w-screen overflow-hidden transition-all duration-1000 ease-in-out
     ${clicked ? 'bg-linear-135 from-purple-900 via-indigo-900 to-zinc-900' : 'bg-linear from-zinc-800 to-zinc-900'}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
        {/* Lights */}
        <ambientLight intensity={10} />
        <pointLight position={[5, 5, 5]} />

        {/* Background Stars */}
        <Stars
          radius={100}
          depth={50}
          count={1200}
          factor={3}
          saturation={0.5}
          fade
        />

        {/* Scene Elements */}
        <Saturn />
        <Moons />
        <Asteroids gather={isHovered} />
        <FloatingIcons />
        <FloatingText />
        <AffirmationText show={clicked} message={message} />
        <PowerRing trigger={clicked} />

        {/* Post Effects */}
        <EffectComposer>
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
          <CameraShake
            maxYaw={0.02}
            maxPitch={0.02}
            maxRoll={0.02}
            yawFrequency={1}
            pitchFrequency={1}
            rollFrequency={1}
            intensity={clicked ? 0.8 : 0}
            decay
            decayRate={0.9}
          />
        </EffectComposer>

        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* Button */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-bold py-4 px-8 rounded-full shadow-2xl transition transform hover:scale-150 active:scale-95 ring-4 ring-fuchsia-300 hover:ring-8 ring-offset-2 ring-offset-black"
        >
          I will be strong
        </button>
      </div>
    </div>
  )
}

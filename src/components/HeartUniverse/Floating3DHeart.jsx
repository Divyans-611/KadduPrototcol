import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { createHeartGeometry } from './heartGeometry'

/**
 * Single 3D glossy Heart with realistic physical material,
 * gentle floating oscillation, click burst/spin animation, and mouse hover effect.
 */
export function Floating3DHeart({
  position = [0, 0, 0],
  scale = 1,
  color = '#e11d48',
  roughness = 0.15,
  metalness = 0.1,
  clearcoat = 1,
  speed = 1.5,
  rotationOffset = [0, 0, 0],
  isHero = false,
  onClick
}) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const initialScale = useRef(scale)

  const geometry = useMemo(() => {
    return createHeartGeometry(isHero ? 0.65 : 0.45, isHero ? 0.28 : 0.2)
  }, [isHero])

  const handleClick = (e) => {
    e.stopPropagation()
    if (!meshRef.current) return

    // GSAP heartbeat pulse & spin animation on click
    gsap.to(meshRef.current.scale, {
      x: initialScale.current * 1.45,
      y: initialScale.current * 1.45,
      z: initialScale.current * 1.45,
      duration: 0.2,
      ease: 'back.out(3)',
      yoyo: true,
      repeat: 1
    })

    gsap.to(meshRef.current.rotation, {
      y: meshRef.current.rotation.y + Math.PI * 2,
      x: meshRef.current.rotation.x + 0.3,
      duration: 0.85,
      ease: 'power2.out'
    })

    if (onClick) onClick()
  }

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Natural rhythmic heartbeat rotation
    const time = state.clock.getElapsedTime() * speed
    meshRef.current.rotation.y = rotationOffset[1] + Math.sin(time * 0.8) * 0.22
    meshRef.current.rotation.x = rotationOffset[0] + Math.cos(time * 0.6) * 0.15
    meshRef.current.rotation.z = rotationOffset[2] + Math.sin(time * 0.4) * 0.1

    // If hero heart, add a soft lifelike lub-dub heartbeat pulse
    if (isHero) {
      const beat = Math.pow(Math.sin(time * 2.2), 63) * 0.08
      const s = (initialScale.current * (hovered ? 1.15 : 1)) + beat
      meshRef.current.scale.set(s, s, s)
    }
  })

  return (
    <Float
      speed={speed}
      rotationIntensity={isHero ? 0.4 : 0.8}
      floatIntensity={isHero ? 0.6 : 1.2}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh
        ref={meshRef}
        position={position}
        scale={scale}
        geometry={geometry}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
      >
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHero ? 0.25 : 0.15}
          roughness={roughness}
          metalness={metalness}
          clearcoat={clearcoat}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
          ior={1.45}
        />
      </mesh>
    </Float>
  )
}

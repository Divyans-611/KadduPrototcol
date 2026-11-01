import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function HeartParticles({ count = 800 }) {
  const pointsRef = useRef()

  const { positions, colors, scales, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const sca = new Float32Array(count)
    const spd = new Float32Array(count)

    // Palette: glowing pinks, crimson, soft peach, star white
    const palette = [
      new THREE.Color('#ff4d6d'),
      new THREE.Color('#ff758f'),
      new THREE.Color('#ff8fa3'),
      new THREE.Color('#c9184a'),
      new THREE.Color('#fff0f3'),
      new THREE.Color('#fed7aa')
    ]

    for (let i = 0; i < count; i++) {
      // Cylindrical / spherical cosmic field distribution
      const r = 2.5 + Math.random() * 18
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * Math.PI

      pos[i * 3] = r * Math.cos(theta) * Math.cos(phi)
      pos[i * 3 + 1] = r * Math.sin(phi) * 1.5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 24

      const chosenColor = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = chosenColor.r
      col[i * 3 + 1] = chosenColor.g
      col[i * 3 + 2] = chosenColor.b

      sca[i] = 0.4 + Math.random() * 1.6
      spd[i] = 0.2 + Math.random() * 0.8
    }

    return {
      positions: pos,
      colors: col,
      scales: sca,
      speeds: spd
    }
  }, [count])

  // Soft circle texture generated programmatically for smooth glow without loading external image
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.3, 'rgba(255, 180, 200, 0.85)')
    gradient.addColorStop(0.7, 'rgba(255, 50, 100, 0.35)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array

    // Gentle upward orbital drift
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i] * delta * 0.45
      // Wrap around when rising too high
      if (pos[i * 3 + 1] > 12) {
        pos[i * 3 + 1] = -12
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y += delta * 0.03
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        vertexColors
        transparent
        opacity={0.88}
        map={particleTexture}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

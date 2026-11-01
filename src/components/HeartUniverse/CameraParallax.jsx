import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Parallax controller: smoothly interpolates camera position
 * based on mouse/touch position with gentle dampening.
 */
export default function CameraParallax({ mouseRef }) {
  const target = new THREE.Vector3(0, 0, 7.5)

  useFrame((state, delta) => {
    const { x, y } = mouseRef.current || { x: 0, y: 0 }
    // Subtle parallax motion on desktop / touch on mobile
    target.x = x * 1.2
    target.y = y * 0.9
    target.z = 7.5 + y * 0.4

    state.camera.position.lerp(target, Math.min(delta * 2.5, 0.1))
    state.camera.lookAt(0, 0, 0)
  })

  return null
}

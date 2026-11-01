import * as THREE from 'three'

/**
 * Creates a smooth, rounded 3D Heart geometry via ExtrudeGeometry
 * with soft bevels to give it high specularity and depth.
 */
export function createHeartGeometry(depth = 0.5, bevel = 0.22) {
  const shape = new THREE.Shape()
  const x = 0, y = 0

  // Parametric cubic Bézier heart shape
  shape.moveTo(x, y + 0.35)
  shape.bezierCurveTo(x, y + 0.35, x - 0.05, y + 0.65, x - 0.35, y + 0.65)
  shape.bezierCurveTo(x - 0.75, y + 0.65, x - 0.75, y + 0.2, x - 0.75, y + 0.2)
  shape.bezierCurveTo(x - 0.75, y - 0.15, x - 0.45, y - 0.52, x, y - 0.85)
  shape.bezierCurveTo(x + 0.45, y - 0.52, x + 0.75, y - 0.15, x + 0.75, y + 0.2)
  shape.bezierCurveTo(x + 0.75, y + 0.2, x + 0.75, y + 0.65, x + 0.35, y + 0.65)
  shape.bezierCurveTo(x + 0.05, y + 0.65, x, y + 0.35, x, y + 0.35)

  const extrudeSettings = {
    steps: 2,
    depth: depth,
    bevelEnabled: true,
    bevelSegments: 8,
    steps: 2,
    bevelSize: bevel,
    bevelThickness: bevel,
    bevelOffset: 0
  }

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  geometry.center()
  return geometry
}

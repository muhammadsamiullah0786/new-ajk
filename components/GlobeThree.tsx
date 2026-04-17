'use client'

import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { cn } from '@/lib/utils'

// ─── Config ───────────────────────────────────────────────────────────────────

const LAT_RINGS  = 28
const LON_RINGS  = 38
const SEG        = 96
const SPIN_SPEED = 0.38  // rad/s  ≈ 1 full revolution every ~16 s

// ─── 6 subtle node positions [phi, theta] ────────────────────────────────────

const NODES: [number, number][] = [
  [0.52, 0.65],
  [0.85, 2.05],
  [1.38, 3.18],
  [0.65, 4.90],
  [1.80, 2.30],
  [1.08, 1.20],
]

// ─── Depth-cued + shimmer GLSL ─────────────────────────────────────────────

const VERT = /* glsl */`
  varying float vZ;
  varying float vY;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vec3 wn = normalize(wp.xyz);
    vZ = wn.z;
    vY = wn.y;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`
const FRAG = /* glsl */`
  uniform vec3  uCol;
  uniform float uTime;
  varying float vZ;
  varying float vY;
  void main() {
    float t  = vZ * 0.5 + 0.5;
    float a  = 0.10 + t * t * 0.62;
    // sweeping brightness band (equator highlight moving north/south)
    float band = 0.5 + 0.5 * sin(vY * 3.5 - uTime * 1.8);
    a += band * 0.10 * t;
    gl_FragColor = vec4(uCol, a);
  }
`

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sph(phi: number, theta: number) {
  return new THREE.Vector3(
    Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta),
  )
}

function buildGrid(): THREE.BufferGeometry {
  const v: number[] = []
  for (let i = 1; i < LAT_RINGS; i++) {
    const phi = (Math.PI * i) / LAT_RINGS
    const y = Math.cos(phi), r = Math.sin(phi)
    for (let j = 0; j < SEG; j++) {
      const a1 = (2 * Math.PI * j) / SEG
      const a2 = (2 * Math.PI * (j + 1)) / SEG
      v.push(r * Math.cos(a1), y, r * Math.sin(a1))
      v.push(r * Math.cos(a2), y, r * Math.sin(a2))
    }
  }
  for (let i = 0; i < LON_RINGS; i++) {
    const theta = (2 * Math.PI * i) / LON_RINGS
    const ct = Math.cos(theta), st = Math.sin(theta)
    for (let j = 0; j < SEG; j++) {
      const p1 = (Math.PI * j) / SEG
      const p2 = (Math.PI * (j + 1)) / SEG
      v.push(Math.sin(p1) * ct, Math.cos(p1), Math.sin(p1) * st)
      v.push(Math.sin(p2) * ct, Math.cos(p2), Math.sin(p2) * st)
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3))
  return g
}

// Build a small flat circle (orbit accent ring) in local XZ plane
function buildRing(r: number, segs: number): THREE.BufferGeometry {
  const v: number[] = []
  for (let i = 0; i < segs; i++) {
    const a1 = (2 * Math.PI * i) / segs
    const a2 = (2 * Math.PI * (i + 1)) / segs
    v.push(r * Math.cos(a1), 0, r * Math.sin(a1))
    v.push(r * Math.cos(a2), 0, r * Math.sin(a2))
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3))
  return g
}

// ─── Scene ────────────────────────────────────────────────────────────────────

function GlobeScene() {
  const grp      = useRef<THREE.Group>(null!)
  const isDragging = useRef(false)
  const nodeRefs = useRef<(THREE.Group | null)[]>([])

  const gridGeo = useMemo(buildGrid, [])
  const gridMat = useMemo(() => new THREE.ShaderMaterial({
    uniforms:       { uCol: { value: new THREE.Color(0x22d3ee) }, uTime: { value: 0 } },
    vertexShader:   VERT,
    fragmentShader: FRAG,
    transparent:    true,
    depthWrite:     false,
    side:           THREE.DoubleSide,
  }), [])

  // Shared dot / halo mats (opacity driven in useFrame)
  const dotGeo  = useMemo(() => new THREE.SphereGeometry(0.016, 10, 8), [])
  const dotMat  = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xdff8ff), transparent: true, opacity: 1.0, depthWrite: false,
  }), [])
  const haloGeo = useMemo(() => new THREE.SphereGeometry(0.036, 10, 8), [])
  const haloMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x38bdf8), transparent: true, opacity: 0.25,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }), [])

  // Orbit accent ring
  const ringGeo = useMemo(() => buildRing(0.044, 40), [])
  const ringMat = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color(0x22d3ee), transparent: true, opacity: 0.30, depthWrite: false,
  }), [])

  // Equatorial glow ring — sits at y=0 (equator) of the sphere
  const equatorGeo = useMemo(() => buildRing(1.008, 96), [])
  const equatorMat = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color(0x67e8f9), transparent: true, opacity: 0.22, depthWrite: false,
  }), [])

  const RING_NODES = new Set([0, 2, 4])
  const positions  = useMemo(
    () => NODES.map(([p, t]) => sph(p, t).multiplyScalar(1.005)),
    [],
  )

  useFrame((_, delta) => {
    const t = (performance.now() / 1000)

    // Continuous spin — delta-based so it's frame-rate independent
    if (!isDragging.current) {
      grp.current.rotation.y += SPIN_SPEED * delta
      grp.current.rotation.x = 0.18 + Math.sin(t * 0.35) * 0.07
    }

    // Feed time to the grid shimmer shader
    gridMat.uniforms.uTime.value = t

    // Overall node pulse (brightness)
    dotMat.opacity  = 0.78 + 0.22 * Math.sin(t * 2.5)
    haloMat.opacity = 0.16 + 0.14 * Math.sin(t * 2.5)

    // Per-node staggered breathing scale
    nodeRefs.current.forEach((ng, i) => {
      if (!ng) return
      const phase = t * 2.0 + (i * Math.PI * 2) / NODES.length
      const s = 0.82 + 0.18 * Math.sin(phase)
      ng.scale.setScalar(s)
    })

    // Equator ring pulse
    equatorMat.opacity = 0.14 + 0.10 * Math.sin(t * 1.2)
  })

  return (
    <>
      <group ref={grp}>
        <lineSegments geometry={gridGeo}     material={gridMat} />
        <lineSegments geometry={equatorGeo}  material={equatorMat} />
        {positions.map((pos, i) => (
          <group key={i} ref={el => { nodeRefs.current[i] = el }} position={pos}>
            <mesh geometry={dotGeo}  material={dotMat}  />
            <mesh geometry={haloGeo} material={haloMat} />
            {RING_NODES.has(i) && (
              <lineSegments geometry={ringGeo} material={ringMat} />
            )}
          </group>
        ))}
        {/* Invisible hit sphere so OrbitControls registers clicks on empty grid */}
        <mesh>
          <sphereGeometry args={[1.0, 8, 8]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.6}
        onStart={() => { isDragging.current = true  }}
        onEnd={()   => { isDragging.current = false }}
      />
    </>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function GlobeThree({ className }: { className?: string }) {
  return (
    <div className={cn('w-full h-full', className)}>
      <Canvas
        camera={{ position: [0, 0, 2.85], fov: 44 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <GlobeScene />
        </Suspense>
      </Canvas>
    </div>
  )
}

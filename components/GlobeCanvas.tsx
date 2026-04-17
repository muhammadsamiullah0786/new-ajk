'use client'

/**
 * GlobeCanvas — lightweight Canvas 2D wireframe globe.
 * No external 3D library required; runs at ~60 fps via requestAnimationFrame.
 *
 * Visual layers (back→front):
 *   1. Background radial glow
 *   2. Atmospheric rim glow
 *   3. Latitude / longitude wireframe grid (depth-cued alpha)
 *   4. Node connection lines
 *   5. Glowing nodes with soft pulse
 *   6. Orbiting particles with fade occlusion
 */

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

// ─── Visual configuration ────────────────────────────────────────────────────

/** Globe radius as a fraction of the canvas' smaller dimension */
const GLOBE_SCALE = 0.52

/** Radians added to globe rotation each animation frame */
const ROT_SPEED = 0.0020

/** Latitude grid lines (horizontal circles) */
const NUM_LAT = 14

/** Longitude grid lines (vertical arcs) */
const NUM_LON = 20

/** Arc segments per grid circle — controls smoothness */
const ARC_SEGS = 90

/**
 * Perspective depth factor.
 * projection scale = FOCAL / (FOCAL − z)  where z ∈ [-1, 1]
 * Higher → shallower / more orthographic feel.
 */
const FOCAL = 7.0

// ─── Fixed glowing nodes on the sphere surface ──────────────────────────────
// phi  = polar angle from north pole (0 → π)
// theta = azimuthal angle (0 → 2π)
// pulse = phase offset for the soft sinusoidal size pulse

const NODES = [
  { phi: 0.55, theta: 0.60, pulse: 0.00 },
  { phi: 1.10, theta: 1.85, pulse: 0.80 },
  { phi: 1.50, theta: 3.20, pulse: 1.60 },
  { phi: 0.85, theta: 5.00, pulse: 0.40 },
  { phi: 1.80, theta: 2.55, pulse: 1.20 },
  { phi: 0.38, theta: 4.10, pulse: 2.00 },
  { phi: 2.20, theta: 0.85, pulse: 0.60 },
  { phi: 1.45, theta: 4.50, pulse: 1.80 },
] as const

/** Pairs of NODES indices to draw thin connection lines between */
const CONNECTIONS = [
  [0, 1], [1, 2], [2, 4], [3, 4],
  [4, 5], [0, 5], [1, 6], [5, 7],
] as const

// ─── Orbiting particles ──────────────────────────────────────────────────────
// Each particle travels a circular orbit whose plane is tilted by `tilt`
// radians around the X axis.  `r` is the orbit radius (>1 = outside sphere).

const ORBIT_DEFS = [
  { a: 0.0, tilt: 0.35, r: 1.19, spd: 0.0070, size: 2.2 },
  { a: 2.1, tilt: 1.05, r: 1.23, spd: 0.0052, size: 1.6 },
  { a: 4.2, tilt: 0.72, r: 1.17, spd: 0.0090, size: 2.6 },
  { a: 1.0, tilt: 1.45, r: 1.21, spd: 0.0060, size: 1.8 },
  { a: 3.5, tilt: 0.28, r: 1.25, spd: 0.0110, size: 1.4 },
]

// ─── Types ───────────────────────────────────────────────────────────────────

interface OrbitState {
  a: number
  tilt: number
  r: number
  spd: number
  size: number
}

interface DrawState {
  rot: number
  time: number
  orbits: OrbitState[]
  mx: number   // smoothed mouse x offset  (−1 … 1)
  my: number   // smoothed mouse y offset
  tmx: number  // target mouse x
  tmy: number  // target mouse y
}

// ─── Helper: spherical → Cartesian (unit sphere, Y-up) ───────────────────────

function sph(phi: number, theta: number): [number, number, number] {
  return [
    Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta),
  ]
}

// ─── Helper: perspective projection ──────────────────────────────────────────

function project(
  x: number, y: number, z: number,
  R: number, cx: number, cy: number,
) {
  // Points facing camera (z > 0) appear slightly larger; back (z < 0) smaller.
  const scale = FOCAL / (FOCAL - z)
  return {
    sx: cx + x * R * scale,
    sy: cy - y * R * scale,  // canvas Y is inverted
    z,
  }
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function GlobeCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const stateRef = useRef<DrawState>({
    rot: 0,
    time: 0,
    orbits: ORBIT_DEFS.map(o => ({ ...o })),
    mx: 0, my: 0,
    tmx: 0, tmy: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement as HTMLElement | null

    // ── Mouse parallax (desktop only) ────────────────────────────────────────
    function onMouseMove(e: MouseEvent) {
      if (!parent) return
      const { left, top, width, height } = parent.getBoundingClientRect()
      stateRef.current.tmx = ((e.clientX - left) / width  - 0.5) * 2
      stateRef.current.tmy = ((e.clientY - top)  / height - 0.5) * 2
    }
    function onMouseLeave() {
      stateRef.current.tmx = 0
      stateRef.current.tmy = 0
    }
    parent?.addEventListener('mousemove', onMouseMove)
    parent?.addEventListener('mouseleave', onMouseLeave)

    // ── Animation frame ───────────────────────────────────────────────────────
    function frame() {
      // Guard in case canvas unmounts between frames
      if (!canvasRef.current) return

      const s = stateRef.current

      // Advance animation state
      s.rot  += ROT_SPEED
      s.time += 0.016   // ~60 fps tick
      for (const o of s.orbits) o.a += o.spd

      // Smooth mouse towards target (soft lerp)
      s.mx += (s.tmx - s.mx) * 0.04
      s.my += (s.tmy - s.my) * 0.04

      // ── Canvas resize ──────────────────────────────────────────────────────
      const canvas = canvasRef.current!  // guarded non-null by check above
      const dpr  = Math.min(window.devicePixelRatio || 1, 2)  // cap at 2× for perf
      const rect = canvas.getBoundingClientRect()
      const W    = rect.width
      const H    = rect.height
      if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
        canvas.width  = W * dpr
        canvas.height = H * dpr
      }

      const ctx = canvas.getContext('2d')!
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)

      // Globe geometry
      const R  = Math.min(W, H) * GLOBE_SCALE
      const cx = W / 2 + s.mx * 10   // subtle parallax shift
      const cy = H / 2 - R * 0.04 + s.my * 7  // shift slightly upward

      // Rotation angle including subtle mouse tilt
      const rot = s.rot + s.mx * 0.06

      ctx.lineWidth = 0.55

      // ── 3a · Latitude grid lines ───────────────────────────────────────────
      // Each outer loop draws one horizontal circle at polar angle `phi`.
      ctx.strokeStyle = 'rgba(0,170,255,1)'
      for (let i = 1; i < NUM_LAT; i++) {
        const phi = (Math.PI * i) / NUM_LAT
        let prevPt: { sx: number; sy: number; z: number } | null = null

        for (let j = 0; j <= ARC_SEGS; j++) {
          const theta = (Math.PI * 2 * j) / ARC_SEGS
          const [x, y, z] = sph(phi, theta + rot)
          const pt = project(x, y, z, R, cx, cy)

          if (prevPt) {
            // Depth-cue alpha: bright on front hemisphere, dim on back
            const avgZ = (pt.z + prevPt.z) / 2
            ctx.globalAlpha = 0.06 + Math.max(0, avgZ) * 0.58
            ctx.beginPath()
            ctx.moveTo(prevPt.sx, prevPt.sy)
            ctx.lineTo(pt.sx, pt.sy)
            ctx.stroke()
          }
          prevPt = pt
        }
      }

      // ── 3b · Longitude grid lines ──────────────────────────────────────────
      for (let i = 0; i < NUM_LON; i++) {
        // theta for this longitude already incorporates globe rotation
        const theta = (Math.PI * 2 * i) / NUM_LON + rot
        let prevPt: { sx: number; sy: number; z: number } | null = null

        for (let j = 0; j <= ARC_SEGS; j++) {
          const phi = (Math.PI * j) / ARC_SEGS
          const [x, y, z] = sph(phi, theta)
          const pt = project(x, y, z, R, cx, cy)

          if (prevPt) {
            const avgZ = (pt.z + prevPt.z) / 2
            ctx.globalAlpha = 0.06 + Math.max(0, avgZ) * 0.55
            ctx.beginPath()
            ctx.moveTo(prevPt.sx, prevPt.sy)
            ctx.lineTo(pt.sx, pt.sy)
            ctx.stroke()
          }
          prevPt = pt
        }
      }

      // ── 4 · Node connection lines ──────────────────────────────────────────
      ctx.strokeStyle = 'rgba(0,200,255,1)'
      ctx.lineWidth   = 0.55

      for (const [ai, bi] of CONNECTIONS) {
        const na = NODES[ai], nb = NODES[bi]
        const [xa, ya, za] = sph(na.phi, na.theta + rot)
        const [xb, yb, zb] = sph(nb.phi, nb.theta + rot)
        const pa = project(xa, ya, za, R, cx, cy)
        const pb = project(xb, yb, zb, R, cx, cy)
        const avgZ = (pa.z + pb.z) / 2
        // Only draw if at least one point is on front hemisphere
        if (avgZ < -0.2) continue
        ctx.globalAlpha = Math.max(0, avgZ) * 0.22
        ctx.beginPath()
        ctx.moveTo(pa.sx, pa.sy)
        ctx.lineTo(pb.sx, pb.sy)
        ctx.stroke()
      }

      // ── 5 · Glowing nodes ─────────────────────────────────────────────────
      for (const n of NODES) {
        const [xn, yn, zn] = sph(n.phi, n.theta + rot)
        if (zn < -0.15) continue  // skip nodes well behind the sphere

        const p     = project(xn, yn, zn, R, cx, cy)
        const pulse = 0.6 + 0.4 * Math.sin(s.time * 1.8 + n.pulse)
        const depth = Math.max(0.3, (zn + 1) * 0.6)

        // ── Crisp node — no blur, technical precision
        ctx.shadowBlur  = 0
        ctx.globalAlpha = 0.88 * depth
        ctx.fillStyle   = 'rgba(0,215,255,1)'
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, (1.5 + pulse * 0.4) * depth, 0, Math.PI * 2)
        ctx.fill()
      }

      // ── 6 · Orbiting particles ─────────────────────────────────────────────
      for (const o of s.orbits) {
        // Circular orbit in XZ-plane, tilted by o.tilt around X axis
        const cosA = Math.cos(o.a)
        const sinA = Math.sin(o.a)
        const ox_base = cosA
        const oy_base = -sinA * Math.sin(o.tilt)
        const oz_base =  sinA * Math.cos(o.tilt)

        // Apply globe Y-axis rotation so particles feel anchored to the globe
        const ox = ox_base * Math.cos(rot) + oz_base * Math.sin(rot)
        const oz = -ox_base * Math.sin(rot) + oz_base * Math.cos(rot)
        const oy = oy_base

        // Smooth alpha fade as particle goes behind the sphere
        const pAlpha = Math.max(0, (oz + 0.4) / 1.4)
        if (pAlpha < 0.01) continue

        const sc  = FOCAL / (FOCAL - oz)
        const sx2 = cx + ox * R * o.r * sc
        const sy2 = cy - oy * R * o.r * sc

        // Crisp orbital node — no glow blur
        ctx.shadowBlur  = 0
        ctx.globalAlpha = pAlpha * 0.65
        ctx.fillStyle   = 'rgba(0,200,255,1)'
        ctx.beginPath()
        ctx.arc(sx2, sy2, o.size * 0.65, 0, Math.PI * 2)
        ctx.fill()
      }

      // Reset compositing state
      ctx.globalAlpha = 1
      ctx.shadowBlur  = 0

      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafRef.current)
      parent?.removeEventListener('mousemove', onMouseMove)
      parent?.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={cn('block w-full h-full', className)}
      aria-hidden="true"
    />
  )
}

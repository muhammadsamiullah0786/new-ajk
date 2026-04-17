'use client'

/**
 * AuroraBackground — layered animated gradient blobs.
 *
 * Renders purely with CSS transforms + Tailwind custom `aurora` keyframe.
 * No canvas, no JS per-frame — GPU-accelerated, minimal CPU cost.
 * Position: fixed, z-0, pointer-events-none — sits behind all content.
 */

export default function AuroraBackground() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* ── Blob 1 — top-left large cyan ── */}
      <div
        className="absolute animate-aurora"
        style={{
          top: '-20%',
          left: '-15%',
          width: '70vw',
          height: '70vw',
          maxWidth: 900,
          maxHeight: 900,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(0,180,240,0.14) 0%, rgba(0,100,200,0.07) 45%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── Blob 2 — right-center deep blue ── */}
      <div
        className="absolute animate-aurora-slow"
        style={{
          top: '15%',
          right: '-18%',
          width: '65vw',
          height: '65vw',
          maxWidth: 850,
          maxHeight: 850,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(0,80,220,0.18) 0%, rgba(0,50,180,0.09) 40%, transparent 68%)',
          filter: 'blur(80px)',
        }}
      />

      {/* ── Blob 3 — bottom-center cyan accent ── */}
      <div
        className="absolute animate-aurora-fast"
        style={{
          bottom: '-18%',
          left: '20%',
          width: '55vw',
          height: '55vw',
          maxWidth: 720,
          maxHeight: 720,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(0,200,255,0.10) 0%, rgba(0,120,200,0.05) 45%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* ── Blob 4 — mid-left softer blue ── */}
      <div
        className="absolute animate-aurora"
        style={{
          top: '40%',
          left: '-10%',
          width: '40vw',
          height: '40vw',
          maxWidth: 520,
          maxHeight: 520,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(20,80,200,0.12) 0%, transparent 65%)',
          filter: 'blur(55px)',
          animationDelay: '8s',
        }}
      />

      {/* ── Fine dot grid overlay for depth ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.025,
          backgroundImage:
            'radial-gradient(circle, rgba(0,200,255,0.7) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Very subtle vignette to pull focus to center ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(1,8,16,0.55) 100%)',
        }}
      />
    </div>
  )
}

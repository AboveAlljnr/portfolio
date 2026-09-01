import { useEffect, useRef } from 'react'

export default function GrainBlob() {
  return (
    <>
      {/* ── Animated Gradient Mesh Blobs ──────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Blob 1 — Electric Blue (top-left) */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '-15%',
          width: '70vw',
          height: '70vw',
          maxWidth: 900,
          maxHeight: 900,
          borderRadius: '50%',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent-1) 35%, transparent) 0%, color-mix(in srgb, var(--color-accent-1) 15%, transparent) 45%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'blob-drift-1 28s ease-in-out infinite',
          willChange: 'transform',
        }} />

        {/* Blob 2 — Violet (center-right) */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '-20%',
          width: '65vw',
          height: '65vw',
          maxWidth: 850,
          maxHeight: 850,
          borderRadius: '50%',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent-2) 30%, transparent) 0%, color-mix(in srgb, var(--color-accent-2) 15%, transparent) 40%, transparent 70%)',
          filter: 'blur(90px)',
          animation: 'blob-drift-2 35s ease-in-out infinite',
          willChange: 'transform',
        }} />

        {/* Blob 3 — Hot Pink (bottom-center) */}
        <div style={{
          position: 'absolute',
          bottom: '-25%',
          left: '30%',
          width: '60vw',
          height: '60vw',
          maxWidth: 800,
          maxHeight: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent-3) 25%, transparent) 0%, color-mix(in srgb, var(--color-accent-3) 10%, transparent) 40%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'blob-drift-3 40s ease-in-out infinite',
          willChange: 'transform',
        }} />

        {/* Blob 4 — Lime accent (bottom-left) */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '-10%',
          width: '40vw',
          height: '40vw',
          maxWidth: 600,
          maxHeight: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent-4) 15%, transparent) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'blob-drift-1 22s ease-in-out infinite reverse',
          willChange: 'transform',
        }} />
      </div>

      {/* ── SVG Grain Noise Overlay ──────────────────────────────────── */}
      <svg
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 201,
          opacity: 0.045,
          mixBlendMode: 'overlay',
        }}
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </>
  )
}

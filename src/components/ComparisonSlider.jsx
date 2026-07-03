import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useTransform, useMotionValueEvent } from 'framer-motion'
import { MoveHorizontal } from 'lucide-react'

export default function ComparisonSlider({ beforeImage, afterImage, beforeAlt = 'Before', afterAlt = 'After' }) {
  const containerRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [positionPct, setPositionPct] = useState(50)
  const position = useMotionValue(50)
  const clipPath = useTransform(position, (v) => `inset(0 ${100 - v}% 0 0)`)
  const handleLeft = useTransform(position, (v) => `${v}%`)

  useMotionValueEvent(position, 'change', (v) => setPositionPct(v))

  const showBefore = positionPct < 88
  const showAfter = positionPct > 12

  const updateFromClientX = useCallback(
    (clientX) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const pct = ((clientX - rect.left) / rect.width) * 100
      position.set(Math.min(100, Math.max(0, pct)))
    },
    [position]
  )

  const handlePointerDown = (e) => {
    // Capture the pointer so the drag keeps tracking even when the finger
    // or cursor leaves the container mid-gesture.
    e.currentTarget.setPointerCapture?.(e.pointerId)
    setDragging(true)
    updateFromClientX(e.clientX)
  }
  const handlePointerMove = (e) => {
    if (dragging) updateFromClientX(e.clientX)
  }
  const stopDragging = () => setDragging(false)

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-3xl border border-teal-100/80 bg-teal-50 shadow-card [touch-action:pan-y]"
    >
      <img src={afterImage} alt={afterAlt} className="absolute inset-0 h-full w-full object-cover" />
      <motion.div style={{ clipPath }} className="absolute inset-0">
        <img src={beforeImage} alt={beforeAlt} className="h-full w-full object-cover" />
      </motion.div>

      {showBefore && (
        <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-navy/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm transition-opacity duration-200">
          Before
        </span>
      )}
      {showAfter && (
        <span className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-navy/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm transition-opacity duration-200">
          After
        </span>
      )}

      <motion.div
        style={{ left: handleLeft }}
        className="absolute top-0 z-20 h-full w-0.5 -translate-x-1/2 bg-white shadow-[0_0_16px_rgba(255,255,255,0.9)]"
      >
        <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-glow ring-4 ring-teal-400/25">
          <MoveHorizontal className="h-5 w-5 text-teal-600" strokeWidth={2.5} />
        </div>
      </motion.div>
    </div>
  )
}

import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { MoveHorizontal, Sparkles } from 'lucide-react'
import beforeImg from '../assets/smile-before.jpg'
import afterImg from '../assets/smile-after.jpg'

export default function SmileTransformer() {
  const containerRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const position = useMotionValue(50) // percentage, 0 = full "before", 100 = full "after"
  const clipPath = useTransform(position, (v) => `inset(0 ${100 - v}% 0 0)`)
  const handleLeft = useTransform(position, (v) => `${v}%`)

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
    setDragging(true)
    updateFromClientX(e.clientX)
  }
  const handlePointerMove = (e) => {
    if (dragging) updateFromClientX(e.clientX)
  }
  const stopDragging = () => setDragging(false)

  return (
    <section id="transformation" className="relative bg-gradient-to-b from-teal-50/50 to-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-label mb-5">Real Patient Results</span>
          <h2 className="font-display text-4xl font-extrabold text-teal-950 sm:text-5xl">
            Drag to See the <span className="gradient-text">Smile Transformer</span>
          </h2>
          <p className="mt-4 text-lg text-teal-900/60">
            Slide to compare a before &amp; after Emax Veneers transformation from our clinic.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerLeave={stopDragging}
          className="relative mx-auto mt-14 aspect-[16/9] w-full max-w-3xl select-none overflow-hidden rounded-[2rem] border border-white/60 shadow-card"
        >
          {/* AFTER (base layer, full width) */}
          <div className="absolute inset-0">
            <img src={afterImg} alt="After Emax Veneers" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 px-6 pb-6 text-center text-white">
              <p className="flex items-center gap-2 font-display text-2xl font-extrabold">
                <Sparkles className="h-5 w-5" strokeWidth={1.5} />
                After — Emax Veneers
              </p>
              <p className="text-sm text-white/80">Bright, symmetrical, camera-ready smile</p>
            </div>
          </div>

          {/* BEFORE (clipped overlay) */}
          <motion.div style={{ clipPath }} className="absolute inset-0">
            <img src={beforeImg} alt="Before treatment" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 px-6 pb-6 text-center text-white">
              <p className="flex items-center gap-2 font-display text-2xl font-extrabold">
                <Sparkles className="h-5 w-5 opacity-60" strokeWidth={1.5} />
                Before Treatment
              </p>
              <p className="text-sm text-white/80">Discolored, uneven, worn enamel</p>
            </div>
          </motion.div>

          {/* Divider handle */}
          <motion.div
            style={{ left: handleLeft }}
            className="absolute top-0 h-full w-1 -translate-x-1/2 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
          >
            <div className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-glow ring-4 ring-teal-500/30">
              <MoveHorizontal className="h-5 w-5 text-teal-600" strokeWidth={2.5} />
            </div>
          </motion.div>
        </motion.div>

        <p className="mt-6 text-center text-xs font-medium text-teal-900/40">
          Drag the handle left &amp; right to compare
        </p>
      </div>
    </section>
  )
}

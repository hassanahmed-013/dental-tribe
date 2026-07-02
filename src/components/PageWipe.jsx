import { motion } from 'framer-motion'
import ToothIcon from './ToothIcon'

const wipeTiming = { duration: 1.0, times: [0, 0.35, 0.65, 1], ease: [0.76, 0, 0.24, 1] }

const particles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: 15 + (i % 4) * 22,
  y: 20 + Math.floor(i / 4) * 35,
  delay: i * 0.04,
  size: 4 + (i % 3) * 2,
}))

export default function PageWipe({ onDone }) {
  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: ['-100%', '0%', '0%', '100%'] }}
      transition={wipeTiming}
      onAnimationComplete={onDone}
      className="pointer-events-none fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-700 via-teal-500 to-cyan-400"
    >
      {/* Ambient particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.6, 0], scale: [0, 1.5, 0], y: [0, -30] }}
          transition={{ duration: 0.8, delay: p.delay + 0.2, ease: 'easeOut' }}
          className="absolute rounded-full bg-white/40"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.1, 1, 0.7], rotate: [-30, 0, 0, 20] }}
        transition={wipeTiming}
        className="relative flex flex-col items-center gap-4"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20 shadow-glow backdrop-blur-xl">
          <ToothIcon className="h-12 w-12 text-white" strokeWidth={9} />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
          transition={wipeTiming}
          className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white/90"
        >
          Booking
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

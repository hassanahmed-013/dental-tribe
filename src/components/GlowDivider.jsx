import { motion } from 'framer-motion'

// A pulsing horizontal light-arc used to bridge two sections — the same
// "bright seam" effect used to punctuate section transitions on premium
// dark-hero sites, reworked in the clinic's teal/cyan brand.
export default function GlowDivider({ className = '' }) {
  return (
    <div className={`pointer-events-none relative z-10 h-0 ${className}`} aria-hidden="true">
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5], scaleX: [0.85, 1, 0.85] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-0 h-32 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400/30 blur-3xl"
      />
    </div>
  )
}

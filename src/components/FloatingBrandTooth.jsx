import { motion } from 'framer-motion'
import brandLogo from '../assets/brand-logo.jpeg'

const floaters = [
  { size: 52, top: '14%', left: '5%', duration: 14, delay: 0 },
  { size: 36, top: '70%', left: '3%', duration: 18, delay: 2 },
  { size: 64, top: '10%', right: '7%', duration: 16, delay: 1 },
  { size: 44, top: '78%', right: '4%', duration: 20, delay: 3 },
]

export default function FloatingBrandTooth() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {floaters.map((f, i) => (
        <motion.img
          key={i}
          src={brandLogo}
          alt=""
          className="absolute rounded-2xl object-cover opacity-[0.07] shadow-sm"
          style={{
            width: f.size,
            height: f.size,
            top: f.top,
            left: f.left,
            right: f.right,
          }}
          animate={{
            y: [0, -28, 0, 22, 0],
            x: [0, 18, 0, -14, 0],
            rotate: [0, 8, 0, -6, 0],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export function HeroBrandTooth() {
  return (
    <motion.div
      animate={{ y: [0, -18, 0, 14, 0], rotate: [0, 3, 0, -2, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      className="overflow-hidden rounded-[2rem] shadow-glow ring-4 ring-white/40"
    >
      <img src={brandLogo} alt="Dental Tribe" className="h-64 w-64 object-cover" />
    </motion.div>
  )
}

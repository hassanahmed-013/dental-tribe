import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, Clock, CalendarCheck } from 'lucide-react'
import ServiceIcon from './ServiceIcon'
import { CATEGORY_COLORS } from '../data/serviceMeta'

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
}

function HoverLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
      <span className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
      <span className="absolute bottom-0 right-0 h-px w-full origin-right scale-x-0 bg-gradient-to-l from-teal-400 via-cyan-400 to-transparent transition-transform duration-700 delay-100 group-hover:scale-x-100" />
      <span className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-gradient-to-b from-teal-400 via-cyan-400 to-transparent transition-transform duration-700 delay-150 group-hover:scale-y-100" />
      <span className="absolute right-0 bottom-0 h-full w-px origin-bottom scale-y-0 bg-gradient-to-t from-teal-400 via-cyan-400 to-transparent transition-transform duration-700 delay-200 group-hover:scale-y-100" />
    </div>
  )
}

export default function ServiceCard({ service }) {
  const navigate = useNavigate()
  const cardRef = useRef(null)
  const accent = CATEGORY_COLORS[service.category] || CATEGORY_COLORS.Restorative
  const [ripples, setRipples] = useState([])
  const [isNavigating, setIsNavigating] = useState(false)
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springConfig = { stiffness: 220, damping: 20, mass: 0.6 }
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [12, -12]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), springConfig)
  const glowX = useTransform(mouseX, [0, 1], ['0%', '100%'])
  const glowY = useTransform(mouseY, [0, 1], ['0%', '100%'])
  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(260px circle at ${x} ${y}, rgba(0,194,209,0.35), transparent 70%)`
  )

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
    setHovered(false)
  }

  const handleClick = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return

    setRipples((prev) => [
      ...prev,
      { id: Date.now(), x: e.clientX - rect.left, y: e.clientY - rect.top },
    ])
    setIsNavigating(true)
    setTimeout(() => navigate(`/services/${service.slug}`), 380)
  }

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      exit="exit"
      viewport={{ once: true, amount: 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        layoutId={`service-card-${service.slug}`}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        animate={isNavigating ? { scale: 0.94, opacity: 0.8 } : { scale: 1, opacity: 1 }}
        whileHover={isNavigating ? {} : { scale: 1.04 }}
        className="group relative cursor-pointer overflow-hidden rounded-3xl border border-teal-100/80 bg-gradient-to-br from-white via-white to-teal-50/50 p-6 shadow-card backdrop-blur-xl transition-shadow duration-500 hover:border-teal-300/60 hover:shadow-glow"
      >
        <HoverLines />

        <motion.div
          className="pointer-events-none absolute -inset-1 rounded-3xl"
          style={{ background: glowBackground, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Scan line on hover */}
        <motion.div
          initial={{ top: '-10%' }}
          animate={hovered ? { top: '110%' } : { top: '-10%' }}
          transition={{ duration: 1.2, ease: 'linear', repeat: hovered ? Infinity : 0 }}
          className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/60 to-transparent"
        />

        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ width: 0, height: 0, opacity: 0.5 }}
              animate={{ width: 450, height: 450, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="pointer-events-none absolute rounded-full bg-teal-400/25"
              style={{ left: ripple.x, top: ripple.y, transform: 'translate(-50%, -50%)' }}
              onAnimationComplete={() => setRipples((prev) => prev.filter((r) => r.id !== ripple.id))}
            />
          ))}
        </AnimatePresence>

        <div style={{ transform: 'translateZ(40px)' }} className="relative flex items-start justify-between">
          <motion.div
            layoutId={`service-icon-${service.slug}`}
            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} shadow-glow`}
          >
            <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <ServiceIcon type={service.iconType} className="relative h-9 w-9 text-white" />
          </motion.div>
          <span className="rounded-full bg-teal-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-700">
            {service.category}
          </span>
        </div>

        <h3 style={{ transform: 'translateZ(30px)' }} className="relative mt-5 font-display text-lg font-bold text-teal-950">
          {service.name}
        </h3>
        <p style={{ transform: 'translateZ(20px)' }} className="relative mt-1.5 text-sm leading-relaxed text-teal-900/60">
          {service.tagline}
        </p>

        <div style={{ transform: 'translateZ(20px)' }} className="relative mt-4 flex items-center gap-3 text-xs font-semibold text-teal-700/80">
          {service.duration && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {service.duration}
            </span>
          )}
          {service.duration && service.visits && <span className="h-1 w-1 rounded-full bg-teal-400" />}
          {service.visits && <span>{service.visits}</span>}
        </div>

        <div style={{ transform: 'translateZ(30px)' }} className="relative mt-5 flex items-center justify-between border-t border-teal-100/80 pt-5">
          <div>
            <span className="btn-ghost !px-0 !py-0 !shadow-none group-hover:!text-teal-700">
              <CalendarCheck className="h-4 w-4" />
              Book Appointment
            </span>
          </div>
          <motion.div
            className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${accent} text-white shadow-glow`}
            whileHover={{ rotate: 45, scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <ArrowUpRight className="h-5 w-5" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

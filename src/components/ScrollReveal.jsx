import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function ScrollReveal({ children, className = '', delay = 0, direction = 'up' }) {
  const y = direction === 'up' ? 48 : direction === 'down' ? -48 : 0
  const x = direction === 'left' ? 48 : direction === 'right' ? -48 : 0

  return (
    <motion.div
      custom={delay}
      initial={{ opacity: 0, y, x, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ScrollStagger({ children, className = '' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ScrollStaggerItem({ children, className = '' }) {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

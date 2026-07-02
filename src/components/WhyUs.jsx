import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import { resolveContentIcon } from '../lib/contentIcons'
import ToothIcon from './ToothIcon'
import ScrollReveal, { ScrollStagger, ScrollStaggerItem } from './ScrollReveal'

export default function WhyUs() {
  const { home } = useSiteContent()
  const whyUs = home.whyUs

  return (
    <section id="why-us" className="relative overflow-hidden bg-gradient-to-b from-white to-teal-50/50 py-24">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem]"
        aria-hidden="true"
      >
        <ToothIcon className="h-full w-full text-teal-500/[0.04]" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="section-label mb-5">{whyUs.sectionLabel}</span>
          <h2 className="font-display text-4xl font-extrabold text-teal-950 sm:text-5xl">
            Care That Feels <span className="gradient-text">{whyUs.titleAccent || 'Premium'}</span>
          </h2>
        </ScrollReveal>

        <ScrollStagger className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.reasons.map((r, i) => {
            const Icon = resolveContentIcon(r.icon, ShieldCheck)
            return (
            <ScrollStaggerItem key={r.title}>
            <motion.div
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glass-card group p-7 text-center transition-shadow duration-300 hover:shadow-glow"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-glow"
              >
                <Icon className="h-7 w-7 text-white" />
              </motion.div>
              <h3 className="font-display text-lg font-bold text-navy">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-teal-900/60">{r.desc}</p>
            </motion.div>
            </ScrollStaggerItem>
            )
          })}
        </ScrollStagger>
      </div>
    </section>
  )
}

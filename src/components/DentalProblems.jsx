import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import ScrollReveal, { ScrollStagger, ScrollStaggerItem } from './ScrollReveal'

export default function DentalProblems() {
  const { dentalProblems, home } = useSiteContent()
  const section = home.dentalProblemsSection
  return (
    <section id="problems" className="relative bg-gradient-to-b from-teal-50/50 to-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-glow">
            <Sparkles className="h-9 w-9 text-white" />
          </div>
          <h2 className="font-display text-4xl font-extrabold text-navy sm:text-5xl">
            {section?.title || 'Common Dental Problems & Their Solutions'}
          </h2>
          <p className="mt-4 text-lg text-teal-900/60">
            {section?.subtitle || 'From everyday concerns to complete smile makeovers — we have a treatment for every stage.'}
          </p>
        </ScrollReveal>

        <ScrollStagger className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dentalProblems.map((problem) => (
            <ScrollStaggerItem key={problem.id}>
              <Link to={`/problems/${problem.id}`} className="block">
              <motion.article
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-3xl border border-white/80 bg-white shadow-card"
              >
                <div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${problem.tone}`}>
                  <img
                    src={problem.image}
                    alt={problem.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-lg font-bold text-white">{problem.title}</h3>
                    <p className="mt-1 text-sm text-teal-100/90">{problem.solution}</p>
                    <p className="mt-2 text-xs font-semibold text-cyan-200">Learn more →</p>
                  </div>
                </div>
              </motion.article>
              </Link>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>

        <ScrollReveal className="mt-12 text-center">
          <a href="#services" className="btn-navy inline-flex">
            Explore All Treatments
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}

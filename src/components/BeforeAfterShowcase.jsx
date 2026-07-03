import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSiteContent } from '../context/SiteContentContext'
import ComparisonSlider from './ComparisonSlider'
import ScrollReveal from './ScrollReveal'

export default function BeforeAfterShowcase() {
  const { beforeAfterCases, home } = useSiteContent()
  const section = home.beforeAfterSection
  const [activeId, setActiveId] = useState(beforeAfterCases[0]?.id)

  useEffect(() => {
    if (!beforeAfterCases.some((item) => item.id === activeId)) {
      setActiveId(beforeAfterCases[0]?.id)
    }
  }, [beforeAfterCases, activeId])

  const active = useMemo(
    () => beforeAfterCases.find((c) => c.id === activeId) ?? beforeAfterCases[0],
    [beforeAfterCases, activeId]
  )

  if (!active) return null

  return (
    <section id="results" className="section-pad relative bg-gradient-to-b from-white via-teal-50/40 to-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="section-label mb-5">{section?.sectionLabel || 'Real Patient Results'}</span>
          <h2 className="section-heading text-navy">
            Before &amp; After <span className="gradient-text">{section?.titleAccent || 'Transformations'}</span>
          </h2>
          <p className="mt-4 text-base text-teal-900/60 sm:text-lg">
            {section?.subtitle || 'Drag the slider to compare results across our most popular treatments.'}
          </p>
        </ScrollReveal>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {beforeAfterCases.map((item) => {
            const isActive = item.id === activeId
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-navy text-white shadow-md'
                    : 'bg-white text-teal-600 ring-1 ring-teal-100 hover:bg-teal-50 hover:text-teal-700'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14"
          >
            <ComparisonSlider
              beforeImage={active.beforeImage}
              afterImage={active.afterImage}
              beforeAlt={`${active.label} before`}
              afterAlt={`${active.label} after`}
            />

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-500">{active.subtitle}</p>
              <h3 className="mt-3 font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
                {active.title}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-teal-900/70">{active.description}</p>
              <a href="#services" className="btn-cyan mt-6 inline-flex w-full sm:mt-8 sm:w-auto">
                Book {active.label} Consultation
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

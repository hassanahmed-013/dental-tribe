import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSiteContent } from '../context/SiteContentContext'
import ScrollReveal from './ScrollReveal'

export default function FAQ() {
  const { home } = useSiteContent()
  const faqItems = home.faq
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="relative bg-gradient-to-b from-teal-50/40 to-white py-24">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal className="text-center">
          <span className="section-label mb-5">FAQ</span>
          <h2 className="font-display text-4xl font-extrabold text-navy sm:text-5xl">
            Questions? <span className="gradient-text">We&apos;ve Got Answers</span>
          </h2>
        </ScrollReveal>

        <div className="mt-12 space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <ScrollReveal key={item.q} delay={i * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-display text-base font-bold text-navy">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-teal-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="border-t border-teal-50 px-5 pb-4 pt-2 text-sm leading-relaxed text-teal-900/70">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

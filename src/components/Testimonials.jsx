import { Star, Quote } from 'lucide-react'
import { TESTIMONIALS } from '../data/homeContent'
import ScrollReveal, { ScrollStagger, ScrollStaggerItem } from './ScrollReveal'

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="section-label mb-5">Patient Stories</span>
          <h2 className="font-display text-4xl font-extrabold text-teal-950 sm:text-5xl">
            What Our <span className="gradient-text">Patients Say</span>
          </h2>
          <p className="mt-4 text-lg text-teal-900/60">
            Real feedback from patients across Lahore and beyond.
          </p>
        </ScrollReveal>

        <ScrollStagger className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <ScrollStaggerItem key={t.name}>
              <article className="glass-card relative h-full p-7">
                <Quote className="absolute right-6 top-6 h-8 w-8 text-teal-100" />
                <Stars count={t.rating} />
                <p className="mt-4 text-sm leading-relaxed text-teal-900/70">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 border-t border-teal-100 pt-5">
                  <p className="font-display font-bold text-teal-950">{t.name}</p>
                  <p className="text-xs text-teal-500">{t.area} · {t.treatment}</p>
                </div>
              </article>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  )
}

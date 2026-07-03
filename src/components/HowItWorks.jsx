import { Phone, ClipboardList, CalendarCheck } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import { resolveContentIcon } from '../lib/contentIcons'
import ScrollReveal from './ScrollReveal'
import FunnelCTABand from './FunnelCTABand'

const FALLBACK_ICONS = {
  phone: Phone,
  clipboard: ClipboardList,
  calendar: CalendarCheck,
}

export default function HowItWorks() {
  const { clinic, home } = useSiteContent()
  const section = home.howItWorks

  const steps = section.steps.map((item) => {
    let desc = item.desc
    if (item.usesClinicHours) {
      desc = `Pick your preferred evening slot (${clinic.openTimeDisplay} – ${clinic.closeTimeDisplay}) and confirm on WhatsApp. Our team replies personally.`
    }
    return {
      ...item,
      desc,
      icon: resolveContentIcon(item.icon, FALLBACK_ICONS[item.icon] || Phone),
    }
  })

  return (
    <section id="how-it-works" className="section-pad relative bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="section-label mb-5">{section.sectionLabel}</span>
          <h2 className="section-heading text-navy">
            {section.title}
          </h2>
          <p className="mt-4 text-base text-teal-900/60 sm:text-lg">{section.subtitle}</p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 sm:mt-16 sm:gap-8 md:grid-cols-3">
          {steps.map((item, i) => {
            const Icon = item.icon
            return (
              <ScrollReveal key={item.step} delay={i * 0.08} className="h-full">
                <article className="relative flex h-full min-h-[280px] flex-col rounded-3xl border border-teal-100/80 bg-white p-8 shadow-card transition-shadow hover:shadow-glow">
                  <span className="absolute right-5 top-5 rounded-xl bg-navy px-3 py-1.5 text-xs font-bold text-white">
                    {item.step}
                  </span>
                  <div className="mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-glow">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-teal-900/65">{item.desc}</p>
                </article>
              </ScrollReveal>
            )
          })}
        </div>

        <FunnelCTABand
          className="mt-12 sm:mt-16"
          title="Start in 3 easy steps"
          subtitle="Choose your treatment, pick an evening slot, and confirm on WhatsApp — we reply within minutes."
        />
      </div>
    </section>
  )
}

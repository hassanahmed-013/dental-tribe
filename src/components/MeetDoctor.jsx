import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Clock, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import ScrollReveal from './ScrollReveal'

const featureIcons = [ShieldCheck, Clock, Sparkles, MapPin]

export default function MeetDoctor() {
  const { clinic, home } = useSiteContent()
  const doctorBio = home.doctorBio
  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-b from-white via-teal-50/30 to-white py-24">
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-teal-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-cyan-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <span className="section-label mb-5">About Our Clinic</span>
          <h2 className="font-display text-4xl font-extrabold leading-tight text-navy sm:text-5xl">
            {clinic.aboutTitle}
          </h2>
        </ScrollReveal>

        {/* Photo + intro — equal-height columns on desktop */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-14">
          <ScrollReveal direction="right" className="flex h-full w-full">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="relative flex h-full w-full"
            >
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-teal-400/20 to-cyan-400/10 blur-2xl" />
              <div className="relative aspect-[4/3] h-full w-full overflow-hidden rounded-[2rem] border border-white/80 shadow-[0_24px_60px_rgba(0,33,71,0.15)] lg:aspect-auto">
                <img
                  src={clinic.aboutImage}
                  alt={clinic.aboutImageAlt}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-navy/10 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-5">
                  <div className="min-w-0 rounded-2xl bg-white/95 px-3 py-2.5 shadow-lg backdrop-blur-sm sm:px-4 sm:py-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-teal-600 sm:text-xs">Dental Tribe</p>
                    <p className="font-display text-xs font-bold text-navy sm:text-sm">{clinic.doctorFullName}</p>
                  </div>
                  <div className="shrink-0 rounded-2xl bg-navy/90 px-3 py-2.5 text-white shadow-lg backdrop-blur-sm sm:px-4 sm:py-3">
                    <p className="text-xl font-extrabold leading-none sm:text-2xl">{clinic.stats[3].value}</p>
                    <p className="mt-0.5 text-[10px] font-medium text-teal-200 sm:text-[11px]">{clinic.stats[3].label}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} direction="left" className="flex h-full w-full">
            <div className="flex w-full flex-col justify-center">
              <blockquote className="border-l-4 border-teal-400 pl-5 text-base italic leading-relaxed text-teal-900/75 sm:text-lg">
                &ldquo;{doctorBio.quote}&rdquo;
              </blockquote>

              <p className="mt-5 text-base leading-relaxed text-teal-900/65">{clinic.aboutDescription}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#services" className="btn-cyan inline-flex">
                  Book a Visit
                  <ArrowRight className="h-4 w-4" />
                </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-teal-200 bg-white px-6 py-3 font-bold text-navy transition-all hover:border-teal-300 hover:bg-teal-50"
              >
                  <MapPin className="h-4 w-4" />
                  Get Directions
                </Link>
              </div>

              <p className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-teal-900/50">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                <span>
                  {clinic.openTimeDisplay} – {clinic.closeTimeDisplay} daily · {clinic.address}
                </span>
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats — full width below photo row */}
        <ScrollReveal delay={0.15} className="mt-12">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {clinic.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col justify-center rounded-2xl border border-teal-100/80 bg-white/80 px-4 py-4 text-center shadow-sm backdrop-blur-sm sm:px-5 sm:py-5"
              >
                <p className="font-display text-2xl font-extrabold text-navy sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold text-teal-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Features — full width grid */}
        <ScrollReveal delay={0.2} className="mt-10">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {clinic.aboutFeatures.map((feature, i) => {
              const Icon = featureIcons[i] ?? ShieldCheck
              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 rounded-2xl border border-teal-100/60 bg-white/70 px-4 py-3.5 transition-colors hover:border-teal-200 hover:bg-white"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-glow">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-bold text-navy">{feature.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-teal-900/60">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

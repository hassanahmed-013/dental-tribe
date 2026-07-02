import { MapPin, Clock, Phone, Navigation } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import { buildWhatsappUrl } from '../lib/whatsapp'
import ScrollReveal from './ScrollReveal'

const MAP_EMBED =
  'https://maps.google.com/maps?q=Ghazi+Chowk+Nespak+Road+Awaisia+Housing+Society+Lahore&t=&z=16&ie=UTF8&iwloc=&output=embed'

const MAP_LINK =
  'https://www.google.com/maps/search/?api=1&query=Ghazi+Chowk+Nespak+Road+Awaisia+Housing+Society+Lahore'

export default function ClinicLocation() {
  const { clinic: CLINIC } = useSiteContent()
  return (
    <section id="location" className="relative bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="section-label mb-5">Find Us</span>
          <h2 className="font-display text-4xl font-extrabold text-teal-950 sm:text-5xl">
            Visit Our <span className="gradient-text">Clinic</span>
          </h2>
          <p className="mt-4 text-lg text-teal-900/60">
            Conveniently located near Ghazi Chowk, Lahore — open every evening.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ScrollReveal direction="right">
            <div className="overflow-hidden rounded-3xl border border-teal-100 shadow-card">
              <iframe
                title="Dental Tribe clinic location"
                src={MAP_EMBED}
                className="h-[320px] w-full border-0 sm:h-[400px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} direction="left">
            <div className="flex h-full flex-col justify-center gap-6">
              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50">
                    <MapPin className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-teal-950">Address</p>
                    <p className="mt-1 text-sm leading-relaxed text-teal-900/65">{CLINIC.address}</p>
                    <p className="mt-1 text-xs font-medium text-teal-500">Landmark: Near Ghazi Chowk</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50">
                    <Clock className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-teal-950">Clinic Hours</p>
                    <p className="mt-1 text-sm text-teal-900/65">
                      Open <strong className="text-teal-700">daily</strong> from{' '}
                      {CLINIC.openTimeDisplay} to {CLINIC.closeTimeDisplay}
                    </p>
                    <p className="mt-1 text-xs text-teal-500">Perfect for after-work appointments</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={`tel:+${CLINIC.whatsappNumber}`} className="btn-secondary !text-sm">
                  <Phone className="h-4 w-4" />
                  {CLINIC.phoneDisplay}
                </a>
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !text-sm"
                >
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </a>
              </div>

              <a
                href={buildWhatsappUrl(`Hello ${CLINIC.doctor}, I need directions to the clinic.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-teal-600 hover:text-teal-800"
              >
                Ask for directions on WhatsApp →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

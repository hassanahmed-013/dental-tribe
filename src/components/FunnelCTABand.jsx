import { CalendarCheck, MessageCircle, Phone } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import { buildWhatsappUrl } from '../lib/whatsapp'
import { scrollToSection } from '../lib/scroll'
import ScrollReveal from './ScrollReveal'

export default function FunnelCTABand({
  title = 'Ready for your best smile?',
  subtitle = 'Book your evening slot in under 2 minutes — confirm instantly on WhatsApp.',
  className = '',
}) {
  const { clinic } = useSiteContent()

  const whatsappLink = buildWhatsappUrl(
    `Hello ${clinic.doctor}, I would like to book an appointment at Dental Tribe. Please share available evening slots.`
  )

  const goToServices = () => {
    scrollToSection('services')
    window.history.replaceState(null, '', '/#services')
  }

  return (
    <ScrollReveal className={className}>
      <div className="relative overflow-hidden rounded-3xl border border-teal-200/80 bg-gradient-to-br from-navy via-[#0a3d5c] to-teal-800 px-6 py-10 text-center shadow-card sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-teal-400/15 blur-3xl" />

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/90">Evening appointments · Lahore</p>
        <h3 className="relative mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl">{title}</h3>
        <p className="relative mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">{subtitle}</p>

        <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <button type="button" onClick={goToServices} className="btn-cyan w-full sm:w-auto sm:min-w-[200px]">
            <CalendarCheck className="h-4 w-4" />
            Book Evening Slot
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-bold text-white shadow-[0_4px_20px_rgba(37,211,102,0.35)] transition-all hover:bg-[#20bd5a] sm:w-auto sm:min-w-[200px]"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Us
          </a>
          <a
            href={`tel:+${clinic.whatsappNumber}`}
            className="btn-hero-outline w-full !rounded-full sm:w-auto sm:min-w-[160px]"
          >
            <Phone className="h-4 w-4" />
            Call {clinic.phoneDisplay}
          </a>
        </div>
      </div>
    </ScrollReveal>
  )
}

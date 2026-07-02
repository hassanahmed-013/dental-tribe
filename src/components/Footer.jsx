import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, MessageCircle, CalendarCheck } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import { buildWhatsappUrl } from '../lib/whatsapp'
import brandLogo from '../assets/brand-logo.jpeg'

export default function Footer() {
  const { clinic: CLINIC } = useSiteContent()
  const whatsappLink = buildWhatsappUrl(`Hello ${CLINIC.doctor}, I have a question about your treatments.`)

  return (
    <footer id="contact" className="relative overflow-hidden bg-teal-950 pt-20 pb-10 text-teal-50">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-teal-500/20 blur-3xl" />
      <img
        src={brandLogo}
        alt=""
        className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rotate-12 rounded-3xl object-cover opacity-[0.04]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="glass-card !bg-white/10 !border-white/10 mb-16 flex flex-col items-center gap-6 rounded-3xl p-10 text-center"
        >
          <h3 className="font-display text-3xl font-extrabold sm:text-4xl">
            Ready for Your Best <span className="text-cyan-400">Smile Yet?</span>
          </h3>
          <p className="max-w-xl text-teal-100/70">
            Book your evening slot online or message us on WhatsApp — our team confirms personally in minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#services" className="btn-primary">
              <CalendarCheck className="h-5 w-5" />
              Book Appointment
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-cyan-400/60 bg-transparent px-8 py-3.5 font-bold text-cyan-300 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-white"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 border-t border-white/10 pt-12 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={brandLogo} alt="Dental Tribe" className="h-10 w-10 rounded-xl object-cover shadow-md" />
              <p className="font-display text-lg font-extrabold">Dental Tribe</p>
            </div>
            <p className="mt-3 text-sm text-teal-100/60">{CLINIC.doctorFullName}</p>
            <p className="text-xs text-teal-100/40">{CLINIC.credentials}</p>
            <p className="mt-1 text-xs text-teal-100/40">{CLINIC.registration}</p>
          </div>

          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2 text-teal-100/80">
              <Phone className="h-4 w-4 text-cyan-400" /> {CLINIC.phoneDisplay}
            </p>
            <p className="flex items-center gap-2 text-teal-100/80">
              <MapPin className="h-4 w-4 text-cyan-400" /> {CLINIC.address}
            </p>
            <p className="flex items-center gap-2 text-teal-100/80">
              <Clock className="h-4 w-4 text-cyan-400" />
              Open Daily {CLINIC.openTimeDisplay} – {CLINIC.closeTimeDisplay}
            </p>
          </div>

          <div className="text-sm text-teal-100/60">
            <p className="mb-2 font-semibold text-teal-100">Quick Links</p>
            <div className="flex flex-col gap-2">
              <a href="#about" className="transition-colors hover:text-cyan-400">About Dr. Shahab</a>
              <a href="#services" className="transition-colors hover:text-cyan-400">Our Treatments</a>
              <a href="#testimonials" className="transition-colors hover:text-cyan-400">Patient Reviews</a>
              <a href="/blog" className="transition-colors hover:text-cyan-400">Blog</a>
              <a href="/contact" className="transition-colors hover:text-cyan-400">Contact Us</a>
              <a href="/contact" className="transition-colors hover:text-cyan-400">Contact Us</a>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-teal-100/40">
          © {new Date().getFullYear()} Dental Tribe — Dr. Shahab &amp; Associates. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

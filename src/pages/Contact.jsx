import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Phone, MessageCircle, Mail, Navigation, CalendarCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import ClinicStatusDot from '../components/ClinicStatusDot'
import { useSiteContent } from '../context/SiteContentContext'
import { buildWhatsappUrl } from '../lib/whatsapp'

export default function Contact() {
  const { clinic: CLINIC } = useSiteContent()
  const navigate = useNavigate()

  const contactCards = useMemo(
    () => [
      {
        icon: Phone,
        title: 'Call Us',
        lines: [CLINIC.phoneDisplay, 'Evening clinic — 5 PM to 10 PM'],
        action: { label: 'Call Now', href: `tel:+${CLINIC.whatsappNumber}` },
      },
      {
        icon: MessageCircle,
        title: 'WhatsApp',
        lines: ['Fastest way to book or ask a question', 'We reply personally, usually within minutes'],
        action: {
          label: 'Chat on WhatsApp',
          href: buildWhatsappUrl(`Hello ${CLINIC.doctor}, I would like to get in touch.`),
          external: true,
        },
      },
      {
        icon: MapPin,
        title: 'Visit Us',
        lines: [CLINIC.address, `Landmark: ${CLINIC.landmark}`],
        action: { label: 'Get Directions', href: CLINIC.mapDirections, external: true },
      },
      {
        icon: Clock,
        title: 'Clinic Hours',
        lines: [
          `Open daily ${CLINIC.openTimeDisplay} – ${CLINIC.closeTimeDisplay}`,
          'Last appointment slot: 9:30 PM',
        ],
        action: { label: 'Book Appointment', section: 'services' },
      },
    ],
    [CLINIC]
  )

  const whatsappLink = buildWhatsappUrl(`Hello ${CLINIC.doctor}, I would like to book an appointment.`)

  const goToServices = () => {
    navigate({ pathname: '/', hash: '#services' })
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="section-label mb-5">Get In Touch</span>
            <h1 className="font-display text-4xl font-extrabold text-navy sm:text-5xl">Contact Us</h1>
            <p className="mt-4 text-lg text-teal-900/60">
              Reach Dental Tribe for appointments, directions, or treatment advice — we&apos;re here every evening.
            </p>
            <div className="mt-5 flex justify-center">
              <ClinicStatusDot />
            </div>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {contactCards.map((card, i) => {
              const Icon = card.icon
              const actionClass = 'mt-5 inline-flex text-sm font-bold text-teal-600 hover:text-teal-700'

              return (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-3xl border border-teal-100/80 bg-white p-7 shadow-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-glow">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="mt-5 font-display text-xl font-bold text-navy">{card.title}</h2>
                  {card.lines.map((line) => (
                    <p key={line} className="mt-2 text-sm leading-relaxed text-teal-900/65">
                      {line}
                    </p>
                  ))}
                  {card.action.section ? (
                    <button type="button" onClick={goToServices} className={actionClass}>
                      {card.action.label} →
                    </button>
                  ) : (
                    <a
                      href={card.action.href}
                      {...(card.action.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className={actionClass}
                    >
                      {card.action.label} →
                    </a>
                  )}
                </motion.article>
              )
            })}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="overflow-hidden rounded-3xl border border-teal-100 shadow-card"
            >
              <iframe
                title="Dental Tribe clinic location"
                src={CLINIC.mapEmbed}
                className="h-[360px] w-full border-0 sm:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-col justify-center rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50/80 to-white p-8"
            >
              <h2 className="font-display text-2xl font-bold text-navy">{CLINIC.name}</h2>
              <p className="mt-1 text-sm font-medium text-teal-600">{CLINIC.doctorFullName}</p>
              <p className="mt-1 text-xs text-teal-500">{CLINIC.credentials}</p>
              <p className="mt-1 text-xs text-teal-500">{CLINIC.registration}</p>

              <ul className="mt-6 space-y-4 text-sm text-teal-900/70">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />
                  {CLINIC.address}
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-teal-500" />
                  {CLINIC.phoneDisplay}
                </li>
                {CLINIC.email && (
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-teal-500" />
                    <a href={`mailto:${CLINIC.email}`} className="hover:text-teal-700">
                      {CLINIC.email}
                    </a>
                  </li>
                )}
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-teal-500" />
                  {CLINIC.openTimeDisplay} – {CLINIC.closeTimeDisplay} daily
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={goToServices} className="btn-cyan inline-flex">
                  <CalendarCheck className="h-4 w-4" />
                  Book Appointment
                </button>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-navy inline-flex"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href={CLINIC.mapDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-5 py-3 font-bold text-navy hover:bg-teal-50"
                >
                  <Navigation className="h-4 w-4" />
                  Directions
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

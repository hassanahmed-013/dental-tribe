import { CalendarCheck, MessageCircle } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useSiteContent } from '../context/SiteContentContext'
import { buildWhatsappUrl } from '../lib/whatsapp'
import { scrollToSection } from '../lib/scroll'

export default function MobileStickyCTA() {
  const location = useLocation()
  const { clinic } = useSiteContent()

  if (location.pathname.startsWith('/admin')) return null

  const whatsappLink = buildWhatsappUrl(
    `Hello ${clinic.doctor}, I would like to book an appointment at Dental Tribe.`
  )

  const goToServices = () => {
    if (location.pathname !== '/') {
      window.location.href = '/#services'
      return
    }
    scrollToSection('services')
    window.history.replaceState(null, '', '/#services')
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy/95 p-3 shadow-[0_-8px_30px_rgba(0,33,71,0.25)] backdrop-blur-md lg:hidden safe-bottom">
      <div className="mx-auto flex max-w-lg gap-2">
        <button
          type="button"
          onClick={goToServices}
          className="btn-cyan flex-1 !px-3 !py-3 text-sm"
        >
          <CalendarCheck className="h-4 w-4 shrink-0" />
          Book Slot
        </button>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-3 py-3 text-sm font-bold text-white"
        >
          <MessageCircle className="h-4 w-4 shrink-0" />
          WhatsApp
        </a>
      </div>
    </div>
  )
}

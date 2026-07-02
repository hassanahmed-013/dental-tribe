import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSiteContent } from '../context/SiteContentContext'
import { scrollToSection, scrollToTop } from '../lib/scroll'
import ClinicStatusDot from './ClinicStatusDot'
import brandLogo from '../assets/brand-logo.jpeg'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', section: 'services' },
  { label: 'About', section: 'about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
]

export default function Navbar() {
  const { clinic: CLINIC } = useSiteContent()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goHome = (onClick) => {
    setOpen(false)
    onClick?.()

    if (location.pathname !== '/' || location.hash) {
      navigate('/')
    } else {
      scrollToTop()
    }
  }

  const goToSection = (sectionId) => {
    setOpen(false)

    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: `#${sectionId}` })
      return
    }

    scrollToSection(sectionId)
    window.history.replaceState(null, '', `/#${sectionId}`)
  }

  const NavLinkItem = ({ href, section, children, onClick, className }) => {
    if (href === '/') {
      return (
        <button type="button" onClick={() => goHome(onClick)} className={className}>
          {children}
        </button>
      )
    }

    if (section) {
      return (
        <button type="button" onClick={() => { onClick?.(); goToSection(section) }} className={className}>
          {children}
        </button>
      )
    }

    if (href === '/' || href.startsWith('/contact') || href.startsWith('/blog')) {
      return (
        <Link to={href} onClick={onClick} className={className}>
          {children}
        </Link>
      )
    }

    return (
      <a href={href} onClick={onClick} className={className}>
        {children}
      </a>
    )
  }

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 px-3 transition-all duration-300 sm:px-4 ${scrolled ? 'pt-2' : 'pt-4'}`}>
      <div className="mx-auto flex max-w-7xl items-center gap-2 sm:gap-3">
        <NavLinkItem href="/" className={`flex shrink-0 items-center gap-2.5 rounded-full bg-navy px-3 py-2.5 shadow-[0_8px_32px_rgba(0,33,71,0.2)] sm:gap-3 sm:px-4 sm:py-3 xl:px-5 ${
          scrolled ? 'shadow-[0_8px_40px_rgba(0,33,71,0.18)]' : 'shadow-[0_12px_48px_rgba(0,33,71,0.12)]'
        }`}>
          <img
            src={brandLogo}
            alt="Dental Tribe — Dr. Shahab & Associates"
            className="h-10 w-10 rounded-xl object-cover shadow-md ring-1 ring-white/20 sm:h-11 sm:w-11 xl:h-12 xl:w-12"
          />
          <div className="hidden leading-tight lg:block">
            <p className="font-display text-sm font-bold tracking-tight text-white xl:text-base">Dental Tribe</p>
            <p className="hidden text-[10px] font-medium text-teal-200/80 xl:block">Dr. Shahab &amp; Associates</p>
          </div>
        </NavLinkItem>

        <div
          className={`flex min-w-0 flex-1 items-center justify-between gap-2 rounded-full bg-nav-light py-2 pl-3 pr-2.5 sm:gap-3 sm:pl-4 sm:pr-3 xl:gap-4 xl:pl-5 xl:pr-4 ${
            scrolled ? 'shadow-[0_8px_40px_rgba(0,33,71,0.12)]' : 'shadow-[0_12px_48px_rgba(0,33,71,0.08)]'
          }`}
        >
          <nav className="hidden min-w-0 items-center gap-0.5 lg:flex xl:gap-1">
            {navItems.map((item) => (
              <NavLinkItem
                key={item.label}
                href={item.href}
                section={item.section}
                className="nav-link-compact"
              >
                {item.label}
              </NavLinkItem>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-1.5 lg:flex xl:gap-2.5">
            <ClinicStatusDot compact className="hidden 2xl:flex" />
            <ClinicStatusDot compact short className="2xl:hidden" />
            <a
              href={`tel:+${CLINIC.whatsappNumber}`}
              className="btn-navy !px-3 !py-2 text-xs xl:!px-4 xl:!py-2.5 xl:text-sm"
            >
              <Phone className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
              <span className="hidden xl:inline">Call Now</span>
              <span className="xl:hidden">Call</span>
            </a>
            <NavLinkItem section="services" className="btn-cyan whitespace-nowrap !px-3 !py-2 text-xs xl:!px-4 xl:!py-2.5 xl:text-sm">
              <span className="hidden xl:inline">Book Appointment</span>
              <span className="xl:hidden">Book</span>
            </NavLinkItem>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-navy lg:ml-0 lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl bg-white shadow-2xl lg:hidden"
          >
            <div className="flex flex-col p-4">
              <div className="mb-2 px-1">
                <ClinicStatusDot />
              </div>
              {navItems.map((item) => (
                <NavLinkItem
                  key={item.label}
                  href={item.href}
                  section={item.section}
                  onClick={() => setOpen(false)}
                  className="mobile-nav-link"
                >
                  {item.label}
                </NavLinkItem>
              ))}
              <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
                <a href={`tel:+${CLINIC.whatsappNumber}`} className="btn-navy w-full text-sm">
                  Call {CLINIC.phoneDisplay}
                </a>
                <NavLinkItem section="services" onClick={() => setOpen(false)} className="btn-cyan w-full text-sm">
                  Book Appointment
                </NavLinkItem>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

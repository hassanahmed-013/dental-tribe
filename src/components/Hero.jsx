import { motion } from 'framer-motion'
import { Trophy, Shield, Users, Star, CalendarCheck, MessageCircle } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import { buildWhatsappUrl } from '../lib/whatsapp'
import { resolveContentIcon } from '../lib/contentIcons'
import { scrollToSection } from '../lib/scroll'
import LiveCounter from './LiveCounter'
import GlowVideoCutout from './GlowVideoCutout'
import brandLogo from '../assets/brand-logo.jpeg'

const stats = [
  { icon: Trophy, text: '15+ Years of Dental Excellence' },
  { icon: Shield, text: 'Strict Sterilization & Safety Protocols' },
  { icon: Users, text: 'Expert Consultants — Dr. Shahab & Associates' },
  { icon: Star, text: '5,000+ Happy Patients in Lahore' },
]

export default function Hero() {
  const { clinic, home } = useSiteContent()
  const hero = home.hero
  const heroStats = hero.stats?.map((stat) => ({
    icon: resolveContentIcon(stat.icon, Trophy),
    text: stat.text,
  })) ?? stats

  const whatsappBookLink = buildWhatsappUrl(
    `Hello ${clinic.doctor}, I would like to book an appointment. Please share available evening slots.`
  )

  const goToServices = () => {
    scrollToSection('services')
    window.history.replaceState(null, '', '/#services')
  }

  return (
    <section id="home" className="relative min-h-0 overflow-hidden sm:min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#0a3d5c] to-teal-800" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url(${hero.backgroundImage})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/20" />

      <motion.div
        aria-hidden="true"
        style={{ rotate: 24 }}
        animate={{ opacity: [0, 0.5, 0], x: ['-30%', '30%', '80%'] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
        className="pointer-events-none absolute -top-1/4 right-0 h-[160%] w-40 bg-gradient-to-b from-transparent via-cyan-300/40 to-transparent blur-2xl"
      />

      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute hidden lg:block"
          style={{
            top: `${8 + i * 20}%`,
            left: `${2 + i * 4}%`,
          }}
          animate={{
            y: [0, -25, 0, 20, 0],
            x: [0, 15, 0, -12, 0],
            rotate: [0, 6, 0, -5, 0],
          }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        >
          <img
            src={brandLogo}
            alt=""
            className="rounded-2xl object-cover opacity-[0.12] shadow-sm"
            style={{ width: 48 + i * 16, height: 48 + i * 16 }}
          />
        </motion.div>
      ))}

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-4 pb-6 pt-24 sm:gap-10 sm:px-6 sm:pb-14 sm:pt-28 lg:min-h-screen lg:grid-cols-[0.9fr_1.4fr] lg:gap-6 lg:pb-40 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 max-w-xl lg:order-none"
        >
          <LiveCounter dark />

          <h1 className="mt-4 font-display text-[2rem] font-extrabold leading-[1.08] tracking-tight text-white sm:mt-6 sm:text-5xl lg:text-6xl">
            {hero.headlineLine1}
            <br />
            <span className="text-cyan-300">{hero.headlineAccent || hero.headlineLine2}</span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:mt-5 sm:text-lg">{hero.subcopy}</p>

          {/* Hero video — visible on all screens */}
          <div className="pointer-events-none relative mx-auto mt-6 flex items-center justify-center sm:mt-8 lg:hidden">
            <GlowVideoCutout src={hero.videoPath || '/hero-tooth.mp4'} className="glow-video-wrap--mobile" />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
            <button type="button" onClick={goToServices} className="btn-cyan w-full sm:w-auto">
              <CalendarCheck className="h-4 w-4" />
              Book Evening Slot
            </button>
            <a
              href={whatsappBookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/15 px-6 py-3.5 font-bold text-white backdrop-blur-sm transition-all hover:bg-[#25D366]/25 sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <a href="#why-us" className="btn-hero-outline w-full sm:w-auto">
              About Us
            </a>
          </div>

          <p className="mt-4 text-center text-xs font-medium text-cyan-200/80 sm:text-left">
            Free consultation · Open {clinic.openTimeDisplay}–{clinic.closeTimeDisplay} · Lahore
          </p>
        </motion.div>

        {/* Desktop hero video */}
        <div className="pointer-events-none relative order-2 mx-auto hidden items-center justify-center lg:order-none lg:flex">
          <GlowVideoCutout src={hero.videoPath || '/hero-tooth.mp4'} />
        </div>
      </div>

      <div className="relative bg-navy/95 backdrop-blur-sm sm:absolute sm:bottom-0 sm:left-0 sm:right-0">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {heroStats.map((stat, i) => (
            <motion.div
              key={stat.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3 px-4 py-4 sm:px-6 sm:py-5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 sm:h-10 sm:w-10">
                <stat.icon className="h-4 w-4 text-cyan-400 sm:h-5 sm:w-5" />
              </div>
              <p className="text-xs font-semibold leading-snug text-white/90 sm:text-sm">{stat.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

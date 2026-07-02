import { motion } from 'framer-motion'
import { Trophy, Shield, Users, Star } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import { buildWhatsappUrl } from '../lib/whatsapp'
import { resolveContentIcon } from '../lib/contentIcons'
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
    `Hello ${clinic.doctor}, I would like to book an appointment. Please share available slots.`
  )

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#0a3d5c] to-teal-800" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url(${hero.backgroundImage})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/20" />

      {/* Diagonal light sweep — slow-moving glowing beam across the dark hero */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0, 0.5, 0], x: ['-30%', '30%', '80%'] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
        className="pointer-events-none absolute -top-1/4 right-0 h-[160%] w-40 rotate-[24deg] bg-gradient-to-b from-transparent via-cyan-300/40 to-transparent blur-2xl"
      />

      {/* Floating logo — your brand image, continuous motion (kept to the text side so it never crosses the video) */}
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

      {/* Main content */}
      <div className="relative mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-40 pt-32 lg:grid-cols-[0.9fr_1.4fr] lg:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <LiveCounter dark />

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {hero.headlineLine1}
            <br />
            <span className="text-cyan-300">{hero.headlineAccent || hero.headlineLine2}</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg text-white/75">{hero.subcopy}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#why-us" className="btn-hero-outline">
              About Us
            </a>
            <a href={whatsappBookLink} target="_blank" rel="noopener noreferrer" className="btn-cyan">
              Book Appointment
            </a>
          </div>
        </motion.div>

        {/* Hero video — screen blend + radial mask so no square box on the navy bg */}
        <div className="pointer-events-none relative mx-auto hidden items-center justify-center lg:flex">
          <GlowVideoCutout src={hero.videoPath || '/hero-tooth.mp4'} />
        </div>
      </div>

      {/* Stats bar — SmileOn style */}
      <div className="absolute bottom-0 left-0 right-0 bg-navy/95 backdrop-blur-sm">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {heroStats.map((stat, i) => (
            <motion.div
              key={stat.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3 px-6 py-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500/15">
                <stat.icon className="h-5 w-5 text-cyan-400" />
              </div>
              <p className="text-sm font-semibold leading-snug text-white/90">{stat.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

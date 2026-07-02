import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BellRing, X } from 'lucide-react'
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebaseConfig'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ServiceGrid from '../components/ServiceGrid'
import BeforeAfterShowcase from '../components/BeforeAfterShowcase'
import DentalProblems from '../components/DentalProblems'
import WhyUs from '../components/WhyUs'
import MeetDoctor from '../components/MeetDoctor'
import HowItWorks from '../components/HowItWorks'
import GoogleReviews from '../components/GoogleReviews'
import FAQ from '../components/FAQ'
import TrustBar from '../components/TrustBar'
import GlowDivider from '../components/GlowDivider'
import Footer from '../components/Footer'
import FloatingBrandTooth from '../components/FloatingBrandTooth'
import WhatsAppFloat from '../components/WhatsAppFloat'

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

// Only surface a booking as "live" social proof if it actually happened
// recently — otherwise a quiet clinic would permanently show its one and
// only appointment from last month as if it just came in.
const RECENT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const TOAST_VISIBLE_MS = 8000

export default function Home() {
  const [liveToast, setLiveToast] = useState(null)
  const lastDocId = useRef(null)
  const hideTimer = useRef(null)

  useEffect(() => {
    const latestAppointmentQuery = query(
      collection(db, 'appointments'),
      orderBy('timestamp', 'desc'),
      limit(1)
    )

    const unsubscribe = onSnapshot(
      latestAppointmentQuery,
      (snapshot) => {
        if (snapshot.empty) {
          setLiveToast(null)
          return
        }

        const latestDoc = snapshot.docs[0]
        const data = latestDoc.data()
        const bookedAt = data.timestamp?.toDate ? data.timestamp.toDate() : null

        // Same document we've already shown — nothing new to announce.
        if (!bookedAt || latestDoc.id === lastDocId.current) return

        const ageMs = Date.now() - bookedAt.getTime()
        if (ageMs > RECENT_WINDOW_MS) {
          setLiveToast(null)
          return
        }

        lastDocId.current = latestDoc.id
        setLiveToast({
          id: latestDoc.id,
          city: data.city || 'Pakistan',
          serviceName: data.serviceName || 'a treatment',
        })

        clearTimeout(hideTimer.current)
        hideTimer.current = setTimeout(() => setLiveToast(null), TOAST_VISIBLE_MS)
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.error('Live social proof listener failed:', error)
        setLiveToast(null)
      }
    )

    return () => {
      unsubscribe()
      clearTimeout(hideTimer.current)
    }
  }, [])

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative min-h-screen bg-white"
    >
      <FloatingBrandTooth />
      <Navbar />
      <Hero />
      <GlowDivider />
      <MeetDoctor />
      <DentalProblems />
      <BeforeAfterShowcase />
      <HowItWorks />
      <ServiceGrid />
      <GoogleReviews />
      <WhyUs />
      <FAQ />
      <TrustBar />
      <Footer />
      <WhatsAppFloat />

      <div className="pointer-events-none fixed bottom-5 left-5 z-40 max-w-xs">
        <AnimatePresence>
          {liveToast && (
            <motion.div
              key={liveToast.id}
              initial={{ opacity: 0, x: -60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.9, transition: { duration: 0.25 } }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-card backdrop-blur-xl"
            >
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500">
                <BellRing className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold leading-snug text-teal-950">
                  Someone from {liveToast.city} just booked {liveToast.serviceName}!
                </p>
                <p className="mt-1 text-xs text-teal-900/50">Just now</p>
              </div>
              <button
                onClick={() => setLiveToast(null)}
                aria-label="Dismiss notification"
                className="text-teal-900/30 transition-colors hover:text-teal-900/70"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

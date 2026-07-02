import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, Sparkles } from 'lucide-react'
import { collection, query, where, onSnapshot, Timestamp } from 'firebase/firestore'
import { db } from '../lib/firebaseConfig'

function startOfTodayTimestamp() {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Timestamp.fromDate(startOfDay)
}

export default function LiveCounter({ dark = false }) {
  const [count, setCount] = useState(null)

  useEffect(() => {
    const appointmentsToday = query(
      collection(db, 'appointments'),
      where('timestamp', '>=', startOfTodayTimestamp())
    )

    // If Firestore never responds (e.g. project isn't configured yet),
    // fall back to 0 instead of spinning the loading state forever.
    const stallTimeout = setTimeout(() => setCount((c) => (c === null ? 0 : c)), 8000)

    const unsubscribe = onSnapshot(
      appointmentsToday,
      (snapshot) => {
        clearTimeout(stallTimeout)
        setCount(snapshot.size)
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.error('Live counter listener failed:', error)
        clearTimeout(stallTimeout)
        setCount(0)
      }
    )

    return () => {
      unsubscribe()
      clearTimeout(stallTimeout)
    }
  }, [])

  // No real bookings yet today (or still resolving) — never show a "0
  // appointments" badge, it reads as proof nobody wants this clinic.
  // Show a generic premium tagline instead, and only switch to the live
  // flame counter once the real database count is actually > 0.
  if (count === null || count === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur-sm ${
          dark
            ? 'border-cyan-400/30 bg-cyan-400/15 text-cyan-100'
            : 'border-teal-200 bg-teal-50/80 text-teal-700'
        }`}
      >
        <Sparkles className={`h-4 w-4 ${dark ? 'text-cyan-300' : 'text-teal-500'}`} />
        Premium dental care engineered to last
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur-sm ${
        dark
          ? 'border-cyan-400/30 bg-cyan-400/15 text-cyan-100'
          : 'border-orange-200 bg-orange-50/80 text-orange-700'
      }`}
    >
      <motion.span
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Flame className={`h-4 w-4 ${dark ? 'fill-cyan-300 text-cyan-300' : 'fill-orange-500 text-orange-500'}`} />
      </motion.span>
      <span className="flex items-center gap-1">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={count}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="font-display tabular-nums"
          >
            {count}
          </motion.span>
        </AnimatePresence>
        {count === 1 ? 'appointment' : 'appointments'} booked today
      </span>
    </motion.div>
  )
}

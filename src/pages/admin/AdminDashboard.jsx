import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore'
import {
  Stethoscope,
  CalendarDays,
  Wallet,
  Users,
  Plus,
  ArrowRight,
  Sparkles,
  User,
  MapPin,
  Database,
  Loader2,
} from 'lucide-react'
import { db } from '../../lib/firebaseConfig'
import { useServices } from '../../lib/useServices'
import { seedAllFirestoreData } from '../../lib/seedAll'
import { commitFirestoreWrite } from '../../lib/firestoreWrite'

const NEW_BADGE_WINDOW_MS = 10 * 60 * 1000 // 10 minutes

function startOfToday() {
  const d = new Date()
  return Timestamp.fromDate(new Date(d.getFullYear(), d.getMonth(), d.getDate()))
}

function isToday(date) {
  return date && date >= startOfToday().toDate()
}

// Crossfades the digits whenever `value` changes, so every stat card visibly
// "ticks" the moment a new appointment lands via onSnapshot — the whole point
// of the dashboard is proving the data is live, not just correct.
function AnimatedStat({ value }) {
  return (
    <span className="relative inline-block overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block tabular-nums"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function StatCard({ stat, i }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springConfig = { stiffness: 200, damping: 20, mass: 0.6 }
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), springConfig)
  const glowX = useTransform(mouseX, [0, 1], ['0%', '100%'])
  const glowY = useTransform(mouseY, [0, 1], ['0%', '100%'])
  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(220px circle at ${x} ${y}, rgba(49,170,190,0.28), transparent 70%)`
  )

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
    setHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08 }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.02 }}
        className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-teal-400/30 hover:bg-white/[0.07]"
      >
        <motion.div
          className="pointer-events-none absolute -inset-1 rounded-2xl"
          style={{ background: glowBackground, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <div
          className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${stat.color} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
        />
        <div style={{ transform: 'translateZ(30px)' }} className="relative flex items-start justify-between">
          <motion.div
            animate={{ boxShadow: ['0 0 0px rgba(49,170,190,0)', '0 0 22px rgba(49,170,190,0.35)', '0 0 0px rgba(49,170,190,0)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color}`}
          >
            <stat.icon className="h-5 w-5 text-white" />
          </motion.div>
          {stat.live && (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              />
              Live
            </span>
          )}
        </div>
        <p style={{ transform: 'translateZ(20px)' }} className="relative font-display text-3xl font-extrabold text-white">
          <AnimatedStat value={stat.value} />
        </p>
        <p style={{ transform: 'translateZ(20px)' }} className="relative mt-1 text-sm text-slate-400">{stat.label}</p>
      </motion.div>
    </motion.div>
  )
}

export default function AdminDashboard() {
  const { services } = useServices({ includeInactive: true })
  const [appointments, setAppointments] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [syncMessage, setSyncMessage] = useState(null)
  const [syncError, setSyncError] = useState(false)

  useEffect(() => {
    const allQ = query(collection(db, 'appointments'), orderBy('timestamp', 'desc'))
    const unsub = onSnapshot(allQ, (snap) => {
      setAppointments(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          bookedAt: d.data().timestamp?.toDate?.() ?? null,
        }))
      )
      setLoaded(true)
    })
    return unsub
  }, [])

  const todayAppointments = useMemo(() => appointments.filter((a) => isToday(a.bookedAt)), [appointments])
  const todayRevenue = useMemo(
    () => todayAppointments.reduce((sum, a) => sum + (Number(a.price) || 0), 0),
    [todayAppointments]
  )

  const recent = appointments.slice(0, 6)
  const activeServices = services.filter((s) => s.active !== false).length

  const handleSyncAllData = async () => {
    setSyncing(true)
    setSyncMessage(null)
    setSyncError(false)
    try {
      const result = await commitFirestoreWrite(() => seedAllFirestoreData(), 30000)
      setSyncMessage(
        `Success! Synced ${result.treatments} treatments, clinic info, homepage, ${result.siteContent.dentalProblems} problems, and ${result.siteContent.beforeAfter} before/after cases to Firebase.`
      )
    } catch (err) {
      setSyncError(true)
      setSyncMessage(err.message || 'Could not sync data to Firebase. Check you are logged in and Firestore rules are deployed.')
    } finally {
      setSyncing(false)
    }
  }

  const stats = [
    { label: 'Active Treatments', value: activeServices, icon: Stethoscope, color: 'from-teal-500 to-cyan-500' },
    { label: "Today's Bookings", value: todayAppointments.length, icon: CalendarDays, color: 'from-emerald-500 to-teal-500', live: true },
    { label: "Today's Revenue", value: `Rs. ${todayRevenue.toLocaleString('en-PK')}`, icon: Wallet, color: 'from-amber-500 to-orange-500', live: true },
    { label: 'Total Appointments', value: appointments.length, icon: Users, color: 'from-violet-500 to-purple-500', live: true },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">Welcome back — here&apos;s your clinic at a glance.</p>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
          <motion.span
            animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex h-2 w-2 rounded-full bg-emerald-400"
          />
          Connected to Firestore — Live
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} i={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-white">Quick Actions</h2>
          </div>
          <div className="space-y-3">
            <Link
              to="/admin/services"
              className="group flex items-center justify-between rounded-xl border border-teal-500/20 bg-teal-500/10 px-5 py-4 transition-all hover:border-teal-400/40 hover:bg-teal-500/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/20">
                  <Plus className="h-4.5 w-4.5 text-teal-400" />
                </div>
                <span className="font-semibold text-teal-100">Add New Treatment</span>
              </div>
              <ArrowRight className="h-4 w-4 text-teal-400 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/admin/appointments"
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-all hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                  <CalendarDays className="h-4.5 w-4.5 text-slate-300" />
                </div>
                <span className="font-semibold text-slate-200">View All Appointments</span>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              type="button"
              onClick={handleSyncAllData}
              disabled={syncing}
              className="group flex w-full items-center justify-between rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-4 text-left transition-all hover:border-cyan-400/40 hover:bg-cyan-500/20 disabled:opacity-60"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/20">
                  {syncing ? (
                    <Loader2 className="h-4.5 w-4.5 animate-spin text-cyan-300" />
                  ) : (
                    <Database className="h-4.5 w-4.5 text-cyan-300" />
                  )}
                </div>
                <span className="font-semibold text-cyan-100">
                  {syncing ? 'Syncing to Firebase…' : 'Sync All Site Data to Firebase'}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-cyan-400 transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              to="/admin/blogs"
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-all hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/20">
                  <Plus className="h-4.5 w-4.5 text-violet-400" />
                </div>
                <span className="font-semibold text-slate-200">Write Blog Post</span>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {syncMessage && (
            <div
              className={`mt-4 rounded-xl border px-4 py-3 text-xs leading-relaxed ${
                syncError
                  ? 'border-rose-400/20 bg-rose-500/10 text-rose-100'
                  : 'border-cyan-400/20 bg-cyan-500/10 text-cyan-100'
              }`}
            >
              {syncMessage}
            </div>
          )}

          {activeServices === 0 && loaded && (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-400/20 bg-amber-500/10 px-4 py-3">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <p className="text-xs leading-relaxed text-amber-200">
                No treatments yet — your public site won&apos;t show any services until you add one or import the default list.
              </p>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-white">Recent Bookings</h2>
            <Link to="/admin/appointments" className="text-xs font-semibold text-teal-400 hover:text-teal-300">
              View all →
            </Link>
          </div>

          {!loaded ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 animate-pulse rounded-xl bg-white/5" />
              ))}
            </div>
          ) : recent.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
                <CalendarDays className="h-6 w-6 text-slate-500" />
              </div>
              <p className="text-sm text-slate-400">No appointments yet.</p>
              <p className="max-w-[220px] text-xs text-slate-600">
                Bookings from your website&apos;s WhatsApp funnel will appear here the instant they&apos;re submitted.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {recent.map((appt) => {
                  const isNew = appt.bookedAt && Date.now() - appt.bookedAt.getTime() < NEW_BADGE_WINDOW_MS
                  const initial = (appt.fullName || '?').trim().charAt(0).toUpperCase()
                  return (
                    <motion.div
                      key={appt.id}
                      layout
                      initial={{ opacity: 0, y: -12, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 transition-colors hover:bg-white/[0.08]"
                    >
                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-sm font-bold text-white">
                        {initial}
                        {isNew && (
                          <motion.span
                            animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-400"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-semibold text-white">{appt.fullName}</p>
                          {isNew && (
                            <span className="shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-400">
                              New
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-slate-400">
                          <User className="h-3 w-3 shrink-0" /> {appt.serviceName}
                          <span className="text-slate-600">·</span>
                          <MapPin className="h-3 w-3 shrink-0" /> {appt.city}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-xs font-bold text-teal-400">
                          {appt.price ? `Rs. ${Number(appt.price).toLocaleString('en-PK')}` : 'Quote'}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-500">{appt.date} · {appt.timeSlot}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

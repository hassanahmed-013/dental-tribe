import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { CalendarDays, Phone, MapPin } from 'lucide-react'
import { db } from '../../lib/firebaseConfig'

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-5">
      <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-white/10" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/3 animate-pulse rounded bg-white/10" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-white/5" />
      </div>
      <div className="h-8 w-20 animate-pulse rounded-lg bg-white/5" />
    </div>
  )
}

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'appointments'), orderBy('timestamp', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setAppointments(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          bookedAt: d.data().timestamp?.toDate?.() ?? null,
        }))
      )
      setLoading(false)
    })
    return unsub
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-white">Appointments</h1>
        <p className="mt-1 text-sm text-slate-400">All patient bookings — updates in real time.</p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center">
          <CalendarDays className="mx-auto mb-3 h-10 w-10 text-slate-600" />
          <p className="text-slate-400">No appointments booked yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((appt, i) => (
            <motion.div
              key={appt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-2xl border border-white/5 bg-white/5 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-sm font-bold text-white shadow-glow">
                    {(appt.fullName || '?').trim().charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{appt.fullName}</h3>
                    <p className="mt-0.5 text-sm font-medium text-teal-400">{appt.serviceName}</p>
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5" /> {appt.phone}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" /> {appt.city}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="rounded-lg bg-teal-500/10 px-3 py-1.5 text-sm font-bold text-teal-300">
                    {appt.date}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">{appt.timeSlot}</p>
                  <p className="mt-1 text-xs font-semibold text-amber-400">
                    {appt.price ? `Rs. ${Number(appt.price).toLocaleString('en-PK')}` : 'Custom Quote'}
                  </p>
                  {appt.bookedAt && (
                    <p className="mt-1 text-[10px] text-slate-600">
                      Booked {appt.bookedAt.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

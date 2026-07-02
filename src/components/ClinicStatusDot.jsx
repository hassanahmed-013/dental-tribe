import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { isClinicOpen } from '../lib/time'
import { useSiteContent } from '../context/SiteContentContext'

export default function ClinicStatusDot({ className = '', compact = false, short = false }) {
  const { clinic: CLINIC } = useSiteContent()
  const [open, setOpen] = useState(() => isClinicOpen())

  useEffect(() => {
    const tick = () => setOpen(isClinicOpen())
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  const label = open
    ? short
      ? 'Open'
      : compact
        ? 'Open Now'
        : `Open Now — ${CLINIC.openTimeDisplay} to ${CLINIC.closeTimeDisplay}`
    : short
      ? 'Closed'
      : compact
        ? 'Closed'
        : `Closed — Opens ${CLINIC.openTimeDisplay}`

  return (
    <div className={`flex shrink-0 items-center gap-1.5 ${className}`}>
      <span className="relative flex h-2 w-2 shrink-0 xl:h-2.5 xl:w-2.5">
        {open && (
          <motion.span
            animate={{ scale: [1, 1.9, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
          />
        )}
        <span
          className={`relative inline-flex h-full w-full rounded-full ${
            open ? 'bg-emerald-500' : 'bg-red-500'
          }`}
        />
      </span>
      <span
        className={`whitespace-nowrap text-[11px] font-semibold xl:text-xs ${
          open ? 'text-emerald-600' : 'text-red-600'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

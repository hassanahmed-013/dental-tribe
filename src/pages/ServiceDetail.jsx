import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Clock,
  CalendarClock,
  CheckCircle2,
  Loader2,
  User,
  Phone,
  MapPin,
  CalendarDays,
  Clock4,
  MessageCircle,
  PartyPopper,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { getServiceBySlug, useServices } from '../lib/useServices'
import { useSiteContent } from '../context/SiteContentContext'
import { TIME_SLOTS, todayISO, isPastDate, getSelectableSlots } from '../lib/time'
import { useBookedSlots } from '../lib/useBookedSlots'
import { db } from '../lib/firebaseConfig'
import { buildWhatsappUrl } from '../lib/whatsapp'
import Navbar from '../components/Navbar'
import ServiceIcon from '../components/ServiceIcon'
import ToothIcon from '../components/ToothIcon'
import { getServiceDetailContent } from '../data/serviceContent'

const pageTransition = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
}

const NAME_REGEX = /^[A-Za-z][A-Za-z\s.'-]{2,49}$/
const CITY_REGEX = /^[A-Za-z][A-Za-z\s.'-]{1,39}$/
const PHONE_REGEX = /^(\+92|0)3\d{9}$/

function buildWhatsappMessage(service, form) {
  return `Hello Dr. Shahab & Associates, I have successfully registered my appointment online for ${service.name}. Details: Name: ${form.fullName.trim()}, City: ${form.city.trim()}, Phone: ${form.phone.trim()}, Date: ${form.date}, Time: ${form.timeSlot}. Please confirm my slot!`
}

function validateField(name, value) {
  switch (name) {
    case 'fullName':
      return NAME_REGEX.test(value.trim())
    case 'city':
      return CITY_REGEX.test(value.trim())
    case 'phone':
      return PHONE_REGEX.test(value.trim())
    case 'date':
      return Boolean(value) && !isPastDate(value)
    case 'timeSlot':
      return TIME_SLOTS.includes(value)
    default:
      return false
  }
}

function FieldShell({ label, icon: Icon, valid, touched, className = '', children, noInsetIcon = false }) {
  return (
    <div className={className}>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-teal-900">
        <Icon className="h-4 w-4 text-teal-500" />
        {label}
      </label>
      <div className="relative">
        {!noInsetIcon && (
          <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-400/70" />
        )}
        {children}
        <AnimatePresence>
          {touched && valid && (
            <motion.div
              initial={{ opacity: 0, scale: 0.4, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {touched && !valid && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-xs font-medium text-rose-500"
          >
            Please enter a valid {label.toLowerCase()}.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ServiceDetail() {
  const { clinic: CLINIC } = useSiteContent()
  const { slug } = useParams()
  const navigate = useNavigate()
  const { services, loading: servicesLoading } = useServices()
  const service = getServiceBySlug(services, slug)
  const detail = useMemo(() => (service ? getServiceDetailContent(service.slug) : null), [service])

  const [form, setForm] = useState({ fullName: '', city: '', phone: '', date: '', timeSlot: '' })
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const { booked, loading: slotsLoading } = useBookedSlots(form.date)

  const availableSlots = useMemo(
    () => getSelectableSlots(form.date, booked),
    [form.date, booked]
  )

  const validity = useMemo(
    () => ({
      fullName: validateField('fullName', form.fullName),
      city: validateField('city', form.city),
      phone: validateField('phone', form.phone),
      date: validateField('date', form.date),
      timeSlot: Boolean(form.timeSlot) && availableSlots.includes(form.timeSlot),
    }),
    [form, availableSlots]
  )

  useEffect(() => {
    if (form.timeSlot && !availableSlots.includes(form.timeSlot)) {
      setForm((f) => ({ ...f, timeSlot: '' }))
    }
  }, [availableSlots, form.timeSlot])

  const allValid = Object.values(validity).every(Boolean)
  const filledCount = Object.values(validity).filter(Boolean).length
  const totalFields = Object.keys(validity).length

  if (servicesLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-teal-950">
        <Loader2 className="h-8 w-8 animate-spin text-teal-400" />
      </div>
    )
  }

  if (!service) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white text-center">
        <p className="text-lg font-semibold text-teal-900">Treatment not found.</p>
        <Link to="/" className="btn-primary">
          <ArrowLeft className="h-4 w-4" /> Back Home
        </Link>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'date') {
      if (value && isPastDate(value)) return
      setForm((f) => ({ ...f, date: value, timeSlot: '' }))
      return
    }

    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ fullName: true, city: true, phone: true, date: true, timeSlot: true })
    if (!allValid) return

    setStatus('submitting')
    setErrorMsg('')

    try {
      const writePromise = addDoc(collection(db, 'appointments'), {
        fullName: form.fullName.trim(),
        city: form.city.trim(),
        phone: form.phone.trim(),
        serviceSlug: service.slug,
        serviceName: service.name,
        date: form.date,
        timeSlot: form.timeSlot,
        timestamp: serverTimestamp(),
      })

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out. Please check your connection and try again.')), 15000)
      )

      await Promise.race([writePromise, timeoutPromise])
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
      return
    }

    const whatsappUrl = buildWhatsappUrl(buildWhatsappMessage(service, form))
    setStatus('success')
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gradient-to-b from-teal-950 via-teal-900 to-teal-950"
    >
      <Navbar />

      {/* Hero banner */}
      <div className="relative overflow-hidden pt-28 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(49,170,190,0.25),transparent_50%)]" />
        <ToothIcon className="pointer-events-none absolute -right-20 top-10 h-72 w-72 text-white/[0.04]" />
        <ToothIcon className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 text-white/[0.03] rotate-12" />

        <div className="relative mx-auto max-w-3xl px-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Treatments
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left"
          >
            <motion.div
              layoutId={`service-icon-${service.slug}`}
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-400 to-cyan-400 shadow-glow"
            >
              <ServiceIcon type={service.iconType} className="h-11 w-11 text-white" />
            </motion.div>

            <div className="mt-6 sm:mt-0 sm:ml-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-200">
                <Sparkles className="h-3 w-3" />
                {service.category}
              </span>
              <h1 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                {service.name}
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-teal-100/70">{service.tagline}</p>
              <div className="mt-5 flex flex-wrap justify-center gap-4 sm:justify-start">
                {service.duration && (
                  <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-teal-100">
                    <Clock className="h-4 w-4 text-cyan-300" /> {service.duration}
                  </span>
                )}
                {service.visits && (
                  <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-teal-100">
                    <CalendarClock className="h-4 w-4 text-cyan-300" /> {service.visits}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content cards */}
      <div className="relative mx-auto max-w-3xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass-card !bg-white p-8 sm:p-10"
        >
          <p className="text-base leading-relaxed text-teal-900/70">{service.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {service.highlights.map((h, i) => (
              <motion.span
                key={h}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700"
              >
                {h}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {detail && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.6 }}
            className="mt-8 space-y-6"
          >
            <section className="glass-card !bg-white p-8 sm:p-10">
              <h2 className="font-display text-xl font-bold text-navy">What is this treatment?</h2>
              <p className="mt-3 text-base leading-relaxed text-teal-900/70">{detail.whatItIs}</p>
            </section>

            <section className="glass-card !bg-white p-8 sm:p-10">
              <h2 className="font-display text-xl font-bold text-navy">When you may need it</h2>
              <ul className="mt-4 space-y-2">
                {detail.symptoms.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-teal-900/70">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="glass-card !bg-white p-8 sm:p-10">
              <h2 className="font-display text-xl font-bold text-navy">What happens during treatment</h2>
              <ol className="mt-4 space-y-3">
                {detail.treatmentSteps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm text-teal-900/70">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </section>

            <section className="glass-card !bg-white p-8 sm:p-10">
              <h2 className="font-display text-xl font-bold text-navy">Aftercare</h2>
              <ul className="mt-4 space-y-2">
                {detail.aftercare.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-teal-900/70">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="glass-card relative mt-8 overflow-hidden !bg-white p-8 sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 animate-blob rounded-full bg-teal-200/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 animate-blob rounded-full bg-cyan-200/25 blur-3xl [animation-delay:4s]" />

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex flex-col items-center gap-4 py-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 16 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-glow"
                >
                  <PartyPopper className="h-10 w-10 text-white" />
                </motion.div>
                <h3 className="font-display text-2xl font-extrabold text-teal-950">
                  Slot Reserved — Almost Done!
                </h3>
                <p className="max-w-sm text-sm text-teal-900/60">
                  We&apos;ve opened WhatsApp with your appointment details pre-filled.
                  Just hit send so our team can confirm your slot for {service.name}.
                </p>
                <a
                  href={buildWhatsappUrl(buildWhatsappMessage(service, form))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Open WhatsApp Again
                </a>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10 space-y-6"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="section-label mb-1">Live Booking</span>
                    <span className="text-xs font-semibold text-teal-600">
                      {filledCount} of {totalFields} completed
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-teal-50">
                    <motion.div
                      animate={{ width: `${(filledCount / totalFields) * 100}%` }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-400"
                    />
                  </div>

                  <h2 className="mt-4 font-display text-2xl font-extrabold text-teal-950">
                    Reserve Your Evening Slot
                  </h2>
                  <p className="mt-1 text-sm text-teal-900/60">
                    Clinic hours are {CLINIC.openTimeDisplay} – {CLINIC.closeTimeDisplay}, daily.
                    Slots update in real time as patients book.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                      <ShieldCheck className="h-3.5 w-3.5" /> Secure &amp; Private
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                      <Zap className="h-3.5 w-3.5" /> 2-Minute Booking
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
                      <MessageCircle className="h-3.5 w-3.5" /> Instant WhatsApp Confirm
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FieldShell label="Full Name" icon={User} valid={validity.fullName} touched={touched.fullName}>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Ayesha Khan"
                      className={`w-full rounded-2xl border bg-white/80 pl-11 pr-11 py-3.5 text-sm font-medium text-teal-950 outline-none transition-all focus:border-teal-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(49,170,190,0.12)] ${
                        touched.fullName && !validity.fullName ? 'border-rose-300' : 'border-teal-100'
                      }`}
                    />
                  </FieldShell>

                  <FieldShell label="City / Location" icon={MapPin} valid={validity.city} touched={touched.city}>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Lahore"
                      className={`w-full rounded-2xl border bg-white/80 pl-11 pr-11 py-3.5 text-sm font-medium text-teal-950 outline-none transition-all focus:border-teal-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(49,170,190,0.12)] ${
                        touched.city && !validity.city ? 'border-rose-300' : 'border-teal-100'
                      }`}
                    />
                  </FieldShell>

                  <FieldShell label="Phone Number" icon={Phone} valid={validity.phone} touched={touched.phone}>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="03XXXXXXXXX"
                      className={`w-full rounded-2xl border bg-white/80 pl-11 pr-11 py-3.5 text-sm font-medium text-teal-950 outline-none transition-all focus:border-teal-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(49,170,190,0.12)] ${
                        touched.phone && !validity.phone ? 'border-rose-300' : 'border-teal-100'
                      }`}
                    />
                  </FieldShell>

                  <FieldShell label="Preferred Date" icon={CalendarDays} valid={validity.date} touched={touched.date}>
                    <input
                      type="date"
                      name="date"
                      min={todayISO()}
                      value={form.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && form.date && isPastDate(form.date)) e.preventDefault()
                      }}
                      className={`w-full rounded-2xl border bg-white/80 pl-11 pr-11 py-3.5 text-sm font-medium text-teal-950 outline-none transition-all focus:border-teal-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(49,170,190,0.12)] ${
                        touched.date && !validity.date ? 'border-rose-300' : 'border-teal-100'
                      }`}
                    />
                  </FieldShell>

                  <FieldShell
                    label="Time Slot"
                    icon={Clock4}
                    valid={validity.timeSlot}
                    touched={touched.timeSlot}
                    className="sm:col-span-2"
                    noInsetIcon
                  >
                    {form.date && !isPastDate(form.date) ? (
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                        {slotsLoading ? (
                          <p className="col-span-full flex items-center justify-center gap-2 py-4 text-xs text-teal-500">
                            <Loader2 className="h-3 w-3 animate-spin" /> Checking live availability…
                          </p>
                        ) : availableSlots.length === 0 ? (
                          <p className="col-span-full rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-center text-xs font-medium text-amber-700">
                            No slots left for this date — please choose another day.
                          </p>
                        ) : (
                          availableSlots.map((slot) => {
                            const isSelected = form.timeSlot === slot
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => {
                                  setForm((f) => ({ ...f, timeSlot: slot }))
                                  setTouched((t) => ({ ...t, timeSlot: true }))
                                }}
                                className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${
                                  isSelected
                                    ? 'border-teal-500 bg-teal-500 text-white shadow-glow'
                                    : 'border-teal-100 bg-white text-teal-700 hover:border-teal-300 hover:bg-teal-50'
                                }`}
                              >
                                {slot}
                              </button>
                            )
                          })
                        )}
                      </div>
                    ) : form.date && isPastDate(form.date) ? (
                      <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-6 text-center text-sm text-rose-600">
                        Please choose today or a future date.
                      </p>
                    ) : (
                      <p className="rounded-2xl border border-dashed border-teal-200 bg-teal-50/50 px-4 py-6 text-center text-sm text-teal-600">
                        Select a date above to see live available slots
                      </p>
                    )}
                  </FieldShell>
                </div>

                <AnimatePresence>
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'submitting' ? 1 : 0.98 }}
                  animate={
                    allValid && status !== 'submitting'
                      ? { boxShadow: ['0 0 0px rgba(49,170,190,0.4)', '0 0 32px rgba(49,170,190,0.55)', '0 0 0px rgba(49,170,190,0.4)'] }
                      : {}
                  }
                  transition={{ boxShadow: { duration: 2, repeat: allValid ? Infinity : 0, ease: 'easeInOut' } }}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Reserving Your Slot...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-5 w-5" />
                      Confirm &amp; Send via WhatsApp
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-teal-900/40">
                  No payment required. We&apos;ll confirm your slot directly on WhatsApp.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}

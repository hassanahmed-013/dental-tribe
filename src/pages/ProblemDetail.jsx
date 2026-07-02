import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, AlertCircle, Stethoscope, CheckCircle2, CalendarCheck } from 'lucide-react'
import { getProblemDetail } from '../data/dentalProblemDetails'
import { resolveImage } from '../lib/imageAssets'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'

export default function ProblemDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const problem = getProblemDetail(id)

  if (!problem) {
    return (
      <div className="min-h-screen bg-white pt-28 text-center">
        <Navbar />
        <p className="text-lg text-teal-900/60">Problem not found.</p>
        <Link to="/#problems" className="btn-cyan mt-6 inline-flex">
          Back to Problems
        </Link>
      </div>
    )
  }

  const image = resolveImage(problem.imageKey)

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-950 via-teal-900 to-teal-950">
      <Navbar />

      <div className="relative overflow-hidden pt-28 pb-12">
        <div className="relative mx-auto max-w-3xl px-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div className={`relative aspect-[21/9] bg-gradient-to-br ${problem.tone}`}>
              <img src={image} alt={problem.title} className="h-full w-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-100">
                  Dental Problem
                </span>
                <h1 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">{problem.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-6 px-6 pb-20">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white p-8 shadow-card"
        >
          <h2 className="font-display text-xl font-bold text-navy">What is it?</h2>
          <p className="mt-3 text-base leading-relaxed text-teal-900/70">{problem.overview}</p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-3xl bg-white p-8 shadow-card"
        >
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Common causes
          </h2>
          <ul className="mt-4 space-y-2">
            {problem.causes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-teal-900/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-white p-8 shadow-card"
        >
          <h2 className="font-display text-xl font-bold text-navy">Symptoms to watch for</h2>
          <ul className="mt-4 space-y-2">
            {problem.symptoms.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-teal-900/70">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bg-white p-8 shadow-card"
        >
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy">
            <Stethoscope className="h-5 w-5 text-teal-500" />
            Recommended treatments
          </h2>
          <div className="mt-5 space-y-3">
            {problem.treatments.map((t) => (
              <Link
                key={t.slug}
                to={`/services/${t.slug}`}
                className="flex items-center justify-between rounded-2xl border border-teal-100 bg-teal-50/50 px-5 py-4 transition-colors hover:border-teal-300 hover:bg-teal-50"
              >
                <div>
                  <p className="font-semibold text-navy">{t.name}</p>
                  <p className="text-sm text-teal-900/60">{t.desc}</p>
                </div>
                <span className="text-sm font-bold text-teal-600">View →</span>
              </Link>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 p-8"
        >
          <h2 className="font-display text-xl font-bold text-navy">When to visit the dentist</h2>
          <p className="mt-3 text-base leading-relaxed text-teal-900/70">{problem.whenToVisit}</p>
          <Link to="/#services" className="btn-cyan mt-6 inline-flex">
            <CalendarCheck className="h-4 w-4" />
            Book Evening Appointment
          </Link>
        </motion.section>
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

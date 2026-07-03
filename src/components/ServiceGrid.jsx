import { motion, AnimatePresence } from 'framer-motion'
import { useServices } from '../lib/useServices'
import ServiceCard from './ServiceCard'
import ScrollReveal from './ScrollReveal'
import FunnelCTABand from './FunnelCTABand'

function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-teal-100/80 bg-white p-6 shadow-card">
      <div className="flex items-start justify-between">
        <div className="h-16 w-16 animate-pulse rounded-2xl bg-teal-50" />
        <div className="h-5 w-20 animate-pulse rounded-full bg-teal-50" />
      </div>
      <div className="mt-5 h-5 w-3/4 animate-pulse rounded bg-teal-50" />
      <div className="mt-2 h-4 w-full animate-pulse rounded bg-teal-50/70" />
      <div className="mt-1 h-4 w-2/3 animate-pulse rounded bg-teal-50/70" />
      <div className="mt-5 flex items-center justify-between border-t border-teal-100/80 pt-5">
        <div className="h-8 w-24 animate-pulse rounded bg-teal-50" />
        <div className="h-11 w-11 animate-pulse rounded-full bg-teal-50" />
      </div>
    </div>
  )
}

export default function ServiceGrid() {
  const { services, loading, error, isFetching } = useServices()

  return (
    <section id="services" className="section-pad relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="section-label mb-5">Live Booking</span>
          <h2 className="section-heading text-teal-950">
            Explore Our <span className="gradient-text">Treatments</span>
          </h2>
          <p className="mt-4 text-base text-teal-900/60 sm:text-lg">
            Tap any treatment to see full details and book your evening slot — availability updates in real time.
          </p>
        </ScrollReveal>

        {loading && services.length === 0 ? (
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error && services.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-rose-100 bg-rose-50/50 p-10 text-center">
            <p className="font-semibold text-rose-800">Treatments could not be loaded</p>
            <p className="mt-2 text-sm text-rose-600">{error}</p>
            <p className="mt-4 text-sm text-teal-700">
              Please call us at{' '}
              <a href="tel:+923358219393" className="font-bold underline">0335-8219393</a>{' '}
              to book your appointment.
            </p>
          </div>
        ) : services.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-dashed border-teal-200 bg-teal-50/30 p-12 text-center">
            <p className="font-semibold text-teal-800">No treatments published yet</p>
            <p className="mt-2 text-sm text-teal-600">
              Treatments added in admin appear here automatically. If you are the clinic owner, open
              admin → Treatments and click Import Flyer Treatments.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-cyan mt-6 inline-flex text-sm"
            >
              Refresh page
            </button>
          </div>
        ) : (
          <motion.div layout className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isFetching && (
              <p className="col-span-full -mb-8 text-center text-xs font-medium text-teal-500/80">
                Updating treatments…
              </p>
            )}
            <AnimatePresence mode="popLayout">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <FunnelCTABand
          className="mt-12 sm:mt-16"
          title="Not sure which treatment you need?"
          subtitle="Message us on WhatsApp with your concern — Dr. Shahab's team will guide you to the right option and book your evening visit."
        />
      </div>
    </section>
  )
}

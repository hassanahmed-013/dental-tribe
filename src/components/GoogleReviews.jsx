import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, BadgeCheck, Star, ArrowRight, Pencil } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import { useReviews } from '../lib/useReviews'
import { getGoogleWriteReviewUrl } from '../lib/googleReviews'
import ScrollReveal from './ScrollReveal'
import FunnelCTABand from './FunnelCTABand'

const AVATAR_COLORS = ['bg-violet-500', 'bg-amber-600', 'bg-teal-600', 'bg-rose-500', 'bg-cyan-600']

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

function Stars({ count = 5, size = 'md' }) {
  const cls = size === 'lg' ? 'h-6 w-6' : 'h-4 w-4'
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${cls} ${i < count ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
        />
      ))}
    </div>
  )
}

function ReviewSummary({ rating, totalCount, googleMapsUrl }) {
  if (rating == null && totalCount == null) return null

  return (
    <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-4 rounded-3xl border border-teal-100 bg-teal-50/40 px-6 py-6 sm:flex-row sm:justify-center sm:gap-8">
      <div className="text-center sm:text-left">
        <p className="text-xs font-bold uppercase tracking-wider text-teal-600">Google Review Summary</p>
        <div className="mt-2 flex items-center justify-center gap-3 sm:justify-start">
          <span className="font-display text-4xl font-extrabold text-navy">
            {rating != null ? rating.toFixed(1) : '—'}
          </span>
          <div>
            <Stars count={Math.round(rating || 5)} size="lg" />
            {totalCount != null && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-sm font-semibold text-teal-600 hover:text-teal-700"
              >
                {totalCount} reviews
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ReviewCard({ review, colorIndex }) {
  const initial = (review.authorName || '?').trim().charAt(0).toUpperCase()
  const avatarColor = review.avatarColor || AVATAR_COLORS[colorIndex % AVATAR_COLORS.length]

  return (
    <article className="flex h-full min-w-[260px] max-w-[360px] flex-col rounded-2xl border border-teal-100/80 bg-white p-5 shadow-card sm:min-w-[340px]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${avatarColor}`}>
            {initial}
          </div>
          <div>
            <p className="font-semibold text-navy">{review.authorName}</p>
            <p className="text-xs text-teal-900/45">{review.relativeTime || 'Google review'}</p>
          </div>
        </div>
        <GoogleLogo />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Stars count={review.rating || 5} />
        <BadgeCheck className="h-4 w-4 text-blue-500" aria-label="Verified Google review" />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-teal-900/75">{review.text}</p>
    </article>
  )
}

export default function GoogleReviews() {
  const { clinic: CLINIC } = useSiteContent()
  const { reviews, loading, googleMeta } = useReviews()
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const writeReviewUrl = getGoogleWriteReviewUrl()

  const updateScrollState = () => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }

  useEffect(() => {
    updateScrollState()
  }, [reviews, loading])

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })
    setTimeout(updateScrollState, 350)
  }

  return (
    <section id="testimonials" className="section-pad relative bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="section-heading text-navy">
            What Our Patients Say About Us!
          </h2>
        </ScrollReveal>

        <ReviewSummary rating={googleMeta.rating} totalCount={googleMeta.totalCount} googleMapsUrl={CLINIC.googleMapsUrl} />

        <div className="relative mt-10">
          {reviews.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => scroll(-1)}
                disabled={!canScrollLeft}
                aria-label="Previous reviews"
                className="absolute -left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-teal-100 bg-white text-navy shadow-md transition hover:bg-teal-50 disabled:opacity-30 sm:flex"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div
                ref={trackRef}
                onScroll={updateScrollState}
                className="flex items-stretch gap-5 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
              >
                {reviews.map((review, i) => (
                  <div key={review.id} className="flex snap-start shrink-0">
                    <ReviewCard review={review} colorIndex={i} />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scroll(1)}
                disabled={!canScrollRight}
                aria-label="Next reviews"
                className="absolute -right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-teal-100 bg-white text-navy shadow-md transition hover:bg-teal-50 disabled:opacity-30 sm:flex"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {loading && (
            <div className="flex gap-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-52 min-w-[320px] animate-pulse rounded-2xl bg-teal-50" />
              ))}
            </div>
          )}

          {!loading && reviews.length === 0 && (
            <div className="rounded-3xl border border-teal-100 bg-teal-50/50 px-6 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center">
                <GoogleLogo />
              </div>
              <p className="mt-4 font-semibold text-teal-900">Patient reviews coming soon</p>
              <p className="mx-auto mt-2 max-w-lg text-sm text-teal-900/60">
                Refresh the page — your Google reviews load automatically from site data.
              </p>
              <a
                href={CLINIC.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700"
              >
                Read all reviews on Google <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>

        <ScrollReveal className="mt-14 text-center">
          <p className="text-lg text-teal-900/55">Had a great experience with us?</p>
          <a
            href={writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-cyan-100 px-8 py-3.5 text-base font-bold text-teal-800 transition hover:bg-cyan-200"
          >
            <Pencil className="h-5 w-5" />
            Write a review
          </a>
          {CLINIC.googleMapsUrl && (
            <p className="mt-4">
              <a
                href={CLINIC.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-teal-600 hover:text-teal-700"
              >
                View all reviews on Google →
              </a>
            </p>
          )}
        </ScrollReveal>

        <FunnelCTABand
          className="mt-12 sm:mt-14"
          title="Join thousands of happy patients"
          subtitle="See why Lahore trusts Dental Tribe — book your evening visit today."
        />
      </div>
    </section>
  )
}

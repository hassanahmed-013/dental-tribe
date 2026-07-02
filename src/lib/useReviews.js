import { useEffect, useState } from 'react'
import { useSiteContent } from '../context/SiteContentContext'
import { getClinic } from './siteContentCache'
import { fetchGooglePlaceReviews } from './googleReviews'

const fallbackMeta = () => {
  const clinic = getClinic()
  return {
    rating: clinic.googleRating ?? null,
    totalCount: clinic.googleReviewCount ?? null,
  }
}

/** Real patient reviews from site content; Google API used only for rating + total count. */
export function useReviews() {
  const { reviews, loading: contentLoading } = useSiteContent()
  const [googleMeta, setGoogleMeta] = useState(() => fallbackMeta())
  const [metaLoading, setMetaLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadMeta() {
      setMetaLoading(true)
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim()

      if (!apiKey) {
        if (!cancelled) {
          setGoogleMeta(fallbackMeta())
          setMetaLoading(false)
        }
        return
      }

      try {
        const { rating, totalCount } = await fetchGooglePlaceReviews()
        if (cancelled) return
        const meta = fallbackMeta()
        setGoogleMeta({
          rating: rating ?? meta.rating,
          totalCount: totalCount ?? meta.totalCount,
        })
      } catch {
        if (!cancelled) setGoogleMeta(fallbackMeta())
      } finally {
        if (!cancelled) setMetaLoading(false)
      }
    }

    loadMeta()
    return () => {
      cancelled = true
    }
  }, [])

  return {
    reviews,
    loading: contentLoading || metaLoading,
    googleMeta,
    setupMessage: null,
  }
}

import { useEffect, useRef, useState } from 'react'
import { isFirebaseConfigured } from './firebaseConfig'
import {
  fetchAllServices,
  fetchServicesFromCache,
  filterServices,
  subscribeAllServices,
} from './servicesRepository'

/**
 * Fetches treatments from Firestore collection `services` (UI label: "Treatments").
 * Server fetch first, then realtime onSnapshot for admin ↔ website sync.
 */
export function useServices({ includeInactive = false } = {}) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const serverLoadedRef = useRef(false)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setServices([])
      setLoading(false)
      setError('Firebase is not configured. Add your project keys to .env and restart the dev server.')
      return undefined
    }

    let cancelled = false
    serverLoadedRef.current = false

    const applyList = (list, meta = {}) => {
      if (cancelled) return

      // Never let a stale empty local cache wipe the grid before server responds.
      if (meta.fromCache && list.length === 0 && !serverLoadedRef.current) return

      const visible = filterServices(list, { includeInactive })
      setServices(visible)
      setLoading(false)
      setError(null)
      setIsFetching(false)

      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.info(
          `[useServices] ${visible.length} visible / ${list.length} total`,
          meta.fromCache ? '(cache)' : '(live)'
        )
      }
    }

    const fail = (err) => {
      if (cancelled) return
      // eslint-disable-next-line no-console
      console.error('Firestore Error:', err?.message ?? err, err)
      setError(err?.message ?? 'Failed to load treatments from Firestore.')
      setLoading(false)
      setIsFetching(false)
    }

    // Warm paint from cache when we already have data (repeat visits).
    fetchServicesFromCache()
      .then((cached) => {
        if (cached?.length) applyList(cached, { fromCache: true })
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn('Firestore cache:', err.message)
      })

    setIsFetching(true)
    fetchAllServices()
      .then((list) => {
        serverLoadedRef.current = true
        applyList(list, { fromCache: false })
      })
      .catch(fail)

    const unsubscribe = subscribeAllServices(
      (list, meta) => {
        if (!meta.fromCache) serverLoadedRef.current = true
        applyList(list, meta)
      },
      fail
    )

    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [includeInactive])

  return { services, loading, error, isFetching }
}

export function getServiceBySlug(services, slug) {
  return services.find((s) => s.slug === slug)
}

export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
}

/** @deprecated Kept for admin cache invalidation calls — realtime listener handles sync. */
export const servicesQueryKey = (includeInactive = false) => ['services', { includeInactive }]

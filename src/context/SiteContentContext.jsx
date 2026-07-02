import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { buildSiteContentState } from '../lib/siteContentRepository'
import { fetchSiteContentFromServer } from '../lib/siteContentRepository'
import { setClinicCache } from '../lib/siteContentCache'
import { DEFAULT_CLINIC } from '../data/siteContentDefaults'

setClinicCache(DEFAULT_CLINIC)

const SiteContentContext = createContext(null)

export function SiteContentProvider({ children }) {
  const [state, setState] = useState(() => buildSiteContentState())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const next = await fetchSiteContentFromServer()
        if (!cancelled) {
          setState(next)
          setClinicCache(next.clinic)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Could not load site content')
          setClinicCache(state.clinic)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      loading,
      error,
      refresh: async () => {
        const next = await fetchSiteContentFromServer()
        setState(next)
        setClinicCache(next.clinic)
        return next
      },
    }),
    [state, loading, error]
  )

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext)
  if (!ctx) {
    throw new Error('useSiteContent must be used within SiteContentProvider')
  }
  return ctx
}

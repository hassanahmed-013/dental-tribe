import { useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore'
import { db, isFirebaseConfigured } from './firebaseConfig'

export function slugify(text) {
  return (text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function mapBlogDocs(snapshot) {
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    createdDate: d.data().createdAt?.toDate?.() ?? null,
  }))
}

function filterBlogs(items, includeUnpublished) {
  return includeUnpublished ? items : items.filter((b) => b.published === true)
}

export function useBlogs({ includeUnpublished = false } = {}) {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setBlogs([])
      setLoading(false)
      return undefined
    }

    let cancelled = false
    const blogsQuery = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'))

    const apply = (snapshot) => {
      if (cancelled) return
      setBlogs(filterBlogs(mapBlogDocs(snapshot), includeUnpublished))
      setLoading(false)
      setError(null)
    }

    getDocs(blogsQuery)
      .then(apply)
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    const unsub = onSnapshot(
      blogsQuery,
      apply,
      (err) => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      }
    )

    return () => {
      cancelled = true
      unsub()
    }
  }, [includeUnpublished])

  return { blogs, loading, error }
}

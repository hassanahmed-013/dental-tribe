import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import { db } from '../lib/firebaseConfig'

function formatDate(date) {
  if (!date) return ''
  return date.toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      const q = query(collection(db, 'blogs'), where('slug', '==', slug))
      const snap = await getDocs(q)
      if (cancelled) return
      if (snap.empty) {
        setNotFound(true)
        setPost(null)
      } else {
        const doc = snap.docs[0]
        const data = doc.data()
        if (data.published === false) {
          setNotFound(true)
          setPost(null)
        } else {
          setPost({
            id: doc.id,
            ...data,
            createdDate: data.createdAt?.toDate?.() ?? null,
          })
        }
      }
      setLoading(false)
    }
    load()
    return () => {
      cancelled = true
    }
  }, [slug])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-28 pb-20">
        <article className="mx-auto max-w-3xl px-6">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700">
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>

          {loading && <div className="mt-10 h-64 animate-pulse rounded-3xl bg-teal-50" />}

          {!loading && notFound && (
            <div className="mt-10 rounded-3xl border border-teal-100 bg-teal-50/50 py-16 text-center">
              <p className="text-teal-900/60">Article not found.</p>
              <Link to="/blog" className="btn-cyan mt-6 inline-flex">
                Back to Blog
              </Link>
            </div>
          )}

          {!loading && post && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {post.coverImageUrl && (
                <img
                  src={post.coverImageUrl}
                  alt=""
                  className="mt-8 aspect-[21/9] w-full rounded-3xl object-cover shadow-card"
                />
              )}
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-teal-600">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.createdDate)}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author || 'Dr. Shahab Rafiq'}
                </span>
              </div>
              <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-navy sm:text-5xl">
                {post.title}
              </h1>
              <div className="prose prose-teal mt-10 max-w-none whitespace-pre-wrap text-base leading-relaxed text-teal-900/75">
                {post.content}
              </div>
            </motion.div>
          )}
        </article>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

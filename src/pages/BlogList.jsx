import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, FileText } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import { useBlogs } from '../lib/useBlogs'

function formatDate(date) {
  if (!date) return ''
  return date.toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogList() {
  const { blogs, loading } = useBlogs()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="section-label mb-5">Dental Health Tips</span>
            <h1 className="font-display text-4xl font-extrabold text-navy sm:text-5xl">Blog</h1>
            <p className="mt-4 text-lg text-teal-900/60">
              Advice on oral health, treatments, and smile care from Dr. Shahab Rafiq.
            </p>
          </motion.div>

          {loading ? (
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-72 animate-pulse rounded-3xl bg-teal-50" />
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="mt-16 rounded-3xl border border-teal-100 bg-teal-50/50 py-20 text-center">
              <FileText className="mx-auto h-12 w-12 text-teal-300" />
              <p className="mt-4 text-teal-900/60">No articles published yet. Check back soon!</p>
              <Link to="/" className="btn-cyan mt-6 inline-flex">
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog, i) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-teal-100/80 bg-white shadow-card transition-shadow hover:shadow-glow"
                >
                  {blog.coverImageUrl ? (
                    <img
                      src={blog.coverImageUrl}
                      alt=""
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-50">
                      <FileText className="h-12 w-12 text-teal-300" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex items-center gap-1.5 text-xs font-medium text-teal-500">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(blog.createdDate)}
                    </p>
                    <h2 className="mt-2 font-display text-xl font-bold text-navy group-hover:text-teal-700">
                      {blog.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-teal-900/65 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-teal-600 hover:text-teal-700"
                    >
                      Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

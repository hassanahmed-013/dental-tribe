import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, Loader2, X, Save, FileText } from 'lucide-react'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../../lib/firebaseConfig'
import { commitFirestoreWrite, FirestoreWriteTimeoutError } from '../../lib/firestoreWrite'
import { useBlogs, slugify } from '../../lib/useBlogs'

const EMPTY_BLOG = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImageUrl: '',
  author: 'Dr. Shahab Rafiq',
  published: false,
}

export default function AdminBlogs() {
  const { blogs, loading } = useBlogs({ includeUnpublished: true })
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_BLOG)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const openCreate = () => {
    setForm({ ...EMPTY_BLOG })
    setEditing('new')
    setError('')
  }

  const openEdit = (blog) => {
    setForm({ ...blog })
    setEditing(blog.id)
    setError('')
  }

  const closeForm = () => {
    setSaving(false)
    setEditing(null)
    setForm(EMPTY_BLOG)
    setError('')
  }

  const handleTitleChange = (title) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: editing === 'new' || !prev.slug ? slugify(title) : prev.slug,
    }))
  }

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required.')
      return
    }
    const finalSlug = slugify(form.slug || form.title)
    if (!finalSlug) {
      setError('A valid URL slug is required.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const payload = {
        title: form.title.trim(),
        slug: finalSlug,
        excerpt: form.excerpt.trim() || form.content.trim().slice(0, 160),
        content: form.content.trim(),
        coverImageUrl: form.coverImageUrl.trim(),
        author: form.author.trim() || 'Dr. Shahab Rafiq',
        published: form.published === true,
        updatedAt: serverTimestamp(),
      }

      await commitFirestoreWrite(() =>
        editing === 'new'
          ? addDoc(collection(db, 'blogs'), { ...payload, createdAt: serverTimestamp() })
          : updateDoc(doc(db, 'blogs', editing), payload)
      )
      closeForm()
    } catch (err) {
      if (err instanceof FirestoreWriteTimeoutError) {
        closeForm()
      } else {
        setError(err.message || 'Failed to save blog post.')
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post?')) return
    await deleteDoc(doc(db, 'blogs', id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-white">Blog Posts</h1>
          <p className="mt-1 text-sm text-slate-400">Write articles that appear on the public Blog page.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-400"
        >
          <Plus className="h-4 w-4" /> New Post
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-white/5" />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="rounded-2xl border border-white/5 bg-white/5 py-16 text-center">
          <FileText className="mx-auto h-10 w-10 text-slate-500" />
          <p className="mt-3 text-slate-400">No blog posts yet. Create your first article above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-white/5 bg-white/5 p-5"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-white">{blog.title}</p>
                  {blog.published ? (
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      Published
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-600/50 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                      Draft
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-slate-500">/blog/{blog.slug}</p>
                <p className="mt-2 line-clamp-2 text-sm text-slate-300">{blog.excerpt}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(blog)}
                  className="rounded-lg bg-white/10 p-2 text-slate-300 hover:bg-white/20"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(blog.id)}
                  className="rounded-lg bg-rose-500/10 p-2 text-rose-400 hover:bg-rose-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={closeForm}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-white">
                  {editing === 'new' ? 'New Blog Post' : 'Edit Blog Post'}
                </h2>
                <button type="button" onClick={closeForm} className="text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {error && <p className="mb-4 rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</p>}

              <div className="space-y-4">
                <label className="block">
                  <span className="text-xs font-bold uppercase text-teal-400/80">Title</span>
                  <input
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase text-teal-400/80">URL Slug</span>
                  <input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase text-teal-400/80">Excerpt</span>
                  <textarea
                    rows={2}
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase text-teal-400/80">Content</span>
                  <textarea
                    rows={10}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-sm text-white"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase text-teal-400/80">Cover Image URL (optional)</span>
                  <input
                    value={form.coverImageUrl}
                    onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
                    placeholder="https://..."
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white"
                  />
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={form.published === true}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  />
                  Publish on website (shows on <span className="text-teal-300">/blog</span>)
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={closeForm} className="rounded-xl px-4 py-2 text-slate-400 hover:text-white">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-2.5 font-bold text-white hover:bg-teal-400 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

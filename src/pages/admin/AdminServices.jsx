import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  X,
  Save,
  Eye,
  EyeOff,
  Download,
  AlertCircle,
  Link2,
} from 'lucide-react'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../../lib/firebaseConfig'
import { useServices, slugify } from '../../lib/useServices'
import { queryClient } from '../../lib/queryClient'
import { importFlyerTreatments } from '../../lib/seedServices'
import { commitFirestoreWrite, FirestoreWriteTimeoutError } from '../../lib/firestoreWrite'
import { EMPTY_SERVICE, SERVICE_CATEGORIES, SERVICE_ICON_TYPES, CATEGORY_COLORS } from '../../data/serviceMeta'
import { getTreatmentCardImageUrl } from '../../lib/storageImages'
import ServiceIcon from '../../components/ServiceIcon'

function FormSection({ label, children }) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-teal-400/80">{label}</p>
      {children}
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-white/10" />
        <div className="flex-1 space-y-2.5">
          <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
          <div className="h-3 w-1/3 animate-pulse rounded bg-white/10" />
          <div className="h-3 w-full animate-pulse rounded bg-white/5" />
          <div className="mt-3 flex gap-2">
            <div className="h-7 w-16 animate-pulse rounded-lg bg-white/5" />
            <div className="h-7 w-16 animate-pulse rounded-lg bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminServices() {
  const { services, loading, isFetching } = useServices({ includeInactive: true })
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_SERVICE)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [highlightsText, setHighlightsText] = useState('')
  const [importing, setImporting] = useState(false)
  const [success, setSuccess] = useState('')

  const refreshServicesCache = () => {
    queryClient.invalidateQueries({ queryKey: ['services'] })
  }

  const openCreate = () => {
    setForm({ ...EMPTY_SERVICE, order: services.length + 1 })
    setHighlightsText('')
    setEditing('new')
    setError('')
  }

  const openEdit = (service) => {
    setForm({ ...service })
    setHighlightsText((service.highlights || []).join(', '))
    setEditing(service.id)
    setError('')
  }

  const closeForm = () => {
    setSaving(false)
    setEditing(null)
    setForm(EMPTY_SERVICE)
    setHighlightsText('')
    setError('')
  }

  const handleNameChange = (name) => {
    setForm((f) => ({
      ...f,
      name,
      shortName: f.shortName || name,
      slug: editing === 'new' ? slugify(name) : f.slug,
    }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Treatment name is required.')
      return
    }

    setSaving(true)
    setError('')

    const payload = {
      name: form.name.trim(),
      slug: (form.slug || slugify(form.name)).trim(),
      shortName: (form.shortName || form.name).trim(),
      duration: form.duration.trim(),
      visits: form.visits.trim(),
      iconType: form.iconType,
      category: form.category,
      tagline: form.tagline.trim(),
      description: form.description.trim(),
      highlights: highlightsText
        .split(',')
        .map((h) => h.trim())
        .filter(Boolean),
      order: Number(form.order) || 0,
      active: form.active !== false,
      updatedAt: serverTimestamp(),
    }

    try {
      await commitFirestoreWrite(() =>
        editing === 'new'
          ? addDoc(collection(db, 'services'), {
              ...payload,
              createdAt: serverTimestamp(),
            })
          : updateDoc(doc(db, 'services', editing), payload)
      )
      closeForm()
      refreshServicesCache()
    } catch (err) {
      if (err instanceof FirestoreWriteTimeoutError) {
        closeForm()
        refreshServicesCache()
        setSuccess(err.message)
      } else {
        setError(err.message)
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return
    await deleteDoc(doc(db, 'services', id))
    refreshServicesCache()
  }

  const handleToggleActive = async (service) => {
    await updateDoc(doc(db, 'services', service.id), {
      active: !service.active,
      updatedAt: serverTimestamp(),
    })
    refreshServicesCache()
  }

  const handleImport = async () => {
    setImporting(true)
    setError('')
    setSuccess('')
    try {
      await commitFirestoreWrite(() => importFlyerTreatments())
      refreshServicesCache()
      setSuccess('18 flyer treatments imported. They are live on the website now.')
    } catch (err) {
      if (err instanceof FirestoreWriteTimeoutError) {
        refreshServicesCache()
        setSuccess('Import sent — refresh the page if the list does not update.')
      } else {
        setError(err.message || 'Import failed. Make sure you are signed in and try again.')
      }
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-white">Treatments</h1>
          <p className="mt-1 text-sm text-slate-400">
            Add, edit, or remove treatments — changes appear on the website instantly.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleImport}
            disabled={importing}
            className="btn-secondary !text-sm !px-5 !py-2.5"
          >
            {importing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {importing ? 'Importing…' : 'Import Flyer Treatments'}
          </button>
          <button onClick={openCreate} className="btn-primary !text-sm !px-5 !py-2.5">
            <Plus className="h-4 w-4" /> Add Treatment
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          <AlertCircle className="h-4 w-4" /> {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {success}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center">
          <p className="text-slate-400">No treatments yet.</p>
          <p className="mt-2 text-sm text-slate-500">
            Click <strong className="text-teal-300">Import Flyer Treatments</strong> to add all 18 from your clinic flyer.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <AnimatePresence>
            {services.map((service, i) => {
              const accent = CATEGORY_COLORS[service.category] || CATEGORY_COLORS.Restorative
              const thumbUrl = getTreatmentCardImageUrl(service)
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                  className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
                    service.active !== false
                      ? 'border-white/10 bg-white/5 hover:border-white/20 hover:shadow-glow'
                      : 'border-white/5 bg-white/[0.02] opacity-60'
                  }`}
                >
                  <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${accent} opacity-70`} />
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
                  />

                  <div className="relative flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: [0, -6, 6, 0], scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                      className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${accent} shadow-lg`}
                    >
                      {thumbUrl ? (
                        <img src={thumbUrl} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                      ) : (
                        <ServiceIcon type={service.iconType} className="h-7 w-7 text-white" />
                      )}
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-white">{service.name}</h3>
                          <p className="text-xs text-slate-500">/{service.slug}</p>
                        </div>
                        <span className={`shrink-0 rounded-full bg-gradient-to-r ${accent} px-2.5 py-1 text-[10px] font-bold uppercase text-white shadow-sm`}>
                          {service.category}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-400">{service.tagline}</p>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          onClick={() => openEdit(service)}
                          className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          <Pencil className="h-3.5 w-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleToggleActive(service)}
                          className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10"
                        >
                          {service.active !== false ? (
                            <><Eye className="h-3.5 w-3.5" /> Visible</>
                          ) : (
                            <><EyeOff className="h-3.5 w-3.5" /> Hidden</>
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(service.id, service.name)}
                          className="flex items-center gap-1.5 rounded-lg bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-400 transition-colors hover:bg-rose-500/20"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}

      {isFetching && services.length > 0 && (
        <p className="text-center text-xs text-slate-500">Syncing…</p>
      )}

      {/* Modal form */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
            onClick={closeForm}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-teal-500/10 blur-3xl" />

              <div className="relative mb-7 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-glow">
                    {editing === 'new' ? <Plus className="h-5 w-5 text-white" /> : <Pencil className="h-4.5 w-4.5 text-white" />}
                  </div>
                  <h2 className="font-display text-xl font-bold text-white">
                    {editing === 'new' ? 'Add Treatment' : 'Edit Treatment'}
                  </h2>
                </div>
                <button onClick={closeForm} className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="relative space-y-7">
                <FormSection label="Basic Info">
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-400">Treatment Name *</label>
                      <input
                        value={form.name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        required
                        className="admin-input"
                        placeholder="e.g. Root Canal Treatment"
                      />
                      {form.name.trim() && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-500">
                          <Link2 className="h-3 w-3" /> Will be listed at /services/{form.slug || slugify(form.name)}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-400">Short Name</label>
                      <input
                        value={form.shortName}
                        onChange={(e) => setForm((f) => ({ ...f, shortName: e.target.value }))}
                        className="admin-input"
                        placeholder="Shown in tight spaces like the nav menu"
                      />
                    </div>
                  </div>
                </FormSection>

                <FormSection label="Category">
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_CATEGORIES.map((c) => {
                      const selected = form.category === c
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, category: c }))}
                          className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                            selected
                              ? `border-transparent bg-gradient-to-r ${CATEGORY_COLORS[c]} text-white shadow-glow`
                              : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10'
                          }`}
                        >
                          {c}
                        </button>
                      )
                    })}
                  </div>
                </FormSection>

                <FormSection label="Icon">
                  <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
                    {SERVICE_ICON_TYPES.map((t) => {
                      const selected = form.iconType === t.value
                      return (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, iconType: t.value }))}
                          title={t.label}
                          className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-all duration-200 ${
                            selected
                              ? 'border-teal-400/50 bg-teal-500/15 shadow-glow'
                              : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                          }`}
                        >
                          <ServiceIcon
                            type={t.value}
                            className={`h-6 w-6 ${selected ? 'text-teal-300' : 'text-slate-400'}`}
                          />
                          <span className={`text-center text-[9px] font-semibold leading-tight ${selected ? 'text-teal-200' : 'text-slate-500'}`}>
                            {t.label.split(' / ')[0]}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </FormSection>

                <FormSection label="Duration">
                  <input
                    value={form.duration}
                    onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                    className="admin-input"
                    placeholder="e.g. 30 mins"
                  />
                </FormSection>

                <FormSection label="Content">
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-400">Tagline</label>
                      <input
                        value={form.tagline}
                        onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
                        className="admin-input"
                        placeholder="One short line patients see first"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-400">Description</label>
                      <textarea
                        value={form.description}
                        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                        rows={3}
                        className="admin-input resize-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-400">
                        Highlights (comma-separated)
                      </label>
                      <input
                        value={highlightsText}
                        onChange={(e) => setHighlightsText(e.target.value)}
                        className="admin-input"
                        placeholder="Pain-free, Same-day results, Digital X-ray"
                      />
                    </div>
                  </div>
                </FormSection>

                <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <input
                    type="checkbox"
                    id="active"
                    checked={form.active !== false}
                    onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
                    className="h-4 w-4 rounded border-white/20 bg-white/5 text-teal-500"
                  />
                  <span className="text-sm font-medium text-slate-300">Visible on website</span>
                </label>

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={closeForm} className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-400 hover:text-white">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn-primary !text-sm !px-6 !py-2.5">
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Treatment
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

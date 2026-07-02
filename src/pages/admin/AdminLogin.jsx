import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import brandLogo from '../../assets/brand-logo.jpeg'

export default function AdminLogin() {
  const { login, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'Admin Login — Dental Tribe'
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.code === 'auth/invalid-credential' ? 'Invalid email or password.' : err.message)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-teal-400" />
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(49,170,190,0.15),transparent_50%)]" />
      <img
        src={brandLogo}
        alt=""
        className="pointer-events-none absolute -right-20 top-20 h-64 w-64 rounded-3xl object-cover opacity-[0.04]"
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="mx-auto mb-6 overflow-hidden rounded-2xl shadow-glow ring-2 ring-teal-400/30"
          >
            <img src={brandLogo} alt="Dental Tribe" className="h-20 w-20 object-cover" />
          </motion.div>
          <h1 className="font-display text-3xl font-extrabold text-white">Admin Panel</h1>
          <p className="mt-2 text-sm text-teal-200/60">Dental Tribe — Dr. Shahab &amp; Associates</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
          {error && (
            <div className="mb-5 flex items-center gap-2 rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-teal-100">
                <Mail className="h-4 w-4 text-teal-400" /> Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
                placeholder="admin@dentaltribe.com"
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-teal-100">
                <Lock className="h-4 w-4 text-teal-400" /> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
                placeholder="••••••••"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="btn-primary mt-8 w-full disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Lock className="h-5 w-5" />}
            Sign In
          </motion.button>
        </form>

        <p className="mt-6 text-center text-xs text-teal-300/40">
          Authorized personnel only. Session ends when you close the browser.
        </p>
      </motion.div>
    </div>
  )
}

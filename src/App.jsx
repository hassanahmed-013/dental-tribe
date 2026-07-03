import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { scrollToSectionWhenReady } from './lib/scroll'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'
import { SiteContentProvider } from './context/SiteContentContext'
import Home from './pages/Home'
import ServiceDetail from './pages/ServiceDetail'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import ProblemDetail from './pages/ProblemDetail'
import PageWipe from './components/PageWipe'
import MobileStickyCTA from './components/MobileStickyCTA'
import ProtectedRoute from './components/ProtectedRoute'
import AdminGuestRoute from './components/AdminGuestRoute'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminServices from './pages/admin/AdminServices'
import AdminAppointments from './pages/admin/AdminAppointments'
import AdminBlogs from './pages/admin/AdminBlogs'

function AnimatedRoutes() {
  const location = useLocation()
  const prevPath = useRef(location.pathname)
  const [wipeKey, setWipeKey] = useState(null)
  const isAdmin = location.pathname.startsWith('/admin')

  useEffect(() => {
    if (location.hash && location.pathname === '/') {
      const sectionId = location.hash.replace('#', '')
      scrollToSectionWhenReady(sectionId)
      return
    }

    if (prevPath.current !== location.pathname) {
      if (!isAdmin && !location.pathname.startsWith('/admin')) {
        setWipeKey(`${location.pathname}-${Date.now()}`)
      }
      window.scrollTo(0, 0)
      prevPath.current = location.pathname
    }
  }, [location.pathname, location.hash, isAdmin])

  return (
    <>
      <AnimatePresence>
        {wipeKey && <PageWipe key={wipeKey} onDone={() => setWipeKey(null)} />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/problems/:id" element={<ProblemDetail />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/admin/login"
            element={
              <AdminGuestRoute>
                <AdminLogin />
              </AdminGuestRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="blogs" element={<AdminBlogs />} />
          </Route>
        </Routes>
      </AnimatePresence>
      <MobileStickyCTA />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <SiteContentProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </SiteContentProvider>
    </AuthProvider>
  )
}

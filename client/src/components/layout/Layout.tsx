import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()
  const [showBack, setShowBack] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setShowBack(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0D0A08] flex flex-col">
      <Header />
      <main className="flex-1 page-enter" key={pathname}>
        <Outlet />
      </main>
      <Footer />
      {showBack && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="back-to-top fixed bottom-8 left-8 z-50 bg-primary text-on-primary w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:brightness-110 active:scale-90 transition-all"
          aria-label="Back to top"
        >
          <span className="material-symbols-outlined">arrow_upward</span>
        </button>
      )}
    </div>
  )
}

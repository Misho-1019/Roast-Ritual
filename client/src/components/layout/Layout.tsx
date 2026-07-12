import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen bg-[#0D0A08] flex flex-col">
      <Header />
      <main className="flex-1 page-enter" key={pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Quiz', to: '/quiz' },
  { label: 'Brew Guides', to: '/brew-guides' },
  { label: 'About', to: '/about' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-outline-variant shadow-sm transition-all ${
        scrolled ? 'h-16' : 'h-20'
      }`}
    >
      <div className="flex justify-between items-center max-w-max-width mx-auto px-container-padding h-full">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-sm">
            R&R
          </div>
          <span className="font-display text-h1 font-bold text-primary tracking-tight hidden sm:inline">
            Roast & Ritual
          </span>
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-body text-body"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <button className="text-on-surface hover:text-primary scale-95 active:scale-90 transition-transform relative">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="absolute -top-1 -right-2 bg-primary-container text-on-primary-container text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              2
            </span>
          </button>
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <span className="text-on-surface-variant text-sm hidden sm:inline">{user.name}</span>
              <button
                onClick={logout}
                className="text-on-surface-variant hover:text-primary transition-colors"
                title="Sign out"
              >
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-body text-sm"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-bold text-sm hover:brightness-110 transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

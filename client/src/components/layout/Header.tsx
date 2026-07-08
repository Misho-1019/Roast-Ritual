import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Quiz', to: '/quiz' },
  { label: 'Brew Guides', to: '/brew-guides' },
  { label: 'About', to: '/about' },
]

export default function Header() {
  return (
    <header className="bg-[#0D0A08] border-b border-[#7C4F34]/30">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-[#D4A04A] text-xl font-bold tracking-tight">
          Roast & Ritual
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[#B8A89A] hover:text-[#F5F0EB] transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link to="/cart" className="relative text-[#B8A89A] hover:text-[#D4A04A] transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <span className="absolute -top-1.5 -right-1.5 bg-[#D4A04A] text-[#0D0A08] text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
        </Link>
      </div>
    </header>
  )
}

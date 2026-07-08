import { Outlet, Link } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-[100dvh] flex flex-col justify-between overflow-x-hidden bg-background">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(212,160,74,0.05)_0%,_transparent_70%)] z-0" />
      <header className="w-full h-20 flex items-center justify-center relative z-10">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-sm">
            R&R
          </div>
          <span className="font-display text-h2 font-extrabold text-primary tracking-tight">
            Roast & Ritual
          </span>
        </Link>
      </header>
      <main className="flex-grow flex items-center justify-center px-container-padding relative z-10 py-12">
        <Outlet />
      </main>
      <footer className="w-full py-8 border-t border-outline-variant relative z-10 bg-surface-container-lowest">
        <div className="max-w-max-width mx-auto px-container-padding flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-small text-small text-on-surface-variant opacity-80">
            &copy; 2026 Roast & Ritual. Crafted for the artisanal palate.
          </p>
          <div className="flex gap-6">
            <a className="font-small text-small text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy</a>
            <a className="font-small text-small text-on-surface-variant hover:text-primary transition-colors" href="#">Terms</a>
            <a className="font-small text-small text-on-surface-variant hover:text-primary transition-colors" href="#">Help</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

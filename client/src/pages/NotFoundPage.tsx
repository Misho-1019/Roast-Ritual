import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <span className="material-symbols-outlined text-7xl text-primary/30 mb-4">search_off</span>
        <h1 className="text-display text-on-surface font-bold mb-2">404</h1>
        <p className="text-on-surface text-lg mb-1">Page not found</p>
        <p className="text-mocha-text mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          to="/"
          className="bg-primary text-on-primary px-8 py-3.5 rounded-lg font-bold inline-block hover:brightness-110 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

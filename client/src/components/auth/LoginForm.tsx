import { useState } from 'react'
import { Link } from 'react-router-dom'

interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void
  isLoading?: boolean
}

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.({ email, password })
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-espresso border border-chestnut p-8 md:p-10 rounded-xl shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-h1 text-on-surface mb-2">Welcome Back</h1>
          <p className="font-small text-small text-on-surface-variant">
            Enter your credentials to access your ritual.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="font-small text-small text-on-surface-variant block uppercase tracking-wider" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <input
                className="w-full px-4 py-3 rounded-lg text-on-surface placeholder:text-on-surface-variant/30 bg-surface border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                id="email"
                name="email"
                placeholder="name@example.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-on-surface-variant/50 pointer-events-none">
                <span className="material-symbols-outlined text-[20px]">alternate_email</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-small text-small text-on-surface-variant block uppercase tracking-wider" htmlFor="password">
                Password
              </label>
              <a className="font-small text-small text-primary hover:underline transition-all" href="#">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                className="w-full px-4 py-3 rounded-lg text-on-surface placeholder:text-on-surface-variant/30 bg-surface border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-on-surface-variant hover:text-primary transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-lg font-display text-body font-bold uppercase tracking-widest bg-primary-container text-on-primary-container hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <span className="material-symbols-outlined animate-spin inline-block">refresh</span>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>
        <div className="mt-8 text-center pt-6 border-t border-outline-variant/30">
          <p className="font-small text-small text-on-surface-variant">
            Don&apos;t have an account?
            <Link to="/register" className="text-primary font-bold hover:underline transition-all ml-1">
              Register
            </Link>
          </p>
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-6 text-on-surface-variant/40">
        <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">brand_awareness</span>
        <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">star</span>
        <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">coffee</span>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

interface RegisterFormProps {
  onSubmit?: (data: { name: string; email: string; password: string }) => void
  isLoading?: boolean
}

export default function RegisterForm({ onSubmit: externalSubmit, isLoading: externalLoading }: RegisterFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [passError, setPassError] = useState('')
  const { register, isLoading: storeLoading, error, clearError } = useAuthStore()
  const navigate = useNavigate()

  const isLoading = externalLoading ?? storeLoading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    setPassError('')

    if (password !== confirmPassword) {
      setPassError('Passwords do not match')
      return
    }

    try {
      if (externalSubmit) {
        await externalSubmit({ name, email, password })
      } else {
        await register(name, email, password)
        navigate('/')
      }
    } catch {
      // Error is set in the store
    }
  }

  const togglePassword = (field: 'password' | 'confirm') => {
    if (field === 'password') setShowPassword(!showPassword)
    else setShowConfirm(!showConfirm)
  }

  return (
    <div className="w-full max-w-[480px]">
      <div className="bg-espresso border border-chestnut rounded-xl p-8 md:p-12 transition-all duration-500 hover:border-primary/40">
        <div className="text-center mb-10">
          <h2 className="font-display text-h1 text-on-surface mb-2">Create Your Ritual</h2>
          <p className="font-body text-on-surface-variant opacity-80">
            Join the community of coffee enthusiasts
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {(error || passError) && (
            <div className="bg-error/10 border border-error/30 rounded-lg p-3">
              <p className="text-error text-sm">{passError || error}</p>
            </div>
          )}
          <div className="space-y-2">
            <label className="font-small text-small text-on-surface-variant block ml-1" htmlFor="name">
              Full Name
            </label>
            <input
              className="w-full rounded-lg py-3 px-4 text-on-surface placeholder:text-outline-variant bg-surface border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body"
              id="name"
              name="name"
              placeholder="Elias Thorne"
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="font-small text-small text-on-surface-variant block ml-1" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full rounded-lg py-3 px-4 text-on-surface placeholder:text-outline-variant bg-surface border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body"
              id="email"
              name="email"
              placeholder="ritual@coffee.com"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="font-small text-small text-on-surface-variant block ml-1" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="w-full rounded-lg py-3 px-4 pr-12 text-on-surface placeholder:text-outline-variant bg-surface border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors"
                onClick={() => togglePassword('password')}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-small text-small text-on-surface-variant block ml-1" htmlFor="confirm-password">
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="w-full rounded-lg py-3 px-4 pr-12 text-on-surface placeholder:text-outline-variant bg-surface border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body"
                id="confirm-password"
                name="confirm-password"
                placeholder="••••••••"
                required
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors"
                onClick={() => togglePassword('confirm')}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showConfirm ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>
          <div className="flex items-start gap-3 pt-2">
            <input
              className="mt-1 rounded border-outline-variant bg-surface text-primary focus:ring-primary focus:ring-offset-background"
              id="terms"
              required
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <label className="font-small text-on-surface-variant text-[13px] leading-tight cursor-pointer" htmlFor="terms">
              I agree to the{' '}
              <a className="text-primary hover:underline transition-all" href="#">Terms of Service</a>
              {' '}and{' '}
              <a className="text-primary hover:underline transition-all" href="#">Privacy Policy</a>.
            </label>
          </div>
          <button
            type="submit"
            disabled={isLoading || !agreeTerms}
            className="bg-primary-container text-on-primary-container w-full py-4 rounded-lg font-bold text-body tracking-wide mt-4 flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70"
          >
            {isLoading ? (
              <span className="material-symbols-outlined animate-spin">refresh</span>
            ) : (
              <>
                Create Account
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </button>
        </form>
        <div className="mt-8 text-center border-t border-outline-variant/30 pt-8">
          <p className="font-body text-on-surface-variant">
            Already have an account?
            <Link to="/login" className="text-primary font-bold hover:underline underline-offset-4 ml-1 transition-all">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

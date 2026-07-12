import { useState } from 'react'
import { useCartStore } from '../../stores/cartStore'

export default function CouponInput() {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [animating, setAnimating] = useState(false)
  const { applyCoupon, coupon, clearCoupon } = useCartStore()

  const handleApply = async () => {
    if (!code.trim()) return
    try {
      await applyCoupon(code.trim().toUpperCase())
      setMessage('Coupon applied!')
      setAnimating(true)
      setTimeout(() => setAnimating(false), 600)
    } catch {
      setMessage('Invalid coupon code')
    }
  }

  return (
    <div className="bg-espresso border border-chestnut/30 rounded-lg p-4">
      <h4 className="text-on-surface font-semibold mb-3">
        {coupon ? 'Coupon Applied' : 'Coupon Code'}
      </h4>
      {coupon ? (
        <div className={`flex items-center justify-between ${animating ? 'cart-bounce' : ''}`}>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-green-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            <span className="text-green-500 font-bold text-sm">{coupon.code}</span>
          </div>
          <button onClick={clearCoupon} className="text-mocha-text hover:text-error text-sm">Remove</button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            className="flex-1 bg-background border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface placeholder:text-mocha-text/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
            placeholder="Enter coupon code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            onClick={handleApply}
            className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-bold text-sm hover:brightness-110 active:scale-95 transition-all"
          >
            Apply
          </button>
        </div>
      )}
      {message && <p className={`text-sm mt-2 ${message === 'Coupon applied!' ? 'text-green-500' : 'text-error'}`}>{message}</p>}
    </div>
  )
}

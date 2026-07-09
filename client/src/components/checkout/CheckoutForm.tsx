import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCartStore } from '../../stores/cartStore'

export default function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const { items, total, clearCart } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: 'United States',
  })

  const updateField = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsLoading(true)
    setError('')

    try {
      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: { name: form.name, email: form.email },
        },
      })

      if (stripeError) {
        setError(stripeError.message || 'Payment failed')
      } else {
        clearCart()
        navigate('/orders')
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (items.length === 0) navigate('/cart')
  }, [items.length, navigate])

  const inputClass = 'w-full bg-background border border-chestnut/50 rounded-lg px-4 py-3 text-on-surface placeholder:text-mocha-text/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all'

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-error/10 border border-error/30 rounded-lg p-3">
          <p className="text-error text-sm">{error}</p>
        </div>
      )}

      <section>
        <h2 className="text-h2 text-on-surface mb-6">Shipping Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="font-small text-mocha-text block mb-2">Full Name</label>
            <input className={inputClass} placeholder="John Doe" required value={form.name} onChange={(e) => updateField('name', e.target.value)} />
          </div>
          <div>
            <label className="font-small text-mocha-text block mb-2">Email</label>
            <input className={inputClass} type="email" placeholder="john@example.com" required value={form.email} onChange={(e) => updateField('email', e.target.value)} />
          </div>
          <div>
            <label className="font-small text-mocha-text block mb-2">Phone</label>
            <input className={inputClass} type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="font-small text-mocha-text block mb-2">Address</label>
            <input className={inputClass} placeholder="123 Coffee Street" required value={form.address} onChange={(e) => updateField('address', e.target.value)} />
          </div>
          <div>
            <label className="font-small text-mocha-text block mb-2">City</label>
            <input className={inputClass} placeholder="Portland" required value={form.city} onChange={(e) => updateField('city', e.target.value)} />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="font-small text-mocha-text block mb-2">State</label>
              <input className={inputClass} placeholder="OR" required value={form.state} onChange={(e) => updateField('state', e.target.value)} />
            </div>
            <div className="flex-1">
              <label className="font-small text-mocha-text block mb-2">ZIP</label>
              <input className={inputClass} placeholder="97201" required value={form.zip} onChange={(e) => updateField('zip', e.target.value)} />
            </div>
          </div>
          <div>
            <label className="font-small text-mocha-text block mb-2">Country</label>
            <select className={inputClass} value={form.country} onChange={(e) => updateField('country', e.target.value)}>
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
              <option>Australia</option>
            </select>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-h2 text-on-surface mb-2">Payment</h2>
        <p className="text-mocha-text font-small mb-6 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">lock</span>
          Secure payment via Stripe
        </p>
        <div className="bg-background border border-chestnut/50 rounded-lg px-4 py-4">
          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: '16px',
                  color: '#F5F0EB',
                  fontFamily: 'Inter, sans-serif',
                  '::placeholder': { color: '#B8A89A' },
                },
                invalid: { color: '#C85A3E' },
              },
            }}
          />
        </div>
      </section>

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-primary-container text-on-primary-container py-4 rounded-lg font-bold text-body hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
      >
        {isLoading ? (
          <span className="material-symbols-outlined animate-spin inline-block">refresh</span>
        ) : (
          `Place Order — $${total().toFixed(2)}`
        )}
      </button>
    </form>
  )
}

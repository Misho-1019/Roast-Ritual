import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useCartStore } from '../stores/cartStore'
import { api } from '../lib/api'
import CheckoutForm from '../components/checkout/CheckoutForm'
import OrderSummary from '../components/checkout/OrderSummary'

const STRIPE_PK = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51RvU96PW9LwsuQfOGrrdp51aO6AgDHgPR4xGsv5jwIqETmC75DAPay4RVY7gAE4Rp1qai9jcylDg49dlDvhWIamv00cn3MWbtu'
const stripePromise = loadStripe(STRIPE_PK)

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, fetchCart, coupon } = useCartStore()
  const [clientSecret, setClientSecret] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCart()
      .catch(() => {})
  }, [fetchCart])

  useEffect(() => {
    if (items.length > 0) {
      const body = coupon ? { couponId: coupon.id } : {}
      api.post<{ clientSecret: string }>('/checkout/create-payment-intent', body)
        .then((data) => setClientSecret(data.clientSecret))
        .catch(console.error)
        .finally(() => setIsLoading(false))
    } else if (!isLoading) {
      navigate('/cart')
    }
  }, [items.length, isLoading, navigate, coupon])

  if (isLoading || !clientSecret) {
    return (
      <div className="max-w-max-width mx-auto px-6 py-32 text-center">
        <span className="material-symbols-outlined text-4xl animate-spin text-primary">refresh</span>
        <p className="text-mocha-text mt-4">Preparing checkout...</p>
      </div>
    )
  }

  return (
    <div className="max-w-max-width mx-auto px-6 py-12 min-h-screen">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-outline-variant/30">
        <Link to="/" className="text-h1 text-primary font-bold tracking-tight">
          Roast & Ritual
        </Link>
        <Link to="/cart" className="text-mocha-text hover:text-primary transition-colors text-sm">
          &larr; Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 text-mocha-text text-sm mb-8">
            <span className="text-primary font-bold">Cart</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-primary font-bold">Information</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-mocha-text">Shipping</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-mocha-text">Payment</span>
          </div>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        </div>
        <div className="lg:col-span-5">
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}

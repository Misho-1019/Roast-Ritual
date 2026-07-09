import { Link } from 'react-router-dom'
import CheckoutForm from '../components/checkout/CheckoutForm'
import OrderSummary from '../components/checkout/OrderSummary'

export default function CheckoutPage() {
  return (
    <div className="max-w-max-width mx-auto px-6 py-12 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-outline-variant/30">
        <Link to="/" className="font-display text-h1 text-primary font-bold tracking-tight">
          Roast & Ritual
        </Link>
        <Link to="/cart" className="text-mocha-text hover:text-primary transition-colors font-small text-sm">
          &larr; Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 text-mocha-text font-small text-sm mb-8">
            <span className="text-primary font-bold">Cart</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-primary font-bold">Information</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-mocha-text">Shipping</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-mocha-text">Payment</span>
          </div>
          <CheckoutForm />
        </div>
        <div className="lg:col-span-5">
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}

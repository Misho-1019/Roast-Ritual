import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../stores/cartStore'
import CartItem from '../components/cart/CartItem'
import CouponInput from '../components/cart/CouponInput'
import CartSummary from '../components/cart/CartSummary'

export default function CartPage() {
  const { items, isLoading, fetchCart, updateQuantity, removeItem, subtotal, discount, total } = useCartStore()

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  if (isLoading) {
    return (
      <div className="max-w-max-width mx-auto px-6 py-32">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-surface-container-high rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-max-width mx-auto px-6 py-32 text-center">
        <span className="material-symbols-outlined text-6xl text-primary/30 mb-4">shopping_cart</span>
        <h1 className="text-h2 text-on-surface mb-2">Your cart is empty</h1>
        <p className="text-mocha-text mb-8">Looks like you haven&apos;t added any coffee yet.</p>
        <Link to="/shop" className="bg-primary-container text-on-primary-container px-8 py-3 rounded-lg font-bold inline-block hover:brightness-110 transition-all">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-max-width mx-auto px-6 py-32 min-h-screen">
      <div className="flex items-baseline gap-4 mb-12 border-b border-outline-variant pb-6">
        <h1 className="text-h1 text-on-surface">Your Cart</h1>
        <span className="text-mocha-text">({items.length} {items.length === 1 ? 'Item' : 'Items'})</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="relative">
              <CartItem
                id={item.id}
                name={item.product.name}
                imageUrl={item.product.imageUrl}
                quantity={item.quantity}
                onUpdateQuantity={(id, qty) => updateQuantity(id, qty)}
                onRemove={(id) => removeItem(id)}
              />
            </div>
          ))}
        </div>
        <div className="lg:col-span-4 space-y-4">
          <CouponInput />
          <CartSummary
            subtotal={subtotal()}
            discount={discount()}
            total={total()}
          />
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { useCartStore } from '../../stores/cartStore'

interface ProductInfoProps {
  id: string
  name: string
  description: string
  price: number
  roastLevel: string
  origin: string
  flavorNotes: string[]
  stock: number
  rating?: number
  reviewCount?: number
}

export default function ProductInfo({ id, name, description, price, roastLevel, origin, flavorNotes, stock, rating = 4.8, reviewCount = 24 }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const addItem = useCartStore((s) => s.addItem)

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-block bg-primary text-on-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
          {roastLevel}
        </span>
        <h1 className="font-display text-display text-on-surface leading-tight">{name}</h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="text-primary font-bold">{rating}</span>
          <span className="text-mocha-text">({reviewCount} reviews)</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-mocha-text">
        <span className="material-symbols-outlined">location_on</span>
        <span className="font-body">{origin}</span>
      </div>

      {flavorNotes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {flavorNotes.map((note) => (
            <span key={note} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
              {note}
            </span>
          ))}
        </div>
      )}

      <p className="text-mocha-text font-body leading-relaxed">{description}</p>

      <div className="text-h1 font-bold text-primary">${Number(price).toFixed(2)}</div>

      {stock > 0 ? (
        <p className="text-green-500 font-small text-sm flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          In Stock ({stock} available)
        </p>
      ) : (
        <p className="text-error font-small text-sm flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">cancel</span>
          Out of Stock
        </p>
      )}

      <div className="flex items-center gap-4">
        <span className="text-mocha-text font-body">Quantity:</span>
        <div className="flex items-center border border-chestnut rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 text-on-surface hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">remove</span>
          </button>
          <span className="px-4 py-2 text-on-surface font-bold min-w-[3rem] text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(stock, quantity + 1))}
            className="px-4 py-2 text-on-surface hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
      </div>

      <button
        disabled={stock === 0}
        onClick={() => {
          if (!isAuthenticated) {
            navigate(`/login?redirect=/product/${name.toLowerCase().replace(/\s+/g, '-')}`)
            return
          }
          addItem(id, quantity)
        }}
        className="w-full bg-primary-container text-on-primary-container py-4 rounded-lg font-bold text-body flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
      >
        <span className="material-symbols-outlined">add_shopping_cart</span>
        Add to Cart
      </button>

      <div className="flex items-center gap-2 text-mocha-text font-small text-sm justify-center">
        <span className="material-symbols-outlined text-sm">local_shipping</span>
        Free shipping on orders over $30
      </div>
    </div>
  )
}

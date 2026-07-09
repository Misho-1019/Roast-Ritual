import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { useCartStore } from '../../stores/cartStore'

interface ProductCardProps {
  id: string
  name: string
  slug: string
  origin: string
  roastLevel: string
  price: number
  imageUrl: string
  flavorNotes: string[]
}

export default function ProductCard({ id, name, slug, origin, roastLevel, price, imageUrl, flavorNotes }: ProductCardProps) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const addItem = useCartStore((s) => s.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isAuthenticated) {
      navigate('/login?redirect=/shop')
      return
    }
    addItem(id)
  }

  return (
    <a
      href={`/product/${slug}`}
      className="flex flex-col group border border-outline-variant/10 rounded-xl overflow-hidden bg-espresso/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {imageUrl ? (
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={imageUrl}
            alt={name}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-surface-container-high to-background flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-primary/20">local_cafe</span>
          </div>
        )}
        <span className="absolute top-4 left-4 bg-primary text-on-primary text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
          {roastLevel}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-body font-bold text-on-surface group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-mocha-text font-small text-sm mt-1">{origin}</p>
        {flavorNotes.length > 0 && (
          <p className="text-mocha-text/60 font-small text-xs mt-2">{flavorNotes.slice(0, 3).join(', ')}</p>
        )}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-primary font-bold text-h2">${Number(price).toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-on-primary p-2.5 rounded-lg hover:scale-110 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">add_shopping_cart</span>
          </button>
        </div>
      </div>
    </a>
  )
}

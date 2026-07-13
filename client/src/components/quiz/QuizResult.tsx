import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { useCartStore } from '../../stores/cartStore'
import { api } from '../../lib/api'
import type { ProductMatch } from '../../data/quizQuestions'

const flavorIcons: Record<string, string> = {
  Floral: 'local_florist',
  Lemon: 'nutrition',
  'Tea-like': 'coffee',
  Jasmine: 'local_florist',
  Caramel: 'cake',
  'Red Apple': 'nutrition',
  Nutty: 'egg',
  Earthy: 'grass',
  'Dark Chocolate': 'cake',
  Spice: 'whatshot',
  'Tropical Fruit': 'local_florist',
  Winey: 'wine_bar',
  Citrus: 'nutrition',
  Honey: 'cake',
  'Milk Chocolate': 'cake',
  Grapefruit: 'nutrition',
  Blackcurrant: 'nutrition',
  'Wine-like': 'wine_bar',
}

interface QuizResultProps {
  product: ProductMatch
  onRestart: () => void
  otherProducts?: ProductMatch[]
}

export default function QuizResult({ product, onRestart, otherProducts = [] }: QuizResultProps) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const addItem = useCartStore((s) => s.addItem)
  const [btnStatus, setBtnStatus] = useState<'idle' | 'added'>('idle')

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=/quiz`)
      return
    }
    try {
      const resolved = await api.get<{ id: string }>(`/products/${product.slug}`)
      await addItem(resolved.id)
      setBtnStatus('added')
      setTimeout(() => setBtnStatus('idle'), 2000)
    } catch (err) {
      console.error('Add to cart failed:', err)
    }
  }

  return (
    <div className="max-w-max-width mx-auto px-6 py-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-[radial-gradient(circle_at_50%_50%,rgba(245,189,100,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Main result section */}
      <section className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Product image */}
        <div className="order-2 lg:order-1 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
            <div className="relative aspect-square w-full max-w-[500px] bg-espresso rounded-xl overflow-hidden border border-outline-variant group-hover:border-primary transition-colors duration-500">
              {product.imageUrl ? (
                <img className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700" src={product.imageUrl} alt={product.name} />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-primary/20">local_cafe</span>
                </div>
              )}
              <div className="absolute top-6 left-6">
                <span className="bg-primary text-on-primary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">94 PTS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2 space-y-8">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Discovery Complete</p>
            <h1 className="font-display text-[clamp(2.5rem,5vw,5rem)] text-on-surface leading-tight">
              Your Perfect Ritual: <span className="text-primary">{product.name}</span>
            </h1>
          </div>

          <p className="text-mocha-text text-lg font-body max-w-xl leading-relaxed">
            Based on your preferences, this single-origin {product.roastLevel.toLowerCase()} from {product.origin} is your ideal match.
          </p>

          {/* Flavor icons */}
          {product.flavorNotes && product.flavorNotes.length > 0 && (
            <div className="py-8 border-y border-outline-variant flex flex-wrap gap-8">
              {product.flavorNotes.map((note) => (
                <div key={note} className="flex items-center gap-4 group cursor-default">
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                    <span className="material-symbols-outlined">{flavorIcons[note] || 'coffee'}</span>
                  </div>
                  <span className="font-bold text-on-surface tracking-wide">{note}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className={`px-10 py-4 rounded-lg font-bold text-body hover:brightness-110 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 ${btnStatus === 'added' ? 'bg-green-800 text-white' : 'bg-primary-container text-on-primary-container'}`}
            >
              <span className="material-symbols-outlined">{btnStatus === 'added' ? 'check_circle' : 'shopping_cart'}</span>
              {btnStatus === 'added' ? 'Added to Cart' : 'Add to Ritual'}
            </button>
            <button
              onClick={onRestart}
              className="border border-chestnut text-on-surface px-10 py-4 rounded-lg font-bold text-body hover:bg-surface-container-high active:scale-95 transition-all duration-200"
            >
              Start Over
            </button>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      {otherProducts.length > 0 && (
        <section className="mt-24 py-20">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-mocha-text font-medium">Broaden your palate</p>
              <h2 className="text-h2 text-on-surface">You might also enjoy</h2>
            </div>
            <Link to="/shop" className="text-primary font-bold flex items-center gap-2 group">
              Explore all beans
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProducts.slice(0, 3).map((rec) => (
              <Link
                key={rec.slug}
                to={`/product/${rec.slug}`}
                className="bg-espresso border border-outline-variant p-6 rounded-xl hover:border-primary transition-colors group"
              >
                <div className="aspect-[4/5] bg-surface-container mb-6 overflow-hidden rounded-lg">
                  {rec.imageUrl ? (
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={rec.imageUrl} alt={rec.name} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-primary/20">local_cafe</span>
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-on-surface mb-2">{rec.name}</h3>
                <p className="text-mocha-text font-small text-sm mb-4">{rec.roastLevel} &bull; {rec.origin}</p>
                <span className="text-primary font-bold">${Number(rec.price).toFixed(2)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

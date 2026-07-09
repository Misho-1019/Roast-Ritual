import { Link } from 'react-router-dom'
import type { ProductMatch } from '../../data/quizQuestions'

export default function QuizResult({ product }: { product: ProductMatch }) {
  return (
    <div className="text-center max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
        <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>coffee</span>
      </div>
      <span className="text-xs uppercase tracking-widest text-primary font-medium mb-4 block">Your Perfect Match</span>
      <h2 className="text-h1 text-on-surface mb-2">{product.name}</h2>
      <p className="text-mocha-text mb-8">{product.description}</p>

      <div className="bg-espresso border border-outline-variant/30 rounded-xl overflow-hidden mb-8">
        <div className="aspect-[4/3] bg-gradient-to-br from-surface-container-high to-background">
          {product.imageUrl ? (
            <img className="w-full h-full object-cover" src={product.imageUrl} alt={product.name} />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-primary/20">local_cafe</span>
            </div>
          )}
        </div>
        <div className="p-6 text-left">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-primary text-on-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.roastLevel}
            </span>
            <span className="text-mocha-text font-small text-sm">{product.origin}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-primary font-bold text-h2">${product.price.toFixed(2)}</span>
            <Link
              to={`/product/${product.slug}`}
              className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold text-sm hover:brightness-110 active:scale-95 transition-all"
            >
              View Product
            </Link>
          </div>
        </div>
      </div>

      <Link to="/shop" className="text-primary hover:underline font-bold text-sm">
        Browse All Coffees &rarr;
      </Link>
    </div>
  )
}

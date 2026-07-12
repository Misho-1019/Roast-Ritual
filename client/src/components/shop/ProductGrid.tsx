import ProductCard from './ProductCard'

interface Product {
  id: string
  name: string
  slug: string
  origin: string
  roastLevel: string
  price: number
  imageUrl: string
  flavorNotes: string[]
  stock: number
}

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
}

export default function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-espresso/30 rounded-xl overflow-hidden shimmer-gold">
            <div className="aspect-[4/5] bg-surface-container-high" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-surface-container-high rounded w-3/4" />
              <div className="h-3 bg-surface-container-high rounded w-1/2" />
              <div className="h-3 bg-surface-container-high rounded w-2/3" />
              <div className="flex justify-between pt-4">
                <div className="h-6 bg-surface-container-high rounded w-20" />
                <div className="h-8 w-8 bg-surface-container-high rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="material-symbols-outlined text-6xl text-primary/30 mb-4">search_off</span>
        <p className="text-mocha-text text-lg">No products found matching your criteria.</p>
      </div>
    )
  }

  return (
    <section className="pb-16 max-w-max-width mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <div key={product.id} className="stagger-enter-active" style={{ transitionDelay: `${i * 60}ms` }}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </section>
  )
}

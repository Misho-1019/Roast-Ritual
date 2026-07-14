import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import SearchFilters from '../components/shop/SearchFilters'
import ProductGrid from '../components/shop/ProductGrid'

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

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roastLevel, setRoastLevel] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const params = new URLSearchParams()
        if (search) params.set('search', search)
        if (roastLevel) params.set('roastLevel', roastLevel.toUpperCase())
        if (sortBy) params.set('sortBy', sortBy)

        const data = await api.get<{ data: Product[] }>(`/products?${params}`)
        setProducts(data.data || [])
      } catch (err) {
        console.error('Failed to fetch products:', err)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    const timer = setTimeout(fetchProducts, 300)
    return () => clearTimeout(timer)
  }, [search, roastLevel, sortBy])

  return (
    <>
      <section className="relative py-24 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,160,74,0.05)_0%,_transparent_70%)] pointer-events-none" />
        <div className="z-10 px-6">
          <span className="text-primary text-xs uppercase tracking-[0.3em] mb-4 block font-medium">Curation No. 04</span>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5.625rem)] text-primary mb-6 leading-tight">Our Collection</h1>
          <p className="font-body text-mocha-text max-w-2xl mx-auto text-lg">
            Explore single-origin coffees from around the world, meticulously sourced and roasted for the intentional brewer.
          </p>
        </div>
      </section>

      <SearchFilters
        search={search}
        onSearchChange={setSearch}
        roastLevel={roastLevel}
        onRoastChange={setRoastLevel}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="pt-12">
        <ProductGrid products={products} isLoading={isLoading} />
      </div>
    </>
  )
}

import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductImages from '../components/product/ProductImages'
import ProductInfo from '../components/product/ProductInfo'
import ReviewList from '../components/product/ReviewList'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  imageUrl: string
  stock: number
  roastLevel: string
  origin: string
  flavorNotes: string[]
  rating?: number
  reviewCount?: number
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/products/${slug}`, { credentials: 'include' })
        const data = await res.json()
        setProduct(data)
      } catch (err) {
        console.error('Failed to fetch product:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProduct()
  }, [slug])

  if (isLoading) {
    return (
      <div className="max-w-max-width mx-auto px-6 py-12 animate-pulse">
        <div className="h-4 bg-surface-container-high rounded w-48 mb-8" />
        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-square bg-surface-container-high rounded-2xl" />
          <div className="space-y-6">
            <div className="h-6 bg-surface-container-high rounded w-24" />
            <div className="h-12 bg-surface-container-high rounded w-3/4" />
            <div className="h-4 bg-surface-container-high rounded w-1/3" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 w-20 bg-surface-container-high rounded-full" />
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-surface-container-high rounded" />
              <div className="h-4 bg-surface-container-high rounded w-5/6" />
              <div className="h-4 bg-surface-container-high rounded w-2/3" />
            </div>
            <div className="h-12 bg-surface-container-high rounded w-32" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-max-width mx-auto px-6 py-20 text-center">
        <span className="material-symbols-outlined text-6xl text-primary/30 mb-4">search_off</span>
        <h1 className="text-h2 text-on-surface mb-2">Product not found</h1>
        <Link to="/shop" className="text-primary hover:underline font-bold">Back to Shop</Link>
      </div>
    )
  }

  return (
    <div className="max-w-max-width mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-mocha-text font-small text-sm mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-on-surface">{product.name}</span>
      </nav>

      {/* Main section */}
      <div className="grid md:grid-cols-2 gap-12">
        <ProductImages mainImage={product.imageUrl} productName={product.name} />
        <ProductInfo {...product} />
      </div>

      {/* Reviews */}
      <ReviewList />
    </div>
  )
}

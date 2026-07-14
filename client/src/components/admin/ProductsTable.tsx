import { useEffect, useState } from 'react'
import { api } from '../../lib/api'

interface ProductItem {
  id: string
  name: string
  price: number
  stock: number
  imageUrl: string
  roastLevel: string
  origin: string
  status?: string
}

export default function ProductsTable() {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api.get<{ data: ProductItem[] }>('/products?pageSize=10')
      .then((data) => setProducts(data.data || []))
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="lg:col-span-2 bg-espresso border border-outline-variant rounded-lg p-6 animate-pulse space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 bg-surface-container-high rounded" />
        ))}
      </div>
    )
  }

  return (
    <div className="lg:col-span-2 bg-espresso border border-outline-variant rounded-lg overflow-hidden flex flex-col">
      <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center">
        <h2 className="font-bold text-on-surface">Premium Inventory</h2>
        <a href="/admin/products" className="text-primary font-small text-xs font-medium hover:underline">View All</a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low text-mocha-text text-xs uppercase tracking-widest">
            <tr>
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Stock</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-surface-container/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-surface-variant overflow-hidden border border-outline-variant group-hover:border-primary transition-all shrink-0 flex items-center justify-center">
                      {product.imageUrl ? (
                        <img className="w-full h-full object-cover" src={product.imageUrl} alt={product.name} />
                      ) : (
                        <span className="material-symbols-outlined text-primary/40">local_cafe</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-on-surface truncate">{product.name}</p>
                      <p className="text-mocha-text font-small text-xs truncate">{product.roastLevel} &bull; {product.origin}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-on-surface">${Number(product.price).toFixed(2)}</td>
                <td className="px-6 py-4 text-on-surface">{product.stock} units</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${product.stock > 0 ? 'bg-primary/10 text-primary' : 'bg-surface-variant text-mocha-text'}`}>
                    {product.stock > 0 ? 'Active' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <a href={`/admin/products?q=${encodeURIComponent(product.name)}`} className="text-primary hover:underline text-sm font-medium">Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

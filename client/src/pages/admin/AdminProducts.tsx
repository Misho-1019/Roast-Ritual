import { useEffect, useState } from 'react'
import EditStockModal from '../../components/admin/EditStockModal'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  stock: number
  imageUrl: string
  roastLevel: string
}

type NotifType = { show: boolean; message: string }

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [notification, setNotification] = useState<NotifType>({ show: false, message: '' })

  useEffect(() => {
    fetch('/api/products?pageSize=50')
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []))
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  const handleStockSaved = (newStock: number) => {
    if (editingProduct) {
      setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? { ...p, stock: newStock } : p)))
    }
    setEditingProduct(null)
    setNotification({ show: true, message: 'Stock updated! Real-time update sent.' })
    setTimeout(() => setNotification({ show: false, message: '' }), 3000)
  }

  if (isLoading) {
    return (
      <div className="bg-espresso border border-outline-variant/30 rounded-lg p-12">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-surface-container-high rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-espresso border border-outline-variant/30 rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center">
        <h2 className="font-bold text-on-surface">All Products ({products.length})</h2>
      </div>

      {notification.show && (
        <div className="mx-6 mt-4 bg-primary/10 border border-primary/30 rounded-lg p-3 text-primary text-sm text-center">
          {notification.message}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low text-mocha-text text-xs uppercase tracking-widest">
            <tr>
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Stock</th>
              <th className="px-6 py-3 font-medium">Roast</th>
              <th className="px-6 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-surface-container/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-low overflow-hidden shrink-0">
                      {product.imageUrl ? (
                        <img className="w-full h-full object-cover" src={product.imageUrl} alt={product.name} />
                      ) : (
                        <span className="material-symbols-outlined text-lg text-primary/30 flex items-center justify-center h-full">local_cafe</span>
                      )}
                    </div>
                    <span className="font-bold text-on-surface text-sm">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-on-surface">${Number(product.price).toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`font-bold ${product.stock > 10 ? 'text-green-500' : product.stock > 0 ? 'text-yellow-500' : 'text-error'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 text-mocha-text">{product.roastLevel}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="text-primary hover:brightness-110 transition-all font-bold text-sm"
                  >
                    Edit Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingProduct && (
        <EditStockModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSaved={handleStockSaved}
        />
      )}
    </div>
  )
}

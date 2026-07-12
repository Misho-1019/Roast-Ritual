import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../../lib/api'

interface OrderItem {
  id: string
  quantity: number
  unitPrice: number
  product: { name: string; imageUrl: string }
}

interface Order {
  id: string
  status: string
  total: number
  discountAmount: number
  createdAt: string
  updatedAt: string
  items: OrderItem[]
}

const statusStyles: Record<string, string> = {
  PENDING: 'bg-yellow-500/10 text-yellow-400',
  PAID: 'bg-blue-500/10 text-blue-400',
  PROCESSING: 'bg-blue-500/10 text-blue-400',
  SHIPPED: 'bg-purple-500/10 text-purple-400',
  DELIVERED: 'bg-green-500/10 text-green-400',
  CANCELLED: 'bg-red-500/10 text-red-400',
}

export default function AdminOrderDetail() {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    api.get<Order>(`/orders/${id}`)
      .then(setOrder)
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [id])

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface-container-high rounded w-64" />
          <div className="h-6 bg-surface-container-high rounded w-48" />
          <div className="h-32 bg-surface-container-high rounded-lg" />
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-h2 text-on-surface mb-2">Order not found</h1>
        <Link to="/admin/orders" className="text-primary hover:underline font-bold">Back to Orders</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/admin/orders" className="text-mocha-text hover:text-primary transition-colors font-small text-sm mb-8 inline-block">
        &larr; Back to Orders
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-h1 text-on-surface">Order #{order.id.slice(0, 8)}</h1>
          <p className="text-mocha-text font-small">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
            })}
          </p>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${statusStyles[order.status] || 'bg-surface-variant text-mocha-text'}`}>
          {order.status}
        </span>
      </div>

      <div className="bg-espresso border border-outline-variant/30 rounded-lg p-6 space-y-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-3 border-b border-outline-variant/20 last:border-0">
            <div className="w-16 h-16 rounded-lg bg-surface-container-low overflow-hidden shrink-0">
              {item.product.imageUrl ? (
                <img className="w-full h-full object-cover" src={item.product.imageUrl} alt={item.product.name} />
              ) : (
                <span className="material-symbols-outlined text-2xl text-primary/30 flex items-center justify-center h-full">local_cafe</span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-on-surface">{item.product.name}</h3>
              <p className="text-mocha-text font-small text-sm">Qty: {item.quantity}</p>
            </div>
            <p className="text-on-surface font-bold">${(Number(item.unitPrice) * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-espresso border border-outline-variant/30 rounded-lg p-6">
        <div className="flex justify-between text-mocha-text mb-2">
          <span>Subtotal</span>
          <span>${Number(order.total).toFixed(2)}</span>
        </div>
        {Number(order.discountAmount) > 0 && (
          <div className="flex justify-between text-green-500 mb-2">
            <span>Discount</span>
            <span>-${Number(order.discountAmount).toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-mocha-text mb-2">
          <span>Shipping</span>
          <span>{Number(order.total) >= 30 ? 'Free' : '$5.99'}</span>
        </div>
        <div className="border-t border-outline-variant/30 pt-3 flex justify-between text-on-surface font-bold text-lg">
          <span>Total</span>
          <span className="text-primary text-h2">${Number(order.total).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

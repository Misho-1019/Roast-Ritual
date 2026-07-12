import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'

interface Order {
  id: string
  status: string
  total: number
  createdAt: string
  items: { id: string; quantity: number; unitPrice: number; product: { name: string; imageUrl: string } }[]
}

const statusStyles: Record<string, string> = {
  PENDING: 'bg-yellow-500/10 text-yellow-400',
  PAID: 'bg-blue-500/10 text-blue-400',
  PROCESSING: 'bg-blue-500/10 text-blue-400',
  SHIPPED: 'bg-purple-500/10 text-purple-400',
  DELIVERED: 'bg-green-500/10 text-green-400',
  CANCELLED: 'bg-red-500/10 text-red-400',
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api.get<{ data: Order[] }>('/orders')
      .then((res) => setOrders(res.data))
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-max-width mx-auto px-6 py-32">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-surface-container-high rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-max-width mx-auto px-6 py-32 text-center">
        <span className="material-symbols-outlined text-6xl text-primary/30 mb-4">receipt_long</span>
        <h1 className="text-h2 text-on-surface mb-2">No orders yet</h1>
        <p className="text-mocha-text mb-8">Your coffee journey starts here.</p>
        <Link to="/shop" className="bg-primary-container text-on-primary-container px-8 py-3 rounded-lg font-bold inline-block hover:brightness-110 transition-all">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-max-width mx-auto px-6 py-32 min-h-screen">
      <h1 className="text-h1 text-on-surface mb-2">Order History</h1>
      <p className="text-mocha-text mb-12">View the status of your coffee rituals.</p>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            className="block bg-espresso border border-outline-variant/30 rounded-lg p-6 hover:border-primary/50 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-bold text-on-surface">
                  Order #{order.id.slice(0, 8)}
                </p>
                <p className="text-mocha-text font-small text-sm">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusStyles[order.status] || 'bg-surface-variant text-mocha-text'}`}>
                {order.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {order.items.slice(0, 3).map((item) => (
                  <div key={item.id} className="w-10 h-10 rounded-md bg-surface-container-low overflow-hidden">
                    {item.product.imageUrl ? (
                      <img className="w-full h-full object-cover" src={item.product.imageUrl} alt={item.product.name} />
                    ) : (
                      <span className="material-symbols-outlined text-lg text-primary/30 flex items-center justify-center h-full">local_cafe</span>
                    )}
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className="w-10 h-10 rounded-md bg-surface-container-low flex items-center justify-center text-xs text-mocha-text">
                    +{order.items.length - 3}
                  </div>
                )}
              </div>
              <p className="text-primary font-bold text-h2">${Number(order.total).toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

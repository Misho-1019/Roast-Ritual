import { useEffect, useState } from 'react'
import { api } from '../../lib/api'

interface OrderItem {
  id: string
  customerName: string
  status: string
  total: number
  createdAt: string
}

const statusStyles: Record<string, string> = {
  PENDING: 'text-yellow-400 bg-yellow-500/10',
  PAID: 'text-blue-400 bg-blue-500/10',
  PROCESSING: 'text-blue-400 bg-blue-500/10',
  SHIPPED: 'text-purple-400 bg-purple-500/10',
  DELIVERED: 'text-green-400 bg-green-500/10',
  CANCELLED: 'text-red-400 bg-red-500/10',
}

export default function OrdersTable() {
  const [orders, setOrders] = useState<OrderItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api.get<{ data: OrderItem[] }>('/admin/orders')
      .then((res) => setOrders(res.data))
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="bg-espresso border border-outline-variant rounded-lg p-6 animate-pulse space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 bg-surface-container-high rounded" />
        ))}
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="bg-espresso border border-outline-variant rounded-lg p-12 text-center text-mocha-text">
        <span className="material-symbols-outlined text-4xl text-primary/30 mb-2">receipt_long</span>
        <p>No orders yet. Orders will appear here after customers complete checkout.</p>
      </div>
    )
  }

  return (
    <div className="bg-espresso border border-outline-variant rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-on-surface">Recent Orders</h2>
          <span className="bg-primary-container/20 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">LATEST RITUALS</span>
        </div>
        <a href="/admin/orders" className="text-primary text-xs font-medium hover:underline">View All</a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low text-mocha-text text-xs uppercase tracking-widest">
            <tr>
              <th className="px-6 py-3 font-medium">Order ID</th>
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {orders.slice(0, 8).map((order) => (
              <tr key={order.id} className="hover:bg-surface-container/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-primary">#{order.id.slice(0, 8)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-chestnut/30 flex items-center justify-center text-primary text-[10px] font-bold">
                      {order.customerName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-on-surface font-medium text-sm">{order.customerName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-mocha-text text-sm">
                  {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${statusStyles[order.status] || 'bg-surface-variant text-mocha-text'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-on-surface font-bold">${Number(order.total).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

import { useEffect, useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api } from '../../lib/api'

interface AdminOrder {
  id: string
  customerName: string
  customerEmail: string
  status: string
  total: number
  itemCount: number
  createdAt: string
}

const statusStyles: Record<string, string> = {
  PENDING: 'bg-yellow-500/10 text-yellow-400',
  PAID: 'bg-blue-500/10 text-blue-400',
  PROCESSING: 'bg-blue-500/10 text-blue-400',
  SHIPPED: 'bg-purple-500/10 text-purple-400',
  DELIVERED: 'bg-green-500/10 text-green-400',
  CANCELLED: 'bg-red-500/10 text-red-400',
}

export default function AdminOrders() {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('q')?.toLowerCase() || ''
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const filtered = useMemo(() => {
    if (!search) return orders
    const q = search
    return orders.filter((o) => o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || o.customerEmail.toLowerCase().includes(q))
  }, [orders, search])

  useEffect(() => {
    api.get<AdminOrder[]>('/admin/orders')
      .then(setOrders)
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

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

  if (orders.length === 0 && !search) {
    return (
      <div className="bg-espresso border border-outline-variant/30 rounded-lg p-12 text-center">
        <span className="material-symbols-outlined text-5xl text-primary/30 mb-4">receipt_long</span>
        <p className="text-mocha-text">No orders yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-espresso border border-outline-variant/30 rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-outline-variant">
        <h2 className="font-bold text-on-surface">All Orders ({filtered.length}{search ? ` filtered` : ''})</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low text-mocha-text text-xs uppercase tracking-widest">
            <tr>
              <th className="px-6 py-3 font-medium">Order ID</th>
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Items</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 text-right font-medium">Total</th>
              <th className="px-6 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filtered.map((order) => (
              <tr key={order.id} className="hover:bg-surface-container/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-primary">#{order.id.slice(0, 8)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-chestnut/30 flex items-center justify-center text-primary text-[10px] font-bold shrink-0">
                      {order.customerName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-on-surface text-sm">{order.customerName}</p>
                      <p className="text-mocha-text font-small text-xs">{order.customerEmail}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-mocha-text text-sm">
                  {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </td>
                <td className="px-6 py-4 text-on-surface">{order.itemCount}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${statusStyles[order.status] || 'bg-surface-variant text-mocha-text'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-primary font-bold">${Number(order.total).toFixed(2)}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/orders/${order.id}`} className="text-primary hover:underline text-sm font-bold">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

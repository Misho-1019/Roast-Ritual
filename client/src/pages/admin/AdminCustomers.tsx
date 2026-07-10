import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../../lib/api'

interface Customer {
  id: string
  name: string
  email: string
  orderCount: number
  totalSpent: number
  lastOrderDate: string | null
}

export default function AdminCustomers() {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('q')?.toLowerCase() || ''
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const filtered = useMemo(() => {
    if (!search) return customers
    return customers.filter((c) => c.name.toLowerCase().includes(search) || c.email.toLowerCase().includes(search))
  }, [customers, search])

  useEffect(() => {
    api.get<Customer[]>('/admin/customers')
      .then(setCustomers)
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="bg-espresso border border-outline-variant/30 rounded-lg p-12">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-surface-container-high rounded" />
          ))}
        </div>
      </div>
    )
  }

  if (customers.length === 0 && !search) {
    return (
      <div className="bg-espresso border border-outline-variant/30 rounded-lg p-12 text-center">
        <span className="material-symbols-outlined text-5xl text-primary/30 mb-4">group</span>
        <p className="text-mocha-text">No customers with orders yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-espresso border border-outline-variant/30 rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-outline-variant">
        <h2 className="font-bold text-on-surface">Customers ({filtered.length}{search ? ` filtered` : ''})</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low text-mocha-text text-xs uppercase tracking-widest">
            <tr>
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Orders</th>
              <th className="px-6 py-3 font-medium">Total Spent</th>
              <th className="px-6 py-3 font-medium">Last Order</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filtered.map((customer) => (
              <tr key={customer.id} className="hover:bg-surface-container/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-chestnut/30 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                      {customer.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-on-surface text-sm">{customer.name}</p>
                      <p className="text-mocha-text font-small text-xs">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-on-surface font-bold">{customer.orderCount}</span>
                </td>
                <td className="px-6 py-4 text-primary font-bold">${customer.totalSpent.toFixed(2)}</td>
                <td className="px-6 py-4 text-mocha-text text-sm">
                  {customer.lastOrderDate
                    ? new Date(customer.lastOrderDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

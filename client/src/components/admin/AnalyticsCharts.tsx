import { useEffect, useState } from 'react'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { api } from '../../lib/api'

interface Stats {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalCustomers: number
  ordersByStatus: { status: string; count: number }[]
  ordersByDate: { date: string; count: number; revenue: number }[]
  topProducts: { name: string; unitsSold: number }[]
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: '#EAB308',
  PAID: '#3B82F6',
  PROCESSING: '#3B82F6',
  SHIPPED: '#A855F7',
  DELIVERED: '#22C55E',
  CANCELLED: '#EF4444',
}

export default function AnalyticsCharts() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    api.get<Stats>('/admin/stats').then(setStats).catch(console.error)
  }, [])

  if (!stats) {
    return (
      <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-surface-container-high rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-h1 text-on-surface">Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders over time */}
        <div className="bg-espresso border border-outline-variant/30 rounded-lg p-6">
          <h3 className="font-bold text-on-surface mb-4">Orders (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats.ordersByDate}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4f4537" />
              <XAxis dataKey="date" tick={{ fill: '#B8A89A', fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
              <YAxis tick={{ fill: '#B8A89A', fontSize: 11 }} allowDecimals={false} />
              <Tooltip contentStyle={{ background: '#1C1512', border: '1px solid #4f4537', borderRadius: '8px', color: '#F5F0EB' }} />
              <Line type="monotone" dataKey="count" stroke="#D4A04A" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Orders by status */}
        <div className="bg-espresso border border-outline-variant/30 rounded-lg p-6">
          <h3 className="font-bold text-on-surface mb-4">Orders by Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stats.ordersByStatus}
                dataKey="count"
                nameKey="status"
                cx="50%" cy="50%" outerRadius={80}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {stats.ordersByStatus.map((entry) => (
                  <Cell key={entry.status} fill={STATUS_COLORS[entry.status] || '#4f4537'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top products */}
        <div className="bg-espresso border border-outline-variant/30 rounded-lg p-6 lg:col-span-2">
          <h3 className="font-bold text-on-surface mb-4">Top Selling Products</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#4f4537" />
              <XAxis type="number" tick={{ fill: '#B8A89A', fontSize: 11 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#B8A89A', fontSize: 11 }} width={160} />
              <Tooltip contentStyle={{ background: '#1C1512', border: '1px solid #4f4537', borderRadius: '8px', color: '#F5F0EB' }} />
              <Bar dataKey="unitsSold" fill="#D4A04A" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

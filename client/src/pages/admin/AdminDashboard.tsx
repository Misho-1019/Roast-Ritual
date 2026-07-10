import { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import StatCard from '../../components/admin/StatCard'
import ProductsTable from '../../components/admin/ProductsTable'
import RoastingSchedule from '../../components/admin/RoastingSchedule'
import OrdersTable from '../../components/admin/OrdersTable'

interface Stats {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalCustomers: number
  ordersByStatus: { status: string; count: number }[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    api.get<Stats>('/admin/stats').then(setStats).catch(console.error)
  }, [])

  const activeOrders = stats
    ? stats.ordersByStatus
        .filter((s) => ['PENDING', 'PROCESSING', 'PAID'].includes(s.status))
        .reduce((sum, s) => sum + s.count, 0)
    : 0

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon="local_cafe"
          label="Total Revenue"
          value={stats ? `$${Number(stats.totalRevenue).toLocaleString()}` : '...'}
          trend="All time"
        />
        <StatCard
          icon="coffee_maker"
          label="Active Orders"
          value={stats ? String(activeOrders) : '...'}
          trend={stats ? `${stats.totalOrders} total` : ''}
        />
        <StatCard
          icon="vibration"
          label="Total Products"
          value={stats ? String(stats.totalProducts) : '...'}
          trend="In catalog"
        />
        <StatCard
          icon="air"
          label="Customers"
          value={stats ? String(stats.totalCustomers) : '...'}
          trend="Registered users"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProductsTable />
        <RoastingSchedule />
      </div>

      <OrdersTable />
    </>
  )
}

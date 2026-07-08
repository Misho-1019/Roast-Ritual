import StatCard from '../../components/admin/StatCard'
import ProductsTable from '../../components/admin/ProductsTable'
import RoastingSchedule from '../../components/admin/RoastingSchedule'
import OrdersTable from '../../components/admin/OrdersTable'

export default function AdminDashboard() {
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon="local_cafe" label="Total Revenue" value="$12,450" trend="+12.5%" trendColor="text-green-500" />
        <StatCard icon="coffee_maker" label="Active Orders" value="23" trend="8 Pending" />
        <StatCard icon="vibration" label="Total Products" value="156" trend="4 Roast Levels" />
        <StatCard icon="air" label="New Customers" value="89" trend="+24%" trendColor="text-green-500" />
      </div>

      {/* Products + Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProductsTable />
        <RoastingSchedule />
      </div>

      {/* Orders */}
      <OrdersTable />
    </>
  )
}

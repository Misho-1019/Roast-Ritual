const orders = [
  { id: '#RR-9021', customer: 'Julian Weaver', initials: 'JW', date: 'Oct 12, 2023', status: 'Processing' as const, total: 124.50, statusColor: 'text-blue-400 bg-blue-500/10' },
  { id: '#RR-9020', customer: 'Elena Hayes', initials: 'EH', date: 'Oct 11, 2023', status: 'Delivered' as const, total: 84.20, statusColor: 'text-green-400 bg-green-500/10' },
  { id: '#RR-9019', customer: 'Marcus Thorne', initials: 'MT', date: 'Oct 11, 2023', status: 'Pending' as const, total: 345.00, statusColor: 'text-yellow-400 bg-yellow-500/10' },
  { id: '#RR-9018', customer: 'Sarah Chen', initials: 'SC', date: 'Oct 10, 2023', status: 'Shipped' as const, total: 67.50, statusColor: 'text-blue-400 bg-blue-500/10' },
  { id: '#RR-9017', customer: 'James Whitfield', initials: 'JW', date: 'Oct 9, 2023', status: 'Delivered' as const, total: 198.00, statusColor: 'text-green-400 bg-green-500/10' },
]

const statusStyles: Record<string, string> = {
  Processing: 'text-blue-400 bg-blue-500/10',
  Delivered: 'text-green-400 bg-green-500/10',
  Pending: 'text-yellow-400 bg-yellow-500/10',
  Shipped: 'text-blue-400 bg-blue-500/10',
  Cancelled: 'text-red-400 bg-red-500/10',
}

export default function OrdersTable() {
  return (
    <div className="bg-espresso border border-outline-variant rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-on-surface">Recent Orders</h2>
          <span className="bg-primary-container/20 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">LATEST RITUALS</span>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-outline-variant rounded-lg text-xs hover:bg-surface-container transition-colors text-mocha-text">Export CSV</button>
        </div>
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
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-surface-container/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-primary">{order.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-chestnut/30 flex items-center justify-center text-primary text-[10px] font-bold">
                      {order.initials}
                    </div>
                    <span className="text-on-surface font-medium text-sm">{order.customer}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-mocha-text text-sm">{order.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${statusStyles[order.status] || 'text-mocha-text bg-surface-variant'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-on-surface font-bold">${order.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

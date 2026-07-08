interface StatCardProps {
  icon: string
  label: string
  value: string
  trend?: string
  trendColor?: string
}

export default function StatCard({ icon, label, value, trend, trendColor = 'text-mocha-text' }: StatCardProps) {
  return (
    <div className="bg-espresso border border-chestnut rounded-lg p-6 flex flex-col justify-between group hover:border-primary transition-colors duration-500">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-surface-container rounded-lg text-primary">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {trend && <span className={`${trendColor} font-small text-xs font-medium`}>{trend}</span>}
      </div>
      <div>
        <p className="text-mocha-text font-small font-medium mb-1 text-xs">{label}</p>
        <h3 className="text-h2 text-primary font-bold tracking-tight">{value}</h3>
      </div>
    </div>
  )
}

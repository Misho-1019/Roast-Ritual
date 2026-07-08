export default function RoastingSchedule() {
  return (
    <div className="bg-espresso border border-outline-variant rounded-lg p-6 flex flex-col">
      <h2 className="font-bold text-on-surface mb-6">Roasting Schedule</h2>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
          <div>
            <p className="font-bold text-on-surface text-sm">Batch #802 - Sumatra</p>
            <p className="text-mocha-text font-small text-xs">Completion: 14:00 today</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-2 h-2 rounded-full bg-chestnut mt-2 shrink-0"></div>
          <div>
            <p className="font-bold text-on-surface text-sm">Inventory Audit</p>
            <p className="text-mocha-text font-small text-xs">Scheduled for Monday morning</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
          <div>
            <p className="font-bold text-on-surface text-sm">Wholesale Pickup</p>
            <p className="text-mocha-text font-small text-xs">350kg order for &apos;The Oak Room&apos;</p>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-6">
        <div className="bg-surface-container rounded-xl p-4 border border-outline-variant">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium text-mocha-text text-xs">Roaster Capacity</p>
            <p className="font-bold text-primary text-xs">82%</p>
          </div>
          <div className="w-full bg-background h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[82%] rounded-full shadow-[0_0_10px_rgba(245,189,100,0.4)]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

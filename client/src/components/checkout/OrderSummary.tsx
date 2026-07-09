export default function OrderSummary() {
  return (
    <div className="bg-espresso rounded-xl border border-chestnut/30 p-8 lg:p-10">
      <h2 className="font-h2 text-h2 text-on-surface mb-8">Order Summary</h2>
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-container-low shrink-0">
            <span className="material-symbols-outlined text-4xl text-primary/30 flex items-center justify-center h-full">local_cafe</span>
          </div>
          <div className="flex-1">
            <h4 className="font-body-bold text-on-surface">Ethiopian Yirgacheffe</h4>
            <p className="font-small text-mocha-text text-sm">Qty: 2</p>
            <p className="text-primary font-bold mt-1">$48.00</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-container-low shrink-0">
            <span className="material-symbols-outlined text-4xl text-primary/30 flex items-center justify-center h-full">local_cafe</span>
          </div>
          <div className="flex-1">
            <h4 className="font-body-bold text-on-surface">Colombian Supremo</h4>
            <p className="font-small text-mocha-text text-sm">Qty: 1</p>
            <p className="text-primary font-bold mt-1">$22.50</p>
          </div>
        </div>
      </div>
      <div className="border-t border-outline-variant/30 mt-8 pt-6 space-y-3">
        <div className="flex justify-between text-mocha-text">
          <span>Subtotal</span>
          <span>$70.50</span>
        </div>
        <div className="flex justify-between text-mocha-text">
          <span>Shipping</span>
          <span className="text-green-500">Free</span>
        </div>
        <div className="flex justify-between text-on-surface font-bold text-lg border-t border-outline-variant/30 pt-3">
          <span>Total</span>
          <span className="text-primary text-h2">$70.50</span>
        </div>
      </div>
    </div>
  )
}

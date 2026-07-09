import { useCartStore } from '../../stores/cartStore'

export default function OrderSummary() {
  const { items, subtotal, total, discount } = useCartStore()
  const shipping = subtotal() >= 30 ? 0 : 5.99

  return (
    <div className="bg-espresso rounded-xl border border-chestnut/30 p-8 lg:p-10">
      <h2 className="text-h2 text-on-surface mb-8">Order Summary</h2>
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-container-low shrink-0">
              {item.product.imageUrl ? (
                <img className="w-full h-full object-cover" src={item.product.imageUrl} alt={item.product.name} />
              ) : (
                <span className="material-symbols-outlined text-4xl text-primary/30 flex items-center justify-center h-full">local_cafe</span>
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-on-surface text-sm">{item.product.name}</h4>
              <p className="text-mocha-text font-small text-sm">Qty: {item.quantity}</p>
              <p className="text-primary font-bold mt-1">${(Number(item.product.price) * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-outline-variant/30 mt-8 pt-6 space-y-3">
        <div className="flex justify-between text-mocha-text">
          <span>Subtotal</span>
          <span>${subtotal().toFixed(2)}</span>
        </div>
        {discount() > 0 && (
          <div className="flex justify-between text-green-500">
            <span>Discount</span>
            <span>-${discount().toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-mocha-text">
          <span>Shipping</span>
          <span className={shipping === 0 ? 'text-green-500' : ''}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-on-surface font-bold text-lg border-t border-outline-variant/30 pt-3">
          <span>Total</span>
          <span className="text-primary text-h2">${total().toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

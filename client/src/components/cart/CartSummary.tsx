import { Link } from 'react-router-dom'

interface CartSummaryProps {
  subtotal: number
  discount: number
  total: number
}

export default function CartSummary({ subtotal, discount, total }: CartSummaryProps) {
  return (
    <div className="bg-espresso border border-chestnut/30 rounded-lg p-6 space-y-4">
      <h3 className="text-on-surface font-bold text-lg">Order Summary</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-mocha-text">
          <span>Subtotal</span>
          <span>${Number(subtotal).toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-500">
            <span>Discount</span>
            <span>-${Number(discount).toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-mocha-text">
          <span>Shipping</span>
          <span>${subtotal >= 30 ? '0.00' : '5.99'}</span>
        </div>
        <div className="border-t border-chestnut/30 pt-3 flex justify-between text-on-surface font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">${Number(total).toFixed(2)}</span>
        </div>
      </div>
      <Link
        to="/checkout"
        className="block w-full bg-primary text-on-primary py-3.5 rounded-lg font-bold text-center hover:brightness-110 active:scale-[0.98] transition-all"
      >
        Proceed to Checkout
      </Link>
      <Link to="/shop" className="block text-center text-mocha-text hover:text-primary text-sm transition-colors">
        Continue Shopping &rarr;
      </Link>
    </div>
  )
}

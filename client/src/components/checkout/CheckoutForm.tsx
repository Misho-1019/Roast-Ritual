export default function CheckoutForm() {
  return (
    <div className="space-y-8">
      {/* Shipping Section */}
      <section>
        <h2 className="font-h2 text-h2 text-on-surface mb-6">Shipping Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="font-small text-mocha-text block mb-2">Full Name</label>
            <input className="w-full bg-background border border-chestnut/50 rounded-lg px-4 py-3 text-on-surface placeholder:text-mocha-text/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="John Doe" type="text" />
          </div>
          <div>
            <label className="font-small text-mocha-text block mb-2">Email</label>
            <input className="w-full bg-background border border-chestnut/50 rounded-lg px-4 py-3 text-on-surface placeholder:text-mocha-text/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="john@example.com" type="email" />
          </div>
          <div>
            <label className="font-small text-mocha-text block mb-2">Phone</label>
            <input className="w-full bg-background border border-chestnut/50 rounded-lg px-4 py-3 text-on-surface placeholder:text-mocha-text/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="+1 (555) 000-0000" type="tel" />
          </div>
          <div className="md:col-span-2">
            <label className="font-small text-mocha-text block mb-2">Address</label>
            <input className="w-full bg-background border border-chestnut/50 rounded-lg px-4 py-3 text-on-surface placeholder:text-mocha-text/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="123 Coffee Street" type="text" />
          </div>
          <div>
            <label className="font-small text-mocha-text block mb-2">City</label>
            <input className="w-full bg-background border border-chestnut/50 rounded-lg px-4 py-3 text-on-surface placeholder:text-mocha-text/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Portland" type="text" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="font-small text-mocha-text block mb-2">State</label>
              <input className="w-full bg-background border border-chestnut/50 rounded-lg px-4 py-3 text-on-surface placeholder:text-mocha-text/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="OR" type="text" />
            </div>
            <div className="flex-1">
              <label className="font-small text-mocha-text block mb-2">ZIP</label>
              <input className="w-full bg-background border border-chestnut/50 rounded-lg px-4 py-3 text-on-surface placeholder:text-mocha-text/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="97201" type="text" />
            </div>
          </div>
          <div>
            <label className="font-small text-mocha-text block mb-2">Country</label>
            <select className="w-full bg-background border border-chestnut/50 rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none">
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
              <option>Australia</option>
            </select>
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section>
        <h2 className="font-h2 text-h2 text-on-surface mb-2">Payment</h2>
        <p className="text-mocha-text font-small mb-6 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">lock</span>
          Secure payment via Stripe
        </p>
        <div className="space-y-4">
          <div>
            <label className="font-small text-mocha-text block mb-2">Card Number</label>
            <input className="w-full bg-background border border-chestnut/50 rounded-lg px-4 py-3 text-on-surface placeholder:text-mocha-text/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="4242 4242 4242 4242" type="text" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-small text-mocha-text block mb-2">Expiry</label>
              <input className="w-full bg-background border border-chestnut/50 rounded-lg px-4 py-3 text-on-surface placeholder:text-mocha-text/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="MM/YY" type="text" />
            </div>
            <div>
              <label className="font-small text-mocha-text block mb-2">CVC</label>
              <input className="w-full bg-background border border-chestnut/50 rounded-lg px-4 py-3 text-on-surface placeholder:text-mocha-text/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="123" type="text" />
            </div>
          </div>
          <button className="w-full bg-primary-container text-on-primary-container py-4 rounded-lg font-bold text-body hover:brightness-110 active:scale-[0.98] transition-all mt-4">
            Place Order — $70.50
          </button>
        </div>
      </section>
    </div>
  )
}

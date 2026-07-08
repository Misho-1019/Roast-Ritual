import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant pt-20 pb-10">
      <div className="max-w-max-width mx-auto px-container-padding grid grid-cols-1 md:grid-cols-4 gap-gutter mb-20">
        <div className="col-span-1 md:col-span-1">
          <h2 className="font-display text-h2 font-bold text-primary mb-6">Roast & Ritual</h2>
          <p className="text-on-surface-variant font-body mb-6 leading-relaxed">
            Artisanal coffee curators dedicated to the elevation of your daily coffee experience
            through specialty-grade sourcing and precision roasting.
          </p>
          <div className="flex gap-4">
            <a className="h-10 w-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all" href="#">
              <span className="material-symbols-outlined text-xl">public</span>
            </a>
            <a className="h-10 w-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all" href="#">
              <span className="material-symbols-outlined text-xl">photo_camera</span>
            </a>
            <a className="h-10 w-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all" href="#">
              <span className="material-symbols-outlined text-xl">play_circle</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-on-surface mb-2 uppercase tracking-widest text-[12px]">Shop</h4>
          <Link to="/shop" className="text-on-surface-variant hover:text-primary underline transition-all font-body">All Coffees</Link>
          <a className="text-on-surface-variant hover:text-primary underline transition-all font-body" href="#">Brewing Gear</a>
          <a className="text-on-surface-variant hover:text-primary underline transition-all font-body" href="#">Subscriptions</a>
          <a className="text-on-surface-variant hover:text-primary underline transition-all font-body" href="#">Gift Cards</a>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-on-surface mb-2 uppercase tracking-widest text-[12px]">Learn</h4>
          <Link to="/brew-guides" className="text-on-surface-variant hover:text-primary underline transition-all font-body">Brewing Guides</Link>
          <a className="text-on-surface-variant hover:text-primary underline transition-all font-body" href="#">Coffee Origins</a>
          <a className="text-on-surface-variant hover:text-primary underline transition-all font-body" href="#">Roast Levels</a>
          <a className="text-on-surface-variant hover:text-primary underline transition-all font-body" href="#">Wholesale</a>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-on-surface mb-2 uppercase tracking-widest text-[12px]">Support</h4>
          <a className="text-on-surface-variant hover:text-primary underline transition-all font-body" href="#">Contact Us</a>
          <a className="text-on-surface-variant hover:text-primary underline transition-all font-body" href="#">Shipping & Returns</a>
          <a className="text-on-surface-variant hover:text-primary underline transition-all font-body" href="#">Privacy Policy</a>
          <a className="text-on-surface-variant hover:text-primary underline transition-all font-body" href="#">Terms of Service</a>
        </div>
      </div>
      <div className="max-w-max-width mx-auto px-container-padding border-t border-outline-variant pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-on-surface-variant font-small opacity-60">
          &copy; 2026 Roast & Ritual. Artisanal Coffee Curators. All Rights Reserved.
        </p>
        <div className="flex gap-8 font-small opacity-60">
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            Secure Checkout
          </span>
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
            Global Shipping
          </span>
        </div>
      </div>
    </footer>
  )
}

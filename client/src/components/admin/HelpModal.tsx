interface HelpModalProps {
  onClose: () => void
}

export default function HelpModal({ onClose }: HelpModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="bg-espresso border border-chestnut/30 rounded-xl p-8 w-full max-w-lg mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-h2 text-on-surface">Help & Resources</h2>
          <button onClick={onClose} className="text-mocha-text hover:text-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-5">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary">edit_square</span>
            </div>
            <div>
              <h4 className="font-bold text-on-surface text-sm">Managing Stock</h4>
              <p className="text-mocha-text font-small text-xs mt-1">
                Go to <strong>Products</strong> in the sidebar, click <strong>Edit Stock</strong> on any product,
                set the new quantity, and save. The update is sent in real-time to all connected clients.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary">analytics</span>
            </div>
            <div>
              <h4 className="font-bold text-on-surface text-sm">Viewing Analytics</h4>
              <p className="text-mocha-text font-small text-xs mt-1">
                Visit the <strong>Analytics</strong> page to see order trends, status breakdowns, and top-selling products.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary">local_offer</span>
            </div>
            <div>
              <h4 className="font-bold text-on-surface text-sm">Creating Coupons</h4>
              <p className="text-mocha-text font-small text-xs mt-1">
                Go to <strong>Settings</strong> to create, activate, and manage discount coupons for your customers.
              </p>
            </div>
          </div>

          <div className="border-t border-outline-variant/30 pt-5">
            <h4 className="font-bold text-on-surface text-sm mb-3">Contact Support</h4>
            <a href="mailto:hello@roastandritual.com" className="text-primary hover:underline text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">mail</span>
              hello@roastandritual.com
            </a>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-outline-variant/30">
          <button
            onClick={onClose}
            className="w-full bg-primary-container text-on-primary-container py-3 rounded-lg font-bold hover:brightness-110 active:scale-[0.98] transition-all text-sm"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}

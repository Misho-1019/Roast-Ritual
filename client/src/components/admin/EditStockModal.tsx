import { useState } from 'react'
import { api } from '../../lib/api'

interface EditStockModalProps {
  product: { id: string; name: string; imageUrl: string; stock: number }
  onClose: () => void
  onSaved: (newStock: number) => void
}

export default function EditStockModal({ product, onClose, onSaved }: EditStockModalProps) {
  const [stock, setStock] = useState(product.stock)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.put(`/products/${product.id}`, { stock })
      onSaved(stock)
    } catch {
      // error handling
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="bg-espresso border border-chestnut/30 rounded-xl p-8 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-lg bg-surface-container-low overflow-hidden shrink-0">
            {product.imageUrl ? (
              <img className="w-full h-full object-cover" src={product.imageUrl} alt={product.name} />
            ) : (
              <span className="material-symbols-outlined text-2xl text-primary/30 flex items-center justify-center h-full">local_cafe</span>
            )}
          </div>
          <div>
            <h3 className="font-bold text-on-surface">{product.name}</h3>
            <p className="text-mocha-text font-small text-sm">Current stock: {product.stock}</p>
          </div>
        </div>

        <label className="font-small text-mocha-text block mb-2 text-sm">New Stock Quantity</label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStock(Math.max(0, stock - 1))}
            className="w-10 h-10 rounded-lg border border-chestnut/50 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">remove</span>
          </button>
          <input
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(Math.max(0, parseInt(e.target.value) || 0))}
            className="flex-1 bg-background border border-chestnut/50 rounded-lg px-4 py-2.5 text-on-surface text-center text-h2 font-bold focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
          <button
            onClick={() => setStock(stock + 1)}
            className="w-10 h-10 rounded-lg border border-chestnut/50 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>

        <div className="flex gap-3 mt-8">
          <button onClick={onClose} className="flex-1 py-3 rounded-lg border border-chestnut/50 text-on-surface font-bold hover:bg-surface-container transition-all text-sm">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || stock === product.stock}
            className="flex-1 bg-primary-container text-on-primary-container py-3 rounded-lg font-bold hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 text-sm"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

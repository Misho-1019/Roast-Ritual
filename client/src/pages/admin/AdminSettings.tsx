import { useEffect, useState } from 'react'
import { api } from '../../lib/api'

interface Coupon {
  id: string
  code: string
  type: string
  value: number
  minOrder: number | null
  maxUses: number | null
  usedCount: number
  expiresAt: string | null
  isActive: boolean
}

interface CouponForm {
  code: string
  type: string
  value: string
  minOrder: string
  maxUses: string
  expiresAt: string
}

const emptyForm: CouponForm = { code: '', type: 'PERCENTAGE', value: '', minOrder: '', maxUses: '', expiresAt: '' }

export default function AdminSettings() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [notif, setNotif] = useState('')

  const fetchCoupons = () => {
    api.get<Coupon[]>('/admin/coupons')
      .then(setCoupons)
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }

  useEffect(() => { fetchCoupons() }, [])

  const generateCode = () => {
    const prefix = 'RITUAL'
    const suffix = Math.random().toString(36).substring(2, 6).toUpperCase()
    setForm((f) => ({ ...f, code: `${prefix}${suffix}` }))
  }

  const handleCreate = async () => {
    setSaving(true)
    try {
      const payload = {
        code: form.code,
        type: form.type,
        value: form.value ? parseFloat(form.value) : 0,
        minOrder: form.minOrder ? parseFloat(form.minOrder) : null,
        maxUses: form.maxUses ? parseInt(form.maxUses) : null,
        expiresAt: form.expiresAt || null,
      }
      await api.post('/admin/coupons', payload)
      setShowForm(false)
      setForm(emptyForm)
      setNotif('Coupon created!')
      setTimeout(() => setNotif(''), 3000)
      fetchCoupons()
    } catch (err: unknown) {
      setNotif(err instanceof Error ? err.message : 'Failed to create coupon')
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async (id: string) => {
    await api.put(`/admin/coupons/${id}`)
    fetchCoupons()
  }

  const handleDelete = async (id: string) => {
    await api.delete(`/admin/coupons/${id}`)
    fetchCoupons()
  }

  return (
    <div className="space-y-8">
      {/* Brand Info */}
      <div className="bg-espresso border border-outline-variant/30 rounded-lg p-8">
        <h2 className="text-h2 text-primary mb-2">Roast & Ritual</h2>
        <p className="text-mocha-text">Turn your coffee into a ritual. v1.0.0</p>
      </div>

      {/* Coupons */}
      <div className="bg-espresso border border-outline-variant/30 rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center">
          <h2 className="font-bold text-on-surface">Coupons ({coupons.length})</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-bold text-sm hover:brightness-110 transition-all"
          >
            {showForm ? 'Cancel' : 'Create Coupon'}
          </button>
        </div>

        {notif && (
          <div className="mx-6 mt-4 bg-primary/10 border border-primary/30 rounded-lg p-3 text-primary text-sm text-center">
            {notif}
          </div>
        )}

        {/* Create form */}
        {showForm && (
          <div className="border-b border-outline-variant p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-small text-mocha-text block mb-1 text-xs">Coupon Code</label>
                <div className="flex gap-2">
                  <input className="flex-1 bg-background border border-outline-variant rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none transition-all text-sm" value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))} placeholder="RITUAL10" />
                  <button onClick={generateCode} className="text-primary hover:underline text-xs font-bold">Generate</button>
                </div>
              </div>
              <div>
                <label className="font-small text-mocha-text block mb-1 text-xs">Type</label>
                <select className="w-full bg-background border border-outline-variant rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none transition-all text-sm" value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
                  <option value="PERCENTAGE">Percentage (%)</option>
                  <option value="FLAT">Flat ($)</option>
                </select>
              </div>
              <div>
                <label className="font-small text-mocha-text block mb-1 text-xs">Value</label>
                <input className="w-full bg-background border border-outline-variant rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none transition-all text-sm" type="number" value={form.value} onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))} placeholder="10" />
              </div>
              <div>
                <label className="font-small text-mocha-text block mb-1 text-xs">Min Order ($)</label>
                <input className="w-full bg-background border border-outline-variant rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none transition-all text-sm" type="number" value={form.minOrder} onChange={(e) => setForm((f) => ({ ...f, minOrder: e.target.value }))} placeholder="0" />
              </div>
              <div>
                <label className="font-small text-mocha-text block mb-1 text-xs">Max Uses</label>
                <input className="w-full bg-background border border-outline-variant rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none transition-all text-sm" type="number" value={form.maxUses} onChange={(e) => setForm((f) => ({ ...f, maxUses: e.target.value }))} placeholder="Unlimited" />
              </div>
              <div>
                <label className="font-small text-mocha-text block mb-1 text-xs">Expires</label>
                <input className="w-full bg-background border border-outline-variant rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none transition-all text-sm" type="date" value={form.expiresAt} onChange={(e) => setForm((f) => ({ ...f, expiresAt: e.target.value }))} />
              </div>
            </div>
            <button onClick={handleCreate} disabled={saving} className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-lg font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50">
              {saving ? 'Creating...' : 'Create Coupon'}
            </button>
          </div>
        )}

        {/* Coupon table */}
        {isLoading ? (
          <div className="p-6 animate-pulse space-y-3">
            {[1, 2].map((i) => <div key={i} className="h-10 bg-surface-container-high rounded" />)}
          </div>
        ) : coupons.length === 0 && !showForm ? (
          <div className="p-12 text-center text-mocha-text">No coupons yet. Create one above.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low text-mocha-text text-xs uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-3 font-medium">Code</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium">Value</th>
                  <th className="px-6 py-3 font-medium">Min</th>
                  <th className="px-6 py-3 font-medium">Uses</th>
                  <th className="px-6 py-3 font-medium">Expires</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-surface-container/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-on-surface text-sm">{c.code}</td>
                    <td className="px-6 py-4 text-mocha-text text-sm">{c.type === 'PERCENTAGE' ? '%' : '$'}</td>
                    <td className="px-6 py-4 text-on-surface">{c.type === 'PERCENTAGE' ? `${c.value}%` : `$${c.value}`}</td>
                    <td className="px-6 py-4 text-mocha-text">{c.minOrder ? `$${c.minOrder}` : '—'}</td>
                    <td className="px-6 py-4 text-on-surface">{c.usedCount}{c.maxUses ? ` / ${c.maxUses}` : ''}</td>
                    <td className="px-6 py-4 text-mocha-text text-sm">{c.expiresAt ? new Date(c.expiresAt).toLocaleDateString() : '—'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${c.isActive ? 'bg-green-500/10 text-green-400' : 'bg-surface-variant text-mocha-text'}`}>
                        {c.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleToggle(c.id)} className="text-mocha-text hover:text-primary transition-colors text-xs font-bold">
                          {c.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button onClick={() => handleDelete(c.id)} className="text-error hover:brightness-110 transition-colors text-xs font-bold">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

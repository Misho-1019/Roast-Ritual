import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../lib/api'

interface Customer {
  id: string
  name: string
  email: string
}

interface Product {
  id: string
  name: string
  price: number
  stock: number
}

interface OrderItem {
  productId: string
  productName: string
  price: number
  quantity: number
}

export default function AdminCreateOrder() {
  const navigate = useNavigate()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notif, setNotif] = useState('')

  const [shipping, setShipping] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: 'United States' })

  useEffect(() => {
    api.get<Customer[]>('/admin/customers').then(setCustomers).catch(console.error)
    api.get<{ data: any[] }>('/products?pageSize=50').then((d) => setProducts(d.data || [])).catch(console.error)
  }, [])

  const addProduct = () => {
    if (!selectedProduct) return
    const product = products.find((p) => p.id === selectedProduct)
    if (!product) return
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id)
      if (existing) return prev.map((i) => i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { productId: product.id, productName: product.name, price: Number(product.price), quantity: 1 }]
    })
    setSelectedProduct('')
  }

  const updateQuantity = (productId: string, qty: number) => {
    if (qty < 1) {
      setOrderItems((prev) => prev.filter((i) => i.productId !== productId))
      return
    }
    setOrderItems((prev) => prev.map((i) => i.productId === productId ? { ...i, quantity: qty } : i))
  }

  const total = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const handleSubmit = async () => {
    if (!selectedCustomer || orderItems.length === 0) {
      setError('Select a customer and add at least one product')
      return
    }
    setSaving(true)
    setError('')
    try {
      await api.post('/admin/create-order', {
        customerId: selectedCustomer,
        items: orderItems.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        shippingAddress: shipping,
      })
      setNotif('Order created successfully!')
      setTimeout(() => navigate('/admin/orders'), 1500)
    } catch (err: any) {
      setError(err.message || 'Failed to create order')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = 'w-full bg-background border border-outline-variant rounded-lg px-3 py-2.5 text-on-surface placeholder:text-mocha-text/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm'

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-h1 text-on-surface">Create Order</h1>

      {notif && <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-green-500 text-sm text-center">{notif}</div>}
      {error && <div className="bg-error/10 border border-error/30 rounded-lg p-3 text-error text-sm">{error}</div>}

      {/* Customer */}
      <section className="bg-espresso border border-outline-variant/30 rounded-lg p-6">
        <h2 className="font-bold text-on-surface mb-4">Customer</h2>
        <select className={inputClass} value={selectedCustomer} onChange={(e) => {
          setSelectedCustomer(e.target.value)
          const c = customers.find((c) => c.id === e.target.value)
          if (c) setShipping((s) => ({ ...s, name: c.name, email: c.email }))
        }}>
          <option value="">Select a customer...</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
          ))}
        </select>
      </section>

      {/* Products */}
      <section className="bg-espresso border border-outline-variant/30 rounded-lg p-6">
        <h2 className="font-bold text-on-surface mb-4">Products</h2>
        <div className="flex gap-2 mb-4">
          <select className={inputClass} value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
            <option value="">Add a product...</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name} — ${Number(p.price).toFixed(2)} ({p.stock} in stock)</option>
            ))}
          </select>
          <button onClick={addProduct} className="bg-primary-container text-on-primary-container px-4 py-2.5 rounded-lg font-bold text-sm hover:brightness-110 transition-all shrink-0">Add</button>
        </div>
        {orderItems.length === 0 ? (
          <p className="text-mocha-text text-sm">No products added yet.</p>
        ) : (
          <div className="space-y-2">
            {orderItems.map((item) => (
              <div key={item.productId} className="flex items-center gap-4 bg-surface-container-low rounded-lg px-4 py-3">
                <div className="flex-1">
                  <p className="font-bold text-on-surface text-sm">{item.productName}</p>
                  <p className="text-mocha-text text-xs">${item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-7 h-7 rounded border border-chestnut/50 flex items-center justify-center text-on-surface hover:text-primary text-sm">-</button>
                  <span className="w-8 text-center font-bold text-on-surface text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-7 h-7 rounded border border-chestnut/50 flex items-center justify-center text-on-surface hover:text-primary text-sm">+</button>
                </div>
                <p className="text-primary font-bold w-20 text-right text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => setOrderItems((prev) => prev.filter((i) => i.productId !== item.productId))} className="text-mocha-text hover:text-error transition-colors">
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Shipping */}
      <section className="bg-espresso border border-outline-variant/30 rounded-lg p-6">
        <h2 className="font-bold text-on-surface mb-4">Shipping</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input className={inputClass} placeholder="Full Name" value={shipping.name} onChange={(e) => setShipping((s) => ({ ...s, name: e.target.value }))} />
          <input className={inputClass} placeholder="Email" value={shipping.email} onChange={(e) => setShipping((s) => ({ ...s, email: e.target.value }))} />
          <input className={inputClass} placeholder="Phone" value={shipping.phone} onChange={(e) => setShipping((s) => ({ ...s, phone: e.target.value }))} />
          <input className="md:col-span-2" placeholder="Address" value={shipping.address} onChange={(e) => setShipping((s) => ({ ...s, address: e.target.value }))} />
          <input className={inputClass} placeholder="City" value={shipping.city} onChange={(e) => setShipping((s) => ({ ...s, city: e.target.value }))} />
          <div className="flex gap-3">
            <input className={inputClass} placeholder="State" value={shipping.state} onChange={(e) => setShipping((s) => ({ ...s, state: e.target.value }))} />
            <input className={inputClass} placeholder="ZIP" value={shipping.zip} onChange={(e) => setShipping((s) => ({ ...s, zip: e.target.value }))} />
          </div>
        </div>
      </section>

      {/* Summary */}
      <div className="bg-espresso border border-outline-variant/30 rounded-lg p-6 flex items-center justify-between">
        <div>
          <p className="text-mocha-text text-sm">{orderItems.length} product{orderItems.length !== 1 ? 's' : ''}</p>
          <p className="text-primary font-bold text-h2">${total.toFixed(2)}</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving || orderItems.length === 0}
          className="bg-primary-container text-on-primary-container px-10 py-3.5 rounded-lg font-bold hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {saving ? 'Creating...' : 'Place Order'}
        </button>
      </div>
    </div>
  )
}

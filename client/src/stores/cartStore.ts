import { create } from 'zustand'
import { api } from '../lib/api'

interface CartItem {
  id: string
  productId: string
  quantity: number
  product: {
    id: string
    name: string
    price: number
    imageUrl: string
    stock: number
  }
}

interface CouponInfo {
  id: string
  code: string
  type: string
  value: number
  discountAmount: number
}

interface CartResponse {
  items: CartItem[]
}

interface CartState {
  items: CartItem[]
  isLoading: boolean
  coupon: CouponInfo | null
  fetchCart: () => Promise<void>
  addItem: (productId: string, quantity?: number) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  applyCoupon: (code: string) => Promise<void>
  clearCoupon: () => void
  clearCart: () => void
  subtotal: () => number
  discount: () => number
  total: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isLoading: false,
  coupon: null,

  fetchCart: async () => {
    set({ isLoading: true })
    try {
      const data = await api.get<CartResponse>('/cart')
      set({ items: data.items || [], isLoading: false })
    } catch {
      set({ isLoading: false })
    }
  },

  addItem: async (productId, quantity = 1) => {
    const data = await api.post<CartResponse>('/cart/items', { productId, quantity })
    set({ items: data.items || [] })
  },

  updateQuantity: async (itemId, quantity) => {
    if (quantity < 1) {
      return get().removeItem(itemId)
    }
    const data = await api.put<CartResponse>(`/cart/items/${itemId}`, { quantity })
    if (data.items) set({ items: data.items })
  },

  removeItem: async (itemId) => {
    const data = await api.delete<CartResponse>(`/cart/items/${itemId}`)
    if (data.items) set({ items: data.items })
  },

  applyCoupon: async (code) => {
    const subtotal = get().subtotal()
    const data = await api.post<{ valid: boolean; coupon: CouponInfo }>('/coupons/validate', { code, orderTotal: subtotal })
    if (data.valid) {
      set({ coupon: data.coupon })
    }
  },

  clearCoupon: () => set({ coupon: null }),
  clearCart: () => set({ items: [], coupon: null }),

  subtotal: () => get().items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0),
  discount: () => get().coupon?.discountAmount || 0,
  total: () => {
    const sub = get().subtotal()
    const disc = get().discount()
    const shipping = sub >= 30 ? 0 : 5.99
    return Math.max(0, sub - disc) + shipping
  },
}))

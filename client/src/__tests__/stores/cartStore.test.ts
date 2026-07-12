import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useCartStore } from '../../stores/cartStore'

const { mockApi } = vi.hoisted(() => ({
  mockApi: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

vi.mock('../../lib/api', () => ({ api: mockApi }))

const mockProducts = [
  { id: 'p1', name: 'Kenyan AA', price: 28.00, imageUrl: '/img1.jpg', stock: 10 },
  { id: 'p2', name: 'Colombian Supremo', price: 22.50, imageUrl: '/img2.jpg', stock: 5 },
]

const mockCartItem = (id: string, productId: string, product: any, quantity = 1) => ({
  id, productId, quantity, product,
})

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.setState({
      items: [],
      isLoading: false,
      coupon: null,
    })
    vi.clearAllMocks()
  })

  it('starts with empty cart', () => {
    const state = useCartStore.getState()
    expect(state.items).toEqual([])
    expect(state.coupon).toBeNull()
    expect(state.isLoading).toBe(false)
  })

  it('fetchCart sets items from API', async () => {
    const items = [mockCartItem('c1', 'p1', mockProducts[0])]
    mockApi.get.mockResolvedValueOnce({ items })

    await useCartStore.getState().fetchCart()

    expect(useCartStore.getState().items).toEqual(items)
    expect(useCartStore.getState().isLoading).toBe(false)
  })

  it('fetchCart handles error gracefully', async () => {
    mockApi.get.mockRejectedValueOnce(new Error('Network error'))

    await useCartStore.getState().fetchCart()

    expect(useCartStore.getState().items).toEqual([])
    expect(useCartStore.getState().isLoading).toBe(false)
  })

  it('addItem adds product to cart', async () => {
    const items = [mockCartItem('c1', 'p1', mockProducts[0], 2)]
    mockApi.post.mockResolvedValueOnce({ items })

    await useCartStore.getState().addItem('p1', 2)

    expect(useCartStore.getState().items).toEqual(items)
  })

  it('removeItem removes item from cart', async () => {
    useCartStore.setState({
      items: [mockCartItem('c1', 'p1', mockProducts[0])],
    })
    mockApi.delete.mockResolvedValueOnce({ items: [] })

    await useCartStore.getState().removeItem('c1')

    expect(useCartStore.getState().items).toEqual([])
  })

  it('updateQuantity changes quantity', async () => {
    useCartStore.setState({
      items: [mockCartItem('c1', 'p1', mockProducts[0], 1)],
    })
    mockApi.put.mockResolvedValueOnce({
      items: [mockCartItem('c1', 'p1', mockProducts[0], 3)],
    })

    await useCartStore.getState().updateQuantity('c1', 3)

    const item = useCartStore.getState().items[0]
    expect(item.quantity).toBe(3)
  })

  it('applyCoupon sets coupon on valid code', async () => {
    const couponResponse = {
      valid: true,
      coupon: { id: 'cp1', code: 'SAVE10', type: 'PERCENTAGE', value: 10, discountAmount: 5.00 },
    }
    mockApi.post.mockResolvedValueOnce(couponResponse)

    await useCartStore.getState().applyCoupon('SAVE10')

    expect(useCartStore.getState().coupon).toEqual(couponResponse.coupon)
  })

  it('clearCoupon removes coupon', () => {
    useCartStore.setState({
      coupon: { id: 'cp1', code: 'SAVE10', type: 'PERCENTAGE', value: 10, discountAmount: 5.00 },
    })
    useCartStore.getState().clearCoupon()
    expect(useCartStore.getState().coupon).toBeNull()
  })

  it('clearCart empties items and coupon', () => {
    useCartStore.setState({
      items: [mockCartItem('c1', 'p1', mockProducts[0])],
      coupon: { id: 'cp1', code: 'SAVE10', type: 'PERCENTAGE', value: 10, discountAmount: 5.00 },
    })
    useCartStore.getState().clearCart()
    expect(useCartStore.getState().items).toEqual([])
    expect(useCartStore.getState().coupon).toBeNull()
  })

  describe('computed values', () => {
    it('subtotal sums item prices', () => {
      useCartStore.setState({
        items: [
          mockCartItem('c1', 'p1', mockProducts[0], 2),
          mockCartItem('c2', 'p2', mockProducts[1], 1),
        ],
      })
      expect(useCartStore.getState().subtotal()).toBe(28.00 * 2 + 22.50 * 1)
    })

    it('discount returns coupon discount amount', () => {
      useCartStore.setState({
        items: [mockCartItem('c1', 'p1', mockProducts[0], 1)],
        coupon: { id: 'cp1', code: 'SAVE10', type: 'FLAT', value: 5, discountAmount: 5.00 },
      })
      expect(useCartStore.getState().discount()).toBe(5.00)
    })

    it('discount returns 0 without coupon', () => {
      useCartStore.setState({
        items: [mockCartItem('c1', 'p1', mockProducts[0], 1)],
      })
      expect(useCartStore.getState().discount()).toBe(0)
    })

    it('total includes free shipping over $30', () => {
      useCartStore.setState({
        items: [mockCartItem('c1', 'p1', { ...mockProducts[0], price: 35 }, 1)],
      })
      expect(useCartStore.getState().total()).toBe(35)
    })

    it('total includes shipping under $30', () => {
      useCartStore.setState({
        items: [mockCartItem('c1', 'p1', { ...mockProducts[0], price: 15 }, 1)],
      })
      expect(useCartStore.getState().total()).toBe(15 + 5.99)
    })

    it('total handles coupon discount', () => {
      useCartStore.setState({
        items: [mockCartItem('c1', 'p1', { ...mockProducts[0], price: 50 }, 1)],
        coupon: { id: 'cp1', code: 'SAVE10', type: 'FLAT', value: 10, discountAmount: 10 },
      })
      expect(useCartStore.getState().total()).toBe(50 - 10) // free shipping
    })
  })
})

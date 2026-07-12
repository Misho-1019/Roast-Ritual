import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProductCard from '../../../components/shop/ProductCard'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('../../../stores/authStore', () => ({
  useAuthStore: () => ({ isAuthenticated: false }),
}))

const mockAddItem = vi.fn()
vi.mock('../../../stores/cartStore', () => ({
  useCartStore: (selector: any) => selector({ addItem: mockAddItem }),
}))

const defaultProps = {
  id: 'p1',
  name: 'Test Coffee',
  slug: 'test-coffee',
  origin: 'Ethiopia',
  roastLevel: 'LIGHT',
  price: 24.99,
  imageUrl: '/img.jpg',
  flavorNotes: ['Floral', 'Sweet', 'Tea-like'],
}

describe('ProductCard', () => {
  it('renders product name', () => {
    render(
      <BrowserRouter>
        <ProductCard {...defaultProps} />
      </BrowserRouter>
    )
    expect(screen.getByText('Test Coffee')).toBeTruthy()
  })

  it('renders origin', () => {
    render(
      <BrowserRouter>
        <ProductCard {...defaultProps} />
      </BrowserRouter>
    )
    expect(screen.getByText('Ethiopia')).toBeTruthy()
  })

  it('renders roast level badge', () => {
    render(
      <BrowserRouter>
        <ProductCard {...defaultProps} />
      </BrowserRouter>
    )
    expect(screen.getByText('LIGHT')).toBeTruthy()
  })

  it('renders price', () => {
    render(
      <BrowserRouter>
        <ProductCard {...defaultProps} />
      </BrowserRouter>
    )
    expect(screen.getByText('$24.99')).toBeTruthy()
  })

  it('renders top 3 flavor notes', () => {
    render(
      <BrowserRouter>
        <ProductCard {...defaultProps} />
      </BrowserRouter>
    )
    expect(screen.getByText('Floral, Sweet, Tea-like')).toBeTruthy()
  })

  it('links to product detail page', () => {
    render(
      <BrowserRouter>
        <ProductCard {...defaultProps} />
      </BrowserRouter>
    )
    const link = screen.getByText('Test Coffee').closest('a')
    expect(link?.getAttribute('href')).toBe('/product/test-coffee')
  })

  it('redirects to login when unauthenticated user clicks add-to-cart', () => {
    render(
      <BrowserRouter>
        <ProductCard {...defaultProps} />
      </BrowserRouter>
    )
    const addBtn = screen.getByText('add_shopping_cart').closest('button')
    fireEvent.click(addBtn!)
    expect(mockNavigate).toHaveBeenCalledWith('/login?redirect=/shop')
  })

  it('shows placeholder when no image', () => {
    render(
      <BrowserRouter>
        <ProductCard {...defaultProps} imageUrl="" />
      </BrowserRouter>
    )
    expect(screen.getByText('local_cafe')).toBeTruthy()
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CartItem from '../../../components/cart/CartItem'

const defaultProps = {
  id: 'c1',
  name: 'Kenyan AA',
  imageUrl: '/img.jpg',
  quantity: 2,
  onUpdateQuantity: vi.fn(),
  onRemove: vi.fn(),
}

describe('CartItem', () => {
  it('renders product name', () => {
    render(<CartItem {...defaultProps} />)
    expect(screen.getByText('Kenyan AA')).toBeTruthy()
  })

  it('renders quantity', () => {
    render(<CartItem {...defaultProps} />)
    expect(screen.getByText('2')).toBeTruthy()
  })

  it('calls onUpdateQuantity with decreased value on minus click', () => {
    const onUpdateQuantity = vi.fn()
    render(<CartItem {...defaultProps} onUpdateQuantity={onUpdateQuantity} />)
    const minusBtns = screen.getAllByLabelText('Decrease quantity of Kenyan AA')
    fireEvent.click(minusBtns[0])
    expect(onUpdateQuantity).toHaveBeenCalledWith('c1', 1)
  })

  it('calls onUpdateQuantity with increased value on plus click', () => {
    const onUpdateQuantity = vi.fn()
    render(<CartItem {...defaultProps} onUpdateQuantity={onUpdateQuantity} />)
    const plusBtns = screen.getAllByLabelText('Increase quantity of Kenyan AA')
    fireEvent.click(plusBtns[0])
    expect(onUpdateQuantity).toHaveBeenCalledWith('c1', 3)
  })

  it('calls onRemove when remove button clicked', () => {
    const onRemove = vi.fn()
    render(<CartItem {...defaultProps} onRemove={onRemove} />)
    const removeBtns = screen.getAllByLabelText('Remove Kenyan AA from cart')
    fireEvent.click(removeBtns[0])
    expect(onRemove).toHaveBeenCalledWith('c1')
  })

  it('shows placeholder when no image', () => {
    render(<CartItem {...defaultProps} imageUrl="" />)
    expect(screen.getByText('local_cafe')).toBeTruthy()
  })
})

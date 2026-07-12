import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../../../components/ui/Button'

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeTruthy()
  })

  it('fires onClick handler', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Submit</Button>)
    fireEvent.click(screen.getByText('Submit'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('applies primary variant by default', () => {
    render(<Button>Primary</Button>)
    const btn = screen.getByText('Primary')
    expect(btn.className).toContain('bg-primary')
  })

  it('applies secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const btn = screen.getByText('Secondary')
    expect(btn.className).toContain('border')
    expect(btn.className).toContain('chestnut')
  })

  it('sets type attribute', () => {
    render(<Button type="submit">Send</Button>)
    expect(screen.getByText('Send').getAttribute('type')).toBe('submit')
  })
})

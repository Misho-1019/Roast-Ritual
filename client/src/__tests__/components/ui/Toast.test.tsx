import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider, useToast } from '../../../components/ui/Toast'

function TestButton() {
  const { addToast } = useToast()
  return <button onClick={() => addToast('Test message', 'success')}>Show Toast</button>
}

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('renders children', () => {
    render(
      <ToastProvider>
        <div>Child content</div>
      </ToastProvider>
    )
    expect(screen.getByText('Child content')).toBeTruthy()
  })

  it('shows toast when addToast is called', () => {
    render(
      <ToastProvider>
        <TestButton />
      </ToastProvider>
    )

    fireEvent.click(screen.getByText('Show Toast'))
    expect(screen.getByText('Test message')).toBeTruthy()
  })

  it('shows success icon for success type', () => {
    render(
      <ToastProvider>
        <TestButton />
      </ToastProvider>
    )

    fireEvent.click(screen.getByText('Show Toast'))
    expect(screen.getByText('check_circle')).toBeTruthy()
  })

  it('dismisses toast after timeout', () => {
    render(
      <ToastProvider>
        <TestButton />
      </ToastProvider>
    )

    fireEvent.click(screen.getByText('Show Toast'))
    expect(screen.getByText('Test message')).toBeTruthy()

    act(() => {
      vi.advanceTimersByTime(4000)
    })

    expect(screen.queryByText('Test message')).toBeNull()
  })

  it('removes toast on close button click', () => {
    render(
      <ToastProvider>
        <TestButton />
      </ToastProvider>
    )

    fireEvent.click(screen.getByText('Show Toast'))
    expect(screen.getByText('Test message')).toBeTruthy()

    const closeBtn = screen.getByText('close')
    fireEvent.click(closeBtn)
    expect(screen.queryByText('Test message')).toBeNull()
  })

  it('throws error if useToast used outside provider', () => {
    expect(() => render(<TestButton />)).toThrow('useToast must be used within ToastProvider')
  })
})

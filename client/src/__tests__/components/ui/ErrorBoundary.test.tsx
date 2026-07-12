import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from '../../../components/ui/ErrorBoundary'

function GoodChild() {
  return <div>Working component</div>
}

function BadChild() {
  throw new Error('Boom!')
  return <div>Never reaches here</div>
}

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    render(
      <BrowserRouter>
        <ErrorBoundary>
          <GoodChild />
        </ErrorBoundary>
      </BrowserRouter>
    )
    expect(screen.getByText('Working component')).toBeTruthy()
  })

  it('renders fallback UI on error', () => {
    // Suppress console.error from the thrown error
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <BrowserRouter>
        <ErrorBoundary>
          <BadChild />
        </ErrorBoundary>
      </BrowserRouter>
    )

    expect(screen.getByText('Something went wrong')).toBeTruthy()
    expect(screen.getByText('Reload Page')).toBeTruthy()

    spy.mockRestore()
  })
})

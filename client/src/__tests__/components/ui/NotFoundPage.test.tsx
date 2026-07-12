import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NotFoundPage from '../../../pages/NotFoundPage'

describe('NotFoundPage', () => {
  it('renders 404 heading', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    )
    expect(screen.getByText('404')).toBeTruthy()
    expect(screen.getByText('Page not found')).toBeTruthy()
  })

  it('has a link back to home', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    )
    const link = screen.getByText('Back to Home')
    expect(link).toBeTruthy()
    expect(link.getAttribute('href')).toBe('/')
  })
})

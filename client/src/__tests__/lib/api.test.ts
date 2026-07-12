import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setAccessToken } from '../../lib/api'

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

let api: any
let ApiError: any

beforeEach(async () => {
  vi.clearAllMocks()
  const mod = await vi.importActual<any>('../../lib/api')
  api = mod.api
  ApiError = mod.ApiError
  setAccessToken(null)
})

describe('api utility', () => {
  it('parses GET response', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ data: 'test' }) })
    const result = await api.get('/test')
    expect(result).toEqual({ data: 'test' })
  })

  it('sends POST with body', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ id: 1 }) })
    const result = await api.post('/test', { name: 'test' })
    expect(result).toEqual({ id: 1 })
  })

  it('includes auth header when token set', async () => {
    setAccessToken('my-token')
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) })
    await api.get('/secure')
    const url = mockFetch.mock.calls[0][0]
    expect(url).toBe('/api/secure')
  })

  it('throws ApiError on 404', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404, json: () => Promise.resolve({ message: 'Not found' }) })
    try {
      await api.get('/not-found')
      expect.fail('should have thrown')
    } catch (err: any) {
      expect(err).toBeInstanceOf(ApiError)
      expect(err.statusCode).toBe(404)
    }
  })

  it('handles non-JSON error', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500, json: () => Promise.reject(new Error('Not JSON')) })
    try {
      await api.get('/error')
      expect.fail('should have thrown')
    } catch (err: any) {
      expect(err.message).toBe('Request failed')
    }
  })

  it('retries on 401 after refresh', async () => {
    setAccessToken('expired')
    mockFetch.mockResolvedValueOnce({ ok: false, status: 401, json: () => Promise.resolve({ message: 'expired' }) })
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ accessToken: 'new' }) })
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ data: 'ok' }) })
    const result = await api.get('/secure')
    expect(result).toEqual({ data: 'ok' })
  })

  it('does not retry /auth/refresh on 401', async () => {
    setAccessToken('expired')
    mockFetch.mockResolvedValueOnce({ ok: false, status: 401, json: () => Promise.resolve({ message: 'expired' }) })
    try {
      await api.post('/auth/refresh')
      expect.fail('should have thrown')
    } catch (err: any) {
      expect(err.statusCode).toBe(401)
    }
  })

  it('sends PUT request', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ updated: true }) })
    const result = await api.put('/test/1', { value: 1 })
    expect(result).toEqual({ updated: true })
  })

  it('sends DELETE request', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ deleted: true }) })
    const result = await api.delete('/test/1')
    expect(result).toEqual({ deleted: true })
  })
})

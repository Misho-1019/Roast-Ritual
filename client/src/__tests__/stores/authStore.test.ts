import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuthStore } from '../../stores/authStore'

const { mockApi } = vi.hoisted(() => ({
  mockApi: {
    post: vi.fn(),
    get: vi.fn(),
  },
}))

vi.mock('../../lib/api', () => ({
  api: mockApi,
  ApiError: class ApiError extends Error {
    statusCode: number
    constructor(statusCode: number, message: string) {
      super(message)
      this.name = 'ApiError'
      this.statusCode = statusCode
    }
  },
  setAccessToken: vi.fn(),
}))

const mockUser = { id: '1', email: 'test@test.com', name: 'Test', role: 'CUSTOMER' }
const mockToken = 'test-token-123'

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
    vi.clearAllMocks()
  })

  it('starts with unauthenticated state', () => {
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.accessToken).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  it('login sets user and token on success', async () => {
    mockApi.post.mockResolvedValueOnce({ user: mockUser, accessToken: mockToken })

    await useAuthStore.getState().login('test@test.com', 'password')

    const state = useAuthStore.getState()
    expect(state.user).toEqual(mockUser)
    expect(state.accessToken).toBe(mockToken)
    expect(state.isAuthenticated).toBe(true)
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('login sets error on failure', async () => {
    const { ApiError } = await import('../../lib/api')
    mockApi.post.mockRejectedValueOnce(new ApiError(401, 'Invalid credentials'))

    try {
      await useAuthStore.getState().login('test@test.com', 'wrong')
    } catch {
      // Expected
    }

    const state = useAuthStore.getState()
    expect(state.error).toBe('Invalid credentials')
    expect(state.isAuthenticated).toBe(false)
    expect(state.isLoading).toBe(false)
  })

  it('register sets user and token on success', async () => {
    mockApi.post.mockResolvedValueOnce({ user: mockUser, accessToken: mockToken })

    await useAuthStore.getState().register('Test', 'test@test.com', 'password')

    const state = useAuthStore.getState()
    expect(state.user).toEqual(mockUser)
    expect(state.accessToken).toBe(mockToken)
    expect(state.isAuthenticated).toBe(true)
  })

  it('register sets error on failure', async () => {
    const { ApiError } = await import('../../lib/api')
    mockApi.post.mockRejectedValueOnce(new ApiError(409, 'Email already registered'))

    try {
      await useAuthStore.getState().register('Test', 'exists@test.com', 'password')
    } catch {
      // Expected
    }

    const state = useAuthStore.getState()
    expect(state.error).toBe('Email already registered')
  })

  it('logout clears user and token', async () => {
    useAuthStore.setState({
      user: mockUser,
      accessToken: mockToken,
      isAuthenticated: true,
      isLoading: false,
    })

    mockApi.post.mockResolvedValueOnce({ message: 'Logged out' })

    await useAuthStore.getState().logout()

    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.accessToken).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  it('checkAuth restores session when /me returns user', async () => {
    mockApi.get.mockResolvedValueOnce({ user: mockUser, accessToken: mockToken })

    await useAuthStore.getState().checkAuth()

    const state = useAuthStore.getState()
    expect(state.user).toEqual(mockUser)
    expect(state.accessToken).toBe(mockToken)
    expect(state.isAuthenticated).toBe(true)
    expect(state.isLoading).toBe(false)
  })

  it('checkAuth clears state when /me returns null', async () => {
    mockApi.get.mockResolvedValueOnce({ user: null, accessToken: null })

    await useAuthStore.getState().checkAuth()

    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.accessToken).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.isLoading).toBe(false)
  })

  it('clearError resets error', () => {
    useAuthStore.setState({ error: 'Some error' })
    useAuthStore.getState().clearError()
    expect(useAuthStore.getState().error).toBeNull()
  })
})

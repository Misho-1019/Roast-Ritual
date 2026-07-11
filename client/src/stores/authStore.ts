import { create } from 'zustand'
import { api, ApiError, setAccessToken } from '../lib/api'

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const data = await api.post<{ user: User; accessToken: string }>('/auth/login', { email, password })
      setAccessToken(data.accessToken)
      set({ user: data.user, accessToken: data.accessToken, isAuthenticated: true, isLoading: false })
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Login failed'
      set({ error: message, isLoading: false })
      throw err
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null })
    try {
      const data = await api.post<{ user: User; accessToken: string }>('/auth/register', { name, email, password })
      setAccessToken(data.accessToken)
      set({ user: data.user, accessToken: data.accessToken, isAuthenticated: true, isLoading: false })
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Registration failed'
      set({ error: message, isLoading: false })
      throw err
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout')
    } catch {
      // Ignore logout errors
    }
    setAccessToken(null)
    set({ user: null, accessToken: null, isAuthenticated: false })
  },

  checkAuth: async () => {
    set({ isLoading: true })
    try {
      const data = await api.get<{ user: User | null; accessToken: string | null }>('/auth/me')
      if (data.user && data.accessToken) {
        setAccessToken(data.accessToken)
        set({ user: data.user, accessToken: data.accessToken, isAuthenticated: true, isLoading: false })
      } else {
        set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false })
      }
    } catch {
      set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false })
    }
  },

  clearError: () => set({ error: null }),
}))

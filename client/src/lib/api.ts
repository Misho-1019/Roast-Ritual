const CLOUD_RUN_URL = 'https://roast-ritual-186322592106.us-central1.run.app'

const BASE_URL = import.meta.env.VITE_API_URL || (
  typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? CLOUD_RUN_URL
    : '/api'
)

export class ApiError extends Error {
  statusCode: number
  constructor(statusCode: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
  }
}

let accessToken: string | null = null

export function setAccessToken(token: string | null) {
  accessToken = token
}

let refreshPromise: Promise<string | null> | null = null

async function refreshToken(): Promise<string | null> {
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) return null
      const data = await res.json()
      return data.accessToken || null
    } catch {
      return null
    } finally {
      refreshPromise = null
    }
  })()

  return refreshPromise
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const exec = (): Promise<T> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }
    if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`

    return fetch(`${BASE_URL}${path}`, { ...options, headers, credentials: 'include' }).then(
      async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({ message: 'Request failed' }))
          throw new ApiError(res.status, body.message || body.error || 'Request failed')
        }
        return res.json()
      }
    )
  }

  try {
    return await exec()
  } catch (err) {
    if (err instanceof ApiError && err.statusCode === 401 && path !== '/auth/refresh') {
      const newToken = await refreshToken()
      if (newToken) {
        accessToken = newToken
        return exec()
      }
    }
    throw err
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) =>
    request<T>(path, { method: 'DELETE' }),
}

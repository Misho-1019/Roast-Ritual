import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSocket } from '../../hooks/useSocket'

class MockWebSocket {
  url: string
  onmessage: ((event: any) => void) | null = null
  onclose: (() => void) | null = null
  close = vi.fn()
  readyState = WebSocket.OPEN

  constructor(url: string) {
    this.url = url
  }
}

vi.stubGlobal('WebSocket', MockWebSocket)

describe('useSocket', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('connects to WebSocket on mount', () => {
    const { result } = renderHook(() => useSocket())
    expect(result.current.wsRef.current).toBeTruthy()
    expect(result.current.wsRef.current?.url).toContain('ws://')
  })

  it('registers event listeners', () => {
    const { result } = renderHook(() => useSocket())
    const unsub = result.current.on('stockUpdate', vi.fn())
    expect(typeof unsub).toBe('function')
  })

  it('calls listener when matching message received', () => {
    const { result } = renderHook(() => useSocket())
    const listener = vi.fn()
    result.current.on('stockUpdate', listener)

    const ws = result.current.wsRef.current as any
    act(() => {
      ws.onmessage?.({ data: JSON.stringify({ type: 'stockUpdate', productId: 'p1', newStock: 5 }) })
    })

    expect(listener).toHaveBeenCalledWith({ type: 'stockUpdate', productId: 'p1', newStock: 5 })
  })

  it('does not call listener for non-matching event type', () => {
    const { result } = renderHook(() => useSocket())
    const listener = vi.fn()
    result.current.on('stockUpdate', listener)

    const ws = result.current.wsRef.current as any
    act(() => {
      ws.onmessage?.({ data: JSON.stringify({ type: 'orderUpdate' }) })
    })

    expect(listener).not.toHaveBeenCalled()
  })

  it('unsubscribe removes listener', () => {
    const { result } = renderHook(() => useSocket())
    const listener = vi.fn()
    const unsub = result.current.on('stockUpdate', listener)
    unsub()

    const ws = result.current.wsRef.current as any
    act(() => {
      ws.onmessage?.({ data: JSON.stringify({ type: 'stockUpdate', productId: 'p1', newStock: 5 }) })
    })

    expect(listener).not.toHaveBeenCalled()
  })

  it('closes WebSocket on unmount', () => {
    const { result, unmount } = renderHook(() => useSocket())
    const ws = result.current.wsRef.current!
    unmount()
    expect(ws.close).toHaveBeenCalled()
  })
})

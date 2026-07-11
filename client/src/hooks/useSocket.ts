import { useEffect, useRef, useCallback } from 'react'

const WS_URL = import.meta.env.VITE_WS_URL || `ws://${window.location.hostname}:4000`

export function useSocket() {
  const wsRef = useRef<WebSocket | null>(null)
  const listenersRef = useRef<Map<string, Set<(data: any) => void>>>(new Map())

  useEffect(() => {
    const ws = new WebSocket(WS_URL)
    wsRef.current = ws

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        const type = data.type as string
        const listeners = listenersRef.current.get(type)
        if (listeners) {
          listeners.forEach((fn) => fn(data))
        }
      } catch {}
    }

    return () => { ws.close() }
  }, [])

  const on = useCallback((event: string, fn: (data: any) => void) => {
    if (!listenersRef.current.has(event)) {
      listenersRef.current.set(event, new Set())
    }
    listenersRef.current.get(event)!.add(fn)
    return () => { listenersRef.current.get(event)?.delete(fn) }
  }, [])

  return { wsRef, on }
}

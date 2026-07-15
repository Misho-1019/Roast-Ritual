import { useEffect, useRef, useCallback } from 'react'

function getWsUrl() {
  if (typeof window !== 'undefined') {
    return import.meta.env.VITE_WS_URL || (
      window.location.hostname !== 'localhost'
        ? 'wss://roast-ritual-186322592106.us-central1.run.app'
        : `ws://${window.location.hostname}:4000`
    )
  }
  return 'ws://localhost:4000'
}

export function useSocket() {
  const wsRef = useRef<WebSocket | null>(null)
  const listenersRef = useRef<Map<string, Set<(data: any) => void>>>(new Map())

  useEffect(() => {
    const ws = new WebSocket(getWsUrl())
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

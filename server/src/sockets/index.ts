import { Server as HTTPServer } from 'http'
import { WebSocketServer, WebSocket } from 'ws'

let wss: WebSocketServer

export function initSocket(httpServer: HTTPServer) {
  wss = new WebSocketServer({ server: httpServer })

  wss.on('connection', (ws) => {
    console.log('Client connected')

    ws.on('close', () => {
      console.log('Client disconnected')
    })
  })

  return wss
}

export function emitStockUpdate(productId: string, newStock: number) {
  if (wss) {
    const message = JSON.stringify({ type: 'stockUpdate', productId, newStock })
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        try {
          client.send(message)
        } catch (e) {
          console.error('Socket send error:', e)
        }
      }
    })
  }
}

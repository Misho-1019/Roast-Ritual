import 'dotenv/config'
import http from 'http'
import app from './app.js'
import { initSocket } from './sockets/index.js'
import { startAbandonedCartCron } from './services/abandoned-cart.js'

const server = http.createServer(app)
const PORT = process.env.PORT || 4000

initSocket(server)

startAbandonedCartCron()

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

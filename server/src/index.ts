import 'dotenv/config'
import http from 'http'
import app from './app.js'
import { initSocket } from './sockets/index.js'
import { startAbandonedCartCron } from './services/abandoned-cart.js'

const REQUIRED_ENV_VARS = ['DATABASE_URL', 'JWT_SECRET', 'JWT_REFRESH_SECRET']
for (const key of REQUIRED_ENV_VARS) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`)
    process.exit(1)
  }
}

if (!process.env.ANTHROPIC_API_KEY) {
  console.warn('[rag] ANTHROPIC_API_KEY not set — coffee Q&A will not work')
}

const server = http.createServer(app)
const PORT = process.env.PORT || 4000

initSocket(server)

startAbandonedCartCron()

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

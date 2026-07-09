import 'dotenv/config'
import http from 'http'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/product.js'
import cartRoutes from './routes/cart.js'
import couponRoutes from './routes/coupon.js'
import checkoutRoutes from './routes/checkout.js'
import orderRoutes from './routes/order.js'
import adminRoutes from './routes/admin.js'
import { handleWebhook } from './controllers/stripe-webhook.js'
import { initSocket } from './sockets/index.js'

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))

app.post('/api/webhook', express.raw({ type: 'application/json' }), handleWebhook)

app.use(express.json())
app.use(cookieParser())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Roast & Ritual API' })
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/coupons', couponRoutes)
app.use('/api/checkout', checkoutRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin', adminRoutes)

initSocket(server)

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

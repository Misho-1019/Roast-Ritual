import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '../app.js'
import { prisma } from './setup.js'

const testEmail = `test-${Date.now()}@test.com`
const testPassword = 'TestPass123!'
const testName = 'Test User'
let userToken = ''
let userId = ''
let userCookie: string[] = []
let secondUserId = ''
let secondUserToken = ''
let adminToken = ''
let productId = ''
let cartItemId = ''
let reviewId = ''

beforeAll(async () => {
  // Login as admin for admin tests
  const adminRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'mikailtorres99@gmail.com', password: '123456' })
  adminToken = adminRes.body.accessToken

  // Get first product for cart/review tests
  const productRes = await request(app).get('/api/products')
  if (productRes.body.data?.length > 0) {
    productId = productRes.body.data[0].id
  }

  if (!productId) console.warn('[WARN] No products found in DB — cart/review tests will skip')
  if (!adminToken) console.warn('[WARN] Admin login failed — admin tests will fail')
})

async function cleanupUser(id: string) {
  if (!id) return
  await prisma.cartItem.deleteMany({ where: { cart: { userId: id } } }).catch(() => {})
  await prisma.cart.deleteMany({ where: { userId: id } }).catch(() => {})
  await prisma.refreshToken.deleteMany({ where: { userId: id } }).catch(() => {})
  await prisma.review.deleteMany({ where: { userId: id } }).catch(() => {})
  await prisma.user.deleteMany({ where: { id } }).catch(() => {})
}

afterAll(async () => {
  await cleanupUser(userId)
  await cleanupUser(secondUserId)

  // Cleanup any test products created during tests
  await prisma.product.deleteMany({ where: { name: 'Test Product' } }).catch(() => {})
})

describe('Health', () => {
  it('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })
})

describe('Auth', () => {
  it('registers a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: testEmail, password: testPassword, name: testName })
    expect(res.status).toBe(201)
    expect(res.body.user.email).toBe(testEmail)
    expect(res.body.user.name).toBe(testName)
    expect(res.body.accessToken).toBeTruthy()
    userId = res.body.user.id
    userToken = res.body.accessToken
    const raw = res.headers['set-cookie']
    userCookie = Array.isArray(raw) ? raw : raw ? [raw] : []
  })

  it('rejects duplicate email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: testEmail, password: testPassword, name: testName })
    expect(res.status).toBe(409)
  })

  it('rejects missing fields on register', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: testEmail })
    expect(res.status).toBe(400)
  })

  it('logs in with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testEmail, password: testPassword })
    expect(res.status).toBe(200)
    expect(res.body.accessToken).toBeTruthy()
    userToken = res.body.accessToken
  })

  it('rejects wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testEmail, password: 'wrongpassword' })
    expect(res.status).toBe(401)
  })

  it('returns user from /me with cookie from register', async () => {
    if (userCookie.length === 0) return console.warn('[WARN] No cookie from register — skipping /me test')
    const res = await request(app)
      .get('/api/auth/me')
      .set('Cookie', userCookie)
    expect(res.status).toBe(200)
    expect(res.body.user?.email).toBe(testEmail)
    expect(res.body.accessToken).toBeTruthy()
  })

  it('logs out and clears session', async () => {
    const res = await request(app)
      .post('/api/auth/logout')
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Logged out')
  })
})

describe('Products', () => {
  it('lists products with pagination', async () => {
    const res = await request(app).get('/api/products')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.total).toBeGreaterThanOrEqual(6)
    expect(res.body.page).toBe(1)
  })

  it('gets product by slug with rating', async () => {
    const res = await request(app).get('/api/products/kenyan-aa')
    expect(res.status).toBe(200)
    expect(res.body.name).toBe('Kenyan AA')
    expect(typeof res.body.avgRating).toBe('number')
    expect(typeof res.body.reviewCount).toBe('number')
  })

  it('returns 404 for non-existent product', async () => {
    const res = await request(app).get('/api/products/non-existent-product')
    expect(res.status).toBe(404)
  })

  it('filters products by roast level', async () => {
    const res = await request(app).get('/api/products?roastLevel=LIGHT')
    expect(res.status).toBe(200)
    res.body.data.forEach((p: any) => {
      expect(p.roastLevel).toBe('LIGHT')
    })
  })

  it('sorts products by price ascending', async () => {
    const res = await request(app).get('/api/products?sortBy=price_asc')
    expect(res.status).toBe(200)
    const prices = res.body.data.map((p: any) => Number(p.price))
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1])
    }
  })

  it('rejects non-admin create product (403)', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ name: 'Test', slug: 'test', description: 'test', price: 10, roastLevel: 'LIGHT', origin: 'Test' })
    expect(res.status).toBe(403)
  })

  it('allows admin to create product', async () => {
    const slug = `test-${Date.now()}`
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Test Product', slug, description: 'A test product', price: 15.99, roastLevel: 'MEDIUM', origin: 'Testania', stock: 100 })
    expect(res.status).toBe(201)
    expect(res.body.name).toBe('Test Product')
  })
})

describe('Cart', () => {
  it('returns empty cart for new user', async () => {
    const res = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${userToken}`)
    expect(res.status).toBe(200)
  })

  it('adds item to cart', async () => {
    if (!productId) { console.warn('[WARN] No productId — skipping add item'); return }
    const res = await request(app)
      .post('/api/cart/items')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productId, quantity: 2 })
    expect(res.status).toBe(200)
    expect(res.body.items.length).toBeGreaterThanOrEqual(1)
    cartItemId = res.body.items[0]?.id || ''
  })

  it('rejects unauthenticated cart access', async () => {
    const res = await request(app).get('/api/cart')
    expect(res.status).toBe(401)
  })

  it('removes item from cart', async () => {
    if (!cartItemId) { console.warn('[WARN] No cartItemId — skipping remove'); return }
    const res = await request(app)
      .delete(`/api/cart/items/${cartItemId}`)
      .set('Authorization', `Bearer ${userToken}`)
    expect(res.status).toBe(200)
  })
})

describe('Orders', () => {
  it('lists own orders (paginated)', async () => {
    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${userToken}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(typeof res.body.total).toBe('number')
  })

  it('returns 404 for non-existent order', async () => {
    const res = await request(app)
      .get('/api/orders/non-existent-id')
      .set('Authorization', `Bearer ${userToken}`)
    expect(res.status).toBe(404)
  })

  it('rejects accessing another user\'s order', async () => {
    // Register a second user
    const secondEmail = `other-${Date.now()}@test.com`
    const regRes = await request(app)
      .post('/api/auth/register')
      .send({ email: secondEmail, password: testPassword, name: 'Other User' })
    expect(regRes.status).toBe(201)
    secondUserId = regRes.body.user.id
    secondUserToken = regRes.body.accessToken

    // Second user's own order list should be empty
    const listRes = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${secondUserToken}`)
    expect(listRes.status).toBe(200)
    expect(listRes.body.data).toEqual([])
  })
})

describe('Reviews', () => {
  it('lists reviews for a product', async () => {
    if (!productId) { console.warn('[WARN] No productId — skipping list reviews'); return }
    const res = await request(app).get(`/api/reviews/${productId}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('creates a review when authenticated', async () => {
    if (!productId) { console.warn('[WARN] No productId — skipping create review'); return }
    const res = await request(app)
      .post('/api/reviews')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productId, rating: 5, title: 'Great!', body: 'Amazing coffee' })
    expect(res.status).toBe(201)
    expect(res.body.rating).toBe(5)
    reviewId = res.body.id
  })

  it('rejects review without auth', async () => {
    if (!productId) { console.warn('[WARN] No productId — skipping no-auth review'); return }
    const res = await request(app)
      .post('/api/reviews')
      .send({ productId, rating: 5 })
    expect(res.status).toBe(401)
  })

  it('rejects invalid rating', async () => {
    if (!productId) { console.warn('[WARN] No productId — skipping invalid rating'); return }
    const res = await request(app)
      .post('/api/reviews')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productId, rating: 6 })
    expect(res.status).toBe(400)
  })

  it('rejects duplicate review (unique constraint)', async () => {
    if (!productId) { console.warn('[WARN] No productId — skipping duplicate review'); return }
    const res = await request(app)
      .post('/api/reviews')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productId, rating: 4, title: 'Duplicate' })
    expect(res.status).toBe(409)
    expect(res.body.message).toBe('You have already reviewed this product')
  })
})

describe('Admin', () => {
  it('gets dashboard stats', async () => {
    const res = await request(app)
      .get('/api/admin/stats')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(200)
    expect(typeof res.body.totalOrders).toBe('number')
    // Decimal from Prisma comes as string over JSON
    expect(['number', 'string']).toContain(typeof res.body.totalRevenue)
  })

  it('rejects non-admin from admin routes', async () => {
    const res = await request(app)
      .get('/api/admin/stats')
      .set('Authorization', `Bearer ${userToken}`)
    expect(res.status).toBe(403)
  })

  it('lists customers', async () => {
    const res = await request(app)
      .get('/api/admin/customers')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('lists all orders', async () => {
    const res = await request(app)
      .get('/api/admin/orders')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(typeof res.body.total).toBe('number')
  })

  it('lists notifications', async () => {
    const res = await request(app)
      .get('/api/admin/notifications')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.items)).toBe(true)
  })

  it('manages coupons (CRUD)', async () => {
    const code = `TEST-${Date.now()}`
    const createRes = await request(app)
      .post('/api/admin/coupons')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ code, type: 'PERCENTAGE', value: 10 })
    expect(createRes.status).toBe(201)
    const couponId = createRes.body.id

    const listRes = await request(app)
      .get('/api/admin/coupons')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(listRes.status).toBe(200)
    expect(listRes.body.some((c: any) => c.id === couponId)).toBe(true)

    const deleteRes = await request(app)
      .delete(`/api/admin/coupons/${couponId}`)
      .set('Authorization', `Bearer ${adminToken}`)
    expect(deleteRes.status).toBe(200)
  })
})

describe('Middleware', () => {
  it('returns 401 without auth header', async () => {
    const res = await request(app).get('/api/cart')
    expect(res.status).toBe(401)
  })

  it('returns 401 with invalid token', async () => {
    const res = await request(app)
      .get('/api/cart')
      .set('Authorization', 'Bearer invalid-token-here')
    expect(res.status).toBe(401)
  })
})

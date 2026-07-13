import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { register, login, logout, refresh, me } from '../controllers/auth.js'

const router = Router()

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many attempts, please try again later' },
})

router.post('/register', authLimiter, register)
router.post('/login', authLimiter, login)
router.post('/logout', logout)
router.post('/refresh', refresh)
router.get('/me', me)

export default router

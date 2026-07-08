import { Router } from 'express'
import { register, login, logout, refresh, me } from '../controllers/auth.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/refresh', refresh)
router.get('/me', me)

export default router

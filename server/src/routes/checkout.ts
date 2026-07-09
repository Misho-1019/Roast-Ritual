import { Router } from 'express'
import { authenticate } from '../middleware/auth.js'
import { createPaymentIntent } from '../controllers/checkout.js'

const router = Router()

router.post('/create-payment-intent', authenticate, createPaymentIntent)

export default router

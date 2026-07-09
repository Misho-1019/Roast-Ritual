import { Router } from 'express'
import { validateCoupon } from '../controllers/coupon.js'

const router = Router()

router.post('/validate', validateCoupon)

export default router

import { Router } from 'express'
import { authenticate } from '../middleware/auth.js'
import { listOrders, getOrder } from '../controllers/order.js'

const router = Router()

router.get('/', authenticate, listOrders)
router.get('/:id', authenticate, getOrder)

export default router

import { Router } from 'express'
import { authenticate } from '../middleware/auth.js'
import { getStats } from '../controllers/admin.js'
import { listCustomers } from '../controllers/customer.js'
import { listAllOrders } from '../controllers/order-admin.js'
import { listCoupons, createCoupon, toggleCoupon, deleteCoupon } from '../controllers/coupon-admin.js'
import { getNotifications } from '../controllers/notifications.js'
import { adminCreateOrder } from '../controllers/admin-order.js'

const router = Router()

router.get('/stats', authenticate, getStats)
router.get('/customers', authenticate, listCustomers)
router.get('/orders', authenticate, listAllOrders)
router.get('/coupons', authenticate, listCoupons)
router.post('/coupons', authenticate, createCoupon)
router.put('/coupons/:id', authenticate, toggleCoupon)
router.delete('/coupons/:id', authenticate, deleteCoupon)
router.get('/notifications', authenticate, getNotifications)
router.post('/create-order', authenticate, adminCreateOrder)

export default router

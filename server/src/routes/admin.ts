import { Router } from 'express'
import { authenticate, requireAdmin } from '../middleware/auth.js'
import { getStats } from '../controllers/admin.js'
import { listCustomers } from '../controllers/customer.js'
import { listAllOrders } from '../controllers/order-admin.js'
import { listCoupons, createCoupon, toggleCoupon, deleteCoupon } from '../controllers/coupon-admin.js'
import { getNotifications } from '../controllers/notifications.js'
import { adminCreateOrder } from '../controllers/admin-order.js'

const router = Router()

router.get('/stats', authenticate, requireAdmin, getStats)
router.get('/customers', authenticate, requireAdmin, listCustomers)
router.get('/orders', authenticate, requireAdmin, listAllOrders)
router.get('/coupons', authenticate, requireAdmin, listCoupons)
router.post('/coupons', authenticate, requireAdmin, createCoupon)
router.put('/coupons/:id', authenticate, requireAdmin, toggleCoupon)
router.delete('/coupons/:id', authenticate, requireAdmin, deleteCoupon)
router.get('/notifications', authenticate, requireAdmin, getNotifications)
router.post('/create-order', authenticate, requireAdmin, adminCreateOrder)

export default router

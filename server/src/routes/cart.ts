import { Router } from 'express'
import { authenticate } from '../middleware/auth.js'
import { getCart, addItem, updateItem, removeItem } from '../controllers/cart.js'

const router = Router()

router.get('/', authenticate, getCart)
router.post('/items', authenticate, addItem)
router.put('/items/:id', authenticate, updateItem)
router.delete('/items/:id', authenticate, removeItem)

export default router

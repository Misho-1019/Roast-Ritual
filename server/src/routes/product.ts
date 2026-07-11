import { Router } from 'express'
import { authenticate, requireAdmin } from '../middleware/auth.js'
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.js'

const router = Router()

router.get('/', listProducts)
router.get('/:id', getProduct)
router.post('/', authenticate, requireAdmin, createProduct)
router.put('/:id', authenticate, requireAdmin, updateProduct)
router.delete('/:id', authenticate, requireAdmin, deleteProduct)

export default router

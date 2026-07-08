import { Router } from 'express'
import { authenticate } from '../middleware/auth.js'
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.js'

const router = Router()

router.get('/', listProducts)
router.get('/:id', getProduct)
router.post('/', authenticate, createProduct)
router.put('/:id', authenticate, updateProduct)
router.delete('/:id', authenticate, deleteProduct)

export default router

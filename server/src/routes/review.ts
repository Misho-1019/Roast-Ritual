import { Router } from 'express'
import { authenticate } from '../middleware/auth.js'
import { createReview, listReviews } from '../controllers/review.js'

const router = Router()

router.get('/:productId', listReviews)
router.post('/', authenticate, createReview)

export default router

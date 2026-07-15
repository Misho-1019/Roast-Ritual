import { Router } from 'express'
import { ask } from '../controllers/rag.js'

const router = Router()

router.post('/ask', ask)

export default router

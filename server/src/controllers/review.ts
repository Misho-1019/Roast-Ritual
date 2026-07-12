import { Response } from 'express'
import { prisma } from '../lib/db.js'
import { AuthRequest } from '../middleware/auth.js'

export async function createReview(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      res.status(401).json({ message: 'Not authenticated' })
      return
    }

    const { productId, rating, title, body } = req.body

    if (!productId || !rating || rating < 1 || rating > 5) {
      res.status(400).json({ message: 'Product ID and rating (1-5) are required' })
      return
    }

    const review = await prisma.review.create({
      data: {
        rating,
        title: title || null,
        body: body || null,
        productId,
        userId: req.userId,
      },
      include: {
        user: { select: { id: true, name: true } },
      },
    })

    res.status(201).json(review)
  } catch (error) {
    console.error('Create review error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function listReviews(req: AuthRequest, res: Response) {
  try {
    const productId = req.params.productId as string

    if (!productId) {
      res.status(400).json({ message: 'Product ID is required' })
      return
    }

    const reviews = await prisma.review.findMany({
      where: { productId },
      include: {
        user: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    res.json(reviews)
  } catch (error) {
    console.error('List reviews error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

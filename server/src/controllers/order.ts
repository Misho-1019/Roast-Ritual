import { Response } from 'express'
import { prisma } from '../lib/db.js'
import { AuthRequest } from '../middleware/auth.js'

export async function listOrders(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      res.status(401).json({ message: 'Not authenticated' })
      return
    }

    const page = Math.max(1, parseInt(req.query.page as string) || 1)
    const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize as string) || 20))
    const skip = (page - 1) * pageSize

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId: req.userId },
        include: { items: { include: { product: { select: { id: true, name: true, imageUrl: true } } } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      prisma.order.count({ where: { userId: req.userId } }),
    ])

    res.json({
      data: orders,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    })
  } catch (error) {
    console.error('List orders error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function getOrder(req: AuthRequest, res: Response) {
  try {
    const id = req.params.id as string

    const order = await prisma.order.findFirst({
      where: { id, userId: req.userId },
      include: { items: { include: { product: { select: { id: true, name: true, imageUrl: true } } } } },
    })

    if (!order) {
      res.status(404).json({ message: 'Order not found' })
      return
    }

    res.json(order)
  } catch (error) {
    console.error('Get order error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

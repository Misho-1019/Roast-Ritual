import { Response } from 'express'
import { prisma } from '../lib/db.js'
import { AuthRequest } from '../middleware/auth.js'

export async function listOrders(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      res.status(401).json({ message: 'Not authenticated' })
      return
    }

    const orders = await prisma.order.findMany({
      where: { userId: req.userId },
      include: { items: { include: { product: { select: { id: true, name: true, imageUrl: true } } } } },
      orderBy: { createdAt: 'desc' },
    })

    res.json(orders)
  } catch (error) {
    console.error('List orders error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function getOrder(req: AuthRequest, res: Response) {
  try {
    const id = req.params.id as string

    const order = await prisma.order.findUnique({
      where: { id },
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

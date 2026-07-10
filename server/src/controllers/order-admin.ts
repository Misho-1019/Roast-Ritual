import { Response } from 'express'
import { prisma } from '../lib/db.js'
import { AuthRequest } from '../middleware/auth.js'

export async function listAllOrders(req: AuthRequest, res: Response) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { name: true, email: true } },
        items: { select: { quantity: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    const result = orders.map((o) => ({
      id: o.id,
      userId: o.userId,
      customerName: o.user.name,
      customerEmail: o.user.email,
      status: o.status,
      total: o.total,
      itemCount: o.items.reduce((sum, i) => sum + i.quantity, 0),
      createdAt: o.createdAt,
      updatedAt: o.updatedAt,
    }))

    res.json(result)
  } catch (error) {
    console.error('List all orders error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

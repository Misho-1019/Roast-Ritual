import { Response } from 'express'
import { prisma } from '../lib/db.js'
import { AuthRequest } from '../middleware/auth.js'

export async function listAllOrders(req: AuthRequest, res: Response) {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1)
    const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize as string) || 50))
    const skip = (page - 1) * pageSize

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        include: {
          user: { select: { name: true, email: true } },
          items: { include: { product: { select: { id: true, name: true, imageUrl: true, price: true } } } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      prisma.order.count(),
    ])

    const result = orders.map((o) => ({
      id: o.id,
      userId: o.userId,
      customerName: o.user.name,
      customerEmail: o.user.email,
      status: o.status,
      total: o.total,
      itemCount: o.items.reduce((sum, i) => sum + i.quantity, 0),
      items: o.items.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        productImage: i.product.imageUrl,
        productPrice: i.product.price,
        quantity: i.quantity,
      })),
      createdAt: o.createdAt,
      updatedAt: o.updatedAt,
    }))

    res.json({ data: result, total, page, pageSize })
  } catch (error) {
    console.error('List all orders error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

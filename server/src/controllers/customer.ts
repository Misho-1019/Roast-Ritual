import { Response } from 'express'
import { prisma } from '../lib/db.js'
import { AuthRequest } from '../middleware/auth.js'

export async function listCustomers(req: AuthRequest, res: Response) {
  try {
    const customers = await prisma.user.findMany({
      include: {
        _count: { select: { orders: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const userIds = customers.map((c) => c.id)
    const orderAggs = await prisma.order.groupBy({
      by: ['userId'],
      _sum: { total: true },
      _max: { createdAt: true },
      where: { userId: { in: userIds } },
    })
    const aggMap = new Map(orderAggs.map((a) => [a.userId, { totalSpent: a._sum.total, lastOrderDate: a._max.createdAt }]))

    const result = customers.map((c) => {
      const agg = aggMap.get(c.id)
      return {
        id: c.id,
        name: c.name,
        email: c.email,
        orderCount: c._count.orders,
        totalSpent: Number(agg?.totalSpent || 0),
        lastOrderDate: agg?.lastOrderDate || null,
      }
    })

    res.json(result)
  } catch (error) {
    console.error('List customers error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

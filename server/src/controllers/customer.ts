import { Response } from 'express'
import { prisma } from '../lib/db.js'
import { AuthRequest } from '../middleware/auth.js'

export async function listCustomers(req: AuthRequest, res: Response) {
  try {
    const customers = await prisma.user.findMany({
      include: {
        _count: { select: { orders: true } },
        orders: { orderBy: { createdAt: 'desc' }, take: 1, select: { createdAt: true, total: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const result = customers.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      orderCount: c._count.orders,
      totalSpent: c.orders.reduce((sum, o) => sum + Number(o.total), 0),
      lastOrderDate: c.orders[0]?.createdAt || null,
    }))

    res.json(result)
  } catch (error) {
    console.error('List customers error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

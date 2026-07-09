import { Response } from 'express'
import { prisma } from '../lib/db.js'
import { AuthRequest } from '../middleware/auth.js'

export async function getStats(req: AuthRequest, res: Response) {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    const [totalOrders, totalProducts, totalCustomers, ordersByStatus, recentOrders] = await Promise.all([
      prisma.order.count(),
      prisma.product.count(),
      prisma.user.count(),
      prisma.order.groupBy({ by: ['status'], _count: true }),
      prisma.order.findMany({
        where: { createdAt: { gte: thirtyDaysAgo } },
        select: { createdAt: true, total: true },
        orderBy: { createdAt: 'asc' },
      }),
    ])

    const revenue = await prisma.order.aggregate({ _sum: { total: true } })

    const ordersByDate = recentOrders.reduce<Record<string, { count: number; revenue: number }>>((acc, order) => {
      const date = order.createdAt.toISOString().slice(0, 10)
      if (!acc[date]) acc[date] = { count: 0, revenue: 0 }
      acc[date].count++
      acc[date].revenue += Number(order.total)
      return acc
    }, {})

    const topProductsRaw = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    })

    const productIds = topProductsRaw.map((p) => p.productId)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true },
    })

    const topProducts = topProductsRaw.map((item) => ({
      name: products.find((p) => p.id === item.productId)?.name || 'Unknown',
      unitsSold: item._sum.quantity || 0,
    }))

    res.json({
      totalOrders,
      totalRevenue: revenue._sum.total || 0,
      totalProducts,
      totalCustomers,
      ordersByStatus: ordersByStatus.map((s) => ({ status: s.status, count: s._count })),
      ordersByDate: Object.entries(ordersByDate).map(([date, data]) => ({ date, ...data })),
      topProducts,
    })
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

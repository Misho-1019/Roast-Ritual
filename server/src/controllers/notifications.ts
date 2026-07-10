import { Response } from 'express'
import { prisma } from '../lib/db.js'
import { AuthRequest } from '../middleware/auth.js'

export async function getNotifications(req: AuthRequest, res: Response) {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

    const [recentOrders, lowStockProducts] = await Promise.all([
      prisma.order.findMany({
        where: { createdAt: { gte: twentyFourHoursAgo } },
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      prisma.product.findMany({
        where: { stock: { lt: 10 } },
        orderBy: { stock: 'asc' },
        take: 5,
      }),
    ])

    const newOrders = recentOrders.length
    const lowStockItems = lowStockProducts.length

    const items: { type: string; message: string; link: string }[] = []

    recentOrders.forEach((order) => {
      items.push({
        type: 'new_order',
        message: `New order from ${order.user.name} — $${Number(order.total).toFixed(2)}`,
        link: `/admin/orders`,
      })
    })

    lowStockProducts.forEach((product) => {
      items.push({
        type: 'low_stock',
        message: `${product.name} has only ${product.stock} units left`,
        link: `/admin/products`,
      })
    })

    res.json({ newOrders, lowStockItems, items: items.slice(0, 8) })
  } catch (error) {
    console.error('Notifications error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

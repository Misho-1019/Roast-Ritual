import { Response } from 'express'
import { prisma } from '../lib/db.js'
import { Prisma } from '../generated/prisma/index.js'
import { AuthRequest } from '../middleware/auth.js'
import { emitStockUpdate } from '../sockets/index.js'

export async function adminCreateOrder(req: AuthRequest, res: Response) {
  try {
    const { customerId, items, shippingAddress } = req.body

    if (!customerId || !items || items.length === 0) {
      res.status(400).json({ message: 'Customer ID and items are required' })
      return
    }

    const user = await prisma.user.findUnique({ where: { id: customerId } })
    if (!user) {
      res.status(404).json({ message: 'Customer not found' })
      return
    }

    const productIds = items.map((i: { productId: string }) => i.productId)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    })

    const productMap = new Map(products.map((p) => [p.id, p]))

    const orderItemsData: { productId: string; quantity: number; unitPrice: number }[] = []

    for (const item of items) {
      const product = productMap.get(item.productId)
      if (!product) {
        res.status(404).json({ message: `Product ${item.productId} not found` })
        return
      }
      if (product.stock < item.quantity) {
        res.status(400).json({ message: `Insufficient stock for ${product.name}` })
        return
      }
      const unitPrice = Number(product.price)
      orderItemsData.push({ productId: item.productId, quantity: item.quantity, unitPrice })
    }

    let total = orderItemsData.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)

    const order = await prisma.$transaction(async (tx) => {
      for (const item of items) {
        const result = await tx.product.updateMany({
          where: { id: item.productId, stock: { gte: item.quantity } },
          data: { stock: { decrement: item.quantity } },
        })
        if (result.count === 0) {
          throw new Error(`Insufficient stock for product ${item.productId} during order creation`)
        }
        const updated = await tx.product.findUnique({ where: { id: item.productId }, select: { id: true, stock: true } })
        if (updated) emitStockUpdate(item.productId, updated.stock)
      }

      return tx.order.create({
        data: {
          userId: customerId,
          status: 'PENDING',
          total,
          shippingAddress: shippingAddress || {},
          items: { create: orderItemsData },
        },
        include: { items: { include: { product: { select: { id: true, name: true, imageUrl: true, price: true } } } } },
      })
    })

    res.status(201).json(order)
  } catch (error) {
    console.error('Admin create order error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

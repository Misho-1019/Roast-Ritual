import { Response } from 'express'
import { prisma } from '../lib/db.js'
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

    let total = 0
    const orderItemsData: { productId: string; quantity: number; unitPrice: number }[] = []

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } })
      if (!product) {
        res.status(404).json({ message: `Product ${item.productId} not found` })
        return
      }
      if (product.stock < item.quantity) {
        res.status(400).json({ message: `Insufficient stock for ${product.name}` })
        return
      }
      const unitPrice = Number(product.price)
      total += unitPrice * item.quantity
      orderItemsData.push({ productId: item.productId, quantity: item.quantity, unitPrice })
    }

    const order = await prisma.order.create({
      data: {
        userId: customerId,
        status: 'PENDING',
        total,
        shippingAddress: shippingAddress || {},
        items: { create: orderItemsData },
      },
      include: { items: { include: { product: { select: { id: true, name: true, imageUrl: true, price: true } } } } },
    })

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId }, select: { id: true, stock: true } })
      if (product) {
        const newStock = product.stock - item.quantity
        await prisma.product.update({ where: { id: item.productId }, data: { stock: newStock } })
        emitStockUpdate(item.productId, newStock)
      }
    }

    res.status(201).json(order)
  } catch (error) {
    console.error('Admin create order error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

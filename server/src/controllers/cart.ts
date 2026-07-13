import { Response } from 'express'
import { prisma } from '../lib/db.js'
import { AuthRequest } from '../middleware/auth.js'

export async function getCart(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      res.json({ items: [] })
      return
    }

    let cart = await prisma.cart.findUnique({
      where: { userId: req.userId },
      include: { items: { include: { product: true } } },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: req.userId },
        include: { items: { include: { product: true } } },
      })
    }

    res.json(cart)
  } catch (error) {
    console.error('Get cart error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function addItem(req: AuthRequest, res: Response) {
  try {
    const { productId, quantity = 1 } = req.body

    if (!req.userId) {
      res.status(401).json({ message: 'Not authenticated' })
      return
    }

    if (!productId) {
      res.status(400).json({ message: 'Product ID is required' })
      return
    }

    const product = await prisma.product.findUnique({ where: { id: productId } })
    if (!product) {
      res.status(404).json({ message: 'Product not found' })
      return
    }
    if (product.stock < 1) {
      res.status(400).json({ message: 'Product is out of stock' })
      return
    }

    let cart = await prisma.cart.findUnique({ where: { userId: req.userId } })
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId: req.userId } })
    }

    const existing = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    })

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      })
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity },
      })
    }

    const updated = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: { items: { include: { product: true } } },
    })

    res.json(updated)
  } catch (error) {
    console.error('Add to cart error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function updateItem(req: AuthRequest, res: Response) {
  try {
    const id = req.params.id as string
    const { quantity } = req.body

    const existing = await prisma.cartItem.findUnique({
      where: { id },
      include: { cart: { select: { userId: true } } },
    })

    if (!existing) {
      res.status(404).json({ message: 'Item not found' })
      return
    }

    if (existing.cart.userId !== req.userId) {
      res.status(403).json({ message: 'Not your cart item' })
      return
    }

    if (quantity < 1) {
      await prisma.cartItem.delete({ where: { id } })
      return res.json({ message: 'Item removed' })
    }

    const product = await prisma.product.findUnique({ where: { id: existing.productId } })
    if (!product || product.stock < quantity) {
      res.status(400).json({ message: `Insufficient stock. Only ${product?.stock || 0} available.` })
      return
    }

    await prisma.cartItem.update({ where: { id }, data: { quantity } })

    const cart = await prisma.cart.findUnique({
      where: { id: existing.cartId },
      include: { items: { include: { product: true } } },
    })

    res.json(cart)
  } catch (error) {
    console.error('Update cart item error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function removeItem(req: AuthRequest, res: Response) {
  try {
    const id = req.params.id as string
    const item = await prisma.cartItem.findUnique({
      where: { id },
      include: { cart: { select: { userId: true } } },
    })

    if (!item) {
      res.status(404).json({ message: 'Item not found' })
      return
    }

    if (item.cart.userId !== req.userId) {
      res.status(403).json({ message: 'Not your cart item' })
      return
    }

    await prisma.cartItem.delete({ where: { id } })

    const cart = await prisma.cart.findUnique({
      where: { id: item.cartId },
      include: { items: { include: { product: true } } },
    })

    res.json(cart)
  } catch (error) {
    console.error('Remove cart item error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

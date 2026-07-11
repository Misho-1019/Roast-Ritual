import { Response } from 'express'
import { prisma } from '../lib/db.js'
import { AuthRequest } from '../middleware/auth.js'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function createPaymentIntent(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      res.status(401).json({ message: 'Not authenticated' })
      return
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: req.userId },
      include: { items: { include: { product: true } } },
    })

    if (!cart || cart.items.length === 0) {
      res.status(400).json({ message: 'Cart is empty' })
      return
    }

    const { couponId } = req.body

    const subtotalCents = cart.items.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity * 100,
      0
    )

    let discountCents = 0
    let validatedCouponId: string | null = null

    if (couponId) {
      const coupon = await prisma.coupon.findUnique({ where: { id: couponId } })

      if (!coupon || !coupon.isActive) {
        res.status(400).json({ message: 'Invalid coupon' })
        return
      }

      if (coupon.expiresAt && coupon.expiresAt < new Date()) {
        res.status(400).json({ message: 'Coupon has expired' })
        return
      }

      if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
        res.status(400).json({ message: 'Coupon has reached maximum uses' })
        return
      }

      const orderTotal = subtotalCents / 100
      if (coupon.minOrder && orderTotal < Number(coupon.minOrder)) {
        res.status(400).json({ message: `Minimum order of $${coupon.minOrder} required` })
        return
      }

      if (coupon.type === 'PERCENTAGE') {
        discountCents = Math.round(orderTotal * (Number(coupon.value) / 100) * 100)
      } else {
        discountCents = Math.round(Number(coupon.value) * 100)
      }

      validatedCouponId = coupon.id
    }

    const amount = Math.max(0, subtotalCents - discountCents)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: 'usd',
      metadata: {
        userId: req.userId,
        ...(validatedCouponId ? { couponId: validatedCouponId, discountCents: String(discountCents) } : {}),
      },
    })

    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Create payment intent error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

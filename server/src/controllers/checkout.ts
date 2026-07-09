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

    const amount = cart.items.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity * 100,
      0
    )

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: 'usd',
      metadata: { userId: req.userId },
    })

    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Create payment intent error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

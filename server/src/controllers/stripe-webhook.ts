import { Request, Response } from 'express'
import { prisma } from '../lib/db.js'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function handleWebhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'] as string

  let event
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    res.status(400).send(`Webhook Error: ${err.message}`)
    return
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as any
    const userId = paymentIntent.metadata?.userId

    if (userId) {
      const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: true } } },
      })

      if (cart && cart.items.length > 0) {
        const total = cart.items.reduce(
          (sum, item) => sum + Number(item.product.price) * item.quantity,
          0
        )

        await prisma.order.create({
          data: {
            userId,
            total,
            shippingAddress: {},
            items: {
              create: cart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: Number(item.product.price),
              })),
            },
          },
        })

        await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })
      }
    }
  }

  res.json({ received: true })
}

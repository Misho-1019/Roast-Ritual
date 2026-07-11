import type { Request, Response } from 'express'
import { prisma } from '../lib/db.js'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function handleWebhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'] as string

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook signature verification failed:', msg)
    res.status(400).send(`Webhook Error: ${msg}`)
    return
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    const userId = paymentIntent.metadata?.userId
    const couponId = paymentIntent.metadata?.couponId
    const discountCents = paymentIntent.metadata?.discountCents
    const shipping = paymentIntent.shipping

    const shippingAddress: Record<string, string> = {}
    if (shipping?.address) {
      shippingAddress.line1 = shipping.address.line1 || ''
      shippingAddress.city = shipping.address.city || ''
      shippingAddress.state = shipping.address.state || ''
      shippingAddress.zip = shipping.address.postal_code || ''
      shippingAddress.country = shipping.address.country || ''
    }

    if (userId) {
      const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: true } } },
      })

      if (cart && cart.items.length > 0) {
        await prisma.$transaction(async (tx) => {
          const subtotal = cart.items.reduce(
            (sum, item) => sum + Number(item.product.price) * item.quantity,
            0
          )

          const discountAmount = discountCents ? Number(discountCents) / 100 : 0
          const total = Math.max(0, subtotal - discountAmount)

          await tx.order.create({
            data: {
              userId,
              status: 'PAID',
              total,
              discountAmount,
              couponId: couponId || null,
              shippingAddress,
              items: {
                create: cart.items.map((item) => ({
                  productId: item.productId,
                  quantity: item.quantity,
                  unitPrice: Number(item.product.price),
                })),
              },
            },
          })

          if (couponId) {
            await tx.coupon.update({
              where: { id: couponId },
              data: { usedCount: { increment: 1 } },
            })
          }

          for (const item of cart.items) {
            await tx.product.update({
              where: { id: item.productId },
              data: { stock: { decrement: item.quantity } },
            })
          }

          await tx.cartItem.deleteMany({ where: { cartId: cart.id } })
        })
      }
    }
  }

  res.json({ received: true })
}

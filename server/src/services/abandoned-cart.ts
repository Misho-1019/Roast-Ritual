import cron from 'node-cron'
import { prisma } from '../lib/db.js'
import { sendEmail, buildAbandonedCartEmail } from './email.js'

export function startAbandonedCartCron() {
  if (!process.env.SMTP_HOST) {
    console.warn('[abandoned-cart] SMTP not configured — cron disabled')
    return
  }

  cron.schedule('*/15 * * * *', async () => {
    console.log('[abandoned-cart] Checking for abandoned carts...')

    try {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)

      const abandonedCarts = await prisma.cart.findMany({
        where: {
          abandonedEmailSentAt: null,
          updatedAt: { lt: oneHourAgo },
          items: { some: {} },
        },
        include: {
          user: { select: { id: true, name: true, email: true } },
          items: {
            include: { product: { select: { id: true, name: true, price: true } } },
          },
        },
      })

      if (abandonedCarts.length === 0) {
        console.log('[abandoned-cart] No abandoned carts found')
        return
      }

      console.log(`[abandoned-cart] Found ${abandonedCarts.length} abandoned carts`)

      for (const cart of abandonedCarts) {
        try {
          const total = cart.items.reduce(
            (sum, item) => sum + Number(item.product.price) * item.quantity,
            0
          )

          const items = cart.items.map((item) => ({
            name: item.product.name,
            quantity: item.quantity,
            price: Number(item.product.price),
          }))

          const html = buildAbandonedCartEmail(cart.user.name, items, total)

          await sendEmail(
            cart.user.email,
            'Your coffee cart is waiting — complete your ritual',
            html
          )

          await prisma.cart.update({
            where: { id: cart.id },
            data: { abandonedEmailSentAt: new Date() },
          })

          console.log(`[abandoned-cart] Email sent to ${cart.user.email}`)
        } catch (err) {
          console.error(`[abandoned-cart] Failed for cart ${cart.id}:`, err)
        }
      }
    } catch (err) {
      console.error('[abandoned-cart] Cron error:', err)
    }
  })

  console.log('[abandoned-cart] Cron scheduled every 15 minutes')
}

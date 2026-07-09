import { Response } from 'express'
import { prisma } from '../lib/db.js'
import { AuthRequest } from '../middleware/auth.js'

export async function validateCoupon(req: AuthRequest, res: Response) {
  try {
    const { code, orderTotal } = req.body

    if (!code) {
      res.status(400).json({ message: 'Coupon code is required' })
      return
    }

    const coupon = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } })

    if (!coupon || !coupon.isActive) {
      res.status(404).json({ message: 'Invalid coupon code' })
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

    if (coupon.minOrder && orderTotal && orderTotal < Number(coupon.minOrder)) {
      res.status(400).json({ message: `Minimum order of $${coupon.minOrder} required` })
      return
    }

    let discountAmount = 0
    if (coupon.type === 'PERCENTAGE') {
      discountAmount = (orderTotal || 0) * (Number(coupon.value) / 100)
    } else {
      discountAmount = Number(coupon.value)
    }

    res.json({
      valid: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discountAmount,
      },
    })
  } catch (error) {
    console.error('Validate coupon error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

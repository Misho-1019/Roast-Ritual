import { Response } from 'express'
import { prisma } from '../lib/db.js'
import { Prisma } from '../generated/prisma/index.js'
import { AuthRequest } from '../middleware/auth.js'

export async function listCoupons(req: AuthRequest, res: Response) {
  try {
    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(coupons)
  } catch (error) {
    console.error('List coupons error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function createCoupon(req: AuthRequest, res: Response) {
  try {
    const { code, type, value, minOrder, maxUses, expiresAt } = req.body

    if (!code || !type || value === undefined) {
      res.status(400).json({ message: 'Code, type, and value are required' })
      return
    }

    const existing = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } })
    if (existing) {
      res.status(409).json({ message: 'Coupon code already exists' })
      return
    }

    let parsedExpiresAt: Date | null = null
    if (expiresAt) {
      const d = new Date(expiresAt)
      if (!isNaN(d.getTime())) parsedExpiresAt = d
    }

    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        type,
        value: parseFloat(value),
        minOrder: minOrder ? parseFloat(minOrder) : null,
        maxUses: maxUses ? parseInt(maxUses) : null,
        expiresAt: parsedExpiresAt,
      },
    })

    res.status(201).json(coupon)
  } catch (error) {
    console.error('Create coupon error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function toggleCoupon(req: AuthRequest, res: Response) {
  try {
    const id = req.params.id as string
    const coupon = await prisma.coupon.findUnique({ where: { id } })
    if (!coupon) {
      res.status(404).json({ message: 'Coupon not found' })
      return
    }
    const updated = await prisma.coupon.update({
      where: { id },
      data: { isActive: !coupon.isActive },
    })
    res.json(updated)
  } catch (error) {
    console.error('Toggle coupon error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function deleteCoupon(req: AuthRequest, res: Response) {
  try {
    const id = req.params.id as string
    await prisma.coupon.delete({ where: { id } })
    res.json({ message: 'Coupon deleted' })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ message: 'Coupon not found' })
      return
    }
    console.error('Delete coupon error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

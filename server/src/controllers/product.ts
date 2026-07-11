import { Response } from 'express'
import { prisma } from '../lib/db.js'
import { AuthRequest } from '../middleware/auth.js'
import type { Prisma } from '../generated/prisma/index.js'
import { emitStockUpdate } from '../sockets/index.js'

export async function listProducts(req: AuthRequest, res: Response) {
  try {
    const { search, roastLevel, origin, minPrice, maxPrice, sortBy, page = '1', pageSize = '12' } = req.query

    const where: Prisma.ProductWhereInput = {}

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { origin: { contains: search as string, mode: 'insensitive' } },
      ]
    }
    if (roastLevel) where.roastLevel = roastLevel as any
    if (origin) where.origin = { contains: origin as string, mode: 'insensitive' }
    if (minPrice || maxPrice) {
      where.price = {}
      const minVal = parseFloat(minPrice as string)
      const maxVal = parseFloat(maxPrice as string)
      if (minPrice && !isNaN(minVal)) where.price.gte = minVal
      if (maxPrice && !isNaN(maxVal)) where.price.lte = maxVal
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' }
    if (sortBy === 'price_asc') orderBy = { price: 'asc' }
    else if (sortBy === 'price_desc') orderBy = { price: 'desc' }
    else if (sortBy === 'name_asc') orderBy = { name: 'asc' }
    else if (sortBy === 'name_desc') orderBy = { name: 'desc' }

    const skip = (parseInt(page as string) - 1) * parseInt(pageSize as string)
    const take = parseInt(pageSize as string)

    const [data, total] = await Promise.all([
      prisma.product.findMany({ where, orderBy, skip, take }),
      prisma.product.count({ where }),
    ])

    res.json({
      data,
      total,
      page: parseInt(page as string),
      pageSize: take,
      totalPages: Math.ceil(total / take),
    })
  } catch (error) {
    console.error('List products error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function getProduct(req: AuthRequest, res: Response) {
  try {
    const id = req.params.id as string

    const product = await prisma.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: { reviews: { include: { user: { select: { id: true, name: true } } }, orderBy: { createdAt: 'desc' } } },
    })

    if (!product) {
      res.status(404).json({ message: 'Product not found' })
      return
    }

    res.json(product)
  } catch (error) {
    console.error('Get product error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function createProduct(req: AuthRequest, res: Response) {
  try {
    const { name, slug, description, price, compareAtPrice, imageUrl, stock, roastLevel, origin, flavorNotes, isFeatured } = req.body

    if (!name || !slug || !description || !price || !roastLevel || !origin) {
      res.status(400).json({ message: 'Missing required fields: name, slug, description, price, roastLevel, origin' })
      return
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
        imageUrl: imageUrl || '',
        stock: stock ?? 0,
        roastLevel,
        origin,
        flavorNotes: flavorNotes || [],
        isFeatured: isFeatured ?? false,
      },
    })

    res.status(201).json(product)
  } catch (error) {
    console.error('Create product error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function updateProduct(req: AuthRequest, res: Response) {
  try {
    const id = req.params.id as string
    const { name, slug, description, price, compareAtPrice, imageUrl, stock, roastLevel, origin, flavorNotes, isFeatured } = req.body

    const data: Record<string, unknown> = {}
    if (name !== undefined) data.name = name
    if (slug !== undefined) data.slug = slug
    if (description !== undefined) data.description = description
    if (price !== undefined) data.price = parseFloat(price)
    if (compareAtPrice !== undefined) data.compareAtPrice = compareAtPrice ? parseFloat(compareAtPrice) : null
    if (imageUrl !== undefined) data.imageUrl = imageUrl
    if (stock !== undefined) data.stock = stock
    if (roastLevel !== undefined) data.roastLevel = roastLevel
    if (origin !== undefined) data.origin = origin
    if (flavorNotes !== undefined) data.flavorNotes = flavorNotes
    if (isFeatured !== undefined) data.isFeatured = isFeatured

    const product = await prisma.product.update({ where: { id }, data })
    if (stock !== undefined) emitStockUpdate(product.id, stock)
    res.json(product)
  } catch (error) {
    console.error('Update product error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function deleteProduct(req: AuthRequest, res: Response) {
  try {
    const id = req.params.id as string
    await prisma.product.delete({ where: { id } })
    res.json({ message: 'Product deleted' })
  } catch (error) {
    console.error('Delete product error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

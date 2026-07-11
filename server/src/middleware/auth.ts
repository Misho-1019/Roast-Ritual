import 'dotenv/config'
import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../services/auth.js'
import { prisma } from '../lib/db.js'

export interface AuthRequest extends Request {
  userId?: string
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing or invalid token' })
    return
  }

  try {
    const token = header.split(' ')[1]
    const payload = verifyAccessToken(token)
    req.userId = payload.userId
    next()
  } catch {
    res.status(401).json({ message: 'Token expired or invalid' })
  }
}

export async function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.userId) {
    res.status(401).json({ message: 'Not authenticated' })
    return
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { role: true },
    })

    if (!user || user.role !== 'ADMIN') {
      res.status(403).json({ message: 'Admin access required' })
      return
    }

    next()
  } catch {
    res.status(500).json({ message: 'Internal server error' })
  }
}

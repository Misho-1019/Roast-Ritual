import 'dotenv/config'
import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../services/auth.js'

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

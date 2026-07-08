import 'dotenv/config'
import { Response, CookieOptions } from 'express'
import { prisma } from '../lib/db.js'
import { hashPassword, comparePassword, generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../services/auth.js'
import { AuthRequest } from '../middleware/auth.js'

const REFRESH_COOKIE = 'refresh_token'
const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  path: '/api/auth',
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

function setRefreshCookie(res: Response, token: string) {
  res.cookie(REFRESH_COOKIE, token, COOKIE_OPTIONS)
}

function clearRefreshCookie(res: Response) {
  res.clearCookie(REFRESH_COOKIE, { path: '/api/auth' })
}

function sanitizeUser(user: { id: string; email: string; name: string; role: string }) {
  return { id: user.id, email: user.email, name: user.name, role: user.role }
}

export async function register(req: AuthRequest, res: Response) {
  try {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
      res.status(400).json({ message: 'Email, password, and name are required' })
      return
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      res.status(409).json({ message: 'Email already registered' })
      return
    }

    const passwordHash = await hashPassword(password)
    const user = await prisma.user.create({
      data: { email, passwordHash, name },
    })

    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)

    await prisma.refreshToken.create({
      data: { token: refreshToken, userId: user.id, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    })

    setRefreshCookie(res, refreshToken)
    res.status(201).json({ user: sanitizeUser(user), accessToken })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function login(req: AuthRequest, res: Response) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' })
      return
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' })
      return
    }

    const valid = await comparePassword(password, user.passwordHash)
    if (!valid) {
      res.status(401).json({ message: 'Invalid email or password' })
      return
    }

    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)

    await prisma.refreshToken.create({
      data: { token: refreshToken, userId: user.id, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    })

    setRefreshCookie(res, refreshToken)
    res.json({ user: sanitizeUser(user), accessToken })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function logout(req: AuthRequest, res: Response) {
  try {
    const token = req.cookies?.[REFRESH_COOKIE]
    if (token) {
      await prisma.refreshToken.deleteMany({ where: { token } })
    }
    clearRefreshCookie(res)
    res.json({ message: 'Logged out' })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function refresh(req: AuthRequest, res: Response) {
  try {
    const token = req.cookies?.[REFRESH_COOKIE]
    if (!token) {
      res.status(401).json({ message: 'No refresh token' })
      return
    }

    const stored = await prisma.refreshToken.findUnique({ where: { token } })
    if (!stored || stored.expiresAt < new Date()) {
      clearRefreshCookie(res)
      res.status(401).json({ message: 'Invalid or expired refresh token' })
      return
    }

    let payload: { userId: string }
    try {
      payload = verifyRefreshToken(token)
    } catch {
      await prisma.refreshToken.deleteMany({ where: { token } })
      clearRefreshCookie(res)
      res.status(401).json({ message: 'Invalid refresh token' })
      return
    }

    await prisma.refreshToken.deleteMany({ where: { token } })

    const accessToken = generateAccessToken(payload.userId)
    const newRefreshToken = generateRefreshToken(payload.userId)

    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: payload.userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })

    setRefreshCookie(res, newRefreshToken)
    res.json({ accessToken })
  } catch (error) {
    console.error('Refresh error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function me(req: AuthRequest, res: Response) {
  try {
    const token = req.cookies?.[REFRESH_COOKIE]
    if (!token) {
      res.json({ user: null, accessToken: null })
      return
    }

    const stored = await prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!stored || stored.expiresAt < new Date()) {
      res.json({ user: null, accessToken: null })
      return
    }

    const accessToken = generateAccessToken(stored.user.id)

    res.json({ user: sanitizeUser(stored.user), accessToken })
  } catch (error) {
    console.error('Me error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

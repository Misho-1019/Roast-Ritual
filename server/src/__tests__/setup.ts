import 'dotenv/config'
import { beforeAll, afterAll } from 'vitest'
import { PrismaClient } from '../generated/prisma/index.js'
import { PrismaNeon } from '@prisma/adapter-neon'

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

beforeAll(async () => {
  // Ensure DB connection works
  await prisma.$connect()
})

afterAll(async () => {
  await prisma.$disconnect()
})

export { prisma }

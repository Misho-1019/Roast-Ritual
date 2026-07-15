import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/index.js'
import { PrismaNeon } from '@prisma/adapter-neon'

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.$executeRawUnsafe('ALTER TABLE "CoffeeKnowledge" ADD COLUMN embedding vector(384)')
  console.log('Added embedding vector(384) column to CoffeeKnowledge')
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

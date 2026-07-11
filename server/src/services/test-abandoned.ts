import 'dotenv/config'
import { PrismaClient } from '../generated/prisma/index.js'
import { PrismaNeon } from '@prisma/adapter-neon'

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const email = process.argv[2] || 'your@email.com'
  const user = await prisma.user.findFirst({ where: { email } })
  if (!user) {
    console.log('User not found:', email)
    console.log('Usage: npx tsx src/services/test-abandoned.ts <email>')
    await prisma.$disconnect()
    return
  }

  await prisma.cart.update({
    where: { userId: user.id },
    data: {
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      abandonedEmailSentAt: null,
    },
  })

  console.log(`Cart backdated for ${user.email} — next cron run will pick it up`)
  await prisma.$disconnect()
}

main()

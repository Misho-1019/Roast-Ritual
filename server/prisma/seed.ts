import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/index.js'
import { PrismaNeon } from '@prisma/adapter-neon'
import bcrypt from 'bcryptjs'

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

const products = [
  {
    name: 'Ethiopian Yirgacheffe',
    slug: 'ethiopian-yirgacheffe',
    description: 'Bright, complex, and intensely aromatic. This single-origin Ethiopian Yirgacheffe offers a delicate body with floral and citrus notes, a wine-like acidity, and a long, sweet finish. Sourced from smallholder farmers in the birthplace of coffee.',
    price: 24.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZcbV-rZZJqxtnNqTv30TWfrUxqeiMrSQQIP72N7NznwT7RGfwpNSQ5KIMv2PKdrcNTGpxgWfbFzLVuce4N9bic3sYQQ-w7DnCjT9v8-w9r57adnwwmWoYuZ2JzUlN1m_Bu1sgqtohJaOdih7yhCR-echybm7waPzD8ocE7FoiTJl4ma_J6gzUF3gCdVL6uYfHP-uvLwl7g6sTFPrMMaiGQkyZ85IULp3IuD7lWs3jDG9c_mUOLIFAITVbiX2hDhOEwbVGeKMRIZs=s0',
    stock: 50,
    roastLevel: 'LIGHT',
    origin: 'Ethiopia',
    flavorNotes: ['Floral', 'Lemon', 'Tea-like', 'Jasmine'],
    isFeatured: true,
  },
  {
    name: 'Colombian Supremo',
    slug: 'colombian-supremo',
    description: 'A classic Colombian with a perfectly balanced profile. Notes of caramel and red apple are complemented by a smooth, nutty body and a clean, satisfying finish. Grown at high altitude in the Huila region.',
    price: 22.50,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5qLIG-wEZJiYR4d5dvY6ZN7mq-fy6qOR-pLIl9K2VFRwmp8KgLiJdo62Bs57pCgt3xMgf8snJBXsvvhIjZc-hCy1ziTNPXyQEKAQ5Dupo-nJ0Wcw9M8QFpaT2_A7D8ZbyuXgFG92-qu0eVnxsBp3G0UqMFeVjx819FBlhXyuQn96UUFW4XfBR98E_BrcKpQExPgzC4rmLkphenZMhoOMrl4pJMRm5--pzGOLJDk3B4Rl7VVmHZ_n-6tAQUphIWQA7Jg3i64-0-GA=s0',
    stock: 45,
    roastLevel: 'MEDIUM',
    origin: 'Colombia',
    flavorNotes: ['Caramel', 'Red Apple', 'Nutty'],
    isFeatured: true,
  },
  {
    name: 'Midnight Sumatra',
    slug: 'midnight-sumatra',
    description: 'Bold, earthy, and full-bodied. This dark roast from Sumatra delivers deep chocolate notes with a hint of spice and an almost syrupy body. The low acidity and lingering finish make it a perfect evening brew.',
    price: 26.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwebKEY5VrYuu7MOa6txGOsapmLcdckM4RBhcKc2WnLMtVU1XzsQAr7D0qlJczUqD2--XA-jVPYsJa0N0axP1XFhi-1oHeLQR2Ag3-1Q2ZDcNRrJkCoM_PqACDJGs1ani4d1zGh5kk_aVl16pL4tER0jJUks3i_NFyfZo5K5I0j_9MJGwjd6nAxOqxViT_6ynd7kKdse1eHVt9ruvtt8_VlHD9tBfYVgb9OI-yXUncTtVPV0NFSOUwFNwfB9UInTDP6nflD4lKg5s=s0',
    stock: 35,
    roastLevel: 'DARK',
    origin: 'Indonesia',
    flavorNotes: ['Earthy', 'Dark Chocolate', 'Spice'],
    isFeatured: true,
  },
  {
    name: 'Anaerobic Gesha',
    slug: 'anaerobic-gesha',
    description: 'An extraordinary experimental lot. Anaerobic fermentation creates an explosion of tropical fruit and jasmine, with a winey acidity and an incredibly complex, layered profile. Extremely limited production.',
    price: 38.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7qDnK5TuhnUz3FIUvJUGw9aFsSsiHptvO8YO7WBqOiaMTRFyGMtnPWhjiUANodLbDHaD5Gij1N3TY_9j5KNnHhqE7liqvyAWsD_U0Iw4VAlMMiWfw_hlZI4kiA66nE5o_6eGWXJhSDSzKE9NO3p1u8k_3B72D_AQhb6EmRW2qctUU1zcHTJgTCf4xLe1yQXpIYD-8uIhCO3Vz9VVlW6ZS4hxXSPOHhOKvfe5zu-nWG-uzOLHqqjHN7B_Mb9uF3UrWyQSZreF0h2Y=s0',
    stock: 15,
    roastLevel: 'LIGHT',
    origin: 'Ethiopia',
    flavorNotes: ['Tropical Fruit', 'Jasmine', 'Winey'],
    isFeatured: true,
  },
  {
    name: 'Costa Rican Tarrazu',
    slug: 'costa-rican-tarrazu',
    description: 'A meticulously washed coffee from the famed Tarrazú region. Bright citrus acidity meets honey-like sweetness with a creamy body and hints of milk chocolate. A favorite of our roasting team.',
    price: 17.99,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7qDnK5TuhnUz3FIUvJUGw9aFsSsiHptvO8YO7WBqOiaMTRFyGMtnPWhjiUANodLbDHaD5Gij1N3TY_9j5KNnHhqE7liqvyAWsD_U0Iw4VAlMMiWfw_hlZI4kiA66nE5o_6eGWXJhSDSzKE9NO3p1u8k_3B72D_AQhb6EmRW2qctUU1zcHTJgTCf4xLe1yQXpIYD-8uIhCO3Vz9VVlW6ZS4hxXSPOHhOKvfe5zu-nWG-uzOLHqqjHN7B_Mb9uF3UrWyQSZreF0h2Y=s0',
    stock: 40,
    roastLevel: 'MEDIUM_DARK',
    origin: 'Costa Rica',
    flavorNotes: ['Citrus', 'Honey', 'Milk Chocolate'],
    isFeatured: false,
  },
  {
    name: 'Kenyan AA',
    slug: 'kenyan-aa',
    description: 'Grade AA beans from the Nyeri region produce a remarkably bright cup with grapefruit and blackcurrant notes, a wine-like body, and a dry, complex finish. A bold and unforgettable coffee experience.',
    price: 28.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5qLIG-wEZJiYR4d5dvY6ZN7mq-fy6qOR-pLIl9K2VFRwmp8KgLiJdo62Bs57pCgt3xMgf8snJBXsvvhIjZc-hCy1ziTNPXyQEKAQ5Dupo-nJ0Wcw9M8QFpaT2_A7D8ZbyuXgFG92-qu0eVnxsBp3G0UqMFeVjx819FBlhXyuQn96UUFW4XfBR98E_BrcKpQExPgzC4rmLkphenZMhoOMrl4pJMRm5--pzGOLJDk3B4Rl7VVmHZ_n-6tAQUphIWQA7Jg3i64-0-GA=s0',
    stock: 25,
    roastLevel: 'LIGHT',
    origin: 'Kenya',
    flavorNotes: ['Grapefruit', 'Blackcurrant', 'Wine-like'],
    isFeatured: false,
  },
]

async function main() {
  console.log('Seeding database...')

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    })
    console.log(`  ✓ Product: ${product.name}`)
  }

  const adminEmail = 'admin@roastandritual.com'
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: await bcrypt.hash('admin123', 12),
        name: 'Admin',
        role: 'ADMIN',
      },
    })
    console.log('  ✓ Admin user created (admin@roastandritual.com / admin123)')
  } else {
    console.log('  - Admin user already exists')
  }

  const coupons = [
    { code: 'RITUAL10', type: 'PERCENTAGE' as const, value: 10, description: '10% off your first order' },
    { code: 'FREESHIP', type: 'FLAT' as const, value: 5.99, description: 'Free shipping', minOrder: 30 },
    { code: 'WELCOME5', type: 'FLAT' as const, value: 5, description: '$5 off welcome discount' },
  ]

  for (const coupon of coupons) {
    const { description, ...data } = coupon
    await prisma.coupon.upsert({
      where: { code: data.code },
      update: data,
      create: data,
    })
    console.log(`  ✓ Coupon: ${data.code} (${description})`)
  }

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())

import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/index.js'
import { PrismaNeon } from '@prisma/adapter-neon'

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Loading embedding model (first load downloads ~23MB)...')
  const { pipeline } = await import('@xenova/transformers')
  const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')

  const rows = await prisma.coffeeKnowledge.findMany({ orderBy: { createdAt: 'asc' } })
  console.log(`Found ${rows.length} knowledge chunks to embed`)

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const result = await embedder(row.content, { pooling: 'mean', normalize: true })
    const vector = `[${Array.from(result.data as Float32Array).join(',')}]`

    await prisma.$executeRawUnsafe(
      `UPDATE "CoffeeKnowledge" SET embedding = '${vector}'::vector WHERE id = $1`,
      row.id
    )

    if ((i + 1) % 10 === 0 || i === rows.length - 1) {
      console.log(`  Embedded ${i + 1}/${rows.length}`)
    }
  }

  console.log('Creating vector index...')
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS coffee_knowledge_embedding_idx ON "CoffeeKnowledge" USING ivfflat (embedding vector_cosine_ops) WITH (lists = 10)`)

  console.log('Done! All knowledge chunks embedded and indexed.')
}

main()
  .catch((e) => {
    console.error('Embedding error:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())

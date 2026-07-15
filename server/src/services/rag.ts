import { prisma } from '../lib/db.js'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

let embedder: any = null
async function getEmbedder() {
  if (!embedder) {
    const { pipeline } = await import('@xenova/transformers')
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
  }
  return embedder
}

export async function embedText(text: string): Promise<number[]> {
  const model = await getEmbedder()
  const result = await model(text, { pooling: 'mean', normalize: true })
  return Array.from(result.data) as number[]
}

function formatVector(arr: number[]): string {
  return `[${arr.join(',')}]`
}

export async function searchKnowledge(question: string, limit = 5) {
  const embedding = await embedText(question)
  const vector = formatVector(embedding)

  const rows: { id: string; content: string; category: string; similarity: number }[] = await prisma.$queryRawUnsafe(`
    SELECT id, content, category, 1 - (embedding <=> '${vector}'::vector) AS similarity
    FROM "CoffeeKnowledge"
    ORDER BY embedding <=> '${vector}'::vector
    LIMIT $1
  `, limit)

  return rows
}

export async function answerQuestion(question: string) {
  const chunks = await searchKnowledge(question)

  if (chunks.length === 0) {
    const res = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      messages: [{ role: 'user', content: question }],
    })
    const block = res.content[0] as Anthropic.TextBlock
    return { answer: block.text, sources: [] }
  }

  const context = chunks.map((c) => `[${c.category}] ${c.content}`).join('\n\n')

  const res = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 700,
    system: `You are a coffee expert assistant for Roast & Ritual. Answer the user's question based ONLY on the provided knowledge context. If the context doesn't contain enough information, say so. Be concise and helpful.`,
    messages: [
      { role: 'user', content: `Context:\n${context}\n\nQuestion: ${question}` },
    ],
  })

  return {
    answer: (res.content[0] as Anthropic.TextBlock).text,
    sources: chunks.map((c) => ({ content: c.content, category: c.category, similarity: Math.round(c.similarity * 100) })),
  }
}

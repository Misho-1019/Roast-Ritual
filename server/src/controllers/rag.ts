import { Response } from 'express'
import { AuthRequest } from '../middleware/auth.js'
import { answerQuestion } from '../services/rag.js'

export async function ask(req: AuthRequest, res: Response) {
  try {
    const { question } = req.body

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      res.status(400).json({ message: 'Question is required' })
      return
    }

    if (question.length > 500) {
      res.status(400).json({ message: 'Question too long (max 500 characters)' })
      return
    }

    const result = await answerQuestion(question.trim())
    res.json(result)
  } catch (error) {
    console.error('RAG error:', error)
    res.status(500).json({ message: 'Failed to answer question' })
  }
}

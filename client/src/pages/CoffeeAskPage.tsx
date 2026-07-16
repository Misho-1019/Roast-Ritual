import { useState, useRef, useEffect } from 'react'
import { api } from '../lib/api'

interface Message {
  role: 'user' | 'assistant'
  content: string
  sources?: { content: string; category: string; similarity: number }[]
}

const suggestions = [
  'Which coffee is best for cold brew?',
  'What are the differences between light and dark roast?',
  'How should I brew Ethiopian Yirgacheffe?',
  'What coffee pairs well with dark chocolate?',
]

export default function CoffeeAskPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [messages])

  const handleAsk = async (question?: string) => {
    const q = (question || input).trim()
    if (!q || isLoading) return

    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: q }])
    setIsLoading(true)

    try {
      const data = await api.post<{ answer: string; sources: { content: string; category: string; similarity: number }[] }>('/rag/ask', { question: q })
      setMessages((prev) => [...prev, { role: 'assistant', content: data.answer, sources: data.sources }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I couldn\'t process your question. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-3xl mx-auto w-full px-6 pt-20 pb-32 flex-1 flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-h1 text-primary font-display mb-2">Ask About Coffee</h1>
          <p className="text-mocha-text">Questions about brewing, origins, roasts, or pairings?</p>
        </div>

        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <span className="material-symbols-outlined text-6xl text-primary/20">coffee</span>
            <p className="text-mocha-text text-sm">Try asking something like:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleAsk(s)}
                  className="px-4 py-2 rounded-full border border-chestnut/50 text-mocha-text hover:text-primary hover:border-primary transition-all text-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 space-y-6 overflow-y-auto pb-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-5 py-4 ${m.role === 'user' ? 'bg-primary-container text-on-primary-container' : 'bg-espresso border border-outline-variant/30 text-on-surface'}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                  {m.sources && m.sources.length > 0 && (
                    <details className="mt-3">
                      <summary className="text-xs text-mocha-text cursor-pointer hover:text-primary transition-colors">
                        Sources ({m.sources.length})
                      </summary>
                      <div className="mt-2 space-y-2">
                        {m.sources.map((s, j) => (
                          <div key={j} className="text-xs text-mocha-text border-l-2 border-chestnut/30 pl-3">
                            <span className="text-primary font-medium">[{s.category}]</span> {s.content.slice(0, 120)}...
                            <span className="text-chestnut ml-1">{s.similarity}%</span>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-espresso border border-outline-variant/30 rounded-2xl px-5 py-4">
                  <span className="material-symbols-outlined animate-spin text-primary">refresh</span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 border-t border-outline-variant/30 pt-4">
          <div className="flex gap-3">
            <input
              className="flex-1 bg-espresso border border-outline-variant rounded-xl px-5 py-3.5 text-on-surface placeholder:text-mocha-text/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
              placeholder="Type your coffee question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              disabled={isLoading}
            />
            <button
              onClick={() => handleAsk()}
              disabled={isLoading || !input.trim()}
              className="bg-primary-container text-on-primary-container px-6 py-3.5 rounded-xl font-bold hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

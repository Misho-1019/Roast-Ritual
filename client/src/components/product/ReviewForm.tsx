import { useState } from 'react'
import { api } from '../../lib/api'

interface ReviewFormProps {
  productId: string
  onSubmitted: () => void
}

export default function ReviewForm({ productId, onSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="bg-primary-container text-on-primary-container px-6 py-3 rounded-lg font-bold text-sm hover:brightness-110 active:scale-95 transition-all">
        Write a Review
      </button>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) { setError('Please select a rating'); return }
    setSubmitting(true)
    setError('')
    try {
      await api.post('/reviews', { productId, rating, title, body })
      setRating(0)
      setTitle('')
      setBody('')
      setIsOpen(false)
      onSubmitted()
    } catch {
      setError('Failed to submit review')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-espresso/50 border border-outline-variant/30 rounded-xl p-6 mt-4">
      <h3 className="font-bold text-on-surface text-lg mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              className="text-2xl transition-colors"
            >
              <span
                className={`material-symbols-outlined ${
                  star <= (hover || rating) ? 'text-primary' : 'text-outline/30'
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            </button>
          ))}
        </div>
        <input
          className="w-full bg-background border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface placeholder:text-mocha-text/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
          placeholder="Review title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full bg-background border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface placeholder:text-mocha-text/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm min-h-[100px] resize-y"
          placeholder="Share your experience..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        {error && <p className="text-error text-sm">{error}</p>}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-bold text-sm hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-mocha-text hover:text-on-surface transition-colors text-sm px-4"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import ReviewForm from './ReviewForm'

import { mockReviewsBySlug } from '../../data/mockReviews'

interface ReviewItem {
  id: string
  rating: number
  title: string | null
  body: string | null
  createdAt: string
  user: { name: string }
}

interface ReviewListProps {
  productId: string
  slug: string
}

export default function ReviewList({ productId, slug }: ReviewListProps) {
  const [realReviews, setRealReviews] = useState<ReviewItem[]>([])

  const fetchReviews = () => {
    api.get<ReviewItem[]>(`/reviews/${productId}`)
      .then(setRealReviews)
      .catch(() => {})
  }

  useEffect(() => { fetchReviews() }, [productId])

  const mockReviews = mockReviewsBySlug[slug] || []

  const allReviews = [
    ...realReviews.map((r) => ({
      initials: r.user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
      name: r.user.name,
      rating: r.rating,
      title: r.title || '',
      body: r.body || '',
      date: new Date(r.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    })),
    ...mockReviews,
  ]

  const avgRating = allReviews.length > 0
    ? (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1)
    : '0.0'

  return (
    <section className="py-16 border-t border-outline-variant/20">
      <div className="max-w-max-width mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-display text-h1 text-on-surface">Customer Reviews</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="text-primary font-bold text-lg">{avgRating}</span>
              <span className="text-mocha-text">average from {allReviews.length} reviews</span>
            </div>
          </div>
          <ReviewForm productId={productId} onSubmitted={fetchReviews} />
        </div>
        <div className="space-y-6">
          {allReviews.map((review, i) => (
            <div key={`${review.name}-${i}`} className="bg-espresso/30 border border-outline-variant/20 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-chestnut/30 flex items-center justify-center text-primary font-bold shrink-0">
                  {review.initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-on-surface">{review.name}</h4>
                    <span className="text-mocha-text font-small text-xs">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`material-symbols-outlined text-sm ${
                          star <= review.rating ? 'text-primary' : 'text-outline/30'
                        }`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  {review.title && <h5 className="font-semibold text-on-surface mt-2">{review.title}</h5>}
                  {review.body && <p className="text-mocha-text font-body text-sm mt-1 leading-relaxed">{review.body}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

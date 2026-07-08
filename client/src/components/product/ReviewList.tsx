const reviews = [
  {
    initials: 'JD',
    name: 'James D.',
    rating: 5,
    title: 'Exceptional quality',
    body: 'This is hands down the best coffee I have ever brewed at home. The flavor notes are incredibly accurate and the aroma fills the entire house.',
    date: '2 weeks ago',
  },
  {
    initials: 'SM',
    name: 'Sarah M.',
    rating: 4,
    title: 'Smooth and balanced',
    body: 'Great daily drinker. Not too acidic, with a lovely smooth finish. Will definitely order again.',
    date: '1 month ago',
  },
  {
    initials: 'AL',
    name: 'Alex L.',
    rating: 5,
    title: 'Perfect for pour-over',
    body: 'The flavor profile really shines through with a V60 pour-over. Highly recommend for specialty coffee enthusiasts.',
    date: '1 month ago',
  },
]

export default function ReviewList() {
  return (
    <section className="py-16 border-t border-outline-variant/20">
      <div className="max-w-max-width mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-display text-h1 text-on-surface">Customer Reviews</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="text-primary font-bold text-lg">4.8</span>
              <span className="text-mocha-text">average from 24 reviews</span>
            </div>
          </div>
          <button className="bg-primary-container text-on-primary-container px-6 py-3 rounded-lg font-bold text-sm hover:brightness-110 active:scale-95 transition-all">
            Write a Review
          </button>
        </div>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.name} className="bg-espresso/30 border border-outline-variant/20 rounded-xl p-6">
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
                  <h5 className="font-semibold text-on-surface mt-2">{review.title}</h5>
                  <p className="text-mocha-text font-body text-sm mt-1 leading-relaxed">{review.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="text-primary font-bold hover:underline">Load more reviews &rarr;</button>
        </div>
      </div>
    </section>
  )
}

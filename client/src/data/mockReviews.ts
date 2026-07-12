export const mockReviewsBySlug: Record<string, { initials: string; name: string; rating: number; title: string; body: string; date: string }[]> = {
  'kenyan-aa': [
    { initials: 'JD', name: 'James D.', rating: 5, title: 'Exceptional quality', body: 'This is hands down the best coffee I have ever brewed at home. The flavor notes are incredibly accurate and the aroma fills the entire house.', date: '2 weeks ago' },
    { initials: 'AL', name: 'Alex L.', rating: 5, title: 'Perfect for pour-over', body: 'The flavor profile really shines through with a V60 pour-over. Highly recommend for specialty coffee enthusiasts.', date: '1 month ago' },
  ],
  'colombian-supremo': [
    { initials: 'SM', name: 'Sarah M.', rating: 4, title: 'Smooth and balanced', body: 'Great daily drinker. Not too acidic, with a lovely smooth finish. Will definitely order again.', date: '1 month ago' },
  ],
}

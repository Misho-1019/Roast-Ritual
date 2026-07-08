import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function RatingBadge() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className="bg-background py-8 border-y border-outline-variant/30">
      <div className="max-w-max-width mx-auto px-container-padding flex justify-center">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-surface-container-low border border-primary/20">
          <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
          <span className="text-primary font-bold tracking-wide font-small uppercase">
            4.9/5 Rating from 2000+ ritualists
          </span>
        </div>
      </div>
    </section>
  )
}

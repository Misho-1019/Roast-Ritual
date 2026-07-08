import { useScrollReveal } from '../../hooks/useScrollReveal'

const storyImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFvWRk7Lpupl4IVx8EBS0UqkrZXyls-O6d-0kAuosFAO0dHmXvbWISgs5AN55lsTi7p3WJ-K7Kxmx8-mw5ETKIoSjwRNeH77_Cbb-VYNhbNRyUm1WTo2HoAPoj8m547CAGWZ8tSBr6IH01CycEqSo0V0azZIqfmm6VS3zYy8E6j4bkfSjOjbSBTuas2Y9da78Zz3GS3SCsivX96v0buWDXI7UNWIIHgvTZDFQ5fjEzJPEMfMduz-oPg0bIbZFj0gXFBX8ETcFBNNY=s0'

export default function StorySection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className="py-section-gap">
      <div className="max-w-max-width mx-auto px-container-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 h-[500px] rounded-2xl overflow-hidden border border-outline-variant">
            <img
              className="w-full h-full object-cover"
              src={storyImg}
              alt="Coffee roasting facility with vintage roaster and burlap sacks"
            />
          </div>
          <div className="order-1 md:order-2">
            <span className="text-primary font-small uppercase tracking-widest block mb-4">
              The Roaster&apos;s Philosophy
            </span>
            <h2 className="font-display text-display mb-8">Crafting moments of quiet luxury</h2>
            <div className="space-y-6 text-secondary-mocha font-body leading-relaxed">
              <p>
                At Roast &amp; Ritual, we believe coffee isn&apos;t just a caffeine delivery
                system&mdash;it&apos;s a ceremony. We source only the top 1% of specialty-grade
                beans, focusing on direct-trade relationships that honor the farmer&apos;s craft as
                much as our own.
              </p>
              <p>
                Our roasting process is intentional, slow, and precise. We treat every batch as a
                unique composition, bringing out the latent terroir and nuanced sweetness that
                mass-produced coffee simply cannot capture.
              </p>
            </div>
            <div className="mt-10">
              <a className="inline-flex items-center gap-2 border-b-2 border-primary pb-1 text-primary font-bold hover:gap-4 transition-all" href="#">
                Learn about our process{' '}
                <span className="material-symbols-outlined">arrow_right_alt</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

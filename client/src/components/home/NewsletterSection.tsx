import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function NewsletterSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className="py-section-gap bg-espresso">
      <div className="max-w-[800px] mx-auto px-container-padding text-center">
        <h2 className="font-display text-h1 mb-4">Join the Ritual</h2>
        <p className="text-secondary-mocha font-body text-h2 mb-10">
          Subscribe for early access to micro-lot releases and get 10% off your first order.
        </p>
        <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
          <input
            className="flex-1 bg-background border border-chestnut rounded-lg px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="Enter your email address"
            type="email"
          />
          <button
            className="bg-primary-container text-on-primary-container px-10 py-4 rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all"
            type="submit"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-6 text-on-surface-variant text-[12px] opacity-60">
          By subscribing, you agree to our Privacy Policy and Terms of Service.
        </p>
      </div>
    </section>
  )
}

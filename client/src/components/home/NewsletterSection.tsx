export default function NewsletterSection() {
  return (
    <section className="py-24">
      <div className="max-w-[600px] mx-auto px-6 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#F5F0EB] tracking-tight">
          Join the Ritual
        </h2>
        <p className="text-[#B8A89A]">
          Get 10% off your first order and exclusive access to limited roasts.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 bg-[#1C1512] border border-[#7C4F34]/50 rounded-lg text-[#F5F0EB] placeholder-[#B8A89A] focus:outline-none focus:border-[#D4A04A] transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#D4A04A] text-[#0D0A08] font-semibold rounded-lg hover:brightness-110 transition-all active:scale-[0.97]"
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-[#7C4F34]">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}

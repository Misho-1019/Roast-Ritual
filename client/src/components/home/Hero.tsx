import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative min-h-[90dvh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D0A08] via-[#1C1512] to-[#0D0A08]" />
      <div className="relative max-w-[1400px] mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[#F5F0EB] leading-[1.05] tracking-tight">
              Turn your coffee
              <br />
              into a{' '}
              <span className="text-[#D4A04A]">ritual</span>
            </h1>
            <p className="text-lg text-[#B8A89A] max-w-md leading-relaxed">
              Discover single-origin coffees curated for your taste. From bean to cup, every step is a ceremony.
            </p>
            <div className="flex gap-4">
              <Link
                to="/quiz"
                className="inline-flex items-center px-8 py-3 bg-[#D4A04A] text-[#0D0A08] font-semibold rounded-lg hover:brightness-110 transition-all active:scale-[0.97]"
              >
                Take the Quiz
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center px-8 py-3 border border-[#7C4F34] text-[#F5F0EB] font-semibold rounded-lg hover:bg-[#1C1512] transition-all"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="relative w-80 h-96">
              <div className="absolute inset-0 bg-gradient-to-b from-[#D4A04A]/20 to-transparent rounded-2xl" />
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#1C1512] to-[#0D0A08] border border-[#7C4F34]/50 flex items-center justify-center">
                <svg className="w-32 h-32 text-[#D4A04A]/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 21V19H20V21H2ZM20 8V5H22V11H20V10H16V18H4V8H20ZM18 8H6V16H18V8Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

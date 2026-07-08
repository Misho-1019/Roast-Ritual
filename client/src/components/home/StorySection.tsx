export default function StorySection() {
  return (
    <section className="py-24 bg-[#1C1512]/50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F0EB] tracking-tight">
              Crafted with intention, roasted with care
            </h2>
            <div className="space-y-4 text-[#B8A89A] leading-relaxed">
              <p>
                Every bean we source tells a story. From the highlands of Ethiopia to the
                lush mountains of Colombia, we partner directly with farmers who share our
                commitment to quality and sustainability.
              </p>
              <p>
                Our master roasters bring out the unique character of each origin, creating
                a cup that is both approachable and extraordinary. This is coffee as it
                should be — slow, intentional, and deeply satisfying.
              </p>
            </div>
            <a
              href="/about"
              className="inline-flex items-center text-[#D4A04A] font-semibold hover:brightness-110 transition-all"
            >
              Read Our Story &rarr;
            </a>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-[#D4A04A]/10 to-[#1C1512] border border-[#7C4F34]/30 flex items-center justify-center">
            <svg className="w-24 h-24 text-[#D4A04A]/20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 21V19H20V21H2ZM20 8V5H22V11H20V10H16V18H4V8H20ZM18 8H6V16H18V8Z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

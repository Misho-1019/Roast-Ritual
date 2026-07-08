const products = [
  {
    id: 1,
    name: 'Ethiopian Yirgacheffe',
    origin: 'Ethiopia',
    roast: 'Light Roast',
    price: 18.99,
    image: null,
  },
  {
    id: 2,
    name: 'Colombian Supremo',
    origin: 'Colombia',
    roast: 'Medium Roast',
    price: 16.99,
    image: null,
  },
  {
    id: 3,
    name: 'Sumatra Mandheling',
    origin: 'Indonesia',
    roast: 'Dark Roast',
    price: 19.99,
    image: null,
  },
  {
    id: 4,
    name: 'Costa Rican Tarrazu',
    origin: 'Costa Rica',
    roast: 'Medium-Dark Roast',
    price: 17.99,
    image: null,
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F0EB] tracking-tight">
            Our Curated Collection
          </h2>
          <a href="/shop" className="text-[#D4A04A] hover:brightness-110 text-sm font-semibold transition-all">
            View All &rarr;
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <a
              key={product.id}
              href={`/product/${product.id}`}
              className="group bg-[#1C1512] border border-[#7C4F34]/30 rounded-lg overflow-hidden hover:border-[#D4A04A]/50 transition-all"
            >
              <div className="aspect-square bg-gradient-to-br from-[#1C1512] to-[#0D0A08] flex items-center justify-center">
                <svg className="w-16 h-16 text-[#7C4F34]/40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 21V19H20V21H2ZM20 8V5H22V11H20V10H16V18H4V8H20ZM18 8H6V16H18V8Z" />
                </svg>
              </div>
              <div className="p-4 space-y-2">
                <span className="inline-block px-2 py-0.5 text-xs font-medium text-[#D4A04A] bg-[#D4A04A]/10 rounded">
                  {product.roast}
                </span>
                <h3 className="text-[#F5F0EB] font-semibold group-hover:text-[#D4A04A] transition-colors">
                  {product.name}
                </h3>
                <p className="text-[#B8A89A] text-sm">{product.origin}</p>
                <p className="text-[#D4A04A] font-bold">${product.price}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                  }}
                  className="w-full py-2 text-sm font-semibold bg-[#D4A04A] text-[#0D0A08] rounded-lg hover:brightness-110 transition-all active:scale-[0.97]"
                >
                  Add to Cart
                </button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

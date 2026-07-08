import { useScrollReveal } from '../../hooks/useScrollReveal'

const productImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAZcbV-rZZJqxtnNqTv30TWfrUxqeiMrSQQIP72N7NznwT7RGfwpNSQ5KIMv2PKdrcNTGpxgWfbFzLVuce4N9bic3sYQQ-w7DnCjT9v8-w9r57adnwwmWoYuZ2JzUlN1m_Bu1sgqtohJaOdih7yhCR-echybm7waPzD8ocE7FoiTJl4ma_J6gzUF3gCdVL6uYfHP-uvLwl7g6sTFPrMMaiGQkyZ85IULp3IuD7lWs3jDG9c_mUOLIFAITVbiX2hDhOEwbVGeKMRIZs',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB5qLIG-wEZJiYR4d5dvY6ZN7mq-fy6qOR-pLIl9K2VFRwmp8KgLiJdo62Bs57pCgt3xMgf8snJBXsvvhIjZc-hCy1ziTNPXyQEKAQ5Dupo-nJ0Wcw9M8QFpaT2_A7D8ZbyuXgFG92-qu0eVnxsBp3G0UqMFeVjx819FBlhXyuQn96UUFW4XfBR98E_BrcKpQExPgzC4rmLkphenZMhoOMrl4pJMRm5--pzGOLJDk3B4Rl7VVmHZ_n-6tAQUphIWQA7Jg3i64-0-GA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAwebKEY5VrYuu7MOa6txGOsapmLcdckM4RBhcKc2WnLMtVU1XzsQAr7D0qlJczUqD2--XA-jVPYsJa0N0axP1XFhi-1oHeLQR2Ag3-1Q2ZDcNRrJkCoM_PqACDJGs1ani4d1zGh5kk_aVl16pL4tER0jJUks3i_NFyfZo5K5I0j_9MJGwjd6nAxOqxViT_6ynd7kKdse1eHVt9ruvtt8_VlHD9tBfYVgb9OI-yXUncTtVPV0NFSOUwFNwfB9UInTDP6nflD4lKg5s',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB7qDnK5TuhnUz3FIUvJUGw9aFsSsiHptvO8YO7WBqOiaMTRFyGMtnPWhjiUANodLbDHaD5Gij1N3TY_9j5KNnHhqE7liqvyAWsD_U0Iw4VAlMMiWfw_hlZI4kiA66nE5o_6eGWXJhSDSzKE9NO3p1u8k_3B72D_AQhb6EmRW2qctUU1zcHTJgTCf4xLe1yQXpIYD-8uIhCO3Vz9VVlW6ZS4hxXSPOHhOKvfe5zu-nWG-uzOLHqqjHN7B_Mb9uF3UrWyQSZreF0h2Y',
]

const products = [
  { name: 'Ethiopian Yirgacheffe', notes: 'Floral, Lemon, Tea-like', roast: 'Medium Roast', price: 24.00 },
  { name: 'Colombian Huila', notes: 'Caramel, Red Apple, Nutty', roast: 'Light Roast', price: 22.50 },
  { name: 'Midnight Sumatra', notes: 'Earthy, Dark Chocolate, Spice', roast: 'Dark Roast', price: 26.00 },
  { name: 'Anaerobic Gesha', notes: 'Tropical Fruit, Jasmine, Winey', roast: 'Experimental', price: 38.00 },
]

export default function FeaturedProducts() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className="py-section-gap bg-surface-container-lowest">
      <div className="max-w-max-width mx-auto px-container-padding">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-primary font-small uppercase tracking-widest block mb-2">Artisanal Curation</span>
            <h2 className="font-display text-h1">Our Curated Collection</h2>
          </div>
          <a className="text-primary hover:underline font-bold flex items-center gap-2" href="/shop">
            Explore All <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {products.map((product, i) => (
            <div key={product.name} className="gallery-card bg-espresso border border-outline-variant p-5 rounded-lg group">
              <div className="relative aspect-[4/5] rounded-md overflow-hidden mb-4 bg-gradient-to-br from-surface-container-high to-background">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src={productImages[i]}
                  alt={`${product.name} coffee bag packaging`}
                />
                <span className="absolute top-3 left-3 bg-secondary-container text-on-secondary-container text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  {product.roast}
                </span>
              </div>
              <h3 className="font-display text-body font-bold mb-1">{product.name}</h3>
              <p className="text-secondary-mocha font-small mb-4">{product.notes}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold text-h2">${product.price.toFixed(2)}</span>
                <button className="bg-primary text-on-primary p-2 rounded-lg hover:scale-110 active:scale-95 transition-transform">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

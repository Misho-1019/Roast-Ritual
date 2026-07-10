import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import OriginMap from '../components/map/OriginMap'

const heroImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgkyQukLpT-YpR0AFxsvpf9WS-xrEkKCR74bp4nB_Avlbfwxz9mtGIRzHGP8jyYYzZoIJNi7a4IjTAJdyBbr8rGCvr0LaW6QqSr4Ws4FkzzQwnQzjyLqIlc58nPfugQr-AdpXjcnaNvlCe1hAk-H_405eEgFp0cczMymacnMp6YchyWKLmbWxut6n8OCJ-9PhjL8eaN_4PpaUxQykUPDGuzjZw-6nuDVw4G9sSmvp1W2frQ0K4dBHOS-V-O3tD3r18faFAoctX2GM=s0'
const missionImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwhXRdzhYB88kLbIa0rnwOTK6iPg7gDAn-jkkiR3dfPoHT203m1d_clKQ4psYdD1hvEUQHSV4vGH1L2hPSpV97k9bMqX693Nr8DR5_yyT9Pn7EWE_bfyy6JClwfba1LZ0p53iO_b4ZjHsu-n7ItJGfz-F_ujKlcxLP54HT2FcVW1QbQyZ5z19S4nd8aBDAbfC5pIU7wKE_BKgvkJCsT7APz3L9YZiHjAx1vxcG2oiUs9oa8ulLU1RYvwJp_BJbZfogDFCZrQP1sD8=s0'
const processImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4aTXGlW39VObGnoqrn0D4ACDJ8dcyB-U9hodBn9ar-xoUXmR3Jox5u84LNc8UGM3-4EWWJACYn6EEI85Kca9hxMV1JbC_shfVtZXinqtwW3ITqy8HmvIb9kwKg1ewhclNRho1WD4cg3WTYxINcerC4XhTRGcx-Iyky2Vu23ZVaI0BiJuY2ku5_Dj5g-Y7XsWHj_Zm-OS05FGCS_y8_1zIofaFvIJyXlfD1Pshg8JDQohJ__KMYP7ZWUUpXNYBpqWq-AcT1wKsieE=s0',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD7a9phx-yi8l2n9zNObQSbKtMIqGsicsLWqG99-Hzk-nADYMB9ljKGeUg-uzWiqDF6eRtIl0Dsjw6Vn0hriMiV-F9L8BFyV59WoOLR1D37TE8OQFsIVyg-j2NQR8Iomc5Eth4AMIWyxRUvEblBrS6aB07jBIv_d16ia__T0L9xUaMYZPAkTTX-_LpvCjy8_7wBrXSvKhrkJOs0cdGdeq4KJklpuhhvglZ22_r0KPVHoCExHpb6McyNb5Ra0T9HWemJFIcuVszyJg0=s0',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBz0ozjbIjYu8oZe0goZ6S1_3iwxfImmUAQmfIPw4BWacT0wN97Lj6Qd5GMheywHSg-eCXqLDSc4vmiAjVy_FJWpLTvaovidhMFjvRRdMT_mq_19m1KMvlnvbWfmnLQN4XOAXEHRZjyQcJja-jPQT71PTtvLj35Ci5bjkgYQT5V3SzgoAxEA1qQywR8pWexL5elRdv1PS3PgZp9kznrOe8aLG3RJtnNCrkYOHH8mSVugoBgpbcuUL7FLJStJ_Pfz-D3RsMt9t6VVMs=s0',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBEfi70ijH6LWUaaqRJmsSKn6kKUlX8wisB__g8_5B5HigyxtkaCEURDNwSoXbixanpcOmdwmEmQ3_17gg_uME_-LIFoxUAGunwPqOwLRAHcuaoLByjkNWjcyzyAimyoswTnpT2Q4c_-0uUOoonpFOvUXBzUCM2RMSXpnlq1-YwCVQ7HzSvBissYBFH8Z0XU_OxVEm1_DHzGCOTfa1kY_PVgzgWKJNIuitfsMzAQ7lA_WJwydPDO9dzF9NH3C2FL8ED2qsi66b6C0o=s0',
]

const team = [
  { name: 'Marco Velez', role: 'Master Roaster', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB06GLR0kSrwUbRw0IWDUIerbjppFWtkonPFnj-ScdDuSVQgL7yi9n1nC6rmOgKxY-M_3JB9MybPFsnAAjb6r85dFbMCAfraSEea7gUxwErJC1D1Ijr5dTiYesBeDyHxU93sYtEggHUqbEh9ppGvez2zD34js62tziU0Ab7-_E08dS3AXdWIXtcHxG9UVNJr5q7hWdXxwogsRaiWZyfscZJhx6B9T_OKgG-1dMZsXucpc4FxDSS6gBVCHHDxcPnKM3610u_SC5HlhE=s0' },
  { name: 'Elena Rivas', role: 'Head of Sourcing', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7e-AnQKq8xs_pQklXolAW0hqegGMvOd4sSWWrnxBNQYGPA5OGmIKG6NhOl7CSgwNIoF00y40QBcyaNvjNhZtzA5vb92Vsb08XEBEnEHjvRjRbfL8QGjSdrfQJnqrbiIT38g-DYCTHHVcA-J4hDZoEk4RHVpFZB25LHGWz5jw5mOw_EfA2q6KQbi7pWGbHnMpdclFL6gIjaXh1cKuqEqkSMRsToTtT0wCkAF_sY80lQOd28EKiO0rE4XwnTl9JIX3up0RYrce48EM=s0' },
  { name: 'David Kim', role: 'Lead Barista', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdtRxk-8Kch0xJ00jSpY7ZaUSCR_Ofx1VJfTTXQQo-zGvP6dkqNMkuWvLLazxGo93cOF2Anun7BFC--5YfLb2wEvtFv0FVeId8Qj5WWoCD9_x1z-pM4xuqtZGUDGlqFgndav3c4UPNSDPBhjLsFCg-bUtwQYyHS8EqM8N3MxVd6b-KO6tRGkEGbitTQ-sJmwB439Ke0GLlseDUvPAJwaGiE96xdWJPKoVz04f87zWSNOGklN4LszxDGRq_1WV13y9HQCoC3j8amOQ=s0' },
  { name: 'Sofia Laurent', role: 'Creative Director', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0AXIeccajR3pE9dalsXdWpjQBGqrFHWGslovdoGL27cMWL6rcbO6jpkfLg87yRm6M2hsj4NfOkBBRgL1HJ7UIRnSzI8CSX49LAvf-1a0e9FvB3f2IWfpy1H0ZLjYMCtToUND175s4P6HkW4DOhkMJh6XO4VOUOGbs1sMc8nNURNihoDTJW7i9QUPZ59w8m9N6RfOq-9pwZLi8FQWJujCVB1fwGvkF0_Yw3WTkbn3s9CDxPx1vFYj0-jKVYAHqyJvsIxvqOQ8vRhQ=s0' },
]

export default function AboutPage() {
  const missionRef = useScrollReveal<HTMLElement>()
  const processRef = useScrollReveal<HTMLElement>()
  const valuesRef = useScrollReveal<HTMLElement>()
  const teamRef = useScrollReveal<HTMLElement>()
  const ctaRef = useScrollReveal<HTMLElement>()

  return (
    <>
      {/* Hero — same pattern as home page hero */}
      <section className="relative min-h-[90dvh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/60" />
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover opacity-80" src={heroImg} alt="Coffee plantation at sunrise" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        <div className="relative max-w-max-width mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-primary font-small uppercase tracking-widest text-sm">Since 2019</span>
              <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[#F5F0EB] leading-[1.05] tracking-tight">
                Our{' '}
                <span className="text-primary italic">Story</span>
              </h1>
              <p className="text-lg text-[#B8A89A] max-w-md leading-relaxed">
                From a single dream to a global pursuit of exceptional coffee. Every bean tells a story of tradition, terroir, and craft.
              </p>
              <Link
                to="/quiz"
                className="inline-flex items-center px-8 py-3 bg-primary-container text-on-primary-container font-semibold rounded-lg hover:brightness-110 transition-all active:scale-[0.97]"
              >
                Take the Quiz <span className="material-symbols-outlined ml-2">bolt</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission — same as home page StorySection */}
      <section ref={missionRef} className="py-section-gap">
        <div className="max-w-max-width mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 h-[500px] rounded-2xl overflow-hidden border border-outline-variant">
              <img className="w-full h-full object-cover" src={missionImg} alt="Pour-over coffee brewing" />
            </div>
            <div className="order-1 md:order-2">
              <span className="text-primary font-small uppercase tracking-widest block mb-4">The Roaster's Philosophy</span>
              <h2 className="font-display text-display mb-8">Coffee is a ceremony</h2>
              <div className="space-y-6 text-secondary-mocha font-body leading-relaxed">
                <p>
                  At Roast &amp; Ritual, we believe coffee isn't just a caffeine delivery system — it's a ceremony. 
                  We source only the top 1% of specialty-grade beans, focusing on direct-trade relationships that 
                  honor the farmer's craft as much as our own.
                </p>
                <p>
                  Our roasting process is intentional, slow, and precise. We treat every batch as a unique composition, 
                  bringing out the latent terroir and nuanced sweetness that mass-produced coffee simply cannot capture.
                </p>
              </div>
              <div className="mt-10">
                <Link to="/shop" className="inline-flex items-center gap-2 border-b-2 border-primary pb-1 text-primary font-bold hover:gap-4 transition-all">
                  Explore our collection <span className="material-symbols-outlined">arrow_right_alt</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Process — 4 cards same as FeaturedProducts */}
      <section ref={processRef} className="py-section-gap bg-surface-container-lowest">
        <div className="max-w-max-width mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-primary font-small uppercase tracking-widest block mb-2">From Bean to Cup</span>
            <h2 className="font-display text-h1">The Process</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Source', desc: 'We partner directly with farms across Ethiopia, Colombia, Indonesia, and beyond.' },
              { step: '02', title: 'Roast', desc: 'Small-batch roasting in our vintage drum roasters, precisely calibrated per origin.' },
              { step: '03', title: 'Cup', desc: 'Every batch is cupped and scored. Only the top 10% makes it to your bag.' },
              { step: '04', title: 'Ship', desc: 'Fresh-roasted and shipped within 48 hours, sealed for peak flavor.' },
            ].map((item, i) => (
              <div key={item.step} className="gallery-card bg-espresso border border-outline-variant rounded-lg overflow-hidden group">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {processImages[i] ? (
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={processImages[i]} alt={item.title} />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-surface-container-high to-background flex items-center justify-center">
                      <span className="material-symbols-outlined text-6xl text-primary/20">local_cafe</span>
                    </div>
                  )}
                  <span className="absolute top-4 left-4 bg-primary text-on-primary-container text-xs font-bold px-3 py-1 rounded-full shadow-lg">{item.step}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-body font-bold text-on-surface group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-mocha-text font-small text-sm mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Origins — map section */}
      <section className="py-section-gap">
        <div className="max-w-max-width mx-auto px-6 text-center mb-12">
          <span className="text-primary font-small uppercase tracking-widest block mb-2">From around the world</span>
          <h2 className="font-display text-h1 mb-4">Our Origins</h2>
          <p className="text-mocha-text max-w-2xl mx-auto">
            We source directly from farms across the globe's most celebrated coffee regions, building relationships that span generations.
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative rounded-xl overflow-hidden border border-chestnut/30">
            <div className="map-coffee-tint">
              <OriginMap />
            </div>
          </div>
        </div>
      </section>

      {/* Values — 3 cards */}
      <section ref={valuesRef} className="py-section-gap bg-espresso/50">
        <div className="max-w-max-width mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-primary font-small uppercase tracking-widest block mb-2">What We Stand For</span>
            <h2 className="font-display text-h1">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'handshake', title: 'Direct Trade', desc: 'We work directly with farmers, paying well above fair trade prices to ensure quality and sustainability from seed to cup.' },
              { icon: 'thermostat', title: 'Precision Roasting', desc: 'Every origin receives a custom roast profile developed through hundreds of test batches. Consistency is our signature.' },
              { icon: 'eco', title: 'Sustainability', desc: 'From compostable packaging to carbon-neutral shipping, we minimize our footprint while maximizing flavor.' },
            ].map((value) => (
              <div key={value.title} className="bg-espresso border border-chestnut/30 rounded-lg p-6 hover:border-primary transition-all duration-500 group">
                <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 mb-5">
                  <span className="material-symbols-outlined">{value.icon}</span>
                </div>
                <h3 className="text-h2 text-on-surface mb-3">{value.title}</h3>
                <p className="text-mocha-text font-body leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team — 4 person cards */}
      <section ref={teamRef} className="py-section-gap">
        <div className="max-w-max-width mx-auto px-6 text-center mb-12">
          <span className="text-primary font-small uppercase tracking-widest block mb-2">The People Behind the Ritual</span>
          <h2 className="font-display text-h1">Meet the Team</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto px-6">
          {team.map((person) => (
            <div key={person.name} className="text-center group">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-500 mb-4">
                <img className="w-full h-full object-cover" src={person.img} alt={person.name} />
              </div>
              <h3 className="font-bold text-on-surface">{person.name}</h3>
              <p className="text-mocha-text font-small text-sm">{person.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — same as home page NewsletterSection */}
      <section ref={ctaRef} className="py-section-gap bg-espresso">
        <div className="max-w-[600px] mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F0EB] tracking-tight">
            Begin your ritual
          </h2>
          <p className="text-[#B8A89A]">
            Not sure where to start? Take our quiz and discover the perfect roast for your palate.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/quiz"
              className="inline-flex items-center px-8 py-3 bg-primary-container text-on-primary-container font-bold rounded-lg hover:brightness-110 transition-all active:scale-[0.97]"
            >
              Take the Quiz <span className="material-symbols-outlined ml-2">arrow_forward</span>
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-3 border border-chestnut text-on-surface font-bold rounded-lg hover:bg-surface-variant transition-all"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

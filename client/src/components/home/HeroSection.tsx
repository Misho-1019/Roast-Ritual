import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const heroImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFwElf0hr9llpkY_vWfhBvIVTHPHsOQe35veYpDw9wGThUFZRubAfcj67G65Kq1zIz_CuCZSnvyy4ZwzhEs43X_BNGY3uuYP0NX6bR2Qwq0cpOgIz3vNUhPKfyRDPDWJEko13f7nEukbQPD5mQ64v9EzMsttVJiO9qBroTVh2b93xCZVN4GmjorvipubHBZNa58jP5lsOa2LBboR-PwozBsYyUa-SuYGIiuc_FYCMD0D12plVL4R2-4R0zwgY5GYaC4HiZ7Zuagyc=s0'

export default function HeroSection() {
  const ref = useScrollReveal<HTMLElement>()
  const imgRef = useRef<HTMLImageElement>(null)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const onScroll = () => setOffsetY(window.scrollY * 0.3)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={ref} className="relative min-h-[90dvh] flex items-center overflow-hidden">
      <div className="max-w-max-width mx-auto px-container-padding w-full grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        <div className="md:col-span-6 z-10 py-12">
          <h2 className="font-display text-display mb-6 leading-tight">
            Turn your coffee into a{' '}
            <span className="text-primary italic">ritual</span>
          </h2>
          <p className="font-body text-h2 text-secondary-mocha mb-10 max-w-lg">
            Discover single-origin coffees curated for your unique palate and brewing style.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary-container text-on-primary-container px-8 py-4 rounded-lg font-bold text-body hover:brightness-110 active:scale-95 transition-all flex items-center gap-2">
              Take the Quiz <span className="material-symbols-outlined">bolt</span>
            </button>
            <button className="border border-chestnut text-on-surface px-8 py-4 rounded-lg font-bold text-body hover:bg-surface-variant transition-all">
              View Collections
            </button>
          </div>
        </div>
        <div className="md:col-span-6 relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
          <img
            ref={imgRef}
            className="w-full h-full object-cover will-change-transform"
            src={heroImg}
            alt="Barista pouring latte art into a ceramic cup, warm moody lighting"
            style={{ transform: `translateY(${offsetY * 0.15}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </div>
      </div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
    </section>
  )
}

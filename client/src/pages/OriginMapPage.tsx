import OriginMap from '../components/map/OriginMap'

export default function OriginMapPage() {
  return (
    <div className="max-w-max-width mx-auto px-6 py-24 min-h-screen">
      <section className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block font-medium">From Soil to Cup</span>
        <h1 className="text-display text-on-surface mb-6">Coffee Origins</h1>
        <p className="text-mocha-text max-w-2xl mx-auto">
          Explore the regions where our single-origin coffees are grown. Each origin brings a unique flavor profile shaped by its soil, climate, and tradition.
        </p>
      </section>
      <OriginMap />
    </div>
  )
}

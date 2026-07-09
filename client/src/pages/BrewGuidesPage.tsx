import { Link } from 'react-router-dom'
import { brewMethods } from '../data/brewMethods'

const difficultyColors: Record<string, string> = {
  Easy: 'text-green-400 bg-green-500/10',
  Medium: 'text-yellow-400 bg-yellow-500/10',
  Hard: 'text-red-400 bg-red-500/10',
}

export default function BrewGuidesPage() {
  return (
    <div className="max-w-max-width mx-auto px-6 py-24 min-h-screen">
      <section className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block font-medium">The Ritual Series</span>
        <h1 className="text-display text-on-surface mb-6">Brew Guides</h1>
        <p className="text-mocha-text max-w-2xl mx-auto">
          Master the art of coffee brewing. Each guide includes step-by-step instructions with a built-in timer.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {brewMethods.map((method) => (
          <Link
            key={method.id}
            to={`/brew-guides/${method.id}`}
            className="bg-espresso border border-outline-variant/30 rounded-xl p-6 hover:border-primary/50 transition-all group"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">{method.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-h2 text-on-surface group-hover:text-primary transition-colors">{method.name}</h3>
                <p className="text-mocha-text text-sm mt-1">{method.shortDescription}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${difficultyColors[method.difficulty] || ''}`}>
                {method.difficulty}
              </span>
              <span className="text-mocha-text flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                {method.totalTime}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

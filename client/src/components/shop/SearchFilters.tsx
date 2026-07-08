interface SearchFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  roastLevel: string
  onRoastChange: (value: string) => void
  sortBy: string
  onSortChange: (value: string) => void
}

const roastLevels = ['All Levels', 'Light', 'Medium', 'Medium-Dark', 'Dark']
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low-High' },
  { value: 'price_desc', label: 'Price: High-Low' },
  { value: 'name_asc', label: 'Name: A-Z' },
]

export default function SearchFilters({ search, onSearchChange, roastLevel, onRoastChange, sortBy, onSortChange }: SearchFiltersProps) {
  return (
    <section className="sticky top-20 z-40 bg-background/80 backdrop-blur-sm border-b border-outline-variant/20">
      <div className="max-w-max-width mx-auto px-6 py-6 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
          <input
            className="w-full bg-espresso border border-outline-variant/40 rounded-lg pl-12 pr-4 py-3 text-on-surface placeholder:text-outline/60 focus:bg-background transition-all outline-none focus:border-primary"
            placeholder="Search collection..."
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-outline font-medium">Roast:</span>
            <select
              className="bg-espresso border border-outline-variant/40 rounded-lg px-4 py-2 text-on-surface appearance-none pr-10 relative focus:bg-background transition-all cursor-pointer outline-none focus:border-primary"
              value={roastLevel}
              onChange={(e) => onRoastChange(e.target.value)}
            >
              {roastLevels.map((level) => (
                <option key={level} value={level === 'All Levels' ? '' : level}>{level}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-outline font-medium">Sort:</span>
            <select
              className="bg-espresso border border-outline-variant/40 rounded-lg px-4 py-2 text-on-surface appearance-none pr-10 focus:bg-background transition-all cursor-pointer outline-none focus:border-primary"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  )
}

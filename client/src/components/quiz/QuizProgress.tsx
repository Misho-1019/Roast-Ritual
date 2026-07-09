export default function QuizProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex justify-between items-center mb-12">
      <span className="text-xs uppercase tracking-widest text-mocha-text font-medium">
        Step {current} of {total}
      </span>
      <div className="flex gap-1">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-700 ${
              i < current ? 'bg-primary' : 'bg-surface-container-highest'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

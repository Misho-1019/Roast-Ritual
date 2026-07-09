interface QuizQuestionProps {
  question: string
  options: { label: string; value: string }[]
  selectedValue?: string
  onSelect: (value: string) => void
}

export default function QuizQuestion({ question, options, selectedValue, onSelect }: QuizQuestionProps) {
  return (
    <div>
      <h2 className="text-h2 text-on-surface text-center mb-12">{question}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`p-5 rounded-xl text-left transition-all border ${
              selectedValue === option.value
                ? 'bg-primary/10 border-primary text-primary'
                : 'bg-espresso border-outline-variant text-on-surface hover:border-primary/50'
            }`}
          >
            <span className="font-bold text-sm">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

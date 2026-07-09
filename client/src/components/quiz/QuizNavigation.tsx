interface QuizNavigationProps {
  onBack: () => void
  onNext: () => void
  canGoBack: boolean
  canGoNext: boolean
  isLast: boolean
}

export default function QuizNavigation({ onBack, onNext, canGoBack, canGoNext, isLast }: QuizNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-outline-variant/30">
      <button
        onClick={onBack}
        disabled={!canGoBack}
        className="px-6 py-3 text-mocha-text hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-sm"
      >
        {'\u2190'} Back
      </button>
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className="bg-primary-container text-on-primary-container px-8 py-3 rounded-lg font-bold text-sm hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLast ? 'See My Match' : `Next \u2192`}
      </button>
    </div>
  )
}

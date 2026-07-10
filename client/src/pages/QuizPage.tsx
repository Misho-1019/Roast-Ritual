import { useState } from 'react'
import QuizProgress from '../components/quiz/QuizProgress'
import QuizQuestion from '../components/quiz/QuizQuestion'
import QuizNavigation from '../components/quiz/QuizNavigation'
import QuizResult from '../components/quiz/QuizResult'
import { questions, products, calculateMatch } from '../data/quizQuestions'

export default function QuizPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = questions[step]
  const totalQuestions = questions.length
  const selectedValue = answers[currentQuestion?.id]

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))
  }

  const handleNext = () => {
    if (step < totalQuestions - 1) {
      setStep((s) => s + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1)
  }

  const handleRestart = () => {
    setStep(0)
    setAnswers({})
    setShowResult(false)
  }

  if (showResult) {
    const matched = calculateMatch(answers)
    const otherProducts = products.filter((p) => p.slug !== matched.slug)
    return <QuizResult product={matched} onRestart={handleRestart} otherProducts={otherProducts} />
  }

  return (
    <div className="max-w-max-width mx-auto px-6 py-24 min-h-screen">
      {/* Atmospheric glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero */}
      <section className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block font-medium">
          The Sensory Experience
        </span>
        <h1 className="font-display text-[clamp(2.5rem,5vw,5rem)] text-on-surface mb-6 leading-tight">
          The Ritual Finder
        </h1>
        <p className="text-mocha-text max-w-2xl mx-auto">
          Discover the single-origin beans meticulously sourced for your unique palate. Every morning deserves a masterpiece.
        </p>
      </section>

      {/* Quiz Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-espresso border border-outline-variant/30 rounded-xl overflow-hidden shadow-2xl">
          {/* Progress bar */}
          <div className="w-full h-1 bg-surface-container-highest">
            <div
              className="h-full bg-primary transition-all duration-700 ease-out"
              style={{ width: `${((step + 1) / totalQuestions) * 100}%` }}
            />
          </div>
          <div className="p-8 md:p-16">
            <QuizProgress current={step + 1} total={totalQuestions} />
            <QuizQuestion
              question={currentQuestion.question}
              options={currentQuestion.options}
              selectedValue={selectedValue}
              onSelect={handleSelect}
            />
            <QuizNavigation
              onBack={handleBack}
              onNext={handleNext}
              canGoBack={step > 0}
              canGoNext={!!selectedValue}
              isLast={step === totalQuestions - 1}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

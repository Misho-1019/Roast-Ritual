import { useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import BrewTimer from '../components/brew/BrewTimer'
import { brewMethods } from '../data/brewMethods'

export default function BrewMethodPage() {
  const { id } = useParams<{ id: string }>()
  const method = brewMethods.find((m) => m.id === id)
  const [currentStep, setCurrentStep] = useState(0)

  const handleComplete = useCallback(() => {
    if (currentStep < (method?.steps.length || 1) - 1) {
      setCurrentStep((s) => s + 1)
    }
  }, [currentStep, method?.steps.length])

  const handleSkip = useCallback(() => {
    if (currentStep < (method?.steps.length || 1) - 1) {
      setCurrentStep((s) => s + 1)
    }
  }, [currentStep, method?.steps.length])

  if (!method) {
    return (
      <div className="max-w-max-width mx-auto px-6 py-24 text-center">
        <h1 className="text-h2 text-on-surface mb-4">Method not found</h1>
        <Link to="/brew-guides" className="text-primary hover:underline font-bold">Back to Brew Guides</Link>
      </div>
    )
  }

  const step = method.steps[currentStep]
  const isLastStep = currentStep === method.steps.length - 1

  return (
    <div className="max-w-2xl mx-auto px-6 py-24 min-h-screen">
      <Link to="/brew-guides" className="text-mocha-text hover:text-primary transition-colors text-sm mb-8 inline-block">
        &larr; Back to Brew Guides
      </Link>

      <div className="mb-10">
        <h1 className="text-h1 text-on-surface mb-2">{method.name}</h1>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-mocha-text">Difficulty: {method.difficulty}</span>
          <span className="text-mocha-text">Total: {method.totalTime}</span>
        </div>
      </div>

      <BrewTimer
        key={step.number}
        step={step.number}
        totalSteps={method.steps.length}
        duration={step.duration}
        instruction={step.instruction}
        onComplete={handleComplete}
        onSkip={handleSkip}
        isActive={currentStep === 0}
        isLast={isLastStep}
      />

      {isLastStep && currentStep === method.steps.length - 1 && (
        <div className="text-center mt-12">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
          </div>
          <h2 className="text-h2 text-on-surface mb-2">Brew Complete!</h2>
          <p className="text-mocha-text mb-6">Enjoy your perfectly crafted cup of coffee.</p>
          <Link to="/shop" className="bg-primary-container text-on-primary-container px-8 py-3 rounded-lg font-bold inline-block hover:brightness-110 transition-all">
            Shop Our Coffees
          </Link>
        </div>
      )}
    </div>
  )
}

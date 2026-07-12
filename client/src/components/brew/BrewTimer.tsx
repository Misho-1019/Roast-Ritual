import { useState, useEffect, useRef } from 'react'

interface BrewTimerProps {
  step: number
  totalSteps: number
  duration: number
  instruction: string
  onComplete: () => void
  onSkip: () => void
  isActive: boolean
  isLast: boolean
}

export default function BrewTimer({ step, totalSteps, duration, instruction, onComplete, onSkip, isActive, isLast }: BrewTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [running, setRunning] = useState(isActive)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setTimeLeft(duration)
    setRunning(isActive)
  }, [step, duration, isActive])

  useEffect(() => {
    if (!running || timeLeft <= 0) {
      if (timeLeft <= 0 && running) {
        setRunning(false)
        onComplete()
      }
      return
    }
    intervalRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, timeLeft, onComplete])

  const toggleTimer = () => setRunning((r) => !r)

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = 1 - timeLeft / duration
  const circumference = 2 * Math.PI * 54
  const offset = circumference * (1 - progress)

  return (
    <div className="bg-espresso border border-outline-variant/30 rounded-xl p-8 text-center">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs uppercase tracking-widest text-mocha-text font-medium">
          Step {step} of {totalSteps}
        </span>
        {timeLeft > 0 && (
          <span className="text-on-surface font-bold tabular-nums">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
        )}
      </div>

      {/* Circular timer */}
      <div className={`relative w-32 h-32 mx-auto mb-8 ${timeLeft <= 0 ? 'timer-glow' : ''}`}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" className="text-surface-container-highest" strokeWidth="6" />
          {timeLeft > 0 && (
            <circle
              cx="60" cy="60" r="54" fill="none" stroke="currentColor" className="text-primary transition-[stroke-dashoffset] duration-1000"
              strokeWidth="6" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          )}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {timeLeft > 0 ? (
            <span className="text-display text-primary font-bold">{timeLeft > 60 ? minutes : seconds}</span>
          ) : (
            <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          )}
        </div>
      </div>

      <p className="text-on-surface font-body mb-6 max-w-md mx-auto">{instruction}</p>

      <div className="flex justify-center gap-4">
        {timeLeft > 0 ? (
          <button onClick={toggleTimer} className="bg-primary-container text-on-primary-container px-8 py-3 rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all">
            <span className="material-symbols-outlined inline-block align-middle mr-1">{running ? 'pause' : 'play_arrow'}</span>
            {running ? 'Pause' : 'Start'}
          </button>
        ) : (
          <button onClick={onComplete} className="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all">
            {isLast ? 'Finish Brew' : 'Next Step'}
          </button>
        )}
        {timeLeft > 0 && (
          <button onClick={onSkip} className="text-mocha-text hover:text-primary transition-colors text-sm font-bold">
            Skip &rarr;
          </button>
        )}
      </div>
    </div>
  )
}

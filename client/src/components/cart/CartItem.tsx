import { useState, useRef, useCallback } from 'react'

interface CartItemProps {
  id: string
  name: string
  imageUrl: string
  quantity: number
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export default function CartItem({ id, name, imageUrl, quantity, onUpdateQuantity, onRemove }: CartItemProps) {
  const [swipeX, setSwipeX] = useState(0)
  const touchStart = useRef(0)
  const swiping = useRef(false)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX
    swiping.current = false
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchStart.current
    if (Math.abs(dx) > 10) swiping.current = true
    if (swiping.current) {
      setSwipeX(Math.max(-80, Math.min(0, dx - 10)))
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (swipeX < -40) {
      onRemove(id)
    }
    setSwipeX(0)
    swiping.current = false
  }, [swipeX, id, onRemove])

  return (
    <div
      className="bg-espresso rounded-lg border border-chestnut/30 p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center group hover:border-primary transition-colors animate-[fadeIn_0.3s_ease] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ transform: `translateX(${swipeX}px)`, transition: swiping.current ? 'none' : 'transform 0.2s ease' }}
    >
      <div className="md:col-span-6 flex items-center gap-4">
        <div className="w-24 h-24 rounded overflow-hidden shrink-0 bg-surface-container-low border border-outline-variant">
          {imageUrl ? (
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={imageUrl} alt={name} />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary/30">local_cafe</span>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-bold text-on-surface">{name}</h3>
          <p className="font-small text-mocha-text text-xs mt-1 uppercase tracking-widest">12oz Bag</p>
          <button onClick={() => onRemove(id)} className="md:hidden text-error font-small text-xs mt-2 flex items-center gap-1" aria-label={`Remove ${name} from cart`}>
            <span className="material-symbols-outlined text-sm">delete</span> Remove
          </button>
        </div>
      </div>
      <div className="flex md:justify-center items-center gap-2">
        <div className="flex items-center border border-chestnut/50 rounded-lg">
          <button onClick={() => onUpdateQuantity(id, quantity - 1)} className="px-3 py-1.5 text-on-surface hover:text-primary transition-colors" aria-label={`Decrease quantity of ${name}`}>
            <span className="material-symbols-outlined text-sm">remove</span>
          </button>
          <span className="px-3 py-1.5 text-on-surface font-bold min-w-[2rem] text-center text-sm">{quantity}</span>
          <button onClick={() => onUpdateQuantity(id, quantity + 1)} className="px-3 py-1.5 text-on-surface hover:text-primary transition-colors" aria-label={`Increase quantity of ${name}`}>
            <span className="material-symbols-outlined text-sm">add</span>
          </button>
        </div>
      </div>
      <button onClick={() => onRemove(id)} className="hidden md:block text-mocha-text hover:text-error transition-colors absolute right-4 top-4" aria-label={`Remove ${name} from cart`}>
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  )
}

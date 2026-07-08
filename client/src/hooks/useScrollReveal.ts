import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null!)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-1000')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('opacity-0', 'translate-y-10')
          el.classList.add('opacity-100', 'translate-y-0')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

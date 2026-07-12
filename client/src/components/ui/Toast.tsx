import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
  action?: { label: string; onClick: () => void }
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (message: string, type?: Toast['type'], action?: Toast['action']) => void
  removeToast: (id: number) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

let nextId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback((message: string, type: Toast['type'] = 'info', action?: Toast['action']) => {
    const id = nextId++
    setToasts((prev) => [...prev, { id, message, type, action }])
    setTimeout(() => removeToast(id), 4000)
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-5 py-3.5 rounded-lg shadow-lg text-sm font-bold toast-enter ${
              toast.type === 'success'
                ? 'bg-green-700 text-white'
                : toast.type === 'error'
                ? 'bg-error text-white'
                : 'bg-espresso border border-chestnut/30 text-on-surface'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
              </span>
              {toast.message}
              {toast.action && (
                <button
                  onClick={() => { toast.action!.onClick(); removeToast(toast.id) }}
                  className="ml-2 text-primary font-bold hover:brightness-110 transition-all text-xs uppercase tracking-wider"
                >
                  {toast.action.label}
                </button>
              )}
              <button onClick={() => removeToast(toast.id)} className="ml-auto opacity-60 hover:opacity-100">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

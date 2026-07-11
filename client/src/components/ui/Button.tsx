interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

export function Button({ variant = 'primary', size = 'md', children, onClick, type = 'button', className = '' }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-bold rounded-lg transition-all'
  const variants = {
    primary: 'bg-primary text-on-primary hover:brightness-110 active:scale-95',
    secondary: 'border border-chestnut text-on-surface hover:bg-surface-variant active:scale-95',
    ghost: 'text-on-surface-variant hover:text-primary',
  }
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-body',
    lg: 'px-8 py-4 text-body',
  }
  return (
    <button type={type} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

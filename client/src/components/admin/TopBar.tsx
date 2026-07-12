import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { api } from '../../lib/api'

interface TopBarProps {
  onToggleSidebar: () => void
}

interface NotificationItem {
  type: string
  message: string
  link: string
}

export default function TopBar({ onToggleSidebar }: TopBarProps) {
  const user = useAuthStore((s) => s.user)
  const location = useLocation()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifs, setNotifs] = useState<{ newOrders: number; lowStockItems: number; items: NotificationItem[] }>({ newOrders: 0, lowStockItems: 0, items: [] })
  const [lastSeen, setLastSeen] = useState(() => Number(localStorage.getItem('notifSeen') || '0'))
  const bellRef = useRef<HTMLDivElement>(null)

  const adminPages = ['/admin/products', '/admin/orders', '/admin/customers']
  const isAdminPage = adminPages.includes(location.pathname)

  useEffect(() => {
    if (isAdminPage) {
      const params = new URLSearchParams(location.search)
      setSearch(params.get('q') || '')
    } else {
      setSearch('')
    }
  }, [location.pathname, location.search, isAdminPage])

  const handleSearchChange = (value: string) => {
    setSearch(value)
    if (isAdminPage) {
      navigate(`${location.pathname}?q=${encodeURIComponent(value)}`, { replace: true })
    }
  }

  useEffect(() => {
    api.get<{ newOrders: number; lowStockItems: number; items: NotificationItem[] }>('/admin/notifications')
      .then(setNotifs)
      .catch(console.error)
    const interval = setInterval(() => {
      api.get<{ newOrders: number; lowStockItems: number; items: NotificationItem[] }>('/admin/notifications')
        .then(setNotifs)
        .catch(console.error)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'A'

  const totalNotifs = notifs.newOrders + notifs.lowStockItems
  const unseenNotifs = Math.max(0, totalNotifs - lastSeen)

  return (
    <header className="sticky top-0 z-20 bg-surface/95 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-6 h-20">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button onClick={onToggleSidebar} className="text-on-surface-variant hover:text-primary transition-colors lg:hidden">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="relative w-full group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
          <input
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-12 pr-4 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            placeholder={isAdminPage ? 'Filter current page...' : 'Search orders, rituals, or stock...'}
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <nav className="hidden lg:flex items-center gap-8 mr-8 border-r border-outline-variant pr-8">
          <a className="text-on-surface-variant hover:text-primary transition-all font-medium text-sm" href="/admin/products">Inventory</a>
          <a className="text-on-surface-variant hover:text-primary transition-all font-medium text-sm" href="/admin/orders">Wholesale</a>
        </nav>
        <div className="relative" ref={bellRef}>
          <button onClick={() => { setNotifOpen(!notifOpen); if (!notifOpen) { const n = totalNotifs; setLastSeen(n); localStorage.setItem('notifSeen', String(n)) } }} className="relative text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            {unseenNotifs > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {unseenNotifs > 9 ? '9+' : unseenNotifs}
              </span>
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-10 w-80 bg-espresso border border-outline-variant rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-outline-variant">
                <p className="font-bold text-on-surface text-sm">Notifications</p>
              </div>
              {notifs.items.length === 0 ? (
                <div className="px-4 py-6 text-center text-mocha-text text-sm">No new notifications</div>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  {notifs.items.map((item, i) => (
                    <a
                      key={i}
                      href={item.link}
                      onClick={() => setNotifOpen(false)}
                      className={`block px-4 py-3 hover:bg-surface-container/50 transition-colors border-b border-outline-variant/30 last:border-0 ${item.type === 'new_order' ? 'border-l-2 border-l-primary' : 'border-l-2 border-l-yellow-500'}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`material-symbols-outlined text-sm mt-0.5 ${item.type === 'new_order' ? 'text-primary' : 'text-yellow-500'}`}>
                          {item.type === 'new_order' ? 'shopping_bag' : 'inventory'}
                        </span>
                        <p className="text-on-surface text-sm">{item.message}</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="font-bold text-on-surface text-sm leading-tight">{user?.name || 'Admin'}</p>
            <p className="text-mocha-text font-small text-xs leading-tight">{user?.email || 'Administrator'}</p>
          </div>
          <div className="w-10 h-10 rounded-full border border-outline-variant overflow-hidden group-hover:border-primary transition-colors bg-chestnut/30 flex items-center justify-center text-primary font-bold text-sm">
            {initials}
          </div>
        </div>
      </div>
    </header>
  )
}

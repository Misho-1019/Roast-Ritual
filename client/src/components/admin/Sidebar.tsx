import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', to: '/admin' },
  { label: 'Products', icon: 'inventory_2', to: '/admin/products' },
  { label: 'Orders', icon: 'receipt_long', to: '/admin/orders' },
  { label: 'Customers', icon: 'group', to: '/admin/customers' },
  { label: 'Analytics', icon: 'analytics', to: '/admin/analytics' },
  { label: 'Settings', icon: 'settings', to: '/admin/settings' },
]

interface SidebarProps {
  collapsed: boolean
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <aside
      className={`bg-espresso border-r border-outline-variant flex flex-col h-full transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className={`mb-10 px-4 pt-8 ${collapsed ? 'text-center' : 'px-4'}`}>
        {collapsed ? (
          <Link to="/admin" className="text-primary font-display font-extrabold text-xl">R&R</Link>
        ) : (
          <Link to="/admin">
            <h1 className="font-display text-h2 text-primary">Roast & Ritual</h1>
            <p className="text-mocha-text font-small uppercase tracking-widest mt-1 text-xs">Artisanal Coffee</p>
          </Link>
        )}
      </div>
      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || (item.to !== '/admin' && location.pathname.startsWith(item.to))
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors group ${
                isActive
                  ? 'text-primary bg-surface-container-high border-r-2 border-primary'
                  : 'text-mocha-text hover:text-primary hover:bg-surface-container-high'
              } ${collapsed ? 'justify-center px-0' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {!collapsed && <span className="ml-3 font-body text-body">{item.label}</span>}
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto pt-8 px-4 border-t border-outline-variant space-y-1 pb-6">
        {!collapsed && (
          <button className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold mb-6 hover:brightness-110 active:scale-95 transition-all">
            Create Order
          </button>
        )}
        <a className={`flex items-center text-mocha-text hover:text-primary transition-colors ${collapsed ? 'justify-center' : 'px-4 py-2'}`} href="#">
          <span className="material-symbols-outlined">help</span>
          {!collapsed && <span className="ml-3 font-body">Help</span>}
        </a>
        <button onClick={handleLogout} className={`flex items-center text-mocha-text hover:text-primary transition-colors w-full ${collapsed ? 'justify-center' : 'px-4 py-2'}`}>
          <span className="material-symbols-outlined">logout</span>
          {!collapsed && <span className="ml-3 font-body">Sign Out</span>}
        </button>
      </div>
    </aside>
  )
}

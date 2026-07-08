interface TopBarProps {
  onToggleSidebar: () => void
}

const avatarImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAzvfP62RSZzgSrY8tgaMv6q34Cbvs7fp5Uz1U-8rdPMiCmSqkE_rSepWOOf0rXonYS9AWz74SlFOQfhNaAfjuAZn15PmcU7NkpMTVBh4rBywrnaeKvDVqO0-Btj7G9lxcni11ID9kq_sfwnCWcgWjfehlgkkSkVRPF031SWfPEnvlHJKcHfbgyrCAwwej2b0NC9ohqnGxjqGt8zeAGnzyfum3gKQvAm84ev4L3mBeLECI8rQxiBDUznkDJanFriZ0qiVKYKqcYc0'

export default function TopBar({ onToggleSidebar }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 bg-surface/95 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-6 h-20">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={onToggleSidebar}
          className="text-on-surface-variant hover:text-primary transition-colors lg:hidden"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="relative w-full group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
          <input
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-12 pr-4 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            placeholder="Search orders, rituals, or stock..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <nav className="hidden lg:flex items-center gap-8 mr-8 border-r border-outline-variant pr-8">
          <a className="text-on-surface-variant hover:text-primary transition-all font-medium text-sm" href="#">Inventory</a>
          <a className="text-on-surface-variant hover:text-primary transition-all font-medium text-sm" href="#">Wholesale</a>
          <a className="text-on-surface-variant hover:text-primary transition-all font-medium text-sm" href="#">Rituals</a>
        </nav>
        <button className="relative text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="font-bold text-on-surface text-sm leading-tight">Admin</p>
            <p className="text-mocha-text font-small text-xs leading-tight">Elite Roaster</p>
          </div>
          <div className="w-10 h-10 rounded-full border border-outline-variant overflow-hidden group-hover:border-primary transition-colors">
            <img className="w-full h-full object-cover" src={avatarImg} alt="Admin avatar" />
          </div>
        </div>
      </div>
    </header>
  )
}

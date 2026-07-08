import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const coffeeBg = 'https://lh3.googleusercontent.com/aida/AP1WRLtMzB_9e3zXoQGzMuWTmwN_-hSK68mK4My2cjdp99jy2LbUekGs4QnZCxd59oNmZIIlVWyTtarLxUXropjKrHGdJOI0Dym6DgfWCB0RBoIAR_AiXAY74m7uOoa_zXNPn1hhci1zJrzHC7piMwYGtnyD_p1nYsvAjdUcy7fpFc-b0iuj72AxhE1idDJ1W0JCEze-lHKc5cC49n53HPsQQdXxsrpoAt4zEdzgcQyvy5aAPK9kmH1HLfV-iDo'

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('adminSidebar') === 'collapsed'
  })

  useEffect(() => {
    localStorage.setItem('adminSidebar', sidebarCollapsed ? 'collapsed' : 'open')
  }, [sidebarCollapsed])

  return (
    <div className="h-screen overflow-hidden bg-background antialiased relative">
      {/* Coffee background image - very subtle */}
      <div
        className="fixed inset-0 opacity-[0.15] pointer-events-none z-0"
        style={{
          backgroundImage: `url(${coffeeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Coffee pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: 'radial-gradient(#1C1512 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.2,
        }}
      />
      {/* Atmospheric glow */}
      <div
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(212, 160, 74, 0.05) 0%, transparent 70%)',
        }}
      />
      {/* Layout */}
      <div className="flex h-full relative z-10">
        <Sidebar collapsed={sidebarCollapsed} />
        <div className="flex-1 flex flex-col h-full overflow-y-auto transition-all duration-300">
          <TopBar onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <main className="p-6 space-y-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

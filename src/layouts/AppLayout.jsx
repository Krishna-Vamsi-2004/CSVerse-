// src/layouts/AppLayout.jsx
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-white text-[#180018] font-body antialiased selection:bg-[#180060] selection:text-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex max-w-[1440px] w-full mx-auto">
        {/* Sidebar: hidden on mobile, visible on lg+ */}
        <aside className="hidden lg:block w-72 shrink-0 border-r border-[#180060]/10 bg-slate-50/50">
          <Sidebar />
        </aside>
        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 bg-white min-w-0" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

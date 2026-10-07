// src/layouts/AppLayout.jsx
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-body antialiased selection:bg-red-600 selection:text-white flex flex-col relative">
      <Navbar />
      {/* Main Content Area - Full Width */}
      <main className="flex-1 w-full" id="main-content">
        <Outlet />
      </main>
    </div>
  )
}

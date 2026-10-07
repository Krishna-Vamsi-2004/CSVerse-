// src/components/Navbar.jsx
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import { HiMenu, HiX, HiChip, HiArrowRight, HiChartBar } from 'react-icons/hi'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-red-600 shadow-sm h-[72px] flex items-center text-slate-900 font-heading">
      <nav aria-label="Main navigation" className="max-w-[1440px] w-full mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand Logo — links back to landing */}
        <Link to="/" className="flex items-center gap-3 font-black text-xl tracking-tight text-slate-900 hover:opacity-90 transition-opacity">
          <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-mono text-xs font-bold shadow-md shadow-red-500/20 border border-red-500">
            <HiChip className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-black tracking-tight text-slate-900">
            CSVerse <span className="text-red-600">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-2 list-none m-0 p-0 text-sm font-semibold">
          {MODULE_REGISTRY.map((mod) => (
            <li key={mod.id}>
              <NavLink
                to={`/app/${mod.id}`}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-500/25 scale-105'
                      : 'text-slate-700 hover:bg-red-50 hover:text-red-600'
                  }`
                }
              >
                {mod.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              to="/app/progress"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-500/25 scale-105'
                    : 'text-slate-700 hover:bg-red-50 hover:text-red-600'
                }`
              }
            >
              <HiChartBar className="w-3.5 h-3.5 text-red-600" />
              Progress
            </NavLink>
          </li>
        </ul>

        {/* Right Action: Landing Return Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/"
            className="px-4 py-2 rounded-xl bg-white border border-red-200 hover:border-red-600 text-slate-900 hover:text-red-600 text-xs font-bold transition-all flex items-center gap-2 hover:scale-105 shadow-2xs"
          >
            <span>Landing Page</span>
            <HiArrowRight className="w-3.5 h-3.5 text-red-600" />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-900 hover:bg-red-50 transition-colors"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <HiX className="text-xl text-slate-900" aria-hidden="true" /> : <HiMenu className="text-xl text-slate-900" aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white border-b border-slate-200 px-4 py-4 shadow-2xl animate-in fade-in duration-150">
          <ul className="flex flex-col gap-2 list-none m-0 p-0 font-heading">
            {MODULE_REGISTRY.map((mod) => (
              <li key={mod.id}>
                <NavLink
                  to={`/app/${mod.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                      isActive
                        ? 'bg-red-600 text-white'
                        : 'text-slate-800 hover:bg-red-50 hover:text-red-600'
                    }`
                  }
                >
                  {mod.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/app/progress"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'text-slate-800 hover:bg-red-50 hover:text-red-600'
                  }`
                }
              >
                Progress Dashboard
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

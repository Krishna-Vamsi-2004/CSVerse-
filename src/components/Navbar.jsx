// src/components/Navbar.jsx
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import { HiMenu, HiX, HiChip, HiArrowRight } from 'react-icons/hi'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#180060]/10 shadow-xs h-[72px] flex items-center">
      <nav aria-label="Main navigation" className="max-w-[1440px] w-full mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand Logo — links back to landing */}
        <Link to="/" className="flex items-center gap-3 font-bold text-xl font-heading text-[#180018] hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 rounded-[11px] bg-[#180060] text-white flex items-center justify-center font-mono text-xs font-bold shadow-sm border border-[#90c0d8]/30">
            <HiChip className="w-5 h-5 text-[#90c0d8]" />
          </div>
          <span>CSVerse AI</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-2 list-none m-0 p-0 font-heading text-sm font-medium">
          {MODULE_REGISTRY.map((mod) => (
            <li key={mod.id}>
              <NavLink
                to={`/app/${mod.id}`}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-[13px] text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#180060] text-white shadow-xs'
                      : 'text-[#303048] hover:bg-slate-100 hover:text-[#180018]'
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
                `px-3.5 py-2 rounded-[13px] text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#180060] text-white shadow-xs'
                    : 'text-[#303048] hover:bg-slate-100 hover:text-[#180018]'
                }`
              }
            >
              Progress
            </NavLink>
          </li>
        </ul>

        {/* Right Action: Landing Return Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/" className="td-btn-secondary text-xs px-4 py-2 min-h-[38px]">
            Landing Page
            <HiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden p-2 rounded-[11px] border border-[#180060]/20 text-[#180018] hover:bg-[#180060]/5 transition-colors"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <HiX className="text-xl" aria-hidden="true" /> : <HiMenu className="text-xl" aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white border-b border-[#180060]/10 px-4 py-4 shadow-lg animate-in fade-in duration-150">
          <ul className="flex flex-col gap-2 list-none m-0 p-0 font-heading">
            {MODULE_REGISTRY.map((mod) => (
              <li key={mod.id}>
                <NavLink
                  to={`/app/${mod.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-[11px] text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#180060] text-white'
                        : 'text-[#303048] hover:bg-slate-100'
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
                  `block px-4 py-2.5 rounded-[11px] text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#180060] text-white'
                      : 'text-[#303048] hover:bg-slate-100'
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

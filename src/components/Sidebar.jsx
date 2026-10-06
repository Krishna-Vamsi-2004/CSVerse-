// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import { HiChevronRight, HiChip, HiDatabase, HiGlobe, HiDesktopComputer } from 'react-icons/hi'

const MOD_MODULE_ICONS = {
  dsa: HiChip,
  dbms: HiDatabase,
  networking: HiGlobe,
  os: HiDesktopComputer,
}

export default function Sidebar() {
  return (
    <nav
      aria-label="Topic navigation"
      className="sticky top-[72px] h-[calc(100vh-4.5rem)] overflow-y-auto p-4 space-y-6"
    >
      {MODULE_REGISTRY.map((mod) => {
        const ModIcon = MOD_MODULE_ICONS[mod.id] || HiChip
        return (
          <div key={mod.id} className="space-y-2">
            <div className="flex items-center gap-2 px-2 py-1 text-xs font-heading font-bold uppercase tracking-wider text-[#180060]">
              <ModIcon className="w-4 h-4 text-[#180060]" />
              <span>{mod.label}</span>
            </div>

            {/* Grouped Topics */}
            {mod.groups ? (
              mod.groups.map((group) => (
                <div key={group.label} className="space-y-1 pl-2">
                  <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-[#487890] px-2 pt-2 pb-1">
                    {group.label}
                  </p>
                  <ul className="space-y-0.5 list-none p-0 m-0">
                    {group.topics.map((topic) => (
                      <li key={topic.id}>
                        <NavLink
                          to={`/app/${mod.id}/${topic.id}`}
                          className={({ isActive }) =>
                            `flex items-center justify-between px-3 py-1.5 rounded-[11px] text-xs font-heading font-medium transition-all ${
                              isActive
                                ? 'bg-[#180060] text-white shadow-xs font-semibold'
                                : 'text-[#303048] hover:bg-slate-100 hover:text-[#180018]'
                            }`
                          }
                        >
                          <span className="truncate">{topic.label}</span>
                          <HiChevronRight className="w-3 h-3 opacity-60 shrink-0" />
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              /* Flat Topics */
              <ul className="space-y-0.5 list-none p-0 m-0 pl-2">
                {mod.topics.map((topic) => (
                  <li key={topic.id}>
                    <NavLink
                      to={`/app/${mod.id}/${topic.id}`}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-1.5 rounded-[11px] text-xs font-heading font-medium transition-all ${
                          isActive
                            ? 'bg-[#180060] text-white shadow-xs font-semibold'
                            : 'text-[#303048] hover:bg-slate-100 hover:text-[#180018]'
                        }`
                      }
                    >
                      <span className="truncate">{topic.label}</span>
                      <HiChevronRight className="w-3 h-3 opacity-60 shrink-0" />
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )
}

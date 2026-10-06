// src/pages/HomePage.jsx
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import {
  HiLightningBolt, HiChartBar, HiArrowRight, HiSearch,
  HiX, HiChip, HiDatabase, HiGlobe, HiDesktopComputer,
  HiSparkles, HiPlay, HiCode, HiAcademicCap, HiChevronRight,
} from 'react-icons/hi'

const LIVE_VIZ = new Set(['dsa', 'dbms'])

const MOD_ICONS = {
  dsa:        HiChip,
  dbms:       HiDatabase,
  networking: HiGlobe,
  os:         HiDesktopComputer,
}

const MOD_COLORS = {
  dsa:        { border: 'border-[#180060]/20', bg: 'bg-[#180060]/5', icon: 'text-[#180060]', badge: 'bg-[#180060] text-white', tag: 'bg-[#180060]/10 text-[#180060]' },
  dbms:       { border: 'border-[#180018]/20', bg: 'bg-[#180018]/5', icon: 'text-[#180018]', badge: 'bg-[#180018] text-white', tag: 'bg-[#180018]/10 text-[#180018]' },
  networking: { border: 'border-[#487890]/20', bg: 'bg-[#487890]/5', icon: 'text-[#487890]', badge: 'bg-[#487890] text-white', tag: 'bg-[#487890]/10 text-[#487890]' },
  os:         { border: 'border-[#180060]/20', bg: 'bg-[#180060]/5', icon: 'text-[#180060]', badge: 'bg-[#180060] text-white', tag: 'bg-[#180060]/10 text-[#180060]' },
}

const ALL_TOPICS = MODULE_REGISTRY.flatMap((mod) =>
  mod.topics.map((t) => ({ ...t, moduleId: mod.id, moduleLabel: mod.label }))
)

function SearchResults({ results, onClose }) {
  if (!results.length) return (
    <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-[#180060]/15 rounded-[13px] shadow-lg z-50 px-4 py-6 text-center">
      <p className="text-xs text-[#487890] font-heading font-medium">No matching CS topics found</p>
    </div>
  )
  return (
    <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-[#180060]/15 rounded-[13px] shadow-xl z-50 overflow-hidden max-h-72 overflow-y-auto">
      {results.map((r) => {
        const colors = MOD_COLORS[r.moduleId] ?? MOD_COLORS.dsa
        return (
          <Link
            key={`${r.moduleId}-${r.id}`}
            to={`/app/${r.moduleId}/${r.id}`}
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
          >
            <HiChip className="w-5 h-5 text-[#180060] shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold font-heading text-[#180018] truncate">{r.label}</p>
              <p className="text-[11px] text-[#487890] font-body">{r.moduleLabel}</p>
            </div>
            <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-[7px] shrink-0 ${colors.tag}`}>
              {r.moduleId.toUpperCase()}
            </span>
          </Link>
        )
      })}
    </div>
  )
}

function ModuleCard({ mod }) {
  const isLive  = LIVE_VIZ.has(mod.id)
  const colors  = MOD_COLORS[mod.id] ?? MOD_COLORS.dsa
  const Icon    = MOD_ICONS[mod.id] ?? HiChip

  return (
    <Link
      to={`/app/${mod.id}`}
      className={`group flex flex-col bg-white rounded-[13px] border p-6 hover:shadow-xl transition-all ${colors.border}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-[11px] flex items-center justify-center ${colors.bg} border border-[#180060]/10`}>
          <Icon className={`text-2xl ${colors.icon}`} />
        </div>
        <div className="flex flex-col items-end gap-1 font-mono">
          <span className="text-[10px] font-bold text-[#487890] uppercase tracking-wider">
            Phase {mod.phase}
          </span>
          {isLive ? (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-[7px] ${colors.badge}`}>
              3D Live
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-[7px] bg-[#90c0d8] text-[#180018]">
              AI Active
            </span>
          )}
        </div>
      </div>

      <h3 className="font-heading font-bold text-lg text-[#180018] mb-2 group-hover:text-[#180060] transition-colors flex items-center justify-between">
        <span>{mod.label}</span>
        <HiChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </h3>

      <p className="text-xs text-[#303048] mb-4 font-body leading-relaxed flex-1">
        {mod.id === 'dsa' && 'Arrays, Linked Lists, Stacks, Queues, Sorting & Search algorithms with 3D memory visualization.'}
        {mod.id === 'dbms' && 'SQL basics, JOIN visualizers, Normalization, ACID transactions, and B-Tree indexing.'}
        {mod.id === 'networking' && 'OSI 7-layer model, TCP/IP stack, Packet flow animations, DNS resolution, and security.'}
        {mod.id === 'os' && 'CPU scheduling algorithms, Process synchronization, Memory management, and Virtual Memory.'}
      </p>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-heading font-semibold text-[#180060]">
        <span>{mod.topics.length} Interactive Topics</span>
        <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          Open Module <HiArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  )
}

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return ALL_TOPICS.filter((t) =>
      t.label.toLowerCase().includes(q) || t.moduleId.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="space-y-10 max-w-[1200px] mx-auto pb-12 font-body">
      
      {/* Hero Welcome Banner */}
      <div className="td-navy-card p-8 md:p-12 rounded-[13px] relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#90c0d8] text-xs font-mono font-bold uppercase tracking-wider border border-[#90c0d8]/30">
            <HiSparkles className="w-4 h-4" /> CSVerse AI Learning Engine v2.0
          </div>
          <h1 className="td-h2 text-white">
            Master Computer Science Visually.
          </h1>
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-body">
            Explore interactive algorithm simulations, query execution, and Gemini AI voice explanations across 4 core CS domains.
          </p>

          {/* Search Box */}
          <div className="relative pt-2 max-w-lg">
            <div className="flex items-center gap-2 bg-white rounded-[13px] px-4 py-3 border border-white/20 shadow-lg text-[#180018]">
              <HiSearch className="w-5 h-5 text-[#180060] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                placeholder="Search topics (Bubble Sort, SQL JOINs, OSI Model)..."
                className="w-full bg-transparent text-xs md:text-sm text-[#180018] placeholder-[#487890] focus:outline-none font-body"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-[#487890] hover:text-[#180018]"
                >
                  <HiX className="w-4 h-4" />
                </button>
              )}
            </div>

            {isFocused && query && (
              <SearchResults
                results={searchResults}
                onClose={() => { setIsFocused(false); setQuery('') }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Quick Jump Quick-Start Visualizers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#180060]/10 pb-3">
          <h2 className="font-heading font-bold text-xl text-[#180018] flex items-center gap-2">
            <HiLightningBolt className="w-5 h-5 text-[#180060]" />
            Quick-Start Visualizers
          </h2>
          <span className="text-xs text-[#487890] font-heading font-semibold uppercase tracking-wider">
            Interactive Simulations
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/app/dsa/bubblesort"
            className="p-5 rounded-[13px] bg-white border border-[#180060]/15 hover:border-[#180060] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-[9px] bg-[#180060] text-white flex items-center justify-center font-bold">
                <HiChip className="w-4 h-4 text-[#90c0d8]" />
              </div>
              <h3 className="font-heading font-bold text-sm text-[#180018] group-hover:text-[#180060] transition-colors">
                Bubble Sort Visualizer
              </h3>
              <p className="text-xs text-[#303048]">Step-by-step array comparison & swap engine.</p>
            </div>
            <span className="text-xs font-heading font-bold text-[#180060] pt-4 inline-flex items-center gap-1">
              Launch <HiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            to="/app/dsa/arrays"
            className="p-5 rounded-[13px] bg-white border border-[#180060]/15 hover:border-[#180060] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-[9px] bg-[#180018] text-white flex items-center justify-center font-bold">
                <HiCode className="w-4 h-4 text-[#90c0d8]" />
              </div>
              <h3 className="font-heading font-bold text-sm text-[#180018] group-hover:text-[#180060] transition-colors">
                Array Operations
              </h3>
              <p className="text-xs text-[#303048]">Memory insertion, deletion, and index lookups.</p>
            </div>
            <span className="text-xs font-heading font-bold text-[#180060] pt-4 inline-flex items-center gap-1">
              Launch <HiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            to="/app/dbms/sql-basics"
            className="p-5 rounded-[13px] bg-white border border-[#180060]/15 hover:border-[#180060] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-[9px] bg-[#180060] text-white flex items-center justify-center font-bold">
                <HiDatabase className="w-4 h-4 text-[#90c0d8]" />
              </div>
              <h3 className="font-heading font-bold text-sm text-[#180018] group-hover:text-[#180060] transition-colors">
                SQL Query Visualizer
              </h3>
              <p className="text-xs text-[#303048]">Visual table query execution & filter engine.</p>
            </div>
            <span className="text-xs font-heading font-bold text-[#180060] pt-4 inline-flex items-center gap-1">
              Launch <HiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            to="/app/progress"
            className="p-5 rounded-[13px] bg-white border border-[#180060]/15 hover:border-[#180060] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-[9px] bg-[#487890] text-white flex items-center justify-center font-bold">
                <HiChartBar className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-heading font-bold text-sm text-[#180018] group-hover:text-[#180060] transition-colors">
                Progress Dashboard
              </h3>
              <p className="text-xs text-[#303048]">Track topic completion & quiz performance.</p>
            </div>
            <span className="text-xs font-heading font-bold text-[#180060] pt-4 inline-flex items-center gap-1">
              View Stats <HiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>

      {/* Modules Registry Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#180060]/10 pb-3">
          <h2 className="font-heading font-bold text-xl text-[#180018]">
            Computer Science Learning Modules
          </h2>
          <span className="text-xs text-[#487890] font-heading font-semibold uppercase tracking-wider">
            All 4 Domains
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MODULE_REGISTRY.map((mod) => (
            <ModuleCard key={mod.id} mod={mod} />
          ))}
        </div>
      </div>
    </div>
  )
}

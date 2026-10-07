// src/pages/HomePage.jsx
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import {
  HiLightningBolt, HiChartBar, HiArrowRight, HiSearch,
  HiX, HiChip, HiDatabase, HiGlobe, HiDesktopComputer,
  HiSparkles, HiPlay, HiAcademicCap, HiBookOpen,
} from 'react-icons/hi'

const LIVE_VIZ = new Set(['dsa', 'dbms'])

const MOD_ICONS = {
  dsa:        HiChip,
  dbms:       HiDatabase,
  networking: HiGlobe,
  os:         HiDesktopComputer,
}

const MOD_COLORS = {
  dsa:        { border: 'border-red-200', bg: 'bg-red-50/60', icon: 'text-red-600', badge: 'bg-red-600 text-white', tag: 'bg-red-100 text-red-700' },
  dbms:       { border: 'border-red-200', bg: 'bg-red-50/60', icon: 'text-red-600', badge: 'bg-red-600 text-white', tag: 'bg-red-100 text-red-700' },
  networking: { border: 'border-red-200', bg: 'bg-red-50/60', icon: 'text-red-600', badge: 'bg-red-600 text-white', tag: 'bg-red-100 text-red-700' },
  os:         { border: 'border-red-200', bg: 'bg-red-50/60', icon: 'text-red-600', badge: 'bg-red-600 text-white', tag: 'bg-red-100 text-red-700' },
}

const ALL_TOPICS = MODULE_REGISTRY.flatMap((mod) =>
  mod.topics.map((t) => ({ ...t, moduleId: mod.id, moduleLabel: mod.label }))
)

function SearchResults({ results, onClose }) {
  if (!results.length) return (
    <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-red-200 rounded-[13px] shadow-lg z-50 px-4 py-6 text-center">
      <p className="text-xs text-slate-500 font-heading font-medium">No matching CS topics found</p>
    </div>
  )
  return (
    <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-red-200 rounded-[13px] shadow-xl z-50 overflow-hidden max-h-72 overflow-y-auto">
      {results.map((r) => {
        const colors = MOD_COLORS[r.moduleId] ?? MOD_COLORS.dsa
        return (
          <Link
            key={`${r.moduleId}-${r.id}`}
            to={`/app/${r.moduleId}/${r.id}`}
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 hover:bg-red-50/50 transition-colors border-b border-slate-100 last:border-0"
          >
            <HiChip className="w-5 h-5 text-red-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold font-heading text-slate-900 truncate">{r.label}</p>
              <p className="text-[11px] text-slate-500 font-body">{r.moduleLabel}</p>
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
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-red-200 text-red-600 text-sm font-mono font-bold shadow-sm">
            <HiSparkles className="w-5 h-5 text-red-600" /> CSVerse AI Learning Platform v2.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-black text-slate-900 leading-tight">
            Master Computer Science
            <span className="block text-red-600">
              Visually
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Interactive 3D visualizations, comprehensive theory, proven patterns, and practice tests across 4 core CS domains.
          </p>

          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto pt-4">
            <div className="flex items-center gap-3 bg-white rounded-2xl px-6 py-4 border-2 border-red-200 shadow-lg hover:shadow-xl focus-within:border-red-600 transition-all">
              <HiSearch className="w-6 h-6 text-red-600" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                placeholder="Search topics (Bubble Sort, SQL JOINs, OSI Model)..."
                className="w-full bg-transparent text-base text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                >
                  <HiX className="w-5 h-5" />
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

        {/* 4 Main Modules - Large Cards */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-3">
              Choose Your Learning Path
            </h2>
            <p className="text-slate-600 text-lg">
              4 comprehensive modules with theory, visualizations, patterns & practice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {MODULE_REGISTRY.map((mod) => {
              const isLive = LIVE_VIZ.has(mod.id)
              const colors = MOD_COLORS[mod.id] ?? MOD_COLORS.dsa
              const Icon = MOD_ICONS[mod.id] ?? HiChip

              return (
                <Link
                  key={mod.id}
                  to={`/app/${mod.id}`}
                  className="group relative bg-white rounded-3xl border-2 border-red-100 hover:border-red-600 p-8 md:p-10 hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-[1.02]"
                >
                  {/* Background Decoration */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="relative space-y-6">
                    {/* Icon & Badge */}
                    <div className="flex items-start justify-between">
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-red-50 border-2 border-red-200 shadow-lg group-hover:scale-110 transition-transform">
                        <Icon className="text-4xl text-red-600" />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider px-3 py-1 bg-slate-100 rounded-full">
                          Phase {mod.phase}
                        </span>
                        {isLive ? (
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-600 text-white shadow-md">
                            🚀 3D Live
                          </span>
                        ) : (
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-900 text-white shadow-md">
                            🤖 AI Active
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-2xl md:text-3xl font-heading font-black text-slate-900 group-hover:text-red-600 transition-colors mb-2">
                        {mod.label}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {mod.id === 'dsa' && 'Master data structures and algorithms with step-by-step 3D memory visualizations and proven coding patterns.'}
                        {mod.id === 'dbms' && 'Learn database fundamentals, SQL queries, JOIN operations, normalization, and transaction management.'}
                        {mod.id === 'networking' && 'Understand network protocols, OSI model, TCP/IP stack, routing, and security fundamentals.'}
                        {mod.id === 'os' && 'Explore operating system concepts: scheduling, memory management, synchronization, and file systems.'}
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-3">
                      <div className="bg-red-50/80 rounded-xl p-3 text-center border border-red-100">
                        <HiBookOpen className="w-6 h-6 text-red-600 mx-auto mb-1" />
                        <p className="text-xs text-red-700 font-semibold">Theory</p>
                      </div>
                      <div className="bg-red-50/80 rounded-xl p-3 text-center border border-red-100">
                        <HiPlay className="w-6 h-6 text-red-600 mx-auto mb-1" />
                        <p className="text-xs text-red-700 font-semibold">Visual</p>
                      </div>
                      <div className="bg-red-50/80 rounded-xl p-3 text-center border border-red-100">
                        <HiLightningBolt className="w-6 h-6 text-red-600 mx-auto mb-1" />
                        <p className="text-xs text-red-700 font-semibold">Patterns</p>
                      </div>
                      <div className="bg-red-50/80 rounded-xl p-3 text-center border border-red-100">
                        <HiAcademicCap className="w-6 h-6 text-red-600 mx-auto mb-1" />
                        <p className="text-xs text-red-700 font-semibold">Practice</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-sm font-heading font-bold text-slate-500">
                        {mod.topics.length} Interactive Topics
                      </span>
                      <span className="inline-flex items-center gap-2 text-base font-heading font-bold text-red-600 group-hover:gap-3 transition-all">
                        Explore <HiArrowRight className="w-5 h-5 text-red-600" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-red-600">4</div>
            <p className="text-sm text-slate-600 font-medium">Core Modules</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-red-600">100+</div>
            <p className="text-sm text-slate-600 font-medium">Topics</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-red-600">3D</div>
            <p className="text-sm text-slate-600 font-medium">Visualizations</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-red-600">AI</div>
            <p className="text-sm text-slate-600 font-medium">Powered</p>
          </div>
        </div>

        {/* Progress Dashboard CTA */}
        <div className="max-w-3xl mx-auto">
          <Link
            to="/app/progress"
            className="block bg-white border-2 border-red-600 rounded-2xl p-8 text-slate-900 shadow-xl hover:shadow-2xl hover:border-red-700 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-2xl font-heading font-bold text-slate-900 group-hover:text-red-600 transition-colors">Track Your Progress</h3>
                <p className="text-slate-600 text-sm">View your learning journey, completion rates, and quiz scores</p>
              </div>
              <HiChartBar className="w-16 h-16 text-red-600 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

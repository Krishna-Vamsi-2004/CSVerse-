// src/pages/DSAIndexPage.jsx
import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import { hasTopicContent } from '../data/topicContent'
import { useProgress } from '../hooks/useProgress'
import ProgressTracker from '../components/ProgressTracker'
import { HiChip, HiCheck, HiChevronRight, HiBookOpen, HiPlay, HiLightningBolt, HiAcademicCap, HiLockClosed, HiArrowLeft } from 'react-icons/hi'

function TopicCard({ moduleId, topic, getTopicProgress }) {
  const progress = getTopicProgress(moduleId, topic.id)
  const isComplete = progress.completionPct === 100
  const hasContent = hasTopicContent(moduleId, topic.id)

  return (
    <Link
      to={hasContent ? `/app/dsa/${topic.id}` : '#'}
      onClick={(e) => !hasContent && e.preventDefault()}
      className={`group bg-white rounded-[13px] border border-red-100 p-5 hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden ${
        hasContent ? 'hover:border-red-600' : 'opacity-60 cursor-not-allowed'
      }`}
    >
      {!hasContent && (
        <div className="absolute top-2 right-2 bg-slate-200 text-slate-600 px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
          <HiLockClosed className="w-3 h-3" /> Coming Soon
        </div>
      )}
      
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-[11px] bg-red-600 text-white flex items-center justify-center text-xl shadow-sm">
            {topic.icon}
          </div>
          {isComplete && hasContent && (
            <span className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold font-mono">
              <HiCheck className="w-3 h-3" /> Done
            </span>
          )}
        </div>
        <h3 className="font-heading font-bold text-sm text-slate-900 group-hover:text-red-600 transition-colors mb-3">
          {topic.label}
        </h3>

        {hasContent && (
          <div className="grid grid-cols-4 gap-1 mb-3">
            <div className="flex flex-col items-center justify-center bg-red-50/80 rounded-lg p-1.5" title="Theory">
              <HiBookOpen className="w-3.5 h-3.5 text-red-600" />
              <span className="text-[9px] text-red-600 font-semibold mt-0.5">Theory</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-red-50/80 rounded-lg p-1.5" title="Visual">
              <HiPlay className="w-3.5 h-3.5 text-red-600" />
              <span className="text-[9px] text-red-600 font-semibold mt-0.5">Visual</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-red-50/80 rounded-lg p-1.5" title="Patterns">
              <HiLightningBolt className="w-3.5 h-3.5 text-red-600" />
              <span className="text-[9px] text-red-600 font-semibold mt-0.5">Patterns</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-red-50/80 rounded-lg p-1.5" title="Practice">
              <HiAcademicCap className="w-3.5 h-3.5 text-red-600" />
              <span className="text-[9px] text-red-600 font-semibold mt-0.5">Practice</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-1.5 pt-2 border-t border-slate-100">
        {hasContent && (
          <>
            <ProgressTracker value={progress.completionPct} label={`${progress.completionPct}% complete`} showLabel={false} />
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
              <span>{progress.completionPct}% complete</span>
              <HiChevronRight className="w-3.5 h-3.5 text-red-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </>
        )}
        {!hasContent && (
          <p className="text-[10px] text-slate-500 text-center">Content in development</p>
        )}
      </div>
    </Link>
  )
}

export default function DSAIndexPage() {
  const navigate = useNavigate()
  const { getTopicProgress } = useProgress()
  const dsaModule = useMemo(() => MODULE_REGISTRY.find((m) => m.id === 'dsa'), [])
  if (!dsaModule) return null

  const groups = dsaModule.groups ?? [{ label: dsaModule.label, topics: dsaModule.topics }]

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap bg-white rounded-2xl p-4 shadow-sm border border-red-100">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/app')}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-xl font-heading font-bold text-sm transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <HiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Dashboard</span>
            </button>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <nav className="hidden sm:flex items-center gap-2 text-sm text-slate-500 font-medium">
              <Link to="/app" className="hover:text-red-600 transition-colors">Dashboard</Link>
              <span>/</span>
              <span className="text-slate-900 font-bold">{dsaModule.label}</span>
            </nav>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
          >
            ← Previous Page
          </button>
        </div>

        {/* Header */}
        <div className="bg-white border-2 border-red-600 p-8 md:p-12 rounded-3xl shadow-xl text-slate-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-600 text-sm font-mono font-bold">
              <HiChip className="w-5 h-5 text-red-600" /> Module 01 · Phase 1
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900">{dsaModule.label}</h1>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              Master fundamental data structures and algorithms with interactive 3D visualizations, comprehensive theory, proven patterns, and practice tests.
            </p>
          </div>
        </div>

        {/* Topics Grid by Groups */}
        <div className="space-y-12">
          {groups.map((group) => (
            <section key={group.label} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-red-600 rounded-full" />
                <h2 className="text-2xl font-heading font-bold text-slate-900">
                  {group.label}
                </h2>
                <div className="h-1 flex-1 bg-gradient-to-r from-red-200 to-transparent rounded-full" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {group.topics.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    moduleId={dsaModule.id}
                    topic={topic}
                    getTopicProgress={getTopicProgress}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}

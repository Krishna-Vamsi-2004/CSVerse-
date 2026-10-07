// src/pages/NetworkingIndexPage.jsx
import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import { useProgress } from '../hooks/useProgress'
import ProgressTracker from '../components/ProgressTracker'
import { HiGlobe, HiCheck, HiChevronRight, HiArrowLeft } from 'react-icons/hi'

function TopicCard({ moduleId, topic, getTopicProgress }) {
  const progress = getTopicProgress(moduleId, topic.id)
  const isComplete = progress.completionPct === 100

  return (
    <Link
      to={`/app/networking/${topic.id}`}
      className="group bg-white rounded-[13px] border border-red-100 p-5 hover:border-red-600 hover:shadow-lg transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-[11px] bg-red-600 text-white flex items-center justify-center font-bold shadow-sm">
            <HiGlobe className="w-5 h-5 text-white" />
          </div>
          {isComplete && (
            <span className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold font-mono">
              <HiCheck className="w-3 h-3" /> Done
            </span>
          )}
        </div>
        <h3 className="font-heading font-bold text-sm text-slate-900 group-hover:text-red-600 transition-colors mb-3">
          {topic.label}
        </h3>
      </div>

      <div className="space-y-1.5 pt-2 border-t border-slate-100">
        <ProgressTracker value={progress.completionPct} label={`${progress.completionPct}% complete`} showLabel={false} />
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
          <span>{progress.completionPct}% complete</span>
          <HiChevronRight className="w-3.5 h-3.5 text-red-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}

export default function NetworkingIndexPage() {
  const navigate = useNavigate()
  const { getTopicProgress } = useProgress()
  const netModule = useMemo(() => MODULE_REGISTRY.find((m) => m.id === 'networking'), [])
  if (!netModule) return null

  const groups = netModule.groups ?? [{ label: netModule.label, topics: netModule.topics }]

  return (
    <main className="max-w-6xl mx-auto space-y-6 font-body py-6 px-4">
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
            <span className="text-slate-900 font-bold">{netModule.label}</span>
          </nav>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
        >
          ← Previous Page
        </button>
      </div>

      <div className="bg-white border-2 border-red-600 p-8 rounded-2xl flex items-center justify-between shadow-xl text-slate-900">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-mono font-bold uppercase tracking-wider border border-red-200">
            <HiGlobe className="w-4 h-4 text-red-600" /> Module 03 · Phase 3
          </div>
          <h1 className="td-h2 text-slate-900">{netModule.label}</h1>
          <p className="text-sm text-slate-600">OSI Model, TCP/IP handshake, DNS resolution, and packet flow animations.</p>
        </div>
      </div>

      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group.label} className="space-y-4">
            <h2 className="text-xs font-heading font-bold uppercase tracking-widest text-red-600 px-1 border-b border-red-100 pb-2">
              {group.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {group.topics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  moduleId={netModule.id}
                  topic={topic}
                  getTopicProgress={getTopicProgress}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}

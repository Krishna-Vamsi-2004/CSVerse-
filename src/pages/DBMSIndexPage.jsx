// src/pages/DBMSIndexPage.jsx
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import { useProgress } from '../hooks/useProgress'
import ProgressTracker from '../components/ProgressTracker'
import { HiDatabase, HiCheck, HiChevronRight } from 'react-icons/hi'

function TopicCard({ moduleId, topic, getTopicProgress }) {
  const progress = getTopicProgress(moduleId, topic.id)
  const isComplete = progress.completionPct === 100

  return (
    <Link
      to={`/app/dbms/${topic.id}`}
      className="group bg-white rounded-[13px] border border-[#180060]/15 p-5 hover:border-[#180060] hover:shadow-lg transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-[11px] bg-[#180018] text-white flex items-center justify-center font-bold">
            <HiDatabase className="w-5 h-5 text-[#90c0d8]" />
          </div>
          {isComplete && (
            <span className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold font-mono">
              <HiCheck className="w-3 h-3" /> Done
            </span>
          )}
        </div>
        <h3 className="font-heading font-bold text-sm text-[#180018] group-hover:text-[#180060] transition-colors mb-3">
          {topic.label}
        </h3>
      </div>

      <div className="space-y-1.5 pt-2 border-t border-slate-100">
        <ProgressTracker value={progress.completionPct} label={`${progress.completionPct}% complete`} showLabel={false} />
        <div className="flex items-center justify-between text-[11px] font-mono text-[#487890]">
          <span>{progress.completionPct}% complete</span>
          <HiChevronRight className="w-3.5 h-3.5 text-[#180060] group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}

export default function DBMSIndexPage() {
  const { getTopicProgress } = useProgress()
  const dbmsModule = useMemo(() => MODULE_REGISTRY.find((m) => m.id === 'dbms'), [])
  if (!dbmsModule) return null

  return (
    <main className="max-w-6xl mx-auto space-y-8 font-body">
      <div className="td-accent-card p-8 rounded-[13px] flex items-center justify-between shadow-md">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#90c0d8] text-xs font-mono font-bold uppercase tracking-wider border border-[#90c0d8]/30">
            <HiDatabase className="w-4 h-4 text-[#90c0d8]" /> Module 02 · Phase 2
          </div>
          <h1 className="td-h2 text-white">{dbmsModule.label}</h1>
          <p className="text-sm text-slate-200">Interactive SQL table visualizers, JOIN animations, and Normalization breakdowns.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {dbmsModule.topics.map((topic) => (
          <TopicCard
            key={topic.id}
            moduleId={dbmsModule.id}
            topic={topic}
            getTopicProgress={getTopicProgress}
          />
        ))}
      </div>
    </main>
  )
}

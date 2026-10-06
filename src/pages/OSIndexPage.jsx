// src/pages/OSIndexPage.jsx
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import { useProgress } from '../hooks/useProgress'
import ProgressTracker from '../components/ProgressTracker'
import { HiDesktopComputer, HiCheck, HiChevronRight } from 'react-icons/hi'

function TopicCard({ moduleId, topic, getTopicProgress }) {
  const progress = getTopicProgress(moduleId, topic.id)
  const isComplete = progress.completionPct === 100

  return (
    <Link
      to={`/app/os/${topic.id}`}
      className="group bg-white rounded-[13px] border border-[#180060]/15 p-5 hover:border-[#180060] hover:shadow-lg transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-[11px] bg-[#180060] text-white flex items-center justify-center font-bold">
            <HiDesktopComputer className="w-5 h-5 text-[#90c0d8]" />
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

export default function OSIndexPage() {
  const { getTopicProgress } = useProgress()
  const osModule = useMemo(() => MODULE_REGISTRY.find((m) => m.id === 'os'), [])
  if (!osModule) return null

  const groups = osModule.groups ?? [{ label: osModule.label, topics: osModule.topics }]

  return (
    <main className="max-w-6xl mx-auto space-y-8 font-body">
      <div className="td-accent-card p-8 rounded-[13px] flex items-center justify-between shadow-md">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#90c0d8] text-xs font-mono font-bold uppercase tracking-wider border border-[#90c0d8]/30">
            <HiDesktopComputer className="w-4 h-4 text-[#90c0d8]" /> Module 04 · Phase 4
          </div>
          <h1 className="td-h2 text-white">{osModule.label}</h1>
          <p className="text-sm text-slate-200">CPU scheduling algorithms, Process synchronization, Memory paging, and Deadlocks.</p>
        </div>
      </div>

      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group.label} className="space-y-4">
            <h2 className="text-xs font-heading font-bold uppercase tracking-widest text-[#180060] px-1 border-b border-[#180060]/10 pb-2">
              {group.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {group.topics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  moduleId={osModule.id}
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

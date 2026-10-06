// src/pages/ProgressDashboardPage.jsx
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import { useProgress } from '../hooks/useProgress'
import ProgressTracker from '../components/ProgressTracker'
import { HiClock, HiTrash, HiChartBar, HiCheck, HiChevronRight } from 'react-icons/hi'

function formatTime(seconds) {
  if (seconds < 60) return `${seconds}s`
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  if (m < 60) return `${m}m ${s}s`
  const h = Math.floor(m / 60)
  const rem = m % 60
  return `${h}h ${rem}m`
}

export default function ProgressDashboardPage() {
  const { getTopicProgress, getTotalLearningTime, resetProgress } = useProgress()
  const totalTime = useMemo(() => getTotalLearningTime(), [getTotalLearningTime])

  function handleReset() {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      resetProgress()
    }
  }

  return (
    <main className="max-w-5xl mx-auto space-y-8 font-body">
      {/* Header Banner */}
      <div className="td-navy-card p-8 rounded-[13px] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#90c0d8] text-xs font-mono font-bold uppercase tracking-wider border border-[#90c0d8]/30">
            <HiChartBar className="w-4 h-4 text-[#90c0d8]" /> CSVerse AI Mastery Tracker
          </div>
          <h1 className="td-h2 text-white">Learning Progress</h1>
          <p className="text-sm text-slate-200">Track your completed topics, quiz scores, and time spent across all modules.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
          <div className="flex items-center gap-2 text-xs font-mono text-[#90c0d8] bg-white/10 px-3.5 py-2 rounded-[11px] border border-white/10">
            <HiClock className="w-4 h-4 text-[#90c0d8]" />
            <span>Total Time: <strong className="text-white">{formatTime(totalTime)}</strong></span>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold font-heading bg-red-500/10 text-red-300 border border-red-500/30 rounded-[11px] hover:bg-red-500/20 transition-colors"
          >
            <HiTrash className="w-4 h-4" />
            Reset Progress
          </button>
        </div>
      </div>

      {/* Modules Progress Breakdown */}
      <div className="space-y-6">
        {MODULE_REGISTRY.map((mod) => {
          const topicProgresses = mod.topics.map((t) => getTopicProgress(mod.id, t.id))
          const overallPct = mod.topics.length > 0
            ? Math.round(topicProgresses.reduce((sum, p) => sum + p.completionPct, 0) / mod.topics.length)
            : 0

          return (
            <section
              key={mod.id}
              className="bg-white rounded-[13px] border border-[#180060]/15 shadow-xs p-6 space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#180060]/10">
                <h2 className="text-base font-heading font-bold text-[#180018] flex items-center gap-2">
                  {mod.label}
                  <span className="text-xs font-normal font-mono text-[#487890]">(Phase {mod.phase})</span>
                </h2>
                <span className="text-sm font-heading font-bold text-[#180060] font-mono">{overallPct}%</span>
              </div>

              <ProgressTracker value={overallPct} label="Overall Module Progress" />

              {mod.topics.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {mod.topics.map((topic, idx) => {
                    const progress = topicProgresses[idx]
                    const isComplete = progress.completionPct === 100

                    return (
                      <div
                        key={topic.id}
                        className="p-4 rounded-[11px] bg-slate-50 border border-[#180060]/10 space-y-2 hover:border-[#180060]/30 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <Link
                            to={`/app/${mod.id}/${topic.id}`}
                            className="flex items-center gap-2 text-xs font-heading font-bold text-[#180018] hover:text-[#180060] transition-colors"
                          >
                            <span>{topic.label}</span>
                            {isComplete && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded text-[9px] font-mono font-bold">
                                <HiCheck className="w-3 h-3" /> Done
                              </span>
                            )}
                          </Link>
                          <div className="text-[11px] font-mono text-[#487890] flex items-center gap-2">
                            {progress.quizScore !== null && <span className="text-[#180060]">Quiz: {progress.quizScore}/5</span>}
                            <span>{formatTime(progress.learningTimeSec)}</span>
                          </div>
                        </div>
                        <ProgressTracker value={progress.completionPct} showLabel={false} />
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-xs text-[#487890] italic font-mono">Module content releasing soon...</p>
              )}
            </section>
          )
        })}
      </div>
    </main>
  )
}

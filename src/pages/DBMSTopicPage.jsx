// src/pages/DBMSTopicPage.jsx
import { useEffect } from 'react'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import AIChatPanel from '../components/AIChatPanel'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import { HiArrowLeft, HiAcademicCap } from 'react-icons/hi'
import JoinVisualizer from '../modules/dbms/components/JoinVisualizer'

export default function DBMSTopicPage() {
  const { topicId } = useParams()
  const location    = useLocation()
  const navigate    = useNavigate()
  const { recordTopicVisit } = useProgress()

  const quizResult = location.state?.quizResult ?? null

  const dbmsModule = MODULE_REGISTRY.find((m) => m.id === 'dbms')
  const topic = dbmsModule?.topics.find((t) => t.id === topicId)

  useEffect(() => {
    recordTopicVisit('dbms', topicId)
  }, [topicId]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!topic) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Topic not found.</p>
        <Link to="/app/dbms" className="text-violet-600 hover:underline mt-4 inline-block">← Back to DBMS</Link>
      </div>
    )
  }

  const quizPct = quizResult ? Math.round((quizResult.score / quizResult.total) * 100) : null
  const quizColor =
    quizPct === null ? '' :
    quizPct === 100  ? 'bg-emerald-50 border-emerald-300 text-emerald-700' :
    quizPct >= 80    ? 'bg-blue-50 border-blue-300 text-blue-700' :
    quizPct >= 60    ? 'bg-amber-50 border-amber-300 text-amber-700' :
    'bg-red-50 border-red-300 text-red-700'

  return (
    <main className="max-w-7xl mx-auto px-4 py-5 space-y-4">
      {/* Prominent Back Navigation Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap bg-white rounded-2xl p-4 shadow-sm border border-red-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/app/dbms')}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-xl font-heading font-bold text-sm transition-all duration-200 shadow-sm hover:shadow-md group"
          >
            <HiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to DBMS</span>
          </button>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-2 text-sm text-slate-500 font-medium">
            <Link to="/app" className="hover:text-red-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/app/dbms" className="hover:text-red-600 transition-colors">Database Systems</Link>
            <span>/</span>
            <span className="flex items-center gap-1 text-slate-900 font-bold">
              <span aria-hidden="true">{topic.icon}</span> {topic.label}
            </span>
          </nav>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
        >
          <span>← Previous Page</span>
        </button>
      </div>

      {/* TOP ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">

        {/* LEFT 2/3: Visualizer */}
        <div className="lg:col-span-2">
          {topicId === 'joins' ? (
            <JoinVisualizer />
          ) : (
            <div className="bg-white rounded-2xl border-2 border-red-600 shadow-sm p-12 text-center">
              <div className="mb-4 text-6xl" aria-hidden="true">{topic.icon}</div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{topic.label} Visualizer</h2>
              <p className="text-slate-500 max-w-md mx-auto text-sm">
                This visualizer is designed for {topic.label}.
                Use the AI Tutor below to explore core concepts.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT 1/3: Take Quiz */}
        <div className="lg:col-span-1 flex flex-col gap-3">
          {/* Quiz result badge */}
          {quizResult && (
            <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border text-sm font-semibold ${quizColor}`}>
              <HiAcademicCap className="text-lg shrink-0" />
              <div>
                <p>Last quiz: {quizResult.score}/{quizResult.total} ({quizPct}%)</p>
                <p className="text-xs font-normal opacity-75 mt-0.5">
                  {quizPct === 100 ? 'Perfect score!' : quizPct >= 80 ? 'Great job!' : 'Keep practicing!'}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={() => navigate(`/app/dbms/${topicId}/quiz`, { state: { returnTo: `/app/dbms/${topicId}` } })}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-red-600 rounded-2xl text-sm font-bold text-red-600 hover:bg-red-600 hover:text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-1"
          >
            <HiAcademicCap className="text-current" aria-hidden="true" />
            {quizResult ? 'Retake Quiz' : 'Take Quiz'}
          </button>
        </div>
      </div>
    </main>
  )
}

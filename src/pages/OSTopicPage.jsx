// src/pages/OSTopicPage.jsx
import { useEffect } from 'react'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import AIChatPanel from '../components/AIChatPanel'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import { HiArrowLeft, HiAcademicCap } from 'react-icons/hi'

// ── Topic content — concept visuals for topics that have them ─────────────────
const TOPIC_CONTENT = {
  scheduling: {
    algorithms: [
      { name: 'FCFS',  full: 'First Come First Served', color: 'bg-blue-500',   desc: 'Non-preemptive. Processes run in arrival order.' },
      { name: 'SJF',   full: 'Shortest Job First',      color: 'bg-emerald-500',desc: 'Non-preemptive. Shortest burst time runs first.' },
      { name: 'SRTF',  full: 'Shortest Remaining Time', color: 'bg-teal-500',   desc: 'Preemptive SJF — switches if shorter job arrives.' },
      { name: 'RR',    full: 'Round Robin',              color: 'bg-violet-500', desc: 'Each process gets a fixed time quantum in order.' },
      { name: 'Priority', full: 'Priority Scheduling',  color: 'bg-amber-500',  desc: 'Higher priority process executes first.' },
    ],
  },
  'processes': {
    states: [
      { name: 'New',     color: 'bg-slate-400',   arrow: '→ Admitted →' },
      { name: 'Ready',   color: 'bg-blue-500',    arrow: '→ Dispatch →' },
      { name: 'Running', color: 'bg-emerald-500', arrow: '→ Exit →' },
      { name: 'Waiting', color: 'bg-amber-500',   arrow: '← I/O Wait' },
      { name: 'Terminated', color: 'bg-red-400',  arrow: '' },
    ],
  },
  deadlock: {
    conditions: [
      { icon: '🔒', name: 'Mutual Exclusion',   desc: 'At least one resource is held in a non-shareable mode.' },
      { icon: '🤝', name: 'Hold and Wait',       desc: 'A process holds resources while waiting for more.' },
      { icon: '🚫', name: 'No Preemption',       desc: 'Resources cannot be forcibly taken from a process.' },
      { icon: '🔄', name: 'Circular Wait',       desc: 'A circular chain of processes each waiting on the next.' },
    ],
  },
}

function SchedulingViz({ algorithms }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-lg mx-auto">
      <p className="text-xs text-slate-500 text-center mb-2">CPU Scheduling Algorithms</p>
      {algorithms.map((a) => (
        <div key={a.name} className={`flex items-start gap-3 px-4 py-3 rounded-xl text-white ${a.color} shadow-sm`}>
          <span className="font-bold text-sm shrink-0 w-14">{a.name}</span>
          <div>
            <p className="text-xs font-semibold opacity-90">{a.full}</p>
            <p className="text-xs opacity-75">{a.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function ProcessStateViz({ states }) {
  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto">
      <p className="text-xs text-slate-500">Process State Diagram</p>
      {states.map((s) => (
        <div key={s.name} className="flex items-center gap-2 w-full">
          <div className={`px-4 py-2 rounded-xl text-white font-semibold text-sm ${s.color} shadow-sm min-w-[110px] text-center`}>
            {s.name}
          </div>
          {s.arrow && <span className="text-xs text-slate-400">{s.arrow}</span>}
        </div>
      ))}
    </div>
  )
}

function DeadlockViz({ conditions }) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-lg mx-auto">
      <p className="col-span-2 text-xs text-slate-500 text-center">Four Necessary Conditions for Deadlock</p>
      {conditions.map((c) => (
        <div key={c.name} className="bg-red-50 border border-red-200 rounded-2xl p-3">
          <div className="text-2xl mb-1">{c.icon}</div>
          <p className="font-semibold text-sm text-red-800">{c.name}</p>
          <p className="text-xs text-red-600 mt-1">{c.desc}</p>
        </div>
      ))}
    </div>
  )
}

function ComingSoonViz({ topic }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
      <span className="text-6xl" aria-hidden="true">{topic.icon}</span>
      <h2 className="text-xl font-bold text-slate-800">{topic.label}</h2>
      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3">
        <span className="text-lg">🚧</span>
        <div>
          <p className="text-sm font-semibold text-amber-800">Visual simulation coming soon</p>
          <p className="text-xs text-amber-700">Interactive simulation is in development.</p>
        </div>
      </div>
      <p className="text-sm text-slate-500 max-w-sm text-center">
        Use the <strong>AI Tutor</strong> below to explore <em>{topic.label}</em> concepts
        with detailed explanations and examples.
      </p>
    </div>
  )
}

function TopicViz({ topicId, topic }) {
  const content = TOPIC_CONTENT[topicId]
  if (!content) return <ComingSoonViz topic={topic} />
  if (content.algorithms) return <SchedulingViz algorithms={content.algorithms} />
  if (content.states)     return <ProcessStateViz states={content.states} />
  if (content.conditions) return <DeadlockViz conditions={content.conditions} />
  return <ComingSoonViz topic={topic} />
}

export default function OSTopicPage() {
  const { topicId } = useParams()
  const location    = useLocation()
  const navigate    = useNavigate()
  const { recordTopicVisit } = useProgress()

  const quizResult = location.state?.quizResult ?? null
  const mod   = MODULE_REGISTRY.find((m) => m.id === 'os')
  const topic = mod?.topics.find((t) => t.id === topicId)

  useEffect(() => { recordTopicVisit('os', topicId) }, [topicId]) // eslint-disable-line

  if (!topic) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Topic not found.</p>
        <Link to="/app/os" className="text-orange-600 hover:underline mt-4 inline-block">← Back to OS</Link>
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
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-400">
        <Link to="/app/os" className="flex items-center gap-1 hover:text-orange-600 transition-colors">
          <HiArrowLeft aria-hidden="true" /> OS
        </Link>
        <span>/</span>
        <span className="flex items-center gap-1 text-slate-700 font-medium">
          <span aria-hidden="true">{topic.icon}</span> {topic.label}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100 bg-slate-50 shrink-0">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Visual Area</span>
          </div>
          <div className="flex-1 px-6 py-6 overflow-y-auto">
            <TopicViz topicId={topicId} topic={topic} />
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-3">
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
            onClick={() => navigate(`/app/os/${topicId}/quiz`, { state: { returnTo: `/app/os/${topicId}` } })}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-orange-300 hover:text-orange-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 shrink-0"
          >
            <HiAcademicCap className="text-orange-500" aria-hidden="true" />
            {quizResult ? 'Retake Quiz' : 'Take Quiz'}
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full lg:w-2/3">
          <AIChatPanel
            moduleId="os"
            topicId={topicId}
            currentStepDescription={`Learning about ${topic.label} in Operating Systems.`}
          />
        </div>
      </div>
    </main>
  )
}

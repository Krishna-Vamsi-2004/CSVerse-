// src/pages/NetworkingTopicPage.jsx
import { useEffect } from 'react'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import AIChatPanel from '../components/AIChatPanel'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import { HiArrowLeft, HiAcademicCap } from 'react-icons/hi'

// ── Topic content map — concept summary shown in the visual area ──────────────
const TOPIC_CONTENT = {
  'osi-model': {
    layers: [
      { num: 7, name: 'Application',  color: 'bg-violet-500', desc: 'HTTP, FTP, DNS, SMTP — user-facing protocols' },
      { num: 6, name: 'Presentation', color: 'bg-blue-500',   desc: 'Encryption, compression, data formatting' },
      { num: 5, name: 'Session',      color: 'bg-cyan-500',   desc: 'Session establishment, maintenance, termination' },
      { num: 4, name: 'Transport',    color: 'bg-teal-500',   desc: 'TCP / UDP — end-to-end delivery & error control' },
      { num: 3, name: 'Network',      color: 'bg-emerald-500',desc: 'IP addressing, routing between networks' },
      { num: 2, name: 'Data Link',    color: 'bg-amber-500',  desc: 'MAC addressing, framing, error detection' },
      { num: 1, name: 'Physical',     color: 'bg-orange-500', desc: 'Cables, signals, bits on the wire' },
    ],
  },
  'tcp-handshake': {
    steps: [
      { from: 'Client', to: 'Server', label: 'SYN',     color: 'bg-blue-500',   desc: 'Client initiates connection' },
      { from: 'Server', to: 'Client', label: 'SYN-ACK', color: 'bg-emerald-500',desc: 'Server acknowledges and responds' },
      { from: 'Client', to: 'Server', label: 'ACK',     color: 'bg-violet-500', desc: 'Client confirms — connection established' },
    ],
  },
  'tcp-ip': {
    layers: [
      { num: 4, name: 'Application', color: 'bg-violet-500', desc: 'HTTP, DNS, FTP, SMTP, SSH' },
      { num: 3, name: 'Transport',   color: 'bg-blue-500',   desc: 'TCP (reliable) / UDP (fast)' },
      { num: 2, name: 'Internet',    color: 'bg-emerald-500',desc: 'IP addressing and routing' },
      { num: 1, name: 'Network',     color: 'bg-amber-500',  desc: 'Ethernet, Wi-Fi — physical delivery' },
    ],
  },
}

function OSIViz({ layers }) {
  return (
    <div className="flex flex-col gap-1.5 w-full max-w-lg mx-auto">
      {layers.map((l) => (
        <div key={l.num} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-white ${l.color} shadow-sm`}>
          <span className="shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
            {l.num}
          </span>
          <div className="flex-1 min-w-0">
            <span className="font-semibold text-sm">{l.name}</span>
            <p className="text-xs opacity-80 truncate">{l.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function HandshakeViz({ steps }) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex justify-between mb-6 px-8">
        {['Client', 'Server'].map((side) => (
          <div key={side} className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-2xl">
              {side === 'Client' ? '💻' : '🖥️'}
            </div>
            <span className="text-xs font-semibold text-slate-400">{side}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 px-4">
        {steps.map((step, i) => {
          const goRight = step.from === 'Client'
          return (
            <div key={i} className="flex flex-col gap-1">
              <div className={`flex items-center gap-2 ${goRight ? 'flex-row' : 'flex-row-reverse'}`}>
                <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${step.color}`}>
                  {step.label}
                </span>
                <div className="flex-1 h-0.5 bg-slate-300 relative">
                  <span className={`absolute top-1/2 -translate-y-1/2 ${goRight ? 'right-0' : 'left-0'} text-slate-400 text-xs`}>
                    {goRight ? '→' : '←'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center">{step.desc}</p>
            </div>
          )
        })}
      </div>
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
          <p className="text-sm font-semibold text-amber-800">Visual diagram coming soon</p>
          <p className="text-xs text-amber-700">Interactive simulation is in development.</p>
        </div>
      </div>
      <p className="text-sm text-slate-500 max-w-sm text-center">
        Use the <strong>AI Tutor</strong> below to explore <em>{topic.label}</em> concepts
        with detailed explanations, diagrams, and examples.
      </p>
    </div>
  )
}

function TopicViz({ topicId, topic }) {
  const content = TOPIC_CONTENT[topicId]
  if (!content) return <ComingSoonViz topic={topic} />
  if (content.layers)  return <OSIViz layers={content.layers} />
  if (content.steps)   return <HandshakeViz steps={content.steps} />
  return <ComingSoonViz topic={topic} />
}

export default function NetworkingTopicPage() {
  const { topicId } = useParams()
  const location    = useLocation()
  const navigate    = useNavigate()
  const { recordTopicVisit } = useProgress()

  const quizResult = location.state?.quizResult ?? null
  const mod   = MODULE_REGISTRY.find((m) => m.id === 'networking')
  const topic = mod?.topics.find((t) => t.id === topicId)

  useEffect(() => { recordTopicVisit('networking', topicId) }, [topicId]) // eslint-disable-line

  if (!topic) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Topic not found.</p>
        <Link to="/app/networking" className="text-emerald-600 hover:underline mt-4 inline-block">← Back to Networking</Link>
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
            onClick={() => navigate('/app/networking')}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-xl font-heading font-bold text-sm transition-all duration-200 shadow-sm hover:shadow-md group"
          >
            <HiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Networking</span>
          </button>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-2 text-sm text-slate-500 font-medium">
            <Link to="/app" className="hover:text-red-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/app/networking" className="hover:text-red-600 transition-colors">Computer Networks</Link>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-red-600 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-red-100 bg-red-50/50 shrink-0">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider font-mono">Visual Area</span>
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
            onClick={() => navigate(`/app/networking/${topicId}/quiz`, { state: { returnTo: `/app/networking/${topicId}` } })}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-red-600 rounded-2xl text-sm font-bold text-red-600 hover:bg-red-600 hover:text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-1 shrink-0"
          >
            <HiAcademicCap className="text-current" aria-hidden="true" />
            {quizResult ? 'Retake Quiz' : 'Take Quiz'}
          </button>
        </div>
      </div>
    </main>
  )
}

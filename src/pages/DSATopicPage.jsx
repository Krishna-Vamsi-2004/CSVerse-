import { useEffect, useState } from 'react'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { useVisualizerState } from '../hooks/useVisualizerState'
import { useProgress } from '../hooks/useProgress'
import Visualizer from '../modules/dsa/components/Visualizer'
import ThreeVisualizer from '../modules/dsa/components/ThreeVisualizer'
import VisualizerControls, { SPEEDS } from '../modules/dsa/components/VisualizerControls'
import InputPanel from '../modules/dsa/components/InputPanel'
import AIChatPanel from '../components/AIChatPanel'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import { useAudioNarrator } from '../context/AudioNarratorContext'
import { getSnippet } from '../data/codeSnippets'
import {
  HiArrowLeft, HiAcademicCap, HiCube, HiDeviceMobile, HiCode,
} from 'react-icons/hi'

// ─── Standalone Code Snippet Panel ───────────────────────────────────────────
function CodeSnippetPanel({ topicId, currentFrame, isPlaying }) {
  const snippet = getSnippet(topicId)
  if (!snippet) return (
    <div className="flex-1 flex items-center justify-center text-slate-400 text-xs italic min-h-[120px]">
      No code snippet for this topic.
    </div>
  )
  const highlightLines = snippet.getHighlightLines(currentFrame)
  return (
    <div className="flex flex-col h-full w-full overflow-hidden text-xs font-mono">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 border-b border-slate-200 shrink-0">
        <HiCode className="text-slate-400 shrink-0" />
        <span className="text-slate-500 text-[10px] uppercase tracking-wide font-semibold flex-1 truncate">
          Code — {topicId}
        </span>
        {isPlaying && (
          <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold animate-pulse shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            live
          </span>
        )}
      </div>
      <div className="flex-1 bg-slate-900 py-2 overflow-y-auto">
        {snippet.lines.map((line, idx) => {
          const isHL = highlightLines.includes(idx)
          return (
            <div key={idx} className={`flex items-start px-3 transition-colors duration-150 ${isHL ? 'bg-amber-400/20 border-l-2 border-amber-400' : 'border-l-2 border-transparent'}`}>
              <span className="select-none w-5 shrink-0 text-right text-slate-600 mr-3 leading-5 mt-0">{idx + 1}</span>
              <pre className={`leading-5 whitespace-pre-wrap break-all flex-1 min-w-0 ${isHL ? 'text-amber-300 font-semibold' : 'text-slate-300'}`}>
                {line || ' '}
              </pre>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DSATopicPage() {
  const { topicId }   = useParams()
  const location      = useLocation()
  const navigate      = useNavigate()
  const { cancel }    = useAudioNarrator()
  const { recordTopicVisit, recordVisualizerComplete } = useProgress()

  const [is3D,       setIs3D]       = useState(false)
  const [speedIndex, setSpeedIndex] = useState(1)

  const quizResult = location.state?.quizResult ?? null

  useEffect(() => { cancel() }, [location.pathname]) // eslint-disable-line

  const {
    currentFrame, isPlaying, isComplete,
    play, pause, nextStep, prevStep, reset, setInput,
  } = useVisualizerState(topicId, SPEEDS[speedIndex].delay)

  const dsaModule = MODULE_REGISTRY.find(m => m.id === 'dsa')
  const topic     = dsaModule?.topics.find(t => t.id === topicId)

  useEffect(() => { recordTopicVisit('dsa', topicId) }, [topicId])           // eslint-disable-line
  useEffect(() => { if (isComplete) recordVisualizerComplete('dsa', topicId) }, [isComplete]) // eslint-disable-line

  if (!topic) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Topic not found.</p>
        <Link to="/app/dsa" className="text-blue-600 hover:underline mt-4 inline-block">← Back to DSA</Link>
      </div>
    )
  }

  function goToQuiz() {
    navigate(`/app/dsa/${topicId}/quiz`, { state: { returnTo: `/app/dsa/${topicId}` } })
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

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-400">
        <Link to="/app/dsa" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
          <HiArrowLeft aria-hidden="true" /> DSA
        </Link>
        <span>/</span>
        <span className="flex items-center gap-1 text-slate-700 font-medium">
          <span aria-hidden="true">{topic.icon}</span> {topic.label}
        </span>
      </nav>

      {/* Top row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">

        {/* Visualizer */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-slate-100 bg-slate-50 flex-wrap shrink-0">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0">Visual Area</span>
            <div className="flex-1 min-w-[160px]">
              <InputPanel onSetInput={setInput} topicId={topicId} />
            </div>
            <div className="flex bg-white p-0.5 rounded-lg border border-slate-200 shrink-0">
              <button onClick={() => setIs3D(false)} className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${!is3D ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                <HiDeviceMobile className="text-sm" /> 2D
              </button>
              <button onClick={() => setIs3D(true)} className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${is3D ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                <HiCube className="text-sm" /> 3D
              </button>
            </div>
          </div>
          <div className="px-4 pt-4 pb-2 bg-white flex-1">
            {is3D
              ? <ThreeVisualizer key={`3d-${topicId}`} frame={currentFrame} topicId={topicId} isComplete={isComplete} />
              : <Visualizer frame={currentFrame} topicId={topicId} isComplete={isComplete} />
            }
          </div>
          <div className="px-4 pb-3 pt-2 border-t border-slate-100 bg-slate-50 shrink-0">
            <VisualizerControls
              isPlaying={isPlaying} isComplete={isComplete}
              onPlay={play} onPause={pause} onNext={nextStep}
              onPrev={prevStep} onReset={reset}
              speedIndex={speedIndex} onSpeedChange={setSpeedIndex}
            />
          </div>
        </div>

        {/* Right: Quiz + Code */}
        <div className="lg:col-span-1 flex flex-col gap-3">
          {quizResult && (
            <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border text-sm font-semibold ${quizColor}`}>
              <HiAcademicCap className="text-lg shrink-0" />
              <div className="min-w-0">
                <p>Last quiz: {quizResult.score}/{quizResult.total} ({quizPct}%)</p>
                <p className="text-xs font-normal opacity-75 mt-0.5">
                  {quizPct === 100 ? 'Perfect score!' : quizPct >= 80 ? 'Great job!' : 'Keep practicing!'}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={goToQuiz}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 shrink-0"
          >
            <HiAcademicCap className="text-blue-500" />
            {quizResult ? 'Retake Quiz' : 'Take Quiz'}
          </button>
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <CodeSnippetPanel topicId={topicId} currentFrame={currentFrame} isPlaying={isPlaying} />
          </div>
        </div>
      </div>

      {/* AI Tutor */}
      <div className="flex justify-center">
        <div className="w-full lg:w-2/3">
          <AIChatPanel
            moduleId="dsa"
            topicId={topicId}
            currentStepDescription={currentFrame?.description ?? ''}
            currentFrame={currentFrame}
            isPlaying={isPlaying}
          />
        </div>
      </div>
    </main>
  )
}

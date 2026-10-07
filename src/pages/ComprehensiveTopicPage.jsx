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
import { getTopicContent } from '../data/topicContent'
import { getSnippet } from '../data/codeSnippets'
import {
  HiArrowLeft, HiAcademicCap, HiCube, HiDeviceMobile, HiCode,
  HiBookOpen, HiLightningBolt, HiCheckCircle, HiXCircle,
  HiChevronDown, HiChevronUp, HiPlay, HiCheck, HiSparkles,
} from 'react-icons/hi'

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: THEORY
// ═══════════════════════════════════════════════════════════════════════════

function TheorySection({ content }) {
  if (!content) return null

  return (
    <div className="bg-white rounded-2xl border-2 border-red-600 shadow-sm p-6 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-red-100">
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center border border-red-200">
          <HiBookOpen className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{content.title}</h2>
          <p className="text-xs text-slate-500">Core concepts and fundamentals</p>
        </div>
      </div>

      <div className="space-y-6">
        {content.sections.map((section, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-800">{section.heading}</h3>
            <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: VISUAL SIMULATOR
// ═══════════════════════════════════════════════════════════════════════════

function CodeSnippetPanel({ topicId, currentFrame, isPlaying }) {
  const snippet = getSnippet(topicId)
  if (!snippet) return null

  const highlightLines = snippet.getHighlightLines(currentFrame)
  
  return (
    <div className="flex flex-col h-full overflow-hidden text-xs font-mono">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 border-b border-slate-200">
        <HiCode className="text-slate-400" />
        <span className="text-slate-500 text-[10px] uppercase tracking-wide font-semibold flex-1 truncate">
          Code — {topicId}
        </span>
        {isPlaying && (
          <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            live
          </span>
        )}
      </div>
      <div className="flex-1 bg-slate-900 py-2 overflow-y-auto">
        {snippet.lines.map((line, idx) => {
          const isHL = highlightLines.includes(idx)
          return (
            <div key={idx} className={`flex items-start px-3 transition-colors ${isHL ? 'bg-amber-400/20 border-l-2 border-amber-400' : 'border-l-2 border-transparent'}`}>
              <span className="select-none w-5 text-right text-slate-600 mr-3 leading-5">{idx + 1}</span>
              <pre className={`leading-5 flex-1 ${isHL ? 'text-amber-300 font-semibold' : 'text-slate-300'}`}>
                {line || ' '}
              </pre>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function VisualSection({ topicId, moduleId }) {
  const [is3D, setIs3D] = useState(false)
  const [speedIndex, setSpeedIndex] = useState(1)

  const {
    currentFrame, isPlaying, isComplete,
    play, pause, nextStep, prevStep, reset, setInput,
  } = useVisualizerState(topicId, SPEEDS[speedIndex].delay)

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border-2 border-red-600 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-red-100 bg-red-50/50">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
            <HiPlay className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900">Interactive Visualization</h2>
            <p className="text-xs text-slate-500">Watch the algorithm come to life step-by-step</p>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <InputPanel onSetInput={setInput} topicId={topicId} />
            </div>
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setIs3D(false)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  !is3D ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <HiDeviceMobile className="text-sm" /> 2D
              </button>
              <button
                onClick={() => setIs3D(true)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  is3D ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <HiCube className="text-sm" /> 3D
              </button>
            </div>
          </div>

          {/* Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-slate-50 rounded-xl p-4 min-h-[300px]">
              {is3D ? (
                <ThreeVisualizer key={`3d-${topicId}`} frame={currentFrame} topicId={topicId} isComplete={isComplete} />
              ) : (
                <Visualizer frame={currentFrame} topicId={topicId} isComplete={isComplete} />
              )}
            </div>

            <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 overflow-hidden">
              <CodeSnippetPanel topicId={topicId} currentFrame={currentFrame} isPlaying={isPlaying} />
            </div>
          </div>

          {/* Playback Controls */}
          <div className="border-t border-slate-100 pt-4">
            <VisualizerControls
              isPlaying={isPlaying}
              isComplete={isComplete}
              onPlay={play}
              onPause={pause}
              onNext={nextStep}
              onPrev={prevStep}
              onReset={reset}
              speedIndex={speedIndex}
              onSpeedChange={setSpeedIndex}
            />
          </div>
        </div>
      </div>

      {/* AI Tutor for Step Explanations */}
      <div className="bg-white rounded-2xl border-2 border-red-600 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-red-100">
          <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center shrink-0">
            <HiSparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-bold text-base text-slate-900">AI Tutor — Ask Questions</h3>
            <p className="text-xs text-slate-500">
              {currentFrame?.description 
                ? `Current: ${currentFrame.description}` 
                : 'Ask about the algorithm, steps, or complexity'}
            </p>
          </div>
        </div>
        <AIChatPanel
          moduleId={moduleId}
          topicId={topicId}
          currentStepDescription={currentFrame?.description || ''}
        />
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3: PATTERNS & ALGORITHMS
// ═══════════════════════════════════════════════════════════════════════════

function PatternCard({ pattern }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="text-left flex-1">
          <h4 className="font-semibold text-slate-900">{pattern.name}</h4>
          <p className="text-xs text-slate-600 mt-1">{pattern.description}</p>
          <div className="flex gap-3 mt-2 text-xs">
            <span className="text-emerald-600 font-mono">Time: {pattern.timeComplexity}</span>
            <span className="text-red-600 font-mono">Space: {pattern.spaceComplexity}</span>
          </div>
        </div>
        {isExpanded ? (
          <HiChevronUp className="w-5 h-5 text-slate-400 ml-3" />
        ) : (
          <HiChevronDown className="w-5 h-5 text-slate-400 ml-3" />
        )}
      </button>

      {isExpanded && (
        <div className="px-5 pb-4 border-t border-slate-100">
          <div className="bg-slate-900 rounded-lg p-4 mt-3">
            <pre className="text-xs text-slate-300 overflow-x-auto">
              <code>{pattern.code}</code>
            </pre>
          </div>
          <div className="mt-3">
            <p className="text-xs font-semibold text-slate-700 mb-2">Common Use Cases:</p>
            <ul className="text-xs text-slate-600 space-y-1">
              {pattern.useCases.map((useCase, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

function PatternsSection({ patterns }) {
  if (!patterns || patterns.length === 0) return null

  return (
    <div className="bg-white rounded-2xl border-2 border-red-600 shadow-sm p-6">
      <div className="flex items-center gap-3 pb-4 border-b border-red-100">
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center border border-red-200">
          <HiLightningBolt className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Popular Patterns & Algorithms</h2>
          <p className="text-xs text-slate-500">Common techniques and implementations</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {patterns.map((pattern, idx) => (
          <PatternCard key={idx} pattern={pattern} />
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 4: PRACTICE QUESTIONS
// ═══════════════════════════════════════════════════════════════════════════

function PracticeQuestionCard({ question, onAnswer, userAnswer }) {
  const [showExplanation, setShowExplanation] = useState(false)
  const isAnswered = userAnswer !== null
  const isCorrect = userAnswer === question.correct

  const difficultyColors = {
    Easy: 'bg-green-50 text-green-700 border-green-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    Hard: 'bg-red-50 text-red-700 border-red-200',
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-slate-900 flex-1">{question.question}</p>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full border shrink-0 ${difficultyColors[question.difficulty]}`}>
          {question.difficulty}
        </span>
      </div>

      <div className="space-y-2">
        {question.options.map((option, idx) => {
          const isSelected = userAnswer === idx
          const isCorrectAnswer = question.correct === idx
          
          let buttonClasses = 'w-full text-left px-4 py-3 rounded-lg border-2 text-sm transition-all '
          
          if (!isAnswered) {
            buttonClasses += 'border-slate-200 hover:border-red-600 hover:bg-red-50'
          } else if (isCorrectAnswer) {
            buttonClasses += 'border-emerald-400 bg-emerald-50 text-emerald-900'
          } else if (isSelected && !isCorrect) {
            buttonClasses += 'border-red-400 bg-red-50 text-red-900'
          } else {
            buttonClasses += 'border-slate-200 bg-slate-50 opacity-60'
          }

          return (
            <button
              key={idx}
              onClick={() => !isAnswered && onAnswer(idx)}
              disabled={isAnswered}
              className={buttonClasses}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {isAnswered && isCorrectAnswer && (
                  <HiCheckCircle className="w-5 h-5 text-emerald-600" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <HiXCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {isAnswered && (
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            {showExplanation ? <HiChevronUp className="w-4 h-4" /> : <HiChevronDown className="w-4 h-4" />}
            {showExplanation ? 'Hide' : 'Show'} Explanation
          </button>
          
          {showExplanation && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-xs text-red-900 leading-relaxed">{question.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function PracticeSection({ questions }) {
  const [userAnswers, setUserAnswers] = useState({})

  if (!questions || questions.length === 0) return null

  const handleAnswer = (questionId, answerIdx) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answerIdx }))
  }

  const totalAnswered = Object.keys(userAnswers).length
  const correctAnswers = Object.entries(userAnswers).filter(
    ([qId, ans]) => questions.find(q => q.id === qId)?.correct === ans
  ).length

  return (
    <div className="bg-white rounded-2xl border-2 border-red-600 shadow-sm p-6">
      <div className="flex items-center gap-3 pb-4 border-b border-red-100">
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center border border-red-200">
          <HiAcademicCap className="w-6 h-6 text-red-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-900">Practice Questions</h2>
          <p className="text-xs text-slate-500">Test your understanding</p>
        </div>
        {totalAnswered > 0 && (
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">
              {correctAnswers}/{totalAnswered} correct
            </p>
            <p className="text-xs text-slate-500">
              {Math.round((correctAnswers / totalAnswered) * 100)}% accuracy
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-4">
        {questions.map((question) => (
          <PracticeQuestionCard
            key={question.id}
            question={question}
            onAnswer={(answerIdx) => handleAnswer(question.id, answerIdx)}
            userAnswer={userAnswers[question.id] ?? null}
          />
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function ComprehensiveTopicPage({ moduleId: moduleIdProp }) {
  const { topicId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { recordTopicVisit } = useProgress()

  const queryParams = new URLSearchParams(location.search)
  const initialTab = location.state?.tab || queryParams.get('tab') || 'visual'
  const [activeTab, setActiveTab] = useState(initialTab)

  // Use prop first (passed from router), fallback to URL parsing
  const moduleId = moduleIdProp || location.pathname.split('/').filter(Boolean)[1] || 'dsa'

  const module = MODULE_REGISTRY.find(m => m.id === moduleId) || MODULE_REGISTRY[0]
  const topic = module?.topics.find(t => t.id === topicId) || { id: topicId, label: topicId ? topicId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Topic', icon: '⚡' }
  
  // Get content or construct fallback so visualization always loads
  const rawTopicContent = getTopicContent(moduleId, topicId)
  const topicContent = rawTopicContent || {
    theory: {
      title: topic.label,
      sections: [{ heading: 'Core Concepts', content: `Interactive step-by-step visual simulation and AI doubt resolution for ${topic.label}.` }]
    },
    patterns: [],
    questions: []
  }

  useEffect(() => {
    if (moduleId && topicId) {
      recordTopicVisit(moduleId, topicId)
    }
  }, [moduleId, topicId, recordTopicVisit])

  useEffect(() => {
    const tabParam = location.state?.tab || new URLSearchParams(location.search).get('tab')
    if (tabParam && ['theory', 'visual', 'patterns', 'practice'].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [location.search, location.state])

  const tabs = [
    { id: 'theory', label: 'Theory', icon: HiBookOpen },
    { id: 'visual', label: 'Visual', icon: HiPlay },
    { id: 'patterns', label: 'Patterns', icon: HiLightningBolt },
    { id: 'practice', label: 'Practice', icon: HiAcademicCap },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        
        {/* Prominent Back Navigation Bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap bg-white rounded-2xl p-4 shadow-sm border border-red-100">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/app/${moduleId}`)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-xl font-heading font-bold text-sm transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <HiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to {module?.label || moduleId?.toUpperCase()}</span>
            </button>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <nav className="hidden sm:flex items-center gap-2 text-sm text-slate-500 font-medium">
              <Link to="/app" className="hover:text-red-600 transition-colors">Home</Link>
              <span>/</span>
              <Link to={`/app/${moduleId}`} className="hover:text-red-600 transition-colors">
                {module?.label}
              </Link>
              <span>/</span>
              <span className="text-slate-900 font-bold">{topic.label}</span>
            </nav>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
          >
            <span>← Previous Page</span>
          </button>
        </div>

        {/* Header */}
        <div className="bg-white border-2 border-red-600 rounded-3xl p-8 text-slate-900 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex items-center gap-4">
            <div className="text-6xl">{topic.icon}</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-heading font-black mb-2 text-slate-900">{topic.label}</h1>
              <p className="text-slate-600 text-lg">
                Complete learning: Theory → Visualization → Patterns → Practice
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-2 flex gap-2 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-heading font-bold text-sm transition-all ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md scale-105'
                    : 'text-slate-700 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content Sections */}
        <div className="pb-8">
          {activeTab === 'theory' && <TheorySection content={topicContent.theory} />}
          {activeTab === 'visual' && <VisualSection topicId={topicId} moduleId={moduleId} />}
          {activeTab === 'patterns' && <PatternsSection patterns={topicContent.patterns} />}
          {activeTab === 'practice' && <PracticeSection questions={topicContent.questions} />}
        </div>

      </div>
    </div>
  )
}

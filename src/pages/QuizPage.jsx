// src/pages/QuizPage.jsx
import { useState, useCallback } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import { useAIEngine } from '../hooks/useAIEngine'
import { useProgress } from '../hooks/useProgress'
import { getStaticQuestions } from '../data/staticQuestions'
import { MODULE_REGISTRY } from '../data/moduleRegistry'
import QuestionCard from '../components/quiz/QuestionCard'
import VisualQuestionCard from '../components/quiz/VisualQuestionCard'
import FeedbackOverlay from '../components/quiz/FeedbackOverlay'
import LoadingSpinner from '../components/LoadingSpinner'
import {
  HiArrowLeft, HiAcademicCap, HiRefresh, HiArrowRight, HiCheckCircle, HiChip
} from 'react-icons/hi'

function ScoreRing({ score, total }) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0
  const color =
    pct === 100 ? '#10b981' :
    pct >= 80   ? '#180060' :
    pct >= 60   ? '#487890' :
    '#f43f5e'
  const grade =
    pct === 100 ? 'Perfect Score!' :
    pct >= 80   ? 'Great Job!' :
    pct >= 60   ? 'Good Effort!' :
    'Keep Practicing!'

  return (
    <div className="flex flex-col items-center gap-4 font-heading">
      <div
        className="w-36 h-36 rounded-full flex items-center justify-center border-8 shadow-sm"
        style={{ borderColor: color, background: `${color}10` }}
      >
        <div className="text-center font-mono">
          <p className="text-4xl font-extrabold" style={{ color }}>{pct}%</p>
          <p className="text-xs text-[#487890] font-bold">{score}/{total}</p>
        </div>
      </div>
      <p className="text-lg font-bold text-[#180018]">{grade}</p>
    </div>
  )
}

export default function QuizPage() {
  const { moduleId, topicId } = useParams()
  const navigate              = useNavigate()
  const location              = useLocation()

  const returnTo = location.state?.returnTo ?? `/app/${moduleId}/${topicId}`

  const { generateQuiz } = useAIEngine(moduleId, topicId)
  const { recordQuizComplete } = useProgress()

  const [phase, setPhase]           = useState('idle')
  const [questions, setQuestions]   = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected]     = useState(null)
  const [score, setScore]           = useState(0)

  const mod   = MODULE_REGISTRY.find(m => m.id === moduleId)
  const topic = mod?.topics.find(t => t.id === topicId)

  const startQuiz = useCallback(async () => {
    setPhase('loading')
    try {
      const qs = await generateQuiz(topicId)
      setQuestions(qs)
    } catch {
      setQuestions(getStaticQuestions(topicId))
    }
    setCurrentIdx(0)
    setSelected(null)
    setScore(0)
    setPhase('active')
  }, [generateQuiz, topicId])

  function handleAnswer(idx) {
    setSelected(idx)
    if (idx === questions[currentIdx].correctIndex) {
      setScore(s => s + 1)
    }
  }

  function handleNext() {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1)
      setSelected(null)
    } else {
      recordQuizComplete(moduleId, topicId, score + (selected === questions[currentIdx].correctIndex ? 1 : 0), questions.length)
      setPhase('summary')
    }
  }

  function handleRetake() {
    setPhase('idle')
    setSelected(null)
    setScore(0)
    setCurrentIdx(0)
    setQuestions([])
  }

  function handleBackToTopic() {
    const finalScore = phase === 'summary' ? score : 0
    navigate(returnTo, {
      state: {
        quizResult: {
          score: finalScore,
          total: questions.length,
          topicId,
        },
      },
    })
  }

  const current = questions[currentIdx]

  return (
    <main className="max-w-2xl mx-auto space-y-6 font-body">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleBackToTopic}
          className="flex items-center gap-2 text-xs font-heading font-bold text-[#180060] hover:text-[#180018] transition-colors"
        >
          <HiArrowLeft /> Back to {topic?.label ?? topicId}
        </button>
      </div>

      {/* Main Quiz Card */}
      <div className="bg-white rounded-[13px] border border-[#180060]/15 shadow-sm overflow-hidden font-heading">
        {/* Quiz header bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#180060]/10 bg-[#180060] text-white">
          <HiChip className="text-[#90c0d8] text-xl" />
          <div>
            <p className="text-[10px] text-[#90c0d8] font-mono font-bold uppercase tracking-wider">{mod?.label}</p>
            <h1 className="font-bold text-white text-sm">Interactive Quiz — {topic?.label ?? topicId}</h1>
          </div>
          {phase === 'active' && (
            <span className="ml-auto text-xs font-mono font-bold text-[#90c0d8]">
              {currentIdx + 1} / {questions.length}
            </span>
          )}
        </div>

        <div className="p-6 md:p-8">
          {/* IDLE */}
          {phase === 'idle' && (
            <div className="flex flex-col items-center gap-6 py-8 text-center">
              <div className="w-16 h-16 rounded-[13px] bg-[#180060]/5 border border-[#180060]/15 flex items-center justify-center">
                <HiAcademicCap className="text-3xl text-[#180060]" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-[#180018]">Ready to test your knowledge?</h2>
                <p className="text-xs text-[#487890] font-body">5 Gemini AI-generated MCQ questions about {topic?.label ?? topicId}</p>
              </div>
              <button
                onClick={startQuiz}
                className="td-btn-primary"
              >
                Start Quiz Now <HiArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* LOADING */}
          {phase === 'loading' && (
            <div className="py-12">
              <LoadingSpinner message="Gemini AI is crafting questions..." />
            </div>
          )}

          {/* ACTIVE */}
          {phase === 'active' && current && (
            <div className="space-y-4">
              <div className="flex gap-1.5">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-1.5 rounded-full transition-colors ${
                      i < currentIdx  ? 'bg-emerald-500' :
                      i === currentIdx ? 'bg-[#180060]'   :
                      'bg-slate-200'
                    }`}
                  />
                ))}
              </div>

              {current.isVisual ? (
                <VisualQuestionCard
                  question={current}
                  questionNumber={currentIdx + 1}
                  total={questions.length}
                  onAnswer={handleAnswer}
                  disabled={selected !== null}
                />
              ) : (
                <QuestionCard
                  question={current}
                  questionNumber={currentIdx + 1}
                  total={questions.length}
                  onAnswer={handleAnswer}
                  disabled={selected !== null}
                />
              )}

              {selected !== null && (
                <FeedbackOverlay
                  isCorrect={selected === current.correctIndex}
                  correctIndex={current.correctIndex}
                  explanation={current.explanation}
                  options={current.options}
                  onNext={handleNext}
                />
              )}
            </div>
          )}

          {/* SUMMARY */}
          {phase === 'summary' && (
            <div className="flex flex-col items-center gap-8 py-6 text-center">
              <ScoreRing score={score} total={questions.length} />

              <div className="w-full space-y-2 text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-[#180060] mb-3">Question Breakdown</p>
                {questions.map((q, i) => {
                  const correct = q._userAnswer === q.correctIndex
                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-3.5 rounded-[11px] border text-xs ${
                        correct
                          ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                          : 'bg-red-50/50 border-red-200 text-red-900'
                      }`}
                    >
                      <HiCheckCircle
                        className={`text-base shrink-0 mt-0.5 ${correct ? 'text-emerald-600' : 'text-red-500'}`}
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-[#180018] truncate">{q.text}</p>
                        <p className={`text-[11px] mt-0.5 font-mono ${correct ? 'text-emerald-700' : 'text-red-600'}`}>
                          {correct ? 'Correct' : `Correct Answer: ${q.options?.[q.correctIndex] ?? ''}`}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex gap-3 flex-wrap justify-center">
                <button
                  onClick={handleRetake}
                  className="td-btn-secondary text-xs"
                >
                  <HiRefresh /> Retake Quiz
                </button>
                <button
                  onClick={handleBackToTopic}
                  className="td-btn-primary text-xs"
                >
                  Back to Topic <HiArrowRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

// src/components/quiz/QuizContainer.jsx
import { useState, useCallback } from 'react'
import { useAIEngine } from '../../hooks/useAIEngine'
import { useProgress } from '../../hooks/useProgress'
import { getStaticQuestions } from '../../data/staticQuestions'
import QuestionCard from './QuestionCard'
import VisualQuestionCard from './VisualQuestionCard'
import FeedbackOverlay from './FeedbackOverlay'
import QuizSummary from './QuizSummary'
import LoadingSpinner from '../LoadingSpinner'

export default function QuizContainer({ moduleId, topicId, onClose }) {
  const { generateQuiz } = useAIEngine(moduleId, topicId)
  const { recordQuizComplete } = useProgress()

  const [phase, setPhase] = useState('idle') // idle | loading | active | summary
  const [questions, setQuestions] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)

  const topicLabel = topicId === 'bubblesort' ? 'Bubble Sort' : topicId === 'linkedlist' ? 'Linked List' : 'Arrays'

  const startQuiz = useCallback(async () => {
    setPhase('loading')
    try {
      const qs = await generateQuiz(topicId)
      setQuestions(qs)
      setCurrentIdx(0)
      setSelectedAnswer(null)
      setScore(0)
      setPhase('active')
    } catch {
      const qs = getStaticQuestions(topicId)
      setQuestions(qs)
      setCurrentIdx(0)
      setSelectedAnswer(null)
      setScore(0)
      setPhase('active')
    }
  }, [generateQuiz, topicId])

  function handleAnswer(idx) {
    setSelectedAnswer(idx)
    if (idx === questions[currentIdx].correctIndex) {
      setScore((s) => s + 1)
    }
  }

  function handleNext() {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1)
      setSelectedAnswer(null)
    } else {
      setPhase('summary')
    }
  }

  function handleComplete(finalScore, total) {
    recordQuizComplete(moduleId, topicId, finalScore, total)
  }

  function handleRetake() {
    setPhase('idle')
    setSelectedAnswer(null)
    setScore(0)
    setCurrentIdx(0)
    setQuestions([])
  }

  const currentQuestion = questions[currentIdx]
  const answered = selectedAnswer !== null

  if (phase === 'idle') {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="text-5xl" aria-hidden="true">🧠</div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Ready to test your knowledge?</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">5 questions about {topicLabel}</p>
        <button
          onClick={startQuiz}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Start Quiz
        </button>
      </div>
    )
  }

  if (phase === 'loading') return <LoadingSpinner message="Generating quiz questions…" />

  if (phase === 'summary') {
    return (
      <QuizSummary
        score={score}
        total={questions.length}
        onComplete={handleComplete}
        onRetake={handleRetake}
        onContinue={onClose ?? (() => {})}
      />
    )
  }

  // active
  return (
    <div className="space-y-4">
      {/* Step progress dots */}
      <div className="flex gap-1">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1 rounded-full transition-colors ${
              i < currentIdx ? 'bg-green-400' :
              i === currentIdx ? 'bg-blue-500' :
              'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>

      {currentQuestion?.isVisual ? (
        <VisualQuestionCard
          question={currentQuestion}
          questionNumber={currentIdx + 1}
          total={questions.length}
          onAnswer={handleAnswer}
          disabled={answered}
        />
      ) : (
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentIdx + 1}
          total={questions.length}
          onAnswer={handleAnswer}
          disabled={answered}
        />
      )}

      {answered && (
        <FeedbackOverlay
          isCorrect={selectedAnswer === currentQuestion.correctIndex}
          correctIndex={currentQuestion.correctIndex}
          explanation={currentQuestion.explanation}
          options={currentQuestion.options}
          onNext={handleNext}
        />
      )}
    </div>
  )
}

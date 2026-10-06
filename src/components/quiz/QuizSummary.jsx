// src/components/quiz/QuizSummary.jsx
import { useEffect } from 'react'
import { HiRefresh, HiArrowRight } from 'react-icons/hi'

export default function QuizSummary({ score, total, onRetake, onContinue, onComplete }) {
  useEffect(() => {
    if (onComplete) onComplete(score, total)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const pct = total > 0 ? Math.round((score / total) * 100) : 0
  const grade =
    pct === 100 ? '🏆 Perfect!' :
    pct >= 80   ? '⭐ Great job!' :
    pct >= 60   ? '👍 Good effort!' :
    '📚 Keep practicing!'

  return (
    <div className="flex flex-col items-center gap-6 py-8 px-4 text-center">
      <div className="text-5xl" aria-hidden="true">{pct >= 80 ? '🎉' : '📊'}</div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {score} / {total} correct
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{grade}</p>
      </div>
      <div className="w-32 h-32 rounded-full border-8 border-blue-200 dark:border-blue-900 flex items-center justify-center">
        <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{pct}%</span>
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={onRetake}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <HiRefresh aria-hidden="true" /> Retake Quiz
        </button>
        <button
          onClick={onContinue}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Continue <HiArrowRight aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

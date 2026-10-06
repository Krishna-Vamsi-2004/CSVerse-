// src/components/quiz/FeedbackOverlay.jsx
const OPTION_LETTERS = ['A', 'B', 'C', 'D']

export default function FeedbackOverlay({ isCorrect, correctIndex, explanation, options, onNext }) {
  return (
    <div
      className={`rounded-xl border-2 p-4 space-y-3 transition-all ${
        isCorrect
          ? 'border-green-400 bg-green-50 dark:bg-green-900/20'
          : 'border-red-400 bg-red-50 dark:bg-red-900/20'
      }`}
      role="alert"
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl" aria-hidden="true">{isCorrect ? '✅' : '❌'}</span>
        <p className={`font-semibold text-sm ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
          {isCorrect ? 'Correct!' : 'Not quite.'}
        </p>
      </div>
      {!isCorrect && options && (
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Correct answer:{' '}
          <strong>
            {OPTION_LETTERS[correctIndex]}. {options[correctIndex]}
          </strong>
        </p>
      )}
      {explanation && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{explanation}</p>
      )}
      <button
        onClick={onNext}
        autoFocus
        className="w-full py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Next Question →
      </button>
    </div>
  )
}

// src/components/quiz/VisualQuestionCard.jsx
import QuestionCard from './QuestionCard'

function ArrayVisual({ data }) {
  if (!Array.isArray(data)) return null
  return (
    <div className="flex items-center justify-center gap-1 py-2 flex-wrap">
      {data.map((val, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 border border-blue-300 dark:border-blue-700 flex items-center justify-center text-sm font-bold text-blue-700 dark:text-blue-300">
            {val}
          </div>
          <span className="text-xs text-gray-400">[{i}]</span>
        </div>
      ))}
    </div>
  )
}

export default function VisualQuestionCard({ question, questionNumber, total, onAnswer, disabled }) {
  return (
    <div className="space-y-3">
      {question.visualData && (
        <div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3">
          <ArrayVisual data={question.visualData} />
        </div>
      )}
      <QuestionCard
        question={question}
        questionNumber={questionNumber}
        total={total}
        onAnswer={onAnswer}
        disabled={disabled}
      />
    </div>
  )
}

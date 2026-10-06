// src/components/quiz/QuestionCard.jsx
const OPTION_LETTERS = ['A', 'B', 'C', 'D']

// Option accent colors — each option gets its own tint
const OPTION_COLORS = [
  { bg: 'bg-blue-50   hover:bg-blue-100',   border: 'border-blue-200   hover:border-blue-400',   badge: 'bg-blue-100   text-blue-700'   },
  { bg: 'bg-violet-50 hover:bg-violet-100', border: 'border-violet-200 hover:border-violet-400', badge: 'bg-violet-100 text-violet-700' },
  { bg: 'bg-emerald-50 hover:bg-emerald-100', border: 'border-emerald-200 hover:border-emerald-400', badge: 'bg-emerald-100 text-emerald-700' },
  { bg: 'bg-amber-50  hover:bg-amber-100',  border: 'border-amber-200  hover:border-amber-400',  badge: 'bg-amber-100  text-amber-700'  },
]

export default function QuestionCard({ question, questionNumber, total, onAnswer, disabled = false }) {
  return (
    <div className="space-y-5">
      {/* Question text */}
      <div className="flex items-start gap-2">
        <span className="shrink-0 text-xs font-bold text-blue-500 mt-1">
          Q{questionNumber}/{total}
        </span>
        <p className="text-base font-semibold text-slate-900 leading-snug">{question.text}</p>
      </div>

      {/* Options */}
      <div className="space-y-2.5">
        {question.options.map((option, idx) => {
          const c = OPTION_COLORS[idx % OPTION_COLORS.length]
          return (
            <button
              key={idx}
              onClick={() => onAnswer(idx)}
              disabled={disabled}
              aria-label={`Option ${OPTION_LETTERS[idx]}: ${option}`}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm font-medium text-slate-700 transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                disabled:opacity-50 disabled:cursor-not-allowed
                ${c.bg} ${c.border}`}
            >
              <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${c.badge}`}>
                {OPTION_LETTERS[idx]}
              </span>
              <span className="text-slate-800">{option}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

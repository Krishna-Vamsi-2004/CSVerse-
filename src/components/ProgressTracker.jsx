// src/components/ProgressTracker.jsx
export default function ProgressTracker({ value = 0, label, showLabel = true }) {
  const clamped = Math.min(100, Math.max(0, value))
  const barColor =
    clamped === 100 ? 'bg-green-500' :
    clamped >= 60  ? 'bg-blue-500'  :
    clamped >= 30  ? 'bg-yellow-500' :
    'bg-gray-300 dark:bg-gray-600'

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{label}</span>}
          {showLabel && (
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-auto">
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={label ?? `Progress: ${clamped}%`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}

// src/components/LoadingSpinner.jsx
export default function LoadingSpinner({ message = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-3" role="status" aria-live="polite">
      <div
        className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"
        aria-hidden="true"
      />
      <span className="text-sm text-gray-500 dark:text-gray-400">{message}</span>
    </div>
  )
}

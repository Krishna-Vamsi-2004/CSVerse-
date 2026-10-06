// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom'
import { HiHome } from 'react-icons/hi'

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 gap-6">
      <div className="text-8xl font-extrabold text-gray-200 dark:text-gray-700 select-none">404</div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Page not found</h1>
        <p className="text-gray-500 dark:text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <Link
        to="/app"
        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <HiHome aria-hidden="true" /> Back to Home
      </Link>
    </main>
  )
}

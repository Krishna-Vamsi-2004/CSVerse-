import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import AppLayout from '../layouts/AppLayout'

// Public landing page — no app shell
const LandingPage             = lazy(() => import('../pages/LandingPage'))

// App pages — all nested under /app with AppLayout
const HomePage                = lazy(() => import('../pages/HomePage'))
const DSAIndexPage            = lazy(() => import('../pages/DSAIndexPage'))
const ComprehensiveTopicPage  = lazy(() => import('../pages/ComprehensiveTopicPage'))
const DBMSIndexPage           = lazy(() => import('../pages/DBMSIndexPage'))
const NetworkingIndexPage     = lazy(() => import('../pages/NetworkingIndexPage'))
const OSIndexPage             = lazy(() => import('../pages/OSIndexPage'))
const ProgressDashboardPage   = lazy(() => import('../pages/ProgressDashboardPage'))
const QuizPage                = lazy(() => import('../pages/QuizPage'))
const NotFoundPage            = lazy(() => import('../pages/NotFoundPage'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* ── Public landing — no sidebar/navbar ── */}
        <Route path="/" element={<LandingPage />} />

        {/* ── App shell — all routes under /app ── */}
        <Route path="/app" element={<AppLayout />}>
          <Route index                            element={<HomePage />} />
          <Route path="dsa"                       element={<DSAIndexPage />} />
          <Route path="dsa/:topicId"              element={<ComprehensiveTopicPage moduleId="dsa" />} />
          <Route path="dbms"                      element={<DBMSIndexPage />} />
          <Route path="dbms/:topicId"             element={<ComprehensiveTopicPage moduleId="dbms" />} />
          <Route path="networking"                element={<NetworkingIndexPage />} />
          <Route path="networking/:topicId"       element={<ComprehensiveTopicPage moduleId="networking" />} />
          <Route path="os"                        element={<OSIndexPage />} />
          <Route path="os/:topicId"               element={<ComprehensiveTopicPage moduleId="os" />} />
          <Route path=":moduleId/:topicId/quiz"   element={<QuizPage />} />
          <Route path="progress"                  element={<ProgressDashboardPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

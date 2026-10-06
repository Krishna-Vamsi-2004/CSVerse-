import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import AppLayout from '../layouts/AppLayout'

// Public landing page — no app shell
const LandingPage             = lazy(() => import('../pages/LandingPage'))

// App pages — all nested under /app with AppLayout
const HomePage                = lazy(() => import('../pages/HomePage'))
const DSAIndexPage            = lazy(() => import('../pages/DSAIndexPage'))
const DSATopicPage            = lazy(() => import('../pages/DSATopicPage'))
const DBMSIndexPage           = lazy(() => import('../pages/DBMSIndexPage'))
const DBMSTopicPage           = lazy(() => import('../pages/DBMSTopicPage'))
const NetworkingIndexPage     = lazy(() => import('../pages/NetworkingIndexPage'))
const NetworkingTopicPage     = lazy(() => import('../pages/NetworkingTopicPage'))
const OSIndexPage             = lazy(() => import('../pages/OSIndexPage'))
const OSTopicPage             = lazy(() => import('../pages/OSTopicPage'))
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
          <Route path="dsa/:topicId"              element={<DSATopicPage />} />
          <Route path="dbms"                      element={<DBMSIndexPage />} />
          <Route path="dbms/:topicId"             element={<DBMSTopicPage />} />
          <Route path="networking"                element={<NetworkingIndexPage />} />
          <Route path="networking/:topicId"       element={<NetworkingTopicPage />} />
          <Route path="os"                        element={<OSIndexPage />} />
          <Route path="os/:topicId"               element={<OSTopicPage />} />
          <Route path=":moduleId/:topicId/quiz"   element={<QuizPage />} />
          <Route path="progress"                  element={<ProgressDashboardPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

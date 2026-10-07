import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import { ThemeProvider } from './context/ThemeContext'
import { ProgressProvider } from './context/ProgressContext'
import { AudioNarratorProvider } from './context/AudioNarratorContext'
import ErrorBoundary from './components/ErrorBoundary'
import FloatingAIChat from './components/FloatingAIChat'

export default function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <BrowserRouter>
          <AudioNarratorProvider>
            <ErrorBoundary>
              <AppRoutes />
              {/* Global Floating AI Assistant Bot - Rendered on every page */}
              <FloatingAIChat />
            </ErrorBoundary>
          </AudioNarratorProvider>
        </BrowserRouter>
      </ProgressProvider>
    </ThemeProvider>
  )
}

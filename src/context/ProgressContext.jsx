// src/context/ProgressContext.jsx
import { createContext, useContext, useEffect, useReducer } from 'react'

const STORAGE_KEY = 'csverse_progress'

const initialState = { version: 1, modules: {} }

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    const parsed = JSON.parse(raw)
    if (parsed && parsed.version && parsed.modules) return parsed
    return initialState
  } catch (e) {
    console.error('[ProgressContext] Failed to load progress from storage:', e)
    return initialState
  }
}

function progressReducer(state, action) {
  switch (action.type) {
    case 'RECORD_TOPIC_VISIT': {
      const { moduleId, topicId } = action.payload
      const current = state.modules[moduleId]?.[topicId] ?? {
        completionPct: 0, quizScore: null, learningTimeSec: 0, lastVisited: null
      }
      return {
        ...state,
        modules: {
          ...state.modules,
          [moduleId]: {
            ...state.modules[moduleId],
            [topicId]: {
              ...current,
              lastVisited: new Date().toISOString(),
              learningTimeSec: current.learningTimeSec + 1,
            },
          },
        },
      }
    }
    case 'RECORD_VISUALIZER_COMPLETE': {
      const { moduleId, topicId } = action.payload
      const current = state.modules[moduleId]?.[topicId] ?? {
        completionPct: 0, quizScore: null, learningTimeSec: 0, lastVisited: null
      }
      const newPct = Math.min(100, Math.max(current.completionPct, 50))
      return {
        ...state,
        modules: {
          ...state.modules,
          [moduleId]: {
            ...state.modules[moduleId],
            [topicId]: { ...current, completionPct: newPct },
          },
        },
      }
    }
    case 'RECORD_QUIZ_COMPLETE': {
      const { moduleId, topicId, score, total } = action.payload
      const current = state.modules[moduleId]?.[topicId] ?? {
        completionPct: 0, quizScore: null, learningTimeSec: 0, lastVisited: null
      }
      const quizPct = total > 0 ? Math.round((score / total) * 100) : 0
      const newPct = Math.min(100, Math.max(current.completionPct, quizPct === 100 ? 100 : 50 + Math.round(quizPct / 2)))
      return {
        ...state,
        modules: {
          ...state.modules,
          [moduleId]: {
            ...state.modules[moduleId],
            [topicId]: { ...current, quizScore: score, completionPct: newPct },
          },
        },
      }
    }
    case 'RESET_PROGRESS':
      return initialState
    default:
      return state
  }
}

export const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [state, dispatch] = useReducer(progressReducer, undefined, loadFromStorage)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.error('[ProgressContext] Failed to save progress:', e)
    }
  }, [state])

  return (
    <ProgressContext.Provider value={{ state, dispatch }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgressContext() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgressContext must be used within ProgressProvider')
  return ctx
}

export default ProgressContext

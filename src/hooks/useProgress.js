// src/hooks/useProgress.js
import { useCallback } from 'react'
import { useProgressContext } from '../context/ProgressContext'

const EMPTY_TOPIC = {
  completionPct: 0,
  quizScore: null,
  learningTimeSec: 0,
  lastVisited: null,
}

export function useProgress() {
  const { state, dispatch } = useProgressContext()

  const getTopicProgress = useCallback(
    (moduleId, topicId) => state.modules[moduleId]?.[topicId] ?? EMPTY_TOPIC,
    [state]
  )

  const recordTopicVisit = useCallback(
    (moduleId, topicId) => dispatch({ type: 'RECORD_TOPIC_VISIT', payload: { moduleId, topicId } }),
    [dispatch]
  )

  const recordVisualizerComplete = useCallback(
    (moduleId, topicId) => dispatch({ type: 'RECORD_VISUALIZER_COMPLETE', payload: { moduleId, topicId } }),
    [dispatch]
  )

  const recordQuizComplete = useCallback(
    (moduleId, topicId, score, total) =>
      dispatch({ type: 'RECORD_QUIZ_COMPLETE', payload: { moduleId, topicId, score, total } }),
    [dispatch]
  )

  const resetProgress = useCallback(() => dispatch({ type: 'RESET_PROGRESS' }), [dispatch])

  const getTotalLearningTime = useCallback(() => {
    let total = 0
    for (const mod of Object.values(state.modules)) {
      for (const topic of Object.values(mod)) {
        total += topic.learningTimeSec ?? 0
      }
    }
    return total
  }, [state])

  const getAllModuleProgress = useCallback(() => {
    const result = {}
    for (const [modId, topics] of Object.entries(state.modules)) {
      const values = Object.values(topics)
      if (values.length === 0) {
        result[modId] = 0
      } else {
        result[modId] = Math.round(values.reduce((sum, t) => sum + t.completionPct, 0) / values.length)
      }
    }
    return result
  }, [state])

  return {
    getTopicProgress,
    recordVisualizerComplete,
    recordQuizComplete,
    recordTopicVisit,
    resetProgress,
    getTotalLearningTime,
    getAllModuleProgress,
  }
}

export default useProgress

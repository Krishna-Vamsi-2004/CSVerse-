// src/hooks/useAIEngine.js
import { useState, useRef, useCallback } from 'react'
import { buildPrompt, callGemini, GeminiTimeoutError, GeminiApiError } from '../services/aiEngine'
import { parseQuizResponse, parseInterviewResponse, ParseError } from '../services/quizParser'
import { getStaticQuestions } from '../data/staticQuestions'

export function useAIEngine(moduleId = 'dsa', topicId = 'arrays') {
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const pendingRef = useRef(false)
  const debounceRef = useRef(null)

  const handleError = useCallback((err) => {
    console.error('[useAIEngine] AI Tutor Error:', err)
    if (err instanceof GeminiTimeoutError) {
      setError('Request timed out. Please try again.')
    } else if (err instanceof GeminiApiError) {
      setError(`AI service error (${err.status}). Please try again.`)
    } else {
      setError('Something went wrong. Please try again.')
    }
  }, [])

  const explainStep = useCallback(async (stepDescription) => {
    if (pendingRef.current) return
    setError(null)
    setIsLoading(true)
    pendingRef.current = true
    try {
      const prompt = buildPrompt('explainStep', { moduleId, topicId, stepDescription })
      const { text } = await callGemini(prompt)
      setResponse(text)
    } catch (err) {
      handleError(err)
    } finally {
      setIsLoading(false)
      pendingRef.current = false
    }
  }, [moduleId, topicId, handleError])

  const askQuestion = useCallback((question) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      if (pendingRef.current) return
      setError(null)
      setIsLoading(true)
      pendingRef.current = true
      try {
        const prompt = buildPrompt('freeQuestion', { moduleId, topicId, userInput: question })
        const { text } = await callGemini(prompt)
        setResponse(text)
      } catch (err) {
        handleError(err)
      } finally {
        setIsLoading(false)
        pendingRef.current = false
      }
    }, 300)
  }, [moduleId, topicId, handleError])

  const explainCode = useCallback(async (codeSnippet) => {
    if (pendingRef.current) return
    setError(null)
    setIsLoading(true)
    pendingRef.current = true
    try {
      const prompt = buildPrompt('explainCode', { moduleId, topicId, userInput: codeSnippet })
      const { text } = await callGemini(prompt)
      setResponse(text)
    } catch (err) {
      handleError(err)
    } finally {
      setIsLoading(false)
      pendingRef.current = false
    }
  }, [moduleId, topicId, handleError])

  const generateQuiz = useCallback(async (targetTopicId) => {
    try {
      const prompt = buildPrompt('generateQuiz', { moduleId, topicId: targetTopicId ?? topicId })
      const { text } = await callGemini(prompt)
      return parseQuizResponse(text)
    } catch (err) {
      if (err instanceof ParseError) {
        console.warn('[useAIEngine] Quiz parse failed, using static fallback:', err.message)
        return getStaticQuestions(targetTopicId ?? topicId)
      }
      console.warn('[useAIEngine] Quiz generation failed, using static fallback:', err.message)
      return getStaticQuestions(targetTopicId ?? topicId)
    }
  }, [moduleId, topicId])

  const getInterview = useCallback(async (targetTopicId) => {
    const prompt = buildPrompt('interviewPrep', { moduleId, topicId: targetTopicId ?? topicId })
    const { text } = await callGemini(prompt)
    return parseInterviewResponse(text)
  }, [moduleId, topicId])

  const retry = useCallback(() => {
    setError(null)
    setResponse('')
  }, [])

  return { response, isLoading, error, explainStep, askQuestion, explainCode, generateQuiz, getInterview, retry }
}

export default useAIEngine

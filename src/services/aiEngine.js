// src/services/aiEngine.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Custom error types
export class GeminiTimeoutError extends Error {
  constructor() { super('Gemini API request timed out'); this.name = 'GeminiTimeoutError' }
}
export class GeminiApiError extends Error {
  constructor(status, message) { super(`Gemini API error ${status}: ${message}`); this.name = 'GeminiApiError'; this.status = status }
}

const TOPIC_LABELS = {
  arrays: 'Arrays',
  linkedlist: 'Linked List',
  bubblesort: 'Bubble Sort',
  selectionsort: 'Selection Sort',
  quicksort: 'Quick Sort',
  stacks: 'Stacks',
  queues: 'Queues',
  trees: 'Trees',
  treetraversal: 'Tree Traversal',
  binarysearch: 'Binary Search',
  graphs: 'Graphs',
}

/**
 * Build a Gemini prompt string.
 */
export function buildPrompt(mode, context) {
  const topic = TOPIC_LABELS[context.topicId] ?? context.topicId
  const step = context.stepDescription ?? ''

  switch (mode) {
    case 'explainStep':
      return `You are a CS tutor. Topic: ${topic}. Current step: "${step}". Explain what happened in this step in simple language. Keep it concise (2-3 sentences). Use markdown.`
    case 'freeQuestion':
      return `You are a CS tutor. Topic: ${topic}. Context: "${step}". Student question: "${context.userInput ?? ''}". Answer clearly.`
    case 'explainCode':
      return `You are a CS tutor. Explain this ${topic} code:\n\n\`\`\`\n${context.userInput ?? ''}\n\`\`\``
    case 'generateQuiz':
      return `Generate 5 MCQs about ${topic}. Format as JSON array: [{"id":"q1","text":"..","options":[".."],"correctIndex":0,"explanation":".."}]`
    case 'interviewPrep':
      return `Generate 3 interview questions about ${topic} with answers. Format as JSON array: [{"id":"iq1","question":"..","answer":"..","difficulty":"Easy"}]`
    default:
      return `You are a CS tutor. Topic: ${topic}. ${context.userInput ?? ''}`
  }
}

/**
 * Call the Gemini API using the official SDK.
 */
export async function callGemini(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  console.log('[aiEngine] API Key prefix:', apiKey ? apiKey.slice(0, 7) + '...' : 'MISSING')

  if (!apiKey || apiKey === 'your_key_here' || apiKey.length < 10) {
    return { text: `*[Demo Mode]* No valid API key found. Please add VITE_GEMINI_API_KEY to .env.local and restart the dev server.` }
  }

  // Models in priority order
  const modelsToTry = [
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro',
    'gemini-1.0-pro',
  ]

  let lastError = null

  for (const modelName of modelsToTry) {
    try {
      console.log(`[aiEngine] Trying model: ${modelName}`)

      // Use fetch directly against the REST endpoint — works with both AIza and AQ. key formats
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
        }),
      })

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}))
        const msg = errBody?.error?.message ?? res.statusText
        console.warn(`[aiEngine] ${modelName} HTTP ${res.status}: ${msg}`)
        lastError = { status: res.status, message: msg }

        // Retry on server-side errors; stop on auth errors
        if (res.status === 401 || res.status === 403) {
          throw new GeminiApiError(res.status, msg)
        }
        continue  // 404, 429, 500, 503 → try next model
      }

      const data = await res.json()
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
      console.log(`[aiEngine] Success: ${modelName}`)
      return { text }

    } catch (err) {
      if (err instanceof GeminiApiError) throw err   // auth errors bubble up immediately
      lastError = { status: 0, message: err.message }
      console.warn(`[aiEngine] ${modelName} fetch error:`, err.message)
      continue
    }
  }

  throw new GeminiApiError(
    lastError?.status || 503,
    `All models unavailable. Last: ${lastError?.message}`
  )
}

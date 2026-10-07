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
      return `You are a Computer Science tutor on CSVerse AI explaining a visual algorithm step.

Topic: ${topic}
Visual Step Description: "${step}"

Explain in 2-4 sentences exactly what is happening in this step — which elements are being compared, swapped, moved, or updated, and why. Be precise and educational. Use markdown.`

    case 'freeQuestion': {
      const question = (context.userInput ?? '').trim()
      return `You are a Computer Science expert tutor on CSVerse AI. A student asked you a specific question. You MUST answer their EXACT question directly and accurately.

Current Topic Context: ${topic}
Student's Question: "${question}"

Rules:
- Answer the student's EXACT question. Do not give a generic response.
- If the question is about a CS concept (algorithm, data structure, complexity, SQL, OS, networking), give a thorough technical explanation with Big-O complexity where relevant.
- If the question asks "what is X", define X clearly with examples.
- If the question asks "how does X work", explain the mechanism step by step.
- If the question asks "difference between X and Y", compare them directly in a table or list.
- If the question asks "why", explain the reasoning clearly.
- Use markdown formatting: **bold** for key terms, bullet points for lists, \`code\` for syntax.
- Keep the answer focused and under 300 words unless the question genuinely needs more.
- Do NOT start with "Great question!" or similar filler phrases.`
    }

    case 'explainCode':
      return `Explain the following ${topic} code snippet step-by-step for a Computer Science student:\n\n\`\`\`\n${context.userInput ?? ''}\n\`\`\``

    case 'generateQuiz':
      return `Generate 5 high-quality multiple choice questions about ${topic}. Format as JSON array: [{"id":"q1","text":"..","options":[".."],"correctIndex":0,"explanation":".."}]`

    case 'interviewPrep':
      return `Generate 3 real-world technical interview questions about ${topic} with answers. Format as JSON array: [{"id":"iq1","question":"..","answer":"..","difficulty":"Easy"}]`

    default:
      return `Answer this Computer Science question clearly and directly: "${context.userInput ?? ''}" (Topic: ${topic})`
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

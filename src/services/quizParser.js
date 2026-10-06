// src/services/quizParser.js

export class ParseError extends Error {
  constructor(message) { super(message); this.name = 'ParseError' }
}

/**
 * Parse a Gemini quiz response string into an array of Question objects.
 * Expects a JSON array of exactly 5 questions.
 * @param {string} rawText
 * @returns {Array<{id:string, text:string, options:string[], correctIndex:number, explanation:string, isVisual:boolean}>}
 * @throws {ParseError}
 */
export function parseQuizResponse(rawText) {
  if (!rawText || typeof rawText !== 'string') throw new ParseError('Empty response')

  // Extract JSON array from response (may have surrounding text)
  const match = rawText.match(/\[[\s\S]*\]/)
  if (!match) throw new ParseError('No JSON array found in quiz response')

  let parsed
  try {
    parsed = JSON.parse(match[0])
  } catch {
    throw new ParseError('Failed to parse quiz JSON')
  }

  if (!Array.isArray(parsed) || parsed.length !== 5) {
    throw new ParseError(`Expected 5 questions, got ${Array.isArray(parsed) ? parsed.length : 'non-array'}`)
  }

  return parsed.map((q, i) => {
    if (!q.text || !Array.isArray(q.options) || q.options.length !== 4) {
      throw new ParseError(`Question ${i + 1} is malformed`)
    }
    const correctIndex = typeof q.correctIndex === 'number' ? q.correctIndex : parseInt(q.correctIndex, 10)
    if (isNaN(correctIndex) || correctIndex < 0 || correctIndex > 3) {
      throw new ParseError(`Question ${i + 1} has invalid correctIndex: ${q.correctIndex}`)
    }
    return {
      id: q.id ?? `q${i + 1}`,
      text: String(q.text),
      options: q.options.map(String),
      correctIndex,
      explanation: String(q.explanation ?? ''),
      isVisual: false,
    }
  })
}

/**
 * Parse a Gemini interview response string into an array of InterviewQuestion objects.
 * @param {string} rawText
 * @returns {Array<{id:string, question:string, answer:string, difficulty:'Easy'|'Medium'|'Hard'}>}
 * @throws {ParseError}
 */
export function parseInterviewResponse(rawText) {
  if (!rawText || typeof rawText !== 'string') throw new ParseError('Empty response')

  const match = rawText.match(/\[[\s\S]*\]/)
  if (!match) throw new ParseError('No JSON array found in interview response')

  let parsed
  try {
    parsed = JSON.parse(match[0])
  } catch {
    throw new ParseError('Failed to parse interview JSON')
  }

  if (!Array.isArray(parsed)) throw new ParseError('Expected array of interview questions')

  const validDifficulties = ['Easy', 'Medium', 'Hard']
  return parsed.map((q, i) => {
    if (!q.question || !q.answer) throw new ParseError(`Interview question ${i + 1} missing question or answer`)
    const difficulty = validDifficulties.includes(q.difficulty) ? q.difficulty : 'Medium'
    return {
      id: q.id ?? `iq${i + 1}`,
      question: String(q.question),
      answer: String(q.answer),
      difficulty,
    }
  })
}

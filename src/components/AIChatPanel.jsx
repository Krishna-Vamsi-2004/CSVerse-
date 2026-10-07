// src/components/AIChatPanel.jsx
import { useState, useRef, useEffect, useCallback } from 'react'
import { useAIEngine } from '../hooks/useAIEngine'
import { getFallbackAnswer } from '../utils/aiFallback'
import {
  HiSparkles, HiPaperAirplane, HiRefresh,
  HiClipboard, HiCheck, HiX,
} from 'react-icons/hi'
import LoadingSpinner from './LoadingSpinner'

// Inline markdown helper
function InlineMarkdown({ text }) {
  if (!text) return null
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4)
          return <strong key={i} className="text-slate-900 font-bold">{part.slice(2, -2)}</strong>
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2)
          return <em key={i} className="text-slate-800 italic">{part.slice(1, -1)}</em>
        if (part.startsWith('`') && part.endsWith('`') && part.length > 2)
          return (
            <code key={i} className="bg-red-50 text-red-700 px-1 py-0.5 rounded text-xs font-mono font-semibold border border-red-200">
              {part.slice(1, -1)}
            </code>
          )
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

function SimpleMarkdown({ text }) {
  if (!text) return null
  const cleaned = text.replace(/\+\+([^+]+)\*\*/g, '**$1**')

  return (
    <div className="space-y-1.5 font-body">
      {cleaned.split('\n').map((line, i) => {
        const trimmed = line.trim()
        if (!trimmed) return <div key={i} className="h-1" />

        if (trimmed.startsWith('### '))
          return <h4 key={i} className="font-heading font-bold text-xs text-red-700 mt-2"><InlineMarkdown text={trimmed.slice(4)} /></h4>
        if (trimmed.startsWith('## '))
          return <h3 key={i} className="font-heading font-bold text-xs text-slate-900 mt-2"><InlineMarkdown text={trimmed.slice(3)} /></h3>
        if (trimmed.startsWith('# '))
          return <h2 key={i} className="font-heading font-bold text-sm text-slate-900 mt-2"><InlineMarkdown text={trimmed.slice(2)} /></h2>

        if (trimmed.startsWith('- ') || trimmed.startsWith('* '))
          return (
            <li key={i} className="ml-3 list-disc text-xs text-slate-800 leading-relaxed">
              <InlineMarkdown text={trimmed.slice(2)} />
            </li>
          )

        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/)
        if (numMatch) {
          return (
            <div key={i} className="flex items-start gap-1.5 ml-1 text-xs text-slate-800 leading-relaxed">
              <span className="font-bold text-red-600 font-mono shrink-0">{numMatch[1]}.</span>
              <div className="flex-1 min-w-0"><InlineMarkdown text={numMatch[2]} /></div>
            </div>
          )
        }

        if (trimmed.startsWith('```')) return null

        return (
          <p key={i} className="text-xs text-slate-800 leading-relaxed">
            <InlineMarkdown text={line} />
          </p>
        )
      })}
    </div>
  )
}

function ChatMessage({ role, content, isLoading, error, onRetry, onDismiss }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    if (!content) return
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [content])

  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] bg-red-600 text-white text-xs px-4 py-2.5 rounded-[13px] shadow-xs font-heading font-medium">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start gap-2">
      <div className="shrink-0 mt-1 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center border border-red-200">
        <HiSparkles className="text-xs text-red-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="bg-white border border-red-200 rounded-[13px] shadow-xs overflow-hidden">
          {isLoading && (
            <div className="px-4 py-3">
              <LoadingSpinner message="AI Assistant is analyzing..." />
            </div>
          )}
          {error && !isLoading && (
            <div className="flex flex-col items-center gap-2 px-4 py-3 text-center">
              <p className="text-xs text-red-600" role="alert">{error}</p>
              <button
                onClick={onRetry}
                className="flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-red-50 text-red-600 rounded-[9px] hover:bg-red-100 transition-colors"
              >
                <HiRefresh /> Retry
              </button>
            </div>
          )}
          {content && !isLoading && (
            <div className="px-4 py-3" aria-live="polite">
              <SimpleMarkdown text={content} />
            </div>
          )}
        </div>
        {content && !isLoading && (
          <div className="flex items-center gap-1 mt-1 px-1">
            <button
              onClick={handleCopy}
              className="p-1 rounded text-slate-400 hover:text-red-600 transition-colors"
              aria-label="Copy"
              title="Copy"
            >
              {copied ? <HiCheck className="text-xs text-emerald-500" /> : <HiClipboard className="text-xs" />}
            </button>
            <button
              onClick={onDismiss}
              className="p-1 rounded text-slate-400 hover:text-red-600 transition-colors"
              aria-label="Dismiss"
              title="Dismiss"
            >
              <HiX className="text-xs" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AIChatPanel({
  moduleId = 'dsa',
  topicId = 'arrays',
  currentStepDescription = '',
}) {
  const { response, isLoading, error, explainStep, askQuestion, retry } = useAIEngine(moduleId, topicId)

  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState('') // Track what question we're asking

  const inputRef  = useRef(null)
  const bottomRef = useRef(null)
  const responseHandledRef = useRef(false)

  // Handle AI response when it arrives
  useEffect(() => {
    if (isLoading || !currentQuestion) return
    
    // Avoid duplicate processing
    if (responseHandledRef.current) return
    responseHandledRef.current = true

    let aiText = response ?? ''
    
    // If error or no response, use intelligent fallback
    if (error || !response || response.includes('[Demo Mode]')) {
      aiText = getFallbackAnswer(currentQuestion, topicId)
    }
    
    setMessages(prev => [
      ...prev,
      { role: 'ai', content: aiText, error: null, id: Date.now() + Math.random() },
    ])
    
    setCurrentQuestion('') // Clear processed question
  }, [isLoading, response, error, currentQuestion, topicId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Clear everything when topic changes
  useEffect(() => {
    setMessages([])
    setInputValue('')
    setCurrentQuestion('')
    responseHandledRef.current = false
  }, [topicId])

  function sendMessage(text) {
    if (!text.trim()) return
    
    const userMessage = text.trim()
    setMessages(prev => [...prev, { role: 'user', content: userMessage, id: Date.now() }])
    setCurrentQuestion(userMessage) // Set what we're asking
    responseHandledRef.current = false // Reset handler
    askQuestion(userMessage)
    setInputValue('')
    inputRef.current?.focus()
  }

  function handleExplainStep() {
    const stepText = currentStepDescription || `Current step in ${topicId} algorithm visualization`
    const label = `Explain step: "${stepText}"`
    
    setMessages(prev => [...prev, { role: 'user', content: label, id: Date.now() }])
    setCurrentQuestion(label)
    responseHandledRef.current = false
    explainStep(stepText)
  }

  function handleSubmit(e) {
    e.preventDefault()
    sendMessage(inputValue)
  }

  function dismissMessage(id) {
    setMessages(prev => prev.filter(m => m.id !== id))
  }

  function retryLast() {
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')
    if (lastUserMsg) {
      setCurrentQuestion(lastUserMsg.content)
      responseHandledRef.current = false
      retry()
      askQuestion(lastUserMsg.content)
    }
  }

  return (
    <div className="bg-white rounded-[13px] border border-red-200 shadow-sm overflow-hidden font-heading">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-red-700 bg-red-600 text-white">
        <HiSparkles className="text-white text-base" aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-wider text-white">AI Assistant</span>
        {messages.length > 0 && (
          <button
            onClick={() => { setMessages([]); setCurrentQuestion(''); }}
            className="ml-auto text-[11px] text-red-100 hover:text-white transition-colors px-2 py-0.5 rounded bg-white/10"
          >
            Clear
          </button>
        )}
      </div>

      {/* Messages area */}
      <div className="flex flex-col gap-3 px-4 py-3 overflow-y-auto" style={{ maxHeight: messages.length || isLoading ? '18rem' : '0', transition: 'max-height 0.2s ease' }}>
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            role={msg.role}
            content={msg.content}
            error={msg.error}
            onRetry={retryLast}
            onDismiss={() => dismissMessage(msg.id)}
          />
        ))}

        {isLoading && currentQuestion && (
          <ChatMessage
            role="ai"
            content={null}
            isLoading={true}
            onDismiss={() => { setCurrentQuestion(''); }}
          />
        )}

        <div ref={bottomRef} />
      </div>

      {/* Action controls */}
      <div className="px-4 pb-3 pt-2 space-y-2">
        <button
          onClick={handleExplainStep}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold uppercase tracking-wider bg-red-600 text-white rounded-[11px] hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
        >
          <HiSparkles className="text-white" />
          Explain Current Simulation Step
        </button>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-[11px] px-3 py-2 focus-within:border-red-600 transition-all"
        >
          <label htmlFor="ai-chat-input" className="sr-only">Ask a question</label>
          <input
            id="ai-chat-input"
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Ask AI Assistant a question..."
            className="flex-1 bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none font-body"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            aria-label="Send"
            className="p-1.5 rounded-[9px] bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <HiPaperAirplane className="w-3.5 h-3.5 text-white" />
          </button>
        </form>
      </div>
    </div>
  )
}

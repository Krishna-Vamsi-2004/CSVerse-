// src/components/AIChatPanel.jsx
import { useState, useRef, useEffect, useCallback } from 'react'
import { useAIEngine } from '../hooks/useAIEngine'
import {
  HiSparkles, HiPaperAirplane, HiRefresh,
  HiClipboard, HiCheck, HiX,
} from 'react-icons/hi'
import LoadingSpinner from './LoadingSpinner'

// Inline markdown helper
function InlineMarkdown({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**'))
          return <strong key={i} className="text-[#180018] font-semibold">{part.slice(2, -2)}</strong>
        if (part.startsWith('`') && part.endsWith('`'))
          return (
            <code key={i} className="bg-[#180060]/10 px-1 py-0.5 rounded text-xs font-mono text-[#180060] font-semibold">
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
  return (
    <div className="space-y-1.5 font-body">
      {text.split('\n').map((line, i) => {
        if (line.trim().startsWith('- ') || line.trim().startsWith('* '))
          return (
            <li key={i} className="ml-4 list-disc text-xs text-[#303048]">
              <InlineMarkdown text={line.trim().slice(2)} />
            </li>
          )
        if (line.startsWith('## '))
          return <h3 key={i} className="font-heading font-bold text-xs text-[#180018] mt-2">{line.slice(3)}</h3>
        if (line.startsWith('# '))
          return <h2 key={i} className="font-heading font-bold text-sm text-[#180018] mt-2">{line.slice(2)}</h2>
        if (line.startsWith('```')) return <span key={i} />
        if (!line.trim()) return <div key={i} className="h-1" />
        return (
          <p key={i} className="text-xs text-[#303048] leading-relaxed">
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
        <div className="max-w-[85%] bg-[#180018] text-white text-xs px-4 py-2.5 rounded-[13px] shadow-xs font-heading">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start gap-2">
      <div className="shrink-0 mt-1 w-6 h-6 rounded-full bg-[#180060] text-[#90c0d8] flex items-center justify-center border border-[#90c0d8]/30">
        <HiSparkles className="text-xs" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="bg-white border border-[#180060]/15 rounded-[13px] shadow-xs overflow-hidden">
          {isLoading && (
            <div className="px-4 py-3">
              <LoadingSpinner message="Gemini AI is analyzing..." />
            </div>
          )}
          {error && !isLoading && (
            <div className="flex flex-col items-center gap-2 px-4 py-3 text-center">
              <p className="text-xs text-red-500" role="alert">{error}</p>
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
              className="p-1 rounded text-slate-400 hover:text-[#180060] transition-colors"
              aria-label="Copy"
              title="Copy"
            >
              {copied ? <HiCheck className="text-xs text-emerald-500" /> : <HiClipboard className="text-xs" />}
            </button>
            <button
              onClick={onDismiss}
              className="p-1 rounded text-slate-400 hover:text-red-500 transition-colors"
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
  const [pendingAI, setPendingAI] = useState(false)

  const inputRef  = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (!pendingAI) return
    if (isLoading) return
    setPendingAI(false)
    setMessages(prev => [
      ...prev,
      { role: 'ai', content: response ?? '', error: error ?? null, id: Date.now() + 1 },
    ])
  }, [isLoading])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, pendingAI])

  useEffect(() => {
    setMessages([])
    setPendingAI(false)
    setInputValue('')
  }, [topicId])

  function sendMessage(text) {
    if (!text.trim()) return
    setMessages(prev => [...prev, { role: 'user', content: text, id: Date.now() }])
    setPendingAI(true)
    askQuestion(text)
    setInputValue('')
    inputRef.current?.focus()
  }

  function handleExplainStep() {
    if (!currentStepDescription) return
    const label = 'Explain this step'
    setMessages(prev => [...prev, { role: 'user', content: label, id: Date.now() }])
    setPendingAI(true)
    explainStep(currentStepDescription)
  }

  function handleSubmit(e) {
    e.preventDefault()
    sendMessage(inputValue)
  }

  function dismissMessage(id) {
    setMessages(prev => prev.filter(m => m.id !== id))
  }

  function retryLast() {
    retry()
    setPendingAI(true)
  }

  return (
    <div className="bg-white rounded-[13px] border border-[#180060]/15 shadow-sm overflow-hidden font-heading">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#180060]/10 bg-[#180060] text-white">
        <HiSparkles className="text-[#90c0d8] text-base" aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-wider text-white">Gemini AI Tutor</span>
        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="ml-auto text-[11px] text-[#90c0d8] hover:text-white transition-colors px-2 py-0.5 rounded bg-white/10"
          >
            Clear
          </button>
        )}
      </div>

      {/* Messages area */}
      <div className="flex flex-col gap-3 px-4 py-3 overflow-y-auto" style={{ maxHeight: messages.length || pendingAI ? '18rem' : '0', transition: 'max-height 0.2s ease' }}>
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

        {pendingAI && isLoading && (
          <ChatMessage
            role="ai"
            content={null}
            isLoading={true}
            onDismiss={() => { setPendingAI(false) }}
          />
        )}

        <div ref={bottomRef} />
      </div>

      {/* Action controls */}
      <div className="px-4 pb-3 pt-2 space-y-2">
        <button
          onClick={handleExplainStep}
          disabled={isLoading || !currentStepDescription}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#180018] text-white rounded-[11px] hover:bg-[#180060] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
        >
          <HiSparkles className="text-[#90c0d8]" />
          Explain Current Simulation Step
        </button>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 bg-slate-50 border border-[#180060]/15 rounded-[11px] px-3 py-2 focus-within:border-[#180060] transition-all"
        >
          <label htmlFor="ai-chat-input" className="sr-only">Ask a question</label>
          <input
            id="ai-chat-input"
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Ask Gemini AI a question..."
            className="flex-1 bg-transparent text-xs text-[#180018] placeholder-[#487890] focus:outline-none font-body"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            aria-label="Send"
            className="p-1.5 rounded-[9px] bg-[#180060] text-white hover:bg-[#180018] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <HiPaperAirplane className="w-3.5 h-3.5 text-[#90c0d8]" />
          </button>
        </form>
      </div>
    </div>
  )
}

// src/components/FloatingAIChat.jsx
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiSparkles, HiX, HiPaperAirplane, HiVolumeUp, HiVolumeOff, HiRefresh, HiChip } from 'react-icons/hi'
import { useAIEngine } from '../hooks/useAIEngine'
import { getFallbackAnswer } from '../utils/aiFallback'

// Inline markdown helper for floating AI chat
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

export default function FloatingAIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasBounced, setHasBounced] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [messages, setMessages] = useState([])
  const [pendingText, setPendingText] = useState('')
  
  const messagesEndRef = useRef(null)
  const { askQuestion, isLoading, response, error } = useAIEngine('cs', 'general')

  // Listen for AI Engine response
  useEffect(() => {
    if (!pendingText || isLoading) return
    let replyText = ''
    if (error || !response || response.includes('[Demo Mode]')) {
      replyText = getFallbackAnswer(pendingText, '')
    } else {
      replyText = response
    }

    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: replyText, timestamp: new Date() }
    ])
    setPendingText('')

    // Optional audio speech synthesis
    if (isAudioEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(replyText.slice(0, 200))
      utterance.rate = 1.0
      window.speechSynthesis.speak(utterance)
    }
  }, [isLoading, response, error, pendingText, isAudioEnabled])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen, isLoading])

  const handleSendMessage = useCallback((text) => {
    if (!text.trim()) return
    const userMsg = { role: 'user', content: text.trim(), timestamp: new Date() }
    setMessages((prev) => [...prev, userMsg])
    setPendingText(text.trim())
    askQuestion(text.trim())
  }, [askQuestion])

  // Listen for external triggers to open floating AI chat
  useEffect(() => {
    const handleOpenChat = (e) => {
      setIsOpen(true)
      setHasBounced(false)
      if (e.detail?.question) {
        handleSendMessage(e.detail.question)
      }
    }
    window.addEventListener('open-ai-chat', handleOpenChat)
    return () => window.removeEventListener('open-ai-chat', handleOpenChat)
  }, [handleSendMessage])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return
    const text = inputValue.trim()
    setInputValue('')
    handleSendMessage(text)
  }

  const clearHistory = () => {
    setMessages([])
    if (window.speechSynthesis) window.speechSynthesis.cancel()
  }

  return (
    <>
      {/* FLOATING BOT TRIGGER BUTTON (BOTTOM RIGHT) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border-2 border-red-600 text-xs font-bold font-heading text-red-600 shadow-xl pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            AI Assistant
          </motion.div>
        )}

        <motion.button
          onClick={() => {
            setIsOpen(!isOpen)
            setHasBounced(false)
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`relative p-4 rounded-full bg-red-600 text-white shadow-2xl border-2 border-white flex items-center justify-center cursor-pointer transition-all hover:bg-red-700 ${
            hasBounced && !isOpen ? 'animate-bounce' : ''
          }`}
          aria-label="Toggle AI Assistant Chat"
        >
          {isOpen ? (
            <HiX className="w-6 h-6 text-white" />
          ) : (
            <>
              <HiSparkles className="w-6 h-6 text-white animate-pulse" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
            </>
          )}
        </motion.button>
      </div>

      {/* FLOATING CHAT PANEL OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] h-[540px] max-h-[75vh] bg-white border-2 border-red-600 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-body"
          >
            {/* Header */}
            <div className="bg-red-600 text-white px-4 py-3 flex items-center justify-between border-b border-red-700">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white text-red-600 flex items-center justify-center font-bold shadow-sm">
                  <HiChip className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                    CSVerse AI Assistant
                  </h3>
                  <p className="text-[10px] text-red-100 font-medium">Real-time Computer Science Tutor</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  className={`p-1.5 rounded-lg transition-colors text-xs ${
                    isAudioEnabled ? 'bg-white/20 text-white' : 'text-red-200 hover:text-white'
                  }`}
                  title={isAudioEnabled ? 'Voice narration active' : 'Voice narration muted'}
                >
                  {isAudioEnabled ? <HiVolumeUp className="w-4 h-4" /> : <HiVolumeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={clearHistory}
                  className="p-1.5 rounded-lg text-red-200 hover:text-white transition-colors"
                  title="Clear Chat History"
                >
                  <HiRefresh className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-red-200 hover:text-white transition-colors"
                  title="Close Chat"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Prompts Bar */}
            <div className="bg-red-50/60 border-b border-red-100 p-2.5 flex items-center gap-1.5 overflow-x-auto text-[11px] font-medium no-scrollbar">
              <button
                onClick={() => handleSendMessage('Explain Time Complexity of Bubble Sort vs Quick Sort')}
                className="px-2.5 py-1 rounded-full bg-white text-red-700 border border-red-200 hover:bg-red-600 hover:text-white transition-colors whitespace-nowrap shrink-0 shadow-2xs"
              >
                ⚡ Complexity
              </button>
              <button
                onClick={() => handleSendMessage('What is the difference between INNER JOIN and LEFT JOIN?')}
                className="px-2.5 py-1 rounded-full bg-white text-red-700 border border-red-200 hover:bg-red-600 hover:text-white transition-colors whitespace-nowrap shrink-0 shadow-2xs"
              >
                🗂️ SQL Joins
              </button>
              <button
                onClick={() => handleSendMessage('Explain TCP 3-Way Handshake step by step')}
                className="px-2.5 py-1 rounded-full bg-white text-red-700 border border-red-200 hover:bg-red-600 hover:text-white transition-colors whitespace-nowrap shrink-0 shadow-2xs"
              >
                🌐 TCP Handshake
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-xl font-bold border border-red-200">
                    🤖
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 text-sm">How can I help you today?</h4>
                  <p className="text-xs text-slate-500 max-w-[260px] leading-relaxed">
                    Ask me anything about Data Structures, SQL, OS Schedulers, or Computer Networks!
                  </p>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-red-600 text-white rounded-tr-none shadow-sm font-medium'
                          : 'bg-white text-slate-900 border border-slate-200 rounded-tl-none shadow-sm font-normal'
                      }`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="flex items-center gap-1.5 mb-1.5 text-[10px] font-bold text-red-600 uppercase tracking-wider font-mono">
                          <HiSparkles className="w-3 h-3 text-red-600" /> AI Assistant
                        </div>
                      )}
                      {msg.role === 'assistant' ? (
                        <SimpleMarkdown text={msg.content} />
                      ) : (
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      )}
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 px-1 font-mono">
                      {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                ))
              )}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-red-600 font-medium bg-red-50 p-3 rounded-2xl border border-red-100 w-fit animate-pulse">
                  <HiSparkles className="w-4 h-4 animate-spin text-red-600" />
                  <span>AI Assistant is analyzing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask AI Assistant a question..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 font-body transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="p-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-sm"
              >
                <HiPaperAirplane className="w-4 h-4 text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

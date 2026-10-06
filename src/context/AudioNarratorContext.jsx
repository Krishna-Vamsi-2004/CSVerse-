// src/context/AudioNarratorContext.jsx
import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

export const AudioNarratorContext = createContext(null)

export function AudioNarratorProvider({ children }) {
  const [isNarratorEnabled, setIsNarratorEnabled] = useState(() => {
    return localStorage.getItem('csverse_narrator_enabled') === 'true'
  })
  const [speechRate, setSpeechRate] = useState(() => {
    return parseFloat(localStorage.getItem('csverse_narrator_speed') || '1.0')
  })
  const [selectedVoiceURI, setSelectedVoiceURI] = useState(() => {
    return localStorage.getItem('csverse_narrator_voice') || ''
  })
  const [voices, setVoices] = useState([])
  const [currentWordIndex, setCurrentWordIndex] = useState(-1)
  const [currentText, setCurrentText] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [wordRanges, setWordRanges] = useState([])

  const isCancelledRef  = useRef(false)
  const speechRateRef   = useRef(speechRate)    // ref so speak() always uses latest rate
  const voiceURIRef     = useRef(selectedVoiceURI)
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window

  // Keep refs in sync whenever state changes
  useEffect(() => { speechRateRef.current = speechRate },       [speechRate])
  useEffect(() => { voiceURIRef.current   = selectedVoiceURI }, [selectedVoiceURI])

  // Load voices
  useEffect(() => {
    if (!supported) return
    const updateVoices = () => {
      const allVoices = window.speechSynthesis.getVoices()
      setVoices(allVoices)
    }
    updateVoices()
    window.speechSynthesis.onvoiceschanged = updateVoices
  }, [supported])

  // Save config changes
  useEffect(() => {
    localStorage.setItem('csverse_narrator_enabled', isNarratorEnabled)
  }, [isNarratorEnabled])

  useEffect(() => {
    localStorage.setItem('csverse_narrator_speed', speechRate)
  }, [speechRate])

  useEffect(() => {
    localStorage.setItem('csverse_narrator_voice', selectedVoiceURI)
  }, [selectedVoiceURI])

  const cancel = useCallback(() => {
    if (!supported) return
    isCancelledRef.current = true   // mark any live utterance as cancelled
    window.speechSynthesis.cancel() // immediately stop browser speech
    setIsSpeaking(false)
    setCurrentWordIndex(-1)
  }, [supported])

  const speak = useCallback((text, onEndCallback) => {
    if (!supported) return
    isCancelledRef.current = true
    window.speechSynthesis.cancel()

    if (!isNarratorEnabled) return

    isCancelledRef.current = false
    setCurrentText(text)

    const words = text.split(/\s+/)
    const ranges = []
    let charIdx = 0
    for (const w of words) {
      const start = text.indexOf(w, charIdx)
      if (start !== -1) { ranges.push({ word: w, start, end: start + w.length }); charIdx = start + w.length }
    }
    setWordRanges(ranges)
    setCurrentWordIndex(-1)

    const cleanText = text.replace(/[*`#]/g, '')
    const utterance = new SpeechSynthesisUtterance(cleanText)

    // Use refs so speed/voice changes take effect immediately without recreating speak
    if (voiceURIRef.current) {
      const voice = window.speechSynthesis.getVoices().find(v => v.voiceURI === voiceURIRef.current)
      if (voice) utterance.voice = voice
    }
    utterance.rate = speechRateRef.current

    utterance.onstart = () => {
      if (isCancelledRef.current) return
      setIsSpeaking(true); setCurrentWordIndex(0)
    }
    utterance.onboundary = (event) => {
      if (isCancelledRef.current || event.name !== 'word') return
      const idx = ranges.findIndex(r => event.charIndex >= r.start && event.charIndex < r.end)
      if (idx !== -1) setCurrentWordIndex(idx)
    }
    utterance.onend = () => {
      if (isCancelledRef.current) return
      setIsSpeaking(false); setCurrentWordIndex(-1)
      if (onEndCallback) onEndCallback()
    }
    utterance.onerror = (e) => {
      if (isCancelledRef.current) return
      console.warn('[AudioNarrator] error:', e.error)
      setIsSpeaking(false); setCurrentWordIndex(-1)
      if (onEndCallback) onEndCallback()
    }
    window.speechSynthesis.speak(utterance)
  }, [supported, isNarratorEnabled]) // removed selectedVoiceURI & speechRate — use refs

  // Stop speech on unmount
  useEffect(() => {
    return () => {
      if (supported) {
        window.speechSynthesis.cancel()
      }
    }
  }, [supported])

  // Stop speech whenever the route changes (navigation between topics/pages)
  const location = useLocation()
  useEffect(() => {
    if (!supported) return
    isCancelledRef.current = true
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    setCurrentWordIndex(-1)
  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AudioNarratorContext.Provider
      value={{
        isNarratorEnabled,
        setIsNarratorEnabled,
        speechRate,
        setSpeechRate,
        selectedVoiceURI,
        setSelectedVoiceURI,
        voices,
        currentWordIndex,
        currentText,
        isSpeaking,
        wordRanges,
        supported,
        speak,
        cancel
      }}
    >
      {children}
    </AudioNarratorContext.Provider>
  )
}

export function useAudioNarrator() {
  const ctx = useContext(AudioNarratorContext)
  if (!ctx) throw new Error('useAudioNarrator must be used within AudioNarratorProvider')
  return ctx
}

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  HiPlay, HiPause, HiArrowRight, HiArrowLeft, HiRefresh,
  HiVolumeUp, HiVolumeOff, HiCog, HiReply,
} from 'react-icons/hi'
import { useAudioNarrator } from '../../../context/AudioNarratorContext'

// Speed presets: label → timer delay in ms (used when narrator is off)
// When narrator is ON, SpeechSynthesis.rate is set via speechRateRef in context
const SPEEDS = [
  { label: '0.5×', delay: 3000, rate: 0.7 },
  { label: '1×',   delay: 1500, rate: 1.0 },
  { label: '1.5×', delay: 800,  rate: 1.3 },
  { label: '2×',   delay: 400,  rate: 1.7 },
]

export default function VisualizerControls({
  isPlaying, isComplete, onPlay, onPause, onNext, onPrev, onReset,
  // speed is controlled here and passed up so useVisualizerState can read it
  onSpeedChange,
  speedIndex = 1,
}) {
  const {
    isNarratorEnabled, setIsNarratorEnabled,
    setSpeechRate,
    selectedVoiceURI, setSelectedVoiceURI,
    voices, supported,
  } = useAudioNarrator()

  const [showSettings, setShowSettings] = useState(false)
  const settingsRef  = useRef(null)
  const stepCooldown = useRef(false)

  const handleStep = useCallback((fn) => {
    if (stepCooldown.current) return
    stepCooldown.current = true
    fn()
    setTimeout(() => { stepCooldown.current = false }, 350)
  }, [])

  // Sync speech rate with selected speed preset
  const handleSpeed = (idx) => {
    setSpeechRate(SPEEDS[idx].rate)
    onSpeedChange?.(idx)
  }

  const handlePlay = () => {
    if (supported) setIsNarratorEnabled(true)
    onPlay()
  }

  useEffect(() => {
    function handleOutside(e) {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) setShowSettings(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  const iconBtn = 'p-2 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-40 disabled:cursor-not-allowed'
  const secondary = `${iconBtn} bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600`
  const primary   = `${iconBtn} bg-blue-600 hover:bg-blue-700 text-white shadow-sm`
  const utility   = `${iconBtn} border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700`

  return (
    <div className="relative flex items-center px-1 py-2">

      {/* ── LEFT: Reset only ── */}
      <div className="flex items-center">
        <button onClick={onReset} className={secondary} title="Reset" aria-label="Reset">
          <HiRefresh className="text-lg" />
        </button>
      </div>

      {/* ── CENTER: Prev / Play-Pause-Replay / Next ── */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1" role="group" aria-label="Playback controls">
        <button onClick={() => handleStep(onPrev)} className={secondary} title="Previous step" aria-label="Previous step">
          <HiArrowLeft className="text-lg" />
        </button>

        {isComplete ? (
          <button onClick={onReset} className={primary} title="Replay" aria-label="Replay from start">
            <HiReply className="text-lg" />
          </button>
        ) : isPlaying ? (
          <button onClick={onPause} className={primary} title="Pause" aria-label="Pause">
            <HiPause className="text-lg" />
          </button>
        ) : (
          <button onClick={handlePlay} className={primary} title="Play" aria-label="Play">
            <HiPlay className="text-lg" />
          </button>
        )}

        <button onClick={() => handleStep(onNext)} disabled={isComplete} className={secondary} title="Next step" aria-label="Next step">
          <HiArrowRight className="text-lg" />
        </button>
      </div>

      {/* ── RIGHT: Speed presets + Voice ── */}
      <div className="ml-auto flex items-center gap-1">
        {SPEEDS.map((s, idx) => (
          <button
            key={s.label}
            onClick={() => handleSpeed(idx)}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all focus:outline-none
              ${speedIndex === idx
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            title={`Speed ${s.label}`}
          >
            {s.label}
          </button>
        ))}

        {supported && (
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setShowSettings(v => !v)}
              className={`${utility} flex items-center gap-1`}
              title="Voice settings"
              aria-label="Voice settings"
            >
              {isNarratorEnabled
                ? <HiVolumeUp className="text-base text-blue-500" />
                : <HiVolumeOff className="text-base" />}
              <HiCog className="text-sm" />
            </button>

            {showSettings && (
              <div className="absolute bottom-full mb-2 right-0 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-3 z-50">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Voice Settings</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Narration</span>
                  <button
                    onClick={() => setIsNarratorEnabled(v => !v)}
                    className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold transition-all
                      ${isNarratorEnabled ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}
                    aria-pressed={isNarratorEnabled}
                  >{isNarratorEnabled ? 'On' : 'Off'}</button>
                </div>
                <div className="mb-3">
                  <label className="text-[10px] text-gray-500 block mb-1">Voice</label>
                  <select
                    value={selectedVoiceURI}
                    onChange={e => setSelectedVoiceURI(e.target.value)}
                    className="w-full text-xs p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Default</option>
                    {voices.map(v => (
                      <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export { SPEEDS }

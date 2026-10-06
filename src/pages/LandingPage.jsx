// src/pages/LandingPage.jsx
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  HiArrowRight, HiPlay, HiPause, HiRefresh, HiSparkles,
  HiCheck, HiCode, HiMenu, HiX,
  HiChevronRight, HiTerminal, HiDatabase, HiGlobe, HiChip,
  HiVolumeUp, HiLightningBolt, HiChartBar, HiShieldCheck, HiDesktopComputer
} from 'react-icons/hi'
import {
  SiGoogle, SiPython, SiJavascript, SiReact, SiNodedotjs,
  SiPostgresql, SiLinux, SiDocker, SiCplusplus, SiTypescript,
  SiVercel, SiVite, SiGithub, SiMeta, SiWireshark
} from 'react-icons/si'

// ─────────────────────────────────────────────────────────────────────────────
// RESTRAINED SCROLL REVEAL WRAPPER
// Opacity + 12px translateY, 400ms ease-out, staggered 80ms
// ─────────────────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-400 ease-out ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(12px)',
      }}
    >
      {children}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN LANDING PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Interactive Visualizer Demo State
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeCodeTab, setActiveCodeTab] = useState('js')

  const sortingSteps = [
    { arr: [5, 2, 8, 1, 4], compare: [0, 1], swapped: false, msg: 'Comparing index 0 (5) and index 1 (2).' },
    { arr: [2, 5, 8, 1, 4], compare: [0, 1], swapped: true, msg: '5 > 2 → Swapped index 0 and 1. Array is now [2, 5, 8, 1, 4].' },
    { arr: [2, 5, 8, 1, 4], compare: [1, 2], swapped: false, msg: 'Comparing index 1 (5) and index 2 (8). 5 < 8 → No swap needed.' },
    { arr: [2, 5, 8, 1, 4], compare: [2, 3], swapped: false, msg: 'Comparing index 2 (8) and index 3 (1).' },
    { arr: [2, 5, 1, 8, 4], compare: [2, 3], swapped: true, msg: '8 > 1 → Swapped index 2 and 3. Array becomes [2, 5, 1, 8, 4].' },
    { arr: [2, 5, 1, 4, 8], compare: [3, 4], swapped: true, msg: '8 > 4 → Swapped index 3 and 4. Largest element (8) placed at end.' },
  ]

  useEffect(() => {
    let timer
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= sortingSteps.length - 1) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1400)
    }
    return () => clearInterval(timer)
  }, [isPlaying, sortingSteps.length])

  const currentStep = sortingSteps[activeStep]

  return (
    <div className="min-h-screen bg-white text-black font-body antialiased selection:bg-[#180060] selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────────────
          SECTION 1 — HEADER (~96px sticky height)
      ────────────────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[96px] transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-[#180060]/10 shadow-xs'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="td-container h-full flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 text-2xl font-bold font-heading tracking-tight text-[#180018] hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-[#180060] rounded-md"
          >
            <div className="w-9 h-9 rounded-[13px] bg-[#180060] text-white flex items-center justify-center font-mono text-sm font-bold shadow-md border border-[#90c0d8]/30">
              <HiChip className="w-5 h-5 text-[#90c0d8]" />
            </div>
            <span className="font-heading">CSVerse AI</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 font-heading text-sm font-medium text-[#303048]">
            <a href="#modules" className="hover:text-[#180060] transition-colors focus-visible:outline-2 focus-visible:outline-[#180060] rounded">
              Modules
            </a>
            <a href="#visualizers" className="hover:text-[#180060] transition-colors focus-visible:outline-2 focus-visible:outline-[#180060] rounded">
              Visualizers
            </a>
            <a href="#ai-explainer" className="hover:text-[#180060] transition-colors focus-visible:outline-2 focus-visible:outline-[#180060] rounded">
              AI Explainer
            </a>
            <a href="#code-proof" className="hover:text-[#180060] transition-colors focus-visible:outline-2 focus-visible:outline-[#180060] rounded">
              Code Engine
            </a>
            <a href="#metrics" className="hover:text-[#180060] transition-colors focus-visible:outline-2 focus-visible:outline-[#180060] rounded">
              Metrics
            </a>
          </nav>

          {/* Header Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/app" className="td-btn-primary">
              Launch Visualizer
              <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-[13px] border border-[#180060]/20 text-[#180018] hover:bg-[#180060]/5 focus-visible:outline-2 focus-visible:outline-[#180060]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Full-Screen Navigation Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-[96px] bg-white z-40 p-8 flex flex-col justify-between md:hidden animate-in fade-in duration-200">
            <nav className="flex flex-col gap-6 font-heading text-2xl font-medium text-[#180018]">
              <a
                href="#modules"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#180060] transition-colors flex items-center gap-3"
              >
                <HiChip className="w-6 h-6 text-[#180060]" />
                Modules (DSA, DBMS, OS, Networks)
              </a>
              <a
                href="#visualizers"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#180060] transition-colors flex items-center gap-3"
              >
                <HiChartBar className="w-6 h-6 text-[#180060]" />
                Interactive Visualizers
              </a>
              <a
                href="#ai-explainer"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#180060] transition-colors flex items-center gap-3"
              >
                <HiSparkles className="w-6 h-6 text-[#90c0d8]" />
                Gemini AI Explainer
              </a>
              <a
                href="#code-proof"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#180060] transition-colors flex items-center gap-3"
              >
                <HiTerminal className="w-6 h-6 text-[#180060]" />
                Code Engine & Terminal
              </a>
              <a
                href="#metrics"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#180060] transition-colors flex items-center gap-3"
              >
                <HiLightningBolt className="w-6 h-6 text-[#180060]" />
                Metrics & Stats
              </a>
            </nav>
            <div className="pt-6 border-t border-[#180060]/10 flex flex-col gap-4">
              <Link
                to="/app"
                onClick={() => setMobileMenuOpen(false)}
                className="td-btn-primary w-full text-center py-4 text-lg"
              >
                Launch Visualizer
              </Link>
              <p className="text-xs text-center text-[#487890] uppercase tracking-wider font-semibold">
                Free Tier · No Credit Card Required
              </p>
            </div>
          </div>
        )}
      </header>

      <main className="pt-[96px]">
        {/* ───────────────────────────────────────────────────────────────────
            SECTION 2 — HERO (100svh Rhythm)
            Rich Palette: Deep Navy (#180060), Sky Blue (#90c0d8), Accent (#180018)
        ──────────────────────────────────────────────────────────────────── */}
        <section className="min-h-[calc(100vh-96px)] flex flex-col justify-center py-16 md:py-24 td-blue-tint border-b border-[#180060]/10">
          <div className="td-container">
            {/* Hero Text Stack */}
            <div className="max-w-[860px] mx-auto text-center space-y-6">
              <Reveal delay={0}>
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#180060]/20 bg-white text-xs font-semibold uppercase tracking-wider text-[#180060] shadow-xs">
                  <SiGoogle className="w-3.5 h-3.5 text-[#180060]" />
                  <span>Powered by Gemini 3.6 AI Engine</span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="td-h1 text-[#180018]">
                  Release, Secure and Scale your CS Knowledge
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="td-body text-lg md:text-xl text-[#303048] max-w-[720px] mx-auto font-normal">
                  Interactive 3D visualizers, step-by-step Gemini AI explanations, adaptive quizzes, and execution flow for DSA, DBMS, OS, and Networks.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link to="/app" className="td-btn-primary">
                    Start Learning Free
                    <HiArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="#visualizers" className="td-btn-secondary">
                    Explore Visualizers
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Hero Window Chrome Visual Preview */}
            <Reveal delay={320} className="mt-12 md:mt-16">
              <div className="td-card p-0 overflow-hidden border border-[#180060]/20 shadow-2xl bg-white max-w-[1040px] mx-auto rounded-[13px]">
                {/* Window Chrome Top Header */}
                <div className="bg-[#180060] text-white px-4 py-3 flex items-center justify-between border-b border-[#90c0d8]/20">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
                    <span className="ml-3 font-mono text-xs text-[#90c0d8] hidden sm:inline-block">
                      csverse://visualizer/dsa/bubble-sort
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-heading font-medium">
                    <span className="px-2.5 py-1 rounded-md bg-[#90c0d8]/20 text-[#90c0d8] font-semibold border border-[#90c0d8]/30 flex items-center gap-1.5">
                      <HiChip className="w-3.5 h-3.5 text-[#90c0d8]" /> DSA Module
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/10 text-white hidden sm:inline-flex items-center gap-1.5">
                      <SiGoogle className="w-3 h-3 text-[#90c0d8]" /> Gemini Connected
                    </span>
                  </div>
                </div>

                {/* Window Content Split */}
                <div className="p-6 md:p-8 bg-slate-50 grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Visualizer Canvas */}
                  <div className="lg:col-span-7 bg-white rounded-[12px] p-6 border border-[#180060]/10 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-4 border-b border-[#180060]/10 mb-6">
                        <div>
                          <h3 className="font-heading text-lg font-bold text-[#180018] flex items-center gap-2">
                            <HiChartBar className="w-5 h-5 text-[#180060]" />
                            Bubble Sort Memory Visualizer
                          </h3>
                          <p className="text-xs text-[#487890]">
                            Step {activeStep + 1} of {sortingSteps.length} · Comparing array pointers
                          </p>
                        </div>
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="px-4 py-2 rounded-[13px] bg-[#180018] text-white text-xs font-semibold flex items-center gap-2 hover:bg-[#180060] transition-colors shadow-xs"
                        >
                          {isPlaying ? (
                            <>
                              <HiPause className="w-4 h-4 text-[#90c0d8]" /> Pause
                            </>
                          ) : (
                            <>
                              <HiPlay className="w-4 h-4 text-[#90c0d8]" /> Play Steps
                            </>
                          )}
                        </button>
                      </div>

                      {/* Memory Block Grid */}
                      <div className="flex items-end justify-center gap-3 py-8 min-h-[190px]">
                        {currentStep.arr.map((val, idx) => {
                          const isComparing = currentStep.compare.includes(idx)
                          const isSwapping = isComparing && currentStep.swapped
                          return (
                            <div key={idx} className="flex flex-col items-center gap-2">
                              <span className="text-[11px] font-mono font-medium text-[#487890]">
                                ptr[{idx}]
                              </span>
                              <div
                                className={`w-12 md:w-14 rounded-[12px] flex items-center justify-center font-heading font-bold text-lg transition-all duration-300 shadow-xs ${
                                  isSwapping
                                    ? 'bg-[#180018] text-white border-2 border-[#180060] scale-110 shadow-md'
                                    : isComparing
                                    ? 'bg-[#90c0d8] text-[#180018] border-2 border-[#180060] scale-105'
                                    : 'bg-white border border-[#303048]/20 text-[#180018]'
                                }`}
                                style={{ height: `${val * 16 + 42}px` }}
                              >
                                {val}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Step Navigation Bar */}
                    <div className="pt-4 border-t border-[#180060]/10 flex items-center justify-between text-xs font-mono text-[#303048]">
                      <span className="font-semibold text-[#180060]">Time Complexity: O(n²)</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                          className="px-3 py-1.5 rounded-[9px] bg-slate-100 hover:bg-[#180060] hover:text-white transition-colors font-semibold"
                        >
                          ← Prev Step
                        </button>
                        <button
                          onClick={() => setActiveStep((prev) => Math.min(sortingSteps.length - 1, prev + 1))}
                          className="px-3 py-1.5 rounded-[9px] bg-[#180060] text-white hover:bg-[#180018] transition-colors font-semibold"
                        >
                          Next Step →
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Gemini AI Side Panel */}
                  <div className="lg:col-span-5 td-navy-card p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-[#90c0d8]/20 pb-3">
                        <div className="flex items-center gap-2">
                          <HiSparkles className="w-5 h-5 text-[#90c0d8]" />
                          <span className="font-heading font-semibold text-sm tracking-wide text-white">
                            Gemini AI Narrator
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-[#90c0d8] border border-[#90c0d8]/30">
                          <HiVolumeUp className="w-3.5 h-3.5" /> Audio Stream
                        </span>
                      </div>

                      <div className="space-y-3 font-mono text-xs leading-relaxed text-slate-200">
                        <div className="bg-white/10 p-3.5 rounded-lg border border-white/15">
                          <strong className="text-[#90c0d8] block mb-1 font-sans text-xs uppercase tracking-wider">
                            Visual Step Log
                          </strong>
                          {currentStep.msg}
                        </div>
                        <p className="text-slate-200 bg-black/20 p-3 rounded-lg">
                          "In Bubble Sort, adjacent items are compared. If the left item is greater than the right item, they swap positions to push larger values toward the array boundary."
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#90c0d8]/20 mt-6 flex items-center justify-between text-xs text-[#90c0d8]">
                      <span>Module: Data Structures</span>
                      <Link to="/app/dsa/bubblesort" className="hover:underline flex items-center gap-1 text-white font-medium">
                        Open Full Engine <HiChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 3 — SOCIAL PROOF
            Authentic SVG Tech Logos (React, Python, JS, PostgreSQL, Docker, Linux, C++)
        ──────────────────────────────────────────────────────────────────── */}
        <section className="py-14 border-b border-[#180060]/10 bg-slate-50/60">
          <div className="td-container">
            <Reveal delay={0} className="text-center">
              <p className="td-eyebrow mb-8 text-[#487890]">
                BUILT WITH INDUSTRY-STANDARD COMPUTER SCIENCE TECHNOLOGIES
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 font-heading font-medium text-slate-700">
                <div className="flex items-center gap-2.5 opacity-70 hover:opacity-100 transition-opacity">
                  <SiReact className="w-7 h-7 text-[#180060]" />
                  <span className="text-base font-semibold text-[#180018]">React 19</span>
                </div>
                <div className="flex items-center gap-2.5 opacity-70 hover:opacity-100 transition-opacity">
                  <SiPython className="w-7 h-7 text-[#180060]" />
                  <span className="text-base font-semibold text-[#180018]">Python 3.12</span>
                </div>
                <div className="flex items-center gap-2.5 opacity-70 hover:opacity-100 transition-opacity">
                  <SiGoogle className="w-6 h-6 text-[#180060]" />
                  <span className="text-base font-semibold text-[#180018]">Gemini 3.6 API</span>
                </div>
                <div className="flex items-center gap-2.5 opacity-70 hover:opacity-100 transition-opacity">
                  <SiPostgresql className="w-7 h-7 text-[#180060]" />
                  <span className="text-base font-semibold text-[#180018]">PostgreSQL</span>
                </div>
                <div className="flex items-center gap-2.5 opacity-70 hover:opacity-100 transition-opacity">
                  <SiDocker className="w-7 h-7 text-[#180060]" />
                  <span className="text-base font-semibold text-[#180018]">Docker Container</span>
                </div>
                <div className="flex items-center gap-2.5 opacity-70 hover:opacity-100 transition-opacity">
                  <SiLinux className="w-6 h-6 text-[#180060]" />
                  <span className="text-base font-semibold text-[#180018]">Linux Kernel</span>
                </div>
                <div className="flex items-center gap-2.5 opacity-70 hover:opacity-100 transition-opacity">
                  <SiCplusplus className="w-7 h-7 text-[#180060]" />
                  <span className="text-base font-semibold text-[#180018]">C++20 Core</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTIONS 4–5 — SIGNATURE CONTENT
            Code Terminal & 4-Column Hard Metrics
        ──────────────────────────────────────────────────────────────────── */}
        <section id="code-proof" className="td-section-rhythm bg-white">
          <div className="td-container">
            {/* Header */}
            <div className="max-w-[720px] mx-auto text-center mb-12 space-y-4">
              <Reveal delay={0}>
                <span className="td-eyebrow">SIGNATURE ENGINE</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="td-h2">
                  Inspect real-time code & AI execution.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="td-body">
                  CSVerse AI compiles interactive simulation steps into clean JavaScript & Python data structures while Gemini 3.6 streams contextual explanations.
                </p>
              </Reveal>
            </div>

            {/* Terminal Window Chrome */}
            <Reveal delay={240}>
              <div className="td-card p-0 overflow-hidden bg-[#180018] text-white border border-[#180060]/30 rounded-[13px] shadow-2xl max-w-[960px] mx-auto font-mono">
                {/* Header */}
                <div className="bg-[#180060] px-4 py-3 border-b border-[#90c0d8]/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
                    <span className="ml-3 text-xs text-[#90c0d8]">
                      csverse-ai-runner.js — Node.js v20.11.0
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveCodeTab('js')}
                      className={`px-3 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
                        activeCodeTab === 'js' ? 'bg-[#90c0d8] text-[#180018] font-bold' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <SiJavascript className="w-3.5 h-3.5 text-[#180018]" /> JavaScript
                    </button>
                    <button
                      onClick={() => setActiveCodeTab('py')}
                      className={`px-3 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
                        activeCodeTab === 'py' ? 'bg-[#90c0d8] text-[#180018] font-bold' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <SiPython className="w-3.5 h-3.5 text-[#180018]" /> Python
                    </button>
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-6 text-sm overflow-x-auto leading-relaxed text-slate-200 bg-[#180018]">
                  {activeCodeTab === 'js' ? (
                    <pre className="space-y-1">
                      <span className="text-[#487890]">// CSVerse AI — Real-time Algorithm Visualizer & Gemini Bridge</span>{'\n'}
                      <span className="text-[#90c0d8]">import</span> &#123; CSVerseEngine, GeminiExplainer &#125; <span className="text-[#90c0d8]">from</span> <span className="text-emerald-400">'@csverse/ai-sdk'</span>;{'\n\n'}
                      <span className="text-[#90c0d8]">const</span> engine = <span className="text-[#90c0d8]">new</span> CSVerseEngine(&#123; module: <span className="text-emerald-400">'DSA'</span>, topic: <span className="text-emerald-400">'BubbleSort'</span> &#125;);{'\n'}
                      <span className="text-[#90c0d8]">const</span> ai = <span className="text-[#90c0d8]">new</span> GeminiExplainer(&#123; model: <span className="text-emerald-400">'gemini-3.6-flash'</span> &#125;);{'\n\n'}
                      <span className="text-[#487890]">// Execute step-by-step array visualization</span>{'\n'}
                      <span className="text-[#90c0d8]">await</span> engine.visualize([<span className="text-amber-300">5, 2, 8, 1, 4</span>], &#123;{'\n'}
                      {'  '}onSwap: (i, j) =&gt; engine.highlightSwappedNodes(i, j, <span className="text-emerald-400">'#180060'</span>),{'\n'}
                      {'  '}onStep: <span className="text-[#90c0d8]">async</span> (stepState) =&gt; &#123;{'\n'}
                      {'    '}<span className="text-[#90c0d8]">const</span> explanation = <span className="text-[#90c0d8]">await</span> ai.explainStep(stepState);{'\n'}
                      {'    '}console.log(<span className="text-emerald-400">"[AI Narrator]: " + stepState.explanation</span>);{'\n'}
                      {'  '}&#123;{'\n'}
                      &#125;);
                    </pre>
                  ) : (
                    <pre className="space-y-1">
                      <span className="text-[#487890]"># CSVerse AI — Python DSA Engine</span>{'\n'}
                      <span className="text-[#90c0d8]">from</span> csverse <span className="text-[#90c0d8]">import</span> AlgorithmVisualizer, GeminiTutor{'\n\n'}
                      visualizer = AlgorithmVisualizer(module=<span className="text-emerald-400">"DSA"</span>, topic=<span className="text-emerald-400">"BubbleSort"</span>){'\n'}
                      tutor = GeminiTutor(api_key=<span className="text-emerald-400">"GEMINI_API_KEY"</span>){'\n\n'}
                      <span className="text-[#90c0d8]">def</span> <span className="text-amber-300">bubble_sort_visualized</span>(arr):{'\n'}
                      {'    '}n = len(arr){'\n'}
                      {'    '}<span className="text-[#90c0d8]">for</span> i <span className="text-[#90c0d8]">in</span> range(n):{'\n'}
                      {'        '}<span className="text-[#90c0d8]">for</span> j <span className="text-[#90c0d8]">in</span> range(0, n-i-1):{'\n'}
                      {'            '}visualizer.highlight(j, j+1){'\n'}
                      {'            '}<span className="text-[#90c0d8]">if</span> arr[j] &gt; arr[j+1]:{'\n'}
                      {'                '}arr[j], arr[j+1] = arr[j+1], arr[j]{'\n'}
                      {'                '}visualizer.animate_swap(j, j+1){'\n'}
                      {'                '}tutor.narrate_step(state=arr, compared=(j, j+1))
                    </pre>
                  )}
                </div>

                {/* Footer bar */}
                <div className="bg-[#180060] px-6 py-3 border-t border-[#90c0d8]/20 flex items-center justify-between text-xs text-[#90c0d8]">
                  <span>Status: 200 OK · Visual Memory Synchronized</span>
                  <span>Execution Time: 14ms</span>
                </div>
              </div>
            </Reveal>

            {/* Hard Metrics Strip */}
            <div id="metrics" className="mt-20 pt-16 border-t border-[#180060]/10">
              <Reveal delay={0} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="space-y-2 p-6 rounded-[13px] bg-slate-50 border border-[#180060]/10">
                  <div className="td-h1 text-[#180060] font-bold">4</div>
                  <div className="td-eyebrow text-[#487890]">CS Modules (DSA, DBMS, OS, Networks)</div>
                </div>
                <div className="space-y-2 p-6 rounded-[13px] bg-slate-50 border border-[#180060]/10">
                  <div className="td-h1 text-[#180060] font-bold">50+</div>
                  <div className="td-eyebrow text-[#487890]">Interactive Visualizations</div>
                </div>
                <div className="space-y-2 p-6 rounded-[13px] bg-slate-50 border border-[#180060]/10">
                  <div className="td-h1 text-[#180060] font-bold">100%</div>
                  <div className="td-eyebrow text-[#487890]">Gemini AI Narrated Explanations</div>
                </div>
                <div className="space-y-2 p-6 rounded-[13px] bg-slate-50 border border-[#180060]/10">
                  <div className="td-h1 text-[#180060] font-bold">&lt;50ms</div>
                  <div className="td-eyebrow text-[#487890]">Visual Simulation Latency</div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 6 — FEATURE / VALUE (3 Alternating Rows)
        ──────────────────────────────────────────────────────────────────── */}
        <section id="modules" className="td-section-rhythm bg-slate-50/70 border-t border-[#180060]/10">
          <div className="td-container space-y-24 md:space-y-36">
            
            {/* ROW 1: Text Left / Visual Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <Reveal delay={0} className="lg:col-span-5 space-y-4">
                <span className="td-eyebrow text-[#180060]">MODULE 01 · DATA STRUCTURES & ALGORITHMS</span>
                <h2 className="td-h2">
                  See memory shifts in motion.
                </h2>
                <p className="td-body">
                  Stop struggling with abstract code. Visualize arrays, linked lists, stacks, queues, and sorting algorithms step-by-step with interactive playback controls.
                </p>
                <div className="pt-2">
                  <Link to="/app/dsa" className="td-btn-secondary text-xs">
                    Explore DSA Module <HiChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={120} className="lg:col-span-7">
                <div className="td-card p-6 bg-white border border-[#180060]/15 rounded-[13px] shadow-xl space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-[#180060]/10">
                    <span className="font-heading font-bold text-[#180018] flex items-center gap-2">
                      <HiChip className="w-5 h-5 text-[#180060]" /> Array & Pointer State
                    </span>
                    <span className="font-mono text-xs text-[#487890]">
                      Insertion Engine
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-3">
                    {[12, 24, 36, 48, 60].map((num, i) => (
                      <div key={i} className="p-4 rounded-[12px] bg-slate-50 border border-[#180060]/20 text-center font-heading font-bold text-lg text-[#180018] shadow-xs">
                        <div className="text-[10px] font-mono text-[#487890] font-normal mb-1">
                          ptr[{i}]
                        </div>
                        {num}
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-slate-100 rounded-lg text-xs font-mono text-[#303048] flex items-center justify-between border border-[#180060]/10">
                    <span>Operation: Insert(36) at Index 2</span>
                    <span className="text-[#180060] font-bold">O(1) Time Complexity</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ROW 2: Visual Left / Text Right */}
            <div id="ai-explainer" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <Reveal delay={0} className="lg:col-span-7 order-2 lg:order-1">
                <div className="td-navy-card p-6 rounded-[13px] shadow-xl space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-[#90c0d8]/20">
                    <div className="flex items-center gap-2">
                      <HiSparkles className="w-5 h-5 text-[#90c0d8]" />
                      <span className="font-heading font-bold text-white">
                        Gemini 3.6 AI Tutor
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#90c0d8]">
                      Voice & Text Breakdown
                    </span>
                  </div>
                  <div className="space-y-3 font-mono text-xs text-slate-200">
                    <div className="p-3.5 rounded-lg bg-white/10 border border-white/15 text-[#90c0d8]">
                      <strong>Student Question:</strong> "Why does quicksort have an average time complexity of O(n log n)?"
                    </div>
                    <div className="p-3.5 rounded-lg bg-black/20 text-white space-y-2 border border-white/10">
                      <p>
                        <strong>Gemini Answer:</strong> Quicksort divides the array around a pivot element into two balanced halves.
                      </p>
                      <ul className="list-disc list-inside text-slate-300 space-y-1">
                        <li>Division depth: log₂ n levels</li>
                        <li>Work per level: O(n) element comparisons</li>
                        <li>Total average complexity: O(n × log n)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120} className="lg:col-span-5 order-1 lg:order-2 space-y-4">
                <span className="td-eyebrow text-[#180060]">INTELLIGENT TUTORING</span>
                <h2 className="td-h2">
                  Gemini AI explains every step.
                </h2>
                <p className="td-body">
                  Ask any doubt mid-simulation. Gemini analyzes the precise algorithm state to explain why a swap occurred, calculate complexities, and speak audio explanations.
                </p>
                <div className="pt-2">
                  <Link to="/app" className="td-btn-secondary text-xs">
                    Try AI Tutor <HiChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* ROW 3: Text Left / Visual Right */}
            <div id="visualizers" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <Reveal delay={0} className="lg:col-span-5 space-y-4">
                <span className="td-eyebrow text-[#180060]">PROGRESS & QUIZ ENGINE</span>
                <h2 className="td-h2">
                  Master concepts with instant feedback.
                </h2>
                <p className="td-body">
                  Reinforce your learning with interactive MCQ quizzes and track topic completion across DSA, DBMS, Operating Systems, and Computer Networks.
                </p>
                <div className="pt-2">
                  <Link to="/app/progress" className="td-btn-secondary text-xs">
                    View Progress Dashboard <HiChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={120} className="lg:col-span-7">
                <div className="td-card p-6 bg-white border border-[#180060]/15 rounded-[13px] shadow-xl space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-[#180060]/10">
                    <span className="font-heading font-bold text-[#180018] flex items-center gap-2">
                      <HiChartBar className="w-5 h-5 text-[#180060]" /> Mastery Progress Dashboard
                    </span>
                    <span className="font-mono text-xs text-[#487890]">
                      Synchronized
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-heading font-semibold text-[#180018]">
                        <span>Data Structures & Algorithms (DSA)</span>
                        <span className="font-mono text-[#180060]">80% Complete</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-[#180060]/10">
                        <div className="bg-[#180060] h-3 rounded-full w-[80%]"></div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-heading font-semibold text-[#180018]">
                        <span>Database Management Systems (DBMS)</span>
                        <span className="font-mono text-[#180060]">65% Complete</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-[#180060]/10">
                        <div className="bg-[#180018] h-3 rounded-full w-[65%]"></div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-heading font-semibold text-[#180018]">
                        <span>Operating Systems (OS)</span>
                        <span className="font-mono text-[#487890]">50% Complete</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-[#180060]/10">
                        <div className="bg-[#487890] h-3 rounded-full w-[50%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 7 — FINAL CTA
        ──────────────────────────────────────────────────────────────────── */}
        <section className="td-section-rhythm bg-white">
          <div className="td-container">
            <Reveal delay={0}>
              <div className="td-blue-tint border border-[#180060]/20 rounded-[13px] p-10 md:p-20 text-center space-y-6 shadow-sm">
                <span className="td-eyebrow text-[#180060]">GET STARTED TODAY</span>
                <h2 className="td-h2 text-[#180018] max-w-[760px] mx-auto">
                  Ready to release, secure and scale your CS mastery?
                </h2>
                <p className="td-body max-w-[580px] mx-auto text-[#303048]">
                  Join thousands of computer science students mastering algorithms, database systems, and networks visually with Gemini AI.
                </p>
                <div className="pt-4 flex flex-col items-center gap-3">
                  <Link to="/app" className="td-btn-primary text-base px-8 py-4">
                    Launch CSVerse AI Free
                    <HiArrowRight className="w-5 h-5" />
                  </Link>
                  <p className="text-xs text-[#487890] uppercase tracking-wider font-semibold">
                    Free Tier · No Credit Card Required · Instant Access
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ─────────────────────────────────────────────────────────────────────
          SECTION 8 — FOOTER
      ────────────────────────────────────────────────────────────────────── */}
      <footer className="bg-[#180060] text-white border-t border-[#90c0d8]/20 py-16">
        <div className="td-container space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Brand Left */}
            <div className="md:col-span-5 space-y-4">
              <Link to="/" className="flex items-center gap-3 text-xl font-bold font-heading text-white">
                <div className="w-8 h-8 rounded-[11px] bg-[#90c0d8] text-[#180018] flex items-center justify-center font-mono text-xs font-bold">
                  CS
                </div>
                <span>CSVerse AI</span>
              </Link>
              <p className="text-xs text-slate-300 max-w-[320px] leading-relaxed">
                The interactive AI-powered learning platform for Computer Science algorithms, databases, operating systems, and computer networks.
              </p>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 font-heading text-xs">
              <div className="space-y-3">
                <span className="font-semibold text-[#90c0d8] uppercase tracking-wider">
                  Modules
                </span>
                <ul className="space-y-2 text-slate-300">
                  <li><Link to="/app/dsa" className="hover:text-white transition-colors">Data Structures</Link></li>
                  <li><Link to="/app/dbms" className="hover:text-white transition-colors">Database Systems</Link></li>
                  <li><Link to="/app/os" className="hover:text-white transition-colors">Operating Systems</Link></li>
                  <li><Link to="/app/networking" className="hover:text-white transition-colors">Computer Networks</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <span className="font-semibold text-[#90c0d8] uppercase tracking-wider">
                  Features
                </span>
                <ul className="space-y-2 text-slate-300">
                  <li><a href="#visualizers" className="hover:text-white transition-colors">3D Visualizers</a></li>
                  <li><a href="#ai-explainer" className="hover:text-white transition-colors">Gemini AI Tutor</a></li>
                  <li><a href="#code-proof" className="hover:text-white transition-colors">Code Terminal</a></li>
                  <li><Link to="/app/progress" className="hover:text-white transition-colors">Progress Tracker</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <span className="font-semibold text-[#90c0d8] uppercase tracking-wider">
                  Platform
                </span>
                <ul className="space-y-2 text-slate-300">
                  <li><Link to="/app" className="hover:text-white transition-colors">Launch Web App</Link></li>
                  <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub Repository</a></li>
                  <li><span className="text-[#90c0d8]">Release v2.0.0</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Legal Bottom */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© 2026 CSVerse AI Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer">Terms of Service</span>
              <span className="hover:text-white cursor-pointer">Security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

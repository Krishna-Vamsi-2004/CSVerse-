// src/pages/LandingPage.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  HiArrowRight, HiPlay, HiPause, HiSparkles,
  HiCheck, HiCode, HiMenu, HiX,
  HiChevronRight, HiTerminal, HiDatabase, HiGlobe, HiChip,
  HiVolumeUp, HiLightningBolt, HiChartBar, HiShieldCheck, HiAcademicCap,
  HiStar, HiBookOpen
} from 'react-icons/hi'
import {
  SiGoogle, SiPython, SiJavascript, SiReact,
  SiPostgresql, SiLinux, SiDocker, SiCplusplus,
  SiGithub
} from 'react-icons/si'
import VersionTimeline from '../components/VersionTimeline'
import CountUpMetric from '../components/CountUpMetric'

// ─────────────────────────────────────────────────────────────────────────────
// FRAMER MOTION SCROLL ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN LANDING PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Interactive Visualizer Demo State
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeCodeTab, setActiveCodeTab] = useState('js')

  const sortingSteps = [
    { arr: [5, 2, 8, 1, 4], compare: [0, 1], swapped: false, msg: 'Comparing index 0 (val: 5) and index 1 (val: 2).' },
    { arr: [2, 5, 8, 1, 4], compare: [0, 1], swapped: true, msg: '5 > 2 → Swapped index 0 & 1! Array becomes [2, 5, 8, 1, 4].' },
    { arr: [2, 5, 8, 1, 4], compare: [1, 2], swapped: false, msg: 'Comparing index 1 (val: 5) and index 2 (val: 8). 5 < 8 → In correct order.' },
    { arr: [2, 5, 8, 1, 4], compare: [2, 3], swapped: false, msg: 'Comparing index 2 (val: 8) and index 3 (val: 1).' },
    { arr: [2, 5, 1, 8, 4], compare: [2, 3], swapped: true, msg: '8 > 1 → Swapped index 2 & 3! Array becomes [2, 5, 1, 8, 4].' },
    { arr: [2, 5, 1, 4, 8], compare: [3, 4], swapped: true, msg: '8 > 4 → Swapped index 3 & 4. Largest element (8) bubbled to end!' },
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
    <div className="min-h-screen bg-white text-slate-900 font-body antialiased selection:bg-red-600 selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────────────
          HEADER / NAVBAR
      ────────────────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-red-100 shadow-sm'
            : 'bg-white/80 backdrop-blur-sm border-b border-red-100/50'
        }`}
      >
        <div className="td-container h-full flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-xl font-bold font-heading tracking-tight text-slate-900 hover:opacity-90 transition-opacity"
          >
            <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-mono text-xs font-bold shadow-md shadow-red-500/20 border border-red-500">
              <HiChip className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-black text-xl text-slate-900">
              CSVerse <span className="text-red-600">AI</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 font-heading text-sm font-bold text-slate-700">
            <a href="#modules" className="hover:text-red-600 transition-colors py-2">
              Modules
            </a>
            <a href="#ai-tutor" className="hover:text-red-600 transition-colors py-2">
              AI Tutor
            </a>
            <a href="#code-engine" className="hover:text-red-600 transition-colors py-2">
              Code Engine
            </a>
            <a href="#versions" className="hover:text-red-600 transition-colors py-2">
              Versions
            </a>
          </nav>

          {/* Header Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/app" className="td-btn-primary text-sm px-6 py-2.5 shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
              Launch App
              <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-900 hover:bg-red-50"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[72px] bg-white z-40 p-8 flex flex-col justify-between md:hidden"
          >
            <nav className="flex flex-col gap-5 font-heading text-xl font-bold text-slate-900">
              <a
                href="#modules"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-red-600 flex items-center gap-3 py-2"
              >
                <HiChip className="w-6 h-6 text-red-600" />
                Modules (DSA, DBMS, OS, Networks)
              </a>
              <a
                href="#ai-tutor"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-red-600 flex items-center gap-3 py-2"
              >
                <HiSparkles className="w-6 h-6 text-red-600" />
                AI Voice Tutor
              </a>
              <a
                href="#code-engine"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-red-600 flex items-center gap-3 py-2"
              >
                <HiTerminal className="w-6 h-6 text-red-600" />
                Live Code Engine
              </a>
              <a
                href="#versions"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-red-600 flex items-center gap-3 py-2"
              >
                <HiBookOpen className="w-6 h-6 text-red-600" />
                Product Versions
              </a>
            </nav>

            <div className="pt-6 border-t border-slate-200 flex flex-col gap-4">
              <Link
                to="/app"
                onClick={() => setMobileMenuOpen(false)}
                className="td-btn-primary w-full text-center py-4 text-lg"
              >
                Launch Visualizer Free
              </Link>
              <p className="text-xs text-center text-slate-500 uppercase tracking-wider font-semibold">
                Instant Access · No Credit Card Required
              </p>
            </div>
          </motion.div>
        )}
      </header>

      <main className="pt-[72px]">
        {/* ───────────────────────────────────────────────────────────────────
            SECTION 1 — HERO WITH ON-SCROLL ANIMATIONS
        ──────────────────────────────────────────────────────────────────── */}
        <section className="min-h-[calc(100vh-72px)] flex flex-col justify-center py-16 md:py-24 bg-gradient-to-br from-white via-red-50/40 to-slate-50 border-b border-red-100 rounded-b-[40px] md:rounded-b-[60px] overflow-hidden relative">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-400/5 rounded-full blur-3xl pointer-events-none" />

          <div className="td-container relative z-10">
            {/* Hero Text Stack */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-[880px] mx-auto text-center space-y-6"
            >
              <motion.div variants={fadeInUp}>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-red-200 bg-white text-xs font-bold uppercase tracking-wider text-red-600 shadow-sm hover:scale-105 transition-transform cursor-pointer">
                  <HiSparkles className="w-4 h-4 text-red-600" />
                  <span>Powered by AI Engine</span>
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                </div>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="td-h1 text-slate-900 tracking-tight font-black">
                Master Computer Science Visually with <span className="text-red-600">AI Assistant</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="td-body text-lg md:text-xl text-slate-600 max-w-[740px] mx-auto font-normal leading-relaxed">
                Step into an interactive universe of Data Structures, Algorithms, DBMS Joins, OS CPU Schedulers, and Networking OSI stacks with real-time AI voice explanations.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link to="/app" className="td-btn-primary text-base px-8 py-4 shadow-xl shadow-red-600/25 hover:scale-105 transition-transform flex items-center gap-2">
                  <span>Start Learning Free</span>
                  <HiArrowRight className="w-5 h-5" />
                </Link>
                <a href="#modules" className="td-btn-secondary text-base px-8 py-4">
                  Explore 4 Core Modules
                </a>
              </motion.div>

              {/* Quick Feature Badges */}
              <motion.div variants={fadeInUp} className="pt-6 flex items-center justify-center gap-6 text-xs text-slate-600 flex-wrap font-medium">
                <span className="flex items-center gap-1.5"><HiCheck className="text-red-600 w-4 h-4 font-bold" /> 33 DSA Visualizers</span>
                <span className="flex items-center gap-1.5"><HiCheck className="text-red-600 w-4 h-4 font-bold" /> Audio Voice AI Tutor</span>
                <span className="flex items-center gap-1.5"><HiCheck className="text-red-600 w-4 h-4 font-bold" /> SQL JOIN Engine</span>
                <span className="flex items-center gap-1.5"><HiCheck className="text-red-600 w-4 h-4 font-bold" /> 100% Free Tier</span>
              </motion.div>
            </motion.div>

            {/* Interactive Visualizer Canvas Demo */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={scaleUp}
              className="mt-14 md:mt-20 max-w-[1060px] mx-auto"
            >
              <div className="td-card p-0 overflow-hidden border border-red-200/90 shadow-2xl bg-white rounded-2xl">
                {/* Window Chrome Header */}
                <div className="bg-red-600 text-white px-5 py-3.5 flex items-center justify-between border-b border-red-700">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-white/40 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-white/40 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-white/40 inline-block"></span>
                    <span className="ml-3 font-mono text-xs text-red-100 hidden sm:inline-block">
                      csverse://visualizer/dsa/bubblesort
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-heading font-medium">
                    <span className="px-3 py-1 rounded-md bg-white/20 text-white font-semibold border border-white/30 flex items-center gap-1.5">
                      <HiChip className="w-4 h-4 text-white" /> Bubble Sort Visualizer
                    </span>
                    <span className="px-3 py-1 rounded-md bg-white/10 text-white hidden sm:inline-flex items-center gap-1.5">
                      <HiSparkles className="w-3.5 h-3.5 text-white" /> Live AI Stream
                    </span>
                  </div>
                </div>

                {/* Window Content Split */}
                <div className="p-6 md:p-8 bg-slate-50 grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Visualizer Canvas */}
                  <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between min-h-[420px]">
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                        <div>
                          <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                            <HiChartBar className="w-5 h-5 text-red-600" />
                            Bubble Sort Memory Array
                          </h3>
                          <p className="text-xs text-slate-500">
                            Step {activeStep + 1} of {sortingSteps.length} · Comparing pointers
                          </p>
                        </div>
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold flex items-center gap-2 hover:bg-red-700 transition-all hover:scale-105 shadow-sm"
                        >
                          {isPlaying ? (
                            <>
                              <HiPause className="w-4 h-4 text-white" /> Pause
                            </>
                          ) : (
                            <>
                              <HiPlay className="w-4 h-4 text-white" /> Play Demo
                            </>
                          )}
                        </button>
                      </div>

                      {/* Memory Block Grid */}
                      <div className="flex items-end justify-center gap-3 py-8 min-h-[220px] flex-1">
                        {currentStep.arr.map((val, idx) => {
                          const isComparing = currentStep.compare.includes(idx)
                          const isSwapping = isComparing && currentStep.swapped
                          return (
                            <div key={idx} className="flex flex-col items-center gap-2">
                              <span className="text-[11px] font-mono font-medium text-slate-500">
                                ptr[{idx}]
                              </span>
                              <div
                                className={`w-12 md:w-14 rounded-xl flex items-center justify-center font-heading font-bold text-lg transition-all duration-300 shadow-sm ${
                                  isSwapping
                                    ? 'bg-red-600 text-white border-2 border-red-800 scale-110 shadow-lg'
                                    : isComparing
                                    ? 'bg-red-500 text-white border-2 border-red-700 scale-105'
                                    : 'bg-slate-100 border border-slate-300 text-slate-800'
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

                    {/* Step Controls */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-600 flex-wrap gap-2">
                      <span className="font-semibold text-red-600">Complexity: O(n²)</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors"
                        >
                          ← Prev
                        </button>
                        <button
                          onClick={() => setActiveStep((prev) => Math.min(sortingSteps.length - 1, prev + 1))}
                          className="px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold transition-colors"
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* AI Side Panel */}
                  <div className="lg:col-span-5 bg-slate-950 text-white p-6 rounded-xl flex flex-col justify-between border border-red-900/50 shadow-lg">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <HiSparkles className="w-5 h-5 text-red-500" />
                          <span className="font-heading font-bold text-sm tracking-wide text-white">
                            AI Tutor
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-full bg-red-950 text-red-300 border border-red-800">
                          <HiVolumeUp className="w-3.5 h-3.5" /> Audio Stream
                        </span>
                      </div>

                      <div className="space-y-3 font-mono text-xs leading-relaxed text-slate-300">
                        <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                          <strong className="text-red-400 block mb-1 font-sans text-xs uppercase tracking-wider">
                            Live Step Analysis
                          </strong>
                          {currentStep.msg}
                        </div>
                        <p className="text-slate-300 bg-slate-900 p-3.5 rounded-lg border border-slate-800/80">
                          "Bubble sort compares adjacent memory pointers. When arr[j] &gt; arr[j+1], it performs a swap operation to shift larger numbers towards the end of the array."
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 mt-6 flex items-center justify-between text-xs text-slate-400">
                      <span>Module: DSA</span>
                      <Link to="/app/dsa/bubblesort" className="hover:underline flex items-center gap-1 text-red-400 font-medium">
                        Open Full Engine <HiChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 2 — THE 4 CORE CS MODULES SHOWCASE
        ──────────────────────────────────────────────────────────────────── */}
        <section id="modules" className="py-20 md:py-32 bg-white">
          <div className="td-container space-y-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="max-w-[760px] mx-auto text-center space-y-4"
            >
              <span className="td-eyebrow text-red-600">THE COMPLETE CS CURRICULUM</span>
              <h2 className="td-h2 text-slate-900 font-black">
                Four Pillars of Computer Science. One Unified AI Platform.
              </h2>
              <p className="td-body text-slate-600">
                Explore deeply interactive modules engineered for university coursework, interview prep, and core systems understanding.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {/* Module 1: DSA */}
              <motion.div variants={fadeInUp} className="group">
                <div className="h-full bg-white rounded-2xl p-7 border border-red-100 hover:border-red-600 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group-hover:-translate-y-2">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-red-600/30">
                      📦
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono block">PHASE 01</span>
                    <h3 className="text-xl font-bold font-heading text-slate-900">Data Structures & Algorithms</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      33 comprehensive topics covering Arrays, Linked Lists, Trees, Heaps, Graphs, Sorting, Searching, and Dynamic Programming.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6">
                    <Link to="/app/dsa" className="flex items-center justify-between font-bold text-sm text-red-600 group-hover:text-red-700">
                      <span>Explore 33 Topics</span>
                      <HiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Module 2: DBMS */}
              <motion.div variants={fadeInUp} className="group">
                <div className="h-full bg-white rounded-2xl p-7 border border-red-100 hover:border-red-600 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group-hover:-translate-y-2">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-red-600/30">
                      🗂️
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono block">PHASE 02</span>
                    <h3 className="text-xl font-bold font-heading text-slate-900">Database Management Systems</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Interactive 2D SQL JOIN visualizers (INNER, LEFT, RIGHT, FULL), Normalization rules, ER diagrams, and B-Trees.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6">
                    <Link to="/app/dbms" className="flex items-center justify-between font-bold text-sm text-red-600 group-hover:text-red-700">
                      <span>Explore DBMS</span>
                      <HiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Module 3: OS */}
              <motion.div variants={fadeInUp} className="group">
                <div className="h-full bg-white rounded-2xl p-7 border border-red-100 hover:border-red-600 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group-hover:-translate-y-2">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-red-600/30">
                      ⚙️
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono block">PHASE 03</span>
                    <h3 className="text-xl font-bold font-heading text-slate-900">Operating Systems</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      CPU Scheduling (Round Robin, SJF), Process State Machine, Banker's Deadlock algorithm, and Virtual Memory Paging.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6">
                    <Link to="/app/os" className="flex items-center justify-between font-bold text-sm text-red-600 group-hover:text-red-700">
                      <span>Explore OS Engine</span>
                      <HiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Module 4: Networks */}
              <motion.div variants={fadeInUp} className="group">
                <div className="h-full bg-white rounded-2xl p-7 border border-red-100 hover:border-red-600 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group-hover:-translate-y-2">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-red-600/30">
                      🌐
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono block">PHASE 04</span>
                    <h3 className="text-xl font-bold font-heading text-slate-900">Computer Networks</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      7-Layer OSI Model, TCP 3-Way Handshake packet flow, DNS Resolution walkthrough, and IP Subnetting calculators.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6">
                    <Link to="/app/networking" className="flex items-center justify-between font-bold text-sm text-red-600 group-hover:text-red-700">
                      <span>Explore Networks</span>
                      <HiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 3 — AI VOICE TUTOR SHOWCASE
        ──────────────────────────────────────────────────────────────────── */}
        <section id="ai-tutor" className="py-20 md:py-32 bg-slate-950 text-white overflow-hidden relative border-t border-slate-900">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="td-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="lg:col-span-6 space-y-6"
              >
                <span className="px-3.5 py-1.5 rounded-full bg-red-950 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-800 inline-block">
                  AI-POWERED VOICE & CHAT TUTOR
                </span>
                <h2 className="text-3xl md:text-5xl font-heading font-black leading-tight text-white">
                  Get Instant Doubt Resolution Mid-Simulation.
                </h2>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed font-normal">
                  Stuck on how Dijkstra relaxes edge weights or how Round Robin handles time quanta? Ask your AI Assistant directly. It analyzes the live visual state and gives crystal-clear, step-by-step explanations.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <HiSparkles className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white text-sm">Context-Aware Step Analysis</h4>
                      <p className="text-xs text-slate-400 mt-1">AI Assistant reads the exact current frame state of your algorithm simulation to give localized answers.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <HiVolumeUp className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white text-sm">Natural Audio Narration</h4>
                      <p className="text-xs text-slate-400 mt-1">Listen to spoken audio breakdowns while watching memory blocks shift on screen.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link to="/app" className="td-btn-primary px-8 py-4 text-white shadow-xl shadow-red-600/30 inline-flex items-center gap-2">
                    <span>Try AI Assistant</span>
                    <HiArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={scaleUp}
                className="lg:col-span-6"
              >
                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                      <span className="font-heading font-bold text-sm text-white">AI Assistant Interactive Session</span>
                    </div>
                    <span className="text-xs font-mono text-red-400 bg-red-950 px-2.5 py-1 rounded-md border border-red-800">
                      Live Audio Active
                    </span>
                  </div>

                  <div className="space-y-3 text-xs font-mono">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-red-300">
                      <strong>Student:</strong> "Why did Dijkstra choose vertex 3 next instead of vertex 5?"
                    </div>
                    <div className="p-4 rounded-xl bg-red-950/30 border border-red-900/40 text-slate-200 space-y-2">
                      <p className="font-semibold text-red-400">
                        🤖 AI Assistant Explanation:
                      </p>
                      <p className="leading-relaxed">
                        At this step, the tentative distance to vertex 3 is 4, whereas vertex 5 has distance 7. Dijkstra's greedy property extracts the minimum unvisited vertex from the priority queue.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 4 — VERSION TIMELINE (PRESERVED - EXACT UNTOUCHED)
        ──────────────────────────────────────────────────────────────────── */}
        <section id="versions">
          <VersionTimeline />
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 5 — LIVE CODE ENGINE & HARD METRICS
        ──────────────────────────────────────────────────────────────────── */}
        <section id="code-engine" className="py-20 md:py-32 bg-slate-50 border-t border-slate-200">
          <div className="td-container space-y-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="max-w-[760px] mx-auto text-center space-y-4"
            >
              <span className="td-eyebrow text-red-600">LIVE CODE RUNNER</span>
              <h2 className="td-h2 text-slate-900 font-black">
                Inspect Real-time Code & Algorithm Line Execution.
              </h2>
              <p className="td-body text-slate-600">
                CSVerse AI synchronizes active visual steps with line-by-line syntax highlighting across JavaScript, Python, C++, and Java code snippets.
              </p>
            </motion.div>

            {/* Terminal Window Chrome */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleUp}
              className="max-w-[980px] mx-auto"
            >
              <div className="p-0 overflow-hidden bg-slate-950 text-white border border-slate-800 rounded-2xl shadow-2xl font-mono">
                {/* Header */}
                <div className="bg-slate-900 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="ml-3 text-xs text-slate-400">
                      csverse-ai-runner.js — Node.js v22.17.1
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveCodeTab('js')}
                      className={`px-3 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
                        activeCodeTab === 'js' ? 'bg-red-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <SiJavascript className="w-3.5 h-3.5" /> JavaScript
                    </button>
                    <button
                      onClick={() => setActiveCodeTab('py')}
                      className={`px-3 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
                        activeCodeTab === 'py' ? 'bg-red-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <SiPython className="w-3.5 h-3.5" /> Python
                    </button>
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-6 text-sm overflow-x-auto leading-relaxed text-slate-200 bg-slate-950">
                  {activeCodeTab === 'js' ? (
                    <pre className="space-y-1">
                      <span className="text-slate-500">// CSVerse AI — Real-time Algorithm Visualizer & AI Bridge</span>{'\n'}
                      <span className="text-red-400">import</span> &#123; CSVerseEngine, AIExplainer &#125; <span className="text-red-400">from</span> <span className="text-emerald-400">'@csverse/ai-sdk'</span>;{'\n\n'}
                      <span className="text-red-400">const</span> engine = <span className="text-red-400">new</span> CSVerseEngine(&#123; module: <span className="text-emerald-400">'DSA'</span>, topic: <span className="text-emerald-400">'BubbleSort'</span> &#125;);{'\n'}
                      <span className="text-red-400">const</span> ai = <span className="text-red-400">new</span> AIExplainer(&#123; engine: <span className="text-emerald-400">'csverse-ai-v1'</span> &#125;);{'\n\n'}
                      <span className="text-slate-500">// Execute step-by-step array visualization</span>{'\n'}
                      <span className="text-red-400">await</span> engine.visualize([<span className="text-amber-300">5, 2, 8, 1, 4</span>], &#123;{'\n'}
                      {'  '}onSwap: (i, j) =&gt; engine.highlightSwappedNodes(i, j, <span className="text-emerald-400">'#E50010'</span>),{'\n'}
                      {'  '}onStep: <span className="text-red-400">async</span> (stepState) =&gt; &#123;{'\n'}
                      {'    '}<span className="text-red-400">const</span> explanation = <span className="text-red-400">await</span> ai.explainStep(stepState);{'\n'}
                      {'    '}console.log(<span className="text-emerald-400">"[AI Narrator]: " + explanation</span>);{'\n'}
                      {'  '}&#123;{'\n'}
                      &#125;);
                    </pre>
                  ) : (
                    <pre className="space-y-1">
                      <span className="text-slate-500"># CSVerse AI — Python DSA Engine</span>{'\n'}
                      <span className="text-red-400">from</span> csverse <span className="text-red-400">import</span> AlgorithmVisualizer, AITutor{'\n\n'}
                      visualizer = AlgorithmVisualizer(module=<span className="text-emerald-400">"DSA"</span>, topic=<span className="text-emerald-400">"BubbleSort"</span>){'\n'}
                      tutor = AITutor(model=<span className="text-emerald-400">"csverse-ai-v1"</span>){'\n\n'}
                      <span className="text-red-400">def</span> <span className="text-amber-300">bubble_sort_visualized</span>(arr):{'\n'}
                      {'    '}n = len(arr){'\n'}
                      {'    '}<span className="text-red-400">for</span> i <span className="text-red-400">in</span> range(n):{'\n'}
                      {'        '}<span className="text-red-400">for</span> j <span className="text-red-400">in</span> range(0, n-i-1):{'\n'}
                      {'            '}visualizer.highlight(j, j+1){'\n'}
                      {'            '}<span className="text-red-400">if</span> arr[j] &gt; arr[j+1]:{'\n'}
                      {'                '}arr[j], arr[j+1] = arr[j+1], arr[j]{'\n'}
                      {'                '}tutor.narrate_step(state=arr)
                    </pre>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Metrics Strip */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="pt-12 border-t border-slate-200"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <CountUpMetric 
                  end={4} 
                  label="CS Modules (DSA, DBMS, OS, Networks)" 
                  duration={1500}
                />
                <CountUpMetric 
                  end={50} 
                  suffix="+" 
                  label="Interactive Visualizations" 
                  duration={2000}
                />
                <CountUpMetric 
                  end={100} 
                  suffix="%" 
                  label="AI Narrated Explanations" 
                  duration={2500}
                />
                <CountUpMetric 
                  end="<50" 
                  suffix="ms" 
                  label="Visual Simulation Latency" 
                  duration={1800}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 6 — FINAL HIGH-IMPACT CTA
        ──────────────────────────────────────────────────────────────────── */}
        <section className="py-20 md:py-32 bg-white">
          <div className="td-container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleUp}
            >
              <div className="bg-white border-2 border-red-600 text-slate-900 rounded-3xl p-10 md:p-20 text-center space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

                <span className="px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider border border-red-200 inline-block">
                  START LEARNING TODAY
                </span>
                <h2 className="text-3xl md:text-5xl font-heading font-black max-w-[780px] mx-auto text-slate-900 leading-tight">
                  Ready to Master Computer Science Visually?
                </h2>
                <p className="text-slate-600 max-w-[600px] mx-auto text-base md:text-lg font-normal">
                  Join thousands of computer science students and software engineers building deep intuitive understanding of core systems.
                </p>
                <div className="pt-4 flex flex-col items-center gap-3">
                  <Link to="/app" className="td-btn-primary px-9 py-4 text-base shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                    <span>Launch CSVerse AI Free</span>
                    <HiArrowRight className="w-5 h-5 text-white" />
                  </Link>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Free Tier · No Credit Card Required · Instant Access
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ─────────────────────────────────────────────────────────────────────
          FOOTER
      ────────────────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-950 text-white border-t border-slate-900 py-16">
        <div className="td-container space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5 text-xl font-bold font-heading text-white">
                <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-mono text-xs font-bold">
                  <HiChip className="w-4.5 h-4.5 text-white" />
                </div>
                <span>CSVerse <span className="text-red-600">AI</span></span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                The AI-native visual computer science learning environment. Powered by AI Engine for interactive algorithm simulation and real-time voice explanation.
              </p>
            </div>

            <div className="md:col-span-2 space-y-3">
              <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Modules</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li><Link to="/app/dsa" className="hover:text-red-500 transition-colors">Data Structures</Link></li>
                <li><Link to="/app/dsa" className="hover:text-red-500 transition-colors">Algorithms</Link></li>
                <li><Link to="/app/dbms" className="hover:text-red-500 transition-colors">DBMS & SQL</Link></li>
                <li><Link to="/app/os" className="hover:text-red-500 transition-colors">Operating Systems</Link></li>
                <li><Link to="/app/networking" className="hover:text-red-500 transition-colors">Computer Networks</Link></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Features</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li><Link to="/app" className="hover:text-red-500 transition-colors">2D/3D Interactive Visualizer</Link></li>
                <li><Link to="/app" className="hover:text-red-500 transition-colors">Voice AI Tutor</Link></li>
                <li><Link to="/app/progress" className="hover:text-red-500 transition-colors">Progress Tracker</Link></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Tech Stack</h4>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-400">
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">React 19</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">Vite</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">AI Assistant</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">Three.js</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">Framer Motion</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} CSVerse AI. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/app" className="hover:text-slate-400 transition-colors">App</Link>
              <a href="#versions" className="hover:text-slate-400 transition-colors">Versions</a>
              <a href="#modules" className="hover:text-slate-400 transition-colors">Curriculum</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

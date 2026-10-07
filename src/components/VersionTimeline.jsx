// src/components/VersionTimeline.jsx
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  HiSparkles, HiLightningBolt, HiAcademicCap, 
  HiCheck, HiClock, HiCalendar, HiChip, HiArrowRight
} from 'react-icons/hi'

const versions = [
  {
    version: '1.0',
    title: 'Learn & Visualize',
    status: 'AVAILABLE',
    statusColor: 'bg-emerald-500',
    description: 'Build strong Computer Science fundamentals with structured learning paths and interactive visualizations.',
    features: [
      'Structured CS learning paths (DSA, DBMS, OS, Networks)',
      'Topic-wise learning with level progression',
      'Interactive 3D visualizations',
      'Step-by-step algorithm demonstrations',
      'Visual memory and execution flow',
      'Algorithm execution animations',
      'Theoretical explanations with visual proof',
      'Basic assessments and tests'
    ],
    icon: HiAcademicCap,
    iconBg: 'bg-[#180060]',
    iconColor: 'text-white'
  },
  {
    version: '2.0',
    title: 'Compete & Practice',
    status: 'COMING NEXT',
    statusColor: 'bg-[#90c0d8]',
    description: 'Master concepts through AI-powered practice, challenges, and friendly competition.',
    features: [
      'AI CS Tutor with personalized explanations',
      'Ask questions about any topic',
      'AI-generated examples and problem solving',
      'Topic-wise quizzes and coding challenges',
      'Skill assessments and progress tracking',
      'Friends system and learning profiles',
      'Challenge friends and compare progress',
      'Learning competitions and leaderboards'
    ],
    icon: HiLightningBolt,
    iconBg: 'bg-gradient-to-br from-[#180060] to-[#90c0d8]',
    iconColor: 'text-white'
  },
  {
    version: '3.0',
    title: 'Scale & Gamify',
    status: 'PLANNED',
    statusColor: 'bg-[#487890]',
    description: 'Transform learning into an engaging game with rewards, achievements, and a complete CS ecosystem.',
    features: [
      'Bounty Coins, XP, and leveling system',
      'Achievements, badges, and rewards',
      'Global leaderboards and rankings',
      'Daily challenges and missions',
      'Competitive learning tournaments',
      'Weak-topic identification and recommendations',
      'Personalized learning paths',
      'Complete gamified CS ecosystem'
    ],
    icon: HiSparkles,
    iconBg: 'bg-gradient-to-br from-[#180018] to-[#180060]',
    iconColor: 'text-[#90c0d8]'
  }
]

function StatusBadge({ status, color }) {
  const icons = {
    'AVAILABLE': HiCheck,
    'COMING NEXT': HiClock,
    'PLANNED': HiCalendar
  }
  const Icon = icons[status] || HiCalendar

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${color} text-white text-xs font-bold uppercase tracking-wider shadow-sm`}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </div>
  )
}

function VersionCard({ version, isFirst, index }) {
  const Icon = version.icon
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div 
      ref={cardRef}
      className={`relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${isFirst ? 'lg:scale-105' : ''}`}
    >
      <div 
        className={`td-card p-6 md:p-8 space-y-5 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl ${
          isFirst 
            ? 'border-2 border-[#180060] shadow-2xl' 
            : 'border border-[#180060]/20 hover:border-[#180060]/40'
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-[13px] ${version.iconBg} ${version.iconColor} flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110`}>
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-heading text-[#180060] mb-1">
                v{version.version}
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-heading text-[#180018]">
                {version.title}
              </h3>
            </div>
          </div>
          <StatusBadge status={version.status} color={version.statusColor} />
        </div>

        {/* Description */}
        <p className="text-[#303048] text-sm md:text-base leading-relaxed">
          {version.description}
        </p>

        {/* Features List */}
        <div className="space-y-2.5 pt-2">
          {version.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 text-sm text-[#303048] group">
              <HiCheck className="w-5 h-5 text-[#180060] flex-shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-125" />
              <span className="group-hover:text-[#180060] transition-colors">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Typewriter effect component
function TypewriterQuote() {
  const [text, setText] = useState('')
  const fullText = '"This is just the beginning."'
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index))
        index++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, 80)

    return () => clearInterval(timer)
  }, [])

  return (
    <h3 className="text-3xl md:text-4xl font-bold font-heading text-[#180018] min-h-[3rem]">
      {text}
      {!isComplete && <span className="animate-pulse">|</span>}
    </h3>
  )
}

export default function VersionTimeline() {
  return (
    <section id="versions" className="td-section-rhythm bg-gradient-to-b from-white to-slate-50/70 border-t border-[#180060]/10 scroll-smooth">
      <div className="td-container">
        {/* Section Header */}
        <div className="max-w-[860px] mx-auto text-center mb-16 space-y-5">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#180060]/20 bg-white text-xs font-semibold uppercase tracking-wider text-[#180060] shadow-xs animate-in fade-in duration-500">
            <HiChip className="w-3.5 h-3.5" />
            <span>Product Evolution</span>
          </div>
          <h2 className="td-h2 text-[#180018]">
            The Evolution of CS Verse
          </h2>
          <p className="text-lg md:text-xl text-[#303048] font-normal leading-relaxed">
            From learning concepts to experiencing Computer Science.
          </p>
          <p className="td-body max-w-[720px] mx-auto">
            CS Verse is evolving into an interactive AI-powered Computer Science learning ecosystem where you can <strong className="text-[#180060]">learn, compete, and scale</strong> together.
          </p>
        </div>

        {/* Version Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mb-16">
          {versions.map((version, idx) => (
            <VersionCard 
              key={version.version} 
              version={version} 
              isFirst={idx === 0}
              index={idx}
            />
          ))}
        </div>

        {/* Bottom CTA with Typewriter */}
        <div className="max-w-[760px] mx-auto text-center space-y-6 pt-12 border-t border-[#180060]/10">
          <TypewriterQuote />
          <p className="td-body text-lg max-w-[640px] mx-auto">
            CS Verse is being built step by step to make Computer Science learning more interactive, visual, intelligent, and fun.
          </p>
          <div className="pt-4">
            <Link to="/app" className="td-btn-primary text-base px-8 py-4 hover:scale-105 transition-transform duration-200">
              Explore CS Verse
              <HiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// src/components/CountUpMetric.jsx
import { useState, useEffect, useRef } from 'react'

export default function CountUpMetric({ end, duration = 2000, suffix = '', prefix = '', label }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime
    const endValue = typeof end === 'string' ? parseInt(end.replace(/\D/g, '')) : end
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOutQuad = progress * (2 - progress)
      const currentCount = Math.floor(easeOutQuad * endValue)
      
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(endValue)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  const displayValue = typeof end === 'string' && end.includes('<') 
    ? `<${count}` 
    : count

  return (
    <div 
      ref={ref}
      className="p-5 md:p-6 rounded-2xl bg-white border-2 border-red-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-red-600 flex flex-col justify-center items-center text-center overflow-hidden"
    >
      <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-red-600 tracking-tight whitespace-nowrap overflow-hidden text-ellipsis w-full">
        {prefix}{displayValue}{suffix}
      </div>
      <div className="text-xs font-semibold font-body text-slate-600 uppercase tracking-wider mt-2 line-clamp-2">
        {label}
      </div>
    </div>
  )
}

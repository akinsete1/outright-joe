'use client'
import { useState, useEffect } from 'react'

export interface Testimonial {
  name: string
  location?: string
  quote: string
}

export function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto slide every 6 seconds
  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials])

  if (!testimonials || testimonials.length === 0) return null

  const current = testimonials[currentIndex]

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="testimonial" style={{ position: 'relative', overflow: 'hidden' }}>
      <div 
        key={currentIndex} 
        style={{ animation: 'fadeIn 0.5s ease-in-out' }}
      >
        <p className="quote-mark">“</p>
        <blockquote>{current.quote}</blockquote>
        <p className="client">— {current.name}{current.location ? `, ${current.location}` : ''}</p>
      </div>
      
      {testimonials.length > 1 && (
        <div className="testimonial-controls">
          <button onClick={prev}>←</button>
          <span>{String(currentIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}</span>
          <button onClick={next}>→</button>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

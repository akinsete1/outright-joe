import Link from 'next/link'
import { client } from '../../sanity/lib/client'

export default async function Testimonials() {
  const sanityTestimonials = await client.fetch(`*[_type == "testimonial" && published == true]{name, location, quote}`)
  
  const fallbackTestimonials = [
    {
      name: "Diaspora investor",
      location: "United Kingdom",
      quote: "I bought my first investment property in Lagos while living in the UK. The entire process was transparent, professional and stress-free."
    },
    {
      name: "Property owner",
      location: "Lagos",
      quote: "Outright Joe helped my family purchase verified land with complete documentation. Their professionalism gave us total peace of mind."
    },
    {
      name: "Overseas client",
      location: "",
      quote: "My virtual inspection experience was excellent. Every step was documented until completion."
    }
  ]

  const testimonials = sanityTestimonials && sanityTestimonials.length > 0 ? sanityTestimonials : fallbackTestimonials

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow light">Client stories</p>
        <h1>Trust, in their<br /><em>own words.</em></h1>
        <p>Stories from homeowners, investors and diaspora clients who chose a more assured route to property ownership.</p>
      </section>
      
      <section className="stories-grid">
        {testimonials.map((t: any, index: number) => (
          <div key={index} className="story-card">
            <blockquote>“{t.quote}”</blockquote>
            <cite>— {t.name}{t.location ? `, ${t.location}` : ''}</cite>
          </div>
        ))}
      </section>
    </main>
  )
}

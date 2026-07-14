import Link from 'next/link'

export default function Testimonials() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow light">Client stories</p>
        <h1>Trust, in their<br /><em>own words.</em></h1>
        <p>Stories from homeowners, investors and diaspora clients who chose a more assured route to property ownership.</p>
      </section>
      
      <section className="story">
        <blockquote>“I bought my first investment property in Lagos while living in the UK. The entire process was transparent, professional and stress-free.”</blockquote>
        <cite>— Diaspora investor, United Kingdom</cite>
      </section>
      
      <section className="story" style={{ background: '#f4f0e8' }}>
        <blockquote>“Outright Joe helped my family purchase verified land with complete documentation. Their professionalism gave us total peace of mind.”</blockquote>
        <cite>— Property owner, Lagos</cite>
      </section>
      
      <section className="story">
        <blockquote>“My virtual inspection experience was excellent. Every step was documented until completion.”</blockquote>
        <cite>— Overseas client</cite>
      </section>
    </main>
  )
}

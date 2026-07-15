import Link from 'next/link'
import { client } from '../sanity/lib/client'
import { TestimonialSlider } from '../components/home/TestimonialSlider'
import HomeContactForm from '../components/home/HomeContactForm'

export const revalidate = 60 // Revalidate cache every 60 seconds

export default async function Home() {
  const sanityTestimonials = await client.fetch(`*[_type == "testimonial" && published == true]{name, location, quote}`)
  const homeData = await client.fetch(`*[_type == "homePage"][0]`)
  const sanityPosts = await client.fetch(`*[_type == "post" && published == true] | order(publishedAt desc)[0...3] { title, category, "slug": coalesce(slug.current, _id) }`)
  const fallbackTestimonials = [
    {
      name: "TOLU A.",
      location: "DIASPORA INVESTOR",
      quote: "I bought my first investment property in Lagos while living in the UK. The whole process felt transparent, professional and stress-free."
    },
    {
      name: "CHIDI O.",
      location: "BUSINESS OWNER",
      quote: "Outright Joe took the guesswork out of buying land in Ibeju-Lekki. Their verification process gave me 100% peace of mind."
    },
    {
      name: "AMINA Y.",
      location: "REAL ESTATE INVESTOR",
      quote: "From the initial consultation to handing over the documents, their team was incredibly responsive and honest."
    }
  ]

  const testimonials = sanityTestimonials && sanityTestimonials.length > 0 ? sanityTestimonials : fallbackTestimonials

  return (
    <main id="home">
      <section className="hero">
        <div className="hero-image"></div>
        <div className="hero-shade"></div>
        <div className="hero-copy">
          <p className="eyebrow light">Lagos real estate, made certain</p>
          <h1 dangerouslySetInnerHTML={{ __html: homeData?.heroHeadline || 'Invest in a<br /><em>place of your own.</em>' }} />
          <p className="hero-text">
            {homeData?.heroSubtext || 'Helping Nigerians home and abroad buy verified land, luxury apartments, and high-return opportunities across Lagos.'}
          </p>
          <div className="hero-actions">
            <Link className="button button-gold" href="/properties">
              Explore properties <span>↗</span>
            </Link>
            <Link className="text-link light" href="/contact">
              Book a free consultation <span>→</span>
            </Link>
          </div>
        </div>
        <div className="hero-note">
          <span className="pulse"></span>
          <span>Every property is carefully vetted<br />before it reaches you.</span>
        </div>
        <div className="hero-index">01 <span>/</span> 05</div>
      </section>

      <section className="proof section-pad">
        <div className="proof-heading">
          <p className="eyebrow">Why clients choose us</p>
          <h2 dangerouslySetInnerHTML={{ __html: homeData?.proofHeading || 'Property should feel<br />like a <em>sure thing.</em>' }} />
        </div>
        <div className="proof-copy">
          <p>{homeData?.proofText || 'For over nine years, we have made the path to property ownership clearer, safer and more rewarding for hundreds of clients around the world.'}</p>
          <Link className="text-link" href="/about">Meet Outright Joe <span>→</span></Link>
        </div>
        <div className="stats">
          <div><strong>9<span>+</span></strong><p>Years of experience</p></div>
          <div><strong>100<span>%</span></strong><p>Verified opportunities</p></div>
          <div><strong>500<span>+</span></strong><p>Client milestones</p></div>
          <div><strong>24<span>/7</span></strong><p>Diaspora support</p></div>
        </div>
      </section>

      <section id="properties" className="properties section-pad">
        <div className="section-intro">
          <div>
            <p className="eyebrow">Featured opportunities</p>
            <h2>Made to hold<br /><em>their value.</em></h2>
          </div>
          <Link className="text-link" href="/contact">View all properties <span>→</span></Link>
        </div>
        <div className="property-grid">
          <article className="property property-large">
            <Link href="/properties/apartment" style={{ display: 'block', height: '100%', position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85" alt="Contemporary luxury residence" />
              <span className="tag">Apartments</span>
              <div className="property-info">
                <p>Lekki Phase 1</p>
                <h3>Form meets<br />investment.</h3>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '.06em' }}>Discover residence <span style={{ color: 'var(--gold)', fontSize: '16px', marginLeft: '8px' }}>↗</span></span>
              </div>
            </Link>
          </article>
          <article className="property">
            <Link href="/properties/land" style={{ display: 'block', height: '100%', position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85" alt="Premium home exterior" />
              <span className="tag">Land</span>
              <div className="property-info">
                <p>Ibeju Lekki</p>
                <h3>Future-facing<br />land value.</h3>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '.06em' }}>View opportunity <span style={{ color: 'var(--gold)', fontSize: '16px', marginLeft: '8px' }}>↗</span></span>
              </div>
            </Link>
          </article>
          <article className="property">
            <Link href="/properties/residence" style={{ display: 'block', height: '100%', position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85" alt="Luxury apartment interior" />
              <span className="tag">Investment</span>
              <div className="property-info">
                <p>Ikoyi</p>
                <h3>A rare address,<br />beautifully considered.</h3>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '.06em' }}>Explore investment <span style={{ color: 'var(--gold)', fontSize: '16px', marginLeft: '8px' }}>↗</span></span>
              </div>
            </Link>
          </article>
        </div>
      </section>

      <section id="verification" className="verification">
        <div className="verification-image"></div>
        <div className="verification-content">
          <p className="eyebrow light">Property verification centre</p>
          <h2>Know what<br />you are buying.</h2>
          <p>Before you make a commitment, our due diligence team helps confirm ownership, title, documentation and legal status.</p>
          <ul>
            <li>Ownership & title verification</li>
            <li>Survey plan & documentation checks</li>
            <li>Property background reports</li>
          </ul>
          <Link className="button button-gold" href="/contact">Verify a property <span>↗</span></Link>
        </div>
      </section>

      <section id="about" className="about section-pad">
        <div className="portrait">
          <img src="/ceo.jpg" alt="Outright Joe CEO" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div className="portrait-label">Integrity is our<br />starting point.</div>
        </div>
        <div className="about-copy">
          <p className="eyebrow">A better way to buy</p>
          <h2 dangerouslySetInnerHTML={{ __html: homeData?.aboutHeading || 'Built on <em>trust.</em><br />Driven by results.' }} />
          {homeData?.aboutText ? (
            <p style={{ whiteSpace: 'pre-line' }}>{homeData.aboutText}</p>
          ) : (
            <>
              <p>Outright Joe is an award-winning real estate consultant dedicated to helping Nigerians at home and abroad acquire verified properties across Lagos.</p>
              <p>We combine clear guidance, diligent documentation and local expertise—so that your investment creates lasting wealth and genuine peace of mind.</p>
            </>
          )}
          <Link className="text-link" href="/contact">More about our approach <span>→</span></Link>
        </div>
      </section>

      <section id="insights" className="insights section-pad">
        <div className="section-intro">
          <div>
            <p className="eyebrow">Lagos property insights</p>
            <h2>Invest with<br /><em>perspective.</em></h2>
          </div>
          <Link className="text-link" href="/blog">Read all insights <span>→</span></Link>
        </div>
        <div className="articles">
          {sanityPosts && sanityPosts.length > 0 ? (
            sanityPosts.map((post: any, index: number) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <span>0{index + 1} — {post.category || 'Article'}</span>
                <h3>{post.title}</h3>
                <b>→</b>
              </Link>
            ))
          ) : (
            <>
              <Link href="/blog">
                <span>01 — Market intelligence</span>
                <h3>Why Ibeju Lekki continues to attract smart investors</h3>
                <b>→</b>
              </Link>
              <Link href="/blog">
                <span>02 — Infrastructure</span>
                <h3>Lagos Coastal Highway: what it means for property investors</h3>
                <b>→</b>
              </Link>
              <Link href="/blog">
                <span>03 — Diaspora guide</span>
                <h3>How Nigerians abroad can avoid real estate scams</h3>
                <b>→</b>
              </Link>
            </>
          )}
        </div>
      </section>

      <TestimonialSlider testimonials={testimonials} />

      <section id="contact" className="contact">
        <p className="eyebrow light">Your next move starts here</p>
        <h2>Let's find the<br /><em>right opportunity.</em></h2>
        <p>Tell us a little about what you are looking for. A member of our advisory team will be in touch.</p>
        <HomeContactForm />
      </section>
    </main>
  )
}

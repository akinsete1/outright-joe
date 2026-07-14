import Link from 'next/link'
import { client } from '@/sanity/lib/client'

export default async function Properties() {
  let properties = []
  try {
    // Fetch properties including the slug value
    properties = await client.fetch(`*[_type == "property" && published == true] {
      ...,
      "slug": slug.current
    } | order(_createdAt desc)`)
  } catch (e) {
    console.error("Sanity fetch failed. Have you configured your project ID?", e)
  }

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow light">Verified Lagos properties</p>
        <h1>A better address<br /><em>awaits.</em></h1>
        <p>Explore carefully selected land and residences across Lagos' most promising investment locations.</p>
      </section>
      
      <section className="page-content">
        <div className="property-grid">
          {properties.length > 0 ? properties.map((prop: any) => (
            <article key={prop._id} className="property">
              <Link href={`/properties/${prop.slug}`} style={{ display: 'block', height: '100%', position: 'relative' }}>
                <img src={prop.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85"} alt={prop.title} />
                <span className="tag">{prop.status || prop.type || 'Property'}</span>
                
                <div className="property-info" style={{ width: 'calc(100% - 50px)' }}>
                  <p>{prop.location}</p>
                  <h3>{prop.title}</h3>
                  
                  {prop.price && (
                    <div style={{ color: 'var(--gold)', fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>
                      {prop.price}
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#e7cc95', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '10px', marginBottom: '12px' }}>
                    {prop.bedrooms && <span>🛏 {prop.bedrooms} Beds</span>}
                    {prop.bathrooms && <span>🛁 {prop.bathrooms} Baths</span>}
                    {prop.area && <span>📏 {prop.area}</span>}
                  </div>

                  <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '.06em' }}>
                    View details <span style={{ color: 'var(--gold)', fontSize: '16px', marginLeft: '8px' }}>↗</span>
                  </span>
                </div>
              </Link>
            </article>
          )) : (
            <>
              <article className="property">
                <Link href="/properties/land" style={{ display: 'block', height: '100%', position: 'relative' }}>
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85" alt="Land" />
                  <span className="tag">Land</span>
                  <div className="property-info">
                    <p>Ibeju Lekki</p>
                    <h3>High-growth land banking.</h3>
                    <div style={{ color: 'var(--gold)', fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>₦12,500,000</div>
                    <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#e7cc95', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '10px', marginBottom: '12px' }}>
                      <span>📏 500 sqm</span>
                    </div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '.06em' }}>View details <span style={{ color: 'var(--gold)', fontSize: '16px', marginLeft: '8px' }}>↗</span></span>
                  </div>
                </Link>
              </article>
              <article className="property">
                <Link href="/properties/apartment" style={{ display: 'block', height: '100%', position: 'relative' }}>
                  <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85" alt="Apartment" />
                  <span className="tag">Apartment</span>
                  <div className="property-info">
                    <p>Lekki Phase 1</p>
                    <h3>Premium living, proven demand.</h3>
                    <div style={{ color: 'var(--gold)', fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>₦185,000,000</div>
                    <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#e7cc95', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '10px', marginBottom: '12px' }}>
                      <span>🛏 3 Beds</span>
                      <span>🛁 4 Baths</span>
                    </div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '.06em' }}>View details <span style={{ color: 'var(--gold)', fontSize: '16px', marginLeft: '8px' }}>↗</span></span>
                  </div>
                </Link>
              </article>
              <article className="property">
                <Link href="/properties/residence" style={{ display: 'block', height: '100%', position: 'relative' }}>
                  <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85" alt="Residence" />
                  <span className="tag">Residence</span>
                  <div className="property-info">
                    <p>Ikoyi</p>
                    <h3>Refined city residence.</h3>
                    <div style={{ color: 'var(--gold)', fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>$450,000</div>
                    <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#e7cc95', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '10px', marginBottom: '12px' }}>
                      <span>🛏 4 Beds</span>
                      <span>🛁 5 Baths</span>
                    </div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '.06em' }}>View details <span style={{ color: 'var(--gold)', fontSize: '16px', marginLeft: '8px' }}>↗</span></span>
                  </div>
                </Link>
              </article>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

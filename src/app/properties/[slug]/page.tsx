import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'

export default async function PropertyDetail({ params }: { params: { slug: string } }) {
  const { slug } = await params
  
  let property = null

  try {
    // Attempt to fetch property by slug
    property = await client.fetch(`*[_type == "property" && slug.current == $slug][0]`, { slug })
  } catch (e) {
    console.error("Sanity fetch failed:", e)
  }

  if (!property) {
    // For demo purposes when Sanity is not connected, use a dummy object if requested
    property = {
      title: 'Premium Property Detail',
      location: 'Lagos, Nigeria',
      price: '₦150,000,000',
      status: 'Available',
      type: 'Apartment',
      bedrooms: 4,
      bathrooms: 4,
      area: '800 sqm',
      description: 'An exceptional property with refined finishes and excellent investment potential. This is a fallback view since Sanity is not yet connected.',
      features: ['24/7 Security', 'Swimming Pool', 'Fitted Kitchen', 'Ample Parking'],
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90'
    }
  }

  return (
    <main>
      <section className="hero" style={{ minHeight: '60vh', height: '60vh' }}>
        <div className="hero-image" style={{ backgroundImage: `url('${property.image}')` }}></div>
        <div className="hero-shade"></div>
        <div className="hero-copy" style={{ paddingBottom: '5vh' }}>
          <p className="eyebrow light">{property.location}</p>
          <h1 style={{ fontSize: 'clamp(42px, 5vw, 72px)' }}>
            {property.title}
          </h1>
          {property.price && (
            <div style={{ color: 'var(--gold)', fontSize: '32px', fontWeight: 'bold', marginTop: '20px' }}>
              {property.price}
            </div>
          )}
          <div style={{ display: 'flex', gap: '25px', fontSize: '15px', color: '#e7cc95', marginTop: '20px', fontWeight: '500' }}>
            {property.bedrooms && <span>🛏 {property.bedrooms} Bedrooms</span>}
            {property.bathrooms && <span>🛁 {property.bathrooms} Bathrooms</span>}
            {property.area && <span>📏 {property.area}</span>}
          </div>
        </div>
      </section>

      <section className="page-content two-column">
        <div>
          <p className="eyebrow">Property Overview</p>
          <h2>About this <br/><em>{property.type || 'property'}.</em></h2>
          <div style={{ marginTop: '30px' }}>
            <div className="list-row" style={{ padding: '20px 0' }}>
              <span>Status</span>
              <div><h3 style={{ fontSize: '20px' }}>{property.status || 'Available'}</h3></div>
            </div>
            <div className="list-row" style={{ padding: '20px 0' }}>
              <span>Location</span>
              <div><h3 style={{ fontSize: '20px' }}>{property.location}</h3></div>
            </div>
            {property.features && property.features.length > 0 && (
              <div className="list-row" style={{ padding: '20px 0', borderBottom: '1px solid var(--line)' }}>
                <span>Features</span>
                <div>
                  <ul style={{ paddingLeft: '18px', fontSize: '15px', lineHeight: '1.8' }}>
                    {property.features.map((feature: string, i: number) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="copy">
            {property.description ? (
              <p>{property.description}</p>
            ) : (
              <p>No description available for this property yet.</p>
            )}
          </div>
          
          <div style={{ marginTop: '50px', background: 'var(--green)', color: 'white', padding: '50px 40px' }}>
            <p className="eyebrow light">Interested?</p>
            <h3 style={{ fontSize: '32px', marginBottom: '20px', color: 'white' }}>Take the next step.</h3>
            <p style={{ color: '#d8ddd7', marginBottom: '30px' }}>Contact our advisory team to arrange a viewing or request the full due diligence report for this property.</p>
            <Link className="button button-gold" href="/contact">Enquire about property <span>↗</span></Link>
          </div>
        </div>
      </section>
    </main>
  )
}

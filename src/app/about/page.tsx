import Link from 'next/link'
import { client } from '@/sanity/lib/client'

export default async function About() {
  const aboutData = await client.fetch(`*[_type == "aboutPage"][0]`)

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow light">About Outright Joe</p>
        <h1 dangerouslySetInnerHTML={{ __html: aboutData?.heroHeadline || 'Guidance you can<br /><em>build on.</em>' }} />
        <p>{aboutData?.heroSubtext || 'We help Nigerians around the world buy property in Lagos with a process grounded in clarity, integrity and diligent verification.'}</p>
      </section>

      <section className="page-content two-column">
        <div>
          <p className="eyebrow">Our story</p>
          <h2 dangerouslySetInnerHTML={{ __html: aboutData?.storyHeading || 'Real estate, without the uncertainty.' }} />
          
          <div className="portrait" style={{ marginTop: '50px', position: 'relative', width: '100%', maxWidth: '400px', aspectRatio: '3/4', borderRadius: '16px', overflow: 'hidden' }}>
            <img src="/ceo.jpg" alt="Outright Joe CEO" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div className="portrait-label" style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'white', padding: '15px 20px', fontSize: '13px', fontWeight: 'bold', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              Integrity is our<br />starting point.
            </div>
          </div>
        </div>
        <div className="copy">
          {aboutData?.storyParagraphs ? (
            aboutData.storyParagraphs.map((block: any, i: number) => {
              if (block._type === 'block' && block.children) {
                return <p key={i}>{block.children.map((c: any) => c.text).join('')}</p>
              }
              return null
            })
          ) : (
            <>
              <p>Outright Joe is an award-winning real estate consultancy dedicated to helping Nigerians at home and in the diaspora acquire verified, high-yielding properties across Lagos State.</p>
              <p>For almost a decade, we have successfully facilitated hundreds of secure real estate transactions. Our reputation has been meticulously built on transparent advisory, world-class client service, and a deep respect for every single investment entrusted to us.</p>
              <p>We understand that buying property, especially from thousands of miles away, can feel daunting. That is why we personally inspect, verify, and validate every property we list. We act as your eyes and ears on the ground, ensuring that what you pay for is exactly what you get—no surprises, no stories.</p>
            </>
          )}
          
          <div style={{ marginTop: '50px', padding: '30px', background: 'rgba(0,0,0,0.03)', borderLeft: '4px solid var(--gold)' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Our Mission</h3>
            <p style={{ margin: 0 }}>{aboutData?.missionStatement || "To simplify real estate investment in Nigeria through rigorous verification, absolute transparency, and tailored advisory that protects and grows our clients' wealth."}</p>
          </div>
        </div>
      </section>

      <section className="page-content">
        <p className="eyebrow">What guides us</p>
        <div className="cards">
          <article>
            <h3>Integrity</h3>
            <p>Clear advice at every step.</p>
          </article>
          <article>
            <h3>Verification</h3>
            <p>Diligence before every recommendation.</p>
          </article>
          <article>
            <h3>Partnership</h3>
            <p>Present for every milestone.</p>
          </article>
        </div>
      </section>
    </main>
  )
}

import Link from 'next/link'

export default function About() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow light">About Outright Joe</p>
        <h1>Guidance you can<br /><em>build on.</em></h1>
        <p>We help Nigerians around the world buy property in Lagos with a process grounded in clarity, integrity and diligent verification.</p>
      </section>

      <section className="page-content two-column">
        <div>
          <p className="eyebrow">Our story</p>
          <h2>Real estate, without the uncertainty.</h2>
        </div>
        <div className="copy">
          <p>Outright Joe is an award-winning real estate consultancy dedicated to helping Nigerians at home and in the diaspora acquire verified, high-yielding properties across Lagos State.</p>
          <p>For almost a decade, we have successfully facilitated hundreds of secure real estate transactions. Our reputation has been meticulously built on transparent advisory, world-class client service, and a deep respect for every single investment entrusted to us.</p>
          <p>We understand that buying property, especially from thousands of miles away, can feel daunting. That is why we personally inspect, verify, and validate every property we list. We act as your eyes and ears on the ground, ensuring that what you pay for is exactly what you get—no surprises, no stories.</p>
          
          <div style={{ marginTop: '50px', padding: '30px', background: 'rgba(0,0,0,0.03)', borderLeft: '4px solid var(--gold)' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Our Mission</h3>
            <p style={{ margin: 0 }}>To simplify real estate investment in Nigeria through rigorous verification, absolute transparency, and tailored advisory that protects and grows our clients' wealth.</p>
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

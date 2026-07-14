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
          <p>Outright Joe is an award-winning real estate consultant dedicated to helping Nigerians at home and abroad acquire verified properties across Lagos.</p>
          <p>Over nine years and hundreds of successful transactions, our reputation has been built on transparent advice, excellent client service and a deep respect for every investment entrusted to us.</p>
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

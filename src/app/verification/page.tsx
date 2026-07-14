import Link from 'next/link'

export default function Verification() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow light">Property verification centre</p>
        <h1>Know before<br /><em>you buy.</em></h1>
        <p>Protect your investment with a clear view of ownership, documentation and legal status before making any payment.</p>
      </section>
      
      <section className="page-content two-column">
        <div>
          <p className="eyebrow">Our services</p>
          <h2>Due diligence that gives you confidence.</h2>
        </div>
        <div>
          <ul className="checklist">
            <li>Property ownership verification</li>
            <li>Survey plan verification</li>
            <li>Government documentation checks</li>
            <li>Title verification and litigation search</li>
            <li>Property background reports</li>
          </ul>
          <Link className="button button-dark" href="/contact">Request verification <span>↗</span></Link>
        </div>
      </section>
    </main>
  )
}

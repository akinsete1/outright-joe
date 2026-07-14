import Link from 'next/link'

export default function Investments() {
  // TODO: Fetch investments from Sanity
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow light">Investment opportunities</p>
        <h1>Positioned for<br /><em>what's next.</em></h1>
        <p>Carefully selected opportunities for local and diaspora investors seeking growth, income and a confident exit.</p>
      </section>
      
      <section className="page-content">
        <div className="list-row">
          <span>01</span>
          <div>
            <h3>Cashback projects</h3>
            <p>Attractive returns through professionally managed projects.</p>
          </div>
          <Link className="text-link" href="/contact">Request details <span>→</span></Link>
        </div>
        
        <div className="list-row">
          <span>02</span>
          <div>
            <h3>Buyback opportunities</h3>
            <p>Structured options designed for security and predictable exits.</p>
          </div>
          <Link className="text-link" href="/contact">Request details <span>→</span></Link>
        </div>
        
        <div className="list-row">
          <span>03</span>
          <div>
            <h3>Off-plan developments</h3>
            <p>Secure premium property at pre-launch pricing.</p>
          </div>
          <Link className="text-link" href="/contact">Request details <span>→</span></Link>
        </div>
      </section>
    </main>
  )
}

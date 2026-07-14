import Link from 'next/link'

export default function Blog() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow light">Lagos property insights</p>
        <h1>Invest with<br /><em>perspective.</em></h1>
        <p>Expert guidance, timely local insights and practical advice for more confident property decisions.</p>
      </section>

      <section className="page-content">
        <div className="list-row">
          <span>Market intelligence</span>
          <div>
            <h3>Why Ibeju Lekki continues to attract smart investors</h3>
            <p>How critical infrastructure is changing the investment landscape.</p>
          </div>
          <b>→</b>
        </div>
        
        <div className="list-row">
          <span>Infrastructure</span>
          <div>
            <h3>Lagos Coastal Highway: what it means for investors</h3>
            <p>A look at the property value impact of new connectivity.</p>
          </div>
          <b>→</b>
        </div>
        
        <div className="list-row">
          <span>Diaspora guide</span>
          <div>
            <h3>How Nigerians abroad can avoid real estate scams</h3>
            <p>Practical steps for safely buying from anywhere in the world.</p>
          </div>
          <b>→</b>
        </div>
        
        <div className="list-row">
          <span>Market report</span>
          <div>
            <h3>Best places to buy land in Lagos</h3>
            <p>The locations poised for residential and commercial growth.</p>
          </div>
          <b>→</b>
        </div>
      </section>
    </main>
  )
}

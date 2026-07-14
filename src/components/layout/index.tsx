import Link from 'next/link'
import { ReactNode } from 'react'

export function Topline() {
  return (
    <div className="topline">
      <span>Outright Joe Real Estate Company Limited</span>
      <span>Verified opportunities · Lagos, Nigeria</span>
    </div>
  )
}

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Outright Joe home">
        <span className="brand-mark">OJ</span>
        <span>
          OUTRIGHT<br />
          <b>JOE</b>
        </span>
      </Link>
      <button className="menu" aria-label="Toggle menu">
        Menu <i />
      </button>
      <nav>
        <Link href="/about">About</Link>
        <Link href="/properties">Properties</Link>
        <Link href="/investments">Investments</Link>
        <Link href="/verification">Verification</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/testimonials">Stories</Link>
      </nav>
      <Link className="button button-dark header-cta" href="/contact">
        Talk to an advisor <span>↗</span>
      </Link>
    </header>
  )
}

export function Footer() {
  return (
    <footer>
      <Link className="brand" href="/">
        <span className="brand-mark">OJ</span>
        <span>
          OUTRIGHT<br />
          <b>JOE</b>
        </span>
      </Link>
      <p>Helping Nigerians home & abroad buy verified properties in Lagos.</p>
      <div className="footer-links">
        <Link href="/properties">Properties</Link>
        <Link href="/verification">Verification</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Outright Joe Real Estate Company Limited.</span>
        <span>Instagram · YouTube · LinkedIn</span>
      </div>
    </footer>
  )
}

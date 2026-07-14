'use client'
import Link from 'next/link'
import { ReactNode, useState } from 'react'

export function Topline() {
  return (
    <div className="topline">
      <span>Outright Joe Real Estate Company Limited</span>
      <span>Verified opportunities · Lagos, Nigeria</span>
    </div>
  )
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Outright Joe home">
        <span className="brand-mark">OJ</span>
        <span>
          OUTRIGHT<br />
          <b>JOE</b>
        </span>
      </Link>
      <button className="menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? 'Close' : 'Menu'} <i />
      </button>
      <nav className={menuOpen ? 'open' : ''} onClick={() => setMenuOpen(false)}>
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
      <p style={{ marginTop: '10px', fontSize: '13px', lineHeight: '1.5', maxWidth: '300px' }}>
        DIAMOND AVENUE, PENINSULA GARDEN ESTATE, KM 45, LEKKI EPE EXPRESSWAY
        <br />
        <a href="mailto:hello@outrightjoerealestate.com" style={{ textDecoration: 'underline', color: 'inherit' }}>hello@outrightjoerealestate.com</a>
      </p>
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

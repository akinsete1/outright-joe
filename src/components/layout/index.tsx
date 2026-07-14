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

export function Footer({ settings }: { settings?: any }) {
  const address = settings?.companyAddress || 'DIAMOND AVENUE, PENINSULA GARDEN ESTATE,\nKM 45, LEKKI EPE EXPRESSWAY'
  const email = settings?.contactEmail || 'hello@outrightjoerealestate.com'
  const whatsapp = settings?.whatsappNumber || '+2348163230242'
  const insta = settings?.instagramUrl || '#'
  const yt = settings?.youtubeUrl || '#'
  const li = settings?.linkedinUrl || '#'

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand-col">
          <Link className="brand" href="/">
            <span className="brand-mark">OJ</span>
            <span>
              OUTRIGHT<br />
              <b>JOE</b>
            </span>
          </Link>
          <p className="footer-tagline">Helping Nigerians at home & abroad buy verified properties in Lagos, Nigeria.</p>
        </div>
        
        <div className="footer-links-col">
          <h4>Company</h4>
          <Link href="/about">About Us</Link>
          <Link href="/properties">Properties</Link>
          <Link href="/investments">Investments</Link>
          <Link href="/verification">Verification</Link>
          <Link href="/testimonials">Stories</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="footer-contact-col">
          <h4>Contact Us</h4>
          <p style={{ whiteSpace: 'pre-line' }}>{address}</p>
          <a href={`mailto:${email}`}>{email}</a>
          <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}>{whatsapp}</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Outright Joe Real Estate Company Limited.</span>
        <div className="footer-socials">
          <a href={insta}>Instagram</a>
          <a href={yt}>YouTube</a>
          <a href={li}>LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}

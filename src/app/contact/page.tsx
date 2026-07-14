'use client'
import { useState } from 'react'

import { submitEnquiry } from '../actions'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle, submitting, success, error

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    const formData = new FormData(e.currentTarget)
    const result = await submitEnquiry(formData)
    if (result.success) {
      setStatus('success')
    } else {
      setStatus('error')
    }
  }

  return (
    <main>
      <section className="contact-page">
        <p className="eyebrow light">Let's talk property</p>
        <h1>Let's find the right<br /><em>opportunity.</em></h1>
        <p>Tell us what you are looking for. A member of our advisory team will be in touch.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Full name
              <input name="fullName" required placeholder="Your full name" type="text" />
            </label>
            <label>Email address
              <input name="email" required placeholder="you@email.com" type="email" />
            </label>
          </div>
          <div className="form-row">
            <label>Property interest
              <select name="interest">
                <option>Select an option</option>
                <option>Land</option>
                <option>Apartment</option>
                <option>Investment project</option>
                <option>Property verification</option>
              </select>
            </label>
            <label>Phone number
              <input name="phone" placeholder="+234" type="tel" />
            </label>
          </div>
          <label>How can we help?
            <textarea name="message" placeholder="Tell us about your property goals"></textarea>
          </label>
          <button className="button button-gold" type="submit" disabled={status === 'submitting' || status === 'success'}>
            {status === 'idle' && <>Send enquiry <span>↗</span></>}
            {status === 'submitting' && 'Sending...'}
            {status === 'success' && 'Enquiry received ✓'}
            {status === 'error' && 'Unable to send — please try again'}
          </button>
        </form>
      </section>
      
      <section className="contact-options">
        <div>
          <p className="eyebrow">WhatsApp</p>
          <strong><a href="https://wa.me/2348163230242" style={{ color: 'inherit', textDecoration: 'none' }}>+234 816 323 0242</a></strong>
        </div>
        <div>
          <p className="eyebrow">Email</p>
          <strong><a href="mailto:hello@outrightjoerealestate.com" style={{ color: 'inherit', textDecoration: 'none' }}>hello@outrightjoerealestate.com</a></strong>
        </div>
        <div>
          <p className="eyebrow">Office</p>
          <strong style={{ fontSize: '15px' }}>DIAMOND AVENUE, PENINSULA GARDEN ESTATE,<br/>KM 45, LEKKI EPE EXPRESSWAY</strong>
        </div>
      </section>
    </main>
  )
}

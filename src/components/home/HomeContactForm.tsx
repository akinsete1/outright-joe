'use client'

import { useState } from 'react'

export default function HomeContactForm() {
  const [status, setStatus] = useState('idle') // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    
    const formData = new FormData(e.currentTarget)
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      setStatus('error')
      setErrorMessage('Missing NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in Vercel.')
      return
    }
    
    formData.append('access_key', accessKey)
    formData.append('subject', `New Enquiry from ${formData.get('fullName')} - Outright Joe`)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      
      const result = await response.json()
      
      if (result.success) {
        setStatus('success')
        e.currentTarget.reset()
      } else {
        setStatus('error')
        setErrorMessage(result.message || 'Failed to send message')
      }
    } catch (error: any) {
      setStatus('error')
      setErrorMessage(error.message || 'Network error occurred')
    }
  }

  return (
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
        {status === 'error' && errorMessage}
      </button>
    </form>
  )
}

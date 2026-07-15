'use server'

import fs from 'fs/promises'
import path from 'path'

export async function submitEnquiry(formData: FormData) {
  try {
    const name = formData.get('fullName') as string
    const email = formData.get('email') as string
    const interest = formData.get('interest') as string
    const phone = formData.get('phone') as string
    const message = formData.get('message') as string

    if (!name || !email) {
      return { success: false, error: 'Name and email are required.' }
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      console.error('Missing WEB3FORMS_ACCESS_KEY environment variable.')
      return { success: false, error: 'Missing Web3Forms Access Key in Vercel.' }
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'OutrightJoe-Website/1.0',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        phone,
        interest,
        message,
        subject: `New Enquiry from ${name} - Outright Joe`,
      }),
    })

    const text = await response.text()
    let result;
    try {
      result = JSON.parse(text)
    } catch (e) {
      console.error('Web3Forms returned non-JSON:', text)
      return { success: false, error: `Web3Forms Error (${response.status}): ${text.substring(0, 40)}...` }
    }

    if (result.success) {
      return { success: true }
    } else {
      console.error('Web3Forms Error:', result)
      return { success: false, error: result.message || 'Failed to submit form' }
    }
  } catch (error: any) {
    console.error('Error submitting enquiry:', error)
    return { success: false, error: `Error: ${error.message || 'Unknown server error'}` }
  }
}

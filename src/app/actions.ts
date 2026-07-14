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

    const enquiry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name,
      email,
      interest,
      phone,
      message,
    }

    // In a real production app you would save this to a database or send an email.
    // For now, we simulate saving it. 
    console.log('Received Enquiry:', enquiry)

    return { success: true }
  } catch (error) {
    console.error('Error submitting enquiry:', error)
    return { success: false, error: 'Internal server error' }
  }
}

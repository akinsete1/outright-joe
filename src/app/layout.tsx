import type { Metadata } from 'next'
import { DM_Mono, Manrope, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Topline, Header, Footer } from '@/components/layout'

const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-dm-mono' })
const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-manrope' })
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['500', '600', '700'], style: ['normal', 'italic'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Outright Joe | Verified Lagos Properties',
  description: 'Helping Nigerians home and abroad acquire verified properties in Lagos.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmMono.variable} ${manrope.variable} ${playfair.variable} antialiased`}>
        <Topline />
        <Header />
        {children}
        <Footer />
        <a className="whatsapp" href="https://wa.me/234000000000" aria-label="Chat on WhatsApp">
          ◔<span>WhatsApp</span>
        </a>
      </body>
    </html>
  )
}

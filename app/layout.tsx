import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '../components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TripZen — Affordable Group Trips',
  description: 'Browse upcoming group trips across India. Full itinerary, transparent pricing, easy booking.',
}

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        <Providers>
          <Header />
          <main className="pt-14 sm:pt-16 min-h-screen flex flex-col bg-black">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
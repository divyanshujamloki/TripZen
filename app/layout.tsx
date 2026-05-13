import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '../components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Premium Tourism Website',
  description: 'Luxury travel experiences',
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
        <Providers>
          <Header />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
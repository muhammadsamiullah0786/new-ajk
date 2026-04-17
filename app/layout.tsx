import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuroraBackground from '@/components/AuroraBackground'

export const metadata: Metadata = {
  title: {
    default: 'AJK Insurance Lead Generation — Performance Marketing for Insurance Advertisers',
    template: '%s | AJK Lead Generation',
  },
  description:
    'AJK is a performance-focused insurance lead generation and advertising partner. High-intent leads across Medicare, ACA, Final Expense, Auto, Home, and more.',
  keywords: [
    'insurance lead generation',
    'Medicare leads',
    'ACA leads',
    'final expense leads',
    'insurance advertising',
    'insurance performance marketing',
    'AJK Insurance',
    'insurance lead vendor',
  ],
  metadataBase: new URL('https://ajkinsurance.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ajkinsurance.com',
    siteName: 'AJK Lead Generation',
    title: 'AJK Insurance Lead Generation — Performance Marketing Partner',
    description:
      'High-intent insurance leads across Medicare, ACA, Final Expense, Auto, Home, and more. Real-time delivery. Campaign launch in 24 hours.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AJK Lead Generation',
    description: 'Scale your insurance customer acquisition with high-intent leads.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased relative">
        {/* Persistent aurora background — layer 0 */}
        <AuroraBackground />
        {/* All page content sits above aurora */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

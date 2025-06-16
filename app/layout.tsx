import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'AllAiTools - Discover AI Tools Shaping Tomorrow',
  description: 'Browse, compare, and discover cutting-edge AI tools across all industries. Curated with care, monetized with purpose.',
  keywords: 'AI tools, artificial intelligence, productivity, automation, machine learning, SaaS',
  authors: [{ name: 'AllAiTools Team' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Allaitools - Discover AI Tools Shaping Tomorrow',
    description: 'Browse, compare, and discover cutting-edge AI tools across all industries.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Allaitools - Discover AI Tools Shaping Tomorrow',
    description: 'Browse, compare, and discover cutting-edge AI tools across all industries.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <div className="min-h-screen bg-white">
            <Navbar />
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Best AI Tools 2025 | ChatGPT, Claude, Gemini & AI Agents Directory | AllAiTools',
  description: 'Discover 2450+ best AI tools 2025 including ChatGPT alternatives, Claude AI, Gemini, AI agents for productivity, content creation, coding & business automation.',
  keywords: 'AI tools 2025, ChatGPT alternatives, Claude AI, Gemini AI, AI agents, best AI tools, AI productivity tools, AI content creation, AI coding tools, artificial intelligence directory',
  authors: [{ name: 'AllAiTools Team' }],
  publisher: 'AllAiTools',
  robots: 'index,follow',
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/icon-48x48.svg', sizes: '48x48', type: 'image/svg+xml' },
      { url: '/icon-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/icon-512x512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],  },
  manifest: '/manifest.json',
  other: {
    'google-site-verification': 'your-google-verification-code',
  },
  openGraph: {
    title: 'AI Tools Directory 2025 | Top AI Tools for Every Use Case',
    description: 'Discover 2450+ top AI tools for productivity, content creation, business automation, and more. Free AI tools directory with expert reviews.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.allaitools.dev',
    siteName: 'AllAiTools',
    images: [
      {
        url: 'https://www.allaitools.dev/logo.png',
        width: 512,
        height: 512,
        alt: 'AllAiTools Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Directory 2025 | Top AI Tools for Every Use Case',
    description: 'Discover 2450+ top AI tools for productivity, content creation, business automation, and more. Free AI tools directory with expert reviews.',
    images: ['https://www.allaitools.dev/logo.png'],
    creator: '@allaitools',
    site: '@allaitools',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="image" property="og:image" content="https://www.allaitools.dev/logo.png" />
        <meta property="og:image" content="https://www.allaitools.dev/logo.png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:alt" content="AllAiTools Logo" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:image" content="https://www.allaitools.dev/logo.png" />
        <link rel="icon" type="image/png" href="https://www.allaitools.dev/logo.png" />
        <link rel="apple-touch-icon" href="https://www.allaitools.dev/logo.png" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AllAiTools",
              "alternateName": "All AI Tools",
              "url": "https://www.allaitools.dev",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.allaitools.dev/logo.png",
                "width": 512,
                "height": 512
              },
              "description": "Discover 2450+ top AI tools for productivity, content creation, business automation, and more. Free AI tools directory 2025 with expert reviews and ratings.",
              "slogan": "Discover AI Tools Shaping Tomorrow",
              "sameAs": [
                "https://twitter.com/allaitools",
                "https://github.com/allaitools"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
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

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/contexts/AuthContext'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Best AI Tools 2025 | Discover Top ChatGPT, Claude & AI Agents | AllAiTools',
  description: 'Discover the best AI tools to transform your workflow. Explore thousands of cutting-edge AI tools including ChatGPT alternatives, Claude AI, Gemini, and AI agents for productivity, content creation, coding & business automation in 2025.',
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
    title: 'Best AI Tools 2025 | Discover Top ChatGPT, Claude & AI Agents',
    description: 'Discover the best AI tools to transform your workflow. Explore cutting-edge AI tools for productivity, content creation, business automation, and more.',
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
    title: 'Best AI Tools 2025 | Discover Top ChatGPT, Claude & AI Agents',
    description: 'Discover the best AI tools to transform your workflow. Explore cutting-edge AI tools for productivity, content creation, business automation, and more.',
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
              "description": "Discover the best AI tools to transform your workflow. Explore cutting-edge AI tools including ChatGPT alternatives, Claude AI, Gemini, and AI agents for productivity, content creation, coding, and business automation in 2025.",
              "slogan": "Transform Your Workflow with the Best AI Tools",
              "sameAs": [
                "https://twitter.com/allaitools",
                "https://github.com/allaitools"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {/* Ezoic Privacy Scripts - Must load before other Ezoic scripts */}
        <Script
          src="https://cmp.gatekeeperconsent.com/min.js"
          strategy="beforeInteractive"
          data-cfasync="false"
        />
        <Script
          src="https://the.gatekeeperconsent.com/cmp.min.js"
          strategy="beforeInteractive"
          data-cfasync="false"
        />
        
        {/* Ezoic Header Script */}
        <Script
          src="//www.ezojs.com/ezoic/sa.min.js"
          strategy="afterInteractive"
        />
        <Script
          id="ezoic-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.ezstandalone = window.ezstandalone || {};
              ezstandalone.cmd = ezstandalone.cmd || [];
            `
          }}
        />
        
        {/* Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="sI57w1dlKYtz2PtK+N68Vw"
          strategy="afterInteractive"
        />
        
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
